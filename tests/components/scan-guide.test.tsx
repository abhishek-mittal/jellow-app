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

  it("shows 'Point camera at barcode' when not scanning", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={false} />);
    expect(html).toContain("Point camera at barcode");
  });

  it("shows 'Scanning…' text when isScanning is true", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={true} />);
    expect(html).toContain("Scanning");
  });

  it("renders the manual entry button", () => {
    const html = renderToString(<ScanGuide {...defaultProps} />);
    expect(html).toContain("Enter manually");
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

  it("renders all four corner-bracket elements", () => {
    const html = renderToString(<ScanGuide {...defaultProps} />);
    // Each bracket has a unique combination of border direction classes
    expect(html).toContain("border-l-2 border-t-2"); // top-left
    expect(html).toContain("border-r-2 border-t-2"); // top-right
    expect(html).toContain("border-b-2 border-l-2"); // bottom-left
    expect(html).toContain("border-b-2 border-r-2"); // bottom-right
  });

  it("applies animate-pulse to brackets when isScanning is true", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={true} />);
    expect(html).toContain("animate-pulse");
  });

  it("does not apply animate-pulse when not scanning", () => {
    const html = renderToString(<ScanGuide {...defaultProps} isScanning={false} />);
    expect(html).not.toContain("animate-pulse");
  });
});
