/* ==========================================================
   PROJECT DATA
   ========================================================== */
/* Optional media per project (shown at the top of the card):
   media: { type: "image", src: "Resources/projects/name.jpg", alt: "Short description" }
   media: { type: "video", src: "Resources/projects/name.mp4", poster: "Resources/projects/name.jpg" }
*/
const projects = [
  {
    title: "Salesforce Email Developer — Freelance",
    category: "dev",
    desc: "Responsive email templates in Salesforce Marketing Cloud, AMPscript personalization, audience segmentation and cross-device QA. 2025–Present.",
    link: "https://inotjose.github.io/Ampscript-portfolio-/Car_email.html", 
    linkText: "View on GitHub →",
  },
  {
    title: "Front-End Developer / UI Designer — Grownet App",
    category: "dev",
    desc: "Web and mobile layouts for a supplier-management platform used by teams in London, applying UI/UX principles and front-end implementation. 2023–2024.",
    link: "https://www.grownetapp.com/",
     linkText: "View Online →",
  },
  {
    title: "UI/UX Designer & Web Developer — Creative Jungle",
    category: "design",
    desc: "End-to-end UI/UX process — research, wireframes and prototyping through final implementation — across 9 client web projects. 2022–2023.",
    link: "https://www.foodpointproduce.co.uk/about/how-it-started",
     linkText: "View Online →",
  },
   {
    title: "3D Hyundai-N-Vision-74 Visualization — Personal Project",
    category: "3d",
    desc: "Full 3D pipeline in Blender — vehicle modeling from scratch, custom PBR shaders and materials, lighting and rendering, edited into a final showcase video.",
    link: "https://www.behance.net/gallery/210028635/Hyundai-N-Vision-74",
  },
   {
    title: "Cosmic Tails",
    category: "design",
    desc: "Research, wireframes and prototyping through final implementation and export, for an animal-themed website that is clear and engaging. 2025.",
    link: "https://www.behance.net/gallery/245573651/Cosmic-Tails",
  },
  {
    title: "UX/UI Project 01 — EDIT TITLE",
    category: "design",
    desc: "EDIT: problem, your role, tools (Figma...) and result.",
    link: "https://www.behance.net/josepinzn1",
    linkText: "View case study →",
  },
  {
    title: "UX/UI Project 02 — EDIT TITLE",
    category: "design",
    desc: "EDIT: problem, your role, tools (Figma...) and result.",
    link: "https://www.behance.net/josepinzn1",
    linkText: "View case study →",
  },
  {
    title: "Motion Project 01 — EDIT TITLE",
    category: "motion",
    desc: "EDIT: concept, your role, tools (After Effects...) and result.",
    link: "https://www.behance.net/josepinzn1",
    linkText: "View on Behance →",
  },
  {
    title: "Motion Project 02 — EDIT TITLE",
    category: "motion",
    desc: "EDIT: concept, your role, tools (After Effects...) and result.",
    link: "https://www.behance.net/josepinzn1",
    linkText: "View on Behance →",
  },
  {
    title: "Motion Project 03 — EDIT TITLE",
    category: "motion",
    desc: "EDIT: concept, your role, tools (After Effects...) and result.",
    link: "https://www.behance.net/josepinzn1",
    linkText: "View on Behance →",
  },
];

const grid = document.getElementById("projectGrid");

const categoryLabels = {
  dev: "Development",
  design: "Design UX/UI",
  "3d": "3D Art",
  motion: "Motion Graphics",
};

function mediaHTML(p) {
  const m = p.media;
  if (!m) return "";
  if (m.type === "video") {
    return `<div class="card__media"><video src="${m.src}" poster="${m.poster ?? ""}" muted loop playsinline preload="metadata" aria-label="${m.alt ?? p.title}"></video></div>`;
  }
  return `<div class="card__media"><img src="${m.src}" alt="${m.alt ?? p.title}" loading="lazy" /></div>`;
}

function renderProjects() {
  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card" data-cat="${p.category}">
        ${mediaHTML(p)}
        <p class="card__cat">${categoryLabels[p.category] ?? p.category}</p>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <a class="card__link" href="${p.link}" target="_blank" rel="noopener">${p.linkText ?? "View on Behance →"}</a>
      </article>`
    )
    .join("");
}

/* ============ VIDEOS: play only while visible ============ */
function initVideos() {
  const videos = document.querySelectorAll(".card__media video");
  if (!videos.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()));
  }, { threshold: 0.4 });
  videos.forEach((v) => io.observe(v));
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

renderProjects();
initFilters();
initVideos();
