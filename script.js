// Keshot Website JavaScript - Premium Interactions & Animations

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Keshot website loaded successfully!");

  // Initialize all features
  initMobileMenu();
  initScrollAnimations();
  initSmoothScrolling();
  initHeaderEffects();
  initButtonInteractions();
  initFloatingAssistance();
  initImageAnimations();
  initParallaxEffects();
  initAccessibilityFeatures();

  console.log("✨ All interactive features initialized");
});

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburgerLines = document.querySelectorAll(".hamburger-line");
  const navLinks = document.querySelectorAll(".nav-mobile .nav-link");

  if (!mobileMenuToggle || !mobileMenu) return;

  let isMenuOpen = false;

  // Toggle menu function
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden";

      // Animate hamburger to X
      hamburgerLines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      hamburgerLines[1].style.opacity = "0";
      hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";

      // Animate X back to hamburger
      hamburgerLines[0].style.transform = "";
      hamburgerLines[1].style.opacity = "";
      hamburgerLines[2].style.transform = "";
    }
  }

  // Event listeners
  mobileMenuToggle.addEventListener("click", toggleMenu);

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      toggleMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isMenuOpen &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      toggleMenu();
    }
  });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
  const animateElements = document.querySelectorAll(`
        .formula-card, .product-card, .step-card, .testimonial-card, 
        .blog-card, .brand-card, .service-item
    `);

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Set initial state and observe elements
  animateElements.forEach((element) => {
    element.classList.add("animate-on-scroll");
    observer.observe(element);
  });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just a hash or external link
      if (href === "#" || href.includes("mailto:") || href.includes("tel:")) {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector(".header").offsetHeight;
        const elementPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Header Effects on Scroll
function initHeaderEffects() {
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.95)";
      header.style.backdropFilter = "blur(25px)";
      header.style.borderBottomColor = "rgba(255, 255, 255, 0.15)";
    } else {
      header.style.background = "rgba(0, 0, 0, 0.8)";
      header.style.backdropFilter = "blur(20px)";
      header.style.borderBottomColor = "rgba(255, 255, 255, 0.1)";
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// Enhanced Button Interactions
function initButtonInteractions() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    // Hover effects
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    // Click ripple effect for primary buttons
    if (button.classList.contains("btn-primary")) {
      button.addEventListener("click", function (e) {
        createRippleEffect(e, this);
      });
    }

    // Focus effects for accessibility
    button.addEventListener("focus", function () {
      this.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.3)";
    });

    button.addEventListener("blur", function () {
      this.style.boxShadow = "";
    });
  });
}

// Create Ripple Effect
function createRippleEffect(event, element) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ripple = document.createElement("span");
  ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Floating Assistance Button
function initFloatingAssistance() {
  const floatingBtn = document.querySelector(".floating-assistance");

  if (!floatingBtn) return;

  // Click handler
  floatingBtn.addEventListener("click", function () {
    // You can customize this action
    window.location.href = "tel:702-903-3970";
  });

  // Hover effects
  floatingBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.boxShadow = "0 8px 25px rgba(14, 165, 233, 0.4)";
  });

  floatingBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.4)";
  });

  // Show/hide based on scroll position
  let isVisible = true;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Hide when near footer
    if (scrollY + windowHeight > documentHeight - 200) {
      if (isVisible) {
        floatingBtn.style.transform = "scale(0)";
        floatingBtn.style.opacity = "0";
        isVisible = false;
      }
    } else {
      if (!isVisible) {
        floatingBtn.style.transform = "scale(1)";
        floatingBtn.style.opacity = "1";
        isVisible = true;
      }
    }
  });
}

// Image Loading Animations
function initImageAnimations() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    // Set initial state
    img.style.opacity = "0";
    img.style.transform = "scale(0.95)";
    img.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    // Handle load event
    function handleImageLoad() {
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }

    if (img.complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
    }

    // Error handling
    img.addEventListener("error", function () {
      this.style.opacity = "0.5";
      this.style.transform = "scale(1)";
    });
  });
}

// Parallax Effects for Hero Images
function initParallaxEffects() {
  const heroImages = document.querySelectorAll(".hero-image");
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    heroImages.forEach((image, index) => {
      const multiplier = (index + 1) * 0.1;
      image.style.transform = `translateY(${rate * multiplier}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// Accessibility Features
function initAccessibilityFeatures() {
  // Focus management
  const focusableElements = document.querySelectorAll(`
        button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])
    `);

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #0EA5E9";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "";
      this.style.outlineOffset = "";
    });
  });

  // Reduced motion support
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty(
      "--animation-duration",
      "0.01ms"
    );

    // Disable floating animations
    const floatingElements = document.querySelectorAll(".hero-image");
    floatingElements.forEach((element) => {
      element.style.animation = "none";
    });
  }

  // High contrast support
  if (window.matchMedia("(prefers-contrast: high)").matches) {
    document.documentElement.style.setProperty("--accent-color", "#00BFFF");
  }
}

// Card Hover Effects
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(`
        .formula-card, .product-card, .step-card, 
        .testimonial-card, .blog-card, .brand-card
    `);

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "";
    });
  });
});

// Play Button Interaction
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play-button");

  if (playButton) {
    playButton.addEventListener("click", function () {
      // Add your video play logic here
      console.log("Play button clicked - implement video player");

      // Example: You could open a modal with video or redirect to video
      // For now, we'll just add a visual feedback
      this.style.transform = "translate(-50%, -50%) scale(0.9)";
      setTimeout(() => {
        this.style.transform = "translate(-50%, -50%) scale(1.1)";
      }, 150);
    });
  }
});

// Form Interactions (if any forms are added later)
function initFormInteractions() {
  const inputs = document.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
      if (this.value) {
        this.parentElement.classList.add("filled");
      } else {
        this.parentElement.classList.remove("filled");
      }
    });
  });
}

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Enhanced hover states */
    .btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .floating-assistance {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Smooth focus transitions */
    button:focus,
    a:focus {
        transition: box-shadow 0.2s ease;
    }
`;

document.head.appendChild(style);

// Console styling for development
console.log(
  "%c🎨 Keshot Website",
  "color: #0EA5E9; font-size: 20px; font-weight: bold;"
);
console.log(
  "%c✨ Premium interactions loaded",
  "color: #8B5CF6; font-size: 14px;"
);
console.log(
  "%c🚀 Ready for an amazing experience!",
  "color: #10B981; font-size: 14px;"
);
const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});
