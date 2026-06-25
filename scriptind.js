const carrosseis = document.querySelectorAll('.container-carrossel');

carrosseis.forEach((carrossel) => {
    const pista = carrossel.querySelector('.carrossel-pista');
    const btnAnt = carrossel.querySelector('.btn-ant');
    const btnProx = carrossel.querySelector('.btn-prox');
    
    if (!pista || !btnAnt || !btnProx) return;

    let posicaoAtual = 0;

    function obterLarguraPasso() {
        const card = carrossel.querySelector('.card-produto');
        if (!card) return 0;
        const estiloPista = window.getComputedStyle(pista);
        const gap = parseInt(estiloPista.gap) || 0;
        return card.offsetWidth + gap;
    }

    btnProx.addEventListener('click', () => {
        const larguraPasso = obterLarguraPasso();
        const limiteMaximo = pista.scrollWidth - pista.parentElement.offsetWidth;
        
        if (Math.abs(posicaoAtual) < limiteMaximo) {
            posicaoAtual -= larguraPasso;
            pista.style.transform = `translateX(${posicaoAtual}px)`;
        }
    });

    btnAnt.addEventListener('click', () => {
        const larguraPasso = obterLarguraPasso();
        
        if (posicaoAtual < 0) {
            posicaoAtual += larguraPasso;
            pista.style.transform = `translateX(${posicaoAtual}px)`;
        }
    });
});
  