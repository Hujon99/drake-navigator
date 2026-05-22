## Problem to solve

The current URL changes to `/export/print`, but the screen still shows the export wizard. That means the print route is matched as a child of `/export`, but the `/export` route component does not render an `<Outlet />`. So the actual print component never mounts, and `window.print()` never runs.

There is also a second reliability issue: browsers often block automatic `window.print()` when it happens after a new tab load instead of directly inside the original button click.

## Plan

### 1. Fix the route architecture first

Make the print renderer a standalone route instead of a nested child of `/export`.

- Move the print route from `/export/print` to a non-nested path such as `/export-print`.
- Update the create route path in `src/routes/export.print.tsx`.
- Update the export wizard button in `src/routes/export.tsx` to open `/export-print?s=...`.

Why this is the safest fix:

```text
Current:
/export         -> renders wizard
/export/print   -> child route, but parent has no Outlet, so wizard remains visible

Target:
/export         -> renders wizard
/export-print   -> renders only the print/PDF page
```

This avoids a larger route refactor and ensures the print page is the only thing rendered in the new tab.

### 2. Change the final action from “open a tab and hope it prints” to a deliberate print page

Keep the new tab, but make it clearly a print/PDF page:

- Show the generated report immediately.
- Show a sticky top toolbar with one primary button: `Skriv ut / Spara som PDF`.
- Keep auto-print as a bonus, but do not rely on it.
- Make the manual print button the dependable path because it is a direct user action and browsers allow it.

This means the export flow still works even when Chrome blocks automatic print.

### 3. Improve auto-print without depending on it

On the standalone print route:

- Wait until fonts are loaded.
- Wait until the document is fully loaded.
- Focus the window.
- Try `window.print()` once.
- If Chrome blocks it, leave the user on the report with the visible manual button.

The copy should be honest:

```text
Rapporten är klar. Klicka “Skriv ut / Spara som PDF” och välj “Spara som PDF” i dialogen.
```

Instead of implying automatic print is guaranteed.

### 4. Clean up generated route handling

- Do not manually edit `src/routeTree.gen.ts`; let TanStack regenerate it.
- Remove reliance on `/export/print` as a nested route.
- Verify route links use the new route path consistently.

### 5. Validate the actual user flow

After implementation, test this flow:

1. Go to `/export`.
2. Select at least one grunddel/modul.
3. Fill optional customer/date.
4. Click `Skapa PDF`.
5. Confirm the new tab shows the report pages, not the wizard.
6. Confirm the manual `Skriv ut / Spara som PDF` button opens the browser print dialog.
7. Confirm print CSS hides toolbar/banners and outputs portrait A4 pages.

## Expected result

Clicking `Skapa PDF` opens a dedicated report/PDF page, not the wizard. From there, the user can reliably open the browser print dialog and save the report as PDF. Auto-print can still attempt to run, but the flow no longer depends on browser behavior that Chrome may block.