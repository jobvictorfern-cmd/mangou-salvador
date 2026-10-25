'use strict';

document.documentElement.classList.add('js');

// Preencha somente quando o número oficial for confirmado: 55 + DDD + número.
const WHATSAPP_NUMBER = '';
const whatsappDigits = WHATSAPP_NUMBER.replace(/\D/g, '');
const whatsappLink = document.querySelector('#whatsapp-button');
if (/^55\d{10,11}$/.test(whatsappDigits)) {
  whatsappLink.href = 'https://wa.me/' + whatsappDigits + '?text=' + encodeURIComponent('Olá! Vim pelo site e quero saber mais sobre a Mangou.');
  whatsappLink.target = '_blank';
  whatsappLink.rel = 'noopener noreferrer';
  whatsappLink.hidden = false;
}

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
menuToggle.hidden = false;
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  menu.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.classList.toggle('is-open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 960px)').addEventListener('change', closeMenu);

const mangoRain = document.querySelector('#mango-rain');
const motionToggle = document.querySelector('.hero-motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let heroVisible = false;
let rainPaused = reducedMotion.matches;
function updateRain() {
  motionToggle.hidden = false;
  motionToggle.classList.toggle('is-paused', rainPaused);
  motionToggle.setAttribute('aria-label', rainPaused ? 'Reproduzir queda dos fios de manga' : 'Pausar queda dos fios de manga');
  mangoRain.classList.toggle('is-playing', heroVisible && !document.hidden && !rainPaused);
}
new IntersectionObserver(entries => {
  heroVisible = entries[0].isIntersecting;
  updateRain();
}).observe(document.querySelector('.hero'));
motionToggle.addEventListener('click', () => {
  rainPaused = !rainPaused;
  updateRain();
});
reducedMotion.addEventListener('change', () => {
  rainPaused = reducedMotion.matches;
  updateRain();
});
document.addEventListener('visibilitychange', updateRain);

document.querySelector('#year').textContent = new Date().getFullYear();
