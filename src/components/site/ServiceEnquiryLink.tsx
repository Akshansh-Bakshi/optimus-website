"use client";

import { ArrowUpRight } from "lucide-react";

type ServiceEnquiryLinkProps = {
  serviceTitle: string;
};

export function ServiceEnquiryLink({ serviceTitle }: ServiceEnquiryLinkProps) {
  return (
    <a
      href="#contact"
      aria-label={`Discuss ${serviceTitle}`}
      className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-control text-sm font-semibold text-navy-900 hover:text-green-700"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("optimus:select-service", {
            detail: { serviceTitle },
          }),
        );
      }}
    >
      Discuss this service
      <ArrowUpRight aria-hidden="true" size={16} />
    </a>
  );
}
