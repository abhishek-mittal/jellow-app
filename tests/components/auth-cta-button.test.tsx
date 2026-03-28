import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthCtaButton } from "@/components/auth/auth-cta-button";

describe("AuthCtaButton", () => {
  it("renders children text", () => {
    render(<AuthCtaButton>Sign In</AuthCtaButton>);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders the trailing arrow icon", () => {
    const { container } = render(<AuthCtaButton>Sign In</AuthCtaButton>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick handler when pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<AuthCtaButton onClick={handleClick}>Sign In</AuthCtaButton>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when isDisabled is true", () => {
    render(<AuthCtaButton isDisabled>Sign In</AuthCtaButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("accepts and applies an additional className", () => {
    const { container } = render(
      <AuthCtaButton className="mt-8">Sign In</AuthCtaButton>
    );
    const btn = container.querySelector("button");
    expect(btn?.className).toContain("mt-8");
  });

  it("has the correct base styles", () => {
    const { container } = render(<AuthCtaButton>Sign In</AuthCtaButton>);
    const btn = container.querySelector("button");
    expect(btn?.className).toContain("rounded-[22px]");
    expect(btn?.className).toContain("font-semibold");
  });

  it("renders with submit type", () => {
    render(<AuthCtaButton type="submit">Sign In</AuthCtaButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("renders different label text", () => {
    render(<AuthCtaButton>Create Account</AuthCtaButton>);
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });
});
