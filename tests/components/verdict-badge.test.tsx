import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VerdictBadge } from "@/components/ui/verdict-badge";

describe("VerdictBadge", () => {
  it("renders good verdict with correct emoji and label", () => {
    render(<VerdictBadge verdict="good" />);
    expect(screen.getByText("🟢")).toBeInTheDocument();
    expect(screen.getByText("Good for You")).toBeInTheDocument();
  });

  it("renders moderate verdict with correct emoji and label", () => {
    render(<VerdictBadge verdict="moderate" />);
    expect(screen.getByText("🟡")).toBeInTheDocument();
    expect(screen.getByText("Moderate")).toBeInTheDocument();
  });

  it("renders bad verdict with correct emoji and label", () => {
    render(<VerdictBadge verdict="bad" />);
    expect(screen.getByText("🔴")).toBeInTheDocument();
    expect(screen.getByText("Bad for You")).toBeInTheDocument();
  });

  it("shows score when provided", () => {
    render(<VerdictBadge verdict="good" score={7.5} />);
    expect(screen.getByText("7.5/10")).toBeInTheDocument();
  });

  it("does not show score when not provided", () => {
    render(<VerdictBadge verdict="good" />);
    expect(screen.queryByText(/\/10/)).not.toBeInTheDocument();
  });

  it("hides label when showLabel is false", () => {
    render(<VerdictBadge verdict="good" showLabel={false} />);
    expect(screen.queryByText("Good for You")).not.toBeInTheDocument();
    expect(screen.getByText("🟢")).toBeInTheDocument();
  });

  it("applies small size by default", () => {
    render(<VerdictBadge verdict="good" />);
    const badge = screen.getByText("Good for You").closest("span[class]");
    expect(badge?.className).toContain("text-xs");
  });

  it("applies large size styles", () => {
    render(<VerdictBadge verdict="good" size="lg" />);
    const badge = screen.getByText("Good for You").closest("span[class]");
    expect(badge?.className).toContain("text-base");
  });

  it("has pill shape (full-rounded)", () => {
    render(<VerdictBadge verdict="good" />);
    const badge = screen.getByText("Good for You").closest("span[class]");
    expect(badge?.className).toContain("rounded-[var(--radius-full)]");
  });

  it("has soft shadow", () => {
    render(<VerdictBadge verdict="good" />);
    const badge = screen.getByText("Good for You").closest("span[class]");
    expect(badge?.className).toContain("shadow-[var(--shadow-soft)]");
  });

  it("applies good (green) color styles", () => {
    render(<VerdictBadge verdict="good" />);
    const badge = screen.getByText("Good for You").closest("span[class]");
    expect(badge?.className).toContain("text-[var(--verdict-excellent)]");
  });

  it("applies bad (red) color styles", () => {
    render(<VerdictBadge verdict="bad" />);
    const badge = screen.getByText("Bad for You").closest("span[class]");
    expect(badge?.className).toContain("text-[var(--verdict-avoid)]");
  });

  it("accepts additional className", () => {
    render(<VerdictBadge verdict="good" className="mt-2" />);
    const badge = screen.getByText("Good for You").closest("span[class]");
    expect(badge?.className).toContain("mt-2");
  });
});
