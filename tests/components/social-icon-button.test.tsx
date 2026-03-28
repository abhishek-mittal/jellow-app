import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { SocialIconButton } from "@/components/auth/social-icon-button";

const FakeIcon = () => <svg data-testid="fake-icon" />;

describe("SocialIconButton", () => {
  it("renders the provided icon", () => {
    render(<SocialIconButton icon={<FakeIcon />} label="Sign in with Instagram" />);
    expect(screen.getByTestId("fake-icon")).toBeInTheDocument();
  });

  it("has the correct aria-label", () => {
    render(<SocialIconButton icon={<FakeIcon />} label="Sign in with Facebook" />);
    expect(screen.getByRole("button", { name: "Sign in with Facebook" })).toBeInTheDocument();
  });

  it("calls onClick handler when pressed", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <SocialIconButton icon={<FakeIcon />} label="Sign in with LinkedIn" onClick={handleClick} />
    );
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("accepts and applies an additional className", () => {
    const { container } = render(
      <SocialIconButton icon={<FakeIcon />} label="Sign in with Instagram" className="shadow-md" />
    );
    const btn = container.querySelector("button");
    expect(btn?.className).toContain("shadow-md");
  });

  it("has the correct base size and shape styles", () => {
    const { container } = render(
      <SocialIconButton icon={<FakeIcon />} label="Sign in with Instagram" />
    );
    const btn = container.querySelector("button");
    expect(btn?.className).toContain("rounded-[20px]");
    expect(btn?.className).toContain("bg-white");
  });

  it("is accessible as a button role", () => {
    render(<SocialIconButton icon={<FakeIcon />} label="Sign in with Instagram" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
