// Font loading verification
document.fonts.ready.then(() => {
  console.log("Fonts loaded successfully!");

  // Check if Acumin Pro Wide is loaded
  if (document.fonts.check("1em acumin-pro")) {
    console.log("✅ Acumin Pro Wide is loaded and working!");
  } else {
    console.log("❌ Acumin Pro Wide not detected, using fallback fonts");

    // Try to load the font manually
    const fontFace = new FontFace(
      "acumin-pro",
      "url(assets/fonts/acuminprowide-regular-webfont.woff2)"
    );
    fontFace
      .load()
      .then((loadedFace) => {
        document.fonts.add(loadedFace);
        console.log("✅ Acumin Pro Wide manually loaded!");
      })
      .catch((error) => {
        console.log("❌ Failed to manually load Acumin Pro Wide:", error);
      });
  }
});

// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

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
    navLinks.classList.remove("active");
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

// Mouse wheel scrolling for badges section
const badgesScroll = document.querySelector(".badges-scroll");
const badgesSection = document.querySelector(".badges-section");
const badgeItems = document.querySelectorAll(".badge-item");

if (badgesScroll && badgesSection) {
  let currentPatternOffset = 0;
  let targetPatternOffset = 0;
  let animationId = null;
  let currentCenterIndex = 0;

  // Function to update center company
  function updateCenterCompany() {
    badgeItems.forEach((item, index) => {
      item.classList.remove("center", "side");
      if (index === currentCenterIndex) {
        item.classList.add("center");
      } else {
        item.classList.add("side");
      }
    });
  }

  // Function to find which item is closest to center
  function updateCenterIndex() {
    const containerWidth = badgesScroll.offsetWidth;
    const scrollLeft = badgesScroll.scrollLeft;
    const centerPoint = scrollLeft + containerWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    badgeItems.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(itemCenter - centerPoint);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentCenterIndex) {
      currentCenterIndex = closestIndex;
      updateCenterCompany();
    }
  }

  // Function to smoothly animate pattern position
  const smoothUpdatePattern = () => {
    const maxScroll = badgesScroll.scrollWidth - badgesScroll.clientWidth;
    if (maxScroll <= 0) return; // Prevent division by zero

    const scrollPercent = badgesScroll.scrollLeft / maxScroll;
    targetPatternOffset = scrollPercent * 200; // Target position

    // Cancel any existing animation
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    // Smooth animation function
    const animate = () => {
      const difference = targetPatternOffset - currentPatternOffset;

      // If the difference is very small, stop animating
      if (Math.abs(difference) < 0.1) {
        currentPatternOffset = targetPatternOffset;
        badgesSection.style.backgroundPosition = `${-currentPatternOffset}px 0`;
        return;
      }

      // Smooth interpolation (easing)
      currentPatternOffset += difference * 0.15; // Adjust this value for smoothness (0.1 = slower, 0.3 = faster)
      badgesSection.style.backgroundPosition = `${-currentPatternOffset}px 0`;

      animationId = requestAnimationFrame(animate);
    };

    animate();
  };

  badgesScroll.addEventListener("wheel", (e) => {
    // Allow natural scrolling - don't prevent default
    // Reduce scroll sensitivity for smoother movement
    badgesScroll.scrollLeft += e.deltaY * 1;
    smoothUpdatePattern();
    updateCenterIndex();
  });

  // Add touch/swipe support for mobile
  let startX = 0;
  let scrollLeft = 0;

  badgesScroll.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - badgesScroll.offsetLeft;
    scrollLeft = badgesScroll.scrollLeft;
  });

  badgesScroll.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const x = e.touches[0].pageX - badgesScroll.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced sensitivity
    badgesScroll.scrollLeft = scrollLeft - walk;
    smoothUpdatePattern();
    updateCenterIndex();
  });

  // Click to center functionality
  badgeItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const containerCenter = badgesScroll.offsetWidth / 2;
      const scrollPosition = itemCenter - containerCenter;

      badgesScroll.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      currentCenterIndex = index;
      updateCenterCompany();
    });
  });

  // Initialize center company
  updateCenterCompany();
}

