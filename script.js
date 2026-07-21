/* ==========================================================
   PROJECT DATA
   ========================================================== */
const projects = [
  {
    title: "Salesforce Email Developer — Freelance",
    category: "dev",
    desc: "Responsive email templates in Salesforce Marketing Cloud, AMPscript personalization, audience segmentation and cross-device QA. 2025–Present.",
    
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
   {
    title: "Brand identity — [Nombre del proyecto]",
    category: "D3",
    desc: "Ejemplo de card en la nueva categoría — reemplaza este objeto con tu proyecto real, o bórralo si no lo necesitas todavía.",
    link: "#",
  },
];

const grid = document.getElementById("projectGrid");

const categoryLabels = {
  dev: "Development",
  design: "Design",
  D3: "3D Desing",
};

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

renderProjects();
initFilters();
