import { getChartEntry, NMLS_CHART } from "./chart-cells";
import type { LicenseSlug } from "./license-types";
import { getLicenseType } from "./license-types";
import { getFactsForLicense, getStateLicense, type StateLicenseFact } from "./state-licenses";
import { getState, states } from "./states";

export const HUB_UPDATED = "2026-10-15";
export const NMLS_CHART_CHECKED = "October 13, 2026";
const SITE = "https://licensingmadesimple.com";

export interface TextLink {
  phrase: string;
  href: string;
}

export interface HubBlock {
  text: string;
  links?: TextLink[];
}

export interface HubFaq {
  q: string;
  a: string;
}

export interface HubRow {
  stateSlug: string;
  stateName: string;
  href: string;
  status: string;
  agencyName: string;
  agencyUrl: string;
  blurb: string;
  cited?: string;
}

export interface DirectoryHub {
  slug: LicenseSlug;
  title: string;
  description: string;
  h1: string;
  lede: string;
  ledeLinks: TextLink[];
  jumps: { href: string; label: string }[];
  sections: { id?: string; heading: string; paragraphs: HubBlock[] }[];
  tableId: string;
  tableHeading: string;
  tableLead: string;
  rows: HubRow[];
  faqs: HubFaq[];
  updated: string;
}

