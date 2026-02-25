/**
 * Hero Section Animations
 * Handles letter and word reveal animations for the hero section
 */

let heroAnimated = false;

/**
 * Plays the hero reveal animation
 */
function playHeroReveal() {
  if (heroAnimated) return;
  heroAnimated = true;
  
  document.querySelectorAll('.hero-letter').forEach(function(el) {
    el.classList.add('animate');
  });
  
  setTimeout(function() {
    document.querySelectorAll('.hero-word').forEach(function(el) {
      el.classList.add('animate');
    });
  }, 800);
}

/**
 * Resets hero animations
 */
function resetHeroAnimations() {
  if (!heroAnimated) return;
  heroAnimated = false;
  
  document.querySelectorAll('.hero-letter').forEach(function(el) {
    el.classList.remove('animate');
  });
  
  document.querySelectorAll('.hero-word').forEach(function(el) {
    el.classList.remove('animate');
  });
}

/**
 * Initial hero animation on page load
 */
function initHeroAnimations() {
  // Initial animation after page load
  setTimeout(function() {
    document.querySelectorAll('.hero-letter').forEach(function(el) {
      el.classList.add('animate');
    });
    heroAnimated = true;
  }, 4800);

  // Trigger subtitle words after logo letters finish
  setTimeout(function() {
    document.querySelectorAll('.hero-word').forEach(function(el) {
      el.classList.add('animate');
    });
  }, 5600);
}

// Export functions for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { playHeroReveal, resetHeroAnimations, initHeroAnimations };
}
