// ===== Controle de Zoom de Texto e Cards =====
const container = document.getElementById('container');
const indicadorTamanho = document.getElementById('indicador-tamanho');
const btnAumentar = document.getElementById('aumentar-tamanho');
const btnDiminuir = document.getElementById('diminuir-tamanho');
const botoesDaltonismo = document.querySelectorAll('.btn-daltonismo');

let escala = 1;
const minEscala = 0.8;
const maxEscala = 1.5;
const passo = 0.1;

function atualizarTamanho() {
    // Aplica a escala a todos os cards
    const cards = document.querySelectorAll('.cartao');
    cards.forEach(card => {
        const espacoExtra = Math.max(0, (escala - 1) * card.offsetHeight);
        card.style.setProperty('--espaco-extra', `${espacoExtra}px`);
        card.style.transform = `scale(${escala})`;
        card.style.transformOrigin = 'top center';
    });
    
    // Atualiza o indicador
    indicadorTamanho.textContent = `${Math.round(escala * 100)}%`;
    
    // Desabilita botões nos limites
    btnDiminuir.disabled = escala <= minEscala;
    btnAumentar.disabled = escala >= maxEscala;
}

btnAumentar.addEventListener('click', () => {
    if (escala < maxEscala) {
        escala = Math.min(maxEscala, escala + passo);
        atualizarTamanho();
    }
});

btnDiminuir.addEventListener('click', () => {
    if (escala > minEscala) {
        escala = Math.max(minEscala, escala - passo);
        atualizarTamanho();
    }
});

// Inicializa o tamanho
atualizarTamanho();

// ===== Controle de tipo de daltonismo =====
botoesDaltonismo.forEach(botao => {
    botao.addEventListener('click', () => {
        document.body.dataset.tema = botao.dataset.tema;

        botoesDaltonismo.forEach(botaoAtual => {
            const selecionado = botaoAtual === botao;
            botaoAtual.classList.toggle('ativo', selecionado);
            botaoAtual.setAttribute('aria-pressed', selecionado);
        });
    });
});

// ===== Controle de Flip dos Cards =====
// Seleciona todos os elementos com a classe 'cartao'
document.querySelectorAll('.cartao').forEach(card => {
    // Adiciona um 'event listener' para o evento de clique em cada card
    card.addEventListener('click', () => {
        // Alterna a classe 'virado' no card clicado
        card.classList.toggle('virado');
        console.log('Card clicado! Classe "virado" alternada.'); // Mensagem para depuração
    });
});
