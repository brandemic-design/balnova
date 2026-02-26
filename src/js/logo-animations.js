/**
 * Logo Animations
 * Handles logo flip animations on scroll
 */

let logoFlipped = false;
let logoAnimating = false;

/**
 * Initializes logo scroll animations
 */
function initLogoAnimations() {
  const logoLink = document.querySelector(".header_logo-link");
  const mainLogo = document.querySelector(".main_logo");
  const logoSvg = document.querySelector(".logo_svg");

  ScrollTrigger.create({
    trigger: ".main-wrapper",
    start: "top top",
    end: "+=1800",
    onUpdate: (self) => {
      // Flip logo when scrolling down
      if (self.progress > 0.05 && !logoFlipped) {
        logoFlipped = true;
        if (logoAnimating) {
          gsap.killTweensOf(mainLogo);
          gsap.killTweensOf(logoSvg);
        }
        logoAnimating = true;
        const state = Flip.getState(logoSvg);
        gsap.to(mainLogo, {
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          transformOrigin: "right right",
          onComplete: () => {
            gsap.to(mainLogo, {
              width: 0
            });
          }
        });
        logoLink.style.justifyContent = "center";
        Flip.from(state, {
          duration: 1,
          ease: "power3.out",
          onComplete: () => { logoAnimating = false; }
        });
      }

      // Unflip logo when scrolling back up
      if (self.progress < 0.05 && logoFlipped) {
        logoFlipped = false;
        if (logoAnimating) {
          gsap.killTweensOf(mainLogo);
          gsap.killTweensOf(logoSvg);
        }
        logoAnimating = true;
        const state = Flip.getState(logoSvg);
        gsap.to(mainLogo, {
          opacity: 1,
          width: "auto",
          duration: 1,
          ease: "power3.out",
          transformOrigin: "right right"
        });
        logoLink.style.justifyContent = "";
        Flip.from(state, {
          duration: 1,
          ease: "power3.out",
          onComplete: () => { logoAnimating = false; }
        });
      }
    }
  });
}

// Export function for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLogoAnimations };
}
