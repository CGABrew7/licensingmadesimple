export interface StatuteHistoryLink {
  label: string;
  href: string;
}

export interface StatuteHistory {
  lead: string;
  links: StatuteHistoryLink[];
  attribution: string;
  attributionLinks: { phrase: string; href: string }[];
}

const CC_BY = "https://creativecommons.org/licenses/by/4.0/";
const LEXIFINA = "https://lexifina.com";

const blame = (repo: string, path: string) =>
  `https://github.com/lexifina/${repo}/blame/main/${path}`;

const license = (repo: string) =>
  `https://github.com/lexifina/${repo}/blob/main/LICENSE.md`;

function credit(repo: string, text: string): Pick<StatuteHistory, "attribution" | "attributionLinks"> {
  return {
    attribution: text,
    attributionLinks: [
      { phrase: "corpus license", href: license(repo) },
      { phrase: "Lexifina", href: LEXIFINA },
      { phrase: "CC BY 4.0", href: CC_BY },
    ],
  };
}

const CALIFORNIA = credit(
  "united-states-california-law",
  "California code text is in the public domain under Government Code section 10248.5. See the corpus license. Git history by Lexifina under CC BY 4.0.",
);
const DISTRICT = credit(
  "united-states-district-of-columbia-law",
  "D.C. Code text is in the public domain. See the corpus license. Git history by Lexifina under CC BY 4.0.",
);
const INDIANA = credit(
  "united-states-indiana-law",
  "Indiana Code text is not subject to copyright. See the corpus license. Git history by Lexifina under CC BY 4.0.",
);
const NEW_JERSEY = credit(
  "united-states-new-jersey-law",
  "New Jersey statute text is not subject to copyright. See the corpus license. Git history by Lexifina under CC BY 4.0.",
);
const UTAH = credit(
  "united-states-utah-law",
  "The State of Utah claims no copyright in the Utah Code text. See the corpus license. Git history by Lexifina under CC BY 4.0.",
);

const CA_100001: StatuteHistoryLink = {
  label: "California Financial Code § 100001",
  href: blame("united-states-california-law", "fin/100001.md"),
};
const CA_2030: StatuteHistoryLink = {
  label: "California Financial Code § 2030",
  href: blame("united-states-california-law", "fin/2030.md"),
};
const DC_26901: StatuteHistoryLink = {
  label: "D.C. Code § 26-901",
  href: blame("united-states-district-of-columbia-law", "title-26/26-901.md"),
};
const DC_261001: StatuteHistoryLink = {
  label: "D.C. Code § 26-1001",
  href: blame("united-states-district-of-columbia-law", "title-26/26-1001.md"),
};
const IN_501: StatuteHistoryLink = {
  label: "IC 28-8-4.1-501",
  href: blame("united-states-indiana-law", "title-28/28-8-4.1/28-8-4.1-501.md"),
};
const NJ_15C8: StatuteHistoryLink = {
  label: "N.J.S.A. 17:15C-8",
  href: blame("united-states-new-jersey-law", "title-17/15C-8.md"),
};
const UT_725101: StatuteHistoryLink = {
  label: "Utah Code § 7-25-101",
  href: blame("united-states-utah-law", "title-7/7-25-101.md"),
};

const licenseHistories: Record<string, StatuteHistory> = {
  "california/collection": {
    lead: "The fee and bond lines cite California Financial Code Division 25, Chapter 1, Article 2, Requirements for Licensure. That article is section 100001. Open the blame view to read the text and see which law last changed each line.",
    links: [CA_100001],
    ...CALIFORNIA,
  },
  "california/money-transmitters": {
    lead: "The fee line cites California Financial Code section 2030(a). Open the blame view to read the text and see which law last changed each line.",
    links: [CA_2030],
    ...CALIFORNIA,
  },
  "district-of-columbia/lending": {
    lead: "The fee and bond lines cite D.C. Code § 26-901. Open the blame view to read the text and see which law last changed each line.",
    links: [DC_26901],
    ...DISTRICT,
  },
  "district-of-columbia/money-transmitters": {
    lead: "The fee and bond lines cite D.C. Code § 26-1001. Open the blame view to read the text and see which law last changed each line.",
    links: [DC_261001],
    ...DISTRICT,
  },
  "indiana/money-transmitters": {
    lead: "The fee and bond lines cite IC 28-8-4.1-501. Open the blame view to read the text and see which law last changed each line.",
    links: [IN_501],
    ...INDIANA,
  },
  "new-jersey/money-transmitters": {
    lead: "The bond line cites N.J.S.A. 17:15C-8. Open the blame view to read the text and see which law last changed each line.",
    links: [NJ_15C8],
    ...NEW_JERSEY,
  },
  "utah/money-transmitters": {
    lead: "The fee and bond lines cite Utah Code Ann. § 7-25-101 et. al. The link below is section 7-25-101. Open the blame view to read the text and see which law last changed each line.",
    links: [UT_725101],
    ...UTAH,
  },
};

const stateHistories: Record<string, StatuteHistory> = {
  california: {
    lead: "California license pages on this site cite Financial Code section 100001 and section 2030. Open a blame view to read the text and see which law last changed each line.",
    links: [CA_100001, CA_2030],
    ...CALIFORNIA,
  },
  "district-of-columbia": {
    lead: "District of Columbia license pages on this site cite D.C. Code § 26-901 and § 26-1001. Open a blame view to read the text and see which law last changed each line.",
    links: [DC_26901, DC_261001],
    ...DISTRICT,
  },
  indiana: {
    lead: "The Indiana money transmitter page cites IC 28-8-4.1-501. Open the blame view to read the text and see which law last changed each line.",
    links: [IN_501],
    ...INDIANA,
  },
  "new-jersey": {
    lead: "The New Jersey money transmitter page cites N.J.S.A. 17:15C-8. Open the blame view to read the text and see which law last changed each line.",
    links: [NJ_15C8],
    ...NEW_JERSEY,
  },
  utah: {
    lead: "The Utah money transmitter page cites Utah Code Ann. § 7-25-101 et. al. The link below is section 7-25-101. Open the blame view to read the text and see which law last changed each line.",
    links: [UT_725101],
    ...UTAH,
  },
};

export function stateStatuteHistory(slug: string): StatuteHistory | undefined {
  return stateHistories[slug];
}

export function licenseStatuteHistory(stateSlug: string, typeSlug: string): StatuteHistory | undefined {
  return licenseHistories[`${stateSlug}/${typeSlug}`];
}
