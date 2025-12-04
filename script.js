// LISTA DE PRODUTOS
const produtos = [
    { nome: "Alcatra com Picanha", preco: 59.90, img: "imagens/produtos/alcatra_com_picanha.png", categoria: "bovino" },
    { nome: "Bife de Alcatra", preco: 49.98, img: "imagens/produtos/bife-alcatra.png", categoria: "bovino" },
    { nome: "Coxa de Frango", preco: 14.90, img: "imagens/produtos/frango.png", categoria: "frango" },
    { nome: "Pernil Suíno", preco: 22.50, img: "imagens/produtos/suino.png", categoria: "suino" }
];


// PEGAR CONTAINER
const produtosContainer = document.getElementById("produtos-container");


// FUNÇÃO PARA RENDERIZAR PRODUTOS COM FILTRO
function renderProdutos(filtro = "todos") {
    produtosContainer.innerHTML = "";

    const listaFiltrada =
        filtro === "todos" ? produtos : produtos.filter(p => p.categoria === filtro);

    listaFiltrada.forEach((p, index) => {
        produtosContainer.innerHTML += `
            <div class="produto">
                <img src="${p.img}" alt="${p.nome}">
                <h3>${p.nome}</h3>
                <p class="preco">R$ ${p.preco.toFixed(2)}/kg</p>
                <div class="produto-botoes">
                <button onclick="addCarrinho(${produtos.indexOf(p)})">Adicionar</button>
                <button onclick="removeFromCart('${p.nome}')">Remover</button>
                </div>
            </div>
        `;
    });
}

// render inicial
renderProdutos();


// CARRINHO
let carrinho = [];

function removeFromCart(nome) {
const index = carrinho.findIndex(item => item.nome === nome);
if (index !== -1) {
carrinho.splice(index, 1);
atualizarCarrinho();
}
}

function addCarrinho(index) {
    const produto = produtos[index];
    const item = carrinho.find(i => i.nome === produto.nome);

    if (item) {
        item.qtd++;
    } else {
        carrinho.push({ nome: produto.nome, preco: produto.preco, qtd: 1 });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalTexto = document.getElementById("total-geral");
    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.qtd;
        total += subtotal;

        lista.innerHTML += `
            <div class="item-carrinho">
                <p>${item.nome} (x${item.qtd})</p>
                <p>R$ ${subtotal.toFixed(2)}</p>
            </div>
        `;
    });

    totalTexto.textContent = total.toFixed(2);
}


// BOTÕES DE FILTRO
const botoesFiltro = document.querySelectorAll(".tipos");
const botaoReset = document.querySelector(".tipos-delet");

// Clicar em qualquer filtro normal
botoesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {

        // tirar ativo de todos
        botoesFiltro.forEach(b => b.classList.remove("ativo"));
        botaoReset.classList.remove("ativo");

        // ativar o clicado
        btn.classList.add("ativo");

        // categoria
        const categoria = btn.getAttribute("data-cat");

        // atualizar lista filtrada
        renderProdutos(categoria);
    });
});

// Clicar no X → mostrar todos os produtos
botaoReset.addEventListener("click", () => {

    // remover ativo de todos os filtros
    botoesFiltro.forEach(b => b.classList.remove("ativo"));

    // ativar apenas o botão X
    botaoReset.classList.add("ativo");

    // mostrar todos os produtos
    renderProdutos("todos");
});



// ENVIAR PEDIDO PELO WHATSAPP
const btnFinalizar = document.getElementById("btn-finalizar");

btnFinalizar.addEventListener("click", () => {
    const rua = document.getElementById("rua").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const bairro = document.getElementById("bairro").value.trim();

    if (!rua || !numero || !bairro) {
        return alert("Por favor, preencha Rua, Número e Bairro.");
    }

    if (carrinho.length === 0)
        return alert("Seu carrinho está vazio!");

    let mensagem = "*Pedido:*%0A";

    carrinho.forEach(item => {
        mensagem += `${item.nome} - ${item.qtd}x - R$ ${(item.preco * item.qtd).toFixed(2)}%0A`;
    });

    mensagem += `%0A*Endereço:*%0A${rua}, nº ${numero}%0ABairro: ${bairro}%0A`;
    mensagem += `%0ATotal: R$ ${document.getElementById("total-geral").textContent}`;

    window.open(`https://wa.me/5545991120288?text=${mensagem}`);
});