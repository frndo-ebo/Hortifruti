// Captura absolutamente todos os blocos de carrossel espalhados pela página
const carrosseis = document.querySelectorAll('.container-carrossel');

// Roda uma estrutura de repetição para aplicar a lógica individualmente em cada carrossel
carrosseis.forEach((carrossel) => {
    // Pega os elementos internos exclusivos DESTE carrossel específico do loop
    const pista = carrossel.querySelector('.carrossel-pista'); // Onde os cards ficam alinhados
    const btnAnt = carrossel.querySelector('.btn-ant');        // Botão Voltar
    const btnProx = carrossel.querySelector('.btn-prox');      // Botão Avançar
    
    // Se o HTML estiver mal montado e faltar algum desses 3 elementos, ignora este carrossel e não quebra o resto do site
    if (!pista || !btnAnt || !btnProx) return;

    // Variável interna que guarda quantos pixels a pista se moveu para a esquerda ou direita
    let posicaoAtual = 0;

    // Função inteligente que calcula o "tamanho do pulo" que o carrossel vai dar
    function obterLarguraPasso() {
        const card = carrossel.querySelector('.card-produto');
        if (!card) return 0; // Se não tiver nenhum produto cadastrado, o passo é zero
        
        // Pega as propriedades reais computadas pelo CSS na pista (pra descobrir o espaçamento/gap real)
        const estiloPista = window.getComputedStyle(pista);
        const gap = parseInt(estiloPista.gap) || 0; // Pega o gap em número puro (ex: "20px" vira 20)
        
        // O passo total será a largura de um card de produto somado com o espaço entre eles
        return card.offsetWidth + gap;
    }

    // Evento de clique para avançar os produtos do carrossel
    btnProx.addEventListener('click', () => {
        const larguraPasso = obterLarguraPasso(); // Calcula o tamanho atual do passo
        // Descobre o limite máximo de rolagem (largura total interna da pista menos o que já está visível na tela)
        const limiteMaximo = pista.scrollWidth - pista.parentElement.offsetWidth;
        
        // Math.abs transforma o número negativo em positivo para fazermos a comparação matemática limpa
        if (Math.abs(posicaoAtual) < limiteMaximo) {
            posicaoAtual -= larguraPasso; // Subtrai o passo (valores negativos empurram a pista para a esquerda)
            pista.style.transform = `translateX(${posicaoAtual}px)`; // Aplica o movimento via CSS
        }
    });

    // Evento de clique para voltar os produtos do carrossel
    btnAnt.addEventListener('click', () => {
        const larguraPasso = obterLarguraPasso();
        
        // Só deixa voltar se a posição atual for menor que 0 (ou seja, se ele já andou para frente alguma vez)
        if (posicaoAtual < 0) {
            posicaoAtual += larguraPasso; // Soma o passo (valores mais próximos de 0 trazem a pista de volta para a direita)
            pista.style.transform = `translateX(${posicaoAtual}px)`; // Atualiza a posição na tela
        }
    });
});
