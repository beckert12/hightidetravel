import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TripPlanner from "@/components/TripPlanner";

export const metadata: Metadata = {
  title: "AI Trip Planner",
  description:
    "Plan any trip with points and miles. Enter your route, dates, vibe, and points balance — High Tide Travel's AI planner returns the best flights, hotels, activities, and cash-vs-points (CPP) analysis with links to book.",
  alternates: { canonical: "/points-tool" },
  openGraph: {
    title: "AI Trip Planner · High Tide Travel",
    description:
      "Tailored flights, hotels, activities, and cash-vs-points analysis for any trip.",
    url: "https://hightidetravel.co/points-tool",
  },
};

export default function PointsToolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trip Planner"
        title="Plan your next trip on points & miles"
        subtitle="Give us your route, travel window, vibe, and points stash. We'll build a tailored plan — three flight and hotel options each, things to do, and cash-vs-points math so you book the smart way."
      />
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <TripPlanner />
        </div>
      </div>
    </>
  );
}
