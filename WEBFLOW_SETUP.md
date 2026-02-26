# Webflow Setup Instructions

## Required Dependencies

For the animations to work in Webflow, you need to include these libraries **before** the Balnova animations script:

### 1. GSAP Core
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

### 2. GSAP Plugins
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js"></script>
```

### 3. jQuery (for ripple effect - optional)
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js"></script>
```

### 4. Balnova Files
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/brandemic-design/balnova@main/homepage_style.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/brandemic-design/balnova@main/homepage_animations.js" defer></script>
```

## Complete Setup in Webflow

1. Go to **Project Settings** → **Custom Code**
2. Add the scripts in the **Footer Code** section in this exact order:

```html
<!-- GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- GSAP Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js"></script>

<!-- jQuery (for ripple effect) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js"></script>

<!-- Balnova CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/brandemic-design/balnova@main/homepage_style.css">

<!-- Balnova JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/brandemic-design/balnova@main/homepage_animations.js" defer></script>
```

## Required HTML Classes

Make sure your Webflow elements have these classes:

- `.home_about-left` - The about section left side
- `.home_about-text` - About section text
- `.section_home-about` - About section container
- `.section_home-service` - Service section container
- `.home_service-text` - Service text elements
- `.home_service-image` - Service images
- `.hero-letter` - Hero letters
- `.hero-word` - Hero words
- `.main-wrapper` - Main wrapper element
- `#ripple` - Ripple effect element (optional)

## Troubleshooting

If animations are not showing:

1. **Check Browser Console** - Open DevTools (F12) and look for error messages
2. **Verify Dependencies** - Make sure all GSAP plugins are loaded before the Balnova script
3. **Check Element Classes** - Ensure all required classes exist in your HTML
4. **Check Script Order** - Scripts must load in the correct order (GSAP → Plugins → Balnova)

## Console Messages

The script will show helpful console messages:
- ✅ Success messages when everything loads correctly
- ⚠️ Warnings when optional features (like ripple) can't be initialized
- ❌ Errors when required dependencies are missing
