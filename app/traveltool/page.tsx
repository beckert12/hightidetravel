import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TripPlanner from "@/components/TripPlanner";

export const metadata: Metadata = {
  title: "AI Trip Planner",
  description:
    "Plan any trip with points and miles. Enter your route, dates, vibe, and points balance — High Tide Travel's AI planner returns the best flights, hotels, activities, and cash-vs-points (CPP) analysis with links to book.",
  alternates: { canonical: "/traveltool" },
  openGraph: {
    title: "AI Trip Planner · High Tide Travel",
    description:
      "Tailored flights, hotels, activities, and points booking strategy for any trip.",
    url: "https://hightidetravel.co/traveltool",
  },
};

export default function PointsToolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trip Planner"
        title="Plan your next trip on points & miles"
        subtitle="Give us your route, travel window, vibe, cards, and points stash. We'll build a tailored plan — three flight and hotel options each, the smartest transfer partners to book them, which of your cards to use, and things to do."
      />
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <TripPlanner />
        </div>
      </div>
    </>
  );
}
