"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const components = [
  {
    id: "tower",
    number: "01",
    name: "Cooling tower",
    description:
      "In a typical water-cooled arrangement, the tower releases heat from the condenser-water loop to outdoor air.",
    marker: { x: 162, y: 166 },
  },
  {
    id: "chiller",
    number: "02",
    name: "Chiller",
    description:
      "The chiller transfers heat between the chilled-water and condenser-water circuits to produce cooling for the building.",
    marker: { x: 335, y: 234 },
  },
  {
    id: "pumps",
    number: "03",
    name: "Pumps",
    description:
      "Pumps circulate water through the system circuits. Their arrangement and controls depend on the project design.",
    marker: { x: 495, y: 272 },
  },
  {
    id: "ahu",
    number: "04",
    name: "Air-handling unit",
    description:
      "The air-handling unit moves air across a cooling coil, then distributes conditioned air through the building.",
    marker: { x: 635, y: 180 },
  },
  {
    id: "space",
    number: "05",
    name: "Conditioned space",
    description:
      "The occupied or technical space receives conditioned air. Airflow, temperature, and humidity targets vary by use.",
    marker: { x: 798, y: 142 },
  },
] as const;

export function CoolingSystemExplorer() {
  const [selectedId, setSelectedId] = useState<string>("chiller");
  const selected = components.find((item) => item.id === selectedId) ?? components[1];

  return (
    <Section id="cooling-system" tone="white" labelledBy="cooling-system-title">
      <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <SectionHeading
          id="cooling-system-title"
          eyebrow="Cooling System Explorer"
          title="Follow a typical cooling loop."
          description="Explore how heat rejection, water circulation, and air distribution can work together in a water-cooled system."
        />
        <div className="border-l-2 border-green-500 pl-5 text-sm leading-6 text-ink-500">
          <p className="font-semibold uppercase tracking-[0.14em] text-navy-900">
            Conceptual system view
          </p>
          <p className="mt-2">
            This simplified illustration is for explanation only. Actual system
            layouts vary with the building, equipment, and engineering design.
          </p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50 p-3 sm:p-6 lg:mt-12">
        <figure>
          <svg
            viewBox="0 0 900 360"
            role="img"
            aria-label="Illustrative cooling system with a cooling tower, chiller, pumps, air-handling unit, and conditioned space connected by water and air paths"
            className="h-auto w-full"
          >
            <defs>
              <pattern id="system-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="#D7E2F0" strokeWidth="1" />
              </pattern>
              <marker
                id="flow-arrow-green"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 8 4 0 8Z" fill="#43B02A" />
              </marker>
              <marker
                id="flow-arrow-navy"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0 0 8 4 0 8Z" fill="#245184" />
              </marker>
            </defs>

            <rect width="900" height="360" rx="16" fill="#F5F8FC" />
            <rect width="900" height="360" rx="16" fill="url(#system-grid)" />
            <path d="m35 285 355 52 475-78-357-55Z" fill="#EAF1F8" stroke="#D7E2F0" />

            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M194 164h65v69h42m69 0h49v38h49m66-10h56v-74h42"
                stroke="#43B02A"
                strokeWidth="5"
                markerEnd="url(#flow-arrow-green)"
              />
              <path
                d="M194 182h48v82h40m69 0h49v-42h49m66 0h56v-58h43m75 0h52"
                stroke="#245184"
                strokeWidth="4"
                strokeDasharray="8 8"
                markerEnd="url(#flow-arrow-navy)"
              />
            </g>

            {/* Cooling tower */}
            <g stroke="#103568" strokeLinejoin="round" strokeWidth="2">
              <path d="m105 106 58-24 58 24-58 25Z" fill="#FFFFFF" />
              <path d="m105 106 58 25v104l-58-24Z" fill="#D7E2F0" />
              <path d="m163 131 58-25v104l-58 25Z" fill="#B7CCE2" />
              <path d="m119 139 30 13v64l-30-13Zm43 19 44-19v63l-44 19Z" fill="#F5F8FC" />
              <path d="m115 151 35 15m-35 8 35 15m-35 0 35 15m15-26 43-18m-43 30 43-18m-43 30 43-18" fill="none" stroke="#8EA7C1" />
              <path d="m126 93 37-15 37 15-37 16Z" fill="#E7F4E2" />
            </g>

            {/* Chiller */}
            <g stroke="#103568" strokeLinejoin="round" strokeWidth="2">
              <path d="m272 180 63-27 64 27-64 27Z" fill="#FFFFFF" />
              <path d="m272 180 63 27v86l-63-27Z" fill="#D7E2F0" />
              <path d="m335 207 64-27v86l-64 27Z" fill="#B7CCE2" />
              <path d="m288 196 35 15v58l-35-15Z" fill="#F5F8FC" />
              <path d="m343 217 44-19v56l-44 19Z" fill="#EAF1F8" />
              <path d="m298 232 15 6m-15 9 15 6m42-26 34-15" fill="none" stroke="#66BD4A" strokeWidth="3" />
              <circle cx="380" cy="247" r="5" fill="#43B02A" stroke="none" />
            </g>

            {/* Pumps */}
            <g stroke="#103568" strokeLinejoin="round" strokeWidth="2">
              <path d="m440 253 54-23 54 23-54 24Z" fill="#FFFFFF" />
              <path d="m450 251 18-8v32l-18 8Z" fill="#D7E2F0" />
              <path d="m485 246 21-9 21 9v23l-21 9-21-9Z" fill="#E7F4E2" />
              <circle cx="506" cy="258" r="10" fill="#FFFFFF" />
              <path d="m506 248 10 10-10 10-10-10Z" fill="#66BD4A" />
              <path d="m480 280 28 12 34-15" fill="none" />
            </g>

            {/* Air-handling unit */}
            <g stroke="#103568" strokeLinejoin="round" strokeWidth="2">
              <path d="m573 113 62-26 62 26-62 27Z" fill="#FFFFFF" />
              <path d="m573 113 62 27v99l-62-26Z" fill="#D7E2F0" />
              <path d="m635 140 62-27v99l-62 27Z" fill="#B7CCE2" />
              <path d="m588 132 33 15v67l-33-14Z" fill="#F5F8FC" />
              <path d="m642 151 41-18v62l-41 18Z" fill="#EAF1F8" />
              <path d="m594 149 22 10m-22 8 22 10m-22 8 22 10m-22 8 22 10" fill="none" stroke="#8EA7C1" />
              <path d="m650 158 27-12m-27 23 27-12m-27 23 27-12" fill="none" stroke="#66BD4A" strokeWidth="3" />
            </g>

            {/* Conditioned space */}
            <g stroke="#103568" strokeLinejoin="round" strokeWidth="2">
              <path d="m730 75 62-26 62 26-62 27Z" fill="#FFFFFF" />
              <path d="m730 75 62 27v113l-62-27Z" fill="#EAF1F8" />
              <path d="m792 102 62-27v113l-62 27Z" fill="#D7E2F0" />
              <path d="m748 91 29 13v67l-29-13Z" fill="#FFFFFF" />
              <path d="m800 111 39-17v65l-39 17Z" fill="#F5F8FC" />
              <path d="m754 107 17 8m-17 9 17 8m-17 9 17 8m-17 9 17 8" fill="none" stroke="#8EA7C1" />
              <path d="m806 122 27-12m-27 22 27-12m-27 22 27-12" fill="none" stroke="#66BD4A" strokeWidth="3" />
            </g>

            {components.map((item) => {
              const active = item.id === selectedId;
              return (
                <g key={item.id}>
                  {active ? (
                    <circle
                      cx={item.marker.x}
                      cy={item.marker.y}
                      r="24"
                      fill="none"
                      stroke="#43B02A"
                      strokeWidth="3"
                    />
                  ) : null}
                  <circle
                    cx={item.marker.x}
                    cy={item.marker.y}
                    r="13"
                    fill="#081B38"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    x={item.marker.x}
                    y={item.marker.y + 4}
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {Number(item.number)}
                  </text>
                </g>
              );
            })}
          </svg>
          <figcaption className="mt-2 text-center text-xs text-ink-500">
            Illustrative system arrangement. Equipment and pipework are not to scale.
          </figcaption>
        </figure>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {components.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
              className={`min-h-14 rounded-control border px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-offset-2 ${
                selectedId === item.id
                  ? "border-green-500 bg-navy-950 text-white"
                  : "border-sky-200 bg-white text-navy-950 hover:border-navy-700"
              }`}
            >
              <span
                className={`mr-2 text-xs font-bold tracking-wider ${
                  selectedId === item.id ? "text-green-400" : "text-green-700"
                }`}
              >
                {item.number}
              </span>
              {item.name}
            </button>
          ))}
        </div>

        <div
          className="mt-4 min-h-28 rounded-control border border-sky-200 bg-white p-5 sm:p-6"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-green-700">
            {selected.number} / {selected.name}
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-ink-500 sm:text-base">
            {selected.description}
          </p>
        </div>
      </div>
    </Section>
  );
}
