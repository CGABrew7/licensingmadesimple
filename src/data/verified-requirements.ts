import type { LicenseSlug } from "./license-types";

export interface SourceLink {
  label: string;
  url: string;
}

/** An empty value is an unverified cell. Do not fill it from memory. */
export interface CitedCell {
  value: string;
  sources: SourceLink[];
}

export interface PageSection {
  heading: string;
  paragraphs: string[];
}

export interface QaItem {
  q: string;
  a: string;
}

export interface HowStep {
  name: string;
  text: string;
}

export interface VerifiedRequirement {
  /** ISO date the regulator or NMLS page was checked. */
  lastVerified: string;
  fee: CitedCell;
  bond: CitedCell;
  timeline: CitedCell;
  sections: PageSection[];
  faqs: QaItem[];
  steps: HowStep[];
}

const empty: CitedCell = { value: "", sources: [] };

const MT_DIVISION: SourceLink = {
  label: "Montana Division of Banking and Financial Institutions",
  url: "https://doa.mt.gov/BFID/",
};
const FINCEN: SourceLink = {
  label: "FinCEN MSB registration",
  url: "https://www.fincen.gov/money-services-business-msb-registration",
};
const WA_FEE: SourceLink = {
  label: "Washington DFI money services fee clarification",
  url: "https://dfi.wa.gov/money-services/money-services-fee-clarification",
};
const WA_FAQ: SourceLink = {
  label: "Washington DFI money transmitter licensing FAQ",
  url: "https://dfi.wa.gov/money-services/licensing-frequently-asked-questions",
};
const WA_BOND: SourceLink = {
  label: "RCW 19.230.050",
  url: "https://app.leg.wa.gov/RCW/default.aspx?cite=19.230.050",
};
const MD_FEE: SourceLink = {
  label: "Maryland Financial Institutions Article section 12-407",
  url: "https://mgaleg.maryland.gov/2026RS/Statute_Web/gfi/12-407.pdf",
};
const MD_BOND: SourceLink = {
  label: "Maryland Financial Institutions Article section 12-412",
  url: "https://mgaleg.maryland.gov/2026RS/Statute_Web/gfi/12-412.pdf",
};
const MD_TIME: SourceLink = {
  label: "COMAR 09.03.14.05",
  url: "https://regs.maryland.gov/us/md/exec/comar/09.03.14.05",
};

