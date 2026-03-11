import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BottomNav } from "@/components/ui/bottom-nav";

describe("BottomNav", () => {
  it("renders all 4 tabs", () => {
    render(<BottomNav activeTab="home" onTabChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Scan" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rewards" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
  });

  it("marks active tab with aria-current", () => {
    render(<BottomNav activeTab="home" onTabChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      screen.getByRole("button", { name: "Scan" })
    ).not.toHaveAttribute("aria-current");
  });

  it("marks scan tab as active when activeTab is scan", () => {
    render(<BottomNav activeTab="scan" onTabChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Scan" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("calls onTabChange with correct tab when clicking home", async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<BottomNav activeTab="scan" onTabChange={onTabChange} />);
    await user.click(screen.getByRole("button", { name: "Home" }));
    expect(onTabChange).toHaveBeenCalledWith("home");
  });

  it("calls onTabChange with rewards when clicking rewards tab", async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<BottomNav activeTab="home" onTabChange={onTabChange} />);
    await user.click(screen.getByRole("button", { name: "Rewards" }));
    expect(onTabChange).toHaveBeenCalledWith("rewards");
  });

  it("calls onTabChange with profile when clicking profile tab", async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<BottomNav activeTab="home" onTabChange={onTabChange} />);
    await user.click(screen.getByRole("button", { name: "Profile" }));
    expect(onTabChange).toHaveBeenCalledWith("profile");
  });

  it("renders as nav landmark", () => {
    render(<BottomNav activeTab="home" onTabChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("all tab buttons have accessible names", () => {
    render(<BottomNav activeTab="home" onTabChange={vi.fn()} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-label");
    });
  });

  it("all tab buttons meet 44pt touch target", () => {
    render(<BottomNav activeTab="home" onTabChange={vi.fn()} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      const cls = btn.className;
      // Each button should have min-h-[44px] or min-h-[56px] (scan button) for touch target
      const hasTouchTarget =
        cls.includes("min-h-[44px]") || cls.includes("min-h-[56px]");
      expect(hasTouchTarget).toBe(true);
    });
  });

  it("applies fixed positioning", () => {
    render(<BottomNav activeTab="home" onTabChange={vi.fn()} />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("fixed");
    expect(nav.className).toContain("bottom-0");
  });

  it("accepts additional className", () => {
    render(
      <BottomNav activeTab="home" onTabChange={vi.fn()} className="custom-nav" />
    );
    expect(screen.getByRole("navigation").className).toContain("custom-nav");
  });
});
