import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { ResetPasswordScreen } from "@/components/auth/reset-password-screen";

const mockPush = vi.fn();

// Mock next/navigation so the component renders in a test environment
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockFetch = vi.fn();

beforeEach(() => {
  mockPush.mockClear();
  mockFetch.mockClear();
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true, method: "email" }),
  });
  vi.stubGlobal("fetch", mockFetch);
});

describe("ResetPasswordScreen", () => {
  describe("layout and headings", () => {
    it("renders the Reset Password heading", () => {
      render(createElement(ResetPasswordScreen));
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Reset Password"
      );
    });

    it("renders the subtitle text", () => {
      render(createElement(ResetPasswordScreen));
      expect(
        screen.getByText(/select what method you'd like to reset/i)
      ).toBeInTheDocument();
    });

    it("renders the back button with accessible label", () => {
      render(createElement(ResetPasswordScreen));
      expect(screen.getByRole("button", { name: /go back/i })).toBeInTheDocument();
    });
  });

  describe("method cards", () => {
    it("renders all three method cards", () => {
      render(createElement(ResetPasswordScreen));
      expect(screen.getByText("Send via Email")).toBeInTheDocument();
      expect(screen.getByText("Send via 2FA")).toBeInTheDocument();
      expect(screen.getByText("Send via Google Auth")).toBeInTheDocument();
    });

    it("renders three selectable buttons (cards + back)", () => {
      render(createElement(ResetPasswordScreen));
      // 3 method cards + 1 back button + 1 CTA = 5 buttons
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(5);
    });
  });

  describe("single-selection state", () => {
    it("no card is selected on initial render", () => {
      render(createElement(ResetPasswordScreen));
      const cards = screen
        .getAllByRole("button")
        .filter((btn) => btn.getAttribute("aria-pressed") !== null);
      expect(cards.every((card) => card.getAttribute("aria-pressed") === "false")).toBe(true);
    });

    it("marks the clicked card as selected", async () => {
      const user = userEvent.setup();
      render(createElement(ResetPasswordScreen));
      const emailCard = screen.getByText("Send via Email").closest("button")!;
      await user.click(emailCard);
      expect(emailCard).toHaveAttribute("aria-pressed", "true");
    });

    it("deselects the previous card when a new one is clicked", async () => {
      const user = userEvent.setup();
      render(createElement(ResetPasswordScreen));
      const emailCard = screen.getByText("Send via Email").closest("button")!;
      const tfaCard = screen.getByText("Send via 2FA").closest("button")!;

      await user.click(emailCard);
      expect(emailCard).toHaveAttribute("aria-pressed", "true");

      await user.click(tfaCard);
      expect(tfaCard).toHaveAttribute("aria-pressed", "true");
      expect(emailCard).toHaveAttribute("aria-pressed", "false");
    });

    it("allows selecting the Google Auth card", async () => {
      const user = userEvent.setup();
      render(createElement(ResetPasswordScreen));
      const googleCard = screen.getByText("Send via Google Auth").closest("button")!;
      await user.click(googleCard);
      expect(googleCard).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("CTA button", () => {
    it("renders the Reset Password CTA button", () => {
      render(createElement(ResetPasswordScreen));
      expect(
        screen.getByRole("button", { name: /reset password/i })
      ).toBeInTheDocument();
    });

    it("CTA is disabled when no method is selected", () => {
      render(createElement(ResetPasswordScreen));
      const cta = screen.getByRole("button", { name: /reset password/i });
      expect(cta).toBeDisabled();
    });

    it("CTA becomes enabled after a method is selected", async () => {
      const user = userEvent.setup();
      render(createElement(ResetPasswordScreen));
      const cta = screen.getByRole("button", { name: /reset password/i });
      expect(cta).toBeDisabled();

      const emailCard = screen.getByText("Send via Email").closest("button")!;
      await user.click(emailCard);
      expect(cta).not.toBeDisabled();
    });
  });

  describe("back navigation", () => {
    it("calls router.push with /auth/sign-in when back button is clicked", async () => {
      const user = userEvent.setup();
      render(createElement(ResetPasswordScreen));
      await user.click(screen.getByRole("button", { name: /go back/i }));
      expect(mockPush).toHaveBeenCalledWith("/auth/sign-in");
    });
  });

  describe("CTA navigation", () => {
    it("navigates to /auth/password-sent after selecting a method and clicking CTA", async () => {
      const user = userEvent.setup();
      render(createElement(ResetPasswordScreen));
      const emailCard = screen.getByText("Send via Email").closest("button")!;
      await user.click(emailCard);
      const cta = screen.getByRole("button", { name: /reset password/i });
      await user.click(cta);
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/auth/password-sent");
      });
    });
  });
});
