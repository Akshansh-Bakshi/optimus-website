import Image from "next/image";
import {
  ClipboardList,
  HardHat,
  Headset,
  MapPin,
  PencilRuler,
  Phone,
} from "lucide-react";
import { CoolingSystemExplorer } from "@/components/site/CoolingSystemExplorer";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ServiceArtwork } from "@/components/site/ServiceArtwork";
import { ServiceEnquiryLink } from "@/components/site/ServiceEnquiryLink";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homepageServices } from "@/content/homepage-services";
import { site } from "@/content/site";

const approach = [
  {
    number: "01",
    title: "Plan",
    description:
      "Understand requirements, site conditions, and project objectives.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Develop a solution aligned with technical requirements and operational needs.",
    icon: PencilRuler,
  },
  {
    number: "03",
    title: "Execute",
    description:
      "Coordinate implementation with attention to quality and safety.",
    icon: HardHat,
  },
  {
    number: "04",
    title: "Support",
    description:
      "Continue supporting systems through maintenance and service.",
    icon: Headset,
  },
];

const solutions = [
  {
    title: "HVAC & Cooling",
    description: "Climate control and cooling infrastructure.",
  },
  {
    title: "Server Rooms & Data Centres",
    description: "Cooling and supporting critical infrastructure.",
  },
  {
    title: "Electrical Systems",
    description: "Electrical installation and infrastructure.",
  },
  {
    title: "UPS & Power Backup",
    description: "Support for continuity of critical equipment.",
  },
];