const MTL_LEADS: Record<string, string> = {
  alabama:
    "Alabama places the money transmitter license at the Securities Commission. The State Banking Department handles mortgage and consumer finance, not this license. The application is on NMLS.",
  alaska:
    "Alaska money transmission files with the Division of Banking and Securities on NMLS. That division sits inside the Department of Commerce, Community, and Economic Development and also handles the other non-depository licenses.",
  arizona:
    "Arizona money transmission files with the Department of Insurance and Financial Institutions on NMLS. DIFI is the consolidated insurance and financial-institutions regulator.",
  arkansas:
    "Arkansas money transmission files with the Securities Department on NMLS. Collection agencies use a standalone board, which is not this license.",
  california:
    "California issues a Money Transmission Act license through DFPI, filed on NMLS. Activity that receives customer value and transmits it can still be money transmission when the model is digital assets. A Department of Real Estate broker license is a mortgage path, not this one.",
  colorado:
    "Colorado money transmission files with the Division of Banking on NMLS. The Division of Real Estate is the mortgage desk, and the Attorney General handles collection. Do not file this license at either of those offices.",
  connecticut:
    "Connecticut money transmission files with the Department of Banking on NMLS. The Consumer Credit Division is the usual desk for non-depository licenses in the state.",
  delaware:
    "Delaware money transmission files on NMLS with the Office of the State Bank Commissioner. The same office licenses mortgage, lending, and collection, and those are still separate authorities.",
  "district-of-columbia":
    "The District of Columbia money transmitter license files with the Department of Insurance, Securities and Banking on NMLS. The current NMLS company chart does not list a District collection agency license, which says nothing about this money transmitter row.",
  florida:
    "Florida money transmission is a chapter 560 money services license from the Office of Financial Regulation. Applicants file that Part II application with the office.",
  georgia:
    "Georgia money transmission files with the Department of Banking and Finance on NMLS. Georgia does not issue a statewide collection-agency license. That gap does not cover money transmission.",
  hawaii:
    "Hawaii money transmission files with the Division of Financial Institutions on NMLS. The division sits inside the Department of Commerce and Consumer Affairs.",
  idaho:
    "Idaho money transmission files with the Department of Finance on NMLS. The department is the statewide non-depository regulator, so mortgage and lender licenses share the office and remain separate authorities.",
  illinois:
    "Illinois money transmission files with the Department of Financial and Professional Regulation on NMLS. The City of Chicago debt-collector license is a municipal collection filing. It is not a money transmitter license.",
  indiana:
    "Indiana money transmission files with the Department of Financial Institutions on NMLS. Collection agencies file with the Secretary of State, not on this license.",
  iowa:
    "Iowa money transmission files with the Division of Banking on NMLS. Collection in Iowa is a separate question for the Attorney General or the Insurance Division, and it is not decided by this license.",
  kansas:
    "Kansas money transmission files with the Office of the State Bank Commissioner on NMLS. Kansas does not issue a statewide collection-agency license. Money transmission is still licensed.",
  kentucky:
    "Kentucky money transmission files with the Department of Financial Institutions on NMLS. Kentucky does not issue a statewide collection-agency license. The money transmitter application is unchanged by that gap.",
  louisiana:
    "Louisiana money transmission files with the Office of Financial Institutions on NMLS. OFI’s non-depository division is the usual desk for the core financial licenses, and each authority is still separate.",
  maine:
    "Maine money transmission files with the Bureau of Financial Institutions, not the Bureau of Consumer Credit Protection. Mortgage company licenses are the consumer-credit filing. The money transmitter application is on NMLS.",
  maryland:
    "Maryland money transmission files on NMLS with the Office of the Commissioner of Financial Regulation. The commissioner is housed under Maryland Labor.",
  massachusetts:
    "Massachusetts money transmission files on NMLS with the Division of Banks as a foreign-transmittal or money-services license. The division publishes separate NMLS checklists for its other authorities.",
  michigan:
    "Michigan money transmission files with the Department of Insurance and Financial Services on NMLS. DIFS is the consolidated insurance and financial-services regulator.",
  minnesota:
    "Minnesota money transmission files with the Department of Commerce on NMLS. Commerce publishes NMLS checklists for non-depository financial services.",
  mississippi:
    "Mississippi money transmission files with the Department of Banking and Consumer Finance on NMLS. Mississippi does not issue a statewide collection-agency license. Money transmission is a DBCF license anyway.",
  missouri:
    "Missouri files a sale-of-checks and money-transmitter license with the Division of Finance on NMLS. Missouri does not issue a statewide collection-agency license. That is a different rule from money transmission.",
  montana:
    "Montana does not issue a statewide money transmitter license. The Division of Banking and Financial Institutions states that it does not regulate money transmitters. The NMLS chart has no Montana money transmitter row, and Montana Code Annotated Title 32 has no money transmitter chapter. Consumer lending, mortgage, escrow, and collection on a consumer loan can still be licensed.",
  nebraska:
    "Nebraska money transmission files with the Department of Banking and Finance on NMLS. Collection agencies file with the Secretary of State, which does not issue this license.",
  nevada:
    "Nevada money transmission files with the Financial Institutions Division on NMLS, not the Division of Mortgage Lending. Mortgage company licenses stay at the mortgage-lending division.",
  "new-hampshire":
    "New Hampshire money transmission files with the Banking Department on NMLS. New Hampshire does not issue a statewide collection-agency license. Money transmission is still a Banking Department license.",
  "new-jersey":
    "New Jersey money transmission files with the Department of Banking and Insurance on a state application. A foreign money transmitter is a separate license type on that application.",
  "new-mexico":
    "New Mexico money transmission files with the Financial Institutions Division on NMLS. The division sits inside the Regulation and Licensing Department.",
  "new-york":
    "New York money transmission files with the Department of Financial Services on NMLS. Virtual-currency business activity covered by 23 NYCRR 200 generally also needs a BitLicense or a limited-purpose trust charter. Those are different authorities. A New York City DCWP collection license is not a money transmitter license.",
  "north-carolina":
    "North Carolina money transmission files with the Office of the Commissioner of Banks on NMLS. Collection agencies file with the Department of Insurance, not with the Commissioner of Banks.",
  "north-dakota":
    "North Dakota money transmission files with the Department of Financial Institutions on NMLS. DFI is the statewide non-depository regulator for this license and for the other core financial licenses.",
  ohio:
    "Ohio money transmission files with the Division of Financial Institutions on NMLS. Ohio does not issue a statewide collection-agency license. Money transmission remains a DFI license.",
  oklahoma:
    "Oklahoma money transmission files with the Banking Department on NMLS, not the Department of Consumer Credit. Mortgage licenses generally file with Consumer Credit.",
  oregon:
    "Oregon money transmission files with the Division of Financial Regulation on NMLS. The division sits inside the Department of Consumer and Business Services.",
  pennsylvania:
    "Pennsylvania money transmission files with the Department of Banking and Securities on NMLS. Pennsylvania does not run a typical standalone collection-agency license. Money transmission is still a department license.",
  "rhode-island":
    "Rhode Island money transmission files with the Department of Business Regulation on NMLS. The Banking Division is the usual non-depository desk.",
  "south-carolina":
    "The NMLS chart places the South Carolina money transmitter license with the Attorney General under the South Carolina Anti-Money Laundering Act. Mortgage company licenses file with the Board of Financial Institutions. There is no statewide collection-agency license.",
  "south-dakota":
    "South Dakota money transmission files with the Division of Banking on NMLS. South Dakota does not issue a statewide collection-agency license. The money transmitter filing is still at the division.",
  tennessee:
    "Tennessee money transmission files with the Department of Financial Institutions on NMLS. Collection services file with a dedicated board under Commerce and Insurance, not on this license.",
  texas:
    "Texas money transmission files with the Department of Banking on NMLS. It is not an Office of Consumer Credit Commissioner lender license and not a Department of Savings and Mortgage Lending mortgage license. Collector bonding is a Secretary of State filing.",
  utah:
    "Utah money transmission files with the Department of Financial Institutions on NMLS, not the Division of Real Estate. The real-estate division is the mortgage desk.",
  vermont:
    "Vermont money transmission files with the Department of Financial Regulation on NMLS. Vermont does not issue a statewide collection-agency license. Money transmission is still a department license.",
  virginia:
    "Virginia money transmission files on NMLS with the Bureau of Financial Institutions inside the State Corporation Commission. Virginia does not issue a statewide collection-agency license. That gap does not remove the money transmitter license.",
  washington:
    "Washington money transmission files with the Department of Financial Institutions on NMLS. The NMLS row covers currency exchange with money transmission. DFI publishes separate checklists for its other license types.",
  "west-virginia":
    "West Virginia money transmission files with the Division of Financial Institutions on NMLS. The chart row also covers authorized delegates, including virtual currency kiosks.",
  wisconsin:
    "Wisconsin money transmission files with the Department of Financial Institutions on NMLS. The same department administers charitable-organization registration, which is not a money transmitter license.",
  wyoming:
    "Wyoming money transmission files with the Division of Banking on NMLS. Collection agencies file with the Collection Agency Board, which does not issue the money transmitter license.",
};

