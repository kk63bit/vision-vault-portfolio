const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Animate content into view, with a fallback for browsers without IntersectionObserver.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const emptyMessage = document.querySelector(".project-empty");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let visibleCount = 0;
    projectCards.forEach(card => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
  });
});
filterButtons.forEach(button => button.setAttribute("aria-pressed", String(button.classList.contains("active"))));

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Copy a small, safe piece of text to clipboard. No personal contact details are embedded.
const copyButton = document.getElementById("copy-site");
const copyStatus = document.getElementById("copy-status");
if (copyButton && copyStatus) {
  copyButton.addEventListener("click", async () => {
    const text = "Karthik H. — Student, Python learner & content creator";
    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = "Portfolio title copied to your clipboard.";
    } catch {
      copyStatus.textContent = text;
    }
  });
}
