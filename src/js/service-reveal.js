/**
 * Service Section Animations
 * Handles service image reveal and text interactions
 */

let currentIndex = -1;
let isAnimating = false;
let serviceRevealed = false;

const clipHidden = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
const clipVisible = "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)";

/**
 * Reveals a service by index
 * @param {number} index - The service index to reveal
 * @param {NodeList} serviceImages - All service image elements
 * @param {NodeList} serviceTexts - All service text elements
 */
function revealService(index, serviceImages, serviceTexts) {
  if (isAnimating) return;
  isAnimating = true;

  // First reveal - show all service elements
  if (!serviceRevealed) {
    serviceRevealed = true;
    gsap.to(".service_border-text, .service_button", {
      autoAlpha: 1, 
      duration: 0.5, 
      ease: "none", 
      overwrite: true
    });
    gsap.to(".home_service-text", {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.25,
      overwrite: true
    });
  }

  // Update active text
  serviceTexts.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });

  // Update button visibility
  document.querySelectorAll(".service_button-wrapper").forEach(btn => {
    gsap.to(btn, {
      autoAlpha: btn.getAttribute("data-text") == index + 1 ? 1 : 0,
      duration: 0.5
    });
  });

  // First service reveal
  if (currentIndex === -1) {
    gsap.set(serviceImages[index], {
      visibility: "visible",
      opacity: 1,
      zIndex: 1,
      clipPath: clipHidden
    });

    gsap.to(serviceImages[index], {
      clipPath: clipVisible,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        currentIndex = index;
        isAnimating = false;
      }
    });
    return;
  }

  // Subsequent reveals - handle transitions
  const isNext = index > currentIndex;
  const prevIndex = currentIndex;

  if (isNext) {
    // Moving forward
    gsap.set(serviceImages[index], {
      visibility: "visible",
      opacity: 1,
      zIndex: 2,
      clipPath: clipHidden
    });
    gsap.set(serviceImages[prevIndex], { zIndex: 1 });

    gsap.to(serviceImages[index], {
      clipPath: clipVisible,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(serviceImages[prevIndex], { autoAlpha: 0, zIndex: 0, clipPath: "none" });
        gsap.set(serviceImages[index], { zIndex: 1 });
        currentIndex = index;
        isAnimating = false;
      }
    });
  } else {
    // Moving backward
    gsap.set(serviceImages[index], {
      visibility: "visible",
      opacity: 1,
      zIndex: 1,
      clipPath: clipVisible
    });
    gsap.set(serviceImages[prevIndex], { zIndex: 2 });

    gsap.to(serviceImages[prevIndex], {
      clipPath: clipHidden,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(serviceImages[prevIndex], { autoAlpha: 0, zIndex: 0, clipPath: "none" });
        gsap.set(serviceImages[index], { zIndex: 1 });
        currentIndex = index;
        isAnimating = false;
      }
    });
  }
}

/**
 * Resets service section to initial state
 * @param {NodeList} serviceImages - All service image elements
 * @param {NodeList} serviceTexts - All service text elements
 */
function resetServiceSection(serviceImages, serviceTexts) {
  if (isAnimating) {
    gsap.killTweensOf(serviceImages);
    gsap.killTweensOf(".service_border-text, .service_button");
    gsap.killTweensOf(".home_service-text");
  }
  
  serviceImages.forEach(img => {
    gsap.set(img, { autoAlpha: 0, zIndex: 0, clipPath: "none" });
  });
  
  gsap.set(".service_border-text, .service_button", { autoAlpha: 0, overwrite: true });
  serviceTexts.forEach(t => t.classList.remove("active"));
  gsap.set(".home_service-text", { 
    autoAlpha: 0, 
    y: 30, 
    filter: "blur(8px)", 
    scale: 0.85, 
    overwrite: true 
  });
  
  document.querySelectorAll(".service_button-wrapper").forEach(btn => {
    gsap.set(btn, { autoAlpha: btn.getAttribute("data-text") == "1" ? 1 : 0 });
  });
  
  currentIndex = -1;
  serviceRevealed = false;
  isAnimating = false;
}

/**
 * Initializes service section event listeners
 * @param {NodeList} serviceTexts - All service text elements
 * @param {NodeList} serviceImages - All service image elements
 */
function initServiceListeners(serviceTexts, serviceImages) {
  serviceTexts.forEach((text, i) => {
    text.addEventListener("click", () => {
      if (isAnimating || currentIndex === i) return;
      revealService(i, serviceImages, serviceTexts);
    });
  });
}

// Export functions for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    revealService, 
    resetServiceSection, 
    initServiceListeners,
    getServiceRevealed: () => serviceRevealed,
    setServiceRevealed: (value) => { serviceRevealed = value; }
  };
}
