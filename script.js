// Variáveis para armazenar o item selecionado em cada categoria
let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

// Função para marcar um item como selecionado e desmarcar o anterior da mesma categoria
function selecionarItem(categoria, item, nome, preco) {
    // Verifica a categoria para alterar o item selecionado
    if (categoria === 'prato') {
        // Desmarca o anterior, se houver
        if (pratoSelecionado) {
            pratoSelecionado.classList.remove('selecionado');
        }
        // Marca o novo item
        pratoSelecionado = item;
    } else if (categoria === 'bebida') {
        if (bebidaSelecionada) {
            bebidaSelecionada.classList.remove('selecionado');
        }
        bebidaSelecionada = item;
    } else if (categoria === 'sobremesa') {
        if (sobremesaSelecionada) {
            sobremesaSelecionada.classList.remove('selecionado');
        }
        sobremesaSelecionada = item;
    }
    item.classList.add('selecionado');

    // Verifica se os 3 itens foram selecionados para habilitar o botão
    verificarItensSelecionados();
}

// Função para verificar se os três itens estão selecionados e habilitar o botão
function verificarItensSelecionados() {
    const botaoFinalizar = document.querySelector('.finalizar-pedido');
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
        botaoFinalizar.disabled = false;
        botaoFinalizar.classList.add('ativo'); // Adiciona classe para mudar estilo (cor verde)
        botaoFinalizar.innerText = 'Fechar pedido';
    } else {
        botaoFinalizar.disabled = true;
        botaoFinalizar.classList.remove('ativo'); // Remove a classe se não estiver completo
        botaoFinalizar.innerText = 'Selecione os 3 itens para fechar o pedido';
    }
}

// Função para exibir a tela de confirmação do pedido
function confirmarPedido() {
    const modal = document.querySelector('.modal-confirmacao');
    const background = document.querySelector('.modal-background');
    const resumoPedido = document.querySelector('.resumo-pedido');
    const pratoNome = pratoSelecionado.querySelector('h3').innerText;
    const bebidaNome = bebidaSelecionada.querySelector('h3').innerText;
    const sobremesaNome = sobremesaSelecionada.querySelector('h3').innerText;
    const pratoPreco = pratoSelecionado.querySelector('.preco').innerText;
    const bebidaPreco = bebidaSelecionada.querySelector('.preco').innerText;
    const sobremesaPreco = sobremesaSelecionada.querySelector('.preco').innerText;

    const total = (
        parseFloat(pratoPreco.replace(',', '.')) +
        parseFloat(bebidaPreco.replace(',', '.')) +
        parseFloat(sobremesaPreco.replace(',', '.'))
    ).toFixed(2);

    resumoPedido.innerHTML = `
        <p>Prato: ${pratoNome} - R$ ${pratoPreco}</p>
        <p>Bebida: ${bebidaNome} - R$ ${bebidaPreco}</p>
        <p>Sobremesa: ${sobremesaNome} - R$ ${sobremesaPreco}</p>
        <p><strong>Total: R$ ${total}</strong></p>
    `;

    modal.style.display = 'block';  // Exibe o modal
    background.style.display = 'block'; // Exibe o fundo transparente
}

// Função para fechar o modal de confirmação
function cancelarPedido() {
    const modal = document.querySelector('.modal-confirmacao');
    const background = document.querySelector('.modal-background');
    modal.style.display = 'none';  // Oculta o modal
    background.style.display = 'none'; // Oculta o fundo transparente
}

// Função para enviar o pedido para o WhatsApp
function enviarPedido() {
    const pratoNome = pratoSelecionado.querySelector('h3').innerText;
    const bebidaNome = bebidaSelecionada.querySelector('h3').innerText;
    const sobremesaNome = sobremesaSelecionada.querySelector('h3').innerText;
    const pratoPreco = pratoSelecionado.querySelector('.preco').innerText;
    const bebidaPreco = bebidaSelecionada.querySelector('.preco').innerText;
    const sobremesaPreco = sobremesaSelecionada.querySelector('.preco').innerText;

    const total = (
        parseFloat(pratoPreco.replace(',', '.')) +
        parseFloat(bebidaPreco.replace(',', '.')) +
        parseFloat(sobremesaPreco.replace(',', '.'))
    ).toFixed(2);

    const mensagem = `Olá, gostaria de fazer o pedido:
    - Prato: ${pratoNome}
    - Bebida: ${bebidaNome}
    - Sobremesa: ${sobremesaNome}
    Total: R$ ${total}`;

    const url = `https://wa.me/5585987764006?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank'); // Abre o link do WhatsApp em uma nova aba
}

// Adiciona event listeners ao botão de confirmar e cancelar no modal
document.querySelector('.confirmar').addEventListener('click', enviarPedido);
document.querySelector('.cancelar').addEventListener('click', cancelarPedido);
