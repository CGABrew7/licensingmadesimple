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

export interface InternalLink {
  href: string;
  anchor: string;
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
  title?: string;
  description?: string;
  h1?: string;
  related?: InternalLink[];
}

const empty: CitedCell = { value: "", sources: [] };

const NMLS_CHART: SourceLink = {
  label: "NMLS License Requirements and Fees Chart",
  url: "https://mortgage.nationwidelicensingsystem.org/knowledge/Products/nmls/stateresourcecenter/SitePages/Checklist-Compiler.aspx",
};
const MT_DIVISION: SourceLink = {
  label: "Montana Division of Banking and Financial Institutions",
  url: "https://doa.mt.gov/BFID/",
};
const MT_CODE: SourceLink = {
  label: "Montana Code Annotated Title 32",
  url: "https://leg.mt.gov/bills/mca/title_0320/chapters_index.html",
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
const CO_LIC: SourceLink = {
  label: "Colorado Attorney General, collection agency licensing",
  url: "https://coag.gov/licensing/collection-agency-regulation/",
};
const CO_CHECKLIST: SourceLink = {
  label: "Colorado collection agency application checklist, March 2026",
  url: "https://coag.gov/app/uploads/2026/03/CAR-Initial-Application-Information-Checklist-3.26.pdf",
};
const CO_BOND: SourceLink = {
  label: "Colorado Revised Statutes section 5-16-124",
  url: "https://law.justia.com/codes/colorado/title-5/debt-management/article-16/section-5-16-124/",
};
const WY_APP: SourceLink = {
  label: "Wyoming Collection Agency Board, license application",
  url: "https://wyomingcollectionagencyboard.wyo.gov/home/collection-license-application",
};
const WY_RULES: SourceLink = {
  label: "Wyoming Collection Agency Board licensing rules, Chapter 2",
  url: "https://rules.wyo.gov/AjaxHandler.ashx?RULE_VERSION_ID=22962&handler=GetRuleVersionHTML",
};
const WY_BOND: SourceLink = {
  label: "Wyoming Statute 33-11-108",
  url: "https://law.justia.com/codes/wyoming/title-33/chapter-11/section-33-11-108/",
};
const TN_FEE: SourceLink = {
  label: "Tennessee Department of Financial Institutions, fiscal year 2026-2027 supervision fee",
  url: "https://www.tn.gov/tdfi/news/2026/11/2/commissioner-gonzales-announces-non-depository-financial-institution-annual-supervision-fee-for-fiscal-year-2026-2027.html",
};
const TN_TILT: SourceLink = {
  label: "Tennessee Department of Financial Institutions, industrial loan and thrift",
  url: "https://www.tn.gov/tdfi/mortgage-consumer-lending/tilt.html",
};
const TN_FLEX: SourceLink = {
  label: "Tennessee Department of Financial Institutions, flexible credit lenders",
  url: "https://www.tn.gov/tdfi/mortgage-consumer-lending/flexible-credit.html",
};
const TN_LIST: SourceLink = {
  label: "Tennessee Department of Financial Institutions, mortgage and consumer lending",
  url: "https://www.tn.gov/tdfi/mortgage-consumer-lending.html",
};
const TN_BOND: SourceLink = {
  label: "Tennessee Code Annotated section 45-5-202",
  url: "https://law.justia.com/codes/tennessee/title-45/chapter-5/part-2/section-45-5-202/",
};
const TN_RES: SourceLink = {
  label: "Tennessee Code Annotated section 45-13-105",
  url: "https://law.justia.com/codes/tennessee/title-45/chapter-13/part-1/section-45-13-105/",
};
const TN_CH13: SourceLink = {
  label: "Tennessee Code Annotated section 45-13-201",
  url: "https://law.justia.com/codes/tennessee/title-45/chapter-13/part-2/section-45-13-201/",
};
const TN_SCOPE: SourceLink = {
  label: "Tennessee Code Annotated section 45-5-104",
  url: "https://law.justia.com/codes/tennessee/title-45/chapter-5/part-1/section-45-5-104/",
};
const OH_DFI: SourceLink = {
  label: "Ohio Division of Financial Institutions, money transmitter resources",
  url: "https://com.ohio.gov/divisions-and-programs/financial-institutions/money-transmitters/guides-and-resources/money-transmitter-resources",
};
const OH_APP: SourceLink = {
  label: "Ohio Division of Financial Institutions, new money transmitter application",
  url: "https://com.ohio.gov/divisions-and-programs/financial-institutions/money-transmitters/applications-and-forms/new-application",
};
const NMLS_PROCESSING: SourceLink = {
  label: "NMLS processing fees",
  url: "https://mortgage.nationwidelicensingsystem.org/knowledge/products/nmls/pubs/aboutNMLS/reference/aboutNMLS/maps/topics/aboutNMLS_processingFees-1.html",
};

export const verifiedRequirements: Partial<Record<`${string}/${LicenseSlug}`, VerifiedRequirement>> = {
  "montana/money-transmitters": {
    lastVerified: "2026-11-03",
    title: "Montana money service business license",
    description:
      "Montana does not issue a money service business license. MSB registration is the federal FinCEN filing. The Division does not regulate money transmitters.",
    h1: "Montana money service business license",
    related: [
      { href: "/directory/money-transmitters", anchor: "Money transmitter license requirements by state" },
      { href: "/states/ohio/money-transmitters", anchor: "Who needs an Ohio money transmitter license" },
      { href: "/states/montana/lending", anchor: "Consumer lending in Montana" },
      { href: "/guides/nmls", anchor: "How NMLS filings work" },
    ],
    fee: {
      value: "No Montana money service business license fee and no state money transmitter license fee. The NMLS License Requirements and Fees Chart lists Montana company licenses and does not include a money transmitter license. Montana Code Annotated Title 32 has no money transmitter chapter. The Division of Banking and Financial Institutions states that it does not regulate money transmitters.",
      sources: [NMLS_CHART, MT_CODE, MT_DIVISION],
    },
    bond: {
      value: "No state money transmitter surety bond. The NMLS chart has no Montana money transmitter row, and Title 32 has no money transmitter chapter.",
      sources: [NMLS_CHART, MT_CODE, MT_DIVISION],
    },
    timeline: {
      value: "No state money transmitter application timeline. There is no Montana money transmitter application to process.",
      sources: [NMLS_CHART, MT_CODE, MT_DIVISION],
    },
    sections: [
      {
        heading: "What the Division publishes",
        paragraphs: [
          "Montana does not issue a money service business license. Three current sources agree. The NMLS License Requirements and Fees Chart lists Montana company licenses and has no money transmitter row. Montana Code Annotated Title 32 has chapters for banks, consumer loans, electronic funds transfer, escrow, and residential mortgage, and no money transmitter chapter. Chapter 6 is the Electronic Funds Transfer Act. It is not a money transmitter license. The Division of Banking and Financial Institutions states that it does not regulate money transmitters and that Montana law does not define money transmission. Checked November 3, 2026.",
          "The same page says a money transmitter may still need a different Montana license. The Division licenses consumer finance companies, anyone who collects on a consumer loan, escrow companies, retail sales finance companies, and mortgage entities. A model that lends, collects a consumer loan, or handles a mortgage is a different license.",
          "The Division has said it asked money transmitters for business plans and money flow charts, then withdrew that request because it does not have authority to require those materials from a company it does not license.",
        ],
      },
      {
        heading: "What still applies",
        paragraphs: [
          "FinCEN money services business registration is the federal MSB registration. It is not a Montana license. A Montana decision not to license transmission does not cancel it when the federal definition is met.",
          "NMLS is the system the Division tells companies to use for the licenses Montana does issue. Open the consumer lending and mortgage pages for those desks.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Montana require a money service business license?",
        a: "No. Montana does not issue a money service business license or a money transmitter license. The Division of Banking and Financial Institutions states that it does not regulate money transmitters, the NMLS chart has no Montana money transmitter row, and Title 32 has no money transmitter chapter.",
      },
      {
        q: "What is MSB registration in Montana?",
        a: "MSB registration here means the federal FinCEN money services business registration. It applies when the business meets the federal definition. It is not a license issued by Montana, and it does not authorize transmission to customers in other states.",
      },
      {
        q: "Is there a Montana MSB license fee or surety bond?",
        a: "No state MSB fee and no state MSB surety bond. There is no Montana money transmitter application to price. The cells cite the NMLS chart, Title 32, and the Division page, checked on November 3, 2026.",
      },
      {
        q: "How long does Montana MSB licensing take?",
        a: "There is no Montana MSB or money transmitter application, so there is no state review clock for that license. FinCEN registration follows the federal form, not a Montana calendar.",
      },
      {
        q: "Can a payments company still need a Montana license?",
        a: "Yes, when the activity is something Montana does license. The Division licenses consumer finance companies, collection on a consumer loan, escrow companies, retail sales finance companies, and mortgage entities. Those licenses are filed on NMLS.",
      },
    ],
    steps: [
      {
        name: "Read the Division statement",
        text: "Open the NMLS License Requirements and Fees Chart, Montana Code Annotated Title 32, and the Division page. None of them creates a money transmitter license.",
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
        text: "File FinCEN MSB registration when the federal money services business definition applies. That filing is the MSB registration. It does not create a Montana money service business license.",
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
      value: "$1,000 license fee, plus $100 per additional location (maximum $5,000 for locations). Those Washington fees together are capped at $6,000. The NMLS License Requirements and Fees Chart lists a $120 NMLS processing fee for this license.",
      sources: [WA_FEE, NMLS_CHART],
    },
    bond: {
      value: "At least $10,000 and not more than $550,000, based on the previous year's Washington money transmission dollar volume and payment instrument dollar volume. The director may increase the bond up to $1,000,000. The NMLS chart lists the same $10,000 minimum.",
      sources: [WA_BOND, WA_FAQ, NMLS_CHART],
    },
    timeline: {
      value: "Varies, see regulator",
      sources: [WA_FAQ, WA_FEE],
    },
    sections: [
      {
        heading: "Washington license fee",
        paragraphs: [
          "The Department of Financial Institutions fee page lists a new application at a $1,000 license fee plus $100 per additional location, with the location piece capped at $5,000. The same row caps the combined Washington total at $6,000.",
          "That page also lists later charges that are not the initial license fee: $50 per authorized delegate added on a quarterly roster (maximum $5,000 per quarterly submission), no fee to remove a delegate, and $30 for several company amendments. Read the fee page before you pay an amendment.",
          "The NMLS License Requirements and Fees Chart lists a $120 processing fee for the Washington money transmitter license. Credit report and background check charges are separate from that chart line.",
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
          "The timeline cell says Varies, see regulator. The DFI licensing FAQ, the money services fee page, and the NMLS chart were checked on October 13, 2026. None of them states a number of days for review.",
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
        a: "The DFI fee page lists a $1,000 license fee plus $100 per additional location, with locations capped at $5,000 and the combined Washington total capped at $6,000. The NMLS chart lists a $120 processing fee for this license.",
      },
      {
        q: "What surety bond does Washington require?",
        a: "RCW 19.230.050 requires a bond of at least $10,000 and not more than $550,000, based on the previous year's Washington money transmission and payment instrument volume. The director may increase it up to $1,000,000. The DFI licensing FAQ states the $10,000 floor and $550,000 cap.",
      },
      {
        q: "How long does Washington take to review a money transmitter application?",
        a: "Varies, see regulator. The DFI fee page, the licensing FAQ, and the NMLS chart checked on October 13, 2026 do not state a review-day count.",
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
        name: "Treat the timeline as unset",
        text: "The DFI pages and the NMLS chart checked for this entry do not publish a review-day count. The cell says Varies, see regulator until DFI states a clock for this file.",
      },
    ],
  },
  "maryland/money-transmitters": {
    lastVerified: "2026-10-13",
    fee: {
      value: "$1,000 nonrefundable investigation fee and $2,000 nonrefundable license fee, paid to the Commissioner. The NMLS License Requirements and Fees Chart lists a $120 NMLS processing fee for this license.",
      sources: [MD_FEE, NMLS_CHART],
    },
    bond: {
      value: "The greater of $150,000 or 100 percent of average daily money transmission liability in Maryland for the most recently completed quarter, up to a maximum of $2,000,000. A deposit of equal market value may be filed instead of a bond. The NMLS chart lists the same $150,000 minimum.",
      sources: [MD_BOND, NMLS_CHART],
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
          "Section 12-407(f) also requires an initial applicant to pay NMLS the fee NMLS imposes to process the application. The statute does not print that dollar amount. The NMLS License Requirements and Fees Chart lists $120 for this license.",
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
        a: "Section 12-407 requires a $1,000 nonrefundable investigation fee and a $2,000 nonrefundable license fee, paid to the Commissioner. The NMLS chart lists a $120 processing fee for this license.",
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
  "colorado/collection": {
    lastVerified: "2026-11-03",
    title: "Colorado collection agency license application",
    description:
      "Colorado collection agency license application, fees, and surety bond. File with the Collection Agency Board in the Attorney General's office.",
    h1: "Colorado collection agency license application",
    related: [
      { href: "/directory/collection", anchor: "State licensing rules for debt collectors" },
      { href: "/states/wyoming/collection", anchor: "Wyoming collection agency license" },
      { href: "/guides/multi-state", anchor: "Multi-state collection filings" },
      { href: "/states/colorado/mortgage", anchor: "Mortgage licenses in Colorado" },
    ],
    fee: {
      value: "Investigation fee $500, due with the completed application and nonrefundable. Initial license application fee $1,500. Renewal license application fee $1,500.",
      sources: [CO_LIC, CO_CHECKLIST],
    },
    bond: {
      value: "C.R.S. 5-16-124 requires a bond of $12,000 plus $2,000 for each $10,000, or part of $10,000, by which the average monthly sums remitted or owed to all clients during the previous year exceed $15,000. The total cannot exceed $20,000. A savings account, deposit, or certificate of deposit of the same sum may be used instead. The section does not apply to a person collecting a debt that person owns.",
      sources: [CO_BOND, CO_LIC],
    },
    timeline: {
      value: "A collection agency license is valid from issuance to the following July 1. The completed renewal and fee are due on or before July 1, or the license expires. Renewals open early to mid-May.",
      sources: [CO_LIC],
    },
    sections: [
      {
        heading: "Colorado collection agency license application",
        paragraphs: [
          "File the application in the Colorado Department of Law licensing portal. The Attorney General's licensing page says the application is emailed to the signatory and is not submitted until that electronic signature comes back.",
          "The Collection Agency Board sits in the Attorney General's office. A Division of Banking or Division of Real Estate filing does not replace this license.",
        ],
      },
      {
        heading: "Who the license covers",
        paragraphs: [
          "The licensing page says the Colorado Fair Debt Collection Practices Act covers agencies located in Colorado, agencies outside Colorado that collect from Colorado consumers, agencies that solicit Colorado creditors, debt buyers who own debts that were in default when acquired, and creditors that collect their own debts under another name.",
          "Attorneys engaged in debt collection do not need the collection agency license and still must follow the Act. Agencies that collect only commercial, business, investment, and agricultural debts are outside the Act. Creditors that collect their own debts in their own name do not need the license.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I file a Colorado collection agency license application?",
        a: "File it in the Colorado Department of Law licensing portal with the Collection Agency Board. The investigation fee is $500 and the initial license fee is $1,500. Both are due with the completed application. The investigation fee is nonrefundable.",
      },
      {
        q: "What bond does a Colorado collection agency need?",
        a: "C.R.S. 5-16-124 sets the bond at $12,000 plus $2,000 for each $10,000, or part, by which average monthly sums remitted or owed to all clients during the previous year exceed $15,000. The bond cannot exceed $20,000. The section does not apply to a person collecting a debt that person owns.",
      },
      {
        q: "When does a Colorado collection agency license expire?",
        a: "It is valid until the following July 1. The renewal fee is $1,500, and the completed renewal is due on or before July 1.",
      },
      {
        q: "Where do I check a Colorado collection agency's licensing status?",
        a: "Start with the Collection Agency Board in the Colorado Attorney General's office. Look up the company's legal name in that office's records. A trade name is not a license.",
      },
    ],
    steps: [
      {
        name: "Confirm the activity is covered",
        text: "Read the Colorado Attorney General licensing page for who the Fair Debt Collection Practices Act covers, including debt buyers and out-of-state agencies that collect from Colorado consumers.",
      },
      {
        name: "Open the licensing portal",
        text: "Create an account, choose the collection agency application, and return the electronic signature. Use the March 2026 application checklist with the form.",
      },
      {
        name: "Pay the investigation and license fees",
        text: "Pay the $500 investigation fee and the $1,500 initial license fee with the completed application.",
      },
      {
        name: "File the bond when it applies",
        text: "File the bond under C.R.S. 5-16-124, or a deposit of the same amount. The floor is $12,000 and the cap is $20,000. A person collecting a debt that person owns is outside that section.",
      },
      {
        name: "Renew before July 1",
        text: "The license runs to the following July 1. File the completed renewal and the $1,500 renewal fee on or before that date.",
      },
    ],
  },
  "wyoming/collection": {
    lastVerified: "2026-11-03",
    title: "Wyoming collection agency license",
    description:
      "Wyoming collection agency license application on NMLS, the Board fee, the $10,000 surety bond, and the November 1 to December 1 renewal.",
    h1: "Wyoming collection agency license",
    related: [
      { href: "/directory/collection", anchor: "State licensing rules for debt collectors" },
      { href: "/states/colorado/collection", anchor: "Colorado collection agency license application" },
      { href: "/guides/multi-state", anchor: "Multi-state collection filings" },
      { href: "/states/wyoming/money-transmitters", anchor: "Money transmitter license in Wyoming" },
    ],
    fee: {
      value: "New agency license $500. New branch license $500. Agency renewal $150. Branch renewal $150. These Collection Agency Board fees are not refunded. They are in addition to any fees the registry charges. The rules do not print the registry fee.",
      sources: [WY_RULES, WY_APP],
    },
    bond: {
      value: "Wyoming Statute 33-11-108 requires a $10,000 surety bond from a surety licensed in Wyoming, or a $10,000 cash deposit with the State Treasurer. The applicant files it within 20 days after the Board approves the application. The license is issued after the Board and the Attorney General approve the bond.",
      sources: [WY_BOND, WY_RULES],
    },
    timeline: {
      value: "New applications and renewals are filed on NMLS. The renewal window is November 1 through December 1. A renewal submitted December 2 through December 15 is sanctioned $250. A renewal submitted December 16 through December 31 is sanctioned $750. The sanction is paid through NMLS before the renewal is processed.",
      sources: [WY_RULES, WY_APP],
    },
    sections: [
      {
        heading: "Wyoming collection agency license application",
        paragraphs: [
          "The Collection Agency Board application page says that beginning August 1, 2018, collection agency licenses are applied for, renewed, and managed on NMLS. The Board, not the Division of Banking's lender or money transmitter desk, takes this filing.",
          "Chapter 2 of the Board's licensing rules, effective November 1, 2023 and still the current rule, sets the Board fees and says each new or renewal application goes through the registry.",
        ],
      },
      {
        heading: "Office and resident manager",
        paragraphs: [
          "Every applicant needs an established office with a physical address in Wyoming and a bona fide Wyoming resident as the qualified resident manager.",
          "A new resident manager needs at least three years of experience in the third-party collection business and must pass the Board exam. The exam fee is $100 each time the exam is taken. Background investigation reimbursement cannot exceed $50. One person may be resident manager for no more than 15 collection agencies in the state.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Wyoming require a collection agency license?",
        a: "Yes, for a collection agency that collects in Wyoming. File the application on NMLS with the Wyoming Collection Agency Board. A billing service whose only operation is billing in the client's name does not need the license under Chapter 2, Section 9.",
      },
      {
        q: "How do I file a Wyoming collection agency license application?",
        a: "Submit it on NMLS. The Board fee for a new agency license is $500, and a new branch license is also $500. Those fees are not refunded. Any registry fee is additional. The rules do not print that registry amount.",
      },
      {
        q: "What bond does Wyoming require?",
        a: "Wyoming Statute 33-11-108 requires a $10,000 surety bond, or a $10,000 cash deposit with the State Treasurer. File it within 20 days after the Board approves the application.",
      },
      {
        q: "When do I renew a Wyoming collection agency license?",
        a: "Renew on NMLS from November 1 through December 1. The agency renewal fee is $150. A filing from December 2 through December 15 is sanctioned $250, and a filing from December 16 through December 31 is sanctioned $750.",
      },
    ],
    steps: [
      {
        name: "Confirm the Board is the desk",
        text: "Open the Wyoming Collection Agency Board application page. The license is on NMLS. A Division of Banking money transmitter or lender license does not replace it.",
      },
      {
        name: "Set the Wyoming office and resident manager",
        text: "The rules require a physical Wyoming office and a resident manager with at least three years of third-party collection experience who passes the Board exam.",
      },
      {
        name: "Pay the Board fee on the application",
        text: "Pay $500 for a new agency license or a new branch license. The fee is not refunded. Budget any separate registry fee NMLS shows at submission.",
      },
      {
        name: "File the $10,000 bond",
        text: "File the surety bond, or deposit $10,000 cash with the State Treasurer, within 20 days after the Board approves the application.",
      },
      {
        name: "Renew from November 1 through December 1",
        text: "Submit the renewal on NMLS in that window. The agency renewal fee is $150. Late renewals in December carry the sanctions in Chapter 2.",
      },
    ],
  },
  "tennessee/lending": {
    lastVerified: "2026-11-03",
    title: "Tennessee consumer lending license",
    description:
      "Tennessee consumer finance and industrial loan and thrift registration, the surety bond, flex loans, and commercial mortgage versus business lending.",
    h1: "Tennessee consumer lending license",
    related: [
      { href: "/directory/lending", anchor: "Consumer lending licenses by state" },
      { href: "/states/tennessee/mortgage", anchor: "Mortgage license in Tennessee" },
      { href: "/states/tennessee/money-transmitters", anchor: "Money transmitter license in Tennessee" },
      { href: "/guides/multi-state", anchor: "Multi-state lending filings" },
    ],
    fee: {
      value: "For fiscal year 2026-2027, effective November 1, 2026, the annual supervision fee is $795 for industrial loan and thrift registrants and $1,195 for flexible credit licensees. The fee includes the annual licensing or registration fee and the cost of a routine examination. It is paid with a new or renewal application, and payment is a condition of issuance or renewal. Tenn. Code Ann. section 45-1-118(i).",
      sources: [TN_FEE, TN_TILT, TN_FLEX],
    },
    bond: {
      value: "Tenn. Code Ann. section 45-5-202(d) requires other industrial loan and thrift applicants to file a $50,000 surety bond or letter of credit. One bond or letter of credit covers the registrant regardless of the number of offices. An applicant that makes or proposes to make residential mortgage loans files a surety bond under section 45-5-202(c). For the first registration period in which the company makes or proposes to make those loans, that bond is $200,000. After that first period, the statute sets coverage for each mortgage loan originator in an amount that reflects residential mortgage loan volume, as determined by the commissioner.",
      sources: [TN_BOND, TN_TILT],
    },
    timeline: {
      value: "Varies, see regulator. The Department's industrial loan and thrift page and the November 2, 2026 supervision-fee announcement do not state an application review-day count. The supervision fee is paid with the new or renewal application.",
      sources: [TN_TILT, TN_FEE],
    },
    sections: [
      {
        heading: "Consumer finance license and consumer lending license",
        paragraphs: [
          "Tennessee does not use the label consumer finance license for a separate product. The Department of Financial Institutions registers industrial loan and thrift companies under Tenn. Code Ann. section 45-5-103 and licenses flexible credit lenders under section 45-12-103. Both applications are filed on NMLS.",
          "A flex loan, under the Department's flexible credit page, is a loan under a written open-end plan for repeated noncommercial loans for personal, family, or household purposes. A separate flexible credit license is required for each location.",
        ],
      },
      {
        heading: "Industrial loan and thrift bond",
        paragraphs: [
          "Section 45-5-202(d) sets a $50,000 surety bond or letter of credit for applicants other than those making residential mortgage loans. Only one bond or letter of credit is required, regardless of the number of offices. It stays in place for at least 24 months after the registration ends.",
          "Section 45-5-202(c) is the residential mortgage piece of the same registration. The first registration period in which the company makes or proposes to make residential mortgage loans uses a $200,000 surety bond. Later bond coverage is an amount the commissioner sets from residential mortgage volume, for each mortgage loan originator. Mortgage loan originators of that registrant must be licensed under the residential mortgage chapter.",
        ],
      },
      {
        heading: "Marketplace lending, business lending, and commercial mortgage",
        paragraphs: [
          "The Department's mortgage and consumer lending page lists check cashing, deferred presentment, flexible credit, industrial loan and thrift, money transmitters, mortgage brokers, lenders and servicers, premium finance, and title pledge. It does not list a license named marketplace lending or business lending.",
          "Section 45-5-104 says the industrial loan chapter, including the registration requirement, does not apply to a state or national bank, a state or federal savings and loan, a state or federal credit union, an insurance company, or another person already supervised by a state or federal agency while making loans.",
          "A commercial mortgage is outside the Chapter 13 mortgage lender license when it is not a residential mortgage loan. Section 45-13-105(25) defines a residential mortgage loan as a loan primarily for personal, family, or household use that is secured by a dwelling or by residential real estate where a dwelling is or will be built. Section 45-13-201 requires a license to act as a mortgage lender, broker, or servicer for that residential activity. The Tennessee mortgage page is the Chapter 13 filing.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the Tennessee consumer finance license?",
        a: "It is the industrial loan and thrift registration, filed on NMLS with the Department of Financial Institutions. For fiscal year 2026-2027 the annual supervision fee for that registration is $795, effective November 1, 2026.",
      },
      {
        q: "What is the Tennessee consumer lending license for a flex loan?",
        a: "A flex loan plan needs a flexible credit license under Tenn. Code Ann. section 45-12-103. The Department says a flex loan is a noncommercial loan for personal, family, or household purposes. The fiscal year 2026-2027 supervision fee for a flexible credit licensee is $1,195.",
      },
      {
        q: "What is the Tennessee industrial loan and thrift bond?",
        a: "Section 45-5-202(d) requires a $50,000 surety bond or letter of credit, one for the registrant regardless of how many offices it has. A registrant that makes residential mortgage loans uses section 45-5-202(c) instead, including a $200,000 surety bond for the first period of that residential mortgage activity.",
      },
      {
        q: "Does Tennessee have a marketplace lending license or a business lending license?",
        a: "The Department's consumer lending list does not name either license. Marketplace or business lending that is done as an industrial loan and thrift company uses that registration. A bank or another lender already supervised by a state or federal agency is outside the chapter under section 45-5-104.",
      },
      {
        q: "Does a Tennessee commercial mortgage need this license?",
        a: "A commercial mortgage that is not a residential mortgage loan is outside the Chapter 13 mortgage lender license. Section 45-13-105(25) limits that license to loans primarily for personal, family, or household use secured by a dwelling. Residential mortgage lending is the Tennessee mortgage page, not this registration, unless the lender is an industrial loan and thrift registrant making those residential loans.",
      },
    ],
    steps: [
      {
        name: "Pick the Tennessee lending authority",
        text: "Use the industrial loan and thrift registration for that business. Use a flexible credit license for a flex loan plan. The Department does not publish a marketplace lending license or a business lending license.",
      },
      {
        name: "File on NMLS",
        text: "The Department's industrial loan and thrift page and flexible credit page both say applications, amendments, and renewals are filed on NMLS.",
      },
      {
        name: "Pay the fiscal year 2026-2027 supervision fee",
        text: "Pay $795 for an industrial loan and thrift registration or $1,195 for a flexible credit license. The fee is effective November 1, 2026 and is paid with the new or renewal application.",
      },
      {
        name: "File the industrial loan and thrift bond",
        text: "File the $50,000 bond or letter of credit under section 45-5-202(d), or the residential mortgage bond under section 45-5-202(c) if the company makes those loans. The first residential mortgage period uses a $200,000 surety bond.",
      },
      {
        name: "Separate commercial mortgage from this registration",
        text: "Read section 45-13-105(25) before treating a commercial mortgage as a Chapter 13 mortgage license. Residential mortgage filings are on the Tennessee mortgage page.",
      },
    ],
  },
  "ohio/money-transmitters": {
    lastVerified: "2026-11-03",
    title: "Who needs an Ohio money transmitter license",
    description:
      "Who needs an Ohio money transmitter or money service business license, how to tell if a company needs one, and which states require the license.",
    h1: "Who needs an Ohio money transmitter license",
    related: [
      { href: "/directory/money-transmitters", anchor: "Which states require a money transmitter license" },
      { href: "/states/montana/money-transmitters", anchor: "Montana money service business license" },
      { href: "/guides/nmls", anchor: "How NMLS filings work" },
      { href: "/states/ohio/lending", anchor: "Consumer lending in Ohio" },
    ],
    fee: {
      value: "Ohio application fee $5,000 for a new money transmitter license. The NMLS License Requirements and Fees Chart lists a license registration fee of $0 and an NMLS processing fee of $120 for this license. The NMLS company initial setup fee is $120.",
      sources: [OH_DFI, OH_APP, NMLS_CHART, NMLS_PROCESSING],
    },
    bond: {
      value: "Minimum security device $300,000. The Division's money transmitter resources page states that minimum and points to Revised Code section 1315. The NMLS chart lists the same $300,000 minimum surety bond and allows an alternate security device upload in place of an electronic surety bond.",
      sources: [OH_DFI, NMLS_CHART],
    },
    timeline: {
      value: "The Division's resources page does not state an application review-day count. Annual assessment bills are sent June 1 and are due July 1. Quarterly call reports are due within 45 days after quarter end.",
      sources: [OH_DFI],
    },
    sections: [
      {
        heading: "Who needs a money transmitter license",
        paragraphs: [
          "You need an Ohio money transmitter license when the business receives money or its equivalent from a person and delivers, pays, or makes it accessible to the same person or another person, for customers in Ohio. The Division's resources page states that definition and cites Revised Code section 1315.01(G). The new-application page says any person who receives money or its equivalent for transmission from a person in Ohio must be licensed before doing that business, unless an exemption applies.",
          "The same page treats cryptocurrency as money or its equivalent. Buying or selling cryptocurrency as a business, running a cryptocurrency kiosk, operating an exchange, or holding a hosted wallet that controls customer value generally needs the license. A developer that only writes wallet software and does not control the funds generally does not.",
        ],
      },
      {
        heading: "Money service business license",
        paragraphs: [
          "For Ohio, the money service business license is this money transmitter license, issued by the Division of Financial Institutions and filed on NMLS. Companies that transmit money, sell or issue payment instruments, or hold customer funds for later payment are the companies the license covers.",
          "FinCEN money services business registration is a separate federal filing. The Division says money services businesses generally must register with FinCEN. That registration does not replace the Ohio license. A change of control application filed with the Division costs $2,500.",
        ],
      },
      {
        heading: "Which states require a money transmitter license",
        paragraphs: [
          "Ohio requires one. The national page on this site lists the states. Montana does not issue a money transmitter license or a money service business license. A company that serves customers in more than one licensing state files in each of those states. One NMLS record is the filing system, not a national license.",
          "Net worth must stay at least $500,000, calculated under GAAP. The Division cites Revised Code section 1315.05. Licensees also hold permissible investments at least equal to outstanding money transmission obligations from persons in the United States, and they file audited financial statements within 120 days after fiscal year end.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who needs a money transmitter license in Ohio?",
        a: "A company that receives money or its equivalent from a person in Ohio and delivers, pays, or makes it accessible to that person or someone else. The Division of Financial Institutions issues the license. File it on NMLS before serving those customers, unless a statutory exemption applies.",
      },
      {
        q: "How do I know if I need a money transmitter license?",
        a: "Ask whether the business receives money or its equivalent and then moves it or makes it accessible. The Division treats cryptocurrency as money or its equivalent. Crypto kiosks, exchanges, and hosted wallets that control customer value generally need the license. FinCEN registration does not answer the Ohio question.",
      },
      {
        q: "Is an Ohio money service business license the same license?",
        a: "Yes. Ohio's money service business license for this activity is the money transmitter license. FinCEN MSB registration is an additional federal filing, not a substitute.",
      },
      {
        q: "What states require a money transmitter license?",
        a: "Ohio does. The money transmitter directory on this site is the state-by-state list. Montana does not issue the license. File in each licensing state where the customers are.",
      },
      {
        q: "What do the Ohio application, bond, and net worth cost?",
        a: "The Division states a $5,000 application fee and a minimum security device of $300,000. Net worth must stay at least $500,000. The NMLS chart lists a $120 processing fee and a $0 license registration fee for this license. A change of control filing is $2,500.",
      },
    ],
    steps: [
      {
        name: "Test the Ohio activity",
        text: "Read the Division's money transmitter resources page. The license applies when the business receives money or its equivalent from a person in Ohio and delivers, pays, or makes it accessible.",
      },
      {
        name: "Separate FinCEN from the state license",
        text: "Register with FinCEN when the federal money services business definition is met. That registration never replaces the Ohio money transmitter license.",
      },
      {
        name: "File on NMLS and pay $5,000",
        text: "Request the Ohio money transmitter license on NMLS and pay the $5,000 application fee. The NMLS company processing fee is $120.",
      },
      {
        name: "File the security device and show net worth",
        text: "Maintain a security device of at least $300,000 and net worth of at least $500,000. The NMLS chart allows an alternate security device in place of an electronic surety bond.",
      },
      {
        name: "Plan the assessment calendar",
        text: "The resources page does not state a review-day count. Assessment bills go out June 1 and are due July 1. Quarterly call reports are due within 45 days after quarter end.",
      },
    ],
  },
};

const SEO_KEYS = [
  "colorado/collection",
  "wyoming/collection",
  "tennessee/lending",
  "ohio/money-transmitters",
  "montana/money-transmitters",
] as const;

function assertRefreshCopy(key: string, item: VerifiedRequirement) {
  if (!item.title || item.title.length > 60) throw new Error(`${key} title length ${item.title?.length ?? 0}`);
  if (!item.description || item.description.length < 120 || item.description.length > 155) {
    throw new Error(`${key} description length ${item.description?.length ?? 0}`);
  }
  if (!item.h1) throw new Error(`${key} is missing an h1`);
  if (!item.related || item.related.length < 2 || item.related.length > 4) {
    throw new Error(`${key} related link count ${item.related?.length ?? 0}`);
  }
  const blob = JSON.stringify(item);
  if (blob.includes("\u2014") || blob.includes("\u2013")) throw new Error(`${key} contains an em dash or en dash`);
  if (/cornerstone/i.test(blob)) throw new Error(`${key} mentions Cornerstone`);
  if (/jeff/i.test(blob)) throw new Error(`${key} names the owner`);
  for (const link of item.related) {
    if (!link.href.startsWith("/")) throw new Error(`${key} related link is not internal`);
  }
  for (const faq of item.faqs) {
    if (!faq.q.endsWith("?")) throw new Error(`${key} question is missing punctuation`);
  }
}

for (const key of SEO_KEYS) {
  const item = verifiedRequirements[key];
  if (!item) throw new Error(`Missing verified requirement for ${key}`);
  assertRefreshCopy(key, item);
}

export function getVerifiedRequirement(stateSlug: string, licenseSlug: string): VerifiedRequirement | undefined {
  return verifiedRequirements[`${stateSlug}/${licenseSlug}`];
}

export function emptyCell(): CitedCell {
  return empty;
}
