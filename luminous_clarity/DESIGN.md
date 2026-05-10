---
name: Luminous Clarity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424752'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727784'
  outline-variant: '#c2c6d4'
  surface-tint: '#115cb9'
  primary: '#003f87'
  on-primary: '#ffffff'
  primary-container: '#0056b3'
  on-primary-container: '#bbd0ff'
  inverse-primary: '#acc7ff'
  secondary: '#585f66'
  on-secondary: '#ffffff'
  secondary-container: '#dce3eb'
  on-secondary-container: '#5e656c'
  tertiary: '#583d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#755300'
  on-tertiary-container: '#ffc75e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004491'
  secondary-fixed: '#dce3eb'
  secondary-fixed-dim: '#c0c7cf'
  on-secondary-fixed: '#151c22'
  on-secondary-fixed-variant: '#40484e'
  tertiary-fixed: '#ffdea8'
  tertiary-fixed-dim: '#ffba20'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  display-md:
    fontFamily: Lexend
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Lexend
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The brand personality for the design system is centered on the "Trusted Mentor"—an authority that is professional and reliable, yet encouraging and highly accessible. The target audience encompasses students seeking focus and educators requiring efficiency. 

The chosen design style is **Corporate / Modern** with a strong influence of **Minimalism**. It prioritizes a high signal-to-noise ratio, utilizing expansive whitespace to reduce cognitive load, which is critical in an educational context. The aesthetic is crisp and structured, evoking an emotional response of calm confidence and mental clarity. Visual elements are intentional, eschewing decorative clutter in favor of functional elegance that guides the learner’s journey without distraction.

## Colors

The palette is anchored by a deep **Primary Blue (#0056b3)**, chosen to communicate stability and academic integrity. This is balanced by a vast canvas of **Pure White (#ffffff)** to maintain a clean, high-contrast environment. 

A **Secondary Light Blue (#f0f7ff)** is utilized for subtle background partitioning and hover states, ensuring the UI feels layered without becoming heavy. A **Tertiary Gold (#ffb800)** is reserved strictly for "moments of achievement," such as badges, progress milestones, and featured call-outs, providing a warm contrast to the cooler primary tones. Neutrals are kept in the slate family to maintain a professional, contemporary feel that avoids the "muddy" look of pure grays.

## Typography

This design system employs a dual-font strategy to balance character with utility. **Lexend** is used for headlines; its design is specifically engineered to reduce visual stress and improve reading proficiency, making it ideal for educational headers. **Inter** is used for all body copy, labels, and UI elements to provide a systematic, neutral, and highly legible experience at smaller sizes.

Typography follows a strict hierarchy. Headings use a tighter line-height to create strong visual anchors, while body text uses a generous 1.6x line-height to ensure long-form educational content remains breathable and easy to digest.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model to ensure content density remains optimized for focus. A 12-column grid is centered within a 1280px max-width container, providing a stable structure for diverse course materials.

The spacing rhythm is built on an **8px base unit**. Smaller increments (4px, 12px) are used for internal component relationships, while larger increments (24px, 40px) define the boundaries between distinct content sections. This "breathable" approach ensures that even complex dashboard views remain navigable and professional.

## Elevation & Depth

To maintain a "modern and clean" feel, this design system uses **Ambient Shadows** to convey depth. Instead of heavy, dark dropshadows, we use ultra-diffused, low-opacity shadows with a slight tint of the primary blue. This creates the appearance of surfaces floating naturally above the background.

Hierarchy is reinforced through three distinct levels:
1.  **Level 0 (Flat):** Used for the main background and decorative elements.
2.  **Level 1 (Subtle):** Used for standard course cards and content modules (Shadow: 0px 4px 12px rgba(0, 86, 179, 0.05)).
3.  **Level 2 (Active):** Used for modals, dropdowns, and hovered interactive elements (Shadow: 0px 8px 24px rgba(0, 86, 179, 0.1)).

## Shapes

The shape language is consistently **Rounded (Level 2)**. A base radius of 0.5rem (8px) is applied to buttons, input fields, and small cards, providing a soft, approachable feel that mitigates the clinical coldness of a purely corporate grid. 

Larger containers, such as feature banners or course overview cards, utilize `rounded-lg` (1rem) and `rounded-xl` (1.5rem) to emphasize their role as primary content vessels. This progressive rounding ensures that the UI feels modern and tactile while remaining professional.

## Components

### Buttons
Primary buttons use the solid Primary Blue with white text. Secondary buttons utilize the Light Blue background with Primary Blue text. All buttons have a subtle 1px inset border on hover to increase tactile feedback without shifting layout.

### Cards
Course cards are the primary vessel for information. They feature a Level 1 shadow, 16px padding, and a 1px border (#e2e8f0) to ensure they are visible even on white backgrounds. On hover, the shadow transitions to Level 2 and the border color shifts to Primary Blue.

### Input Fields
Inputs use a white background with a subtle gray border. Focus states are indicated by a 2px Primary Blue ring with a 4px soft outer glow. Labels are always positioned above the input in `label-lg` for maximum clarity.

### Progress Bars
A custom component for the educational context. The track is a light neutral gray, while the progress fill uses a Primary Blue to Gold gradient to signify movement toward achievement.

### Chips & Tags
Used for course categories or difficulty levels. These are pill-shaped (full rounding) and use the Secondary Light Blue background with `label-md` typography.

### Lists
Lesson lists use a "row-based" design with subtle dividers. Each item includes a leading icon or number and a trailing indicator for completion status (a checkmark in Primary Blue).