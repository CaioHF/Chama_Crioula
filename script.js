// CONFIGURAÇÃO: categorias que usam corte e kg-step 0.5
const categoriasComCorte = ['bovino','suino','ofertas']; 
const categoriasKg05 = ['bovino','suino','frango','ofertas']; 
const categoriasUnidade = ['acompanhamentos']; 

// LISTA DE PRODUTOS (com categoria)
const produtos = [
  { nome: "Bisteca Suina", preco: 23.98, img: "imagens/produtos/bisteca_suina.png", categoria: "ofertas" },
  { nome: "Picanha", preco: 0.00, img: "imagens/produtos/picanha.png", categoria: "bovino" },
  { nome: "Alcatra com Picanha", preco: 49.98, img: "imagens/produtos/alcatra.png", categoria: "bovino" },
  { nome: "Bife de Alcatra", preco: 49.98, img: "imagens/produtos/bife.png", categoria: "bovino" },
  { nome: "Corte Americano", preco: 41.98, img: "imagens/produtos/americano.png", categoria: "bovino" },
  { nome: "Bisteca com Filé", preco: 48.98, img: "imagens/produtos/bisteca_c_file.png", categoria: "bovino" },
  { nome: "Bisteca sem Filé", preco: 38.98, img: "imagens/produtos/bisteca_s_mignon.png", categoria: "bovino" },
  { nome: "Costela Minga", preco: 30.98, img: "imagens/produtos/costela_minga.png", categoria: "bovino" },
  { nome: "Costela Ripa", preco: 34.98, img: "imagens/produtos/costela_ripa.png", categoria: "bovino" },
  { nome: "Fraldinha", preco: 39.98, img: "imagens/produtos/fraldinha.png", categoria: "bovino" },
  { nome: "Maminha", preco: 0.00, img: "imagens/produtos/maminha.png", categoria: "bovino" },
  { nome: "Musculo", preco: 28.98, img: "imagens/produtos/musculo.png", categoria: "bovino" },
  { nome: "Patinho", preco: 46.98, img: "imagens/produtos/patinho.png", categoria: "bovino" },
  { nome: "Traseiro", preco: 39.98, img: "imagens/produtos/traseiro.png", categoria: "bovino" },
  { nome: "Filá Agulha", preco: 31.98, img: "imagens/produtos/file_agulha.png", categoria: "bovino" },
  { nome: "Acém", preco: 29.98, img: "imagens/produtos/acem.png", categoria: "bovino" },
  { nome: "Carne moída 1º", preco: 44.98, img: "imagens/produtos/carne_moida1.png", categoria: "bovino" },
  { nome: "Carne moída 2º", preco: 32.98, img: "imagens/produtos/carne_moida2.png", categoria: "bovino" },
  { nome: "Coxão Mole", preco: 48.98, img: "imagens/produtos/coxao_mole.png", categoria: "bovino" },
  { nome: "Posta Vermelha", preco: 36.95, img: "imagens/produtos/posta_vermelha.png", categoria: "bovino" },
  { nome: "Ponta de Peito", preco: 30.98, img: "imagens/produtos/ponta_de_peito.png", categoria: "bovino" },
  { nome: "Paleta 7", preco: 39.98, img: "imagens/produtos/paleta7.png", categoria: "bovino" },
  { nome: "Paleta Simples", preco: 33.95, img: "imagens/produtos/paleta0.png", categoria: "bovino" },
  { nome: "Pernil Suíno", preco: 23.98, img: "imagens/produtos/pernil.png", categoria: "suino" },
  { nome: "Paleta Suíno", preco: 23.98, img: "imagens/produtos/paleta_suina.png", categoria: "suino" },
  { nome: "Costela Suína", preco: 29.98, img: "imagens/produtos/costela_suina.png", categoria: "suino" },
  { nome: "Panceta Suína", preco: 23.98, img: "imagens/produtos/panceta.png", categoria: "suino" },
  { nome: "Bisteca Suína", preco: 23.98, img: "imagens/produtos/bisteca_suina.png", categoria: "suino" },
  { nome: "Meio da Asa", preco: 29.98, img: "imagens/produtos/meio_da_asa.png", categoria: "frango" },
  { nome: "Coxinha da Asa", preco: 22.98, img: "imagens/produtos/coxinha_asa.png", categoria: "frango" },
  { nome: "Frango Inteiro", preco: 14.98, img: "imagens/produtos/frango.png", categoria: "frango" },
  { nome: "Coração", preco: 25.98, img: "imagens/produtos/coracao.png", categoria: "frango" },
  { nome: "Carvão 4kg", preco: 29.98, img: "imagens/produtos/carvao4.png", categoria: "acompanhamentos" },
  { nome: "Pão de Alho", preco: 12.98, img: "imagens/produtos/pao.png", categoria: "acompanhamentos" },
];

