import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthLink } from "@/components/auth/auth-link";

describe("AuthLink", () => {
  it("renders the link text", () => {
    render(<AuthLink href="/auth/sign-up">Sign Up.</AuthLink>);
    expect(screen.getByText("Sign Up.")).toBeInTheDocument();
  });

  it("has the correct href", () => {
    render(<AuthLink href="/auth/sign-up">Sign Up.</AuthLink>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/auth/sign-up");
  });

  it("has the orange brand colour class", () => {
    render(<AuthLink href="/auth/sign-up">Sign Up.</AuthLink>);
    const link = screen.getByRole("link");
    expect(link.className).toContain("text-[#ff6b00]");
  });

  it("has font-semibold style", () => {
    render(<AuthLink href="/auth/sign-up">Sign Up.</AuthLink>);
    const link = screen.getByRole("link");
    expect(link.className).toContain("font-semibold");
  });

  it("has hover:underline style", () => {
    render(<AuthLink href="/auth/sign-up">Sign Up.</AuthLink>);
    const link = screen.getByRole("link");
    expect(link.className).toContain("hover:underline");
  });

  it("accepts and applies an additional className", () => {
    render(<AuthLink href="/auth/sign-up" className="ml-1">Sign Up.</AuthLink>);
    const link = screen.getByRole("link");
    expect(link.className).toContain("ml-1");
  });

  it("renders with a different href and label", () => {
    render(<AuthLink href="/auth/forgot-password">Forgot Password</AuthLink>);
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/auth/forgot-password");
  });
});
