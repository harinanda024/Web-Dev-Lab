// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after selecting a section
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Light and dark theme
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const darkModeOn = document.body.classList.contains("dark");
  themeToggle.textContent = darkModeOn ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", darkModeOn ? "Switch to light theme" : "Switch to dark theme");
});

// Highlight the section currently in view
const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

pageSections.forEach((section) => sectionObserver.observe(section));

// Contact form: front-end validation only (no backend/email service)
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formMessage.style.color = "#b34436";
    formMessage.textContent = "Please complete all three fields.";
    return;
  }

  if (!emailPattern.test(email)) {
    formMessage.style.color = "#b34436";
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }

  formMessage.style.color = "#557348";
  formMessage.textContent = `Thanks, ${name}. The form has been validated successfully.`;
  contactForm.reset();
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
