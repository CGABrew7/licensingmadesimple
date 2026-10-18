import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { nationalHubLinks } from "../data/directory-hubs";
import { neighbors } from "../data/neighbors";
import { getStrikingPage } from "../data/striking-pages";
import type { LicenseType } from "../data/license-types";
import type { StateRecord } from "../data/states";
import type { StateLicenseFact } from "../data/state-licenses";
import { getVerifiedRequirement, type CitedCell } from "../data/verified-requirements";
import {
  comboPath,
  coreLicenseTypes,
  filingLabel,
  getLicenseType,
  getState,
  getStateLicense,
  licensePath,
  statePath,
  states,
} from "./directory";
import { buildLicensePage } from "./license-page";

const VARIES = "Varies, see regulator";

/** National directories stamped on every record. They are not a state agency citation. */
const GENERIC_HOSTS = new Set([
  "mortgage.nationwidelicensingsystem.org",
  "fincen.gov",
  "consumerfinance.gov",
]);

export interface PhraseLink {
  phrase: string;
  href: string;
}

export interface CopyParagraph {
  text: string;
  links: PhraseLink[];
}

export interface RelatedLink {
  href: string;
  anchor: string;
}

export interface ComboQuality {
  indexable: boolean;
  paragraphs: CopyParagraph[];
  related: RelatedLink[];
}

export interface StateHubQuality {
  indexable: boolean;
  paragraphs: CopyParagraph[];
  related: RelatedLink[];
}

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isHttp(url: string): boolean {
  return url.startsWith("https://") || url.startsWith("http://");
}

/** A filled cell that is not the unverified fallback, with at least one source URL. */
export function isCitedFigure(cell: CitedCell | undefined): boolean {
  if (!cell) return false;
  const value = cell.value.trim();
  if (!value || value === VARIES) return false;
  return cell.sources.some((source) => isHttp(source.url));
}

function sourceLinksAgency(fact: StateLicenseFact, source: { label: string; url: string }): boolean {
  const agencyHost = hostOf(fact.agencyUrl);
  const sourceHost = hostOf(source.url);
  if (!agencyHost || !isHttp(source.url) || GENERIC_HOSTS.has(sourceHost)) return false;
  return source.url === fact.agencyUrl || source.label === fact.agencyName || sourceHost === agencyHost;
}

/**
 * The regulating agency counts when a source links that agency.
 * The varies-cell fallback also links the agency, and that fallback is not a citation.
 * Generic NMLS, FinCEN, and FDCPA links are not the state agency.
 */
export function citedAgencySource(
  fact: StateLicenseFact,
  citedSources: { label: string; url: string }[] = [],
): { label: string; url: string } | undefined {
  if (!fact.agencyName.trim() || !hostOf(fact.agencyUrl)) return undefined;
  return [...fact.sources, ...citedSources].find((source) => sourceLinksAgency(fact, source));
}

/** A striking section that names the agency and links its site is a citation. The factbar link alone is not. */
function strikingAgencySource(fact: StateLicenseFact, stateSlug: string, typeSlug: string): { label: string; url: string } | undefined {
  const striking = getStrikingPage(stateSlug, typeSlug);
  if (!striking) return undefined;
  const links = [
    ...striking.paragraphs.flatMap((block) => block.links ?? []),
    ...(striking.whoExtra ?? []).flatMap((block) => block.links ?? []),
  ];
  const match = links.find((link) => sourceLinksAgency(fact, { label: link.phrase, url: link.href }));
  return match ? { label: match.phrase, url: match.href } : undefined;
}

