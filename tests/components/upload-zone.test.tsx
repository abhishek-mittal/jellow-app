import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { UploadZone } from "@/components/prescription/upload-zone";

describe("UploadZone component", () => {
  it("is a React component (function)", () => {
    expect(typeof UploadZone).toBe("function");
  });

  it("renders Tap to upload text in idle state", () => {
    const html = renderToString(
      createElement(UploadZone, { onFileSelect: vi.fn(), status: "idle" })
    );
    expect(html).toContain("Tap to upload");
  });

  it("renders max size hint in idle state", () => {
    const html = renderToString(
      createElement(UploadZone, {
        onFileSelect: vi.fn(),
        status: "idle",
        maxSizeMB: 5,
      })
    );
    expect(html).toContain("5");
  });

  it("renders uploading state", () => {
    const html = renderToString(
      createElement(UploadZone, {
        onFileSelect: vi.fn(),
        status: "uploading",
      })
    );
    expect(html).toContain("Uploading");
  });

  it("renders processing state", () => {
    const html = renderToString(
      createElement(UploadZone, {
        onFileSelect: vi.fn(),
        status: "processing",
      })
    );
    expect(html).toContain("Analyzing prescription");
  });

  it("renders done state", () => {
    const html = renderToString(
      createElement(UploadZone, { onFileSelect: vi.fn(), status: "done" })
    );
    expect(html).toContain("Upload complete");
  });

  it("renders error state with retry hint", () => {
    const html = renderToString(
      createElement(UploadZone, { onFileSelect: vi.fn(), status: "error" })
    );
    expect(html).toContain("Upload failed");
    expect(html).toContain("Tap to retry");
  });

  it("renders image preview when preview URL is supplied", () => {
    const html = renderToString(
      createElement(UploadZone, {
        onFileSelect: vi.fn(),
        status: "done",
        preview: "https://example.com/rx.jpg",
      })
    );
    expect(html).toContain("https://example.com/rx.jpg");
  });

  it("does not render preview in error state", () => {
    const html = renderToString(
      createElement(UploadZone, {
        onFileSelect: vi.fn(),
        status: "error",
        preview: "https://example.com/rx.jpg",
      })
    );
    expect(html).not.toContain("Prescription preview");
    expect(html).toContain("Upload failed");
  });

  it("renders a hidden file input element", () => {
    const html = renderToString(
      createElement(UploadZone, { onFileSelect: vi.fn() })
    );
    expect(html).toContain('type="file"');
    expect(html).toContain('accept="image/*"');
  });

  it("respects custom accept prop", () => {
    const html = renderToString(
      createElement(UploadZone, {
        onFileSelect: vi.fn(),
        accept: "image/jpeg",
      })
    );
    expect(html).toContain('accept="image/jpeg"');
  });

  it("has accessible role=button", () => {
    const html = renderToString(
      createElement(UploadZone, { onFileSelect: vi.fn() })
    );
    expect(html).toContain('role="button"');
  });
});
