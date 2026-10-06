const translations = {
  en: {
    hero_title: "Olá, me chamo Kauennedy.",
    hero_text: "Sou um desenvolvedor de software iniciante e esse é o meu primeiro projeto.",
    about_title: "Sou um amante da tecnologia e da programação, e estou sempre em busca de aprender coisas novas.",
    about_p2: "No meu tempo livre, gosto de consumir conteúdo relacionado à tecnologia.",
    skills_title: "No momento estou aprendendo a programar em JavaScript",
    skill_1: "Sou uma pessoa determinada e curiosa, sempre buscando aprender coisas novas e me aprimorar.",
    contact_title: "Contato",
    contact_text: "Quer conversar? Me escreva:",
    footer: "© desenvolvido por Kauennedy com a ajuda do Claude AI"
  },
  pt: {
    hero_title: "Hi, I'm Kauennedy.",
    hero_text: "I'm a beginner software developer and this is my first project.",
    about_title: "I'm a technology and programming enthusiast, always eager to learn new things.",
    about_p2: "in my free time, I like to consume content related to technology.",
    skills_title: "Currently learning to program in JavaScript",
    skill_1: "I'm a determined and curious person, always seeking to learn new things and improve myself.",
    contact_title: "Contact",
    contact_text: "Want to talk? Write to me:",
    footer: "© developed by Kauennedy with the help of Claude AI"
  }
};

const btn = document.getElementById("lang-btn");

// Bandeiras em SVG (aparecem em qualquer sistema, ao contrário dos emojis)
const stripes = Array.from({ length: 7 }, (_, i) =>
  `<rect y="${(i * 2 * 14 / 13).toFixed(2)}" width="20" height="${(14 / 13).toFixed(2)}" fill="#b22234"/>`
).join("");
const stars = Array.from({ length: 12 }, (_, i) =>
  `<circle cx="${1.6 + (i % 4) * 1.8}" cy="${1.4 + Math.floor(i / 4) * 2.2}" r="0.45" fill="#fff"/>`
).join("");

const flags = {
  pt: `<svg class="flag" viewBox="0 0 20 14" aria-hidden="true">
         <rect width="20" height="14" fill="#009b3a"/>
         <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00"/>
         <circle cx="10" cy="7" r="3.4" fill="#002776"/>
       </svg>`,
  en: `<svg class="flag" viewBox="0 0 20 14" aria-hidden="true">
         <rect width="20" height="14" fill="#fff"/>
         ${stripes}
         <rect width="8" height="7.54" fill="#3c3b6e"/>
         ${stars}
       </svg>`
};

function setLanguage(lang) {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });
  // o botão mostra o idioma para o qual vai trocar
  const target = lang === "pt" ? "en" : "pt";
  btn.innerHTML = `${flags[target]}<span>${target.toUpperCase()}</span>`;
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

let current = "pt";
try { current = localStorage.getItem("lang") || "pt"; } catch (e) {}
setLanguage(current);

btn.addEventListener("click", () => {
  current = current === "pt" ? "en" : "pt";
  setLanguage(current);
});
