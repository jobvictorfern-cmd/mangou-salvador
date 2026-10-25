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

const filmDialog = document.querySelector('#film-dialog');
const videoButton = document.querySelector('#open-video');
const video = document.querySelector('#preparation-video');
if (typeof filmDialog.showModal === 'function') {
  videoButton.hidden = false;
  document.querySelector('.video-direct').hidden = true;
  videoButton.addEventListener('click', () => {
    const source = video.querySelector('source');
    if (!source.getAttribute('src')) {
      source.src = source.dataset.src;
      video.load();
    }
    filmDialog.showModal();
    document.body.classList.add('film-open');
    video.play().then(() => {
      if (!filmDialog.open) video.pause();
    }).catch(() => { /* Os controles nativos permitem iniciar a reprodução. */ });
  });
  function closeFilm() {
    video.pause();
    filmDialog.close();
  }
  document.querySelector('#close-video').addEventListener('click', closeFilm);
  filmDialog.addEventListener('click', event => {
    if (event.target === filmDialog) closeFilm();
  });
  filmDialog.addEventListener('cancel', () => video.pause());
  filmDialog.addEventListener('close', () => {
    video.pause();
    document.body.classList.remove('film-open');
    videoButton.focus({preventScroll: true});
  });
  video.addEventListener('error', () => {
    document.querySelector('.video-error').hidden = false;
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
