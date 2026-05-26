import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PointsWizard from "@/components/PointsWizard";

export const metadata: Metadata = {
  title: "Points Tool — Award Trip Estimator",
  description:
    "Estimate the cash cost and points needed for your next trip. Tell us your destination, the point currencies you hold, and your travel style — we'll show points needed, value per point, and the best transfer partners.",
  alternates: { canonical: "/points-tool" },
  openGraph: {
    title: "Points Tool · High Tide Travel",
    description:
      "Estimate the points needed for your next award trip across every major currency.",
    url: "https://hightidetravel.co/points-tool",
  },
};

export default function PointsToolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Points Tool"
        title="How many points for your dream trip?"
        subtitle="Answer three quick questions and we'll estimate the cash cost, the points you'd need in each currency, and the smartest way to book."
      />
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <PointsWizard />
        </div>
      </div>
    </>
  );
}
