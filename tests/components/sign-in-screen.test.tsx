import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SignInScreen } from "@/components/auth/sign-in-screen";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Default fetch mock — successful sign-in
const mockFetch = vi.fn();

beforeEach(() => {
  mockPush.mockClear();
  mockFetch.mockClear();
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ user: { email: "test@example.com" } }),
  });
  vi.stubGlobal("fetch", mockFetch);
});

describe("SignInScreen", () => {
  it("renders the page title", () => {
    render(<SignInScreen />);
    expect(screen.getByText("Sign In To Jellow")).toBeInTheDocument();
  });

  it("renders email and password fields", () => {
    render(<SignInScreen />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("renders the Sign In CTA button", () => {
    render(<SignInScreen />);
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("renders three social login buttons", () => {
    render(<SignInScreen />);
    expect(screen.getByRole("button", { name: "Sign in with Instagram" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with Facebook" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with LinkedIn" })).toBeInTheDocument();
  });

  it("renders Sign Up link pointing to /auth/sign-up", () => {
    render(<SignInScreen />);
    const signUpLink = screen.getByRole("link", { name: "Sign Up." });
    expect(signUpLink).toHaveAttribute("href", "/auth/sign-up");
  });

  it("renders Forgot Password link pointing to /auth/reset-password", () => {
    render(<SignInScreen />);
    const forgotLink = screen.getByRole("link", { name: "Forgot Password" });
    expect(forgotLink).toHaveAttribute("href", "/auth/reset-password");
  });

  it("shows email error when email is empty on submit", async () => {
    const user = userEvent.setup();
    render(<SignInScreen />);
    const ctaBtn = screen.getByRole("button", { name: "Sign In" });
    await user.click(ctaBtn);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("shows password error when password is empty on submit", async () => {
    const user = userEvent.setup();
    render(<SignInScreen />);

    // Fill email so only password validation fires
    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "test@example.com");

    const ctaBtn = screen.getByRole("button", { name: "Sign In" });
    await user.click(ctaBtn);
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("navigates to /home on successful submit", async () => {
    const user = userEvent.setup();
    render(<SignInScreen />);

    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "test@example.com");

    const passwordInput = document.querySelector("input[type='password']") as HTMLInputElement;
    await user.type(passwordInput, "secret123");

    const ctaBtn = screen.getByRole("button", { name: "Sign In" });
    await user.click(ctaBtn);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/home");
    });
  });

  it("clears email error when a valid email is entered after failed validation", async () => {
    const user = userEvent.setup();
    render(<SignInScreen />);

    // Trigger validation errors first
    const ctaBtn = screen.getByRole("button", { name: "Sign In" });
    await user.click(ctaBtn);
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    // Type a valid email
    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "test@example.com");

    // Submit again — email error should be gone, password error present
    await user.click(ctaBtn);
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("shows API error message on invalid credentials", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid email or password" }),
    });

    const user = userEvent.setup();
    render(<SignInScreen />);

    const emailInput = screen.getByPlaceholderText("you@example.com");
    await user.type(emailInput, "wrong@example.com");

    const passwordInput = document.querySelector("input[type='password']") as HTMLInputElement;
    await user.type(passwordInput, "wrongpass");

    const ctaBtn = screen.getByRole("button", { name: "Sign In" });
    await user.click(ctaBtn);

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
