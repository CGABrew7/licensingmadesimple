import { getChartEntry, NMLS_CHART } from "../data/chart-cells";
import { neighbors } from "../data/neighbors";
import { getState, type StateRecord } from "../data/states";
import type { LicenseSlug, LicenseType } from "../data/license-types";
import type { StateLicenseFact } from "../data/state-licenses";
import {
  getVerifiedRequirement,
  type CitedCell,
  type HowStep,
  type PageSection,
  type QaItem,
  type SourceLink,
} from "../data/verified-requirements";
import { comboPath, SITE_URL, statePath } from "./directory";

const VARIES = "Varies, see regulator";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const COST_FAMILY: Record<LicenseSlug, string> = {
  collection: "arm",
  lending: "lending",
  "money-transmitters": "money-transmitters",
  mortgage: "mortgage",
  insurance: "insurance",
  contractors: "contractors",
  charity: "charity",
};

export function formatVerifiedDate(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function licenseStoreCostUrl(stateSlug: string, licenseSlug: LicenseSlug): string {
  return `https://licensestore.com/costs/${COST_FAMILY[licenseSlug]}/${stateSlug}/`;
}

export interface LicensePageModel {
  fee: CitedCell;
  bond: CitedCell;
  timeline: CitedCell;
  lastVerified: string;
  lastVerifiedLabel: string;
  sections: PageSection[];
  faqs: QaItem[];
  steps: HowStep[];
  nearby: StateRecord[];
  storeCostUrl: string;
  storeCompareUrl: string;
  storeSourcesUrl: string;
  howToName: string;
}

function defaultFaqs(state: StateRecord, type: LicenseType, fact: StateLicenseFact): QaItem[] {
  return [
    {
      q: `Who needs a ${type.shortName} license in ${state.name}?`,
      a: fact.whoNeeds,
    },
    {
      q: `Where do you file in ${state.name}?`,
      a: fact.path,
    },
    {
      q: `What fee, bond, and timeline apply in ${state.name}?`,
      a: "A figure is shown when a state regulator, a statute, or the NMLS License Requirements and Fees Chart states it. If the cell says Varies, see regulator, open the agency link before you pay or set a date.",
    },
  ];
}

function defaultSteps(state: StateRecord, type: LicenseType, fact: StateLicenseFact): HowStep[] {
  return [
    {
      name: `Confirm the ${type.shortName} activity in ${state.name}`,
      text: fact.whoNeeds,
    },
    {
      name: "Open the agency checklist",
      text: `Open ${fact.agencyName} and read the current checklist before you apply. The agency page is linked on this screen.`,
    },
    {
      name: "File on the path this page names",
      text: fact.path,
    },
    {
      name: "Use the fee, bond, and timeline table",
      text: "Read each cell and open its source. If the cell says Varies, see regulator, use the agency link on that row.",
    },
  ];
}

function filled(cell: CitedCell | undefined): CitedCell | undefined {
  if (!cell?.value.trim()) return undefined;
  return cell;
}

function variesCell(fact: StateLicenseFact, extra: SourceLink[]): CitedCell {
  const sources: SourceLink[] = [{ label: fact.agencyName, url: fact.agencyUrl }];
  for (const source of extra) {
    if (!sources.some((item) => item.url === source.url)) sources.push(source);
  }
  return { value: VARIES, sources };
}

export function buildLicensePage(state: StateRecord, type: LicenseType, fact: StateLicenseFact): LicensePageModel {
  const verified = getVerifiedRequirement(state.slug, type.slug);
  const chart = getChartEntry(state.slug, type.slug);
  const chartSources = chart?.onChart ? [NMLS_CHART] : [];
  const nearby = (neighbors[state.slug] ?? [])
    .map((slug) => getState(slug))
    .filter((item): item is StateRecord => Boolean(item));
  const lastVerified = verified?.lastVerified || (chart ? "2026-10-13" : "");

  return {
    fee: filled(verified?.fee) ?? filled(chart?.fee) ?? variesCell(fact, chartSources),
    bond: filled(verified?.bond) ?? filled(chart?.bond) ?? variesCell(fact, chartSources),
    timeline: filled(verified?.timeline) ?? variesCell(fact, chartSources),
    lastVerified,
    lastVerifiedLabel: formatVerifiedDate(lastVerified),
    sections: verified?.sections ?? [],
    faqs: verified?.faqs ?? defaultFaqs(state, type, fact),
    steps: verified?.steps ?? defaultSteps(state, type, fact),
    nearby,
    storeCostUrl: licenseStoreCostUrl(state.slug, type.slug),
    storeCompareUrl: "https://licensestore.com/compare/",
    storeSourcesUrl: "https://licensestore.com/sources/",
    howToName: `How to handle a ${type.shortName} filing in ${state.name}`,
  };
}

export function breadcrumbSchema(state: StateRecord, type: LicenseType) {
  const items = [
    { name: "Home", path: "/" },
    { name: "Directory", path: "/directory" },
    { name: state.name, path: statePath(state.slug) },
    { name: type.name, path: comboPath(state.slug, type.slug) },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).href,
    })),
  };
}

export function faqSchema(faqs: QaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function howToSchema(name: string, steps: HowStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
