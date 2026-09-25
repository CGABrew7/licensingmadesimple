export type LicenseTier = "core" | "adjacent";
export type LicenseSlug =
  | "collection"
  | "lending"
  | "money-transmitters"
  | "mortgage"
  | "insurance"
  | "contractors"
  | "charity";

export interface LicenseType {
  slug: LicenseSlug;
  name: string;
  shortName: string;
  vertical: string;
  tier: LicenseTier;
  whoNeeds: string;
  typicalPath: string;
  federalOverlay: string;
  filingHint: string;
  cornerstoneUrl: string;
}

export const licenseTypes: LicenseType[] = [
  {
    slug: "collection",
    name: "Collection / ARM",
    shortName: "collection agency",
    vertical: "Accounts receivable management",
    tier: "core",
    whoNeeds:
      "A company that collects consumer debts owed to someone else — a third-party collection agency, many debt buyers, and some first-party shops that collect under their own name — generally needs a state collection-agency, debt-collector, or collection-service license in each state where the debtor lives. In-house recovery of a company’s own receivables is licensed in fewer states, but that list is growing. Attorneys collecting in the ordinary practice of law are often exempt; confirm the exemption before relying on it.",
    typicalPath:
      "Identify every state where you will contact debtors. In licensing states, file a company application with the collection board, banking department, or secretary of state — through NMLS where that state has moved the license onto the system, otherwise through the state portal. Expect control-person disclosures, a surety bond where the statute requires one, and a registered agent in states that demand one. New York City and Chicago add municipal licenses on top of (or instead of) a statewide license.",
    federalOverlay:
      "State licensing does not replace the Fair Debt Collection Practices Act, CFPB Regulation F, or the TCPA. Those rules apply whether or not a state issues a license.",
    filingHint: "State collection board, banking department, or NMLS — plus city licenses in NYC and Chicago.",
    cornerstoneUrl: "https://cornerstonelicensing.com/third-party-collection-agency-license",
  },
  {
    slug: "lending",
    name: "Consumer & commercial lending",
    shortName: "lender",
    vertical: "Consumer and commercial lending",
    tier: "core",
    whoNeeds:
      "A company that makes loans to individuals for personal, family, or household purposes generally needs a state consumer-lending license when the product, rate, or amount crosses that state’s trigger. Names vary: consumer finance, small loan, supervised lender, installment lender, or California Financing Law. Commercial-purpose loans are outside many consumer statutes, but a growing set of states now license certain small-business or commercial finance activity separately. Banks and credit unions lending under a charter are usually exempt from the state non-depository license.",
    typicalPath:
      "Map each product to the state’s license category before you file — the same installment loan can be a consumer-finance license in one state and a sales-finance license in the next. Most states take company applications through NMLS (Form MU1, control-person MU2s). A few still use a state portal. File in every state where borrowers live, not only where the lender sits.",
    federalOverlay:
      "TILA / Regulation Z, ECOA, FCRA, and CFPB supervision sit on top of the state license. A state license does not create a federal charter.",
    filingHint: "Usually NMLS MU1 with the state banking, DFI, or consumer-credit agency.",
    cornerstoneUrl: "https://cornerstonelicensing.com/consumer-lending-licensing",
  },
  {
    slug: "money-transmitters",
    name: "Money transmitters",
    shortName: "money transmitter",
    vertical: "Money services businesses",
    tier: "core",
    whoNeeds:
      "A business that receives money or monetary value from one person and transmits it to another, sells payment instruments, or holds customer funds for later payment generally needs a state money-transmitter or money-services license. That net covers many payment companies, stored-value programs, remittance firms, and digital-asset platforms that move customer value. Agent-of-payee, payment-processor, and bank-agent exemptions exist in some states; they are statutory and fact-specific, not a default.",
    typicalPath:
      "Register with FinCEN as a money services business (FinCEN Form 107) at the federal layer, then file a separate money-transmitter application through NMLS in each state where customers live. States review net worth, a surety bond, a BSA/AML program, and flow-of-funds documentation. New York adds a virtual-currency license (BitLicense) for certain digital-asset activity on top of money transmission. Montana has historically been the notable state-level exception — confirm current law before you treat it as open.",
    federalOverlay:
      "FinCEN MSB registration and the Bank Secrecy Act are federal duties. They never substitute for a required state money-transmitter license. Unlicensed money transmission can also be a federal crime under 18 U.S.C. § 1960.",
    filingHint: "FinCEN Form 107 plus a state money-transmitter application on NMLS.",
    cornerstoneUrl: "https://cornerstonelicensing.com/money-transmitter-license",
  },
  {
    slug: "mortgage",
    name: "Mortgage",
    shortName: "mortgage company",
    vertical: "Mortgage origination, brokering, and servicing",
    tier: "core",
    whoNeeds:
      "A company that originates, brokers, or services residential mortgage loans generally needs a state mortgage license in every state where it does that work. The SAFE Act made NMLS the system of record for these licenses nationwide. Lending or brokering is usually one company authority; servicing is a separate authority in most states. Individual mortgage loan originators need their own MLO license (MU4) and a sponsoring company.",
    typicalPath:
      "Create the company NMLS record (MU1), file MU2s for control persons, then request each state’s mortgage lender, broker, and/or servicer license. States still decide the license — NMLS is the filing system, not the issuer. Expect a surety bond, net-worth showing, and a qualified individual where the state requires one. A few states split the work: California (DFPI and sometimes DRE), Colorado and Utah (Division of Real Estate), Nevada (Division of Mortgage Lending), Texas (Department of Savings and Mortgage Lending).",
    federalOverlay:
      "The SAFE Act, TILA/RESPA, ECOA, and (for many servicers) CFPB mortgage-servicing rules apply in addition to the state license. Depository institutions register MLOs on the NMLS federal registry rather than holding state company licenses.",
    filingHint: "NMLS MU1 / MU2 / MU4 with the state mortgage regulator.",
    cornerstoneUrl: "https://cornerstonelicensing.com/mortgage-licensing",
  },
  {
    slug: "insurance",
    name: "Insurance",
    shortName: "insurance producer",
    vertical: "Insurance producers and adjusters",
    tier: "adjacent",
    whoNeeds:
      "A person or firm that sells, solicits, or negotiates insurance generally needs a producer license from each state where that work happens. Independent adjusters are licensed separately in many states. This site covers the filing desk, not product appointments or surplus-lines details.",
    typicalPath:
      "Most producer and adjuster applications run through the National Insurance Producer Registry (NIPR) or the state department of insurance. Resident licenses come first; non-resident licenses typically follow via reciprocity once the home-state license is in force.",
    federalOverlay:
      "Insurance licensing is state-based. There is no federal producer license. Some federal programs (flood, crop) add their own authorizations on top of the state license.",
    filingHint: "State department of insurance, usually through NIPR.",
    cornerstoneUrl: "https://cornerstonelicensing.com",
  },
  {
    slug: "contractors",
    name: "Contractors",
    shortName: "contractor",
    vertical: "Construction contracting",
    tier: "adjacent",
    whoNeeds:
      "A business that performs construction work for others often needs a state contractor license, a trade license, or a local contractor registration — sometimes all three. Several states have no statewide contractor license and leave the work to cities and counties.",
    typicalPath:
      "File with the state contractor board or professional-licensing division where a statewide license exists. Separately check the city or county where the job sits. Public jobs add bid, performance, and payment bonds that are not the same thing as a license bond.",
    federalOverlay:
      "Federal Davis-Bacon and contract rules can apply on federal projects. They do not replace a required state or local contractor license.",
    filingHint: "State contractor board and/or the city or county where the work is performed.",
    cornerstoneUrl: "https://cornerstonelicensing.com",
  },
  {
    slug: "charity",
    name: "Charitable solicitation",
    shortName: "charity registration",
    vertical: "Charitable fundraising",
    tier: "adjacent",
    whoNeeds:
      "A nonprofit that asks residents of a state for donations often must register as a charitable organization before soliciting. Professional fundraisers and fundraising counsel have their own registrations in most of those states. A handful of states do not require charity registration; others exempt 501(c)(3) organizations or recently repealed the charity-license requirement.",
    typicalPath:
      "Register with the state attorney general, secretary of state, or charities bureau in each state where you solicit — not only the state of incorporation. Unified Registration Statement packets help, but many states still want their own forms or a state portal filing.",
    federalOverlay:
      "IRS tax-exempt status (Form 990, determination letter) is federal and does not replace state charitable-solicitation registration.",
    filingHint: "State attorney general, secretary of state, or charities bureau.",
    cornerstoneUrl: "https://cornerstonelicensing.com",
  },
];

export const coreLicenseTypes = licenseTypes.filter((t) => t.tier === "core");
export const adjacentLicenseTypes = licenseTypes.filter((t) => t.tier === "adjacent");

export function getLicenseType(slug: string): LicenseType | undefined {
  return licenseTypes.find((t) => t.slug === slug);
}
