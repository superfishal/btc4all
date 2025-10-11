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

if (badgesScroll) {
  badgesScroll.addEventListener("wheel", (e) => {
    e.preventDefault();
    // Make scrolling more responsive
    badgesScroll.scrollLeft += e.deltaY * 2;
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
    const walk = (x - startX) * 2;
    badgesScroll.scrollLeft = scrollLeft - walk;
  });
}