const FEE_PATTERNS: RegExp[] = [
  /Nonrefundable application fee \$[\d,]+(?:\.\d+)? for a Money Transmitter and \$[\d,]+(?:\.\d+)? for a Foreign Money Transmitter/i,
  /Part II application fee \$[\d,]+(?:\.\d+)?/i,
  /Part III application fee is \$[\d,]+(?:\.\d+)?/i,
  /the \$[\d,]+(?:\.\d+)? initial fee for each authorized delegate, including virtual currency kiosks/i,
  /application fee \$[\d,]+(?:\.\d+)?/i,
  /License registration fee \$[\d,]+(?:\.\d+)?/i,
  /NMLS processing fee \$[\d,]+(?:\.\d+)?/i,
  /EOC Fee \$[\d,]+(?:\.\d+)?/i,
  /Each branch office and each authorized vendor location is \$[\d,]+(?:\.\d+)?/i,
];

const BOND_PATTERNS: RegExp[] = [
  /at least \$[\d,]+(?:\.\d+)? for a Money Transmitter and at least \$[\d,]+(?:\.\d+)? for a Foreign Money Transmitter/i,
  /not less than \$[\d,]+(?:\.\d+)? and not more than \$[\d,]+(?:\.\d+)?(?: million)?/i,
  /minimum surety bond on the NMLS chart is \$[\d,]+(?:\.\d+)?/i,
];

const COPY_IF_PRESENT = [
  "The chart allows an alternate security device upload in place of an electronic surety bond.",
  "The chart does not mark electronic surety bond submission as required on this line.",
  "Application fees are NOT refundable.",
  "Non refundable.",
  "This license is not a row on the NMLS License Requirements and Fees Chart.",
];

function statusLabel(required: StateLicenseFact["required"]): string {
  if (required === true) return "State license generally required";
  if (required === false) return "No statewide license of this type";
  return "Confirm with the agency";
}

function comboHref(stateSlug: string, licenseSlug: LicenseSlug): string {
  return `/states/${stateSlug}/${licenseSlug}`;
}

function sentenceCase(value: string): string {
  const cased = value.charAt(0).toUpperCase() + value.slice(1);
  if (cased.startsWith("Not less than")) return `Surety bond of ${cased.charAt(0).toLowerCase()}${cased.slice(1)}`;
  if (cased.startsWith("At least")) return `Surety bond of ${cased.charAt(0).toLowerCase()}${cased.slice(1)}`;
  if (cased.startsWith("The $")) return `Chart row covers ${cased.charAt(0).toLowerCase()}${cased.slice(1)}`;
  return cased;
}

function collectMatches(text: string, patterns: RegExp[]): string[] {
  const found: { index: number; text: string }[] = [];
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (!match || match.index === undefined) continue;
    found.push({ index: match.index, text: match[0] });
  }
  return found
    .filter((item) => !found.some((other) => other !== item && item.index >= other.index && item.index + item.text.length <= other.index + other.text.length))
    .sort((a, b) => a.index - b.index)
    .map((item) => sentenceCase(item.text.replace(/\s+/g, " ").trim()));
}

function chartRowName(feeValue: string | undefined): string | null {
  if (!feeValue) return null;
  const match = feeValue.match(/^([^:]{6,90}):\s/);
  if (!match) return null;
  const name = match[1].trim();
  if (/^(Money Transmitter License|Money Transmitters License|Money Transmission License)$/i.test(name)) return null;
  return name;
}

function citedMoneyTransmitter(stateSlug: string): string {
  const entry = getChartEntry(stateSlug, "money-transmitters");
  if (!entry) return "";
  const feeText = entry.fee?.value ?? "";
  const bondText = entry.bond?.value ?? "";
  const blob = `${feeText} ${bondText}`;
  const parts: string[] = [];
  if (!entry.onChart) {
    parts.push("This license is not a row on the NMLS License Requirements and Fees Chart.");
  }
  const rowName = chartRowName(feeText);
  if (rowName) parts.push(`NMLS chart row: ${rowName}.`);
  for (const snippet of collectMatches(feeText, FEE_PATTERNS)) {
    parts.push(snippet.endsWith(".") ? snippet : `${snippet}.`);
  }
  const bondSnippets = collectMatches(bondText, BOND_PATTERNS);
  for (const snippet of bondSnippets) parts.push(snippet.endsWith(".") ? snippet : `${snippet}.`);
  for (const phrase of COPY_IF_PRESENT) {
    if (blob.includes(phrase) && !parts.some((part) => part.includes(phrase))) parts.push(phrase);
  }
  if (/per location/i.test(blob)) {
    parts.push("Location charges beyond the figures quoted here are on the state page.");
  }
  const labels: string[] = [];
  for (const source of [...(entry.fee?.sources ?? []), ...(entry.bond?.sources ?? [])]) {
    if (!labels.includes(source.label)) labels.push(source.label);
  }
  if (labels.length) {
    const chartLabel = labels.filter((label) => label === NMLS_CHART.label);
    const others = labels.filter((label) => label !== NMLS_CHART.label);
    const sourceBits = [];
    if (chartLabel.length) sourceBits.push(`${NMLS_CHART.label}, checked ${NMLS_CHART_CHECKED}`);
    sourceBits.push(...others);
    parts.push(`Sources: ${sourceBits.join("; ")}.`);
  }
  const cited = parts.join(" ");
  const sourceBlob = blob;
  for (const amount of cited.match(/\$[\d,]+(?:\.\d+)?(?: million)?/g) ?? []) {
    if (!sourceBlob.includes(amount)) {
      throw new Error(`${stateSlug} cited amount ${amount} is not in the chart extract`);
    }
  }
  return cited;
}

