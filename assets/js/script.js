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

  // Lightning Network costs (essentially 0, but we'll show a tiny amount for realism)
  const lightningCost = monthlyRevenue * 0.0001; // 0.01% for exchange fees

  // Calculate savings
  const monthlySavings = currentCost - lightningCost;
  const annualSavings = monthlySavings * 12;

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

    element.textContent = current.toFixed(2);

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
