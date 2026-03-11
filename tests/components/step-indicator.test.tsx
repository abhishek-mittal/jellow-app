import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { StepIndicator } from "@/components/onboarding/step-indicator";

/**
 * StepIndicator unit tests.
 * Uses renderToStaticMarkup (react-dom/server) — no DOM required.
 */
describe("StepIndicator", () => {
  describe("dots variant (default)", () => {
    it("renders the correct number of buttons (one per step)", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 4, currentStep: 0 }),
      );
      const buttons = html.match(/<button/g) ?? [];
      expect(buttons).toHaveLength(4);
    });

    it("applies the accent colour class to the active dot", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 1 }),
      );
      // Active step should reference the jellow-yellow token
      expect(html).toContain("jellow-yellow");
    });

    it("marks the active button with aria-current='step'", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 2 }),
      );
      expect(html).toContain('aria-current="step"');
    });

    it("active dot is larger (h-3 w-3) and inactive dots are smaller (h-2 w-2)", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 0 }),
      );
      expect(html).toContain("h-3 w-3");
      expect(html).toContain("h-2 w-2");
    });

    it("sets correct aria-valuenow / aria-valuemax on the container", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 5, currentStep: 2 }),
      );
      expect(html).toContain('aria-valuenow="3"');
      expect(html).toContain('aria-valuemax="5"');
    });
  });

  describe("numbered variant", () => {
    it("renders the step numbers as text", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 0, variant: "numbered" }),
      );
      expect(html).toContain(">1<");
      expect(html).toContain(">2<");
      expect(html).toContain(">3<");
    });

    it("highlights the active step with the accent colour", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 1, variant: "numbered" }),
      );
      expect(html).toContain("jellow-yellow");
    });

    it("marks completed steps with the mint colour", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 2, variant: "numbered" }),
      );
      expect(html).toContain("candy-mint");
    });
  });

  describe("showConnector prop", () => {
    it("renders connector divs when showConnector=true", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 1, showConnector: true }),
      );
      // Two connectors for 3 steps (between 1-2 and 2-3)
      const connectors = html.match(/h-0\.5/g) ?? [];
      expect(connectors.length).toBeGreaterThanOrEqual(2);
    });

    it("does NOT render connector divs when showConnector=false (default)", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 1 }),
      );
      expect(html).not.toContain("h-0.5");
    });

    it("fills connectors for completed steps", () => {
      // Step 2 active → step 0 connector should be filled (jellow-yellow)
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 2, showConnector: true }),
      );
      expect(html).toContain("jellow-yellow");
    });
  });

  describe("onStepClick prop", () => {
    it("buttons are not interactive when onStepClick is omitted", () => {
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 0 }),
      );
      expect(html).toContain("pointer-events-none");
    });

    it("buttons are interactive when onStepClick is provided", () => {
      const handler = vi.fn();
      const html = renderToStaticMarkup(
        StepIndicator({ totalSteps: 3, currentStep: 0, onStepClick: handler }),
      );
      expect(html).not.toContain("pointer-events-none");
      expect(html).toContain("cursor-pointer");
    });
  });
});
