
// carrinho.js - Gerenciamento do carrinho com localStorage

const CHAVE_CARRINHO = 'verde-grao-carrinho';
const CHAVE_CLIENTE = 'verde-grao-cliente';

// Classe para gerenciar o carrinho
class Carrinho {
  constructor() {
    this.itens = this.carregarCarrinho();
    this.cliente = this.carregarDadosCliente();
  }

  // Carregar carrinho do localStorage
  carregarCarrinho() {
    const dados = localStorage.getItem(CHAVE_CARRINHO);
    return dados ? JSON.parse(dados) : [];
  }

  // Carregar dados do cliente do localStorage
  carregarDadosCliente() {
    const dados = localStorage.getItem(CHAVE_CLIENTE);
    return dados ? JSON.parse(dados) : { endereco: '', observacoes: '' };
  }

  // Salvar carrinho no localStorage
  salvarCarrinho() {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(this.itens));
  }

  // Salvar dados do cliente
  salvarDadosCliente(endereco, observacoes) {
    this.cliente = { endereco, observacoes };
    localStorage.setItem(CHAVE_CLIENTE, JSON.stringify(this.cliente));
  }

  // Adicionar produto ao carrinho
  adicionarProduto(produto) {
    const itemExistente = this.itens.find(item => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      this.itens.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem,
        categoria: produto.categoria,
        quantidade: 1
      });
    }

    this.salvarCarrinho();
  }

  // Remover produto do carrinho
  removerProduto(id) {
    this.itens = this.itens.filter(item => item.id !== id);
    this.salvarCarrinho();
  }

  // Atualizar quantidade de um produto
  atualizarQuantidade(id, quantidade) {
    const item = this.itens.find(item => item.id === id);
    if (item) {
      if (quantidade <= 0) {
        this.removerProduto(id);
      } else {
        item.quantidade = quantidade;
        this.salvarCarrinho();
      }
    }
  }

  // Limpar carrinho completamente
  limparCarrinho() {
    this.itens = [];
    this.salvarCarrinho();
  }

  // Obter quantidade total de itens
  obterQuantidadeTotal() {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  // Extrair número do preço (R$12,50/kg → 12.50)
  extrairNumeroPreco(precoString) {
    const match = precoString.match(/[\d,]+/);
    if (match) {
      return parseFloat(match[0].replace(',', '.'));
    }
    return 0;
  }

  // Calcular subtotal de um item
  calcularSubtotal(item) {
    const preco = this.extrairNumeroPreco(item.preco);
    return preco * item.quantidade;
  }

  // Obter total do carrinho
  obterTotal() {
    return this.itens.reduce((total, item) => total + this.calcularSubtotal(item), 0);
  }

  // Obter itens do carrinho
  obterItens() {
    return this.itens;
  }

  // Gerar resumo formatado para enviar
  gerarResumo() {
    let resumo = '🛒 *PEDIDO VERDE E GRÃO* 🛒\n\n';

    this.itens.forEach(item => {
      const subtotal = this.calcularSubtotal(item);
      resumo += `🥕 ${item.nome}\n`;
      resumo += `   Preço: ${item.preco}\n`;
      resumo += `   Quantidade: ${item.quantidade}\n`;
      resumo += `   Subtotal: R$${subtotal.toFixed(2)}\n\n`;
    });

    resumo += `━━━━━━━━━━━━━━━━━━\n`;
    resumo += `💰 *TOTAL: R$${this.obterTotal().toFixed(2)}*\n\n`;

    if (this.cliente.endereco) {
      resumo += `📍 Endereço: ${this.cliente.endereco}\n`;
    }

    if (this.cliente.observacoes) {
      resumo += `📝 Observações: ${this.cliente.observacoes}\n`;
    }

    resumo += `\nConfirma este pedido?`;

    return resumo;
  }

  // Verificar se carrinho está vazio
  estaVazio() {
    return this.itens.length === 0;
  }
}

// Instância global do carrinho
const carrinho = new Carrinho();
