/* ==========================================================
   PROJECT DATA
   Edit this array with your real projects.
   category: "dev" or "design"  → controls color and filter
   link: paste the direct URL to the project's Behance case study
         (or any other live link). Leave "#" until you have one.
   ========================================================== */
const projects = [
  {
    title: "Salesforce Email Developer — Freelance",
    category: "dev",
    desc: "Responsive email templates in Salesforce Marketing Cloud, AMPscript personalization, audience segmentation and cross-device QA. 2025–Present.",
    link: "#",
  },
  {
    title: "Front-End Developer / UI Designer — Grownet App",
    category: "dev",
    desc: "Web and mobile layouts for a supplier-management platform used by teams in London, applying UI/UX principles and front-end implementation. 2023–2024.",
    link: "#",
  },
  {
    title: "UI/UX Designer & Web Developer — Creative Jungle",
    category: "design",
    desc: "End-to-end UI/UX process — research, wireframes and prototyping through final implementation — across 9 client web projects. 2022–2023.",
    link: "#",
  },
];

const grid = document.getElementById("projectGrid");

function renderProjects() {
  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card" data-cat="${p.category}">
        <p class="card__cat">${p.category === "dev" ? "Development" : "Design"}</p>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <a class="card__link" href="${p.link}" target="_blank" rel="noopener">View on Behance →</a>
      </article>`
    )
    .join("");
}

/* ============ FILTERS ============ */
function initFilters() {
  const buttons = document.querySelectorAll(".filter");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      document.querySelectorAll(".card").forEach((card) => {
        const match = filter === "all" || card.dataset.cat === filter;
        card.style.display = match ? "block" : "none";
      });
    });
  });
}

/* ============ FOOTER YEAR ============ */
document.querySelector(".footer__year").textContent = new Date().getFullYear();

/* ============ HERO TYPEWRITER ============
   Types each role once, left to right, no loop. On the last role it
   stops mid-string-complete and leaves the CSS-blinking .caret sitting
   right after it. Respects prefers-reduced-motion. */
function initTypewriter(onDone) {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const roles = [
    "HTML Integrator",
    "UI/UX Designer",
    "Salesforce Marketing Cloud Developer",
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.textContent = roles[roles.length - 1];
    if (typeof onDone === "function") onDone();
    return;
  }

  const TYPE_SPEED = 45;   // ms per character while typing
  const ERASE_SPEED = 25;  // ms per character while erasing
  const HOLD_TIME = 1100;  // ms pause after a role is fully typed, before erasing

  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    const current = roles[roleIndex];
    const isLastRole = roleIndex === roles.length - 1;

    if (charIndex <= current.length) {
      el.textContent = current.slice(0, charIndex);
      charIndex++;
      setTimeout(type, TYPE_SPEED);
      return;
    }

    if (isLastRole) {
      if (typeof onDone === "function") onDone(); // hand off to the lede typewriter
      return; // done for good — caret keeps blinking via CSS
    }
    setTimeout(erase, HOLD_TIME);
  }

  function erase() {
    const current = roles[roleIndex];
    if (charIndex >= 0) {
      el.textContent = current.slice(0, charIndex);
      charIndex--;
      setTimeout(erase, ERASE_SPEED);
      return;
    }
    roleIndex++;
    charIndex = 0;
    setTimeout(type, TYPE_SPEED);
  }

  type();
}

/* ============ LEDE TYPEWRITER ============
   Types the bio paragraph once, left to right, no loop. Runs the three
   segments (plain / <strong> / plain) in order so the bold emphasis on
   "Salesforce Marketing Cloud" survives the animation. Starts only after
   the role typewriter above has finished (passed in as onDone). */
function initLedeTypewriter() {
  const parts = document.querySelectorAll(".hero__lede .lede-part");
  if (!parts.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // text is already fully visible in the HTML

  const SPEED = 14; // ms per character — faster than the role typewriter, it's a longer text

  const fullTexts = Array.from(parts).map((el) => el.textContent);
  parts.forEach((el) => { el.textContent = ""; });

  let partIndex = 0;
  let charIndex = 0;

  function type() {
    if (partIndex >= parts.length) return; // done for good, no loop

    const el = parts[partIndex];
    const text = fullTexts[partIndex];

    if (charIndex <= text.length) {
      el.textContent = text.slice(0, charIndex);
      charIndex++;
      setTimeout(type, SPEED);
      return;
    }

    partIndex++;
    charIndex = 0;
    setTimeout(type, SPEED);
  }

  type();
}

renderProjects();
initFilters();
initTypewriter(initLedeTypewriter);
