/**
 * Agro Servicios de la Costa - Main JavaScript
 * Menú hamburguesa, scroll suave, validación, animaciones fade-in
 */

(function () {
  'use strict';

  // --- Fade-in on scroll (Intersection Observer) ---
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  if (animateElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });
    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animateElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  if (header) {
    function handleScroll() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // --- Mobile menu (hamburger) ---
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.querySelector('.nav__list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = navList.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Cerrar menú al redimensionar (si se pasa a desktop)
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Smooth scroll para navegación ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Validación del formulario ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/scuffiaxel96@gmail.com';

    const fields = {
      nombre: { element: document.getElementById('nombre'), error: document.getElementById('nombreError') },
      email: { element: document.getElementById('email'), error: document.getElementById('emailError') },
      asunto: { element: document.getElementById('asunto'), error: document.getElementById('asuntoError') },
      mensaje: { element: document.getElementById('mensaje'), error: document.getElementById('mensajeError') }
    };

    function showError(field, message) {
      field.element.classList.add('error');
      field.error.textContent = message;
    }

    function clearError(field) {
      field.element.classList.remove('error');
      field.error.textContent = '';
    }

    function validateNombre(value) {
      const trimmed = value.trim();
      if (trimmed.length < 2) return 'El nombre debe tener al menos 2 caracteres';
      if (trimmed.length > 100) return 'El nombre es demasiado largo';
      return null;
    }

    function validateEmail(value) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) return 'Ingresá un email válido';
      return null;
    }

    function validateAsunto(value) {
      const trimmed = value.trim();
      if (trimmed.length < 3) return 'El asunto debe tener al menos 3 caracteres';
      if (trimmed.length > 150) return 'El asunto es demasiado largo';
      return null;
    }

    function validateMensaje(value) {
      const trimmed = value.trim();
      if (trimmed.length < 10) return 'El mensaje debe tener al menos 10 caracteres';
      if (trimmed.length > 1000) return 'El mensaje es demasiado largo';
      return null;
    }

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      let isValid = true;

      // Limpiar errores previos
      Object.values(fields).forEach(clearError);

      // Validar nombre
      const nombreError = validateNombre(fields.nombre.element.value);
      if (nombreError) {
        showError(fields.nombre, nombreError);
        isValid = false;
      }

      // Validar email
      const emailError = validateEmail(fields.email.element.value);
      if (emailError) {
        showError(fields.email, emailError);
        isValid = false;
      }

      // Validar asunto
      const asuntoError = validateAsunto(fields.asunto.element.value);
      if (asuntoError) {
        showError(fields.asunto, asuntoError);
        isValid = false;
      }

      // Validar mensaje
      const mensajeError = validateMensaje(fields.mensaje.element.value);
      if (mensajeError) {
        showError(fields.mensaje, mensajeError);
        isValid = false;
      }

      if (!isValid) {
        // Enfocar el primer campo con error
        const firstError = Object.values(fields).find(function (f) {
          return f.element.classList.contains('error');
        });
        if (firstError) firstError.element.focus();
        return;
      }

      // Envío asíncrono con FormSubmit usando fetch
      const formData = new FormData(contactForm);

      try {
        const response = await fetch(FORM_SUBMIT_URL, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error en el envío del formulario');
        }

        alert('Gracias por tu mensaje. Pronto obtendrás una respuesta.');
        contactForm.reset();
        Object.values(fields).forEach(clearError);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Ocurrió un error al enviar el formulario. Por favor, intentá nuevamente.');
      }
    });

    // Limpiar error al escribir (validación en tiempo real opcional)
    Object.keys(fields).forEach(function (key) {
      fields[key].element.addEventListener('input', function () {
        clearError(fields[key]);
      });
    });
  }
})();
