import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { BadgeCard } from "@/components/rewards/badge-card";

describe("BadgeCard", () => {
  describe("earned state", () => {
    it("renders the badge name", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "First Scan",
          icon: "🌟",
          earned: true,
          unlockCriteria: "Complete your first scan",
        })
      );
      expect(html).toContain("First Scan");
    });

    it("shows earned date when provided", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Veggie Lover",
          icon: "🥗",
          earned: true,
          earnedDate: "Mar 1, 2026",
          unlockCriteria: "Log 5 veggie items",
        })
      );
      expect(html).toContain("Mar 1, 2026");
    });

    it("does not show lock icon when earned", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Protein Pro",
          icon: "👍",
          earned: true,
          unlockCriteria: "Log 10 protein items",
        })
      );
      expect(html).not.toContain("🔒");
    });

    it("does not show progress bar when earned", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Protein Pro",
          icon: "👍",
          earned: true,
          unlockCriteria: "Log 10 protein items",
          progress: 80,
        })
      );
      // No "to unlock" text when earned
      expect(html).not.toContain("to unlock");
    });

    it("renders the unlock criteria", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "First Scan",
          icon: "🌟",
          earned: true,
          unlockCriteria: "Complete your first scan",
        })
      );
      expect(html).toContain("Complete your first scan");
    });
  });

  describe("locked state", () => {
    it("renders the badge name in locked state", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Sugar Slayer",
          icon: "🚫",
          earned: false,
          unlockCriteria: "Avoid 5 high-sugar items",
        })
      );
      expect(html).toContain("Sugar Slayer");
    });

    it("shows lock icon when not earned", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Sugar Slayer",
          icon: "🚫",
          earned: false,
          unlockCriteria: "Avoid 5 high-sugar items",
        })
      );
      expect(html).toContain("🔒");
    });

    it("shows progress percentage when progress is provided", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Scan 100",
          icon: "📷",
          earned: false,
          unlockCriteria: "Scan 100 products",
          progress: 47,
        })
      );
      expect(html).toContain("47%");
      expect(html).toContain("to unlock");
    });

    it("clamps progress to 0 when negative", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Scan 100",
          icon: "📷",
          earned: false,
          unlockCriteria: "Scan 100 products",
          progress: -10,
        })
      );
      expect(html).toContain("0%");
    });

    it("clamps progress to 100 when over 100", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Scan 100",
          icon: "📷",
          earned: false,
          unlockCriteria: "Scan 100 products",
          progress: 150,
        })
      );
      expect(html).toContain("100%");
    });

    it("does not show progress bar when progress is not provided", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Sugar Slayer",
          icon: "🚫",
          earned: false,
          unlockCriteria: "Avoid 5 high-sugar items",
        })
      );
      expect(html).not.toContain("to unlock");
    });

    it("renders unlock criteria text", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Sugar Slayer",
          icon: "🚫",
          earned: false,
          unlockCriteria: "Avoid 5 high-sugar items",
        })
      );
      expect(html).toContain("Avoid 5 high-sugar items");
    });
  });

  describe("icon rendering", () => {
    it("renders string emoji icon", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Star",
          icon: "⭐",
          earned: true,
          unlockCriteria: "Earn a star",
        })
      );
      expect(html).toContain("⭐");
    });

    it("renders ReactNode icon", () => {
      const html = renderToString(
        createElement(BadgeCard, {
          name: "Star",
          icon: createElement("span", { "data-testid": "custom-icon" }, "★"),
          earned: true,
          unlockCriteria: "Earn a star",
        })
      );
      expect(html).toContain("★");
    });
  });
});