function rowsFor(licenseSlug: LicenseSlug, blurbFor: (stateSlug: string, fact: StateLicenseFact) => { blurb: string; cited?: string }): HubRow[] {
  return states.map((state) => {
    const fact = getStateLicense(state.slug, licenseSlug);
    if (!fact) throw new Error(`Missing ${licenseSlug} fact for ${state.slug}`);
    const copy = blurbFor(state.slug, fact);
    return {
      stateSlug: state.slug,
      stateName: state.name,
      href: comboHref(state.slug, licenseSlug),
      status: statusLabel(fact.required),
      agencyName: fact.agencyName,
      agencyUrl: fact.agencyUrl,
      blurb: copy.blurb,
      cited: copy.cited,
    };
  });
}

function listNames(slugs: string[]): string {
  const names = slugs.map((slug) => getState(slug)!.name);
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function collectionBuckets() {
  const none: string[] = [];
  const confirm: string[] = [];
  const licensed: string[] = [];
  for (const state of states) {
    const fact = getStateLicense(state.slug, "collection");
    if (!fact) throw new Error(`Missing collection fact for ${state.slug}`);
    if (fact.required === "confirm" || (fact.required === false && /confirm with/i.test(fact.whoNeeds))) {
      confirm.push(state.slug);
    } else if (fact.required === false) {
      none.push(state.slug);
    } else {
      licensed.push(state.slug);
    }
  }
  const expectedNone = [
    "georgia",
    "kansas",
    "kentucky",
    "mississippi",
    "missouri",
    "montana",
    "new-hampshire",
    "ohio",
    "oklahoma",
    "pennsylvania",
    "south-carolina",
    "south-dakota",
    "vermont",
    "virginia",
  ];
  const expectedConfirm = ["district-of-columbia", "iowa", "utah"];
  if (none.join() !== expectedNone.join() || confirm.join() !== expectedConfirm.join()) {
    throw new Error(`Collection buckets changed. None: ${none.join(", ")}. Confirm: ${confirm.join(", ")}.`);
  }
  return { none, confirm, licensed };
}

function mortgageSplitSentence(): string {
  const splits: [string, string][] = [
    ["california", "California Department of Financial Protection and Innovation"],
    ["colorado", "Colorado Division of Real Estate"],
    ["utah", "Utah Division of Real Estate"],
    ["nevada", "Nevada Division of Mortgage Lending"],
    ["texas", "Texas Department of Savings and Mortgage Lending"],
  ];
  const bits = splits.map(([slug, agency]) => {
    const fact = getStateLicense(slug, "mortgage");
    if (!fact || fact.agencyName !== agency) {
      throw new Error(`Mortgage desk for ${slug} no longer matches ${agency}`);
    }
    return `${getState(slug)!.name} (${fact.agencyName})`;
  });
  const indiana = getStateLicense("indiana", "mortgage");
  if (!indiana?.path.includes("Secretary of State")) {
    throw new Error("Indiana mortgage path no longer mentions the Secretary of State");
  }
  return `NMLS is the filing system for every state on this page. The agency that issues the company license is not always the banking department. Split desks in this directory: ${bits.join("; ")}. The Indiana filing path also notes that some loan-broker activity is a Secretary of State filing.`;
}

function buildMoneyTransmitterHub(): DirectoryHub {
  const facts = getFactsForLicense("money-transmitters");
  const missing = states.filter((state) => !MTL_LEADS[state.slug]).map((state) => state.slug);
  if (missing.length) throw new Error(`Missing money transmitter blurbs: ${missing.join(", ")}`);
  const noLicense = facts.filter((item) => item.fact.required === false).map((item) => item.stateSlug);
  if (noLicense.join() !== "montana") {
    throw new Error(`Money transmitter no-license set changed: ${noLicense.join(", ")}`);
  }
  const montana = getStateLicense("montana", "money-transmitters");
  if (!montana || montana.required !== false) throw new Error("Montana money transmitter record changed");
  const rows = rowsFor("money-transmitters", (stateSlug) => ({
    blurb: MTL_LEADS[stateSlug],
    cited: citedMoneyTransmitter(stateSlug),
  }));
  const type = getLicenseType("money-transmitters")!;
  const mtDivision = "https://banking.mt.gov/BFID/";
  const mtCode = "https://mca.legmt.gov/bills/mca/title_0320/chapters_index.html";
  const csbsMsb = "https://www.csbs.org/chapter-four-overview-of-money-service-business";
  return {
    slug: "money-transmitters",
    title: "Money transmitter license requirements by state",
    description:
      "Which states require a money transmitter license for a payments startup. Montana does not. 49 states and DC generally do. Sources are regulators, CSBS, and NMLS.",
    h1: "Money transmitter license requirements by state",
    lede:
      "A payments startup that receives money or monetary value from customers and transmits it, sells payment instruments, or holds customer funds for later payment generally needs a money transmitter license in each of the 49 states and the District of Columbia where those customers are. Montana does not issue that license. The Montana Division of Banking and Financial Institutions states that it does not regulate money transmitters, the NMLS License Requirements and Fees Chart has no Montana money transmitter row, and the Conference of State Bank Supervisors states, in an October 2019 overview, that all states except Montana have passed laws covering money services businesses.",
    ledeLinks: [
      { phrase: "Montana", href: "/states/montana/money-transmitters" },
      { phrase: "Montana Division of Banking and Financial Institutions", href: mtDivision },
      { phrase: "NMLS License Requirements and Fees Chart", href: NMLS_CHART.url },
      { phrase: "Conference of State Bank Supervisors", href: csbsMsb },
    ],
    jumps: [
      { href: "#which-states", label: "Which states require a license" },
      { href: "#who-needs", label: "Who needs a money transmitter license" },
      { href: "#do-i-need", label: "Do I need one" },
      { href: "#states", label: "All 50 states and DC" },
      { href: "#faq", label: "FAQ" },
    ],
    sections: [
      {
        id: "which-states",
        heading: "Which states require a money transmitter license for a payments startup?",
        paragraphs: [
          {
            text: "A payments startup that receives money or monetary value from customers and transmits it, sells payment instruments, or holds customer funds for later payment generally needs a money transmitter license in each of the 49 states and the District of Columbia where those customers are. Montana does not issue that license. Count the customer’s state, not the state of incorporation. The Montana Division of Banking and Financial Institutions states that it does not regulate money transmitters. The NMLS License Requirements and Fees Chart has no Montana money transmitter row. Montana Code Annotated Title 32 has no money transmitter chapter. The Conference of State Bank Supervisors states, in an October 2019 overview, that all states except Montana have passed laws covering money services businesses. Other Montana licenses can still apply.",
            links: [
              { phrase: "Montana", href: "/states/montana/money-transmitters" },
              { phrase: "Montana Division of Banking and Financial Institutions", href: mtDivision },
              { phrase: "NMLS License Requirements and Fees Chart", href: NMLS_CHART.url },
              { phrase: "Montana Code Annotated Title 32", href: mtCode },
              { phrase: "Conference of State Bank Supervisors", href: csbsMsb },
            ],
          },
          {
            text: "Agent-of-payee, payment-processor, and bank-agent exemptions exist in some statutes. They are fact-specific. This page does not treat an exemption as the default, and it does not rank states as easy or exempt for digital assets. Open the state page and the regulator before you rely on an exemption.",
          },
          {
            text: "Two states file outside the NMLS money-transmitter rows in this directory. Florida uses a chapter 560 application at the Office of Financial Regulation. New Jersey uses a Department of Banking and Insurance application, with a separate foreign money transmitter license type. New York files the money transmitter license on NMLS and, for virtual-currency business activity under 23 NYCRR 200, a separate BitLicense or limited-purpose trust charter.",
            links: [
              { phrase: "Florida", href: "/states/florida/money-transmitters" },
              { phrase: "New Jersey", href: "/states/new-jersey/money-transmitters" },
              { phrase: "New York", href: "/states/new-york/money-transmitters" },
            ],
          },
        ],
      },
      {
        id: "who-needs",
        heading: "Who needs a money transmitter license",
        paragraphs: [
          { text: type.whoNeeds },
          {
            text: "You generally need the license if the business receives customer funds and transmits them, sells or issues payment instruments, or holds customer funds for later payment, and the customers are in a licensing state. Stored-value programs, remittance firms, and digital-asset platforms that move customer value are in that net. A bank charter, when one actually applies, is a different legal status. Do not assume it from a partnership with a bank.",
          },
          {
            text: "Registration with FinCEN on Form 107 is a federal money services business duty. It never substitutes for a required state license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
            links: [
              { phrase: "FinCEN", href: "https://www.fincen.gov/money-services-business-msb-registration" },
            ],
          },
        ],
      },
      {
        id: "do-i-need",
        heading: "Do I need a money transmitter license",
        paragraphs: [
          {
            text: "Ask three questions. Does the business receive, hold, or transmit another person’s money or monetary value? Are the customers in a state that issues this license? Does a statute in that state actually exempt this model? If the first two answers are yes, and you cannot point to the exemption in that state’s statute, plan on the license. One NMLS record is not a national license. You request each state’s authority. Companies that serve customers in many states file in each of those states.",
          },
          {
            text: "If the only customers are in Montana, this directory records no Montana money transmitter application. Read the Montana page before you treat every payments model as unlicensed there. Federal FinCEN registration can still apply.",
            links: [{ phrase: "Montana page", href: "/states/montana/money-transmitters" }],
          },
        ],
      },
    ],
    tableId: "states",
    tableHeading: "Money transmitter license, all 50 states and DC",
    tableLead: `Each note says what is different about that state’s desk. Fee and bond lines are copied from the NMLS License Requirements and Fees Chart checked on ${NMLS_CHART_CHECKED}, or from a statute already cited on the state page. Open the state page for the full cell and the regulator link.`,
    rows,
    faqs: [
      {
        q: "Which states require a money transmitter license for a payments startup?",
        a: "A payments startup generally needs a money transmitter license in each of the 49 states and the District of Columbia where its customers send, receive, or store money or monetary value. Montana does not issue a statewide money transmitter license. The Montana Division of Banking and Financial Institutions states that it does not regulate money transmitters, the NMLS License Requirements and Fees Chart has no Montana money transmitter row, and the Conference of State Bank Supervisors states, in an October 2019 overview, that all states except Montana have passed laws covering money services businesses. A statutory exemption in another state is specific to that statute. This page does not treat an exemption as the default.",
      },
      {
        q: "Who needs a money transmitter license?",
        a: "A business that receives money or monetary value from one person and transmits it to another, sells payment instruments, or holds customer funds for later payment. The test is the activity with customers in the state, not where the company is incorporated. Many payment companies, stored-value programs, remittance firms, and digital-asset platforms that move customer value fall in that group.",
      },
      {
        q: "Do I need a money transmitter license?",
        a: "You need the state license in each licensing state where your customers are, unless that state’s statute exempts the model. FinCEN Form 107 does not answer the state question. There is no all-50-states license. Start with the table on this page, then open the state regulator linked from the state page.",
      },
      {
        q: "Is there a money transmitter license for all 50 states?",
        a: "No. Each state, and the District of Columbia, issues its own license, except Montana, which this directory records as having no statewide money transmitter license. A company that serves customers in many states files in each of those states. NMLS is the usual filing system. Florida and New Jersey money transmitter licenses in this directory are state applications and are not rows on the NMLS chart.",
      },
      {
        q: "Does FinCEN registration replace a state money transmitter license?",
        a: "No. FinCEN money services business registration and the Bank Secrecy Act are federal duties. They never substitute for a required state money transmitter license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
      },
      {
        q: "Where are money transmitter fees and bond amounts published?",
        a: `On each state page, and in short form in the table on this page. Figures are quoted from the NMLS License Requirements and Fees Chart checked on ${NMLS_CHART_CHECKED}, or from a statute already cited for Florida or New Jersey. Do not treat a missing bond line as a finding that no bond exists.`,
      },
    ],
    updated: "2026-10-22",
  };
}

function buildCollectionHub(): DirectoryHub {
  const type = getLicenseType("collection")!;
  const { none, confirm, licensed } = collectionBuckets();
  const noneNames = listNames(none);
  const confirmNames = listNames(confirm);
  const rows = rowsFor("collection", (_slug, fact) => ({ blurb: `${fact.whoNeeds} ${fact.path}` }));
  return {
    slug: "collection",
    title: "Collection agency license requirements by state",
    description:
      "Which states require a collection agency license, which do not issue one, and which agency takes the filing. All 50 states and DC. The FDCPA still applies.",
    h1: "Collection agency license requirements by state",
    lede: `A third-party collection agency generally needs a state collection-agency, debt-collector, or collection-service license in each state that issues one, based on where the debtor lives. This directory records no standalone statewide collection-agency license in ${noneNames}. Confirm with the agency before treating collection as unlicensed in ${confirmNames}. The other ${licensed.length} states generally require a statewide license or registration.`,
    ledeLinks: [],
    jumps: [
      { href: "#who-needs", label: "Who needs a collection license" },
      { href: "#states", label: "All states" },
      { href: "#faq", label: "FAQ" },
    ],
    sections: [
      {
        id: "who-needs",
        heading: "Who needs a collection agency license",
        paragraphs: [
          { text: type.whoNeeds },
          {
            text: `States with no standalone statewide collection-agency license in this directory: ${noneNames}. Collectors that contact consumers in those states still have to follow the Fair Debt Collection Practices Act. ${confirmNames} are not in that no-license list. Their pages say to confirm the current category with the agency.`,
          },
          {
            text: "City licenses sit on top of the state rule where the state page says so. Illinois collectors who collect from Chicago residents may also need the city debt-collection license. Collection that reaches New York City residents can also need the city’s DCWP license. A state license does not replace the city license.",
            links: [
              { phrase: "Illinois", href: "/states/illinois/collection" },
              { phrase: "New York City", href: "/states/new-york/collection" },
            ],
          },
          { text: type.federalOverlay },
        ],
      },
    ],
    tableId: "states",
    tableHeading: "Which states require a collection agency license",
    tableLead:
      "The note on each row is the scope recorded for that state. It is not a swapped sentence with the state name changed. Fee and bond figures, when a regulator, a statute, or the NMLS chart states them, stay on the state page. This table does not invent a fee.",
    rows,
    faqs: [
      {
        q: "Which states require a collection agency license?",
        a: `This directory marks a statewide collection license or registration as generally required in ${licensed.length} states. The table names the agency and the scope. File in each of those states where the debtor lives, not only where the office sits.`,
      },
      {
        q: "Which states do not require a collection agency license?",
        a: `This directory records no standalone statewide collection-agency license in ${noneNames}. The FDCPA still applies. Confirm the category before treating collection as unlicensed in ${confirmNames}.`,
      },
      {
        q: "Does the FDCPA replace a state collection license?",
        a: "No. The Fair Debt Collection Practices Act and CFPB Regulation F apply whether or not a state issues a license. A state collection license does not replace those federal rules.",
      },
      {
        q: "Do New York City or Chicago add a collection license?",
        a: "They can. The Illinois page records a City of Chicago debt-collection license on top of the state license for agencies that collect from Chicago residents. The New York page records a city DCWP license for collection that reaches New York City residents. Read those state pages before you skip the city filing.",
      },
    ],
    updated: HUB_UPDATED,
  };
}

function buildMortgageHub(): DirectoryHub {
  const type = getLicenseType("mortgage")!;
  const split = mortgageSplitSentence();
  const rows = rowsFor("mortgage", (stateSlug, fact) => {
    const state = getState(stateSlug)!;
    return { blurb: `${state.notes} ${fact.licenseName}. ${fact.path}` };
  });
  return {
    slug: "mortgage",
    title: "Mortgage company and broker license requirements by state",
    description:
      "Mortgage company, broker, servicer, and MLO licensing by state. NMLS is the filing system. The state still issues the license. All 50 states and DC.",
    h1: "Mortgage company and broker license requirements by state",
    lede:
      "A company that originates or brokers residential mortgages generally needs a state mortgage company license in each state where it does that work. Brokering is often a separate company authority from lending. Servicing is a separate authority in most states. Individual mortgage loan originators need their own MLO license, filed as an NMLS MU4 and sponsored by a licensed company. NMLS is the filing system. The state still issues or denies the license.",
    ledeLinks: [
      { phrase: "NMLS", href: NMLS_CHART.url },
    ],
    jumps: [
      { href: "#who-needs", label: "Company, broker, servicer, and MLO" },
      { href: "#states", label: "All states" },
      { href: "#faq", label: "FAQ" },
    ],
    sections: [
      {
        id: "who-needs",
        heading: "Mortgage company, broker, servicer, and MLO",
        paragraphs: [
          { text: type.whoNeeds },
          { text: split, links: [{ phrase: "NMLS", href: NMLS_CHART.url }] },
          {
            text: "The official company checklist stays with the NMLS checklist compiler. This page names who needs the company, broker, or servicer authority and which agency issues it. It does not replace that compiler, and it does not restate education hours or net-worth rules that this directory has not cited on the state page.",
            links: [{ phrase: "NMLS checklist compiler", href: NMLS_CHART.url }],
          },
          { text: type.federalOverlay },
        ],
      },
    ],
    tableId: "states",
    tableHeading: "Mortgage licenses by state",
    tableLead:
      "Each note uses that state’s own desk, not a sentence that only swaps the state name. Company lender, broker, and servicer authorities are separate in most states. Fee, bond, and timeline figures stay on the state page unless that page has already cited them.",
    rows,
    faqs: [
      {
        q: "What is the difference between a mortgage company license and a broker license?",
        a: "Both are company authorities. Lending and brokering are often separate licenses. Servicing is a separate authority in most states. An individual originator needs an MLO license, filed as an NMLS MU4, sponsored by a licensed company. Depository institutions register MLOs on the federal NMLS registry instead of holding these state company licenses.",
      },
      {
        q: "Do mortgage servicers use the same license as lenders?",
        a: "Usually no. Servicing is a separate authority in most states, filed on NMLS with the mortgage regulator named in that state’s row. Use the NMLS checklist compiler for the servicer authority. This directory does not treat a lender license as a servicer license.",
      },
      {
        q: "Is an NMLS record the same thing as a mortgage license?",
        a: "No. NMLS is where the company file, control persons, and originators are submitted. The state agency still issues or denies the license. The official checklist is the NMLS checklist compiler.",
      },
      {
        q: "Which states use a mortgage desk other than the banking department?",
        a: split,
      },
    ],
    updated: HUB_UPDATED,
  };
}

function assertPlain(label: string, value: string, allowDollar: boolean) {
  if (value.includes("\u2014") || value.includes("\u2013")) {
    throw new Error(`${label} contains an em dash or en dash`);
  }
  if (/jeff/i.test(value) || /hanok/i.test(value)) {
    throw new Error(`${label} contains a forbidden byline`);
  }
  if (!allowDollar && value.includes("$")) {
    throw new Error(`${label} contains a dollar amount`);
  }
  if (/\b(Irvine|San Marcos|Hanok)\b/.test(value)) {
    throw new Error(`${label} contains a location or brand this page does not use`);
  }
}

function assertLinks(label: string, block: HubBlock) {
  assertPlain(label, block.text, false);
  for (const link of block.links ?? []) {
    if (!block.text.includes(link.phrase)) throw new Error(`${label} is missing link phrase: ${link.phrase}`);
    if (link.href.startsWith("http") && !link.href.startsWith("https://")) {
      throw new Error(`${label} link is not https`);
    }
  }
}

function fingerprint(value: string): string {
  let text = value.toLowerCase();
  const names = [...states.map((state) => state.name), ...states.map((state) => state.abbr), "district", "columbia", "d.c."];
  for (const name of names.sort((a, b) => b.length - a.length)) {
    text = text.replaceAll(name.toLowerCase(), " ");
  }
  return text.replace(/[^a-z0-9]+/g, " ").trim();
}

function assertDistinct(label: string, values: string[]) {
  const seen = new Map<string, number>();
  values.forEach((value, index) => {
    const key = fingerprint(value);
    const prior = seen.get(key);
    if (prior !== undefined) {
      throw new Error(`${label} blurbs ${prior} and ${index} match after state names are removed`);
    }
    seen.set(key, index);
  });
}

function assertHub(hub: DirectoryHub) {
  assertPlain(`${hub.slug} title`, hub.title, false);
  assertPlain(`${hub.slug} description`, hub.description, false);
  assertPlain(`${hub.slug} h1`, hub.h1, false);
  assertPlain(`${hub.slug} lede`, hub.lede, false);
  if (hub.title.length > 65) throw new Error(`${hub.slug} title is ${hub.title.length} characters`);
  if (hub.description.length < 120 || hub.description.length > 170) {
    throw new Error(`${hub.slug} description is ${hub.description.length} characters`);
  }
  for (const link of hub.ledeLinks) {
    if (!hub.lede.includes(link.phrase)) throw new Error(`${hub.slug} lede is missing ${link.phrase}`);
  }
  for (const section of hub.sections) {
    assertPlain(`${hub.slug} heading`, section.heading, false);
    for (const block of section.paragraphs) assertLinks(`${hub.slug} ${section.heading}`, block);
  }
  if (hub.rows.length !== states.length) throw new Error(`${hub.slug} table is not 51 jurisdictions`);
  for (const row of hub.rows) {
    assertPlain(`${hub.slug} ${row.stateSlug} blurb`, row.blurb, false);
    if (row.blurb.length < 40) throw new Error(`${hub.slug} ${row.stateSlug} blurb is thin`);
    if (row.cited) assertPlain(`${hub.slug} ${row.stateSlug} cited`, row.cited, true);
  }
  assertDistinct(hub.slug, hub.rows.map((row) => row.blurb));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(hub.updated)) throw new Error(`${hub.slug} updated date is not ISO`);
  if (hub.faqs.length < 4) throw new Error(`${hub.slug} FAQ is short`);
  for (const faq of hub.faqs) {
    assertPlain(`${hub.slug} faq`, `${faq.q} ${faq.a}`, false);
    if (!faq.q.endsWith("?")) throw new Error(`${hub.slug} question is missing punctuation`);
  }
  const canonical = `${SITE}/directory/${hub.slug}/`;
  if (new URL(canonical).pathname !== `/directory/${hub.slug}/`) {
    throw new Error(`${hub.slug} canonical is not a self path`);
  }
}

