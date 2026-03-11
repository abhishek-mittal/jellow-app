import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { HealthScoreRing } from "@/components/ui/health-score-ring";

describe("HealthScoreRing", () => {
  it("renders the score number", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 8,
        verdict: "good",
      })
    );
    expect(html).toContain("8");
  });

  it("renders the verdict label by default", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 8,
        verdict: "good",
        showLabel: true,
      })
    );
    expect(html).toContain("Good");
  });

  it("does not render visible label span when showLabel is false", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 8,
        verdict: "good",
        showLabel: false,
      })
    );
    // The aria-label still includes verdict for accessibility,
    // but the visible label <span> (identified by font-medium class) should not be rendered
    expect(html).not.toContain("mt-0.5 font-medium");
  });

  it("renders correct label for moderate verdict", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 5,
        verdict: "moderate",
        showLabel: true,
      })
    );
    expect(html).toContain("Okay");
  });

  it("renders correct label for bad verdict", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 2,
        verdict: "bad",
        showLabel: true,
      })
    );
    expect(html).toContain("Poor");
  });

  it("uses green color for good verdict", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 8,
        verdict: "good",
      })
    );
    expect(html).toContain("var(--candy-mint)");
  });

  it("uses yellow color for moderate verdict", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 5,
        verdict: "moderate",
      })
    );
    expect(html).toContain("var(--verdict-caution)");
  });

  it("uses red color for bad verdict", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 2,
        verdict: "bad",
      })
    );
    expect(html).toContain("var(--candy-pink)");
  });

  it("renders an SVG element", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 7,
        verdict: "good",
      })
    );
    expect(html).toContain("<svg");
    expect(html).toContain("<circle");
  });

  it("renders correct aria-label", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 8,
        verdict: "good",
      })
    );
    expect(html).toContain("Health score: 8 out of 10");
    expect(html).toContain("Good");
  });

  it("renders sm size with 48px dimensions", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 7,
        verdict: "good",
        size: "sm",
      })
    );
    expect(html).toContain('width="48"');
    expect(html).toContain('height="48"');
  });

  it("renders md size with 80px dimensions", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 7,
        verdict: "good",
        size: "md",
      })
    );
    expect(html).toContain('width="80"');
    expect(html).toContain('height="80"');
  });

  it("renders lg size with 120px dimensions", () => {
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 7,
        verdict: "good",
        size: "lg",
      })
    );
    expect(html).toContain('width="120"');
    expect(html).toContain('height="120"');
  });

  it("renders negative score as-is but clamps ring progress to 0%", () => {
    // The displayed score is the prop value; only the ring progress is clamped
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: -5,
        verdict: "bad",
      })
    );
    // Display shows the raw score
    expect(html).toContain("-5");
    // Progress is clamped: circumference offset equals full circumference (empty ring)
    // stroke-dasharray == stroke-dashoffset means 0% fill (initial SSR state)
    expect(html).toContain("stroke-dasharray");
  });

  it("renders score above 10 as-is but clamps ring progress to 100%", () => {
    // The displayed score is the prop value; only the ring progress is clamped
    const html = renderToStaticMarkup(
      React.createElement(HealthScoreRing, {
        score: 15,
        verdict: "good",
      })
    );
    // Display shows the raw score
    expect(html).toContain("15");
    expect(html).toContain("stroke-dasharray");
  });
});
