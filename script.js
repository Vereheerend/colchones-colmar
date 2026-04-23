/* ═══════════════════════════════════════
   COLCHONES COLMAR — script.js
═══════════════════════════════════════ */

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── MENÚ HAMBURGUESA ───
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── FILTRO DE CATÁLOGO ───
const filtros  = document.querySelectorAll('.filtro');
const tarjetas = document.querySelectorAll('.producto-card');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    tarjetas.forEach(card => {
      if (cat === 'todos' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp .4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── MODAL COTIZACIÓN ───
const modalOverlay = document.getElementById('modalOverlay');
const modalNombre  = document.getElementById('modalProductoNombre');
const btnWhatsApp  = document.getElementById('btnWhatsApp');

function abrirCotizacion(producto) {
  modalNombre.textContent = producto;
  modalOverlay.classList.add('active');

  const numero  = '+52 56 3084 7449'; // ← CAMBIA AQUÍ tu número de WhatsApp con código de país
  const mensaje = encodeURIComponent(`Hola, me interesa cotizar el producto: *${producto}*. ¿Me pueden dar más información?`);
  btnWhatsApp.onclick = () => {
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
    cerrarModal();
  };
}

function cerrarModal() {
  modalOverlay.classList.remove('active');
}

// Cerrar modal con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarModal();
});

// ─── FORMULARIO DE CONTACTO → WHATSAPP ───
function enviarFormulario(e) {
  e.preventDefault();
  const nombre   = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const producto = document.getElementById('producto').value;
  const mensaje  = document.getElementById('mensaje').value;

  const numero = '+52 56 3084 7449'; // ← CAMBIA AQUÍ tu número de WhatsApp con código de país
  const texto  = encodeURIComponent(
    `Hola, soy *${nombre}*.\n` +
    `📱 Teléfono: ${telefono}\n` +
    `🛏️ Producto de interés: ${producto || 'No especificado'}\n` +
    `💬 Mensaje: ${mensaje || 'Sin mensaje adicional'}`
  );

  window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
}

// ─── ANIMACIÓN DE APARICIÓN AL HACER SCROLL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.producto-card, .beneficio-card, .stat, .dato, .nosotros-image'
).forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});
