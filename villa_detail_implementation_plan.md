# Implementation Plan: Villa Detail (Overview & Facilities)

## Goal Description
Translate the desktop-first Figma design (Node ID `376:1089`) for the "Villa Detail" section into a production-ready, fully functional, and responsive React component. The implementation will strictly adhere to "Mobile First" principles, DRY (Don't Repeat Yourself) architecture, and the provided Figma MCP Integration Rules. 

The design consists of:
1.  **Overview Section**: Title and description.
2.  **Quick Stats Bar**: Price, guest capacity, rating, and location.
3.  **Tabs/Section Headers**: "HIGHLIGHTS" and "FACILITIES".
4.  **Detailed Information Grids**: Property Details, Convenient Location, and Popular Facilities.

## User Review Required
> [!IMPORTANT]
> **Asset Extraction Strategy:** The Figma design uses 18+ distinct SVG icons for various amenities (check-in, bath, wifi, parking, etc.). To adhere to best practices and reduce bundle size, we will extract these as reusable React components (e.g., `<Icon name="check-in" />` or use a spritesheet/existing icon library like `lucide-react` if closely matching) rather than hardcoding multiple SVG files.
> **Please confirm if we should extract SVGs directly from Figma or use a standard icon library if available.**

> [!TIP]
> **Localization (i18n):** Since the project supports multiple languages (en, tr, ru), all text content (e.g., "Family rooms", "Check-in", descriptions) will be integrated into the existing `i18next` translation JSON files.

## Proposed Changes

We will break the UI down into modular, highly reusable components to ensure zero code smell and maintainability.

### 1. Reusable UI Components
These components will form the building blocks of the section.

#### [NEW] `src/components/ui/DetailItem.tsx`
- **Purpose**: A generic, highly reusable component to render the icon + text combinations seen throughout the "Property Details", "Convenient Location", and "Popular Facilities" sections.
- **Props**: `icon` (ReactNode), `title` (string), `subtitle` (optional string).
- **Responsive**: Flex row alignment, standardized spacing, typography scaling for mobile.

#### [NEW] `src/components/ui/QuickStat.tsx`
- **Purpose**: Component for the top stats bar (Price, Guests, Rating, Address).
- **Props**: `icon` (ReactNode), `primaryText` (string), `secondaryText` (optional string).

### 2. Feature Components
These components will orchestrate the data and layout.

#### [NEW] `src/components/villa/VillaOverview.tsx`
- **Purpose**: The main wrapper for Node `376:1089`.
- **Layout Strategy (Mobile First)**:
  - **Mobile**: Stack all sections vertically (`flex-col`). The tabs ("Highlights" vs "Facilities") will act as an accordion or a horizontal scrollable tab list to save vertical space. The details grids will be 1 column (`grid-cols-1`).
  - **Tablet**: Adjust details grids to 2 columns (`grid-cols-2`).
  - **Desktop (matches Figma)**: 
    - Quick Stats: `flex-row` with horizontal borders.
    - Details Section: Use CSS Grid or Flexbox to place "Property Details / Location" on the left and "Popular Facilities" on the right, separated by the vertical line (`border-l` or a custom divider).
- **Sub-sections**:
  - `<OverviewHeader />`: Title and Description.
  - `<QuickStatsBar />`: Renders the 4 quick stats.
  - `<HighlightsAndFacilities />`: Renders the tabs, vertical divider (desktop only), and maps over data arrays to render `<DetailItem />`s.

### 3. Data & State Management

#### [MODIFY] `src/data/villaDetails.ts` (or equivalent data file)
- **Purpose**: Extract the static data (amenities, location distances) out of the component to keep the JSX clean.
- **Structure**:
  ```typescript
  export const propertyDetails = [
    { icon: 'checkIn', titleKey: 'checkIn', subtitleKey: 'checkInTime' },
    // ...
  ];
  export const facilities = [
    { icon: 'wifi', titleKey: 'freeWifi' },
    // ...
  ];
  ```

### 4. Styling Strategy (Vanilla CSS / Tailwind)
- **Typography**: Will use the required `Plus_Jakarta_Sans` and `Cormorant_Garamond` fonts, mapping them to Tailwind configuration.
- **Colors**: The distinct accent border color `rgba(201,122,74,0.2)` and text colors will be defined as CSS variables or Tailwind arbitrary values.
- **Responsiveness**:
  - `px-4 py-8` (Mobile) -> `px-8 py-16` (Tablet) -> `px-[126px] py-[125px]` (Desktop).
  - Use `gap-4` (Mobile) -> `gap-8` (Desktop).

## Verification Plan

### Automated/Linting Tests
- Run `npm run lint` and `npm run typecheck` to ensure the extracted interfaces and props are strictly typed.
- Verify that there are no duplicate classes or hardcoded styling values that violate DRY.

### Manual Verification
1.  **Mobile View (375px)**: Ensure tabs work correctly, Quick Stats are stacked, and text is readable without horizontal scrolling.
2.  **Desktop View (1440px)**: Ensure 1:1 visual parity with the Figma screenshot, specifically checking the vertical divider and alignment of the `DetailItem` grids.
3.  **Localization**: Toggle the language switcher to ensure all new keys in `translation.json` correctly update the UI.
