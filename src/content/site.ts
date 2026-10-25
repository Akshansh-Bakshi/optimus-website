/**
 * Single source of truth for company facts.
 * Every value comes from the supplied company profile PDF (header/footer).
 * Anything NOT in the brochure is `null` and must be confirmed by the owner.
 * Unconfirmed values remain null until the owner verifies them.
 */

export interface Phone {
  display: string;
  /** E.164 value for tel: links */
  tel: string;
}

export interface Office {
  id: "registered" | "secondary";
  label: string;
  lines: readonly string[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  approachLine: string;
  phones: readonly Phone[];
  offices: readonly Office[];
  /** Printed in the brochure footer. "O" vs "0" is ambiguous; do not display until verified. */
  gstin: { value: string; verified: boolean };
  email: string | null;
  domain: string | null;
  serviceRegion: string | null;
  legalEntityName: string | null;
}

export const site: SiteConfig = {
  name: "Optimus Cooling & Power Solution",
  shortName: "Optimus",
  tagline: "Integrated Solutions for a Smarter, Safer & More Efficient Tomorrow",
  approachLine: "Your Vision + Our Expertise = The Right Solution",

  phones: [
    { display: "+91 81780 12916", tel: "+918178012916" },
    // The brochure prints "70091 48357" without a country code. +91 is assumed.
    { display: "+91 70091 48357", tel: "+917009148357" },
  ],

  offices: [
    {
      id: "registered",
      label: "Registered Office",
      lines: [
        "Village Sadhrana, Sadhrana Road, Dhani Sadhrana,",
        "Distt. Gurugram, Haryana-122505 (India)",
      ],
    },
    {
      id: "secondary",
      label: "Secondary Office",
      lines: ["592, 2nd Floor, Amravati Enclave,", "Panchkula – 134105 (India)"],
    },
  ],

  gstin: { value: "06AAIFO7645P1ZI", verified: false },

  // Not in the brochure. Awaiting owner confirmation.
  email: null,
  domain: null,
  serviceRegion: null,
  legalEntityName: null,
};
