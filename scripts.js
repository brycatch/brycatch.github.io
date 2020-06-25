"use strict";
// Header
let headerIsSet = false;
// Sections array
const header = document.getElementById("header");
const welcome = document.getElementById("welcome");
const aboutMe = document.getElementById("about-me");
const services = document.getElementById("services");
const resume = document.getElementById("resume");
const skills = document.getElementById("skills");
const portfolio = document.getElementById("portfolio");
const projects = document.getElementById("projects");
const contact = document.getElementById("contact");
const navLinks = Array.from(
  document.getElementById("header-nav").querySelectorAll("a")
);

// Button
const headerNav = document.getElementById("header-nav");

window.onload = documentReady();
function documentReady() {
  scrollHeaderListener();
  scrollSectionListener();
  // Listener para header
  window.addEventListener("scroll", scrollHeaderListener);
  window.addEventListener("resize", resetNavHeaderListener);
  window.addEventListener("scroll", scrollSectionListener);
}

function scrollHeaderListener() {
  const innerHeight = Number((window.innerHeight * 0.75).toFixed(0));
  const scrollY = window.scrollY;
  const isReady = scrollY > innerHeight;
  if (isReady) {
    header.classList.remove("headerOff");
    header.classList.add("headerOn");
    headerIsSet = true;
  } else if (headerIsSet) {
    header.classList.remove("headerOn");
    header.classList.add("headerOff");
    headerIsSet = false;
  }
}

function scrollSectionListener() {
  const sectionsArray = [
    { id: "nav-welcome", top: welcome.getBoundingClientRect().top },
    { id: "nav-about-me", top: aboutMe.getBoundingClientRect().top },
    { id: "nav-services", top: services.getBoundingClientRect().top },
    { id: "nav-resume", top: resume.getBoundingClientRect().top },
    { id: "nav-skills", top: skills.getBoundingClientRect().top },
    { id: "nav-portfolio", top: portfolio.getBoundingClientRect().top },    
    { id: "nav-contact", top: contact.getBoundingClientRect().top },
  ];
  // Obtener los elementos que ya están a la vista o pasaron el top
  const hiddenSections = sectionsArray.filter((element) => element.top <= 0);
  // Tomar el elemento que ya está a la vista (Top <= 0)
  const actualSection = hiddenSections[hiddenSections.length - 1];
  // Asignar la clase a la que corresponde si existe un elemento
  if (actualSection) {
    const navElement = document.getElementById(actualSection.id);
    navElement.classList.add("active");
    // Verificar si existen dos elementos con clase active
    const activeLinks = navLinks.filter((element) =>
      element.classList.contains("active")
    ).length;
    if (activeLinks > 1) {
      navLinks.forEach((element) => {
        if (
          element.classList.contains("active") &&
          element.id !== actualSection.id
        ) {
          element.classList.remove("active");
        }
      });
    }
  }
}

function toggleHeader() {
  const isValidWidth = window.innerWidth <= 768;
  if (isValidWidth) {
    headerNav.classList.toggle("opacityOn");
    if (headerNav.classList.contains("opacityOn")) {
      headerNav.classList.add("opacityOn");
      headerNav.classList.remove("opacityOff");
    } else {
      headerNav.classList.add("opacityOff");
      headerNav.classList.remove("opacityOn");
    }
  }
}

function resetNavHeaderListener() {
  const isValidWidth = window.innerWidth > 768;
  if (isValidWidth) {
    headerNav.classList.remove("opacityOn");
    headerNav.classList.remove("opacityOff");
  }
}