function finish(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function requirementSentence(state: StateRecord, fact: StateLicenseFact): string {
  const name = fact.licenseName.trim().replace(/\.$/, "");
  if (fact.required === true) {
    return `${state.name} generally requires this license: ${name}.`;
  }
  if (fact.required === false) {
    if (/^no\b/i.test(name)) {
      return `${state.name} has ${name.charAt(0).toLowerCase()}${name.slice(1)}.`;
    }
    return `${state.name} does not issue a statewide license of this type. The license name on this page is ${name}.`;
  }
  return `${state.name} says to confirm this license with the agency. The license name on this page is ${name}.`;
}

function renewalParagraph(stateSlug: string, typeSlug: string, used: string[]): string | undefined {
  const verified = getVerifiedRequirement(stateSlug, typeSlug);
  if (!verified) return undefined;
  const chunks = [
    ...verified.faqs.map((item) => item.a),
    ...verified.sections.flatMap((section) => section.paragraphs),
  ];
  const matches = chunks
    .map((chunk) => chunk.trim())
    .filter((chunk) => /\b(perpetual|annual assessment|renewal)\b/i.test(chunk))
    .filter((chunk) => !used.some((item) => item.includes(chunk) || chunk.includes(item)));
  if (!matches.length) return undefined;
  matches.sort((a, b) => a.length - b.length);
  return matches[0];
}

function relatedComboLinks(state: StateRecord, type: LicenseType): RelatedLink[] {
  const links: RelatedLink[] = [];
  const hub = nationalHubLinks().find((link) => link.href === licensePath(type.slug));
  links.push({
    href: licensePath(type.slug),
    anchor: hub?.anchor ?? `${type.name} licenses by state`,
  });
  for (const slug of neighbors[state.slug] ?? []) {
    if (links.length >= 3) break;
    const neighbor = getState(slug);
    if (!neighbor) continue;
    links.push({
      href: comboPath(slug, type.slug),
      anchor: `${type.name} in ${neighbor.name}`,
    });
  }
  if (links.length < 3) {
    links.push({
      href: statePath(state.slug),
      anchor: `All ${state.name} license filings`,
    });
  }
  for (const other of coreLicenseTypes) {
    if (links.length >= 3) break;
    if (other.slug === type.slug) continue;
    links.push({
      href: comboPath(state.slug, other.slug),
      anchor: `${other.name} in ${state.name}`,
    });
  }
  return links.slice(0, 3);
}

export function comboQuality(state: StateRecord, type: LicenseType): ComboQuality {
  const fact = getStateLicense(state.slug, type.slug);
  if (!fact) throw new Error(`Missing license record for ${state.slug}/${type.slug}`);
  const page = buildLicensePage(state, type, fact);
  const feeCited = isCitedFigure(page.fee);
  const bondCited = isCitedFigure(page.bond);
  const timelineCited = isCitedFigure(page.timeline);
  const citedSources = [
    ...(feeCited ? page.fee.sources : []),
    ...(bondCited ? page.bond.sources : []),
    ...(timelineCited ? page.timeline.sources : []),
  ];
  const fromRecord = citedAgencySource(fact);
  const fromStriking = strikingAgencySource(fact, state.slug, type.slug);
  const agency = citedAgencySource(fact, citedSources) ?? fromStriking;
  const indexable = feeCited || Boolean(fromRecord) || Boolean(fromStriking);
  if (!indexable) return { indexable, paragraphs: [], related: [] };

  const paragraphs: CopyParagraph[] = [];
  const filing = finish(filingLabel(fact.filing));
  paragraphs.push({
    text: `${requirementSentence(state, fact)} ${filing}`,
    links: [],
  });
  if (fact.agencyName.trim() && isHttp(fact.agencyUrl)) {
    paragraphs.push({
      text: `The regulating agency is ${/^the\b/i.test(fact.agencyName) ? fact.agencyName : `the ${fact.agencyName}`}.`,
      links: [{ phrase: fact.agencyName, href: agency?.url ?? fact.agencyUrl }],
    });
  }
  const used: string[] = [];
  if (feeCited) {
    paragraphs.push({ text: `Fee: ${finish(page.fee.value)}`, links: [] });
    used.push(page.fee.value.trim());
  }
  if (bondCited) {
    paragraphs.push({ text: `Bond: ${finish(page.bond.value)}`, links: [] });
    used.push(page.bond.value.trim());
  }
  if (timelineCited) {
    paragraphs.push({ text: `Timeline: ${finish(page.timeline.value)}`, links: [] });
    used.push(page.timeline.value.trim());
  }
  const renewal = renewalParagraph(state.slug, type.slug, used);
  if (renewal) paragraphs.push({ text: renewal, links: [] });

  return { indexable, paragraphs, related: relatedComboLinks(state, type) };
}

function citedRegulators(state: StateRecord): { name: string; url: string; role: string }[] {
  return state.regulators.filter((regulator) => regulator.name.trim() && isHttp(regulator.url));
}

function relatedStateLinks(state: StateRecord): RelatedLink[] {
  const links: RelatedLink[] = [{ href: "/states", anchor: "Where to file, state by state" }];
  for (const slug of neighbors[state.slug] ?? []) {
    if (links.length >= 3) break;
    const neighbor = getState(slug);
    if (!neighbor) continue;
    links.push({
      href: statePath(slug),
      anchor: `${neighbor.name} license filings`,
    });
  }
  for (const hub of nationalHubLinks()) {
    if (links.length >= 3) break;
    links.push({ href: hub.href, anchor: hub.anchor });
  }
  return links.slice(0, 3);
}

export function stateHubQuality(state: StateRecord): StateHubQuality {
  const regulators = citedRegulators(state);
  const indexable = regulators.length > 0;
  if (!indexable) return { indexable, paragraphs: [], related: [] };
  const paragraphs: CopyParagraph[] = [
    { text: `These are the regulating agencies for ${state.name} in this directory.`, links: [] },
    ...regulators.map((regulator) => ({
      text: regulator.role.trim() ? `${regulator.name}: ${finish(regulator.role)}` : `${regulator.name}.`,
      links: [{ phrase: regulator.name, href: regulator.url }],
    })),
  ];
  return { indexable, paragraphs, related: relatedStateLinks(state) };
}

export function isPublicPathIndexable(path: string): boolean {
  const normalized = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const combo = normalized.match(/^\/states\/([^/]+)\/([^/]+)$/);
  if (combo) {
    const state = getState(combo[1]);
    const type = getLicenseType(combo[2]);
    if (!state || !type || type.tier !== "core") return true;
    return comboQuality(state, type).indexable;
  }
  const hub = normalized.match(/^\/states\/([^/]+)$/);
  if (hub) {
    const state = getState(hub[1]);
    if (!state) return true;
    return stateHubQuality(state).indexable;
  }
  return true;
}

export function statePageIndexCounts(): { indexed: number; noindexed: number; total: number } {
  let indexed = 0;
  let noindexed = 0;
  for (const state of states) {
    if (stateHubQuality(state).indexable) indexed += 1;
    else noindexed += 1;
    for (const type of coreLicenseTypes) {
      if (comboQuality(state, type).indexable) indexed += 1;
      else noindexed += 1;
    }
  }
  return { indexed, noindexed, total: indexed + noindexed };
}

function assertPlain(label: string, value: string) {
  if (value.includes("\u2014") || value.includes("\u2013")) {
    throw new Error(`${label} contains an em dash or en dash`);
  }
  if (/jeff/i.test(value) || /hanok/i.test(value) || /\bhonest(ly)?\b/i.test(value)) {
    throw new Error(`${label} contains a forbidden word`);
  }
  if (/\b(Irvine|San Marcos|Hanok)\b/.test(value)) {
    throw new Error(`${label} contains a location or brand this page does not use`);
  }
}

function assertNoNewAmounts(label: string, text: string, allowed: string) {
  for (const amount of text.match(/\$[\d,]+(?:\.\d+)?(?: million)?/g) ?? []) {
    if (!allowed.includes(amount)) throw new Error(`${label} introduces ${amount}`);
  }
  for (const digit of text.match(/\d[\d,]*/g) ?? []) {
    if (!allowed.includes(digit)) throw new Error(`${label} introduces ${digit}`);
  }
}

function assertRelated(label: string, links: RelatedLink[]) {
  if (links.length !== 3) throw new Error(`${label} has ${links.length} related links`);
  const hrefs = new Set<string>();
  for (const link of links) {
    assertPlain(`${label} anchor`, link.anchor);
    if (!link.href.startsWith("/")) throw new Error(`${label} related link is not internal: ${link.href}`);
    if (link.anchor.trim().length < 12) throw new Error(`${label} anchor is too thin: ${link.anchor}`);
    if (/^(click here|read more|here)$/i.test(link.anchor.trim())) {
      throw new Error(`${label} anchor is generic`);
    }
    if (hrefs.has(link.href)) throw new Error(`${label} repeats ${link.href}`);
    hrefs.add(link.href);
    assertNoNewAmounts(`${label} anchor`, link.anchor, link.anchor);
  }
}

function assertComboCopy() {
  for (const state of states) {
    for (const type of coreLicenseTypes) {
      const quality = comboQuality(state, type);
      const label = `${state.slug}/${type.slug}`;
      if (!quality.indexable) {
        if (quality.paragraphs.length || quality.related.length) {
          throw new Error(`${label} built a summary for a noindexed page`);
        }
        continue;
      }
      const fact = getStateLicense(state.slug, type.slug)!;
      const page = buildLicensePage(state, type, fact);
      const verified = getVerifiedRequirement(state.slug, type.slug);
      const verifiedText = verified
        ? [...verified.faqs.map((item) => item.a), ...verified.sections.flatMap((section) => section.paragraphs)].join(" ")
        : "";
      const allowed = [fact.licenseName, fact.agencyName, page.fee.value, page.bond.value, page.timeline.value, verifiedText].join(" ");
      if (!quality.paragraphs.length) throw new Error(`${label} indexed page has no summary`);
      for (const paragraph of quality.paragraphs) {
        assertPlain(label, paragraph.text);
        assertNoNewAmounts(label, paragraph.text, allowed);
        for (const link of paragraph.links) {
          if (!paragraph.text.includes(link.phrase)) throw new Error(`${label} is missing ${link.phrase}`);
          if (!isHttp(link.href)) throw new Error(`${label} agency link is not a source URL`);
        }
      }
      assertRelated(label, quality.related);
    }
  }
}

function assertHubCopy() {
  for (const state of states) {
    const quality = stateHubQuality(state);
    if (!quality.indexable) continue;
    const allowed = state.regulators.map((regulator) => `${regulator.name} ${regulator.role}`).join(" ");
    for (const paragraph of quality.paragraphs) {
      assertPlain(state.slug, paragraph.text);
      assertNoNewAmounts(state.slug, paragraph.text, allowed);
      for (const link of paragraph.links) {
        if (!paragraph.text.includes(link.phrase)) throw new Error(`${state.slug} is missing ${link.phrase}`);
        if (!isHttp(link.href)) throw new Error(`${state.slug} agency link is not a source URL`);
      }
    }
    assertRelated(state.slug, quality.related);
  }
}

function assertLlmsExcludesNoindexed() {
  const text = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
  for (const match of text.matchAll(/https:\/\/licensingmadesimple\.com(\/[^\s)]*)/g)) {
    const path = match[1].replace(/\/$/, "") || "/";
    if (!isPublicPathIndexable(path)) {
      throw new Error(`llms.txt lists a noindexed page: ${path}`);
    }
  }
}

if (states.length !== 51 || coreLicenseTypes.length !== 4) {
  throw new Error(`State page set changed: ${states.length} states, ${coreLicenseTypes.length} core types`);
}

const indexCounts = statePageIndexCounts();
if (indexCounts.total !== 255) {
  throw new Error(`Expected 255 state pages, found ${indexCounts.total}`);
}
assertComboCopy();
assertHubCopy();
assertLlmsExcludesNoindexed();