// DOM refs
const produtosContainer = document.getElementById('produtos-container');
const listaCarrinhoEl = document.getElementById('lista-carrinho');
const totalGeralEl = document.getElementById('total-geral');
const inputBusca = document.getElementById('buscar');
const boxAuto = document.getElementById('autocomplete');
const botaoLupa = document.getElementById('btn-buscar');
const botoesFiltro = document.querySelectorAll('.tipos');
const botaoReset = document.querySelector('.tipos-delet');

// --- MUDANÇA 1: Inicializar carrinho verificando o LocalStorage ---
let carrinho = [];

// Se existir algo salvo, carrega para a memória
if (localStorage.getItem('carrinhoSalvo')) {
    try {
        carrinho = JSON.parse(localStorage.getItem('carrinhoSalvo'));
    } catch (e) {
        carrinho = []; // Se der erro ao ler, zera por segurança
    }
}

// cortes padrão
const cortesPadrao = ['Corte fino','Corte grosso','Em cubos','Moído','Para churrasco'];

// helper para formatar dinheiro
function fmtMoney(v){ return Number(v).toFixed(2); }

// --- render produtos (lista vertical) ---
function renderProdutos(filtro = 'todos'){
  produtosContainer.innerHTML = '';

  let lista = [];
  if(filtro === 'todos') lista = produtos;
  else {
    const existeCategoria = produtos.some(p => p.categoria && p.categoria.toLowerCase() === String(filtro).toLowerCase());
    if(existeCategoria) lista = produtos.filter(p => p.categoria.toLowerCase() === String(filtro).toLowerCase());
    else {
      const termo = String(filtro).toLowerCase().trim();
      lista = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    }
  }

  if(lista.length === 0){
    produtosContainer.innerHTML = '<p style="text-align:center;font-size:1.1rem;margin-top:12px;">Produto não encontrado</p>';
    return;
  }

  lista.forEach((p, idx) => {
    const index = produtos.indexOf(p);
    const isCorte = categoriasComCorte.includes(p.categoria);
    const isUnidade = categoriasUnidade.includes(p.categoria);

    // default qty
    const defaultQty = isUnidade ? 1 : 1.0;

    produtosContainer.innerHTML += `
      <article class="produto" data-index="${index}">
        <div class="thumb"><img src="${p.img || 'imagens/default.png'}" alt="${p.nome}"></div>
        <div class="info">
          <h3>${p.nome}</h3>
          <div class="preco">R$ ${fmtMoney(p.preco)} ${isUnidade ? 'Und' : 'Kg'}</div>

          ${ isCorte ? `
            <div class="cortes" data-name="cortes-${index}">
              ${cortesPadrao.map((c, i) => `<label><input type="radio" name="corte-${index}" value="${c}" ${i===0? 'checked':''}> ${c}</label>`).join('')}
            </div>
          ` : '' }

          <div class="qtd-box" data-name="qtd-${index}">
            <button class="menos" data-action="menos">-</button>
            <input class="input-qtd" data-type="${isUnidade ? '' : ''}" value="${defaultQty.toFixed(2)}">
            <button class="mais" data-action="mais">+</button>
            <span>${isUnidade ? '' : ''}</span>
          </div>

          <button class="btn-add-prod" data-action="add">✔ Adicionar ao pedido</button>
        </div>
      </article>
    `;
  });

  // after render: ensure inputs have correct initial formatting
  document.querySelectorAll('.produto').forEach(prodEl => {
    const idx = prodEl.dataset.index;
    const p = produtos[idx];
    const input = prodEl.querySelector('.input-qtd');
    if(!input) return;
    if(categoriasUnidade.includes(p.categoria)) input.value = '1';
    else input.value = '1.00';
  });
}

// inicial
renderProdutos();
// Renderiza o carrinho logo de cara (para mostrar o que veio do localStorage)
atualizarCarrinho();


