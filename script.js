// LISTA DE PRODUTOS (com categoria)
const produtos = [
  { nome: "Bisteca Suina", preco: 23.98, img: "", categoria: "ofertas" },
  { nome: "Alcatra com Picanha", preco: 59.90, img: "", categoria: "bovino" },
  { nome: "Bife de Alcatra", preco: 49.98, img: "", categoria: "bovino" },
  { nome: "Pernil Suíno", preco: 23.98, img: "i", categoria: "suino" },
  { nome: "Meio da Asa", preco: 29.98, img: "", categoria: "frango" },
  { nome: "Carvão 4kg", preco: 29.98, img: "", categoria: "acompanhamentos" }
];

// referencia DOM
const produtosContainer = document.getElementById('produtos-container');
const listaCarrinhoEl = document.getElementById('lista-carrinho');
const totalGeralEl = document.getElementById('total-geral');
const inputBusca = document.getElementById('buscar');
const boxAuto = document.getElementById('autocomplete');
const botaoLupa = document.getElementById('btn-buscar');

// estado do carrinho
// estrutura: [{ nome, preco, qtd }]
let carrinho = [];

// --- Renderizar Produtos ---
function renderProdutos(filtro = 'todos'){
produtosContainer.innerHTML = '';


// Se filtro == 'todos' mostrar todos
if(filtro === 'todos'){
produtos.forEach(p => {
const index = produtos.indexOf(p);
produtosContainer.innerHTML += `
<div class="produto">
<img src="${p.img}" alt="${p.nome}">
<h3>${p.nome}</h3>
<p class="preco">R$ ${p.preco.toFixed(2)}/kg</p>
<div class="produto-botoes">
<button class="btn-add" onclick="addCarrinho(${index})">Adicionar</button>
<button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
</div>
</div>
`;
});
return;
}


// Se existe algum produto com essa categoria, filtra por categoria
const existeCategoria = produtos.some(p => p.categoria && p.categoria.toLowerCase() === String(filtro).toLowerCase());


let listaFiltrada = [];
if(existeCategoria){
listaFiltrada = produtos.filter(p => p.categoria && p.categoria.toLowerCase() === String(filtro).toLowerCase());
} else {
// Caso contrário, trata filtro como busca por nome (aceita includes, não só igualdade)
const termo = String(filtro).toLowerCase().trim();
listaFiltrada = produtos.filter(p => p.nome.toLowerCase().includes(termo));
}


if(listaFiltrada.length === 0){
produtosContainer.innerHTML = '<p style="text-align:center;font-size:1.2rem;margin-top:20px;">Produto não encontrado</p>';
return;
}


listaFiltrada.forEach(p =>{
const index = produtos.indexOf(p);
produtosContainer.innerHTML += `
<div class="produto">
<img src="${p.img}" alt="${p.nome}">
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


renderProdutos();



// --- Autocomplete ---
inputBusca.addEventListener('input', ()=>{
const texto = inputBusca.value.toLowerCase();
boxAuto.innerHTML = '';


if(texto.length === 0){
boxAuto.style.display = 'none';
return;
}


const sugestoes = produtos.filter(p => p.nome.toLowerCase().includes(texto));


if(sugestoes.length === 0){
boxAuto.innerHTML = '<div class="item-auto">Nenhum produto encontrado</div>';
boxAuto.style.display = 'block';
return;
}


sugestoes.forEach(p =>{
const div = document.createElement('div');
div.classList.add('item-auto');
div.textContent = p.nome;
div.onclick = ()=>{
inputBusca.value = p.nome;
boxAuto.style.display = 'none';
filtrarProdutoPorNome();
};
boxAuto.appendChild(div);
});


boxAuto.style.display = 'block';
});


// --- Buscar ao apertar Enter ---
inputBusca.addEventListener('keydown', e =>{
if(e.key === 'Enter'){
filtrarProdutoPorNome();
}
});


// --- Buscar ao clicar na lupa ---
botaoLupa.addEventListener('click', filtrarProdutoPorNome);


function filtrarProdutoPorNome(){
const nome = inputBusca.value.trim();
if(nome === '') return;
renderProdutos(nome); // usa o nome como filtro
boxAuto.style.display = 'none';
}

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
