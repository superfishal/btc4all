// Font loading verification
document.fonts.ready.then(() => {
  // Check if Acumin Pro Wide is loaded
  if (!document.fonts.check("1em acumin-pro")) {
    // Try to load the font manually
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const fontPath = isInPagesFolder 
      ? '../assets/fonts/acuminprowide-regular-webfont.woff2'
      : 'assets/fonts/acuminprowide-regular-webfont.woff2';
    
    const fontFace = new FontFace("acumin-pro", `url(${fontPath})`);
    fontFace
      .load()
      .then((loadedFace) => {
        document.fonts.add(loadedFace);
      })
      .catch(() => {
        // Font failed to load, fallback fonts will be used
      });
  }
});

// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Smooth scrolling for navigation links
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
    // Close mobile menu if open
    if (navLinks) {
      navLinks.classList.remove("active");
    }
  });
});

// Scroll animations for pitch section
const pitchObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  }
);

// Observe all pitch steps
document.querySelectorAll(".pitch-step").forEach((step) => {
  pitchObserver.observe(step);
});

// Fee Calculator Functionality
const calculateBtn = document.getElementById("calculateBtn");
const monthlyRevenueInput = document.getElementById("monthlyRevenue");
const processingFeeSelect = document.getElementById("processingFee");
const calculatorResults = document.getElementById("calculatorResults");

// Pre-populate with common values (only if elements exist)
if (monthlyRevenueInput) {
  monthlyRevenueInput.value = "50000";
}
if (processingFeeSelect) {
  processingFeeSelect.value = "5.0";
}

function calculateSavings() {
  const monthlyRevenue = parseFloat(monthlyRevenueInput.value) || 0;
  const processingFee = parseFloat(processingFeeSelect.value) || 0;

  if (monthlyRevenue === 0) {
    alert("Please enter your monthly revenue");
    return;
  }

  // Calculate current costs
  const currentCost = (monthlyRevenue * processingFee) / 100;

  // BareBits Lightning Network costs (2% fee)
  const barebitsMonthlyCost = monthlyRevenue * 0.02; // 2% fee
  const barebitsAnnualCost = barebitsMonthlyCost * 12;

  // Current costs (annual)
  const currentAnnualCost = currentCost * 12;

  // Calculate savings
  const monthlySavings = currentCost - barebitsMonthlyCost;
  const annualSavings = currentAnnualCost - barebitsAnnualCost;

  // Update BareBits fees with animation
  animateValue("barebitsMonthlyFee", 0, barebitsMonthlyCost, 1000);
  animateValue("barebitsAnnualFee", 0, barebitsAnnualCost, 1000);

  // Update current fees with animation
  animateValue("currentMonthlyFee", 0, currentCost, 1000);
  animateValue("currentAnnualFee", 0, currentAnnualCost, 1000);

  // Update results with animation
  animateValue("monthlySavings", 0, monthlySavings, 1000);
  animateValue("annualSavings", 0, annualSavings, 1000);
}

function animateValue(elementId, start, end, duration) {
  const element = document.getElementById(elementId);
  const startTime = performance.now();

  function updateValue(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * easeOutQuart;

    // Format number with commas and no decimal places
    element.textContent = Math.round(current).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  }

  requestAnimationFrame(updateValue);
}

// Event listeners (only if elements exist)
if (calculateBtn) {
  calculateBtn.addEventListener("click", calculateSavings);
}

// Allow Enter key on input (only if element exists)
if (monthlyRevenueInput) {
  monthlyRevenueInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      calculateSavings();
    }
  });
}

// Load Lottie animations
document.addEventListener("DOMContentLoaded", function () {
  // Determine base path based on current page location
  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const basePath = isInPagesFolder ? '../assets' : 'assets';
  
  // Wait a bit to ensure DOM is fully loaded
  setTimeout(() => {
    // Load why section animation
    const whyAnimationElement = document.getElementById("why-animation");
    if (whyAnimationElement && typeof lottie !== "undefined") {
      try {
        lottie.loadAnimation({
          container: whyAnimationElement,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: `${basePath}/animations/BITKAT_POOR_500_V2/BITKAT_POOR_500_V2.json`,
        });
      } catch (error) {
        // Animation failed to load
      }
    }

    // Load how section animation (coin)
    const howAnimationElement = document.getElementById("how-animation");
    if (howAnimationElement && typeof lottie !== "undefined") {
      try {
        lottie.loadAnimation({
          container: howAnimationElement,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: `${basePath}/animations/BB_KOIN/BB_KOIN.json`,
        });
      } catch (error) {
        // Animation failed to load
      }
    }
  }, 100);
});

