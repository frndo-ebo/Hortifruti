document.addEventListener('DOMContentLoaded', () => {
    const pistas = document.querySelectorAll('.carrossel-pista');
    
    pistas.forEach(pista => {
        const container = pista.closest('.container-carrossel');
        const btnAnt = container.querySelector('.btn-ant');
        const btnProx = container.querySelector('.btn-prox');
        
        let posicao = 0;
        const larguraCard = 270;
        
        btnProx.addEventListener('click', () => {
            const larguraMax = pista.scrollWidth - container.querySelector('.carrossel-pista-container').clientWidth;
            if (Math.abs(posicao) < larguraMax) {
                posicao -= larguraCard;
                if (Math.abs(posicao) > larguraMax) {
                    posicao = -larguraMax;
                }
                pista.style.transform = `translateX(${posicao}px)`;
            }
        });
        
        btnAnt.addEventListener('click', () => {
            if (posicao < 0) {
                posicao += larguraCard;
                if (posicao > 0) posicao = 0;
                pista.style.transform = `translateX(${posicao}px)`;
            }
        });
    });

    const botoesAdicionar = document.querySelectorAll('.btn-zap');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            const card = botao.closest('.card-produto');
            if (!card) return;

            let carrinho = JSON.parse(localStorage.getItem('emporio_carrinho')) || [];
            
            const nome = card.querySelector('h3').textContent;
            const precoTexto = card.querySelector('.preco').textContent;
            const preco = parseFloat(precoTexto.replace(/[^0-9,]/g, '').replace(',', '.'));
            
            const itemExistente = carrinho.find(item => item.nome === nome);
            
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({ nome, preco, quantidade: 1 });
            }
            
            localStorage.setItem('emporio_carrinho', JSON.stringify(carrinho));
            alert(`${nome} adicionado ao carrinho!`);
        });
    });

    const listaItensContainer = document.querySelector('.lista-itens');
    const carrinhoContainer = document.querySelector('.carrinho-container');
    
    if (listaItensContainer && carrinhoContainer) {
        const carregarCarrinho = () => {
            let carrinho = JSON.parse(localStorage.getItem('emporio_carrinho')) || [];
            listaItensContainer.innerHTML = '';
            
            if (carrinho.length === 0) {
                listaItensContainer.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Seu carrinho está vazio.</p>';
                document.querySelector('.resumo-linha:not(.total) span:last-child').textContent = 'R$ 0,00';
                document.querySelector('.preco-total').textContent = 'R$ 0,00';
                return;
            }
            
            let subtotal = 0;
            
            carrinho.forEach((item, index) => {
                const valorItem = item.preco * item.quantidade;
                subtotal += valorItem;
                
                const itemHTML = `
                    <div class="item-carrinho" data-index="${index}">
                      <div class="item-detalhes">
                        <h3>${item.nome}</h3>
                        <p>Preço un: R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                      </div>
                      <div class="item-quantidade">
                        <button class="btn-qtd-menos">-</button>
                        <span class="qtd-numero">${item.quantidade}</span>
                        <button class="btn-qtd-mais">+</button>
                      </div>
                      <div class="item-preco">R$ ${valorItem.toFixed(2).replace('.', ',')}</div>
                      <button class="btn-remover"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                listaItensContainer.insertAdjacentHTML('beforeend', itemHTML);
            });
            
            document.querySelector('.resumo-linha:not(.total) span:last-child').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
            document.querySelector('.preco-total').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        };

        carrinhoContainer.addEventListener('click', (e) => {
            let carrinho = JSON.parse(localStorage.getItem('emporio_carrinho')) || [];
            const itemElemento = e.target.closest('.item-carrinho');
            if (!itemElemento) return;
            
            const index = parseInt(itemElemento.getAttribute('data-index'));
            
            if (e.target.classList.contains('btn-qtd-mais')) {
                carrinho[index].quantidade += 1;
                localStorage.setItem('emporio_carrinho', JSON.stringify(carrinho));
                carregarCarrinho();
            }
            
            if (e.target.classList.contains('btn-qtd-menos')) {
                if (carrinho[index].quantidade > 1) {
                    carrinho[index].quantidade -= 1;
                    localStorage.setItem('emporio_carrinho', JSON.stringify(carrinho));
                    carregarCarrinho();
                }
            }
            
            if (e.target.closest('.btn-remover')) {
                carrinho.splice(index, 1);
                localStorage.setItem('emporio_carrinho', JSON.stringify(carrinho));
                carregarCarrinho();
            }
        });

        const btnFinalizar = document.querySelector('.btn-finalizar');
        if (btnFinalizar) {
            btnFinalizar.addEventListener('click', () => {
                let carrinho = JSON.parse(localStorage.getItem('emporio_carrinho')) || [];
                if (carrinho.length === 0) {
                    alert('Seu carrinho está vazio!');
                    return;
                }

                let mensagem = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
                carrinho.forEach(item => {
                    const valorItem = item.preco * item.quantidade;
                    mensagem += `• ${item.quantidade}x ${item.nome} (R$ ${valorItem.toFixed(2).replace('.', ',')})\n`;
                });
                
                const total = document.querySelector('.preco-total').textContent;
                mensagem += `\n*Total: ${total}*`;

                const fone = '5511999999999';
                window.open(`https://wa.me{fone}?text=${encodeURIComponent(mensagem)}`, '_blank');
            });
        }

        carregarCarrinho();
    }
});
