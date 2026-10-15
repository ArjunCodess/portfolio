# Aceternity expandable card grid

Downloaded from `@aceternity/expandable-card-demo-grid` on October 15, 2026 using the shadcn registry. The complete source is retained in `expandable-card-grid.upstream.txt`.

The registry demo hardcodes music cards and does not accept data props. `createExpandableCards` encloses its original render function and CloseIcon in a data factory, replacing only the hardcoded example array. The render function, image elements, Motion layout transitions, and dismissal behavior are unchanged; a regression check compares the function against the download.

Portfolio data, certificate sizing, theme styles, and keyboard/focus enhancements live in `certificate-gallery.tsx` and its CSS module. This component is used only for certificates.