// Calculator Functionality - NEW
document.addEventListener("DOMContentLoaded", function () {
  const calcInput = document.querySelector(".calc-input");
  const calcSelect = document.querySelector(".calc-select");
  const calcResult = document.querySelector(".calc-result");

  if (calcInput && calcSelect && calcResult) {
    // Set default values and calculate on load
    function initializeCalculator() {
      // Default values are set in HTML, now calculate
      const monthlyRevenue = parseFloat(calcInput.value) || 0;
      const selectedRate = parseFloat(calcSelect.value) || 0;

      if (monthlyRevenue > 0 && selectedRate > 0) {
        calculateSavings();
      }
    }

    function calculateSavings() {
      const monthlyRevenue = parseFloat(calcInput.value) || 0;
      const selectedRate = parseFloat(calcSelect.value) || 0;

      // Only show placeholder messages if BOTH are not filled
      if (monthlyRevenue === 0 && selectedRate === 0) {
        calcResult.textContent = "Enter your monthly revenue";
        calcResult.classList.remove("bulge");
        return;
      }

      if (monthlyRevenue === 0) {
        calcResult.textContent = "Enter your monthly revenue";
        calcResult.classList.remove("bulge");
        return;
      }

      if (selectedRate === 0) {
        calcResult.textContent = "Select your processing fee";
        calcResult.classList.remove("bulge");
        return;
      }

      // Both are filled - calculate and animate!
      const barebitsRate = 2; // BareBits rate
      const annualRevenue = monthlyRevenue * 12;
      const currentCost = (annualRevenue * selectedRate) / 100;
      const barebitsCost = (annualRevenue * barebitsRate) / 100;
      const savings = currentCost - barebitsCost;

      // Format the result
      const formattedSavings = Math.round(savings).toLocaleString();
      calcResult.textContent = `You save $${formattedSavings}/year with BareBits!`;

      // Trigger animation by removing and re-adding the class
      calcResult.classList.remove("bulge");
      // Use setTimeout to trigger the animation on the next frame
      setTimeout(() => {
        calcResult.classList.add("bulge");
      }, 10);
    }

    // Calculate on input change - wait for blur/enter on input
    calcInput.addEventListener("blur", calculateSavings);
    calcInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        calculateSavings();
      }
    });

    // Dropdown triggers immediately on change
    calcSelect.addEventListener("change", calculateSavings);

    // Initialize calculator with default values
    initializeCalculator();
  }
});

// Carousel badge logos - main centered, 1 on each side, rest hidden
document.addEventListener("DOMContentLoaded", function () {
  const badgesScroll = document.querySelector(".badges-scroll");
  if (!badgesScroll) return;

  const items = badgesScroll.querySelectorAll(".badge-item");
  if (items.length === 0) return;

  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      // Remove all classes first
      item.classList.remove("active", "prev", "next");

      // Only show current, previous, and next
      if (index === currentIndex) {
        item.classList.add("active");
      } else if (index === (currentIndex - 1 + items.length) % items.length) {
        item.classList.add("prev");
      } else if (index === (currentIndex + 1) % items.length) {
        item.classList.add("next");
      }
      // All others remain hidden (no class, so they stay at opacity: 0)
    });
  }

  // Initialize
  updateCarousel();

  // Auto-rotate
  setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }, 3000);
});

// Carousel integration logos - main centered, 1 on each side, rest hidden (for mobile)
document.addEventListener("DOMContentLoaded", function () {
  const integrationsScroll = document.querySelector(".integrations-scroll");
  if (!integrationsScroll) return;

  // Get only the actual integration-item divs (not the divider lines)
  const items = integrationsScroll.querySelectorAll(".integration-item");
  if (items.length === 0) return;

  let currentIndex = 0;

  function updateCarousel() {
    items.forEach((item, index) => {
      // Remove all classes first
      item.classList.remove("active", "prev", "next");

      // Only show current, previous, and next
      if (index === currentIndex) {
        item.classList.add("active");
      } else if (index === (currentIndex - 1 + items.length) % items.length) {
        item.classList.add("prev");
      } else if (index === (currentIndex + 1) % items.length) {
        item.classList.add("next");
      }
      // All others remain hidden
    });
  }

  // Initialize
  updateCarousel();

  // Auto-rotate
  setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }, 3000);
});

// Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const content = item.querySelector(".accordion-content");
      const icon = this.querySelector(".accordion-icon");
      const isActive = item.classList.contains("active");

      // Close all other items
      document
        .querySelectorAll(".accordion-item")
        .forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            otherItem.querySelector(".accordion-icon").textContent = "+";
          }
        });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        icon.textContent = "+";
      } else {
        item.classList.add("active");
        icon.textContent = "−";
      }
    });
  });
});
