/**
 * Main Scroll Timeline
 * Handles the main scroll-triggered animations and coordinates all sections
 */

/**
 * Initializes the main scroll timeline and coordinates all animations
 * @param {Function} playHeroReveal - Function to play hero reveal
 * @param {Function} resetHeroAnimations - Function to reset hero animations
 * @param {Function} playAboutReveal - Function to play about reveal
 * @param {Function} playAboutExit - Function to play about exit
 * @param {Function} revealService - Function to reveal service
 * @param {Function} resetServiceSection - Function to reset service section
 * @param {Function} getAboutRevealed - Function to get about revealed state
 * @param {Function} getAboutExiting - Function to get about exiting state
 * @param {Function} getServiceRevealed - Function to get service revealed state
 * @param {Function} getAboutLeftClip - Function to get about left clip object
 * @param {NodeList} serviceImages - All service image elements
 * @param {NodeList} serviceTexts - All service text elements
 */
function initScrollTimeline(
  playHeroReveal,
  resetHeroAnimations,
  playAboutReveal,
  playAboutExit,
  revealService,
  resetServiceSection,
  getAboutRevealed,
  getAboutExiting,
  getServiceRevealed,
  getAboutLeftClip,
  serviceImages,
  serviceTexts
) {
  let prevProgress = 0;
  let heroCleared = false;

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-wrapper",
      start: "top top",
      end: "+=1000",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const scrollingUp = self.progress < prevProgress;

        // Handle hero animations
        if (!scrollingUp && self.progress > 0.3 && !heroCleared) {
          heroCleared = true;
          resetHeroAnimations();
        }

        if (scrollingUp && self.progress < 0.05 && heroCleared) {
          heroCleared = false;
          playHeroReveal();
        }

        // Handle about section
        if (self.progress > 0.15 && !getAboutRevealed() && !getAboutExiting()) {
          playAboutReveal();
        }

        if (scrollingUp && self.progress < 0.15 && getAboutRevealed() && !getAboutExiting()) {
          playAboutExit();
        }

        // Handle service section
        if (self.progress > 0.99 && !getServiceRevealed()) {
          revealService(0, serviceImages, serviceTexts);
        }

        if (self.progress < 0.98 && getServiceRevealed()) {
          resetServiceSection(serviceImages, serviceTexts);
        }

        prevProgress = self.progress;
      }
    }
  })
  .fromTo(".section_hero",
    { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)", ease: "none" },
    0)
  .to(".section_home-about", { y: 0, ease: "none" }, 0)
  .to({}, { duration: 1 })
  .to(".home_about-text", { x: "100%", ease: "power3.in" })
  .to(".about_image-wrapper", { opacity: 0, ease: "power3.in" }, "<")
  .to(".about_design-wrapper", { opacity: 0, ease: "power3.in" }, "<")
  .to(getAboutLeftClip(), {
    x2: 100, 
    x4: 100, 
    ease: "none",
    onUpdate: () => {
      document.querySelector(".home_about-left").style.clipPath = 
        `polygon(0 0, ${getAboutLeftClip().x2}% 0, ${getAboutLeftClip().x4}% 100%, 0 100%)`;
    }
  })
  .to(".home_about-left", { "--grad-angle": "-10deg", ease: "none" }, "<");

  // Background position animations
  mainTimeline
    .fromTo(".section_hero",
      { backgroundPositionY: "0px" },
      { backgroundPositionY: "-50px", ease: "none" },
      0)
    .fromTo(".section_home-about",
      { backgroundPositionY: "0px" },
      { backgroundPositionY: "-50px", ease: "none" },
      0);
}

// Export function for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initScrollTimeline };
}
