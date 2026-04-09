import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import {
  SettingsSection,
  SettingsItem,
  SettingsBadge,
} from "@/components/profile/settings-item";
import { Bell, Shield, Trash2 } from "lucide-react";

describe("SettingsSection", () => {
  it("renders title and children", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        SettingsSection,
        { title: "General" },
        React.createElement("div", null, "child-content"),
      ),
    );
    expect(html).toContain("General");
    expect(html).toContain("child-content");
  });

  it("renders optional badge", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        SettingsSection,
        {
          title: "Security",
          badge: React.createElement(SettingsBadge, null, "Beta"),
        },
        React.createElement("span", null, "item"),
      ),
    );
    expect(html).toContain("Security");
    expect(html).toContain("Beta");
  });

  it("renders options button with aria-label", () => {
    const html = renderToStaticMarkup(
      React.createElement(
        SettingsSection,
        { title: "Help" },
        React.createElement("span"),
      ),
    );
    expect(html).toContain('aria-label="Help options"');
  });
});

describe("SettingsItem", () => {
  it("renders navigate item with label and chevron", () => {
    const html = renderToStaticMarkup(
      React.createElement(SettingsItem, {
        icon: Bell,
        label: "Notifications",
      }),
    );
    expect(html).toContain("Notifications");
  });

  it("renders optional value text", () => {
    const html = renderToStaticMarkup(
      React.createElement(SettingsItem, {
        icon: Bell,
        label: "Language",
        value: "English (EN)",
      }),
    );
    expect(html).toContain("Language");
    expect(html).toContain("English (EN)");
  });

  it("renders danger item with danger styling", () => {
    const html = renderToStaticMarkup(
      React.createElement(SettingsItem, {
        icon: Trash2,
        label: "Close Account",
        type: "danger",
      }),
    );
    expect(html).toContain("Close Account");
    // Danger items use danger token classes
    expect(html).toContain("danger");
  });

  it("renders toggle item with switch", () => {
    const html = renderToStaticMarkup(
      React.createElement(SettingsItem, {
        icon: Shield,
        label: "Enable Biometric",
        type: "toggle",
        checked: false,
        onToggle: () => {},
      }),
    );
    expect(html).toContain("Enable Biometric");
    expect(html).toContain('aria-label="Enable Biometric"');
  });
});

describe("SettingsBadge", () => {
  it("renders default badge", () => {
    const html = renderToStaticMarkup(
      React.createElement(SettingsBadge, null, "Beta"),
    );
    expect(html).toContain("Beta");
    // Default variant uses blue
    expect(html).toContain("s-blue");
  });

  it("renders warning badge", () => {
    const html = renderToStaticMarkup(
      React.createElement(SettingsBadge, { variant: "warning" }, "Warning"),
    );
    expect(html).toContain("Warning");
    expect(html).toContain("danger");
  });
});
