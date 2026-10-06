/* =========================================================
   SEUS PROJETOS — edite apenas esta lista
   Para adicionar um projeto, copie um bloco { ... } e cole
   depois da vírgula. Troque o link (url) e os textos em
   português (pt) e inglês (en).
   ========================================================= */
const projects = [
  {
    url: "https://github.com/seu-usuario/seu-site",
    en: {
      title: "projeto 1",
      description: "ainda não"
    },
    pt: {
      title: "Project 1",
      description: "not yet"
    }
  },
  {
    url: "https://github.com/seu-usuario/projeto-2",
    en: {
      title: "projeto 2",
      description: "ainda não"
    },
    pt: {
      title: "Project 2",
      description: "not yet"
    }
  },
  {
    url: "https://github.com/seu-usuario/projeto-3",
    en: {
      title: "projeto 3",
      description: "ainda não"
    },
    pt: {
      title: "Project 3",
      description: "not yet"
    }
  }
];

/* ---------- Textos fixos do topo (somam-se ao script.js) ---------- */
Object.assign(translations.en, {
  nav_projects: "Projetos",
  theme_to_light: "Mudar para o tema claro",
  theme_to_dark: "Mudar para o tema escuro"
});
Object.assign(translations.pt, {
  nav_projects: "Projects",
  theme_to_light: "Switch to light theme",
  theme_to_dark: "Switch to dark theme"
});

const rootEl = document.documentElement;
const projectsBtn = document.getElementById("projects-btn");
const projectsMenu = document.getElementById("projects-menu");
const projectsList = document.getElementById("projects-list");
const themeBtn = document.getElementById("theme-btn");

const currentLang = () => (rootEl.lang.startsWith("pt") ? "pt" : "en");

/* ---------- Menu de projetos ---------- */
const projectItems = projects.map(p => {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.className = "menu-link";
  link.href = p.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const title = document.createElement("span");
  title.className = "menu-title";
  const desc = document.createElement("span");
  desc.className = "menu-desc";
  const arrow = document.createElement("span");
  arrow.className = "menu-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  link.append(title, desc, arrow);
  li.append(link);
  projectsList.append(li);
  return { p, title, desc };
});

function setMenu(open) {
  projectsMenu.hidden = !open;
  projectsBtn.setAttribute("aria-expanded", open);
}

projectsBtn.addEventListener("click", e => {
  e.stopPropagation();
  setMenu(projectsMenu.hidden);
});
document.addEventListener("click", e => {
  if (!projectsMenu.hidden && !projectsMenu.contains(e.target)) setMenu(false);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !projectsMenu.hidden) {
    setMenu(false);
    projectsBtn.focus();
  }
});

/* ---------- Tema claro / escuro ---------- */
function applyTheme(theme) {
  rootEl.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch (e) {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === "light" ? "#f1f1ef" : "#2b2b2b";
  updateLabels();
}

themeBtn.addEventListener("click", () => {
  applyTheme(rootEl.dataset.theme === "light" ? "dark" : "light");
});

/* ---------- Textos que dependem do idioma ---------- */
function updateLabels() {
  const t = translations[currentLang()];
  projectItems.forEach(({ p, title, desc }) => {
    title.textContent = p[currentLang()].title;
    desc.textContent = p[currentLang()].description;
  });
  projectsBtn.setAttribute("aria-label", t.nav_projects);
  const themeLabel = rootEl.dataset.theme === "light" ? t.theme_to_dark : t.theme_to_light;
  themeBtn.setAttribute("aria-label", themeLabel);
  themeBtn.title = themeLabel;
}

/* O site sempre abre em português (pt-BR), mesmo que o inglês tenha sido
   escolhido na visita anterior. A troca pelo botão continua funcionando. */
current = "pt";
setLanguage("pt");
applyTheme(rootEl.dataset.theme === "light" ? "light" : "dark");
btn.addEventListener("click", updateLabels);
