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
  const heroLetters = document.querySelectorAll('.hero-letter');
  const heroWords = document.querySelectorAll('.hero-word');
  
  if (heroLetters.length === 0 && heroWords.length === 0) {
    console.warn('Balnova Animations: Hero elements (.hero-letter, .hero-word) not found');
    return;
  }
  
  console.log('Balnova Animations: Hero elements found, initializing animations...');
  
  // Initial animation after page load
  setTimeout(function() {
    heroLetters.forEach(function(el) {
      el.classList.add('animate');
    });
    heroAnimated = true;
    console.log('Balnova Animations: Hero letters animated ✓');
  }, 4800);

  // Trigger subtitle words after logo letters finish
  setTimeout(function() {
    heroWords.forEach(function(el) {
      el.classList.add('animate');
    });
    console.log('Balnova Animations: Hero words animated ✓');
  }, 5600);
}

// Export functions for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { playHeroReveal, resetHeroAnimations, initHeroAnimations };
}
