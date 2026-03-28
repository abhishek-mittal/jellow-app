import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpScreen } from "@/components/auth/sign-up-screen";

// Helper: fill all three fields
async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  email: string,
  password: string,
  confirm: string
) {
  await user.type(screen.getByRole("textbox", { name: "Email Address" }), email);
  // Password inputs are type=password; grab the two hidden inputs
  const passwordInputs = document.querySelectorAll<HTMLInputElement>('input[type="password"]');
  if (passwordInputs[0]) await user.type(passwordInputs[0], password);
  if (passwordInputs[1]) await user.type(passwordInputs[1], confirm);
}

describe("SignUpScreen", () => {
  it("renders the page title", () => {
    render(<SignUpScreen />);
    expect(screen.getByText("Sign Up For Free")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<SignUpScreen />);
    expect(screen.getByText("Quickly make your account in 1 minute")).toBeInTheDocument();
  });

  it("renders the Email Address label", () => {
    render(<SignUpScreen />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("renders the Password label", () => {
    render(<SignUpScreen />);
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("renders the Confirm Password label", () => {
    render(<SignUpScreen />);
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
  });

  it("renders the Sign Up button", () => {
    render(<SignUpScreen />);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("renders the sign-in footer link", () => {
    render(<SignUpScreen />);
    expect(screen.getByText("Sign In.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign In." })).toHaveAttribute(
      "href",
      "/auth/sign-in"
    );
  });

  it("renders the 'Already have an account?' footer text", () => {
    render(<SignUpScreen />);
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it("CTA is disabled when all fields are empty", () => {
    render(<SignUpScreen />);
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });

  it("CTA is disabled when passwords do not match", async () => {
    const user = userEvent.setup();
    render(<SignUpScreen />);
    await fillForm(user, "a@b.com", "pass123", "different");
    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });

  it("CTA is enabled when all fields are filled and passwords match", async () => {
    const user = userEvent.setup();
    render(<SignUpScreen />);
    await fillForm(user, "a@b.com", "pass123", "pass123");
    expect(screen.getByRole("button", { name: /sign up/i })).not.toBeDisabled();
  });

  it("shows password mismatch error on confirm-password blur", async () => {
    const user = userEvent.setup();
    render(<SignUpScreen />);
    const passwordInputs = document.querySelectorAll<HTMLInputElement>('input[type="password"]');
    if (passwordInputs[0]) await user.type(passwordInputs[0], "pass123");
    if (passwordInputs[1]) await user.type(passwordInputs[1], "different");
    if (passwordInputs[1]) await user.tab(); // trigger blur
    expect(screen.getByText("ERROR: Password Don't Match!")).toBeInTheDocument();
  });

  it("clears mismatch error when passwords are made to match", async () => {
    const user = userEvent.setup();
    render(<SignUpScreen />);
    const passwordInputs = document.querySelectorAll<HTMLInputElement>('input[type="password"]');
    if (passwordInputs[0]) await user.type(passwordInputs[0], "pass123");
    if (passwordInputs[1]) await user.type(passwordInputs[1], "different");
    if (passwordInputs[1]) await user.tab();
    expect(screen.getByText("ERROR: Password Don't Match!")).toBeInTheDocument();
    // Clear confirm field and retype the correct value
    if (passwordInputs[1]) {
      await user.clear(passwordInputs[1]);
      await user.type(passwordInputs[1], "pass123");
    }
    expect(screen.queryByText("ERROR: Password Don't Match!")).not.toBeInTheDocument();
  });

  it("does not show social login buttons (sign-up has no social row)", () => {
    render(<SignUpScreen />);
    expect(screen.queryByRole("button", { name: /sign in with/i })).not.toBeInTheDocument();
  });

  it("does not show a Forgot Password link", () => {
    render(<SignUpScreen />);
    expect(screen.queryByText(/forgot password/i)).not.toBeInTheDocument();
  });
});
