// Font loading verification
document.fonts.ready.then(() => {
  console.log("Fonts loaded successfully!");
  if (document.fonts.check("1em acumin-pro")) {
    console.log("✅ Acumin Pro Wide is loaded and working!");
  } else {
    console.log("❌ Acumin Pro Wide not detected, using fallback fonts");
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

// Pre-populate with common values
monthlyRevenueInput.value = "50000";
processingFeeSelect.value = "5.0";

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

// Event listeners
calculateBtn.addEventListener("click", calculateSavings);

// Allow Enter key on input
monthlyRevenueInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    calculateSavings();
  }
});

// Mouse wheel scrolling for badges section
const badgesScroll = document.querySelector(".badges-scroll");
const badgesSection = document.querySelector(".badges-section");

if (badgesScroll && badgesSection) {
  let currentPatternOffset = 0;
  let targetPatternOffset = 0;
  let animationId = null;

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
    e.preventDefault();
    // Reduce scroll sensitivity for smoother movement
    badgesScroll.scrollLeft += e.deltaY * 1;
    smoothUpdatePattern();
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
  });
}

// Load Lottie animations
document.addEventListener("DOMContentLoaded", function () {
  // Load why section animation
  const whyAnimationElement = document.getElementById("why-animation");
  if (whyAnimationElement) {
    const whyAnimation = lottie.loadAnimation({
      container: whyAnimationElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "assets/animations/BITKAT_POOR_500_V2/BITKAT_POOR_500_V2.json",
    });
  }

  // Load how section animation (coin)
  const howAnimationElement = document.getElementById("how-animation");
  if (howAnimationElement) {
    const howAnimation = lottie.loadAnimation({
      container: howAnimationElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "assets/animations/BB_KOIN/BB_KOIN.json",
    });
  }
});
