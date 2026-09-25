export interface Regulator {
  name: string;
  url: string;
  role: string;
}

export interface StateRecord {
  slug: string;
  name: string;
  abbr: string;
  region: "Northeast" | "Midwest" | "South" | "West";
  regulators: Regulator[];
  notes: string;
}

export const states: StateRecord[] = [
  {
    slug: "alabama",
    name: "Alabama",
    abbr: "AL",
    region: "South",
    regulators: [
      { name: "State Banking Department of Alabama", url: "https://www.banking.alabama.gov/", role: "Non-depository financial licenses, including mortgage and consumer finance" },
      { name: "Alabama Collection Service Board", url: "https://www.revenue.alabama.gov/", role: "Collection service licenses" },
    ],
    notes: "Alabama splits collection-service licensing onto a dedicated board while mortgage and consumer-finance filings go to the Banking Department.",
  },
  {
    slug: "alaska",
    name: "Alaska",
    abbr: "AK",
    region: "West",
    regulators: [
      { name: "Alaska Division of Banking and Securities", url: "https://www.commerce.alaska.gov/web/dbs/", role: "Banking, securities, money services, mortgage, and collection licensing" },
    ],
    notes: "Most non-depository licenses in Alaska run through the Division of Banking and Securities inside DCCED.",
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbr: "AZ",
    region: "West",
    regulators: [
      { name: "Arizona Department of Insurance and Financial Institutions", url: "https://difi.az.gov/", role: "Financial institutions, mortgage, money transmission, consumer lending, and collection licensing" },
    ],
    notes: "Arizona consolidated insurance and financial-institution supervision into DIFI.",
  },
  {
    slug: "arkansas",
    name: "Arkansas",
    abbr: "AR",
    region: "South",
    regulators: [
      { name: "Arkansas Securities Department", url: "https://securities.arkansas.gov/", role: "Mortgage and some non-depository licenses" },
      { name: "Arkansas State Board of Collection Agencies", url: "https://asbca.arkansas.gov/", role: "Collection agency licenses" },
    ],
    notes: "Collection agencies file with a standalone board; mortgage and many finance licenses file with the Securities Department.",
  },
  {
    slug: "california",
    name: "California",
    abbr: "CA",
    region: "West",
    regulators: [
      { name: "Department of Financial Protection and Innovation (DFPI)", url: "https://dfpi.ca.gov/", role: "CFL lending, CRMLA mortgage, money transmission, and debt-collector licensing" },
      { name: "California Department of Real Estate", url: "https://www.dre.ca.gov/", role: "Real-estate broker licenses that some mortgage brokers still hold" },
    ],
    notes: "California is a split-regulator state: DFPI owns most financial-services licenses, while some mortgage-broker activity still sits at DRE.",
  },
  {
    slug: "colorado",
    name: "Colorado",
    abbr: "CO",
    region: "West",
    regulators: [
      { name: "Colorado Division of Real Estate", url: "https://dre.colorado.gov/", role: "Mortgage company and MLO licensing" },
      { name: "Colorado Division of Banking", url: "https://banking.colorado.gov/", role: "Money transmitter licensing" },
      { name: "Colorado Attorney General, Collection Agency Board", url: "https://coag.gov/", role: "Collection agency licenses" },
    ],
    notes: "Colorado splits mortgage (Division of Real Estate), money transmission (Division of Banking), and collection (Attorney General) across three offices.",
  },
  {
    slug: "connecticut",
    name: "Connecticut",
    abbr: "CT",
    region: "Northeast",
    regulators: [
      { name: "Connecticut Department of Banking", url: "https://portal.ct.gov/dob", role: "Consumer credit, mortgage, money transmission, and collection licensing" },
    ],
    notes: "The Department of Banking’s Consumer Credit Division is the usual filing desk for non-depository licenses.",
  },
  {
    slug: "delaware",
    name: "Delaware",
    abbr: "DE",
    region: "South",
    regulators: [
      { name: "Delaware Office of the State Bank Commissioner", url: "https://banking.delaware.gov/", role: "Banking and non-depository financial licenses" },
    ],
    notes: "Delaware’s Bank Commissioner licenses mortgage, lender, money-transmitter, and collection activity.",
  },
  {
    slug: "florida",
    name: "Florida",
    abbr: "FL",
    region: "South",
    regulators: [
      { name: "Florida Office of Financial Regulation", url: "https://flofr.gov/", role: "Mortgage, consumer finance, money services, and collection licensing" },
    ],
    notes: "OFR is the single non-depository regulator for the four core verticals in Florida.",
  },
  {
    slug: "georgia",
    name: "Georgia",
    abbr: "GA",
    region: "South",
    regulators: [
      { name: "Georgia Department of Banking and Finance", url: "https://dbf.georgia.gov/", role: "Mortgage, money transmission, and consumer finance licensing" },
      { name: "Georgia Attorney General", url: "https://law.georgia.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "Georgia licenses lenders, mortgage companies, and money transmitters, but does not issue a state-level collection-agency license.",
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    abbr: "HI",
    region: "West",
    regulators: [
      { name: "Hawaii Division of Financial Institutions (DCCA)", url: "https://cca.hawaii.gov/dfi/", role: "Financial institution and non-depository licensing" },
    ],
    notes: "DFI inside the Department of Commerce and Consumer Affairs handles the core financial-services licenses.",
  },
  {
    slug: "idaho",
    name: "Idaho",
    abbr: "ID",
    region: "West",
    regulators: [
      { name: "Idaho Department of Finance", url: "https://www.finance.idaho.gov/", role: "Mortgage, consumer finance, money transmission, and collection licensing" },
    ],
    notes: "The Department of Finance is the statewide non-depository regulator.",
  },
  {
    slug: "illinois",
    name: "Illinois",
    abbr: "IL",
    region: "Midwest",
    regulators: [
      { name: "Illinois Department of Financial and Professional Regulation", url: "https://idfpr.illinois.gov/", role: "Consumer installment lending, mortgage, money transmission, and collection licensing" },
    ],
    notes: "IDFPR licenses the four core verticals. The City of Chicago also licenses debt collectors who collect from Chicago residents.",
  },
  {
    slug: "indiana",
    name: "Indiana",
    abbr: "IN",
    region: "Midwest",
    regulators: [
      { name: "Indiana Department of Financial Institutions", url: "https://www.in.gov/dfi/", role: "Mortgage, consumer credit, and money transmission licensing" },
      { name: "Indiana Secretary of State", url: "https://www.in.gov/sos/", role: "Collection agency licenses and some loan-broker filings" },
    ],
    notes: "Collection agencies file with the Secretary of State; most other financial licenses file with DFI through NMLS.",
  },
  {
    slug: "iowa",
    name: "Iowa",
    abbr: "IA",
    region: "Midwest",
    regulators: [
      { name: "Iowa Division of Banking", url: "https://www.idob.iowa.gov/", role: "Banking, mortgage, and money transmission licensing" },
      { name: "Iowa Attorney General", url: "https://www.iowaattorneygeneral.gov/", role: "Consumer-protection rules that apply to collectors" },
    ],
    notes: "Confirm the exact collection filing desk with the Attorney General or Insurance Division before treating Iowa as a licensed or unlicensed collection state for your model.",
  },
  {
    slug: "kansas",
    name: "Kansas",
    abbr: "KS",
    region: "Midwest",
    regulators: [
      { name: "Kansas Office of the State Bank Commissioner", url: "https://osbckansas.org/", role: "Mortgage, consumer lending, and money transmission licensing" },
      { name: "Kansas Attorney General", url: "https://ag.ks.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "Kansas licenses lenders and money transmitters through the Bank Commissioner and does not issue a statewide collection-agency license.",
  },
  {
    slug: "kentucky",
    name: "Kentucky",
    abbr: "KY",
    region: "South",
    regulators: [
      { name: "Kentucky Department of Financial Institutions", url: "https://kfi.ky.gov/", role: "Mortgage, consumer finance, and money transmission licensing" },
      { name: "Kentucky Attorney General", url: "https://www.ag.ky.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "DFI handles the core financial licenses. Kentucky does not issue a state-level collection-agency license.",
  },
  {
    slug: "louisiana",
    name: "Louisiana",
    abbr: "LA",
    region: "South",
    regulators: [
      { name: "Louisiana Office of Financial Institutions", url: "https://www.ofi.la.gov/", role: "Non-depository licensing, including mortgage, lending, money transmission, and collection" },
    ],
    notes: "OFI’s non-depository division is the usual desk for the four core verticals.",
  },
  {
    slug: "maine",
    name: "Maine",
    abbr: "ME",
    region: "Northeast",
    regulators: [
      { name: "Maine Bureau of Consumer Credit Protection", url: "https://www.maine.gov/pfr/consumercredit/", role: "Consumer credit, mortgage, and collection licensing" },
      { name: "Maine Bureau of Financial Institutions", url: "https://www.maine.gov/pfr/financialinstitutions/", role: "Money transmitter and depository supervision" },
    ],
    notes: "Maine splits consumer-credit licensing (BCCP) from money-transmitter supervision (Bureau of Financial Institutions).",
  },
  {
    slug: "maryland",
    name: "Maryland",
    abbr: "MD",
    region: "South",
    regulators: [
      { name: "Maryland Office of the Commissioner of Financial Regulation", url: "https://www.labor.maryland.gov/finance/", role: "Mortgage, consumer lending, money transmission, and collection licensing" },
    ],
    notes: "The Commissioner of Financial Regulation, now housed under Maryland Labor, is the statewide non-depository regulator.",
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    abbr: "MA",
    region: "Northeast",
    regulators: [
      { name: "Massachusetts Division of Banks", url: "https://www.mass.gov/orgs/division-of-banks", role: "Mortgage, lender, money services, and debt-collector licensing" },
    ],
    notes: "The Division of Banks licenses the four core verticals and publishes NMLS checklists for each authority.",
  },
  {
    slug: "michigan",
    name: "Michigan",
    abbr: "MI",
    region: "Midwest",
    regulators: [
      { name: "Michigan Department of Insurance and Financial Services", url: "https://www.michigan.gov/difs", role: "Mortgage, consumer lending, money transmission, and collection licensing" },
    ],
    notes: "DIFS is the consolidated insurance and financial-services regulator.",
  },
  {
    slug: "minnesota",
    name: "Minnesota",
    abbr: "MN",
    region: "Midwest",
    regulators: [
      { name: "Minnesota Department of Commerce", url: "https://mn.gov/commerce/", role: "Mortgage, consumer finance, money transmission, and collection licensing" },
    ],
    notes: "Commerce licenses non-depository financial services and publishes NMLS-based checklists.",
  },
  {
    slug: "mississippi",
    name: "Mississippi",
    abbr: "MS",
    region: "South",
    regulators: [
      { name: "Mississippi Department of Banking and Consumer Finance", url: "https://dbcf.ms.gov/", role: "Mortgage, consumer finance, and money transmission licensing" },
      { name: "Mississippi Attorney General", url: "https://www.ago.state.ms.us/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "Mississippi licenses lenders and money transmitters through DBCF and does not issue a statewide collection-agency license.",
  },
  {
    slug: "missouri",
    name: "Missouri",
    abbr: "MO",
    region: "Midwest",
    regulators: [
      { name: "Missouri Division of Finance", url: "https://finance.mo.gov/", role: "Mortgage, consumer credit, and money transmission licensing" },
      { name: "Missouri Attorney General", url: "https://ago.mo.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "Missouri licenses financial companies through the Division of Finance and does not issue a state-level collection-agency license.",
  },
  {
    slug: "montana",
    name: "Montana",
    abbr: "MT",
    region: "West",
    regulators: [
      { name: "Montana Division of Banking and Financial Institutions", url: "https://banking.mt.gov/", role: "Mortgage, consumer lending, and money-services supervision" },
      { name: "Montana Attorney General", url: "https://dojmt.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "Montana has historically been an outlier on money-transmitter licensing. Confirm the current statute with the Division before treating transmission as unlicensed activity.",
  },
  {
    slug: "nebraska",
    name: "Nebraska",
    abbr: "NE",
    region: "Midwest",
    regulators: [
      { name: "Nebraska Department of Banking and Finance", url: "https://ndbf.nebraska.gov/", role: "Mortgage, lending, and money transmission licensing" },
      { name: "Nebraska Secretary of State", url: "https://sos.nebraska.gov/", role: "Collection agency licensing" },
    ],
    notes: "Collection agencies file with the Secretary of State; other financial licenses file with the Department of Banking and Finance.",
  },
  {
    slug: "nevada",
    name: "Nevada",
    abbr: "NV",
    region: "West",
    regulators: [
      { name: "Nevada Division of Mortgage Lending", url: "https://www.mld.nv.gov/", role: "Mortgage company and MLO licensing" },
      { name: "Nevada Financial Institutions Division", url: "https://fid.nv.gov/", role: "Money transmission, collection, and consumer-finance licensing" },
    ],
    notes: "Nevada splits mortgage (Division of Mortgage Lending) from money services, collection, and consumer finance (FID).",
  },
  {
    slug: "new-hampshire",
    name: "New Hampshire",
    abbr: "NH",
    region: "Northeast",
    regulators: [
      { name: "New Hampshire Banking Department", url: "https://www.nh.gov/banking/", role: "Mortgage, consumer credit, and money transmission licensing" },
      { name: "New Hampshire Attorney General", url: "https://www.doj.nh.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "The Banking Department licenses the core financial verticals. New Hampshire does not issue a statewide collection-agency license.",
  },
  {
    slug: "new-jersey",
    name: "New Jersey",
    abbr: "NJ",
    region: "Northeast",
    regulators: [
      { name: "New Jersey Department of Banking and Insurance", url: "https://www.nj.gov/dobi/", role: "Mortgage, consumer lending, money transmission, and collection licensing" },
    ],
    notes: "DOBI is the consolidated banking and insurance regulator for non-depository licenses.",
  },
  {
    slug: "new-mexico",
    name: "New Mexico",
    abbr: "NM",
    region: "West",
    regulators: [
      { name: "New Mexico Financial Institutions Division", url: "https://www.rld.nm.gov/financial-institutions/", role: "Mortgage, lending, money transmission, and collection licensing" },
    ],
    notes: "FID sits inside the Regulation and Licensing Department.",
  },
  {
    slug: "new-york",
    name: "New York",
    abbr: "NY",
    region: "Northeast",
    regulators: [
      { name: "New York State Department of Financial Services", url: "https://www.dfs.ny.gov/", role: "Licensed lenders, mortgage companies, money transmitters, and virtual-currency supervision" },
      { name: "NYC Department of Consumer and Worker Protection", url: "https://www.nyc.gov/site/dca/", role: "Debt-collection licenses for activity involving New York City residents" },
    ],
    notes: "DFS licenses lenders, mortgage companies, and money transmitters statewide. Collection work that reaches New York City residents also needs the city’s DCWP license.",
  },
  {
    slug: "north-carolina",
    name: "North Carolina",
    abbr: "NC",
    region: "South",
    regulators: [
      { name: "North Carolina Office of the Commissioner of Banks", url: "https://www.nccob.gov/", role: "Mortgage, consumer finance, and money transmission licensing" },
      { name: "North Carolina Department of Insurance", url: "https://www.ncdoi.gov/", role: "Collection agency licenses" },
    ],
    notes: "Collection agencies file with the Department of Insurance; other financial licenses file with the Commissioner of Banks.",
  },
  {
    slug: "north-dakota",
    name: "North Dakota",
    abbr: "ND",
    region: "Midwest",
    regulators: [
      { name: "North Dakota Department of Financial Institutions", url: "https://www.nd.gov/dfi/", role: "Mortgage, consumer finance, money transmission, and collection licensing" },
    ],
    notes: "DFI is the statewide non-depository regulator.",
  },
  {
    slug: "ohio",
    name: "Ohio",
    abbr: "OH",
    region: "Midwest",
    regulators: [
      { name: "Ohio Division of Financial Institutions", url: "https://com.ohio.gov/divisions-and-programs/financial-institutions", role: "Mortgage, consumer finance, and money transmission licensing" },
      { name: "Ohio Attorney General", url: "https://www.ohioattorneygeneral.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "Ohio licenses lenders and money transmitters through DFI and does not issue a statewide collection-agency license.",
  },
  {
    slug: "oklahoma",
    name: "Oklahoma",
    abbr: "OK",
    region: "South",
    regulators: [
      { name: "Oklahoma Department of Consumer Credit", url: "https://www.ok.gov/okdocc/", role: "Consumer lending and some mortgage-related licenses" },
      { name: "Oklahoma Banking Department", url: "https://oklahoma.gov/banking.html", role: "Money transmitter licensing" },
      { name: "Oklahoma Attorney General", url: "https://www.oag.ok.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "Oklahoma splits consumer credit, banking/money transmission, and collection enforcement across three offices.",
  },
  {
    slug: "oregon",
    name: "Oregon",
    abbr: "OR",
    region: "West",
    regulators: [
      { name: "Oregon Division of Financial Regulation", url: "https://dfr.oregon.gov/", role: "Mortgage, consumer finance, money transmission, and collection licensing" },
    ],
    notes: "DFR inside the Department of Consumer and Business Services licenses the four core verticals.",
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    abbr: "PA",
    region: "Northeast",
    regulators: [
      { name: "Pennsylvania Department of Banking and Securities", url: "https://www.dobs.pa.gov/", role: "Mortgage, consumer lending, and money transmission licensing" },
      { name: "Pennsylvania Attorney General", url: "https://www.attorneygeneral.gov/", role: "Fair Credit Extension Uniformity Act enforcement for collectors" },
    ],
    notes: "Pennsylvania licenses lenders and money transmitters through DOBS. It does not run a typical standalone collection-agency license; collectors still face state and federal conduct rules.",
  },
  {
    slug: "rhode-island",
    name: "Rhode Island",
    abbr: "RI",
    region: "Northeast",
    regulators: [
      { name: "Rhode Island Department of Business Regulation", url: "https://dbr.ri.gov/", role: "Banking, mortgage, money transmission, and collection licensing" },
    ],
    notes: "DBR’s Banking Division is the usual non-depository filing desk.",
  },
  {
    slug: "south-carolina",
    name: "South Carolina",
    abbr: "SC",
    region: "South",
    regulators: [
      { name: "South Carolina Board of Financial Institutions", url: "https://www.banking.sc.gov/", role: "Mortgage and some non-depository licenses" },
      { name: "South Carolina Department of Consumer Affairs", url: "https://consumer.sc.gov/", role: "Consumer-credit licensing" },
      { name: "South Carolina Attorney General", url: "https://www.scag.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "South Carolina splits mortgage, consumer-credit, and collection enforcement. There is no statewide collection-agency license.",
  },
  {
    slug: "south-dakota",
    name: "South Dakota",
    abbr: "SD",
    region: "Midwest",
    regulators: [
      { name: "South Dakota Division of Banking", url: "https://dlr.sd.gov/banking/", role: "Mortgage, lending, and money transmission licensing" },
      { name: "South Dakota Attorney General", url: "https://atg.sd.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "The Division of Banking licenses financial companies. South Dakota does not issue a statewide collection-agency license.",
  },
  {
    slug: "tennessee",
    name: "Tennessee",
    abbr: "TN",
    region: "South",
    regulators: [
      { name: "Tennessee Department of Financial Institutions", url: "https://www.tn.gov/tdfi", role: "Mortgage, consumer lending, and money transmission licensing" },
      { name: "Tennessee Collection Service Board", url: "https://www.tn.gov/commerce/regboards/collect.html", role: "Collection service licenses" },
    ],
    notes: "Collection services file with a dedicated board under Commerce and Insurance; other financial licenses file with TDFI.",
  },
  {
    slug: "texas",
    name: "Texas",
    abbr: "TX",
    region: "South",
    regulators: [
      { name: "Texas Department of Savings and Mortgage Lending", url: "https://www.sml.texas.gov/", role: "Mortgage company and MLO licensing" },
      { name: "Texas Office of Consumer Credit Commissioner", url: "https://occc.texas.gov/", role: "Consumer and some commercial lending licenses" },
      { name: "Texas Department of Banking", url: "https://www.dob.texas.gov/", role: "Money transmitter licensing" },
      { name: "Texas Secretary of State", url: "https://www.sos.texas.gov/", role: "Third-party debt collector bond/registration under Occupations Code Chapter 396" },
    ],
    notes: "Texas is a four-desk state for these verticals: SML (mortgage), OCCC (lending), Department of Banking (money transmission), and the Secretary of State (collector bonding).",
  },
  {
    slug: "utah",
    name: "Utah",
    abbr: "UT",
    region: "West",
    regulators: [
      { name: "Utah Division of Real Estate", url: "https://realestate.utah.gov/", role: "Mortgage entity and MLO licensing" },
      { name: "Utah Department of Financial Institutions", url: "https://dfi.utah.gov/", role: "Consumer lending and money transmission licensing" },
      { name: "Utah Attorney General", url: "https://attorneygeneral.utah.gov/", role: "Consumer-protection enforcement for collectors" },
    ],
    notes: "Utah splits mortgage (Division of Real Estate) from lending and money transmission (DFI). Confirm current collection-license status with DFI and the Attorney General; Utah has moved this category in recent years.",
  },
  {
    slug: "vermont",
    name: "Vermont",
    abbr: "VT",
    region: "Northeast",
    regulators: [
      { name: "Vermont Department of Financial Regulation", url: "https://dfr.vermont.gov/", role: "Mortgage, lending, and money transmission licensing" },
      { name: "Vermont Attorney General", url: "https://ago.vermont.gov/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "DFR licenses financial companies. Vermont does not issue a statewide collection-agency license.",
  },
  {
    slug: "virginia",
    name: "Virginia",
    abbr: "VA",
    region: "South",
    regulators: [
      { name: "Virginia Bureau of Financial Institutions", url: "https://scc.virginia.gov/pages/Bureau-of-Financial-Institutions", role: "Mortgage, consumer finance, and money transmission licensing" },
      { name: "Virginia Attorney General", url: "https://www.oag.state.va.us/", role: "Consumer-protection enforcement for collectors; no state collection license" },
    ],
    notes: "The Bureau of Financial Institutions inside the SCC licenses the core financial verticals. Virginia does not issue a state-level collection-agency license.",
  },
  {
    slug: "washington",
    name: "Washington",
    abbr: "WA",
    region: "West",
    regulators: [
      { name: "Washington Department of Financial Institutions", url: "https://dfi.wa.gov/", role: "Mortgage, consumer lending, money transmission, and collection licensing" },
    ],
    notes: "DFI is the statewide non-depository regulator and publishes NMLS checklists for each license type.",
  },
  {
    slug: "west-virginia",
    name: "West Virginia",
    abbr: "WV",
    region: "South",
    regulators: [
      { name: "West Virginia Division of Financial Institutions", url: "https://dfi.wv.gov/", role: "Mortgage, consumer lending, money transmission, and collection licensing" },
    ],
    notes: "DFI licenses the four core verticals.",
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    abbr: "WI",
    region: "Midwest",
    regulators: [
      { name: "Wisconsin Department of Financial Institutions", url: "https://dfi.wi.gov/", role: "Mortgage, consumer lending, money transmission, and collection licensing" },
    ],
    notes: "DFI licenses the four core verticals and also administers Wisconsin’s charitable-organization registration.",
  },
  {
    slug: "wyoming",
    name: "Wyoming",
    abbr: "WY",
    region: "West",
    regulators: [
      { name: "Wyoming Division of Banking", url: "https://wyomingbankingdivision.wyo.gov/", role: "Mortgage, lending, and money transmission licensing" },
      { name: "Wyoming Collection Agency Board", url: "https://sos.wyo.gov/", role: "Collection agency licenses" },
    ],
    notes: "Collection agencies file with the Collection Agency Board; other financial licenses file with the Division of Banking.",
  },
];

export const regions = ["Northeast", "Midwest", "South", "West"] as const;

export function getState(slug: string): StateRecord | undefined {
  return states.find((s) => s.slug === slug);
}
