// DOM elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile navigation toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Initialize parallax on page load to prevent snap
document.addEventListener("DOMContentLoaded", () => {
  const parallax = document.querySelector(".hero-parallax");
  if (parallax) {
    parallax.style.transform = `translateY(0px)`;
    parallax.style.willChange = "transform";
  }
});

// Scroll animations for content sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all content sections
document.addEventListener("DOMContentLoaded", () => {
  const contentSections = document.querySelectorAll(".content-section");
  contentSections.forEach((section) => {
    observer.observe(section);
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize navbar background
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.background = "rgba(51, 51, 51, 0.95)";
  }
});

// Image lazy loading
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
});

// CTA Button interactions
document.addEventListener("DOMContentLoaded", () => {
  const ctaButton = document.querySelector(".cta-button");

  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ctaButton.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      // WhatsApp link will handle the redirection automatically
    });
  }
});

// Add ripple effect CSS dynamically
const style = document.createElement("style");
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll handling with requestAnimationFrame
let ticking = false;

function updateScrollEffects() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-parallax");
  const navbar = document.querySelector(".navbar");

  // Smooth parallax effect
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
  }

  // Navbar background transition
  if (navbar) {
    if (scrolled > 100) {
      navbar.style.background = "rgba(51, 51, 51, 0.98)";
    } else {
      navbar.style.background = "rgba(51, 51, 51, 0.95)";
    }
  }

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });

// Preload critical images
document.addEventListener("DOMContentLoaded", () => {
  const criticalImages = ["images/saloneachrafieh-1.jpeg"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = src;
    link.as = "image";
    document.head.appendChild(link);
  });
});

// Add loading states
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Error handling for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      console.warn(`Failed to load image: ${img.src}`);
    });
  });
});

// Accessibility enhancements
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Add focus management for mobile menu
hamburger.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    const firstLink = navMenu.querySelector(".nav-link");
    if (firstLink) {
      firstLink.focus();
    }
  }
});

console.log("Salon E Achrafieh website loaded successfully!");
