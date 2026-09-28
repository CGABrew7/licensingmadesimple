import { regions, states, getState, type StateRecord } from "../data/states";
import {
  adjacentLicenseTypes,
  coreLicenseTypes,
  getLicenseType,
  licenseTypes,
  type LicenseSlug,
  type LicenseType,
} from "../data/license-types";
import { getFactsForLicense, getFactsForState, getStateLicense, type StateLicenseFact } from "../data/state-licenses";

export const SITE_URL = "https://licensingmadesimple.com";
export const CORNERSTONE_URL = "https://cornerstonelicensing.com";

export { regions, states, getState, licenseTypes, coreLicenseTypes, adjacentLicenseTypes, getLicenseType, getStateLicense, getFactsForLicense, getFactsForState };
export type { StateRecord, LicenseType, LicenseSlug, StateLicenseFact };

export const coreSlugs = coreLicenseTypes.map((t) => t.slug);

export function statePath(slug: string) {
  return `/states/${slug}`;
}

export function licensePath(slug: string) {
  return `/directory/${slug}`;
}

export function comboPath(stateSlug: string, licenseSlug: string) {
  return `/states/${stateSlug}/${licenseSlug}`;
}

export function requiredLabel(required: StateLicenseFact["required"]): string {
  if (required === true) return "State license generally required";
  if (required === false) return "No statewide license of this type";
  return "Confirm with the agency";
}

export function filingLabel(filing: StateLicenseFact["filing"]): string {
  switch (filing) {
    case "nmls":
      return "File through NMLS";
    case "state-portal":
      return "File through the state portal or board";
    case "nmls-or-state":
      return "NMLS or the state portal — use the agency checklist";
    case "municipal-plus":
      return "State and/or city filing";
    case "none":
      return "No statewide license application";
  }
}

function assertDirectoryComplete() {
  const missing: string[] = [];
  for (const state of states) {
    for (const type of coreLicenseTypes) {
      if (!getStateLicense(state.slug, type.slug)) {
        missing.push(`${state.slug}/${type.slug}`);
      }
    }
  }
  if (missing.length) {
    throw new Error(`Directory data missing ${missing.length} combo(s): ${missing.slice(0, 8).join(", ")}`);
  }
}

assertDirectoryComplete();

export function publicPages(): { path: string; changefreq: string; priority: string }[] {
  const staticPages = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/directory", changefreq: "weekly", priority: "0.9" },
    { path: "/states", changefreq: "weekly", priority: "0.9" },
    { path: "/guides", changefreq: "monthly", priority: "0.7" },
    { path: "/guides/which-license-do-i-need", changefreq: "monthly", priority: "0.6" },
    { path: "/guides/first-business-license", changefreq: "monthly", priority: "0.6" },
    { path: "/guides/multi-state", changefreq: "monthly", priority: "0.6" },
    { path: "/guides/what-happens-if-you-skip-it", changefreq: "monthly", priority: "0.6" },
    { path: "/guides/nmls", changefreq: "monthly", priority: "0.7" },
    { path: "/about", changefreq: "yearly", priority: "0.4" },
    { path: "/faq", changefreq: "yearly", priority: "0.4" },
    { path: "/contact", changefreq: "yearly", priority: "0.4" },
    { path: "/privacy", changefreq: "yearly", priority: "0.2" },
  ];

  const typePages = licenseTypes.map((t) => ({
    path: licensePath(t.slug),
    changefreq: "weekly",
    priority: t.tier === "core" ? "0.8" : "0.5",
  }));

  const statePages = states.map((s) => ({
    path: statePath(s.slug),
    changefreq: "weekly",
    priority: "0.7",
  }));

  const comboPages = states.flatMap((s) =>
    coreLicenseTypes.map((t) => ({
      path: comboPath(s.slug, t.slug),
      changefreq: "weekly",
      priority: "0.6",
    })),
  );

  return [...staticPages, ...typePages, ...statePages, ...comboPages];
}
