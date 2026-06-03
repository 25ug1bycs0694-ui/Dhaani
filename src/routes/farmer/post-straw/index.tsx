import { createFileRoute } from "@tanstack/react-router";
import { PostStrawPage } from "@/pages/post-straw-page";

export const Route = createFileRoute("/farmer/post-straw/")({
  head: () => ({
    meta: [
      { title: "Post Your Straw — Dhaani" },
      {
        name: "description",
        content:
          "List your crop residue on Dhaani. Connect with verified buyers within 150 km — straight from your field.",
      },
      { property: "og:title", content: "Post Your Straw — Dhaani" },
      {
        property: "og:description",
        content:
          "From stubble to sustainability. Post your straw and get offers from nearby verified buyers.",
      },
    ],
  }),
  component: PostStrawPage,
});
