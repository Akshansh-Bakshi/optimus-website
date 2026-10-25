import { Building2, Factory, Server, type LucideIcon } from "lucide-react";

export interface Sector {
  id: "commercial" | "industrial" | "data-centre";
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * The brochure names exactly three environments: "commercial, industrial and
 * data centre" (p.5), plus "Buildings, Data Centres & Plants" (p.4) and
 * "Building / Factory Turnkey Solutions" (p.4). No other sectors are claimed.
 */
export const sectors: readonly Sector[] = [
  {
    id: "commercial",
    title: "Commercial buildings",
    description:
      "HVAC, electrical and earthing solutions for commercial environments.",
    icon: Building2,
  },
  {
    id: "industrial",
    title: "Industrial facilities & plants",
    description:
      "Factory turnkey solutions, electrical systems, and earthing and bonding for plants.",
    icon: Factory,
  },
  {
    id: "data-centre",
    title: "Data centres & server rooms",
    description:
      "Precision cooling, power backup, fire safety and infrastructure.",
    icon: Server,
  },
];