// --- autocomplete / busca ---
inputBusca.addEventListener('input', ()=>{
  const texto = inputBusca.value.toLowerCase();
  boxAuto.innerHTML = '';
  if(texto.length === 0){ boxAuto.style.display='none'; return; }

  const sugestoes = produtos.filter(p => p.nome.toLowerCase().includes(texto));
  if(sugestoes.length === 0){
    boxAuto.innerHTML = '<div class="item-auto">Nenhum produto encontrado</div>'; boxAuto.style.display='block'; return;
  }
  sugestoes.forEach(p => {
    const div = document.createElement('div');
    div.className = 'item-auto';
    div.textContent = p.nome;
    div.onclick = ()=> { inputBusca.value = p.nome; boxAuto.style.display='none'; filtrarProdutoPorNome(); };
    boxAuto.appendChild(div);
  });
  boxAuto.style.display='block';
});

inputBusca.addEventListener('keydown', e => { if(e.key === 'Enter') filtrarProdutoPorNome(); });
botaoLupa.addEventListener('click', filtrarProdutoPorNome);

function filtrarProdutoPorNome(){
  const nome = inputBusca.value.trim();
  if(!nome) return;
  renderProdutos(nome);
  boxAuto.style.display = 'none';
}

// --- delegação de eventos na lista de produtos ---
produtosContainer.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button');
  if(!btn) return;
  const artigo = ev.target.closest('.produto');
  if(!artigo) return;
  const idx = Number(artigo.dataset.index);
  const p = produtos[idx];

  if(btn.dataset.action === 'mais' || btn.dataset.action === 'menos'){
    const input = artigo.querySelector('.input-qtd');
    if(!input) return;
    const isUnit = categoriasUnidade.includes(p.categoria);
    const step = isUnit ? 1 : 0.5;
    let val = parseFloat(input.value.replace(',', '.')) || 0;
    if(btn.dataset.action === 'mais') val = +(val + step);
    else val = +(val - step);
    if(isUnit) val = Math.max(1, Math.round(val)); else val = Math.max(step, Math.round(val*100)/100);
    input.value = isUnit ? String(Math.round(val)) : val.toFixed(2);
    return;
  }

  if(btn.dataset.action === 'add'){
    const isUnit = categoriasUnidade.includes(p.categoria);
    let qty = parseFloat(artigo.querySelector('.input-qtd').value.replace(',', '.')) || 0;
    if(isUnit) qty = Math.round(qty);
    else qty = +qty.toFixed(2);
    let corte = null;
    if(categoriasComCorte.includes(p.categoria)){
      const radio = artigo.querySelector(`input[name="corte-${idx}"]:checked`);
      corte = radio ? radio.value : null;
    }
    const key = `${p.nome}|${corte || ''}`;
    const existing = carrinho.find(i => i.key === key);
    if(existing){
      existing.qtd = +(existing.qtd + qty).toFixed(2);
    } else {
      carrinho.push({
        key,
        nome: p.nome,
        preco: p.preco,
        categoria: p.categoria,
        corte: corte,
        qtd: qty
      });
    }
    atualizarCarrinho();
    showToast();
  }
});

// --- funções do carrinho (render + ajustar qtd por item) ---
function atualizarCarrinho(){
  listaCarrinhoEl.innerHTML = '';
  let total = 0;

  if(carrinho.length === 0){
    listaCarrinhoEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
  } else {
    carrinho.forEach((item, i) => {
      const subtotal = item.preco * item.qtd;
      total += subtotal;

      const isUnit = categoriasUnidade.includes(item.categoria);

      listaCarrinhoEl.innerHTML += `
        <div class="cart-item" data-key="${item.key}">
          <div class="cart-left">
            <div><strong>${item.nome}</strong> ${item.corte ? ` - ${item.corte}` : ''}</div>
            <div>Qtd: ${item.qtd} ${isUnit ? 'un' : 'kg'} — R$ ${subtotal.toFixed(2)}</div>
          </div>
          <div class="cart-controls">
            <button class="cart-minus" data-i="${i}">-</button>
            <button class="cart-plus" data-i="${i}">+</button>
          </div>
        </div>
      `;
    });
  }

  totalGeralEl.textContent = total.toFixed(2);

  // --- MUDANÇA 2: Salvar no LocalStorage TODA VEZ que atualizar o carrinho ---
  // Isso cobre: adicionar item, remover item, aumentar quantidade, diminuir quantidade.
  localStorage.setItem('carrinhoSalvo', JSON.stringify(carrinho));
}

