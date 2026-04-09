/**
 * @vitest-environment node
 *
 * Uses React's server-side renderToString so we can run in Node without a
 * DOM while still verifying the ScanGuide output.
 */
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ScanGuide } from "@/components/scanner/scan-guide";

const noop = vi.fn();

const defaultProps = {
  isScanning: false,
  flashEnabled: false,
  onFlashToggle: noop,
  onManualEntry: noop,
};

describe("ScanGuide", () => {
  it("renders without errors", () => {
    const html = renderToString(<ScanGuide {...defaultProps} />);
    expect(html).toBeTruthy();
  });

  it("shows 'Position barcode within frame' when not scanning", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={false} />);
    expect(html).toContain("Position barcode within frame");
  });

  it("shows 'Scanning…' text when isScanning is true", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={true} />);
    expect(html).toContain("Scanning");
  });

  it("renders the gallery upload button", () => {
    const html = renderToString(<ScanGuide {...defaultProps} />);
    expect(html).toContain("Or tap to upload from gallery");
  });

  it("renders flash-off icon when flashEnabled is false", () => {
    const html = renderToString(<ScanGuide {...defaultProps} flashEnabled={false} />);
    // Lucide FlashlightOff icon renders as SVG; verify via aria-label
    expect(html).toContain("Turn on flash");
  });

  it("renders flash-on icon when flashEnabled is true", () => {
    const html = renderToString(<ScanGuide {...defaultProps} flashEnabled={true} />);
    // Lucide Flashlight icon renders as SVG; verify via aria-label
    expect(html).toContain("Turn off flash");
  });

  it("renders all four corner-dot elements", () => {
    const html = renderToString(<ScanGuide {...defaultProps} />);
    // Each corner has a golden dot positioned at frame corners
    const dotCount = (html.match(/rounded-full bg-s-orange/g) || []).length;
    expect(dotCount).toBe(4);
  });

  it("shows scan line animation when isScanning is true", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={true} />);
    expect(html).toContain("animate-scan-line");
  });

  it("does not show scan line when not scanning", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={false} />);
    expect(html).not.toContain("animate-scan-line");
  });
});
