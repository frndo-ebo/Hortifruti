// script.js - Renderização dinâmica e barra de busca
import { produtos } from './produtos.js';

// Configuração do WhatsApp (copie o número correto)
const WHATSAPP_NUMERO = '5511982176393';
const WHATSAPP_ICON = 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c0/94/ab/c094ab41-a44a-4da8-737f-7aad8d97b8b6/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-sRGB-0-85-220.png/256x256bb.png';

// Referências DOM
const inputBusca = document.querySelector('#busca-input');
const containerFrutas = document.querySelector('#container-frutas');
const containerLegumes = document.querySelector('#container-legumes');
const containerTemperos = document.querySelector('#container-temperos');

// Renderizar um produto como card
function criarCardProduto(produto) {
  const mensagemWhatsApp = `Olá! Gostaria de comprar esse produto: ${produto.nome}`;
  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagemWhatsApp)}`;

  const card = document.createElement('div');
  card.className = 'card-produto';
  card.innerHTML = `
    <img 
      src="${produto.imagem}" 
      alt="${produto.nome}" 
      loading="lazy" 
    />
    <div class="info">
      <h3>${produto.nome}</h3>
      <p class="preco">${produto.preco}</p>
      <a href="${linkWhatsApp}" class="btn-zap" target="_blank">
        <img 
          src="${WHATSAPP_ICON}" 
          alt="WhatsApp" 
          class="capa-zap" 
        />
        <span>Pedir no WhatsApp</span>
      </a>
    </div>
  `;
  
  return card;
}

// Renderizar todos os produtos por categoria
function renderizarTodosProdutos() {
  // Limpar containers
  containerFrutas.innerHTML = '';
  containerLegumes.innerHTML = '';
  containerTemperos.innerHTML = '';

  // Separar por categoria e renderizar
  const frutas = produtos.filter(p => p.categoria === 'frutas');
  const legumes = produtos.filter(p => p.categoria === 'legumes');
  const temperos = produtos.filter(p => p.categoria === 'temperos');

  frutas.forEach(produto => {
    containerFrutas.appendChild(criarCardProduto(produto));
  });

  legumes.forEach(produto => {
    containerLegumes.appendChild(criarCardProduto(produto));
  });

  temperos.forEach(produto => {
    containerTemperos.appendChild(criarCardProduto(produto));
  });

  // Mostrar todas as seções
  mostrarSecoes();
}

// Filtrar por busca
function filtrarProdutos(termoBusca) {
  const termo = termoBusca.toLowerCase().trim();

  if (termo === '') {
    renderizarTodosProdutos();
    return;
  }

  const frutasFiltradas = produtos.filter(
    p => p.categoria === 'frutas' && p.nome.toLowerCase().includes(termo)
  );
  const legumesFiltrados = produtos.filter(
    p => p.categoria === 'legumes' && p.nome.toLowerCase().includes(termo)
  );
  const temperosFiltrados = produtos.filter(
    p => p.categoria === 'temperos' && p.nome.toLowerCase().includes(termo)
  );

  // Limpar containers
  containerFrutas.innerHTML = '';
  containerLegumes.innerHTML = '';
  containerTemperos.innerHTML = '';

  // Renderizar resultados filtrados
  frutasFiltradas.forEach(produto => {
    containerFrutas.appendChild(criarCardProduto(produto));
  });

  legumesFiltrados.forEach(produto => {
    containerLegumes.appendChild(criarCardProduto(produto));
  });

  temperosFiltrados.forEach(produto => {
    containerTemperos.appendChild(criarCardProduto(produto));
  });

  // Mostrar/esconder seções conforme necessário
  mostrarSecoes();
}

// Mostrar seções que têm produtos, esconder vazias
function mostrarSecoes() {
  const secaoFrutas = containerFrutas.closest('section');
  const secaoLegumes = containerLegumes.closest('section');
  const secaoTemperos = containerTemperos.closest('section');

  secaoFrutas.style.display = containerFrutas.children.length > 0 ? 'block' : 'none';
  secaoLegumes.style.display = containerLegumes.children.length > 0 ? 'block' : 'none';
  secaoTemperos.style.display = containerTemperos.children.length > 0 ? 'block' : 'none';
}

// Event listener para barra de busca (com debounce para performance)
let timerBusca;
inputBusca?.addEventListener('input', (e) => {
  clearTimeout(timerBusca);
  timerBusca = setTimeout(() => {
    filtrarProdutos(e.target.value);
  }, 300);
});

// Renderizar tudo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderizarTodosProdutos();
});
