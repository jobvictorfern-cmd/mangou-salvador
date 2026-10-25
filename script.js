'use strict';

// Preencha com o WhatsApp oficial: DDI + DDD + número, somente dígitos.
// Exemplo de formato brasileiro: 55 + DDD + número.
const WHATSAPP_NUMBER = '';
const whatsappButton = document.querySelector('#whatsapp-button');
const whatsappDigits = WHATSAPP_NUMBER.replace(/\D/g, '');
if (/^55\d{10,11}$/.test(whatsappDigits)) {
  whatsappButton.href = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá! Vim pelo site e quero saber mais sobre a Mangou.')}`;
  whatsappButton.target = '_blank';
  whatsappButton.rel = 'noopener noreferrer';
  whatsappButton.removeAttribute('aria-disabled');
  whatsappButton.removeAttribute('tabindex');
  whatsappButton.setAttribute('aria-label', 'Conversar com a Mangou no WhatsApp');
  whatsappButton.title = 'Conversar no WhatsApp';
}


const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const flavors = {
  classico: {
    profile: 'CÍTRICO & FAMILIAR', title: 'O clássico.',
    description: 'Aquele gostinho de infância, com limão e sal.',
    ingredients: ['Manga', 'Limão', 'Sal'], image: 'assets/manga.webp', alt: 'Copo de manga fresca com limão da Mangou', tag: 'O GOSTINHO DE INFÂNCIA'
  },
  fumace: {
    profile: 'DEFUMADO & MARCANTE', title: 'O defumado.',
    description: 'Um toque defumado para sair do clássico.',
    ingredients: ['Manga', 'Limão', 'Páprica', 'Pimenta-do-reino', 'Fumacê em pó'], image: 'assets/manga.webp', alt: 'Manga fresca da Mangou; foto ilustrativa da apresentação no copo', tag: 'CONHEÇA O TOQUE DEFUMADO'
  },
  misere: {
    profile: 'CÍTRICO & PICANTE', title: 'O picante.',
    description: 'Tajín, limão e uma picância que chega junto.',
    ingredients: ['Manga', 'Tajín', 'Pimentas', 'Limão', 'Sal'], image: 'assets/tajin.webp', alt: 'Publicação oficial da Mangou apresentando o Tajín e o copo de manga temperada', tag: 'TAJÍN NO TEMPERO'
  }
};
const tabs = Array.from(document.querySelectorAll('[data-flavor]'));
const panel = document.querySelector('#flavor-panel');
function selectFlavor(tab) {
  const flavor = flavors[tab.dataset.flavor];
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  panel.setAttribute('aria-labelledby', tab.id);
  const title = document.querySelector('#flavor-name');
  title.replaceChildren();
  flavor.title.split('\n').forEach((line, index) => { if (index) title.append(document.createElement('br')); title.append(document.createTextNode(line)); });
  document.querySelector('#flavor-description').textContent = flavor.description;
  document.querySelector('#ingredients').replaceChildren(...flavor.ingredients.map(ingredient => { const span = document.createElement('span'); span.textContent = ingredient; return span; }));
  const image = document.querySelector('#flavor-image');
  image.src = flavor.image;
  image.alt = flavor.alt;
  image.style.objectPosition = tab.dataset.flavor === 'misere' ? 'center' : '50% 54%';
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFlavor(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectFlavor(tabs[next]); tabs[next].focus(); }
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
const creditsButton = document.querySelector('#credits-button');
creditsButton.setAttribute('aria-expanded', 'false');
creditsButton.setAttribute('aria-controls', 'credits');
creditsButton.addEventListener('click', () => {
  const credits = document.querySelector('#credits');
  credits.hidden = !credits.hidden;
  creditsButton.setAttribute('aria-expanded', String(!credits.hidden));
});

// Movimento restrito à chamada final, fora da área central de leitura.
const mangoRain = document.querySelector('.mango-rain');
if (mangoRain) {
  const mangoSection = mangoRain.closest('.final-cta');
  let mangoPaused = false;
  const strips = [
    { x: 3, size: 46, duration: 9.4, delay: -4.8, angle: -24, drift: 16 },
    { x: 10, size: 37, duration: 11.2, delay: -8.1, angle: 17, drift: -18 },
    { x: 17, size: 52, duration: 10.1, delay: -2.7, angle: -12, drift: 22 },
    { x: 20, size: 32, duration: 12.3, delay: -9.6, angle: 31, drift: -14 },
    { x: 6, size: 33, duration: 12.7, delay: -1.1, angle: 28, drift: 14 },
    { x: 14, size: 35, duration: 8.8, delay: -5.6, angle: -32, drift: -12 },
    { x: 78, size: 40, duration: 10.7, delay: -7.4, angle: 24, drift: 17 },
    { x: 85, size: 51, duration: 9.8, delay: -3.8, angle: -18, drift: -21 },
    { x: 92, size: 38, duration: 11.8, delay: -9.3, angle: 34, drift: 16 },
    { x: 97, size: 46, duration: 9.1, delay: -1.9, angle: -27, drift: -14 },
    { x: 81, size: 32, duration: 12.9, delay: -1.4, angle: -35, drift: 11 },
    { x: 89, size: 34, duration: 8.6, delay: -6.8, angle: 15, drift: -16 }
  ];
  const fragment = document.createDocumentFragment();
  strips.forEach((strip, index) => {
    const fall = document.createElement('span');
    fall.className = 'mango-fall';
    fall.style.cssText = `--x:${strip.x}%;--strip-width:${strip.size * 2}px;--fall-time:${strip.duration}s;--phase:${strip.delay}s;--angle:${strip.angle}deg;--drift:${strip.drift}px;--sway-time:${3.8 + index % 4 * 0.7}s;--flip:${index % 3 === 0 ? -1 : 1}`;
    const sway = document.createElement('span');
    sway.className = 'mango-sway';
    const stripImage = document.createElement('span');
    stripImage.className = 'mango-texture';
    stripImage.style.setProperty('--sprite-x', `${index % 3 * 50}%`);
    sway.append(stripImage);
    fall.append(sway);
    fragment.append(fall);
  });
  mangoRain.append(fragment);
  const motionToggle = document.createElement('button');
  motionToggle.type = 'button';
  motionToggle.className = 'mango-motion-toggle';
  motionToggle.textContent = 'Pausar animação';
  motionToggle.setAttribute('aria-controls', 'mango-rain');
  mangoRain.id = 'mango-rain';
  mangoSection.append(motionToggle);
  const syncMangoMotion = () => mangoRain.classList.toggle('is-paused', mangoPaused);
  motionToggle.addEventListener('click', () => {
    mangoPaused = !mangoPaused;
    motionToggle.textContent = mangoPaused ? 'Retomar animação' : 'Pausar animação';
    syncMangoMotion();
  });
  const measureMangoFall = () => mangoRain.style.setProperty('--fall-distance', `${mangoSection.offsetHeight + 360}px`);
  measureMangoFall();
  if ('ResizeObserver' in window) new ResizeObserver(measureMangoFall).observe(mangoSection);
  else window.addEventListener('resize', measureMangoFall, { passive: true });
  syncMangoMotion();
}
