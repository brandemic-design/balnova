# Debugging Guide for Webflow

If animations are not showing in Webflow, follow these steps:

## Step 1: Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab. You should see messages like:

✅ **Success messages:**
- `Balnova Animations: Script loaded, waiting for DOM...`
- `Balnova Animations: DOM loaded, waiting for fonts...`
- `Balnova Animations: Fonts ready, initializing...`
- `Balnova Animations: All dependencies loaded ✓`
- `Balnova Animations: GSAP plugins registered ✓`
- `Balnova Animations: .main-wrapper found ✓`
- `Balnova Animations: .home_about-left found and initialized ✓`

❌ **Error messages to look for:**
- `Balnova Animations: GSAP is not loaded` - GSAP library missing
- `Balnova Animations: ScrollTrigger plugin is not loaded` - Plugin missing
- `Balnova Animations: .main-wrapper element not found!` - Critical element missing
- `Balnova Animations: .home_about-left element not found` - Element missing

## Step 2: Verify Script Load Order

In Webflow, make sure scripts load in this exact order:

1. **GSAP Core** (must be first)
2. **GSAP Plugins** (ScrollTrigger, SplitText, Flip)
3. **jQuery** (optional, for ripple effect)
4. **Balnova CSS**
5. **Balnova JavaScript** (last)

## Step 3: Check HTML Classes

Verify these classes exist in your Webflow HTML:

- `.main-wrapper` - **REQUIRED** (main container)
- `.home_about-left` - About section left side
- `.section_home-about` - About section container
- `.section_home-service` - Service section container
- `.home_about-text` - About text
- `.home_service-text` - Service text
- `.hero-letter` - Hero letters
- `.hero-word` - Hero words

## Step 4: Test Element Existence

Run this in the browser console to check if elements exist:

```javascript
console.log('.main-wrapper:', document.querySelector('.main-wrapper'));
console.log('.home_about-left:', document.querySelector('.home_about-left'));
console.log('.section_home-about:', document.querySelector('.section_home-about'));
console.log('.hero-letter:', document.querySelectorAll('.hero-letter').length);
```

## Step 5: Check CSS

Make sure the CSS file is loaded:

```javascript
// Check if CSS is loaded
const stylesheets = Array.from(document.styleSheets);
const balnovaCSS = stylesheets.find(sheet => sheet.href && sheet.href.includes('homepage_style.css'));
console.log('Balnova CSS loaded:', !!balnovaCSS);
```

## Common Issues

### Issue: "GSAP is not loaded"
**Solution:** Add GSAP before the Balnova script:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

### Issue: ".main-wrapper not found"
**Solution:** Add a div with class `main-wrapper` that wraps your page content

### Issue: ".home_about-left not found"
**Solution:** Add a div with class `home_about-left` in your about section

### Issue: Animations work but elements are invisible
**Solution:** Check if CSS is loaded and if `autoAlpha: 0` is being set correctly

## Quick Test

Add this to your Webflow page to test if everything is working:

```html
<script>
window.addEventListener('load', function() {
  console.log('=== BALNOVA DEBUG ===');
  console.log('GSAP:', typeof gsap !== 'undefined');
  console.log('ScrollTrigger:', typeof ScrollTrigger !== 'undefined');
  console.log('SplitText:', typeof SplitText !== 'undefined');
  console.log('Flip:', typeof Flip !== 'undefined');
  console.log('.main-wrapper:', !!document.querySelector('.main-wrapper'));
  console.log('.home_about-left:', !!document.querySelector('.home_about-left'));
  console.log('===================');
});
</script>
```