// delega clicks no carrinho
listaCarrinhoEl.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button');
  if(!btn) return;
  const idx = Number(btn.dataset.i);
  if(Number.isNaN(idx)) return;
  const item = carrinho[idx];
  if(!item) return;
  const isUnit = categoriasUnidade.includes(item.categoria);
  const step = isUnit ? 1 : 0.5;

  if(btn.classList.contains('cart-plus')){
    item.qtd = +(item.qtd + step).toFixed(2);
  } else if(btn.classList.contains('cart-minus')){
    item.qtd = +(item.qtd - step).toFixed(2);
    if(item.qtd <= 0) {
      carrinho.splice(idx,1);
    }
  }
  atualizarCarrinho();
});

// --- filtros (botões) ---
botoesFiltro.forEach(btn => {
  btn.addEventListener('click', ()=> {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    if(botaoReset) botaoReset.classList.remove('ativo');
    btn.classList.add('ativo');
    const cat = btn.getAttribute('data-cat');
    renderProdutos(cat === 'todos' ? 'todos' : cat);
  });
});

if(botaoReset){
  botaoReset.addEventListener('click', ()=> {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    botaoReset.classList.add('ativo');
    renderProdutos('todos');
  });
}

// --- enviar pedido via WhatsApp ---
const btnFinalizar = document.getElementById('btn-finalizar');
if(btnFinalizar){
  btnFinalizar.addEventListener('click', ()=> {
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
    carrinho.forEach(item => {
      const unitLabel = categoriasUnidade.includes(item.categoria) ? 'un' : 'KG';
      mensagem += `Produto: ${item.nome}%0A`;
      if(item.corte) mensagem += `Corte: ${item.corte}%0A`;
      mensagem += `Quantidade: ${item.qtd} ${unitLabel}%0A`;
      mensagem += `Subtotal: R$ ${(item.preco * item.qtd).toFixed(2)}%0A%0A`;
    });

    mensagem += `*Endereço de entrega:*%0A${rua}, nº ${numero}%0ABairro: ${bairro}%0A%0A`;
    mensagem += `*Total: R$ ${totalGeralEl.textContent}%0A`;

    window.open(`https://wa.me/5545991120288?text=${mensagem}`);

    // --- MUDANÇA 3: Limpar o carrinho DEPOIS de enviar o pedido ---
    carrinho = [];
    localStorage.removeItem('carrinhoSalvo'); // Apaga do navegador
    atualizarCarrinho(); // Zera a tela
  });
}

const btn = document.getElementById("btn-horarios");
const modal = document.getElementById("modal-horarios");
const closeBtn = document.querySelector(".close");

if(btn && modal && closeBtn) {
    btn.onclick = function() { modal.style.display = "flex"; }
    closeBtn.onclick = function() { modal.style.display = "none"; }
    window.onclick = function(event) { if (event.target === modal) modal.style.display = "none"; }
}

function showToast(msg = "Produto adicionado ao pedido") {
  const toast = document.getElementById("toast");
  if(toast){
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); }, 2000);
  }
}

// Modal info
const modalInfo = document.getElementById("modalInfo");
const modalInfoTitle = document.getElementById("modalInfo-title");
const modalInfoImg = document.getElementById("modalInfo-img");
const modalInfoDesc = document.getElementById("modalInfo-desc");
const modalInfoClose = document.getElementById("modalInfo-close");

// Abrir modal ao clicar no card
document.addEventListener("click", e => {
  const card = e.target.closest(".produto");
  if (!card) return;

  if (
    e.target.closest(".btn-add-prod") || 
    e.target.closest(".qtd-box") || 
    e.target.closest(".cortes") || 
    e.target.tagName === "INPUT" || 
    e.target.tagName === "LABEL" || 
    e.target.tagName === "BUTTON"
  ) {
    return;
  }

  const nome = card.querySelector("h3")?.textContent || "";
  const imgSrc = card.querySelector("img")?.src || "";

  if(modalInfo && modalInfoTitle && modalInfoImg && modalInfoDesc){
      modalInfoTitle.textContent = nome;
      modalInfoImg.src = imgSrc;
      modalInfoDesc.textContent = "Corte Especial Leve para sua mesa o verdadeiro sabor do campo.Entregue resfriada (nunca congelada) para garantir a máxima suculência.";
      modalInfo.classList.add("show");
  }
});

if(modalInfoClose){
    modalInfoClose.addEventListener("click", () => {
      modalInfo.classList.remove("show");
    });
}

if(modalInfo){
    modalInfo.addEventListener("click", e => {
      if (e.target === modalInfo) {
        modalInfo.classList.remove("show");
      }
    });
}