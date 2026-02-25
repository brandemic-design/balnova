# Build Instructions

This project uses a modular structure where source files are in `src/js/` and are combined into `homepage_animations.js` using a build script.

## Setup

1. Install dependencies (optional, only needed for watch mode):
```bash
npm install
```

## Building

To build the main `homepage_animations.js` file from the modules in `src/js/`:

```bash
npm run build
```

This will:
- Read all module files from `src/js/`
- Combine them in the correct order
- Generate `homepage_animations.js` at the root

## Watch Mode (Optional)

To automatically rebuild when files in `src/js/` change:

```bash
npm run watch
```

## File Structure

- `src/js/` - Source modules (edit these files)
  - `hero-animations.js` - Hero section animations
  - `ripple-effect.js` - Ripple effect initialization
  - `service-reveal.js` - Service section animations
  - `about-section.js` - About section animations
  - `logo-animations.js` - Logo flip animations
  - `scroll-timeline.js` - Main scroll timeline

- `homepage_animations.js` - **Auto-generated** (do not edit directly)
- `homepage_style.css` - Styles (edit directly)

## Important Notes

- **DO NOT edit `homepage_animations.js` directly** - it will be overwritten on build
- Edit files in `src/js/` instead
- Run `npm run build` after making changes to see them reflected
- The built file is used for CDN distribution
