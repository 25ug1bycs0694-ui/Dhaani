import { createFileRoute } from "@tanstack/react-router";
import { FarmerAuthPage, farmerAuthHead } from "@/pages/farmer-auth-page";

export const Route = createFileRoute("/farmer/")({
  component: FarmerAuthPage,
  head: farmerAuthHead,
});
