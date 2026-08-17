// script.js - VERSÃO ATUALIZADA com carrinho
import { produtos } from './produtos.js';

// Referências DOM
const inputBusca = document.querySelector('#busca-input');
const containerFrutas = document.querySelector('#container-frutas');
const containerLegumes = document.querySelector('#container-legumes');
const containerTemperos = document.querySelector('#container-temperos');

// Criar card do produto COM CARRINHO
function criarCardProduto(produto) {
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
      <div class="botoes-card">
        <button class="btn-carrinho" data-id="${produto.id}" data-nome="${produto.nome}">
          <i class="fas fa-shopping-cart"></i> Carrinho
        </button>
      </div>
    </div>
  `;
  
  return card;
}

// Renderizar todos os produtos
function renderizarTodosProdutos() {
  containerFrutas.innerHTML = '';
  containerLegumes.innerHTML = '';
  containerTemperos.innerHTML = '';

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

  mostrarSecoes();
  adicionarEventCarrinho();
}

// Filtrar produtos
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

  containerFrutas.innerHTML = '';
  containerLegumes.innerHTML = '';
  containerTemperos.innerHTML = '';

  frutasFiltradas.forEach(produto => {
    containerFrutas.appendChild(criarCardProduto(produto));
  });

  legumesFiltrados.forEach(produto => {
    containerLegumes.appendChild(criarCardProduto(produto));
  });

  temperosFiltrados.forEach(produto => {
    containerTemperos.appendChild(criarCardProduto(produto));
  });

  mostrarSecoes();
  adicionarEventCarrinho();
}

// Mostrar seções com conteúdo
function mostrarSecoes() {
  const secaoFrutas = containerFrutas.closest('section');
  const secaoLegumes = containerLegumes.closest('section');
  const secaoTemperos = containerTemperos.closest('section');

  secaoFrutas.style.display = containerFrutas.children.length > 0 ? 'block' : 'none';
  secaoLegumes.style.display = containerLegumes.children.length > 0 ? 'block' : 'none';
  secaoTemperos.style.display = containerTemperos.children.length > 0 ? 'block' : 'none';
}

// Adicionar eventos aos botões de carrinho
function adicionarEventCarrinho() {
  document.querySelectorAll('.btn-carrinho').forEach(btn => {
    btn.addEventListener('click', () => {
      const idProduto = parseInt(btn.dataset.id);
      const nomeProduto = btn.dataset.nome;

      // Encontrar o produto na lista
      const produto = produtos.find(p => p.id === idProduto);

      if (produto) {
        carrinho.adicionarProduto(produto);
        
        // Feedback visual
        btn.textContent = '✓ Adicionado!';
        btn.style.backgroundColor = '#27ae60';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Carrinho';
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 1500);
      }
    });
  });
}

// Event listener de busca
let timerBusca;
inputBusca?.addEventListener('input', (e) => {
  clearTimeout(timerBusca);
  timerBusca = setTimeout(() => {
    filtrarProdutos(e.target.value);
  }, 300);
});

// Renderizar ao carregar
document.addEventListener('DOMContentLoaded', () => {
  renderizarTodosProdutos();
});
