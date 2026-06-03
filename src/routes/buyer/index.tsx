import { createFileRoute } from "@tanstack/react-router";
import { BuyerAuthPage } from "@/pages/buyer-auth-page";

export const Route = createFileRoute("/buyer/")({
  component: BuyerAuthPage,
  head: () => ({
    meta: [
      { title: "Dhaani — Buyer Login & Signup | Sustainable Biomass Sourcing" },
      {
        name: "description",
        content:
          "Login or create your Dhaani buyer account. Source crop residue directly from verified farmers across Punjab, Haryana and Western UP.",
      },
    ],
  }),
});
