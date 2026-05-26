import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CreditCardsExplorer from "@/components/CreditCardsExplorer";

export const metadata: Metadata = {
  title: "Best Travel Credit Cards",
  description:
    "Compare the best travel rewards credit cards by welcome bonus, annual fee, and perks. Filter by travel, hotel, airline, no annual fee, and business — then compare up to 3 side by side.",
  alternates: { canonical: "/credit-cards" },
  openGraph: {
    title: "Best Travel Credit Cards · High Tide Travel",
    description:
      "Compare the best travel rewards credit cards and find the right welcome bonus for your next trip.",
    url: "https://hightidetravel.co/credit-cards",
  },
};

export default function CreditCardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Credit Cards"
        title="Find your next travel rewards card"
        subtitle="Compare welcome bonuses, annual fees, and perks across the top cards. Filter by what matters to you, then line up to three side by side."
      />
      <div className="container-page py-12 sm:py-16">
        <CreditCardsExplorer />
      </div>
    </>
  );
}
