import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FoodCard } from "@/components/ui/food-card";
import type { FoodItem } from "@/components/ui/food-card";

const mockFood: FoodItem = {
  id: "p1",
  name: "Greek Yogurt",
  brand: "Organic Valley",
  verdict: "good",
};

const mockFoodWithImage: FoodItem = {
  ...mockFood,
  imageUrl: "https://example.com/yogurt.jpg",
};

describe("FoodCard", () => {
  it("renders food name", () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText("Greek Yogurt")).toBeInTheDocument();
  });

  it("renders food brand", () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText("Organic Valley")).toBeInTheDocument();
  });

  it("renders verdict badge", () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText("Good for You")).toBeInTheDocument();
  });

  it("renders moderate verdict badge", () => {
    render(<FoodCard food={{ ...mockFood, verdict: "moderate" }} />);
    expect(screen.getByText("Moderate")).toBeInTheDocument();
  });

  it("renders bad verdict badge", () => {
    render(<FoodCard food={{ ...mockFood, verdict: "bad" }} />);
    expect(screen.getByText("Bad for You")).toBeInTheDocument();
  });

  it("renders fallback placeholder when no imageUrl", () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText("🥗")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    render(<FoodCard food={mockFoodWithImage} />);
    const img = screen.getByAltText("Greek Yogurt");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/yogurt.jpg");
  });

  it("calls onTap with food id when clicked", async () => {
    const user = userEvent.setup();
    const onTap = vi.fn();
    render(<FoodCard food={mockFood} onTap={onTap} />);
    const card = screen.getByRole("button");
    await user.click(card);
    expect(onTap).toHaveBeenCalledWith("p1");
  });

  it("does not render as button when no onTap", () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("has accessible label when onTap is provided", () => {
    render(<FoodCard food={mockFood} onTap={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "View details for Greek Yogurt" })
    ).toBeInTheDocument();
  });

  it("has rounded corners", () => {
    const { container } = render(<FoodCard food={mockFood} />);
    const card = container.firstChild as HTMLElement;
    expect(card?.className).toContain("rounded-[var(--radius-lg)]");
  });

  it("has shadow", () => {
    const { container } = render(<FoodCard food={mockFood} />);
    const card = container.firstChild as HTMLElement;
    expect(card?.className).toContain("shadow-[var(--shadow-soft)]");
  });

  it("triggers onTap with Enter key", async () => {
    const user = userEvent.setup();
    const onTap = vi.fn();
    render(<FoodCard food={mockFood} onTap={onTap} />);
    const card = screen.getByRole("button");
    card.focus();
    await user.keyboard("{Enter}");
    expect(onTap).toHaveBeenCalledWith("p1");
  });

  it("accepts additional className", () => {
    const { container } = render(<FoodCard food={mockFood} className="custom-card" />);
    const card = container.firstChild as HTMLElement;
    expect(card?.className).toContain("custom-card");
  });
});
