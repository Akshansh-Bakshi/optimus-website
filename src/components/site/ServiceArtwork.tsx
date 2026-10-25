import {
  AirVent,
  BatteryCharging,
  Fan,
  Server,
  ShieldCheck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

type ServiceArtworkProps = {
  serviceNumber: string;
};

type ArtworkVariant = {
  label: string;
  icon: LucideIcon;
  background: string;
  foreground: string;
  accent: string;
};

const artwork: Record<string, ArtworkVariant> = {
  "01": {
    label: "COOLING CIRCUIT",
    icon: AirVent,
    background: "bg-navy-950",
    foreground: "text-white",
    accent: "text-green-400",
  },
  "02": {
    label: "ELECTRICAL SYSTEMS",
    icon: Zap,
    background: "bg-sky-100",
    foreground: "text-navy-950",
    accent: "text-green-700",
  },
  "03": {
    label: "LIFE SAFETY",
    icon: ShieldCheck,
    background: "bg-navy-900",
    foreground: "text-white",
    accent: "text-green-400",
  },
  "04": {
    label: "CRITICAL IT",
    icon: Server,
    background: "bg-sky-100",
    foreground: "text-navy-950",
    accent: "text-green-700",
  },
  "05": {
    label: "POWER CONTINUITY",
    icon: BatteryCharging,
    background: "bg-navy-950",
    foreground: "text-white",
    accent: "text-green-400",
  },
  "06": {
    label: "SERVICE & CARE",
    icon: Wrench,
    background: "bg-sky-100",
    foreground: "text-navy-950",
    accent: "text-green-700",
  },
};

const servicePhotographs: Record<string, { src: string; alt: string }> = {
  "01": {
    src: "/images/hvac-cooling.jpg",
    alt: "Representative photograph of rooftop HVAC cooling equipment.",
  },
  "02": {
    src: "/images/electrical-systems.jpg",
    alt: "Representative photograph of a worker servicing overhead electrical cables from an elevated platform.",
  },
  "03": {
    src: "/images/fire-protection-2.jpg",
    alt: "Representative photograph of a technician inspecting a pump control panel beside fire extinguishers.",
  },
  "04": {
    src: "/images/data-centre.jpg",
    alt: "Representative close-up photograph of illuminated server rack hardware.",
  },
  "05": {
    src: "/images/ups-power.jpg",
    alt: "Representative close-up photograph of a rack-mounted Furman power conditioner and outlets.",
  },
  "06": {
    src: "/images/maintenance.jpg",
    alt: "Representative photograph of a gloved technician using an adjustable wrench on mechanical equipment.",
  },
};

export function ServiceArtwork({ serviceNumber }: ServiceArtworkProps) {
  const item = artwork[serviceNumber] ?? artwork["01"];
  const photograph = servicePhotographs[serviceNumber];
  const Icon = item.icon;

  if (photograph) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden bg-navy-950">
        <Image
          src={photograph.src}
          alt={photograph.alt}
          fill
          sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 rounded-sm bg-navy-950/80 px-2 py-0.5 text-[0.5625rem] leading-3 font-semibold uppercase tracking-[0.12em] text-white"
        >
          Representative image
        </span>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`bg-grid-light relative flex aspect-[16/9] items-center justify-center overflow-hidden ${item.background} ${item.foreground}`}
    >
      <div className="absolute left-5 top-5 h-10 w-10 border-l border-t border-current/20" />
      <div className="absolute bottom-5 right-5 h-10 w-10 border-b border-r border-current/20" />
      <div className="absolute inset-x-8 top-1/2 h-px bg-current/10" />
      <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current/10" />
      <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current/10" />
      <div className="relative flex size-24 items-center justify-center rounded-2xl border border-current/20 bg-white/5 shadow-[0_16px_40px_rgba(8,27,56,0.16)]">
        <Icon aria-hidden="true" className={item.accent} size={54} strokeWidth={1.25} />
      </div>
      <span className="absolute left-6 top-6 text-[0.62rem] font-semibold tracking-[0.18em] opacity-65">
        SYSTEM {serviceNumber}
      </span>
      <span className="absolute bottom-6 right-6 text-[0.62rem] font-semibold tracking-[0.15em] opacity-70">
        {item.label}
      </span>
      <Fan
        aria-hidden="true"
        className={`absolute right-12 top-1/2 -translate-y-1/2 opacity-20 ${item.accent}`}
        size={24}
        strokeWidth={1.4}
      />
    </div>
  );
}
