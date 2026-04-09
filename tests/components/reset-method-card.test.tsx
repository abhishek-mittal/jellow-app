import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { ResetMethodCard } from "@/components/auth/reset-method-card";
import type { ResetMethodVariant } from "@/components/auth/reset-method-card";

describe("ResetMethodCard", () => {
  describe("content rendering", () => {
    it("renders the title", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "email",
          title: "Email address",
          body: "We'll send a link to your inbox",
        })
      );
      expect(html).toContain("Email address");
    });

    it("renders the body text", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "email",
          title: "Email address",
          body: "We'll send a link to your inbox",
        })
      );
      expect(html).toContain("We&#x27;ll send a link to your inbox");
    });

    it("renders as a button element", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "email",
          title: "Email address",
          body: "Body text",
        })
      );
      expect(html).toContain("<button");
      expect(html).toContain('type="button"');
    });
  });

  describe("icon variants", () => {
    const variants: ResetMethodVariant[] = ["email", "2fa", "google"];

    it.each(variants)('renders without error for variant "%s"', (variant) => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant,
          title: "Reset option",
          body: "Some description",
        })
      );
      expect(html).toContain("Reset option");
    });

    it("applies orange icon background for email variant", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "email",
          title: "Email",
          body: "desc",
        })
      );
      expect(html).toContain("bg-[#FF6B00]");
    });

    it("applies blue icon background for 2fa variant", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "2fa",
          title: "Authenticator app",
          body: "desc",
        })
      );
      expect(html).toContain("bg-[#3B82F6]");
    });

    it("applies purple icon background for google variant", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "google",
          title: "Google account",
          body: "desc",
        })
      );
      expect(html).toContain("bg-[#9333EA]");
    });

    it("renders the Google SVG for google variant", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "google",
          title: "Google account",
          body: "desc",
        })
      );
      // Google icon uses white fill on purple background
      expect(html).toContain("fill=\"white\"");
    });
  });

  describe("chevron", () => {
    it("always renders a chevron", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "email",
          title: "Email",
          body: "desc",
        })
      );
      // ChevronRight from lucide-react renders an svg with a polyline
      expect(html).toContain("<svg");
    });
  });

  describe("onClick callback", () => {
    it("does not throw when onClick is undefined", () => {
      expect(() =>
        renderToStaticMarkup(
          createElement(ResetMethodCard, {
            variant: "email",
            title: "Email",
            body: "desc",
          })
        )
      ).not.toThrow();
    });

    it("calls onClick when the button is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        createElement(ResetMethodCard, {
          variant: "email",
          title: "Email",
          body: "desc",
          onClick: handleClick,
        })
      );
      await user.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("className prop", () => {
    it("applies extra className to the root element", () => {
      const html = renderToStaticMarkup(
        createElement(ResetMethodCard, {
          variant: "email",
          title: "Email",
          body: "desc",
          className: "my-custom-class",
        })
      );
      expect(html).toContain("my-custom-class");
    });
  });
});
