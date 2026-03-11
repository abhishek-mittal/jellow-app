import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JellyButton } from "@/components/ui/jelly-button";

describe("JellyButton", () => {
  it("renders children", () => {
    render(<JellyButton>Click me</JellyButton>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<JellyButton>Primary</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-[var(--candy-mint)]");
  });

  it("applies secondary variant styles", () => {
    render(<JellyButton variant="secondary">Secondary</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-[var(--gray-100)]");
  });

  it("applies danger variant styles", () => {
    render(<JellyButton variant="danger">Danger</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-[var(--verdict-avoid)]");
  });

  it("applies sm size styles", () => {
    render(<JellyButton size="sm">Small</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("h-8");
  });

  it("applies md size styles", () => {
    render(<JellyButton size="md">Medium</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("h-10");
  });

  it("applies lg size styles", () => {
    render(<JellyButton size="lg">Large</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("h-12");
  });

  it("has min-h-[44px] touch target", () => {
    render(<JellyButton>Touch</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("min-h-[44px]");
  });

  it("has pill shape (full-rounded)", () => {
    render(<JellyButton>Pill</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("rounded-[var(--radius-full)]");
  });

  it("is disabled when disabled prop is true", () => {
    render(<JellyButton disabled>Disabled</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.className).toContain("opacity-50");
  });

  it("is disabled when loading prop is true", () => {
    render(<JellyButton loading>Loading</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
  });

  it("shows loading spinner when loading", () => {
    render(<JellyButton loading>Loading</JellyButton>);
    expect(screen.getByRole("button").querySelector(".animate-spin")).toBeTruthy();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<JellyButton onClick={onClick}>Click</JellyButton>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <JellyButton disabled onClick={onClick}>
        Disabled
      </JellyButton>
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("accepts additional className", () => {
    render(<JellyButton className="custom-class">Custom</JellyButton>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("custom-class");
  });
});
