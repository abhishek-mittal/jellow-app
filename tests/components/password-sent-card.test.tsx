import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { render } from "@testing-library/react";
import { createElement } from "react";
import { PasswordSentCard } from "@/components/auth/password-sent-card";

describe("PasswordSentCard", () => {
  describe("content rendering", () => {
    it("renders the masked email address", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, { maskedEmail: "j***@example.com" })
      );
      expect(html).toContain("j***@example.com");
    });

    it("renders the confirmation heading", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, { maskedEmail: "u***@test.io" })
      );
      expect(html).toContain("Check your inbox");
    });

    it("renders the body copy", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, { maskedEmail: "u***@test.io" })
      );
      expect(html).toContain("password reset link");
    });

    it("renders the success icon (svg element)", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, { maskedEmail: "u***@test.io" })
      );
      expect(html).toContain("<svg");
    });

    it("renders with a different masked email value", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, { maskedEmail: "a**@domain.org" })
      );
      expect(html).toContain("a**@domain.org");
    });
  });

  describe("action slot", () => {
    it("renders the action slot when provided", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, {
          maskedEmail: "j***@example.com",
          action: createElement("button", { type: "button" }, "Resend email"),
        })
      );
      expect(html).toContain("Resend email");
    });

    it("does not render the action wrapper when action is not provided", () => {
      const { container } = render(
        createElement(PasswordSentCard, { maskedEmail: "j***@example.com" })
      );
      // The action slot wrapper has class "mt-5" and should be absent
      expect(container.querySelector(".mt-5")).toBeNull();
    });

    it("renders a custom action ReactNode", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, {
          maskedEmail: "j***@example.com",
          action: createElement(
            "a",
            { href: "/auth/sign-in" },
            "Back to sign in"
          ),
        })
      );
      expect(html).toContain("Back to sign in");
    });
  });

  describe("className prop", () => {
    it("applies extra className to the root element", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, {
          maskedEmail: "j***@example.com",
          className: "custom-success-card",
        })
      );
      expect(html).toContain("custom-success-card");
    });
  });

  describe("success icon styling", () => {
    it("contains the green icon container class", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, { maskedEmail: "j***@example.com" })
      );
      expect(html).toContain("bg-green-100");
    });

    it("contains the green icon colour class", () => {
      const html = renderToStaticMarkup(
        createElement(PasswordSentCard, { maskedEmail: "j***@example.com" })
      );
      expect(html).toContain("text-green-600");
    });
  });
});
