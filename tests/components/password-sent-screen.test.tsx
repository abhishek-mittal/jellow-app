import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { PasswordSentScreen } from "@/components/auth/password-sent-screen";

// ── next/navigation mock ────────────────────────────────────────────────────
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// ── helpers ─────────────────────────────────────────────────────────────────

function make(props: Partial<React.ComponentProps<typeof PasswordSentScreen>> = {}) {
  return React.createElement(PasswordSentScreen, props);
}

// ── rendering ────────────────────────────────────────────────────────────────

describe("PasswordSentScreen — rendering", () => {
  it("renders the masked email", () => {
    const html = renderToStaticMarkup(make({ maskedEmail: "**221b@gmail.com" }));
    expect(html).toContain("**221b@gmail.com");
  });

  it("falls back to **@example.com when no email is provided", () => {
    const html = renderToStaticMarkup(make());
    expect(html).toContain("**@example.com");
  });

  it("renders the Re-Send Password button", () => {
    const html = renderToStaticMarkup(make({ maskedEmail: "**@x.io" }));
    expect(html).toContain("Re-Send Password");
  });

  it("renders the dismiss button with aria-label", () => {
    const html = renderToStaticMarkup(make({ maskedEmail: "**@x.io" }));
    expect(html).toContain('aria-label="Dismiss"');
  });

  it("applies extra className to the root element", () => {
    const html = renderToStaticMarkup(make({ className: "custom-screen" }));
    expect(html).toContain("custom-screen");
  });

  it("renders the hero background when heroImageSrc is provided", () => {
    const html = renderToStaticMarkup(
      make({ heroImageSrc: "/hero.jpg", maskedEmail: "**@x.io" })
    );
    expect(html).toContain("/hero.jpg");
  });

  it("renders the dark overlay layer", () => {
    const html = renderToStaticMarkup(make());
    expect(html).toContain("bg-black/40");
  });
});

// ── dismiss navigation ────────────────────────────────────────────────────────

describe("PasswordSentScreen — dismiss button", () => {
  it("navigates to /auth/sign-in when dismiss is clicked", () => {
    mockPush.mockClear();
    const { getByLabelText } = render(make({ maskedEmail: "**@x.io" }));
    fireEvent.click(getByLabelText("Dismiss"));
    expect(mockPush).toHaveBeenCalledWith("/auth/sign-in");
  });
});

// ── resend handler ────────────────────────────────────────────────────────────

describe("PasswordSentScreen — resend button", () => {
  it("calls onResend when Re-Send Password is clicked", async () => {
    const onResend = vi.fn().mockResolvedValue(undefined);
    const { getByText } = render(make({ maskedEmail: "**@x.io", onResend }));
    fireEvent.click(getByText("Re-Send Password"));
    await waitFor(() => expect(onResend).toHaveBeenCalledTimes(1));
  });

  it("does not throw if onResend is not provided", () => {
    const { getByText } = render(make({ maskedEmail: "**@x.io" }));
    expect(() => fireEvent.click(getByText("Re-Send Password"))).not.toThrow();
  });
});
