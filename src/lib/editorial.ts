import { SITE_URL } from "./directory";

/** First and last commit dates for each guide file. */
export const guideDates = {
  index: { published: "2026-08-09", modified: "2026-09-28" },
  "first-business-license": { published: "2026-08-09", modified: "2026-10-13" },
  "multi-state": { published: "2026-08-09", modified: "2026-10-13" },
  nmls: { published: "2026-08-29", modified: "2026-10-13" },
  "what-happens-if-you-skip-it": { published: "2026-08-09", modified: "2026-08-29" },
  "which-license-do-i-need": { published: "2026-09-28", modified: "2026-10-13" },
} as const;

/** Last commit date of src/pages/directory/index.astro. */
export const directoryIndexUpdated = "2026-10-16";

/** Last commit date of src/pages/directory/[type].astro. */
export const directoryTypeUpdated = "2026-10-15";

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

export function formatEditorialDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) throw new Error(`Bad editorial date: ${iso}`);
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) throw new Error(`Bad editorial date: ${iso}`);
  return `${month} ${Number(match[3])}, ${match[1]}`;
}

export function articleSchema(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  formatEditorialDate(input.datePublished);
  formatEditorialDate(input.dateModified);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Organization",
      name: "LicensingMadeSimple",
      url: new URL("/about", SITE_URL).href,
    },
    publisher: {
      "@type": "Organization",
      name: "LicensingMadeSimple",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: new URL("/logo-lockup.png", SITE_URL).href,
      },
    },
  };
  const parsed = JSON.parse(JSON.stringify(schema));
  if (parsed["@type"] !== "Article") throw new Error("Article schema did not parse");
  if (parsed.author?.["@type"] !== "Organization" || parsed.author?.name !== "LicensingMadeSimple") {
    throw new Error("Article author must be the LicensingMadeSimple organization");
  }
  if (parsed.author?.url !== new URL("/about", SITE_URL).href) {
    throw new Error("Article author url must be /about");
  }
  if (parsed.publisher?.["@type"] !== "Organization" || parsed.publisher?.name !== "LicensingMadeSimple") {
    throw new Error("Article publisher must be the LicensingMadeSimple organization");
  }
  if (!parsed.datePublished || !parsed.dateModified) throw new Error("Article dates missing");
  return parsed;
}