// Load Lottie animations
document.addEventListener("DOMContentLoaded", function () {
  // Wait a bit to ensure DOM is fully loaded
  setTimeout(() => {
    // Load why section animation
    const whyAnimationElement = document.getElementById("why-animation");
    if (whyAnimationElement) {
      console.log("Loading why animation...");
      try {
        const whyAnimation = lottie.loadAnimation({
          container: whyAnimationElement,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "assets/animations/BITKAT_POOR_500_V2/BITKAT_POOR_500_V2.json",
        });

        whyAnimation.addEventListener("DOMLoaded", () => {
          console.log("✅ Why animation loaded successfully");
        });

        whyAnimation.addEventListener("data_failed", () => {
          console.log("❌ Why animation failed to load");
        });
      } catch (error) {
        console.log("❌ Error loading why animation:", error);
      }
    } else {
      console.log("❌ Why animation element not found");
    }

    // Load how section animation (coin)
    const howAnimationElement = document.getElementById("how-animation");
    if (howAnimationElement) {
      console.log("Loading how animation...");
      try {
        const howAnimation = lottie.loadAnimation({
          container: howAnimationElement,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "assets/animations/BB_KOIN/BB_KOIN.json",
        });

        howAnimation.addEventListener("DOMLoaded", () => {
          console.log("✅ How animation loaded successfully");
        });

        howAnimation.addEventListener("data_failed", () => {
          console.log("❌ How animation failed to load");
        });
      } catch (error) {
        console.log("❌ Error loading how animation:", error);
      }
    } else {
      console.log("❌ How animation element not found");
    }
  }, 100);
});

// Calculator Functionality - NEW
document.addEventListener("DOMContentLoaded", function () {
  const calcInput = document.querySelector(".calc-input");
  const calcSelect = document.querySelector(".calc-select");
  const calcResult = document.querySelector(".calc-result");

  if (calcInput && calcSelect && calcResult) {
    function calculateSavings() {
      const monthlyEarnings = parseFloat(calcInput.value) || 0;
      const selectedRate = parseFloat(calcSelect.value) || 0;

      // Only show placeholder messages if BOTH are not filled
      if (monthlyEarnings === 0 && selectedRate === 0) {
        calcResult.textContent = "Enter your monthly earnings";
        calcResult.classList.remove("bulge");
        return;
      }

      if (monthlyEarnings === 0) {
        calcResult.textContent = "Enter your monthly earnings";
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
      const annualEarnings = monthlyEarnings * 12;
      const currentCost = (annualEarnings * selectedRate) / 100;
      const barebitsCost = (annualEarnings * barebitsRate) / 100;
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
  }
});

// Enhanced Companies Section - NEW FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  const enhancedSection = document.querySelector(".enhanced-companies-section");
  const enhancedScroll = document.querySelector(".enhanced-companies-scroll");
  const enhancedItems = document.querySelectorAll(".enhanced-badge-item");

  if (!enhancedSection || !enhancedScroll || !enhancedItems.length) {
    console.log("Enhanced companies section not found");
    return;
  }

  let currentIndex = 0;
  let lastScrollDirection = "right";
  let isScrolling = false;
  let patternOffset = 0;
  let patternDirection = 1; // 1 for right, -1 for left

  // Initialize center company
  function updateCenterCompany() {
    enhancedItems.forEach((item, index) => {
      item.classList.remove("center", "side");
      if (index === currentIndex) {
        item.classList.add("center");
      } else {
        item.classList.add("side");
      }
    });
  }

  // Calculate scroll position to center an item
  function getScrollPositionForCenter(index) {
    const item = enhancedItems[index];
    if (!item) return 0;

    const containerWidth = enhancedScroll.offsetWidth;
    const itemWidth = item.offsetWidth;
    const itemOffsetLeft = item.offsetLeft;

    // Calculate position to center the item in the container
    const centerPosition = itemOffsetLeft - containerWidth / 2 + itemWidth / 2;

    return Math.max(0, centerPosition);
  }

  // Scroll to specific company
  function scrollToCompany(index) {
    if (isScrolling) return;

    isScrolling = true;
    currentIndex = Math.max(0, Math.min(index, enhancedItems.length - 1));

    const scrollPosition = getScrollPositionForCenter(currentIndex);

    // Smooth scroll to the calculated position
    enhancedScroll.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    updateCenterCompany();

    setTimeout(() => {
      isScrolling = false;
    }, 500);
  }

  // Handle wheel scroll
  enhancedScroll.addEventListener("wheel", function (e) {
    e.preventDefault();

    if (isScrolling) return;

    const direction = e.deltaY > 0 ? "right" : "left";
    lastScrollDirection = direction;

    // Update pattern direction
    patternDirection = direction === "right" ? 1 : -1;

    if (direction === "right" && currentIndex < enhancedItems.length - 1) {
      scrollToCompany(currentIndex + 1);
    } else if (direction === "left" && currentIndex > 0) {
      scrollToCompany(currentIndex - 1);
    }
  });

  // Continuous pattern scrolling
  function animatePattern() {
    patternOffset += patternDirection * 0.5;
    enhancedSection.style.backgroundPosition = `${patternOffset}px 0`;
    requestAnimationFrame(animatePattern);
  }

  // Initialize - start with first company centered
  updateCenterCompany();
  // Center the first company on load
  setTimeout(() => {
    scrollToCompany(0);
  }, 100);
  animatePattern();

  // Click to center
  enhancedItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      scrollToCompany(index);
    });
  });

  console.log("✅ Enhanced companies section initialized");
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
