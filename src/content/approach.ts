import {
  BadgeCheck,
  ClipboardList,
  Clock,
  HardHat,
  Headset,
  PencilRuler,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ApproachStep {
  step: number;
  title: "Plan" | "Design" | "Execute" | "Support";
  /** Pillar label(s) from brochure page 2 */
  pillar: string;
  description: string;
  icon: LucideIcon;
}

/** Brochure page 2: "Plan | Design | Execute | Support" */
export const approachSteps: readonly ApproachStep[] = [
  {
    step: 1,
    title: "Plan",
    pillar: "Understand Client Needs",
    description:
      "A structured, customer-centric start: understanding what the client needs.",
    icon: ClipboardList,
  },
  {
    step: 2,
    title: "Design",
    pillar: "Smart Design",
    description:
      "Solutions designed to be reliable, efficient and future-ready.",
    icon: PencilRuler,
  },
  {
    step: 3,
    title: "Execute",
    pillar: "Quality Execution & On-Time Delivery",
    description:
      "Delivery with a focus on safety, quality and timely execution.",
    icon: HardHat,
  },
  {
    step: 4,
    title: "Support",
    pillar: "Long Term Support",
    description: "Continued support after the work is delivered.",
    icon: Headset,
  },
];

export interface Commitment {
  title: string;
  /** Parenthetical qualifier exactly as printed in brochure page 9 */
  detail: string;
  icon: LucideIcon;
}

/** Brochure page 9, "Safety, Quality & Execution" */
export const commitments: readonly Commitment[] = [
  { title: "Safety First", detail: "PPE & Safe Working", icon: ShieldCheck },
  { title: "Quality Work", detail: "Standards & Compliance", icon: BadgeCheck },
  { title: "Skilled Team", detail: "Experienced Engineers", icon: Users },
  { title: "On-Time Execution", detail: "Commitment", icon: Clock },
];

/** Brochure page 9 */
export const safetyStatement =
  "Safety is not just a policy, it's our culture. We ensure that every project is executed with the highest standards of safety, quality and professionalism.";