const hubs: Record<string, DirectoryHub> = {
  "money-transmitters": buildMoneyTransmitterHub(),
  collection: buildCollectionHub(),
  mortgage: buildMortgageHub(),
};

for (const hub of Object.values(hubs)) assertHub(hub);

const moneyHub = hubs["money-transmitters"];
const moneyQuestion = "Which states require a money transmitter license for a payments startup?";
if (moneyHub.updated !== "2026-10-22") throw new Error("Money transmitter hub date is not October 22, 2026");
if (!moneyHub.sections.some((section) => section.heading === moneyQuestion)) {
  throw new Error("Money transmitter question heading missing");
}
if (!moneyHub.faqs.some((faq) => faq.q === moneyQuestion)) {
  throw new Error("Money transmitter prompt FAQ missing");
}
if (/cornerstone/i.test(JSON.stringify(moneyHub))) {
  throw new Error("Money transmitter hub mentions Cornerstone");
}

export function getDirectoryHub(slug: string): DirectoryHub | undefined {
  return hubs[slug];
}

export function nationalHubLinks(): { href: string; anchor: string }[] {
  return [
    { href: "/directory/money-transmitters", anchor: "Money transmitter license requirements by state" },
    { href: "/directory/collection", anchor: "Collection agency license requirements by state" },
    { href: "/directory/mortgage", anchor: "Mortgage company and broker license requirements by state" },
  ];
}

export function hubWebPageSchema(hub: DirectoryHub) {
  const url = `${SITE}/directory/${hub.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: hub.title,
    description: hub.description,
    dateModified: hub.updated,
    author: { "@type": "Organization", name: "LicensingMadeSimple", url: SITE },
    publisher: { "@type": "Organization", name: "LicensingMadeSimple", url: SITE },
    isPartOf: { "@type": "WebSite", name: "LicensingMadeSimple", url: SITE },
  };
}

export function hubBreadcrumbSchema(hub: DirectoryHub) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Directory", item: `${SITE}/directory/` },
      { "@type": "ListItem", position: 3, name: hub.h1, item: `${SITE}/directory/${hub.slug}/` },
    ],
  };
}
