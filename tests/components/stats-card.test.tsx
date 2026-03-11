import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { StatsCard } from "@/components/ui/stats-card";

describe("StatsCard", () => {
  it("renders the label and value", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Total Scans",
        value: 47,
        icon: React.createElement("span", null, "📷"),
      })
    );
    expect(html).toContain("Total Scans");
    expect(html).toContain("47");
  });

  it("renders a string value", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Healthy Choices",
        value: "67%",
        icon: React.createElement("span", null, "💚"),
      })
    );
    expect(html).toContain("67%");
    expect(html).toContain("Healthy Choices");
  });

  it("renders the icon content", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Streak",
        value: 5,
        icon: React.createElement("span", { "data-testid": "icon" }, "🔥"),
      })
    );
    expect(html).toContain("🔥");
  });

  it("renders the trend indicator when trend and trendValue are provided", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Day Streak",
        value: 5,
        icon: React.createElement("span", null, "🔥"),
        trend: "up",
        trendValue: "+2 days",
      })
    );
    expect(html).toContain("+2 days");
    expect(html).toContain("↑");
  });

  it("renders down trend arrow in red class", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Score",
        value: 3,
        icon: React.createElement("span", null, "📉"),
        trend: "down",
        trendValue: "-1",
      })
    );
    expect(html).toContain("↓");
    expect(html).toContain("-1");
    expect(html).toContain("var(--candy-pink)");
  });

  it("renders flat trend arrow in gray class", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Choices",
        value: "50%",
        icon: React.createElement("span", null, "💚"),
        trend: "flat",
        trendValue: "no change",
      })
    );
    expect(html).toContain("→");
    expect(html).toContain("no change");
    expect(html).toContain("var(--gray-500)");
  });

  it("does not render trend indicator when trendValue is missing", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Badges",
        value: 4,
        icon: React.createElement("span", null, "⭐"),
        trend: "up",
      })
    );
    expect(html).not.toContain("↑");
  });

  it("does not render trend indicator when trend is missing", () => {
    const html = renderToStaticMarkup(
      React.createElement(StatsCard, {
        label: "Badges",
        value: 4,
        icon: React.createElement("span", null, "⭐"),
        trendValue: "+1",
      })
    );
    expect(html).not.toContain("+1");
  });
});
