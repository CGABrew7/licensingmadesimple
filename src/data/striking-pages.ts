import type { LicenseSlug } from "./license-types";
import { getLicenseType } from "./license-types";
import { getStateLicense } from "./state-licenses";
import { getState } from "./states";

export interface TextLink {
  phrase: string;
  href: string;
}

export interface CopyBlock {
  text: string;
  links?: TextLink[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export type InboundTarget = "directory" | "nmls" | "multi-state" | "first-license" | "state";

export interface StrikingPage {
  state: string;
  type: LicenseSlug;
  title: string;
  description: string;
  h1: string;
  whoHeading: string;
  whereHeading: string;
  placement: "before-who" | "after-who";
  sectionHeading: string;
  paragraphs: CopyBlock[];
  whoExtra?: CopyBlock[];
  faqs: FaqItem[];
  cta: {
    heading: string;
    body: string;
    button: string;
    buttonHref: string;
    text: string;
    textHref: string;
  };
  inbounds: { target: InboundTarget; anchor: string }[];
}

const MSB_BONDS = "https://cornerstonelicensing.com/education/industry/money-transmitter/msb-bonds";
const WHAT_IS_BOND = "https://cornerstonelicensing.com/education/foundations/what-is-a-surety-bond";
const COLLECTION_BONDS = "https://cornerstonelicensing.com/education/industry/debt-collection/collection-bonds";
const MORTGAGE_SERVICER = "https://cornerstonelicensing.com/mortgage-servicer-licensing";
const MORTGAGE_LENDER = "https://cornerstonelicensing.com/mortgage-lender-broker-licensing";
const MORTGAGE_MLO = "https://cornerstonelicensing.com/mortgage-loan-originator-licensing";
const NMLS_URL = "https://mortgage.nationwidelicensingsystem.org/";

function record(state: string, type: LicenseSlug) {
  const fact = getStateLicense(state, type);
  if (!fact) throw new Error(`Missing license record for ${state} ${type}`);
  return fact;
}

function expectAgency(state: string, type: LicenseSlug, name: string, url: string) {
  const fact = record(state, type);
  if (fact.agencyName !== name || fact.agencyUrl !== url) {
    throw new Error(`Agency record for ${state} ${type} does not match the stored name or URL`);
  }
  if (fact.required !== true) {
    throw new Error(`${state} ${type} is not a generally required license, so the new section stays unpublished`);
  }
  const blob = `${fact.whoNeeds} ${fact.path} ${fact.licenseName} ${fact.notes.join(" ")}`;
  if (/\$\d/.test(blob)) {
    throw new Error(`${state} ${type} record contains a dollar amount`);
  }
  return fact;
}

const maine = expectAgency(
  "maine",
  "money-transmitters",
  "Maine Bureau of Financial Institutions",
  "https://www.maine.gov/pfr/financialinstitutions/",
);
const iowa = expectAgency(
  "iowa",
  "money-transmitters",
  "Iowa Division of Banking",
  "https://www.idob.iowa.gov/",
);
const connecticut = expectAgency(
  "connecticut",
  "mortgage",
  "Connecticut Department of Banking",
  "https://portal.ct.gov/dob",
);
const southDakota = expectAgency(
  "south-dakota",
  "money-transmitters",
  "South Dakota Division of Banking",
  "https://dlr.sd.gov/banking/",
);
const arkansas = expectAgency(
  "arkansas",
  "collection",
  "Arkansas State Board of Collection Agencies",
  "https://asbca.arkansas.gov/",
);
const hawaii = expectAgency(
  "hawaii",
  "money-transmitters",
  "Hawaii Division of Financial Institutions",
  "https://cca.hawaii.gov/dfi/",
);
const nevada = expectAgency(
  "nevada",
  "money-transmitters",
  "Nevada Financial Institutions Division",
  "https://fid.nv.gov/",
);
const massachusetts = expectAgency(
  "massachusetts",
  "money-transmitters",
  "Massachusetts Division of Banks",
  "https://www.mass.gov/orgs/division-of-banks",
);
const maryland = expectAgency(
  "maryland",
  "mortgage",
  "Maryland Office of the Commissioner of Financial Regulation",
  "https://www.labor.maryland.gov/finance/",
);
const newHampshire = expectAgency(
  "new-hampshire",
  "money-transmitters",
  "New Hampshire Banking Department",
  "https://www.nh.gov/banking/",
);

if (maine.filing !== "nmls" || !maine.path.includes("not BCCP")) {
  throw new Error("Maine money transmitter filing record changed");
}
if (iowa.filing !== "nmls" || !iowa.path.includes("on NMLS")) {
  throw new Error("Iowa money transmitter filing record changed");
}
if (connecticut.filing !== "nmls" || !connecticut.path.toLowerCase().includes("servicer")) {
  throw new Error("Connecticut mortgage record has no servicer filing path");
}
if (arkansas.filing !== "state-portal") {
  throw new Error("Arkansas collection record is not a state portal or board filing");
}
if (hawaii.filing !== "nmls") throw new Error("Hawaii money transmitter filing record changed");
if (nevada.filing !== "nmls" || !nevada.path.includes("Division of Mortgage Lending")) {
  throw new Error("Nevada money transmitter filing record changed");
}
if (massachusetts.filing !== "nmls" || !massachusetts.path.includes("foreign-transmittal")) {
  throw new Error("Massachusetts money transmitter filing record changed");
}
if (maryland.filing !== "nmls") throw new Error("Maryland mortgage filing record changed");
const marylandBlob = `${maryland.whoNeeds} ${maryland.path} ${maryland.licenseName} ${maryland.notes.join(" ")}`;
if (marylandBlob.includes("113054") || marylandBlob.includes("2550")) {
  throw new Error("Maryland mortgage record names an NMLS ID holder; review before publishing");
}

const exemption = "Agent-of-payee and payment-processor exemptions are statutory and fact-specific.";
const federal = getLicenseType("money-transmitters")?.federalOverlay ?? "";
if (!federal.includes("They never substitute for a required state money-transmitter license.")) {
  throw new Error("Money transmitter federal overlay no longer states the FinCEN rule");
}

function assertGatedTransmitter(stateName: string, fact: ReturnType<typeof record>) {
  if (fact.filing !== "nmls" || !fact.path.includes("on NMLS")) {
    throw new Error(`${stateName} record does not say NMLS`);
  }
  if (!fact.path.includes(`never replaces the ${stateName} license`)) {
    throw new Error(`${stateName} record does not say FinCEN registration never replaces the state license`);
  }
  if (!fact.whoNeeds.includes(exemption)) {
    throw new Error(`${stateName} record does not include the exemption sentence`);
  }
  const recordBlob = `${fact.whoNeeds} ${fact.path} ${fact.notes.join(" ")}`;
  if (recordBlob.includes("1960") || recordBlob.includes("BCCP") || recordBlob.includes("Mortgage Lending")) {
    throw new Error(`${stateName} record contains a sentence this page must not copy from another state`);
  }
}

assertGatedTransmitter("South Dakota", southDakota);
assertGatedTransmitter("New Hampshire", newHampshire);

function bondCloser(lawPhrase: string, lawHref: string): CopyBlock {
  return {
    text: `See ${lawPhrase}, money transmitter surety bonds, and what a surety bond is.`,
    links: [
      { phrase: lawPhrase, href: lawHref },
      { phrase: "money transmitter surety bonds", href: MSB_BONDS },
      { phrase: "what a surety bond is", href: WHAT_IS_BOND },
    ],
  };
}

function transmitterInbounds(anchorDirectory: string, anchorNmls: string, anchorMulti: string, anchorState: string) {
  return [
    { target: "directory" as const, anchor: anchorDirectory },
    { target: "nmls" as const, anchor: anchorNmls },
    { target: "multi-state" as const, anchor: anchorMulti },
    { target: "state" as const, anchor: anchorState },
  ];
}

const pages: StrikingPage[] = [
  {
    state: "maine",
    type: "money-transmitters",
    title: "Maine money transmitter bond and license",
    description:
      "Maine money transmitter bond: file the license with the Bureau of Financial Institutions on NMLS. FinCEN registration does not replace the license.",
    h1: "Maine money transmitter bond and license",
    whoHeading: "Who needs a Maine money transmitter license",
    whereHeading: "Where to file the Maine license and bond",
    placement: "after-who",
    sectionHeading: "Maine money transmitter bond",
    paragraphs: [
      {
        text: "To get a Maine money transmitter bond, file the Maine money transmitter license with the Maine Bureau of Financial Institutions through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
        links: [{ phrase: "Maine Bureau of Financial Institutions", href: maine.agencyUrl }],
      },
      {
        text: "A business that receives money or monetary value from Maine customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs that license from the Maine Bureau of Financial Institutions. Maine money transmitter filings go to the Bureau of Financial Institutions, not BCCP. The Bureau issues or denies the license. NMLS is the filing system.",
      },
      {
        text: "Agent-of-payee and payment-processor exemptions are statutory and fact-specific. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Maine license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
      },
      bondCloser(
        "Maine money transmitter laws",
        "https://cornerstonelicensing.com/money-transmitter-laws/maine-money-transmitter-laws",
      ),
    ],
    faqs: [
      {
        q: "How does a Maine money transmitter bond get filed?",
        a: "File the Maine money transmitter license with the Maine Bureau of Financial Institutions through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
      },
      {
        q: "Who needs a money transmitter license in Maine?",
        a: "A business that receives money or monetary value from Maine customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs a license from the Maine Bureau of Financial Institutions. Agent-of-payee and payment-processor exemptions are statutory and fact-specific.",
      },
      {
        q: "Where do I file a Maine money transmitter bond?",
        a: "File it with the Maine license. Maine money transmitter filings go to the Bureau of Financial Institutions through NMLS, not BCCP. The Bureau issues or denies the license.",
      },
      {
        q: "Does FinCEN MSB registration replace a Maine money transmitter license?",
        a: "No. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Maine license.",
      },
      {
        q: "Who can file the Maine license and place the bond?",
        a: "Cornerstone Licensing prepares the Maine application, places any required bond, and files it through NMLS with the Maine Bureau of Financial Institutions.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Maine bond and license",
      body: "Cornerstone Licensing prepares the Maine money transmitter application, places any required bond, and files it with the Maine Bureau of Financial Institutions through NMLS.",
      button: "File the Maine license",
      buttonHref: "https://cornerstonelicensing.com/apply/money-transmitter/me",
      text: "Maine money transmitter laws",
      textHref: "https://cornerstonelicensing.com/money-transmitter-laws/maine-money-transmitter-laws",
    },
    inbounds: transmitterInbounds(
      "Maine money transmitter bond",
      "Maine money transmitter license on NMLS",
      "money transmitter license in Maine",
      "Maine money transmitter bond",
    ),
  },
  {
    state: "iowa",
    type: "money-transmitters",
    title: "Iowa money transmitter bond and license",
    description:
      "Iowa money transmitter bond: file the license with the Iowa Division of Banking on NMLS. FinCEN MSB registration does not replace the bond or the license.",
    h1: "Iowa money transmitter bond and license",
    whoHeading: "Who needs an Iowa money transmitter license",
    whereHeading: "Where to file the Iowa license and bond",
    placement: "after-who",
    sectionHeading: "Iowa money transmitter bond",
    paragraphs: [
      {
        text: "To get an Iowa money transmitter bond, file the Iowa money transmitter license with the Iowa Division of Banking through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
        links: [{ phrase: "Iowa Division of Banking", href: iowa.agencyUrl }],
      },
      {
        text: "A business that receives money or monetary value from Iowa customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs that license from the Iowa Division of Banking. Request the Iowa money transmitter license on NMLS. The Division of Banking issues or denies the license. NMLS is the filing system.",
      },
      {
        text: "Agent-of-payee and payment-processor exemptions are statutory and fact-specific. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Iowa license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
      },
      bondCloser(
        "Iowa money transmitter laws",
        "https://cornerstonelicensing.com/money-transmitter-laws/iowa-money-transmitter-laws",
      ),
    ],
    faqs: [
      {
        q: "How does an Iowa money transmitter bond get filed?",
        a: "File the Iowa money transmitter license with the Iowa Division of Banking through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
      },
      {
        q: "Who needs a money transmitter license in Iowa?",
        a: "A business that receives money or monetary value from Iowa customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs a license from the Iowa Division of Banking. Agent-of-payee and payment-processor exemptions are statutory and fact-specific.",
      },
      {
        q: "Where do I file an Iowa money transmitter bond?",
        a: "Request the Iowa money transmitter license on NMLS. The Iowa Division of Banking issues or denies the license. Any required bond is placed with that filing.",
      },
      {
        q: "Does FinCEN MSB registration replace an Iowa money transmitter license?",
        a: "No. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Iowa license.",
      },
      {
        q: "Who can file the Iowa license and place the bond?",
        a: "Cornerstone Licensing prepares the Iowa application, places any required bond, and files it on NMLS with the Iowa Division of Banking.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Iowa bond and license",
      body: "Cornerstone Licensing prepares the Iowa money transmitter application, places any required bond, and files it with the Iowa Division of Banking through NMLS.",
      button: "File the Iowa license",
      buttonHref: "https://cornerstonelicensing.com/apply/money-transmitter/ia",
      text: "Iowa money transmitter laws",
      textHref: "https://cornerstonelicensing.com/money-transmitter-laws/iowa-money-transmitter-laws",
    },
    inbounds: transmitterInbounds(
      "Iowa money transmitter bond",
      "Iowa money transmitter license on NMLS",
      "money transmitter license in Iowa",
      "Iowa money transmitter bond",
    ),
  },
  {
    state: "connecticut",
    type: "mortgage",
    title: "Connecticut mortgage servicer license on NMLS",
    description:
      "Connecticut mortgage servicer license: lender, broker, and servicer filings go to the Department of Banking on NMLS. See who needs it and where to file.",
    h1: "Connecticut mortgage servicer license on NMLS",
    whoHeading: "Who needs a Connecticut mortgage license",
    whereHeading: "Where to file on NMLS",
    placement: "before-who",
    sectionHeading: "Connecticut mortgage servicer license",
    paragraphs: [
      {
        text: "A company that services residential mortgage loans in Connecticut generally needs a state mortgage license from the Connecticut Department of Banking. Request Connecticut mortgage lender, broker, and servicer licenses on NMLS. NMLS is the filing system. The Department of Banking issues or denies the license.",
        links: [{ phrase: "Connecticut Department of Banking", href: connecticut.agencyUrl }],
      },
      {
        text: "Lending or brokering is usually one company authority. Servicing is a separate authority in most states. A company that services Connecticut residential loans uses this same Department of Banking filing on NMLS. Individual MLOs need their own MU4 license (mortgage loan originator licensing) sponsored by a licensed company. Depository institutions register MLOs on the federal NMLS registry instead of holding this company license.",
        links: [{ phrase: "mortgage loan originator licensing", href: MORTGAGE_MLO }],
      },
      {
        text: "CFPB mortgage-servicing rules apply to many servicers in addition to the state license. The SAFE Act, TILA/RESPA, and ECOA apply as well. Cornerstone Licensing prepares the Connecticut mortgage application, places any required bond, and files it on NMLS.",
      },
      {
        text: "See mortgage servicer licensing and Connecticut mortgage laws.",
        links: [
          { phrase: "mortgage servicer licensing", href: MORTGAGE_SERVICER },
          { phrase: "Connecticut mortgage laws", href: "https://cornerstonelicensing.com/mortgage-laws/connecticut-mortgage-laws" },
        ],
      },
    ],
    whoExtra: [
      {
        text: "See mortgage lender and broker licensing.",
        links: [{ phrase: "mortgage lender and broker licensing", href: MORTGAGE_LENDER }],
      },
    ],
    faqs: [
      {
        q: "Who needs a mortgage servicer license in Connecticut?",
        a: "A company that services residential mortgage loans in Connecticut generally needs a state mortgage license from the Connecticut Department of Banking. Request lender, broker, and servicer licenses on NMLS.",
      },
      {
        q: "Where do I file a Connecticut mortgage servicer license?",
        a: "File on NMLS. The Connecticut Department of Banking issues or denies the license. NMLS is the filing system.",
      },
      {
        q: "Is Connecticut mortgage servicing separate from lending?",
        a: "Lending or brokering is usually one company authority. Servicing is a separate authority in most states. Connecticut lender, broker, and servicer licenses are requested on NMLS from the Department of Banking.",
      },
      {
        q: "Do Connecticut MLOs use the company mortgage license?",
        a: "Individual MLOs need their own MU4 license sponsored by a licensed company. Depository institutions register MLOs on the federal NMLS registry instead of holding this company license.",
      },
      {
        q: "Who can file a Connecticut mortgage servicer application?",
        a: "Cornerstone Licensing prepares the Connecticut mortgage application, places any required bond, and files it on NMLS.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Connecticut mortgage license",
      body: "Cornerstone Licensing prepares the Connecticut mortgage lender, broker, and servicer application, places any required bond, and files it with the Connecticut Department of Banking through NMLS.",
      button: "File the Connecticut license",
      buttonHref: "https://cornerstonelicensing.com/apply/mortgage/ct",
      text: "Mortgage servicer licensing",
      textHref: MORTGAGE_SERVICER,
    },
    inbounds: [
      { target: "directory", anchor: "Connecticut mortgage servicer license" },
      { target: "nmls", anchor: "Connecticut mortgage license on NMLS" },
      { target: "multi-state", anchor: "mortgage license in Connecticut" },
      { target: "state", anchor: "Connecticut mortgage servicer license" },
    ],
  },
  {
    state: "south-dakota",
    type: "money-transmitters",
    title: "South Dakota money transmitter bond",
    description:
      "South Dakota money transmitter bond and the license it is filed with. See who needs the license, which agency takes the filing, and how to start.",
    h1: "South Dakota money transmitter bond and license",
    whoHeading: "Who needs a South Dakota money transmitter license",
    whereHeading: "Where to file the South Dakota license and bond",
    placement: "after-who",
    sectionHeading: "South Dakota money transmitter bond",
    paragraphs: [
      {
        text: `To get a South Dakota money transmitter bond, file the South Dakota money transmitter license with the ${southDakota.agencyName} through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.`,
        links: [{ phrase: southDakota.agencyName, href: southDakota.agencyUrl }],
      },
      {
        text: `A business that receives money or monetary value from South Dakota customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs that license from the ${southDakota.agencyName}. NMLS is the filing system and the ${southDakota.agencyName} issues or denies the license.`,
      },
      {
        text: "Agent-of-payee and payment-processor exemptions are statutory and fact-specific. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the South Dakota license.",
      },
      bondCloser(
        "South Dakota money transmitter laws",
        "https://cornerstonelicensing.com/money-transmitter-laws/south-dakota-money-transmitter-laws",
      ),
    ],
    faqs: [
      {
        q: "How does a South Dakota money transmitter bond get filed?",
        a: `File the South Dakota money transmitter license with the ${southDakota.agencyName} through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.`,
      },
      {
        q: "Who needs a money transmitter license in South Dakota?",
        a: southDakota.whoNeeds,
      },
      {
        q: "Where do I file a South Dakota money transmitter bond?",
        a: `File it with the South Dakota license on NMLS. The ${southDakota.agencyName} issues or denies the license.`,
      },
      {
        q: "Does FinCEN MSB registration replace a South Dakota money transmitter license?",
        a: "No. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the South Dakota license.",
      },
      {
        q: "Who can file the South Dakota license and place the bond?",
        a: "Cornerstone Licensing prepares the South Dakota application, places any required bond, and files it.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the South Dakota bond and license",
      body: `Cornerstone Licensing prepares the South Dakota money transmitter application, places any required bond, and files it with the ${southDakota.agencyName} through NMLS.`,
      button: "File the South Dakota license",
      buttonHref: "https://cornerstonelicensing.com/apply/money-transmitter/sd",
      text: "South Dakota money transmitter laws",
      textHref: "https://cornerstonelicensing.com/money-transmitter-laws/south-dakota-money-transmitter-laws",
    },
    inbounds: transmitterInbounds(
      "South Dakota money transmitter bond",
      "South Dakota money transmitter license on NMLS",
      "money transmitter license in South Dakota",
      "South Dakota money transmitter bond",
    ),
  },
  {
    state: "arkansas",
    type: "collection",
    title: "Arkansas collection agency license and bond",
    description:
      "Arkansas collection agency license and bond. Third-party agencies file with the State Board of Collection Agencies, not the banking department.",
    h1: "Arkansas collection agency license and bond",
    whoHeading: "Who needs an Arkansas collection agency license",
    whereHeading: "Where to file the Arkansas collection license",
    placement: "after-who",
    sectionHeading: "Arkansas collection agency license bond",
    paragraphs: [
      {
        text: "For an Arkansas collection agency license bond, start with the Collection Agency License. Third-party collection agencies operating in Arkansas generally need that license from the Arkansas State Board of Collection Agencies. The Board is a standalone board rather than the banking department. This is the Arkansas debt collection license.",
        links: [{ phrase: "Arkansas State Board of Collection Agencies", href: arkansas.agencyUrl }],
      },
      {
        text: "File directly with the State Board of Collection Agencies, through the state portal or the board. Mortgage and lender filings do not cover collection work in Arkansas. The Board, not a mortgage regulator, is the desk that accepts the license and any bond filed with it. Cornerstone Licensing prepares the application, places any required bond, and files it with the Board.",
      },
      {
        text: "The Fair Debt Collection Practices Act, CFPB Regulation F, and the TCPA apply whether or not Arkansas issues a license. State licensing sits alongside those federal rules.",
      },
      {
        text: "See collection agency surety bonds and Arkansas debt collection laws.",
        links: [
          { phrase: "collection agency surety bonds", href: COLLECTION_BONDS },
          {
            phrase: "Arkansas debt collection laws",
            href: "https://cornerstonelicensing.com/debt-collection-laws/arkansas-debt-collection-laws",
          },
        ],
      },
    ],
    whoExtra: [
      {
        text: "See the collection agency license.",
        links: [
          {
            phrase: "collection agency license",
            href: "https://cornerstonelicensing.com/glossary/collection-agency-license",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Does Arkansas require a collection agency license bond?",
        a: "Third-party collection agencies operating in Arkansas generally need a Collection Agency License from the Arkansas State Board of Collection Agencies. Cornerstone Licensing places any required bond when it files that application with the Board.",
      },
      {
        q: "Who needs an Arkansas debt collection license?",
        a: "Third-party collection agencies operating in Arkansas generally need the Collection Agency License. The State Board of Collection Agencies issues it. The Board is a standalone board rather than the banking department.",
      },
      {
        q: "Where do I file an Arkansas collection agency license?",
        a: "File directly with the Arkansas State Board of Collection Agencies, through the state portal or the board. Mortgage and lender filings do not cover collection work in Arkansas.",
      },
      {
        q: "Does the Arkansas banking department issue the collection agency license?",
        a: "The State Board of Collection Agencies issues this license. It is a standalone board rather than the banking department.",
      },
      {
        q: "Does an NMLS mortgage license cover Arkansas collection work?",
        a: "Mortgage and lender filings do not cover collection work in Arkansas. Collection agencies file with the State Board of Collection Agencies.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Arkansas collection license and bond",
      body: "Cornerstone Licensing prepares the Arkansas collection agency application, places any required bond, and files it with the Arkansas State Board of Collection Agencies.",
      button: "File the Arkansas license",
      buttonHref: "https://cornerstonelicensing.com/apply/debt-collection/ar",
      text: "Collection agency surety bonds",
      textHref: COLLECTION_BONDS,
    },
    inbounds: [
      { target: "directory", anchor: "Arkansas collection agency license and bond" },
      { target: "multi-state", anchor: "collection agency license in Arkansas" },
      { target: "first-license", anchor: "Arkansas collection agency license" },
      { target: "state", anchor: "Arkansas collection agency license and bond" },
    ],
  },
  {
    state: "hawaii",
    type: "money-transmitters",
    title: "Hawaii money transmitter bond and license",
    description:
      "Hawaii money transmitter bond: file the license with the Division of Financial Institutions on NMLS. FinCEN registration does not replace the license.",
    h1: "Hawaii money transmitter bond and license",
    whoHeading: "Who needs a Hawaii money transmitter license",
    whereHeading: "Where to file the Hawaii license and bond",
    placement: "after-who",
    sectionHeading: "Hawaii money transmitter bond",
    paragraphs: [
      {
        text: "To get a Hawaii money transmitter bond, file the Hawaii money transmitter license with the Hawaii Division of Financial Institutions through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
        links: [{ phrase: "Hawaii Division of Financial Institutions", href: hawaii.agencyUrl }],
      },
      {
        text: "A business that receives money or monetary value from Hawaii customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs that license from the Hawaii Division of Financial Institutions. Request the Hawaii money transmitter license on NMLS. The Division issues or denies the license. NMLS is the filing system.",
      },
      {
        text: "Agent-of-payee and payment-processor exemptions are statutory and fact-specific. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Hawaii license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
      },
      bondCloser(
        "Hawaii money transmitter laws",
        "https://cornerstonelicensing.com/money-transmitter-laws/hawaii-money-transmitter-laws",
      ),
    ],
    faqs: [
      {
        q: "How does a Hawaii money transmitter bond get filed?",
        a: "File the Hawaii money transmitter license with the Hawaii Division of Financial Institutions through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
      },
      {
        q: "Who needs a money transmitter license in Hawaii?",
        a: "A business that receives money or monetary value from Hawaii customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs a license from the Hawaii Division of Financial Institutions. Agent-of-payee and payment-processor exemptions are statutory and fact-specific.",
      },
      {
        q: "Where do I file a Hawaii money transmitter bond?",
        a: "Request the Hawaii money transmitter license on NMLS. The Hawaii Division of Financial Institutions issues or denies the license. Any required bond is placed with that filing.",
      },
      {
        q: "Does FinCEN MSB registration replace a Hawaii money transmitter license?",
        a: "No. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Hawaii license.",
      },
      {
        q: "Who can file the Hawaii license and place the bond?",
        a: "Cornerstone Licensing prepares the Hawaii application, places any required bond, and files it on NMLS with the Hawaii Division of Financial Institutions.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Hawaii bond and license",
      body: "Cornerstone Licensing prepares the Hawaii money transmitter application, places any required bond, and files it with the Hawaii Division of Financial Institutions through NMLS.",
      button: "File the Hawaii license",
      buttonHref: "https://cornerstonelicensing.com/apply/money-transmitter/hi",
      text: "Hawaii money transmitter laws",
      textHref: "https://cornerstonelicensing.com/money-transmitter-laws/hawaii-money-transmitter-laws",
    },
    inbounds: transmitterInbounds(
      "Hawaii money transmitter bond",
      "Hawaii money transmitter license on NMLS",
      "money transmitter license in Hawaii",
      "Hawaii money transmitter bond",
    ),
  },
  {
    state: "nevada",
    type: "money-transmitters",
    title: "Nevada money transmitter bond and license",
    description:
      "Nevada money transmitter bond: file on NMLS with the Financial Institutions Division, not the Division of Mortgage Lending. FinCEN is separate.",
    h1: "Nevada money transmitter bond and license",
    whoHeading: "Who needs a Nevada money transmitter license",
    whereHeading: "Where to file the Nevada license and bond",
    placement: "after-who",
    sectionHeading: "Nevada money transmitter bond",
    paragraphs: [
      {
        text: "To get a Nevada money transmitter bond, file the Nevada money transmitter license with the Nevada Financial Institutions Division through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
        links: [{ phrase: "Nevada Financial Institutions Division", href: nevada.agencyUrl }],
      },
      {
        text: "A business that receives money or monetary value from Nevada customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs that license from the Nevada Financial Institutions Division. File the license on NMLS with the Financial Institutions Division, not the Division of Mortgage Lending. The Division issues or denies the license. NMLS is the filing system.",
      },
      {
        text: "Agent-of-payee and payment-processor exemptions are statutory and fact-specific. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Nevada license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
      },
      bondCloser(
        "Nevada money transmitter laws",
        "https://cornerstonelicensing.com/money-transmitter-laws/nevada-money-transmitter-laws",
      ),
    ],
    faqs: [
      {
        q: "How does a Nevada money transmitter bond get filed?",
        a: "File the Nevada money transmitter license on NMLS with the Nevada Financial Institutions Division, not the Division of Mortgage Lending. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
      },
      {
        q: "Who needs a money transmitter license in Nevada?",
        a: "A business that receives money or monetary value from Nevada customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs a license from the Nevada Financial Institutions Division. Agent-of-payee and payment-processor exemptions are statutory and fact-specific.",
      },
      {
        q: "Where do I file a Nevada money transmitter bond?",
        a: "File the Nevada money transmitter license on NMLS with the Financial Institutions Division, not the Division of Mortgage Lending. The Division issues or denies the license.",
      },
      {
        q: "Does FinCEN MSB registration replace a Nevada money transmitter license?",
        a: "No. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Nevada license.",
      },
      {
        q: "Who can file the Nevada license and place the bond?",
        a: "Cornerstone Licensing prepares the Nevada application, places any required bond, and files it on NMLS with the Nevada Financial Institutions Division.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Nevada bond and license",
      body: "Cornerstone Licensing prepares the Nevada money transmitter application, places any required bond, and files it with the Nevada Financial Institutions Division through NMLS.",
      button: "File the Nevada license",
      buttonHref: "https://cornerstonelicensing.com/apply/money-transmitter/nv",
      text: "Nevada money transmitter laws",
      textHref: "https://cornerstonelicensing.com/money-transmitter-laws/nevada-money-transmitter-laws",
    },
    inbounds: transmitterInbounds(
      "Nevada money transmitter bond",
      "Nevada money transmitter license on NMLS",
      "money transmitter license in Nevada",
      "Nevada money transmitter bond",
    ),
  },
  {
    state: "massachusetts",
    type: "money-transmitters",
    title: "Massachusetts foreign transmittal agency bond",
    description:
      "Massachusetts foreign transmittal agency bond: file the license with the Division of Banks on NMLS. FinCEN registration does not replace the license.",
    h1: "Massachusetts foreign transmittal agency bond",
    whoHeading: "Who needs a Massachusetts foreign transmittal license",
    whereHeading: "Where to file the foreign transmittal license and bond",
    placement: "after-who",
    sectionHeading: "Massachusetts foreign transmittal agency bond",
    paragraphs: [
      {
        text: "To get a Massachusetts foreign transmittal agency bond, file the Massachusetts foreign-transmittal / money-services license with the Massachusetts Division of Banks through NMLS. That license is the Massachusetts money transmitter license. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
        links: [{ phrase: "Massachusetts Division of Banks", href: massachusetts.agencyUrl }],
      },
      {
        text: "A business that receives money or monetary value from Massachusetts customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs that license from the Massachusetts Division of Banks. File the Massachusetts foreign-transmittal / money-services license on NMLS. The Division of Banks issues or denies the license. NMLS is the filing system.",
      },
      {
        text: "Agent-of-payee and payment-processor exemptions are statutory and fact-specific. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Massachusetts license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
      },
      bondCloser(
        "Massachusetts money transmitter laws",
        "https://cornerstonelicensing.com/money-transmitter-laws/massachusetts-money-transmitter-laws",
      ),
    ],
    faqs: [
      {
        q: "Does Massachusetts require a foreign transmittal agency bond?",
        a: "File the Massachusetts foreign-transmittal / money-services license with the Massachusetts Division of Banks on NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.",
      },
      {
        q: "Is a Massachusetts foreign transmittal license the money transmitter license?",
        a: "On this page, the foreign-transmittal / money-services license is the Massachusetts money transmitter license. File it on NMLS with the Massachusetts Division of Banks.",
      },
      {
        q: "Who needs a Massachusetts foreign transmittal license?",
        a: "A business that receives money or monetary value from Massachusetts customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs this license from the Massachusetts Division of Banks. Agent-of-payee and payment-processor exemptions are statutory and fact-specific.",
      },
      {
        q: "Where do I file a Massachusetts foreign transmittal agency bond?",
        a: "File it with the license. The Massachusetts foreign-transmittal / money-services license is filed on NMLS with the Division of Banks. The Division issues or denies the license.",
      },
      {
        q: "Does FinCEN MSB registration replace the Massachusetts foreign transmittal license?",
        a: "No. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the Massachusetts license.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Massachusetts foreign transmittal bond",
      body: "Cornerstone Licensing prepares the Massachusetts foreign transmittal application, places any required bond, and files it with the Massachusetts Division of Banks through NMLS.",
      button: "File the Massachusetts license",
      buttonHref: "https://cornerstonelicensing.com/apply/money-transmitter/ma",
      text: "Massachusetts money transmitter laws",
      textHref: "https://cornerstonelicensing.com/money-transmitter-laws/massachusetts-money-transmitter-laws",
    },
    inbounds: transmitterInbounds(
      "Massachusetts foreign transmittal agency bond",
      "Massachusetts foreign transmittal license on NMLS",
      "money transmitter license in Massachusetts",
      "Massachusetts foreign transmittal agency bond",
    ),
  },
  {
    state: "maryland",
    type: "mortgage",
    title: "Maryland mortgage license on NMLS",
    description:
      "Maryland mortgage license on NMLS. Lender, broker, and servicer companies file with the Maryland Office of the Commissioner of Financial Regulation.",
    h1: "Maryland mortgage license on NMLS",
    whoHeading: "Who needs a Maryland mortgage license",
    whereHeading: "Where to file on NMLS",
    placement: "before-who",
    sectionHeading: "Maryland mortgage licenses on NMLS",
    paragraphs: [
      {
        text: "Maryland mortgage lender, broker, and servicer licenses are requested on NMLS with the Maryland Office of the Commissioner of Financial Regulation. The Office issues or denies the license. NMLS is the filing system. An NMLS number search lands on this page because Maryland company mortgage licenses are filed in that system.",
        links: [
          { phrase: "NMLS", href: NMLS_URL },
          { phrase: "Maryland Office of the Commissioner of Financial Regulation", href: maryland.agencyUrl },
        ],
      },
      {
        text: "A company that originates, brokers, or services residential mortgage loans in Maryland generally needs this state mortgage license. Lending or brokering is usually one company authority. Servicing is a separate authority in most states. Individual MLOs need their own MU4 license (mortgage loan originator licensing) sponsored by a licensed company. Depository institutions register MLOs on the federal NMLS registry instead of holding this company license.",
        links: [{ phrase: "mortgage loan originator licensing", href: MORTGAGE_MLO }],
      },
      {
        text: "Open NMLS for a specific NMLS ID. Use this page to see who needs the Maryland company license and which office takes the filing. Cornerstone Licensing prepares the Maryland mortgage application, places any required bond, and files it on NMLS. The SAFE Act, TILA/RESPA, ECOA, and, for many servicers, CFPB mortgage-servicing rules apply along with the state license.",
      },
      {
        text: "See mortgage lender and broker licensing, mortgage servicer licensing, and Maryland mortgage laws.",
        links: [
          { phrase: "mortgage lender and broker licensing", href: MORTGAGE_LENDER },
          { phrase: "mortgage servicer licensing", href: MORTGAGE_SERVICER },
          { phrase: "Maryland mortgage laws", href: "https://cornerstonelicensing.com/mortgage-laws/maryland-mortgage-laws" },
        ],
      },
    ],
    faqs: [
      {
        q: "What is NMLS 113054?",
        a: "Maryland mortgage lender, broker, and servicer licenses are filed on NMLS with the Maryland Office of the Commissioner of Financial Regulation. This page is that filing map. Open NMLS for a specific NMLS ID. Individual MLOs need an MU4 license sponsored by a licensed company.",
      },
      {
        q: "What is NMLS 2550?",
        a: "Maryland company mortgage licenses are requested on NMLS, and the Maryland Office of the Commissioner of Financial Regulation issues or denies them. This page covers who needs the Maryland license and where to file. Open a single NMLS ID on NMLS.",
      },
      {
        q: "Who needs a mortgage license in Maryland?",
        a: "A company that originates, brokers, or services residential mortgage loans in Maryland generally needs a state mortgage license from the Maryland Office of the Commissioner of Financial Regulation. Lending or brokering is usually one company authority. Servicing is a separate authority in most states.",
      },
      {
        q: "Where do I file a Maryland mortgage lender or broker license?",
        a: "Request it on NMLS. The Maryland Office of the Commissioner of Financial Regulation issues or denies the license. NMLS is the filing system.",
      },
      {
        q: "Do Maryland banks file this mortgage company license?",
        a: "Depository institutions register MLOs on the federal NMLS registry instead of holding this company license.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the Maryland mortgage license",
      body: "Cornerstone Licensing prepares the Maryland mortgage lender, broker, and servicer application, places any required bond, and files it with the Maryland Office of the Commissioner of Financial Regulation through NMLS.",
      button: "File the Maryland license",
      buttonHref: "https://cornerstonelicensing.com/apply/mortgage/md",
      text: "Mortgage lender and broker licensing",
      textHref: MORTGAGE_LENDER,
    },
    inbounds: [
      { target: "directory", anchor: "Maryland mortgage license on NMLS" },
      { target: "nmls", anchor: "Maryland mortgage filing on NMLS" },
      { target: "multi-state", anchor: "mortgage license in Maryland" },
      { target: "state", anchor: "Maryland mortgage license on NMLS" },
    ],
  },
  {
    state: "new-hampshire",
    type: "money-transmitters",
    title: "New Hampshire money transmitter bond",
    description:
      "New Hampshire money transmitter bond and the license it is filed with. See who needs the license, which agency takes the filing, and how to start.",
    h1: "New Hampshire money transmitter bond and license",
    whoHeading: "Who needs a New Hampshire money transmitter license",
    whereHeading: "Where to file the New Hampshire license and bond",
    placement: "after-who",
    sectionHeading: "New Hampshire money transmitter bond",
    paragraphs: [
      {
        text: `To get a New Hampshire money transmitter bond, file the New Hampshire money transmitter license with the ${newHampshire.agencyName} through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.`,
        links: [{ phrase: newHampshire.agencyName, href: newHampshire.agencyUrl }],
      },
      {
        text: `A business that receives money or monetary value from New Hampshire customers and transmits it to another person, sells payment instruments, or holds customer funds for later payment generally needs that license from the ${newHampshire.agencyName}. NMLS is the filing system and the ${newHampshire.agencyName} issues or denies the license.`,
      },
      {
        text: "Agent-of-payee and payment-processor exemptions are statutory and fact-specific. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the New Hampshire license.",
      },
      bondCloser(
        "New Hampshire money transmitter laws",
        "https://cornerstonelicensing.com/money-transmitter-laws/new-hampshire-money-transmitter-laws",
      ),
    ],
    faqs: [
      {
        q: "How does a New Hampshire money transmitter bond get filed?",
        a: `File the New Hampshire money transmitter license with the ${newHampshire.agencyName} through NMLS. Cornerstone Licensing places any required bond as part of that filing. FinCEN MSB registration does not replace the license or the bond.`,
      },
      {
        q: "Who needs a money transmitter license in New Hampshire?",
        a: newHampshire.whoNeeds,
      },
      {
        q: "Where do I file a New Hampshire money transmitter bond?",
        a: `File it with the New Hampshire license on NMLS. The ${newHampshire.agencyName} issues or denies the license.`,
      },
      {
        q: "Does FinCEN MSB registration replace a New Hampshire money transmitter license?",
        a: "No. FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for the New Hampshire license.",
      },
      {
        q: "Who can file the New Hampshire license and place the bond?",
        a: "Cornerstone Licensing prepares the New Hampshire application, places any required bond, and files it.",
      },
    ],
    cta: {
      heading: "Have Cornerstone file the New Hampshire bond and license",
      body: `Cornerstone Licensing prepares the New Hampshire money transmitter application, places any required bond, and files it with the ${newHampshire.agencyName} through NMLS.`,
      button: "File the New Hampshire license",
      buttonHref: "https://cornerstonelicensing.com/apply/money-transmitter/nh",
      text: "New Hampshire money transmitter laws",
      textHref: "https://cornerstonelicensing.com/money-transmitter-laws/new-hampshire-money-transmitter-laws",
    },
    inbounds: transmitterInbounds(
      "New Hampshire money transmitter bond",
      "New Hampshire money transmitter license on NMLS",
      "money transmitter license in New Hampshire",
      "New Hampshire money transmitter bond",
    ),
  },
];

function assertClean(label: string, value: string) {
  if (value.includes("\u2014") || value.includes("\u2013")) {
    throw new Error(`${label} contains an em dash or en dash`);
  }
  if (/verify/i.test(value) || /agent note/i.test(value)) {
    throw new Error(`${label} contains a leftover marker`);
  }
  if (/honest/i.test(value)) {
    throw new Error(`${label} contains a forbidden label`);
  }
  if (
    value.includes("agency named on this page") ||
    value.includes("agency shown on this page") ||
    value.includes("shown at the top of this page") ||
    value.includes("filing path shown")
  ) {
    throw new Error(`${label} contains a placeholder`);
  }
  if (value.includes("$")) {
    throw new Error(`${label} contains a dollar amount`);
  }
}

for (const page of pages) {
  if (!getState(page.state)) throw new Error(`Missing state route for ${page.state}`);
  assertClean(`${page.state} title`, page.title);
  assertClean(`${page.state} description`, page.description);
  assertClean(`${page.state} h1`, page.h1);
  if (page.title.length > 60) throw new Error(`${page.state} title is ${page.title.length} characters`);
  if (page.description.length < 140 || page.description.length > 155) {
    throw new Error(`${page.state} description is ${page.description.length} characters`);
  }
  if (page.state === "maryland") {
    const head = `${page.title} ${page.description} ${page.h1}`;
    if (head.includes("113054") || head.includes("2550")) {
      throw new Error("Maryland title, H1, or description contains an NMLS ID");
    }
  }
  const blocks = [...page.paragraphs, ...(page.whoExtra ?? [])];
  for (const block of blocks) {
    assertClean(`${page.state} section`, block.text);
    for (const link of block.links ?? []) {
      if (!block.text.includes(link.phrase)) {
        throw new Error(`${page.state} is missing link phrase: ${link.phrase}`);
      }
      if (!link.href.startsWith("https://")) throw new Error(`${page.state} link is not absolute: ${link.href}`);
    }
  }
  if (page.state === "south-dakota" || page.state === "new-hampshire") {
    const section = blocks.map((block) => block.text).join(" ");
    if (section.includes("1960") || section.includes("BCCP") || section.includes("Mortgage Lending")) {
      throw new Error(`${page.state} section copies another state's filing line`);
    }
  }
  if (page.state === "arkansas") {
    const filingCopy = [...blocks.map((block) => block.text), page.cta.body, ...page.faqs.map((item) => item.a)].join(" ");
    if (filingCopy.includes("through NMLS") || filingCopy.includes("on NMLS") || filingCopy.includes("File on NMLS")) {
      throw new Error("Arkansas collection copy describes the license as an NMLS filing");
    }
  }
  if (page.faqs.length === 0) throw new Error(`${page.state} published an empty FAQ`);
  for (const item of page.faqs) {
    assertClean(`${page.state} question`, item.q);
    assertClean(`${page.state} answer`, item.a);
    if (!item.q.endsWith("?")) throw new Error(`${page.state} question is missing punctuation`);
  }
  assertClean(`${page.state} cta`, `${page.cta.heading} ${page.cta.body} ${page.cta.button} ${page.cta.text}`);
  for (const inbound of page.inbounds) {
    assertClean(`${page.state} anchor`, inbound.anchor);
  }
  const schema = faqPageSchema(page.faqs);
  const parsed = JSON.parse(JSON.stringify(schema));
  if (parsed["@type"] !== "FAQPage" || parsed.mainEntity.length !== page.faqs.length) {
    throw new Error(`${page.state} FAQ schema did not parse`);
  }
  page.faqs.forEach((item, index) => {
    const node = parsed.mainEntity[index];
    if (node.name !== item.q || node.acceptedAnswer.text !== item.a) {
      throw new Error(`${page.state} FAQ schema does not match the visible FAQ`);
    }
  });
}

const arkansasNmls = pages.find((page) => page.state === "arkansas")?.inbounds.some((item) => item.target === "nmls");
if (arkansasNmls) throw new Error("Arkansas collection must not be linked as an NMLS filing");

export function getStrikingPage(state: string, type: string): StrikingPage | undefined {
  return pages.find((page) => page.state === state && page.type === type);
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function inboundLinks(target: InboundTarget, filter?: { license?: string; state?: string }) {
  return pages
    .filter((page) => page.inbounds.some((item) => item.target === target))
    .filter((page) => !filter?.license || page.type === filter.license)
    .filter((page) => !filter?.state || page.state === filter.state)
    .map((page) => ({
      href: `/states/${page.state}/${page.type}`,
      anchor: page.inbounds.find((item) => item.target === target)!.anchor,
    }));
}
