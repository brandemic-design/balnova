/**
 * About Section Animations
 * Handles about section reveal and exit animations
 */

let aboutLeftClip = { x2: 30, x4: 76 };
let textAnimated = false;
let aboutRevealed = false;
let aboutExiting = false;
let aboutClipTl = null;
let split = null;

/**
 * Initializes the about section
 */
function initAboutSection() {
  split = new SplitText(".home_about-text", { type: "lines", mask: "lines" });
}

/**
 * Plays the about section reveal animation
 */
function playAboutReveal() {
  if (aboutRevealed) return;
  aboutRevealed = true;
  aboutExiting = false;

  aboutLeftClip.x2 = 0;
  aboutLeftClip.x4 = 0;

  aboutClipTl = gsap.timeline();

  aboutClipTl.to(aboutLeftClip, {
    x2: 30, 
    x4: 76, 
    duration: 1.2, 
    ease: "power2.out",
    onUpdate: () => {
      document.querySelector(".home_about-left").style.clipPath = 
        `polygon(0 0, ${aboutLeftClip.x2}% 0, ${aboutLeftClip.x4}% 100%, 0 100%)`;
    },
    onComplete: () => {
      if (textAnimated) return;
      textAnimated = true;
      gsap.set(".home_about-text", { autoAlpha: 1 });
      gsap.from(split.lines, { 
        opacity: 0,
        duration: 2,
        ease: "sine.out",
        stagger: 0.1,
      });
      gsap.to(".about_image-wrapper", { 
        y: "0%", 
        duration: 0.8, 
        ease: "power3", 
        stagger: 0.25,
        onComplete: () => {
          gsap.to(".about_design-wrapper", { x: "0%", duration: 0.8 });
        }
      });
      gsap.set(".home_about-left", { 
        clipPath: "polygon(0px 0px, 30% 0px, 76% 100%, 0px 100%)" 
      });
    }
  });
}

/**
 * Plays the about section exit animation
 */
function playAboutExit() {
  if (aboutExiting || !aboutRevealed) return;
  aboutExiting = true;

  const exitTl = gsap.timeline({
    onComplete: () => {
      aboutRevealed = false;
      textAnimated = false;
      aboutExiting = false;

      gsap.set(".home_about-text", { autoAlpha: 0, x: "0%" });
      gsap.set(".about_image-wrapper", { y: "100%" });
      gsap.set(".about_design-wrapper", { x: "100%" });
      gsap.set(".home_about-left", { 
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" 
      });

      aboutLeftClip.x2 = 30;
      aboutLeftClip.x4 = 76;
    }
  });

  exitTl
    .to(".home_about-text", { x: "0%", duration: 0.8, ease: "power3.in" })
    .to(".about_image-wrapper", { y: "100%", duration: 0.8, ease: "power3.in" }, "<")
    .to(".about_design-wrapper", { x: "100%", duration: 0.8, ease: "power3.in" }, "<")
    .add(() => {
      if (aboutClipTl) {
        aboutClipTl.reverse();
      }
    }, "<");
}

/**
 * Gets the about left clip object for timeline updates
 */
function getAboutLeftClip() {
  return aboutLeftClip;
}

// Export functions for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    initAboutSection,
    playAboutReveal, 
    playAboutExit,
    getAboutLeftClip,
    getAboutRevealed: () => aboutRevealed,
    getAboutExiting: () => aboutExiting
  };
}