export const verifiedRequirements: Partial<Record<`${string}/${LicenseSlug}`, VerifiedRequirement>> = {
  "montana/money-transmitters": {
    lastVerified: "2026-10-13",
    fee: {
      value: "No state money transmitter license fee. The Division of Banking and Financial Institutions does not regulate money transmitters.",
      sources: [MT_DIVISION],
    },
    bond: {
      value: "No state money transmitter surety bond. The Division does not issue this license.",
      sources: [MT_DIVISION],
    },
    timeline: {
      value: "No state money transmitter application timeline. There is no Montana application to process.",
      sources: [MT_DIVISION],
    },
    sections: [
      {
        heading: "What the Division publishes",
        paragraphs: [
          "The Montana Division of Banking and Financial Institutions states on its site that it does not regulate money transmitters. It also states that Montana law does not define money transmission. Those two sentences are the reason the fee, bond, and timeline cells above say there is no state fee, bond, or timeline, each linked to that page.",
          "The same page says a money transmitter may still need a different Montana license. The Division licenses consumer finance companies, anyone who collects on a consumer loan, escrow companies, and mortgage entities. A model that lends, collects a consumer loan, or handles a mortgage is not answered by this page.",
          "The Division has said it asked money transmitters for business plans and money flow charts, then withdrew that request because it does not have authority to require those materials from a company it does not license.",
        ],
      },
      {
        heading: "What still applies",
        paragraphs: [
          "FinCEN money services business registration is federal. It is not a Montana license, and a Montana decision not to license transmission does not cancel it when the federal definition is met.",
          "NMLS is the system the Division tells companies to use for the licenses Montana does issue. Open the consumer lending and mortgage pages for those desks.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Montana require a money transmitter license?",
        a: "The Division of Banking and Financial Institutions states that it does not regulate money transmitters, and that Montana law does not define money transmission. There is no statewide money transmitter application on this desk.",
      },
      {
        q: "Is there a Montana money transmitter fee or surety bond?",
        a: "No state money transmitter fee and no state money transmitter surety bond. Both cells cite the Division page checked on October 13, 2026.",
      },
      {
        q: "How long does a Montana money transmitter application take?",
        a: "There is no Montana money transmitter application, so there is no state review clock for that license.",
      },
      {
        q: "Can a payments company still need a Montana license?",
        a: "Yes. The Division licenses consumer finance companies, collection on a consumer loan, escrow companies, and mortgage entities. If the activity is one of those, use that Montana page and NMLS. This page does not classify a business model.",
      },
      {
        q: "Does FinCEN still apply?",
        a: "FinCEN MSB registration is a separate federal filing. It applies when the business meets the federal money services business definition, including when Montana does not issue a money transmitter license.",
      },
    ],
    steps: [
      {
        name: "Read the Division statement",
        text: "Open the Montana Division of Banking and Financial Institutions page and read the statement that the Division does not regulate money transmitters.",
      },
      {
        name: "Separate transmission from other licenses",
        text: "Check whether the model is consumer lending, collection on a consumer loan, escrow, or mortgage. Those are licensed in Montana and use different pages.",
      },
      {
        name: "Skip a money transmitter filing that does not exist",
        text: "If the activity is only money transmission, there is no Montana application, fee, or surety bond for that license.",
      },
      {
        name: "Handle the federal MSB registration",
        text: "File FinCEN MSB registration when the federal definition applies. That filing does not create a Montana money transmitter license.",
      },
      {
        name: "Use NMLS for licenses Montana does issue",
        text: "If a consumer loan or mortgage license applies, follow the NMLS path named on that Montana license page.",
      },
    ],
  },
  "washington/money-transmitters": {
    lastVerified: "2026-10-13",
    fee: {
      value: "$1,000 license fee, plus $100 per additional location (maximum $5,000 for locations). Those Washington fees together are capped at $6,000. NMLS charges a separate processing fee at submission. This page does not restate that NMLS amount.",
      sources: [WA_FEE],
    },
    bond: {
      value: "At least $10,000 and not more than $550,000, based on the previous year's Washington money transmission dollar volume and payment instrument dollar volume. The director may increase the bond up to $1,000,000.",
      sources: [WA_BOND, WA_FAQ],
    },
    timeline: {
      value: "",
      sources: [WA_FAQ, WA_FEE],
    },
    sections: [
      {
        heading: "Washington license fee",
        paragraphs: [
          "The Department of Financial Institutions fee page lists a new application at a $1,000 license fee plus $100 per additional location, with the location piece capped at $5,000. The same row caps the combined Washington total at $6,000.",
          "That page also lists later charges that are not the initial license fee: $50 per authorized delegate added on a quarterly roster (maximum $5,000 per quarterly submission), no fee to remove a delegate, and $30 for several company amendments. Read the fee page before you pay an amendment.",
          "NMLS collects its own processing fee when the company submits. The DFI fee page does not print that NMLS dollar amount, so this page leaves it out.",
        ],
      },
      {
        heading: "Surety bond",
        paragraphs: [
          "RCW 19.230.050 requires a surety bond based on the previous year's money transmission dollar volume and payment instrument dollar volume. The statute sets a floor of at least $10,000 and a cap of $550,000. The DFI licensing FAQ states the same floor and cap.",
          "Subsection (6) allows the director to increase the bond up to a maximum of $1,000,000 based on the nature and volume of the business, the financial health of the company, and other criteria in rule. The $550,000 figure is the statutory cap in subsection (1). It is not the highest figure the director can set.",
          "The bond runs to the State of Washington. The DFI FAQ does not publish a premium. A surety prices the premium. This page does not.",
        ],
      },
      {
        heading: "Timeline cell",
        paragraphs: [
          "The timeline cell is blank. The DFI licensing FAQ and the money services fee page were checked on October 13, 2026. Neither page states a number of days for review. This page does not invent one.",
          "The same FAQ states that money transmitter licenses are perpetual, that the company completes an annual assessment to keep the license in good standing, and that the NMLS system fee is paid in NMLS between November 1 and December 31.",
        ],
      },
      {
        heading: "Other figures the FAQ states",
        paragraphs: [
          "Tangible net worth on the DFI FAQ is $10,000 for every $1,000,000 of total company-wide money transmission and payment instrument dollar volume over the previous twelve months, with a minimum of $10,000 and a maximum of $3,000,000. If the company stores virtual currency in a wallet for others, the FAQ sets a $100,000 minimum tangible net worth.",
          "A company formed outside the United States may not apply directly. The FAQ says it must create a U.S. subsidiary to apply.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the Washington money transmitter application fee?",
        a: "The DFI fee page lists a $1,000 license fee plus $100 per additional location, with locations capped at $5,000 and the combined Washington total capped at $6,000. NMLS adds its own processing fee at submission. This page does not restate that NMLS amount.",
      },
      {
        q: "What surety bond does Washington require?",
        a: "RCW 19.230.050 requires a bond of at least $10,000 and not more than $550,000, based on the previous year's Washington money transmission and payment instrument volume. The director may increase it up to $1,000,000. The DFI licensing FAQ states the $10,000 floor and $550,000 cap.",
      },
      {
        q: "How long does Washington take to review a money transmitter application?",
        a: "The timeline cell is blank. The DFI fee page and licensing FAQ checked on October 13, 2026 do not state a review-day count.",
      },
      {
        q: "Does the Washington money transmitter license expire?",
        a: "The DFI FAQ says money transmitter licenses are perpetual. The company still completes an annual assessment, and it pays the NMLS system fee in NMLS between November 1 and December 31.",
      },
      {
        q: "Where is the application filed?",
        a: "Request the Washington money transmitter license on NMLS with the Department of Financial Institutions. FinCEN MSB registration is a separate federal filing.",
      },
    ],
    steps: [
      {
        name: "Confirm the activity is money transmission",
        text: "Read the Washington definition and the exclusions in chapter 19.230 RCW. The DFI FAQ points applicants who want an exclusion to RCW 19.230.020.",
      },
      {
        name: "Open an NMLS company record",
        text: "Complete the company Form MU1 and request the Washington money transmitter license through NMLS.",
      },
      {
        name: "Pay the Washington license fee",
        text: "Pay the $1,000 license fee plus any additional-location fee on the DFI fee page, within the published caps, and pay the NMLS processing fee shown at submission.",
      },
      {
        name: "File the surety bond",
        text: "Maintain a surety bond under RCW 19.230.050: at least $10,000, not more than $550,000 based on the previous year's Washington volume, unless the director increases it up to $1,000,000.",
      },
      {
        name: "Do not schedule from a blank timeline",
        text: "The DFI pages checked for this entry do not publish a review-day count. Leave the launch date unset until DFI or NMLS states one for this file.",
      },
    ],
  },
  "maryland/money-transmitters": {
    lastVerified: "2026-10-13",
    fee: {
      value: "$1,000 nonrefundable investigation fee and $2,000 nonrefundable license fee, paid to the Commissioner. The applicant also pays the NMLS processing fee. This page does not restate that NMLS amount.",
      sources: [MD_FEE],
    },
    bond: {
      value: "The greater of $150,000 or 100 percent of average daily money transmission liability in Maryland for the most recently completed quarter, up to a maximum of $2,000,000. A deposit of equal market value may be filed instead of a bond.",
      sources: [MD_BOND],
    },
    timeline: {
      value: "The Commissioner must approve or deny an initial license within 60 days after receiving a completed application, including the surety bond and required fees when they apply.",
      sources: [MD_TIME],
    },
    sections: [
      {
        heading: "Application fee",
        paragraphs: [
          "Financial Institutions Article section 12-407(e) requires two payments to the Commissioner with the application: a nonrefundable investigation fee of $1,000 and a nonrefundable license fee of $2,000.",
          "Section 12-407(f) also requires an initial applicant to pay NMLS the fee NMLS imposes to process the application. The statute does not print that dollar amount. This page does not supply one.",
        ],
      },
      {
        heading: "Surety bond",
        paragraphs: [
          "Section 12-412(d) sets the bond, or a deposit in lieu of a bond, at the greater of $150,000 or 100 percent of the applicant's average daily money transmission liability in Maryland. The percentage piece is calculated for the most recently completed quarter and stops at $2,000,000.",
          "The statute defines average daily money transmission liability as the outstanding money transmission obligations in Maryland at the end of each day in the quarter, added together and divided by the number of days in that quarter. The quarters end March 31, June 30, September 30, and December 31.",
          "The bond runs to the Commissioner. The surety must be authorized in Maryland and hold a certificate of authority from the Maryland Insurance Commissioner. A deposit in lieu of a bond must have a market value equal to the required amount.",
        ],
      },
      {
        heading: "Decision window",
        paragraphs: [
          "COMAR 09.03.14.05 says the Commissioner shall approve or deny an application for an initial license, a renewal license, or a license amendment within 60 days after receiving a completed application, including the surety bond and required fees when they apply.",
          "That 60-day rule is a decision window that starts when the application is complete. It is not a count of how long an incomplete file sits in a queue. This page does not add a separate observed average.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does a Maryland money transmitter application cost?",
        a: "Section 12-407 requires a $1,000 nonrefundable investigation fee and a $2,000 nonrefundable license fee, paid to the Commissioner, plus the NMLS processing fee. The statute does not state the NMLS dollar amount, so this page does not either.",
      },
      {
        q: "What surety bond does Maryland require?",
        a: "Section 12-412 sets the bond at the greater of $150,000 or 100 percent of average daily money transmission liability in Maryland for the most recently completed quarter, with a maximum of $2,000,000. A deposit of equal market value may be used instead of a bond.",
      },
      {
        q: "How long does Maryland have to decide the application?",
        a: "COMAR 09.03.14.05 gives the Commissioner 60 days after a completed application, including the surety bond and required fees when they apply, to approve or deny an initial license, a renewal, or an amendment.",
      },
      {
        q: "Where is the Maryland money transmitter license filed?",
        a: "File on NMLS with the Office of the Commissioner of Financial Regulation. FinCEN MSB registration remains a separate federal filing.",
      },
      {
        q: "What if the bond amount changes after a claim?",
        a: "Section 12-412 requires a new or additional bond if a claim or judgment reduces the penal amount. If the Commissioner demands a new bond or deposit in writing, the licensee has 30 days to file evidence of it.",
      },
    ],
    steps: [
      {
        name: "Read the Maryland money transmitter statute",
        text: "Read Financial Institutions Article sections 12-407 and 12-412 before you assemble the file.",
      },
      {
        name: "File on NMLS",
        text: "Submit the company application through NMLS to the Office of the Commissioner of Financial Regulation.",
      },
      {
        name: "Pay the investigation and license fees",
        text: "Pay the $1,000 investigation fee and the $2,000 license fee to the Commissioner, and pay the NMLS processing fee shown at submission.",
      },
      {
        name: "File the surety bond or deposit",
        text: "File a bond, or a deposit of equal market value, for the greater of $150,000 or 100 percent of average daily Maryland money transmission liability for the latest completed quarter, capped at $2,000,000.",
      },
      {
        name: "Track the 60-day decision window",
        text: "COMAR 09.03.14.05 starts a 60-day approve-or-deny clock when the Commissioner has a completed application, including the bond and required fees when they apply.",
      },
    ],
  },
};

export function getVerifiedRequirement(stateSlug: string, licenseSlug: string): VerifiedRequirement | undefined {
  return verifiedRequirements[`${stateSlug}/${licenseSlug}`];
}

export function emptyCell(): CitedCell {
  return empty;
}
