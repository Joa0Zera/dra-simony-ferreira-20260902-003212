/* ==========================================================================
   Simony Ferreira Estética — script.js
   ========================================================================== */

/* ---------- Menu mobile ---------- */
const hamburguer = document.getElementById('hamburguer');
const menuMobile = document.getElementById('menu-mobile');

hamburguer.addEventListener('click', () => {
  hamburguer.classList.toggle('ativo');
  menuMobile.classList.toggle('aberto');
});

document.querySelectorAll('.menu-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburguer.classList.remove('ativo');
    menuMobile.classList.remove('aberto');
  });
});

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('ativo'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Contadores animados ---------- */
const contadores = document.querySelectorAll('[data-contador]');

const contadorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContador(entry.target);
      contadorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

contadores.forEach(el => contadorObserver.observe(el));

function animarContador(el) {
  const alvo = parseFloat(el.dataset.contador);
  const casasDecimais = el.dataset.contador.includes('.') ? 1 : 0;
  const duracao = 1500;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valor = alvo * progresso;
    el.textContent = casasDecimais ? valor.toFixed(1) : Math.floor(valor);
    if (progresso < 1) requestAnimationFrame(passo);
    else el.textContent = casasDecimais ? alvo.toFixed(1) : alvo;
  }
  requestAnimationFrame(passo);
}

/* ---------- Parallax no Hero ---------- */
const heroImagem = document.getElementById('hero-imagem');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroImagem && scrollY < window.innerHeight) {
    heroImagem.style.transform = `translateY(${scrollY * 0.35}px)`;
  }

  if (scrollY > 20) {
    document.querySelector('header').style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  } else {
    document.querySelector('header').style.boxShadow = 'var(--sombra-padrao)';
  }
});

/* ---------- Carrossel de Depoimentos ---------- */
const track = document.getElementById('carrossel-track');
const slides = track.children;
const dotsContainer = document.getElementById('carrossel-dots');
const btnPrev = document.getElementById('carrossel-prev');
const btnNext = document.getElementById('carrossel-next');
let indiceAtual = 0;
let autoplay;

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('ativo');
  dot.addEventListener('click', () => irParaSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = dotsContainer.children;

function irParaSlide(indice) {
  indiceAtual = (indice + slides.length) % slides.length;
  track.style.transform = `translateX(-${indiceAtual * 100}%)`;
  Array.from(dots).forEach(d => d.classList.remove('ativo'));
  dots[indiceAtual].classList.add('ativo');
}

btnPrev.addEventListener('click', () => { irParaSlide(indiceAtual - 1); reiniciarAutoplay(); });
btnNext.addEventListener('click', () => { irParaSlide(indiceAtual + 1); reiniciarAutoplay(); });

function iniciarAutoplay() {
  autoplay = setInterval(() => irParaSlide(indiceAtual + 1), 5000);
}
function reiniciarAutoplay() {
  clearInterval(autoplay);
  iniciarAutoplay();
}
iniciarAutoplay();

const carrossel = document.querySelector('.carrossel');
carrossel.addEventListener('mouseenter', () => clearInterval(autoplay));
carrossel.addEventListener('mouseleave', iniciarAutoplay);

/* ---------- Sistema de Edição (config.json) ---------- */
let configData = {};

fetch('./assets/config.json')
  .then(res => res.json())
  .then(data => { configData = data; })
  .catch(err => console.log('Config não carregado:', err));

function abrirEditorModal() {
  document.getElementById('editor-modal').style.display = 'flex';
  document.getElementById('edit-titulo').value = configData.pagina?.titulo || '';
  document.getElementById('edit-subtitulo').value = configData.pagina?.subtitulo || '';
  document.getElementById('edit-telefone').value = configData.empresa?.telefone || '';
  document.getElementById('edit-endereco').value = configData.empresa?.endereco || '';
  document.getElementById('edit-instagram').value = configData.empresa?.instagram || '';
}

function fecharEditorModal() {
  document.getElementById('editor-modal').style.display = 'none';
}

function salvarEdicoes() {
  configData.pagina.titulo = document.getElementById('edit-titulo').value;
  configData.pagina.subtitulo = document.getElementById('edit-subtitulo').value;
  configData.empresa.telefone = document.getElementById('edit-telefone').value;
  configData.empresa.endereco = document.getElementById('edit-endereco').value;
  configData.empresa.instagram = document.getElementById('edit-instagram').value;

  atualizarPagina();
  salvarJSON();
  fecharEditorModal();
  alert('✅ Alterações salvas! Download do arquivo JSON...');
}

function valorAninhado(obj, caminho) {
  return caminho.split('.').reduce((acc, chave) => (acc && acc[chave] !== undefined) ? acc[chave] : undefined, obj);
}

function atualizarPagina() {
  document.querySelectorAll('[data-edit]').forEach(el => {
    const valor = valorAninhado(configData, el.dataset.edit);
    if (valor !== undefined) el.textContent = valor;
  });
}

function salvarJSON() {
  const dataStr = JSON.stringify(configData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'config-edicoes.json';
  link.click();
}
