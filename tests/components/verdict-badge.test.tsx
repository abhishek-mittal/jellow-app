import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VerdictBadge } from "@/components/ui/verdict-badge";

describe("VerdictBadge", () => {
  it("renders good verdict with correct icon and label", () => {
    const { container } = render(<VerdictBadge verdict="good" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Good for You")).toBeInTheDocument();
  });

  it("renders moderate verdict with correct icon and label", () => {
    const { container } = render(<VerdictBadge verdict="moderate" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Moderate")).toBeInTheDocument();
  });

  it("renders bad verdict with correct icon and label", () => {
    const { container } = render(<VerdictBadge verdict="bad" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
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
    const { container } = render(<VerdictBadge verdict="good" showLabel={false} />);
    expect(screen.queryByText("Good for You")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies small size by default", () => {
    const { container } = render(<VerdictBadge verdict="good" />);
    const badge = container.querySelector("[class*='animate-scale-in']");
    expect(badge).toBeInTheDocument();
  });

  it("applies large size styles", () => {
    const { container } = render(<VerdictBadge verdict="good" size="lg" />);
    const badge = container.querySelector("[class*='animate-scale-in']");
    expect(badge).toBeInTheDocument();
    expect(badge?.className).toContain("justify-center");
  });

  it("has uppercase tracking-wide styling", () => {
    const { container } = render(<VerdictBadge verdict="good" />);
    const badge = container.querySelector("[class*='animate-scale-in']");
    expect(badge?.className).toContain("uppercase");
    expect(badge?.className).toContain("tracking-wide");
  });

  it("has scale-in animation", () => {
    const { container } = render(<VerdictBadge verdict="good" />);
    const badge = container.querySelector("[class*='animate-scale-in']");
    expect(badge?.className).toContain("animate-scale-in");
  });

  it("renders good verdict with success color", () => {
    const { container } = render(<VerdictBadge verdict="good" />);
    const badge = container.querySelector("[class*='animate-scale-in']");
    expect(badge).toBeInTheDocument();
  });

  it("renders bad verdict with danger color", () => {
    const { container } = render(<VerdictBadge verdict="bad" />);
    const badge = container.querySelector("[class*='animate-scale-in']");
    expect(badge).toBeInTheDocument();
  });

  it("accepts additional className", () => {
    const { container } = render(<VerdictBadge verdict="good" className="mt-2" />);
    const badge = container.querySelector("[class*='animate-scale-in']");
    expect(badge?.className).toContain("mt-2");
  });
});
