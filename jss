c
/* ========================================
   Agro Servicios de la Costa - main.js
   Funcionalidades:
   - Menú móvil
   - Header con sombra al hacer scroll
   - Animaciones al hacer scroll
   - Validación del formulario
======================================== */

/* =========================
   MENU MOBILE
========================= */
const menuToggle = document.getElementById("menuToggle");
const navList = document.querySelector(".nav__list");

if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

/* =========================
   HEADER SHADOW ON SCROLL
========================= */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =========================
   ANIMACIONES AL SCROLL
========================= */
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

animatedElements.forEach(el => observer.observe(el));

/* =========================
   VALIDACION FORMULARIO
========================= */
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    let valid = true;

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const asunto = document.getElementById("asunto");
    const mensaje = document.getElementById("mensaje");

    const nombreError = document.getElementById("nombreError");
    const emailError = document.getElementById("emailError");
    const asuntoError = document.getElementById("asuntoError");
    const mensajeError = document.getElementById("mensajeError");

    // Limpiar errores previos
    nombreError.textContent = "";
    emailError.textContent = "";
    asuntoError.textContent = "";
    mensajeError.textContent = "";

    nombre.classList.remove("error");
    email.classList.remove("error");
    asunto.classList.remove("error");
    mensaje.classList.remove("error");

    // Validaciones
    if (nombre.value.trim() === "") {
      nombreError.textContent = "Por favor ingrese su nombre.";
      nombre.classList.add("error");
      valid = false;
    }

    if (!email.value.includes("@") || email.value.trim() === "") {
      emailError.textContent = "Ingrese un email válido.";
      email.classList.add("error");
      valid = false;
    }

    if (asunto.value.trim() === "") {
      asuntoError.textContent = "Ingrese un asunto.";
      asunto.classList.add("error");
      valid = false;
    }

    if (mensaje.value.trim() === "") {
      mensajeError.textContent = "Escriba su mensaje.";
      mensaje.classList.add("error");
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    }
  });
}
