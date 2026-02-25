/**
 * Balnova Homepage Animations
 * Main animation file for homepage interactions
 * Organized into logical sections for better understanding
 */

// ============================================================================
// HERO SECTION ANIMATIONS
// ============================================================================

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

// Initial hero animation on page load
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

// ============================================================================
// RIPPLE EFFECT INITIALIZATION
// ============================================================================

const img = new Image();
img.src = 'https://cdn.prod.website-files.com/6989b2816152e02c42b27db1/69946565ddabdcc627e1c8d7_image%20(1).webp';
img.onload = () => {
  $('#ripple').ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.01,
  });
};

// ============================================================================
// MAIN GSAP ANIMATIONS SETUP
// ============================================================================

document.addEventListener("DOMContentLoaded", (event) => {
  document.fonts.ready.then(() => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

    // Initial GSAP settings
    gsap.set(".section_home-about", { position: "absolute" });
    gsap.set(".section_home-service", { position: "absolute" });
    gsap.set(".home_about-text, .service_border-text, .service_button", { autoAlpha: 0 });
    gsap.set(".home_service-text", { autoAlpha: 0, y: 30, filter: "blur(8px)", scale: 0.85 });
    gsap.set(".about_image-wrapper", { y: "100%" });
    gsap.set(".about_design-wrapper", { x: "100%" });
    gsap.set(".home_about-left", { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" });

    // ========================================================================
    // SERVICE SECTION ANIMATIONS
    // ========================================================================

    const serviceImages = document.querySelectorAll(".home_service-image");
    const serviceTexts = document.querySelectorAll(".home_service-text");

    gsap.set(serviceImages, { autoAlpha: 0, zIndex: 0 });

    document.querySelectorAll(".service_button-wrapper").forEach(btn => {
      gsap.set(btn, { autoAlpha: btn.getAttribute("data-text") == "1" ? 1 : 0 });
    });

    let currentIndex = -1;
    let isAnimating = false;
    let serviceRevealed = false;

    const clipHidden = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
    const clipVisible = "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)";

    /**
     * Reveals a service by index
     */
    function revealService(index) {
      if (isAnimating) return;
      isAnimating = true;

      if (!serviceRevealed) {
        serviceRevealed = true;
        gsap.to(".service_border-text, .service_button", {
          autoAlpha: 1, duration: 0.5, ease: "none", overwrite: true
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

      serviceTexts.forEach((t, i) => {
        t.classList.toggle("active", i === index);
      });

      document.querySelectorAll(".service_button-wrapper").forEach(btn => {
        gsap.to(btn, {
          autoAlpha: btn.getAttribute("data-text") == index + 1 ? 1 : 0,
          duration: 0.5
        });
      });

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

      const isNext = index > currentIndex;
      const prevIndex = currentIndex;

      if (isNext) {
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

    // Service text click handlers
    serviceTexts.forEach((text, i) => {
      text.addEventListener("click", () => {
        if (isAnimating || currentIndex === i) return;
        revealService(i);
      });
    });

    // ========================================================================
    // ABOUT SECTION ANIMATIONS
    // ========================================================================

    let aboutLeftClip = { x2: 30, x4: 76 };
    let textAnimated = false;
    let aboutRevealed = false;
    let aboutExiting = false;
    let aboutClipTl = null;
    const split = new SplitText(".home_about-text", { type: "lines", mask: "lines" });

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
        x2: 30, x4: 76, duration: 1.2, ease: "power2.out",
        onUpdate: () => {
          document.querySelector(".home_about-left").style.clipPath = `polygon(0 0, ${aboutLeftClip.x2}% 0, ${aboutLeftClip.x4}% 100%, 0 100%)`;
        },
        onComplete: () => {
          if (textAnimated) return;
          textAnimated = true;
          gsap.fromTo(".home_about-content", { scale: 0.8 }, { scale: 1, duration: 5, ease: "none" });
          gsap.set(".home_about-content", { opacity: 1 });
          gsap.set(".home_about-text", { autoAlpha: 1 });
          gsap.from(split.lines, { opacity: 0,
            duration: 2,
            ease: "sine.out",
            stagger: 0.1, });
          gsap.to(".about_image-wrapper", { y: "0%", duration: 0.8, ease: "power3", stagger: 0.25,
            onComplete: () => {
              gsap.to(".about_design-wrapper", { x: "0%", duration: 0.8 });
            }
          });
          gsap.set(".home_about-left", { clipPath: "polygon(0px 0px, 30% 0px, 76% 100%, 0px 100%)" });
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
          gsap.set(".home_about-left", { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" });

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

    // ========================================================================
    // LOGO ANIMATIONS
    // ========================================================================

    const logoLink = document.querySelector(".header_logo-link");
    const mainLogo = document.querySelector(".main_logo");
    const logoSvg = document.querySelector(".logo_svg");
    let logoFlipped = false;
    let logoAnimating = false;

    ScrollTrigger.create({
      trigger: ".main-wrapper",
      start: "top top",
      end: "+=1800",
      onUpdate: (self) => {
        if (self.progress > 0.05 && !logoFlipped) {
          logoFlipped = true;
          if (logoAnimating) {
            gsap.killTweensOf(mainLogo);
            gsap.killTweensOf(logoSvg);
          }
          logoAnimating = true;
          const state = Flip.getState(logoSvg);
          gsap.to(mainLogo, {
            scaleX: 0,
            width: 0,
            duration: 1,
            ease: "power3.out",
            transformOrigin: "right right"
          });
          logoLink.style.justifyContent = "center";
          Flip.from(state, {
            duration: 1,
            ease: "power3.out",
            onComplete: () => { logoAnimating = false; }
          });
        }

        if (self.progress < 0.05 && logoFlipped) {
          logoFlipped = false;
          if (logoAnimating) {
            gsap.killTweensOf(mainLogo);
            gsap.killTweensOf(logoSvg);
          }
          logoAnimating = true;
          const state = Flip.getState(logoSvg);
          gsap.to(mainLogo, {
            scaleX: 1,
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

    // ========================================================================
    // MAIN SCROLL TIMELINE
    // ========================================================================

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
          if (self.progress > 0.15 && !aboutRevealed && !aboutExiting) {
            playAboutReveal();
          }

          if (scrollingUp && self.progress < 0.15 && aboutRevealed && !aboutExiting) {
            playAboutExit();
          }

          // Handle service section
          if (self.progress > 0.99 && !serviceRevealed) {
            revealService(0);
          }

          if (self.progress < 0.98 && serviceRevealed) {
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
            gsap.set(".home_service-text", { autoAlpha: 0, y: 30, filter: "blur(8px)", scale: 0.85, overwrite: true });
            document.querySelectorAll(".service_button-wrapper").forEach(btn => {
              gsap.set(btn, { autoAlpha: btn.getAttribute("data-text") == "1" ? 1 : 0 });
            });
            currentIndex = -1;
            serviceRevealed = false;
            isAnimating = false;
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
    .to(aboutLeftClip, {
      x2: 100, x4: 100, ease: "none",
      onUpdate: () => {
        document.querySelector(".home_about-left").style.clipPath = `polygon(0 0, ${aboutLeftClip.x2}% 0, ${aboutLeftClip.x4}% 100%, 0 100%)`;
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

  });
});