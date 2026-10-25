export interface HomepageService {
  number: string;
  title: string;
  description: string;
}

export const homepageServices: readonly HomepageService[] = [
  {
    number: "01",
    title: "HVAC & Cooling Solutions",
    description:
      "Cooling and climate-control solutions designed around the operational needs of commercial and technical environments.",
  },
  {
    number: "02",
    title: "Electrical Solutions",
    description:
      "Electrical infrastructure and installation solutions planned with a focus on reliability, safety, and performance.",
  },
  {
    number: "03",
    title: "Fire Protection",
    description:
      "Fire protection and firefighting solutions that support safer, more resilient facilities.",
  },
  {
    number: "04",
    title: "Data Centre Solutions",
    description:
      "Infrastructure solutions for server rooms and data centres, where dependable cooling and power are essential.",
  },
  {
    number: "05",
    title: "UPS & Power Solutions",
    description:
      "Uninterruptible power and supporting infrastructure to help protect critical equipment from power disruptions.",
  },
  {
    number: "06",
    title: "Maintenance & AMC",
    description:
      "Maintenance and annual maintenance contract services to support equipment reliability and ongoing operations.",
  },
];
