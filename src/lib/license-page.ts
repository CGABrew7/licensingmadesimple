import { neighbors } from "../data/neighbors";
import { getState, type StateRecord } from "../data/states";
import type { LicenseSlug, LicenseType } from "../data/license-types";
import type { StateLicenseFact } from "../data/state-licenses";
import {
  emptyCell,
  getVerifiedRequirement,
  type CitedCell,
  type HowStep,
  type PageSection,
  type QaItem,
} from "../data/verified-requirements";
import { comboPath, SITE_URL, statePath } from "./directory";

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
      a: "The fee, bond, and timeline table leaves a cell blank when this desk has not checked the figure against the state regulator or NMLS. A blank cell is not an estimate. Open the agency page, then the LicenseStore cost page for this state, before you pay or set a date.",
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
      text: "Read each cell. Follow the source link on a filled cell. Leave a blank cell blank until the regulator or NMLS page states the figure.",
    },
  ];
}

export function buildLicensePage(state: StateRecord, type: LicenseType, fact: StateLicenseFact): LicensePageModel {
  const verified = getVerifiedRequirement(state.slug, type.slug);
  const nearby = (neighbors[state.slug] ?? [])
    .map((slug) => getState(slug))
    .filter((item): item is StateRecord => Boolean(item));

  return {
    fee: verified?.fee ?? emptyCell(),
    bond: verified?.bond ?? emptyCell(),
    timeline: verified?.timeline ?? emptyCell(),
    lastVerified: verified?.lastVerified ?? "",
    lastVerifiedLabel: formatVerifiedDate(verified?.lastVerified ?? ""),
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
