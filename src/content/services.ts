import {
  ArrowDownToLine,
  BatteryCharging,
  Flame,
  Server,
  Snowflake,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug =
  | "hvac-cooling"
  | "electrical"
  | "fire-protection"
  | "data-centre"
  | "ups-power"
  | "earthing-bonding";

export interface Service {
  slug: ServiceSlug;
  title: string;
  /** Short label for compact UI */
  shortLabel: string;
  summary: string;
  /** Bullet items as listed in the brochure */
  highlights: readonly string[];
  icon: LucideIcon;
  /** Brochure page numbers that support this entry */
  sourcePages: readonly number[];
}

export const services: readonly Service[] = [
  {
    slug: "hvac-cooling",
    title: "HVAC & Cooling Solutions",
    shortLabel: "HVAC",
    summary:
      "Complete HVAC solutions for commercial, industrial and data centre environments, focused on energy efficiency, reliability and indoor air quality.",
    highlights: [
      "Chillers, AHU, FCU, VRF, Split & Window AC",
      "Precision AC for Data Centres & Server Rooms",
      "Ductable AC & Package Units",
      "Installation, Commissioning & Service",
      "AMC & Preventive Maintenance",
    ],
    icon: Snowflake,
    sourcePages: [3, 5],
  },
  {
    slug: "electrical",
    title: "Electrical Solutions",
    shortLabel: "Electrical",
    summary:
      "Complete electrical system installation, maintenance and upgrades, with a focus on safety, reliability and efficiency.",
    highlights: [
      "HT / LT Installation & Maintenance",
      "Power Distribution & Panel Installation",
      "UPS & Battery Systems",
      "Lighting & Power Systems",
      "Electrical Troubleshooting & Upgradation",
    ],
    icon: Zap,
    sourcePages: [3, 6],
  },
  {
    slug: "fire-protection",
    title: "Fire Protection & Fire Fighting",
    shortLabel: "Fire Safety",
    summary:
      "Fire alarm, hydrant and sprinkler, clean agent and emergency lighting systems.",
    highlights: [
      "Fire Alarm System",
      "Fire Fighting System (Hydrant & Sprinkler)",
      "FM200 / Clean Agent Systems",
      "Emergency Lighting & Exit Systems",
    ],
    icon: Flame,
    sourcePages: [4],
  },
  {
    slug: "data-centre",
    title: "Data Centre & Server Room Solutions",
    shortLabel: "Data Centre",
    summary:
      "End-to-end data centre solutions covering precision cooling, power backup, fire safety and supporting infrastructure.",
    highlights: [
      "Server Rack & Infrastructure",
      "Precision Cooling & Monitoring",
      "Power & Network Cabling",
      "Fire Detection & Suppression",
      "Earthing & Bonding",
    ],
    icon: Server,
    sourcePages: [3, 7],
  },
  {
    slug: "ups-power",
    title: "UPS & Power Solutions",
    shortLabel: "UPS & Power",
    summary:
      "UPS systems, battery banks and power management solutions for critical infrastructure and data centres.",
    highlights: [
      "Online / Offline UPS Systems",
      "Battery Bank Installation & Maintenance",
      "Power Distribution Units (PDU)",
      "Power Monitoring & Management",
    ],
    icon: BatteryCharging,
    sourcePages: [8],
  },
  {
    slug: "earthing-bonding",
    title: "Earthing, Bonding & Lightning Protection",
    shortLabel: "Earthing",
    summary:
      "Electrical earthing, lightning protection and equipotential bonding for buildings, data centres and plants.",
    highlights: [
      "Electrical Earthing System",
      "Lightning Protection",
      "Equipotential Bonding",
      "For Buildings, Data Centres & Plants",
    ],
    icon: ArrowDownToLine,
    sourcePages: [4],
  },
];

/** Brochure page 4, "Other Services" */
export const additionalCapabilities: readonly string[] = [
  "Air Filtration Systems",
  "UPS & Batteries",
  "Building / Factory Turnkey Solutions",
  "Energy Efficient Solutions",
  "Consultancy & Project Support",
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}