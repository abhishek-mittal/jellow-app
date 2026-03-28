/**
 * Auth flow assembly tests.
 *
 * Verifies that all four auth molecule screens compose correctly as a
 * navigable flow — correct navigation links, consistent atoms, and
 * no per-screen style drift.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SignInScreen } from "@/components/auth/sign-in-screen";
import { SignUpScreen } from "@/components/auth/sign-up-screen";
import { ResetPasswordScreen } from "@/components/auth/reset-password-screen";
import { PasswordSentScreen } from "@/components/auth/password-sent-screen";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

// ─── Navigation chain: sign-in → sign-up ────────────────────────────────────

describe("Auth flow navigation — sign-in → sign-up", () => {
  it("sign-in screen has a link to /auth/sign-up", () => {
    render(<SignInScreen />);
    expect(screen.getByRole("link", { name: "Sign Up." })).toHaveAttribute(
      "href",
      "/auth/sign-up"
    );
  });

  it("sign-up screen has a link back to /auth/sign-in", () => {
    render(<SignUpScreen />);
    expect(screen.getByRole("link", { name: "Sign In." })).toHaveAttribute(
      "href",
      "/auth/sign-in"
    );
  });
});

// ─── Navigation chain: sign-in → reset-password → password-sent ─────────────

describe("Auth flow navigation — sign-in → reset-password → password-sent", () => {
  it("sign-in screen has a link to /auth/reset-password", () => {
    render(<SignInScreen />);
    expect(screen.getByRole("link", { name: "Forgot Password" })).toHaveAttribute(
      "href",
      "/auth/reset-password"
    );
  });

  it("reset-password screen navigates to /auth/password-sent after selecting a method and pressing CTA", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordScreen />);

    const emailCardBtn = screen.getByText("Send via Email").closest("button");
    expect(emailCardBtn).not.toBeNull();
    await user.click(emailCardBtn!);

    const cta = screen.getByRole("button", { name: /reset password/i });
    await user.click(cta);

    expect(mockPush).toHaveBeenCalledWith("/auth/password-sent");
  });

  it("password-sent screen dismiss button navigates to /auth/sign-in", async () => {
    const user = userEvent.setup();
    render(<PasswordSentScreen maskedEmail="**221b@gmail.com" />);

    const dismissBtn = screen.getByRole("button", { name: /dismiss/i });
    await user.click(dismissBtn);

    expect(mockPush).toHaveBeenCalledWith("/auth/sign-in");
  });

  it("reset-password back button navigates to /auth/sign-in", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordScreen />);

    const backBtn = screen.getByRole("button", { name: /go back/i });
    await user.click(backBtn);

    expect(mockPush).toHaveBeenCalledWith("/auth/sign-in");
  });
});

// ─── Cross-screen atom consistency ──────────────────────────────────────────

describe("Cross-screen atom consistency", () => {
  it("sign-in screen renders AuthShell (white bg, flex-col layout)", () => {
    const { container } = render(<SignInScreen />);
    const shell = container.firstChild as HTMLElement;
    expect(shell.className).toContain("flex");
    expect(shell.className).toContain("flex-col");
    expect(shell.className).toContain("min-h-screen");
  });

  it("sign-up screen renders AuthShell (white bg, flex-col layout)", () => {
    const { container } = render(<SignUpScreen />);
    const shell = container.firstChild as HTMLElement;
    expect(shell.className).toContain("flex");
    expect(shell.className).toContain("flex-col");
    expect(shell.className).toContain("min-h-screen");
  });

  it("reset-password screen renders AuthShell (white bg, flex-col layout)", () => {
    const { container } = render(<ResetPasswordScreen />);
    const shell = container.firstChild as HTMLElement;
    expect(shell.className).toContain("flex");
    expect(shell.className).toContain("flex-col");
    expect(shell.className).toContain("min-h-screen");
  });

  it("password-sent screen renders AuthShell (white bg, flex-col layout)", () => {
    const { container } = render(<PasswordSentScreen />);
    const shell = container.firstChild as HTMLElement;
    expect(shell.className).toContain("flex");
    expect(shell.className).toContain("flex-col");
    expect(shell.className).toContain("min-h-screen");
  });
});

// ─── Each screen renders its page title ─────────────────────────────────────

describe("Screen titles — consistent h1 headings", () => {
  it("sign-in screen renders 'Sign In To Jellow'", () => {
    render(<SignInScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Sign In To Jellow");
  });

  it("sign-up screen renders 'Sign Up For Free'", () => {
    render(<SignUpScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Sign Up For Free");
  });

  it("reset-password screen renders 'Reset Password'", () => {
    render(<ResetPasswordScreen />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Reset Password");
  });

  it("password-sent screen renders the confirmation text", () => {
    render(<PasswordSentScreen maskedEmail="**221b@gmail.com" />);
    expect(screen.getByText("Check your inbox")).toBeInTheDocument();
  });
});

// ─── No bottom nav rendered in any auth screen ──────────────────────────────

describe("Auth screens — no bottom navigation bar", () => {
  it("sign-in screen does not render a bottom navigation element", () => {
    render(<SignInScreen />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("sign-up screen does not render a bottom navigation element", () => {
    render(<SignUpScreen />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("reset-password screen does not render a bottom navigation element", () => {
    render(<ResetPasswordScreen />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("password-sent screen does not render a bottom navigation element", () => {
    render(<PasswordSentScreen />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});

// ─── PasswordSentScreen — maskedEmail prop ───────────────────────────────────

describe("PasswordSentScreen — masked email display", () => {
  it("renders the masked email passed via prop", () => {
    render(<PasswordSentScreen maskedEmail="**221b@gmail.com" />);
    expect(screen.getByText("**221b@gmail.com")).toBeInTheDocument();
  });

  it("falls back to **@example.com when maskedEmail is omitted", () => {
    render(<PasswordSentScreen />);
    expect(screen.getByText("**@example.com")).toBeInTheDocument();
  });
});
