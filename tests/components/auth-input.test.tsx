import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AuthInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "@/components/ui/auth-input";

// ─── AuthInput ────────────────────────────────────────────────────────────────

describe("AuthInput", () => {
  it("renders the label", () => {
    render(<AuthInput label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    render(<AuthInput label="Username" placeholder="Enter username" />);
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("uses label as aria-label by default", () => {
    render(<AuthInput label="Username" />);
    expect(screen.getByRole("textbox", { name: "Username" })).toBeInTheDocument();
  });

  it("uses explicit aria-label when provided", () => {
    render(<AuthInput label="Username" aria-label="Custom label" />);
    expect(screen.getByRole("textbox", { name: "Custom label" })).toBeInTheDocument();
  });

  it("renders leading icon", () => {
    render(
      <AuthInput label="Test" leadingIcon={<span data-testid="lead-icon">✉</span>} />
    );
    expect(screen.getByTestId("lead-icon")).toBeInTheDocument();
  });

  it("renders trailing icon when showVisibilityToggle is false", () => {
    render(
      <AuthInput
        label="Test"
        trailingIcon={<span data-testid="trail-icon">📎</span>}
      />
    );
    expect(screen.getByTestId("trail-icon")).toBeInTheDocument();
  });

  it("does NOT render trailing icon when showVisibilityToggle is true", () => {
    render(
      <AuthInput
        label="Test"
        trailingIcon={<span data-testid="trail-icon">📎</span>}
        showVisibilityToggle
      />
    );
    expect(screen.queryByTestId("trail-icon")).not.toBeInTheDocument();
  });

  it("calls onChange when value changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<AuthInput label="Test" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error message when isInvalid is true", () => {
    render(
      <AuthInput label="Test" isInvalid errorMessage="This field is required" />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("does not show error message when isInvalid is false", () => {
    render(
      <AuthInput label="Test" isInvalid={false} errorMessage="This field is required" />
    );
    expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
  });

  it("accepts additional className on the outer wrapper", () => {
    const { container } = render(<AuthInput label="Test" className="mt-4" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("mt-4");
  });
});

// ─── Visibility toggle ────────────────────────────────────────────────────────

describe("AuthInput visibility toggle", () => {
  it("renders show-password button when showVisibilityToggle is true", () => {
    render(<AuthInput label="Password" showVisibilityToggle />);
    expect(
      screen.getByRole("button", { name: "show password" })
    ).toBeInTheDocument();
  });

  it("starts with hidden password (type=password)", () => {
    render(<AuthInput label="Password" showVisibilityToggle />);
    // HeroUI renders a real <input> element
    const inputs = document.querySelectorAll("input");
    const passwordInput = Array.from(inputs).find((i) => i.type === "password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("toggles to visible text when eye button is clicked", async () => {
    const user = userEvent.setup();
    render(<AuthInput label="Password" showVisibilityToggle />);
    const toggleBtn = screen.getByRole("button", { name: "show password" });
    await user.click(toggleBtn);
    expect(
      screen.getByRole("button", { name: "hide password" })
    ).toBeInTheDocument();
  });

  it("toggles back to hidden when clicked a second time", async () => {
    const user = userEvent.setup();
    render(<AuthInput label="Password" showVisibilityToggle />);
    const toggle = screen.getByRole("button", { name: "show password" });
    await user.click(toggle);
    await user.click(screen.getByRole("button", { name: "hide password" }));
    expect(
      screen.getByRole("button", { name: "show password" })
    ).toBeInTheDocument();
  });
});

// ─── EmailInput ───────────────────────────────────────────────────────────────

describe("EmailInput", () => {
  it("renders the label", () => {
    render(<EmailInput label="Email Address" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("renders a mail icon (svg)", () => {
    const { container } = render(<EmailInput label="Email" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not render a visibility toggle button", () => {
    render(<EmailInput label="Email" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows error message when isInvalid", () => {
    render(<EmailInput label="Email" isInvalid errorMessage="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});

// ─── PasswordInput ────────────────────────────────────────────────────────────

describe("PasswordInput", () => {
  it("renders the label", () => {
    render(<PasswordInput label="Password" />);
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("renders a lock icon (svg)", () => {
    const { container } = render(<PasswordInput label="Password" />);
    // At least two SVGs: lock + eye icon
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it("renders visibility toggle button", () => {
    render(<PasswordInput label="Password" />);
    expect(screen.getByRole("button", { name: "show password" })).toBeInTheDocument();
  });

  it("toggles visibility on click", async () => {
    const user = userEvent.setup();
    render(<PasswordInput label="Password" />);
    await user.click(screen.getByRole("button", { name: "show password" }));
    expect(screen.getByRole("button", { name: "hide password" })).toBeInTheDocument();
  });

  it("shows error message when isInvalid", () => {
    render(<PasswordInput label="Password" isInvalid errorMessage="Too short" />);
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });
});

// ─── ConfirmPasswordInput ─────────────────────────────────────────────────────

describe("ConfirmPasswordInput", () => {
  it("renders the label", () => {
    render(<ConfirmPasswordInput label="Confirm Password" />);
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
  });

  it("renders visibility toggle button", () => {
    render(<ConfirmPasswordInput label="Confirm Password" />);
    expect(screen.getByRole("button", { name: "show password" })).toBeInTheDocument();
  });

  it("shows error message when passwords do not match", () => {
    render(
      <ConfirmPasswordInput
        label="Confirm Password"
        isInvalid
        errorMessage="Passwords do not match"
      />
    );
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });
});
