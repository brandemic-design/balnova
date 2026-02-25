/**
 * Ripple Effect Initialization
 * Initializes the jQuery ripple effect on the hero image
 */

/**
 * Initializes the ripple effect after image loads
 */
function initRippleEffect() {
  const img = new Image();
  img.src = 'https://cdn.prod.website-files.com/6989b2816152e02c42b27db1/69946565ddabdcc627e1c8d7_image%20(1).webp';
  
  img.onload = () => {
    $('#ripple').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.01,
    });
  };
}

// Export function for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initRippleEffect };
}