export default function Home() {
  const registeredOffice = site.offices.find((office) => office.id === "registered");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-control bg-white p-3 text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-sky-50 text-ink-800">
        <section className="relative isolate flex min-h-[660px] items-center overflow-hidden bg-navy-950 py-20 text-white sm:min-h-[700px] lg:min-h-[720px]">
          <Image
            src="/images/optimus-hero.jpg"
            alt="Representative photograph of industrial cooling towers beneath a cloudy sky."
            fill
            sizes="100vw"
            className="-z-20 object-cover object-[center_62%]"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/45"
          />
          <div
            aria-hidden="true"
            className="bg-grid-light pointer-events-none absolute inset-0 -z-10 opacity-30"
          />
          <Container className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <p className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-green-400 sm:text-sm">
                <span aria-hidden="true" className="h-px w-9 bg-green-400" />
                Integrated Infrastructure Solutions
              </p>
              <h1 className="text-display max-w-3xl font-bold tracking-tight text-white">
                Engineering reliable cooling &amp; power for critical environments.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-sky-100 sm:text-lg sm:leading-8">
                Optimus provides cooling, electrical, fire protection, and
                critical power infrastructure solutions for commercial and
                technical environments.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-control bg-green-500 px-6 py-3 text-center font-semibold text-navy-950 transition-colors hover:bg-green-700 hover:text-white"
                >
                  Discuss Your Project
                </a>
                <a
                  href="#services"
                  className="inline-flex min-h-12 items-center justify-center rounded-control border border-white/60 bg-white/5 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Explore Our Services
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/20 pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-sky-100 sm:text-sm">
                <span>Cooling</span>
                <span aria-hidden="true" className="text-green-400">/</span>
                <span>Electrical</span>
                <span aria-hidden="true" className="text-green-400">/</span>
                <span>Fire protection</span>
                <span aria-hidden="true" className="text-green-400">/</span>
                <span>Critical power</span>
              </div>
            </div>
            <div className="hidden min-h-[390px] items-end justify-end lg:flex">
              <div className="max-w-xs border-l-2 border-green-400 bg-navy-950/55 p-5 backdrop-blur-sm">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sky-200">
                  Representative infrastructure image
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-400">
                  Built around the system
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Cooling, power, and protection in context.
                </p>
                <p className="mt-2 text-sm leading-6 text-sky-100">
                  Explore how critical infrastructure components connect.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <Section id="services" tone="tint" labelledBy="services-title">
          <SectionHeading
            id="services-title"
            eyebrow="What We Do"
            title="Infrastructure solutions that work together"
            description="Explore our core service areas for cooling, electrical infrastructure, fire protection, and critical power."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {homepageServices.map((service) => (
              <Card
                as="article"
                key={service.number}
                className="group flex h-full flex-col overflow-hidden border-sky-200 p-0 transition duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-[0_18px_44px_rgba(8,27,56,0.12)] focus-within:border-green-500 focus-within:shadow-[0_18px_44px_rgba(8,27,56,0.12)]"
              >
                <ServiceArtwork serviceNumber={service.number} />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="text-xs font-bold tracking-[0.18em] text-green-700">
                    SERVICE {service.number}
                  </span>
                  <h3 className="mt-3 text-h3 font-semibold text-navy-950">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-500">
                    {service.description}
                  </p>
                  <ServiceEnquiryLink serviceTitle={service.title} />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="solutions" tone="navy" className="bg-grid-light" labelledBy="solutions-title">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <SectionHeading
              id="solutions-title"
              eyebrow="Connected Infrastructure"
              title="Critical systems deserve a coordinated approach."
              description="Cooling, power, electrical systems, and fire protection each play an important role in facility operations. Coordinating these requirements helps create a more considered infrastructure solution."
              tone="dark"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {solutions.map((solution) => (
                <Card
                  as="article"
                  key={solution.title}
                  className="border-white/15 bg-white p-5 shadow-[0_14px_32px_rgba(0,0,0,0.12)] sm:p-6"
                >
                  <div className="mb-4 h-1 w-10 rounded-full bg-green-500" />
                  <h3 className="font-semibold text-navy-950">{solution.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-500">
                    {solution.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <CoolingSystemExplorer />

        <Section id="approach" tone="tint" labelledBy="approach-title">
          <SectionHeading
            id="approach-title"
            eyebrow="How We Work"
            title="A clear process from planning to support"
            description="A four-stage approach to help organize infrastructure requirements and delivery."
          />
          <ol className="mt-10 grid gap-8 lg:relative lg:mt-14 lg:grid-cols-4 lg:gap-8 lg:before:absolute lg:before:left-[12.5%] lg:before:right-[12.5%] lg:before:top-24 lg:before:z-0 lg:before:h-px lg:before:bg-green-500 lg:before:content-['']">
            {approach.map((item) => (
              <li
                key={item.number}
                className="group relative z-10 grid grid-cols-[4rem_minmax(0,1fr)] items-start gap-x-5 after:absolute after:bottom-[-4rem] after:left-8 after:top-8 after:z-0 after:w-px after:bg-green-500 after:content-[''] last:after:hidden lg:flex lg:flex-col lg:items-center lg:gap-4 lg:text-center lg:after:hidden"
              >
                <div className="relative z-10 col-start-1 row-span-2 grid size-16 place-items-center rounded-full border border-sky-300 bg-white text-navy-900 shadow-[0_4px_14px_rgba(8,27,56,0.08)] transition-colors group-hover:border-green-500 group-hover:bg-green-100 lg:order-2">
                  <item.icon aria-hidden="true" size={27} strokeWidth={1.6} />
                </div>
                <p className="col-start-2 text-4xl font-medium tracking-tight text-navy-900 lg:order-1 lg:text-5xl">
                  {item.number}
                </p>
                <div className="col-start-2 pt-1 lg:order-3 lg:max-w-[16rem] lg:pt-0">
                  <h3 className="text-h3 font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-500">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contact" tone="navy" className="bg-grid-light" labelledBy="contact-title">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            <div>
              <SectionHeading
                id="contact-title"
                eyebrow="Project Enquiries"
                title="Let’s discuss your project."
                description="Tell us which service you need and share a few details about the site or requirement. The form marks the information needed to prepare an enquiry."
                tone="dark"
              />
              <div className="mt-8 space-y-5 text-sm text-sky-100">
                {site.phones.slice(0, 1).map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="flex w-fit items-center gap-3 rounded-control hover:text-white"
                  >
                    <Phone aria-hidden="true" size={18} className="text-green-400" />
                    <span>{phone.display}</span>
                  </a>
                ))}
                {registeredOffice ? (
                  <address className="flex items-start gap-3 not-italic">
                    <MapPin
                      aria-hidden="true"
                      size={18}
                      className="mt-0.5 shrink-0 text-green-400"
                    />
                    <span>
                      <span className="mb-1 block font-semibold text-white">
                        {registeredOffice.label}
                      </span>
                      {registeredOffice.lines.map((line) => (
                        <span className="block" key={line}>
                          {line}
                        </span>
                      ))}
                    </span>
                  </address>
                ) : null}
              </div>
            </div>
            <Card className="border-sky-200 bg-white p-5 sm:p-8">
              <EnquiryForm />
            </Card>
          </div>
        </Section>
      </main>

      <footer className="bg-navy-950 text-sky-100">
        <Container className="grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:items-start lg:gap-16">
          <div>
            <Image
              src="/brand/optimus-logo-light.svg"
              alt="Optimus Cooling & Power Solution"
              width={228}
              height={46}
            />
            <p className="mt-4 max-w-sm text-sm leading-6 text-sky-200">
              Cooling, electrical, fire protection, and critical power solutions.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-white" href="#services">Services</a></li>
              <li><a className="hover:text-white" href="#solutions">Solutions</a></li>
              <li><a className="hover:text-white" href="#approach">Our Approach</a></li>
              <li><a className="hover:text-white" href="#contact">Project Enquiry</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <a
              href={`tel:${site.phones[0].tel}`}
              className="mt-3 inline-block text-sm hover:text-white"
            >
              {site.phones[0].display}
            </a>
          </div>
          <p className="border-t border-white/15 pt-5 text-xs text-sky-200 sm:col-span-2 lg:col-span-3">
            © Optimus Cooling &amp; Power Solution.
          </p>
        </Container>
      </footer>
    </>
  );
}
