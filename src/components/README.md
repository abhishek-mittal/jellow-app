# Components - Atomic Design

This directory follows the Atomic Design methodology to organize our Sandow UI Kit components since this is a mobile-first native application wrapped with Cordova/Capacitor.

## Structure

- **atoms/**: UI primitives (buttons, inputs, icons, typography, colors) that can't be broken down further.
- **molecules/**: Simple UI groups built from atoms (cards with headers, input with labels, specialized buttons).
- **organisms/**: Complex, self-contained UI modules composed of groups of molecules and/or atoms (nav bars, functional panels, forms).
- **templates/**: Page-level objects that articulate the design underpinnings and dictate layout and spacing.

## Migration Note
All components have been moved from standard functional directories (`ui/`, `home/`, `verdict/` etc) into this atomic structure to ensure clean reusability between the mobile PWA wrapper, the `(web)` interface, and `(marketing)` pages.
