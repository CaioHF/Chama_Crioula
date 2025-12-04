// LISTA DE PRODUTOS (com categoria)
const produtos = [
  { nome: "Bisteca Suina", preco: 23.98, img: "imagens/produtos/bisteca_suina.png", categoria: "ofertas" },
  { nome: "Alcatra com Picanha", preco: 59.90, img: "imagens/produtos/alcatra.png", categoria: "bovino" },
  { nome: "Bife de Alcatra", preco: 49.98, img: "imagens/produtos/bife.png", categoria: "bovino" },
  { nome: "Pernil Suíno", preco: 23.98, img: "imagens/produtos/pernil.png", categoria: "suino" },
  { nome: "Meio da Asa", preco: 29.98, img: "imagens/produtos/meio_da_asa.png", categoria: "frango" },
  { nome: "Carvão 4kg", preco: 29.98, img: "imagens/produtos/carvao4.png", categoria: "acompanhamentos" }
];

// referencia DOM
const produtosContainer = document.getElementById('produtos-container');
const listaCarrinhoEl = document.getElementById('lista-carrinho');
const totalGeralEl = document.getElementById('total-geral');

// estado do carrinho
// estrutura: [{ nome, preco, qtd }]
let carrinho = [];

// --- renderizar produtos (leva em conta categoria) ---
function renderProdutos(filtro = 'todos'){
  produtosContainer.innerHTML = '';
  const listaFiltrada = filtro === 'todos' ? produtos : produtos.filter(p => p.categoria === filtro);

  listaFiltrada.forEach((p) =>{
    const index = produtos.indexOf(p); // índice no array original
    produtosContainer.innerHTML += `
      <div class="produto">
        <img src="${p.img}">
        <h3>${p.nome}</h3>
        <p class="preco">R$ ${p.preco.toFixed(2)}/kg</p>
        <div class="produto-botoes">
          <button class="btn-add" onclick="addCarrinho(${index})">Adicionar</button>
          <button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
        </div>
      </div>
    `;
  });
}

// inicial
renderProdutos();

// --- funções do carrinho ---
function addCarrinho(index){
  const produto = produtos[index];
  if(!produto) return;
  const item = carrinho.find(i => i.nome === produto.nome);
  if(item){
    item.qtd++;
  } else {
    carrinho.push({ nome: produto.nome, preco: produto.preco, qtd: 1 });
  }
  atualizarCarrinho();
}

function removeFromCart(index){
  const produto = produtos[index];
  if(!produto) return;
  const item = carrinho.find(i => i.nome === produto.nome);
  if(!item) return; // nada a remover

  // diminuir apenas 1 unidade; se chegar a 0 remove do array
  if(item.qtd > 1){
    item.qtd--;
  } else {
    // remove o item por completo
    carrinho = carrinho.filter(i => i.nome !== produto.nome);
  }

  atualizarCarrinho();
}

function atualizarCarrinho(){
  listaCarrinhoEl.innerHTML = '';
  let total = 0;

  if(carrinho.length === 0){
    
  } else {
    carrinho.forEach(item =>{
      const subtotal = item.preco * item.qtd;
      total += subtotal;
      listaCarrinhoEl.innerHTML += `
        <div class="item-carrinho">
          <div>${item.nome} (x${item.qtd})</div>
          <div>R$ ${subtotal.toFixed(2)}</div>
        </div>
      `;
    });
  }

  totalGeralEl.textContent = total.toFixed(2);
}

// --- filtros ---
const botoesFiltro = document.querySelectorAll('.tipos');
const botaoReset = document.querySelector('.tipos-delet');

botoesFiltro.forEach(btn =>{
  btn.addEventListener('click', ()=>{
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    if(botaoReset) botaoReset.classList.remove('ativo');
    btn.classList.add('ativo');
    const cat = btn.getAttribute('data-cat');
    renderProdutos(cat === 'todos' ? 'todos' : cat);
  });
});

if(botaoReset){
  botaoReset.addEventListener('click', ()=>{
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    botaoReset.classList.add('ativo');
    renderProdutos('todos');
  });
}

// --- enviar pedido via WhatsApp ---
const btnFinalizar = document.getElementById('btn-finalizar');
if(btnFinalizar){
  btnFinalizar.addEventListener('click', ()=>{
    const rua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();

    if(!rua || !numero || !bairro){
      alert('Por favor, preencha o endereço completo: Rua, Número e Bairro.');
      return;
    }

    if(carrinho.length === 0){
      alert('Seu carrinho está vazio!');
      return;
    }

    let mensagem = '*Pedido:*%0A';
    carrinho.forEach(item =>{
      mensagem += `${item.nome} - ${item.qtd}x - R$ ${(item.preco * item.qtd).toFixed(2)}%0A`;
    });

    mensagem += `%0A*Endereço de entrega:*%0A${rua}, nº ${numero}%0ABairro: ${bairro}%0A`;
    mensagem += `%0ATotal: R$ ${totalGeralEl.textContent}`;

    window.open(`https://wa.me/5545991120288?text=${mensagem}`);
  });
}
