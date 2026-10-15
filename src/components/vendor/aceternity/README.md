# Aceternity expandable card grid

Downloaded from `@aceternity/expandable-card-demo-grid` on October 15, 2026 using the shadcn registry. The complete source is retained in `expandable-card-grid.upstream.txt`.

The registry demo hardcodes music cards and does not accept data props. `createExpandableCards` encloses its original render function and CloseIcon in a data factory, replacing only the hardcoded example array. The render function, image elements, Motion layout transitions, and dismissal behavior are unchanged.

Portfolio data, certificate sizing, theme styles, and keyboard/focus enhancements live in `certificate-gallery.tsx` and its CSS module. This component is used only for certificates.

The wrapper creates one stable component instance per certificate, and the outer CSS grid arranges those instances. The upstream demo derives description layout IDs from the description text and its instance's `useId()`. Isolating certificates prevents repeated captions, such as the two Puzzle Day gold labels or the freeCodeCamp labels, from sharing animation IDs and stealing each other's text on collapse.
