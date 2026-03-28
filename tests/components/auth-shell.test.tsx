import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthHero } from "@/components/auth/auth-hero";
import { AuthTitle } from "@/components/auth/auth-title";
import { AuthSubtitle } from "@/components/auth/auth-subtitle";
import { AuthBody } from "@/components/auth/auth-body";

// ─── AuthShell ──────────────────────────────────────────────────────────────

describe("AuthShell", () => {
  it("renders children", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthShell, null, React.createElement("p", null, "hello"))
    );
    expect(html).toContain("hello");
  });

  it("applies safe-area bottom padding via inline style", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthShell, null, React.createElement("span", null, "x"))
    );
    expect(html).toContain("env(safe-area-inset-bottom");
  });

  it("adds safe-area-inset-top class when withHero is false (default)", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthShell, { withHero: false }, React.createElement("span", null, "x"))
    );
    expect(html).toContain("pt-[env(safe-area-inset-top");
  });

  it("omits safe-area-inset-top class when withHero is true", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthShell, { withHero: true }, React.createElement("span", null, "x"))
    );
    expect(html).not.toContain("pt-[env(safe-area-inset-top");
  });

  it("accepts and applies an extra className", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        AuthShell,
        { className: "custom-class" },
        React.createElement("span", null, "x")
      )
    );
    expect(html).toContain("custom-class");
  });

  it("renders as a flex column", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthShell, null, React.createElement("span", null, "x"))
    );
    expect(html).toContain("flex-col");
  });
});

// ─── AuthHero ───────────────────────────────────────────────────────────────

describe("AuthHero", () => {
  it("renders without a background image when imageSrc is omitted", () => {
    const html = renderToStaticMarkup(React.createElement(AuthHero, null));
    expect(html).not.toContain("background-image");
  });

  it("renders the background image when imageSrc is provided", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthHero, { imageSrc: "/hero.jpg", imageAlt: "Hero" })
    );
    expect(html).toContain("background-image");
    expect(html).toContain("/hero.jpg");
  });

  it("sets aria-label on the image layer when imageAlt is provided", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthHero, { imageSrc: "/hero.jpg", imageAlt: "Gym equipment" })
    );
    expect(html).toContain("Gym equipment");
  });

  it("renders the logoMark when provided", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        AuthHero,
        { logoMark: React.createElement("span", { "data-testid": "logo" }, "🟠") }
      )
    );
    expect(html).toContain("🟠");
  });

  it("does not render a logoMark wrapper when logoMark is omitted", () => {
    const html = renderToStaticMarkup(React.createElement(AuthHero, null));
    // No bottom-5 positioning div should appear
    expect(html).not.toContain("bottom-5");
  });

  it("applies the default 300px height", () => {
    const html = renderToStaticMarkup(React.createElement(AuthHero, null));
    expect(html).toContain("300px");
  });

  it("accepts a custom height", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthHero, { height: "240px" })
    );
    expect(html).toContain("240px");
  });

  it("applies safe-area-inset-top padding via inline style", () => {
    const html = renderToStaticMarkup(React.createElement(AuthHero, null));
    expect(html).toContain("env(safe-area-inset-top");
  });

  it("includes the gradient overlay", () => {
    const html = renderToStaticMarkup(React.createElement(AuthHero, null));
    expect(html).toContain("bg-gradient-to-b");
  });
});

// ─── AuthTitle ──────────────────────────────────────────────────────────────

describe("AuthTitle", () => {
  it("renders children inside an h1", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthTitle, null, "Sign In To Sandow")
    );
    expect(html).toContain("<h1");
    expect(html).toContain("Sign In To Sandow");
  });

  it("renders text-center alignment", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthTitle, null, "Title")
    );
    expect(html).toContain("text-center");
  });

  it("renders font-extrabold weight", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthTitle, null, "Title")
    );
    expect(html).toContain("font-extrabold");
  });

  it("accepts extra className", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthTitle, { className: "mb-4" }, "Title")
    );
    expect(html).toContain("mb-4");
  });
});

// ─── AuthSubtitle ────────────────────────────────────────────────────────────

describe("AuthSubtitle", () => {
  it("renders children inside a paragraph", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthSubtitle, null, "Let's personalize your fitness")
    );
    expect(html).toContain("<p");
    expect(html).toContain("Let&#x27;s personalize your fitness");
  });

  it("renders text-center alignment", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthSubtitle, null, "Subtitle")
    );
    expect(html).toContain("text-center");
  });

  it("renders font-medium weight", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthSubtitle, null, "Subtitle")
    );
    expect(html).toContain("font-medium");
  });

  it("accepts extra className", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthSubtitle, { className: "mb-8" }, "Subtitle")
    );
    expect(html).toContain("mb-8");
  });
});

// ─── AuthBody ───────────────────────────────────────────────────────────────

describe("AuthBody", () => {
  it("renders children", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthBody, null, React.createElement("p", null, "form content"))
    );
    expect(html).toContain("form content");
  });

  it("applies horizontal padding", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthBody, null, React.createElement("span", null, "x"))
    );
    expect(html).toContain("px-6");
  });

  it("centers children with items-center", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthBody, null, React.createElement("span", null, "x"))
    );
    expect(html).toContain("items-center");
  });

  it("accepts extra className", () => {
    const html = renderToStaticMarkup(
      React.createElement(AuthBody, { className: "pt-12" }, React.createElement("span", null, "x"))
    );
    expect(html).toContain("pt-12");
  });
});
