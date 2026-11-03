// Navegación móvil, galería ampliable y pequeños efectos de entrada.
const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  siteNav.classList.toggle('open', open);
});

siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menú');
  siteNav.classList.remove('open');
}));

const galleryItems = [...document.querySelectorAll('.gallery-item')];
const filters = [...document.querySelectorAll('.filter-button')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => filter.classList.toggle('active', filter === button));
  const category = button.dataset.filter;
  galleryItems.forEach(item => { item.hidden = category !== 'all' && item.dataset.category !== category; });
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
let activeImage = 0;
function showImage(index) {
  activeImage = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeImage];
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector('img').alt;
  lightboxCaption.textContent = item.querySelector('span').childNodes[0].textContent.trim();
}
galleryItems.forEach((item, index) => item.addEventListener('click', () => {
  showImage(index);
  lightbox.showModal();
}));
lightbox?.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox?.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeImage - 1));
lightbox?.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeImage + 1));
lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
document.addEventListener('keydown', event => {
  if (!lightbox?.open) return;
  if (event.key === 'ArrowLeft') showImage(activeImage - 1);
  if (event.key === 'ArrowRight') showImage(activeImage + 1);
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealElements.forEach(element => observer.observe(element));
} else revealElements.forEach(element => element.classList.add('visible'));

document.querySelector('#year').textContent = new Date().getFullYear();
