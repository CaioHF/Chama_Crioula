// CONFIGURAÇÃO: categorias que usam corte e kg-step 0.5
const categoriasComCorte = ['bovino','suino','ofertas'];
const categoriasKg05 = ['bovino','suino','frango','ofertas'];
const categoriasUnidade = ['acompanhamentos'];

// LISTA DE PRODUTOS (com categoria)
const produtos = [
  { nome: "Bisteca Suína", preco: 23.98, img: "imagens/produtos/bisteca_suina.png", categoria: "ofertas" },
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
  { nome: "Músculo", preco: 28.98, img: "imagens/produtos/musculo.png", categoria: "bovino" },
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

// DOM refs (note: listaCarrinho may exist multiple times in the page; we update all)
const produtosContainer = document.getElementById('produtos-container');
const totalGeralEl = document.getElementById('total-geral'); // aside total
const sidebarTotalEl = document.getElementById('sidebar-total'); // sidebar total (optional)
const inputBusca = document.getElementById('buscar');
const boxAuto = document.getElementById('autocomplete');
const botaoLupa = document.getElementById('btn-buscar');
const botoesFiltro = document.querySelectorAll('.tipos');
const botaoReset = document.querySelector('.tipos-delet');

// --- MUDANÇA 1: Inicializar carrinho verificando o LocalStorage ---
let carrinho = [];
if (localStorage.getItem('carrinhoSalvo')) {
  try { carrinho = JSON.parse(localStorage.getItem('carrinhoSalvo')) || []; }
  catch(e){ carrinho = []; }
}

// cortes padrão
const cortesPadrao = ['Corte fino','Corte grosso','Em cubos','Moído','Para churrasco'];

// helper para formatar dinheiro
function fmtMoney(v){ return Number(v).toFixed(2); }

// --- render produtos (lista vertical) ---
function renderProdutos(filtro = 'todos'){
  if(!produtosContainer) return;
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

  lista.forEach((p) => {
    const index = produtos.indexOf(p);
    const isCorte = categoriasComCorte.includes(p.categoria);
    const isUnidade = categoriasUnidade.includes(p.categoria);
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

            <button class="btn-select-corte" data-index="${index}">
               Corte: ${cortesPadrao[0]} <i class="fa-solid fa-chevron-down"></i>
            </button>
          ` : '' }

          <div class="qtd-box" data-name="qtd-${index}">
            <button class="menos" data-action="menos">-</button>
            <input class="input-qtd" data-type="${isUnidade ? 'un' : 'kg'}" value="${defaultQty.toFixed(2)}">
            <button class="mais" data-action="mais">+</button>
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
atualizarCarrinho(); // function defined below

// --- autocomplete / busca ---
if(inputBusca){
  inputBusca.addEventListener('input', ()=>{
    const texto = inputBusca.value.toLowerCase();
    if(!boxAuto) return;
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
}
if(botaoLupa) botaoLupa.addEventListener('click', filtrarProdutoPorNome);

function filtrarProdutoPorNome(){
  const nome = (inputBusca && inputBusca.value) ? inputBusca.value.trim() : '';
  if(!nome) return;
  renderProdutos(nome);
  if(boxAuto) boxAuto.style.display = 'none';
}

// --- delegação de eventos na lista de produtos ---
if(produtosContainer){
  produtosContainer.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const artigo = ev.target.closest('.produto');
    if(!artigo) return;
    const idx = Number(artigo.dataset.index);
    const p = produtos[idx];

    // mais/menos botões
    if(btn.dataset.action === 'mais' || btn.dataset.action === 'menos'){
      const input = artigo.querySelector('.input-qtd');
      if(!input) return;
      const isUnit = categoriasUnidade.includes(p.categoria);
      const step = isUnit ? 1 : 0.5;
      let val = parseFloat(String(input.value).replace(',', '.')) || 0;
      if(btn.dataset.action === 'mais') val = +(val + step);
      else val = +(val - step);
      if(isUnit) val = Math.max(1, Math.round(val)); else val = Math.max(step, Math.round(val*100)/100);
      input.value = isUnit ? String(Math.round(val)) : val.toFixed(2);
      return;
    }

    // adicionar ao carrinho
    if(btn.dataset.action === 'add'){
      const isUnit = categoriasUnidade.includes(p.categoria);
      let qty = parseFloat(String(artigo.querySelector('.input-qtd').value).replace(',', '.')) || 0;
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
}

// --- funções do carrinho (render + ajustar qtd por item) ---
function atualizarCarrinho(){
  // build HTML once, then write it to all occurrences
  let html = '';
  let total = 0;
  if(!carrinho || carrinho.length === 0){
    html = '<p>Seu carrinho está vazio.</p>';
  } else {
    carrinho.forEach((item, i) => {
      const subtotal = item.preco * item.qtd;
      total += subtotal;
      const isUnit = categoriasUnidade.includes(item.categoria);

      html += `
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

  // update all #lista-carrinho occurrences (re-query every time to be robust)
 // Atualiza carrinho do desktop
const listaDesktop = document.querySelector("#lista-carrinho");
if (listaDesktop) listaDesktop.innerHTML = html;

// Atualiza carrinho do mobile
const listaMobile = document.querySelector("#cartItems");
if (listaMobile) listaMobile.innerHTML = html;

// Atualiza total do mobile
const totalMobile = document.querySelector("#cartTotal");
if (totalMobile) totalMobile.textContent = fmtMoney(total);


  // update aside total
  if(totalGeralEl) totalGeralEl.textContent = fmtMoney(total);

  // update sidebar total (if exists)
  if(sidebarTotalEl) sidebarTotalEl.textContent = `Total: R$ ${fmtMoney(total)}`;

  // persist
  try { localStorage.setItem('carrinhoSalvo', JSON.stringify(carrinho)); } catch(e){/* ignore */ }
}

// DELEGAÇÃO GLOBAL para botões do carrinho (funciona mesmo após re-render)
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.cart-plus, .cart-minus');
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
    if(item.qtd <= 0) { carrinho.splice(idx,1); }
  }
  atualizarCarrinho();
});

// --- filtros (botões) ---
if(botoesFiltro && botoesFiltro.length){
  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', ()=> {
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      if(botaoReset) botaoReset.classList.remove('ativo');
      btn.classList.add('ativo');
      const cat = btn.getAttribute('data-cat');
      renderProdutos(cat === 'todos' ? 'todos' : cat);
    });
  });
}

if(botaoReset){
  botaoReset.addEventListener('click', ()=> {
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    botaoReset.classList.add('ativo');
    renderProdutos('todos');
  });
}

function enviarPedidoWhatsApp(idRua, idNumero, idBairro) {
    const ruaEl = document.getElementById(idRua);
    const numeroEl = document.getElementById(idNumero);
    const bairroEl = document.getElementById(idBairro);

    // Função para deixar Primeira Letra Maiúscula
    const formatarTexto = (texto) => {
        return texto
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    // Pega os valores usando os IDs passados
    const rua = ruaEl ? formatarTexto(ruaEl.value.trim()) : '';
    const numero = numeroEl ? numeroEl.value.trim() : '';
    const bairro = bairroEl ? formatarTexto(bairroEl.value.trim()) : '';

    // Validação
    if(!rua || !numero || !bairro){
      alert('Por favor, preencha o endereço completo: Rua, Número e Bairro.');
      return;
    }
    if(carrinho.length === 0){
      alert('Seu carrinho está vazio!');
      return;
    }

    // Montagem da mensagem
    let mensagem = '*Pedido:*%0A';
    carrinho.forEach(item => {
      const unitLabel = categoriasUnidade.includes(item.categoria) ? 'un' : 'KG';
      mensagem += `Produto: ${item.nome}%0A`;
      if(item.corte) mensagem += `Corte: ${item.corte}%0A`;
      mensagem += `Quantidade: ${item.qtd} ${unitLabel}%0A`;
      mensagem += `Subtotal: R$ ${(item.preco * item.qtd).toFixed(2)}%0A%0A`;
    });

    // Pega o total (tenta pegar do elemento visual, se não calcula na hora)
    const totalTexto = document.getElementById('total-geral') ? document.getElementById('total-geral').textContent : '0,00';

    mensagem += `*Endereço de entrega:*%0A${rua}, nº ${numero}%0ABairro: ${bairro}%0A%0A`;
    mensagem += `*Total: R$ ${ totalTexto }%0A`;

    // Abre o WhatsApp
    window.open(`https://wa.me/5545991120288?text=${mensagem}`);

    // Limpar carrinho e memória
    carrinho = [];
    try { localStorage.removeItem('carrinhoSalvo'); } catch(e){}
    atualizarCarrinho();

    // Limpar os campos de texto visualmente
    if(ruaEl) ruaEl.value = '';
    if(numeroEl) numeroEl.value = '';
    if(bairroEl) bairroEl.value = '';
}

// --- CONFIGURAÇÃO DOS BOTÕES ---

// 1. Botão FINALIZAR do DESKTOP (Lateral direita)
// Ele busca os inputs com final "-desk" que criamos no HTML
const btnFinalizar = document.getElementById('btn-finalizar');
if(btnFinalizar){
  btnFinalizar.addEventListener('click', ()=>{
    enviarPedidoWhatsApp('rua-desk', 'numero-desk', 'bairro-desk');
  });
}

// 2. Botão FINALIZAR do MOBILE (Sidebar que abre)
// Ele busca os inputs normais "rua", "numero", "bairro"
const btnMobileFinalizar = document.getElementById('sidebarFinalizar');
if(btnMobileFinalizar){
  btnMobileFinalizar.addEventListener('click', ()=>{
    enviarPedidoWhatsApp('rua', 'numero', 'bairro');
    
    // Fecha o sidebar mobile depois de clicar
    const sidebar = document.getElementById("sidebarCarrinho");
    if(sidebar) sidebar.classList.remove("show");
  });
}

// --- Horários modal (rename variables to avoid collisions) ---
const btnHorarios = document.getElementById("btn-horarios");
const modalHorarios = document.getElementById("modal-horarios");
const closeHorarios = modalHorarios ? modalHorarios.querySelector(".close") : null;

if(btnHorarios && modalHorarios && closeHorarios) {
  btnHorarios.onclick = function() { modalHorarios.style.display = "flex"; }
  closeHorarios.onclick = function() { modalHorarios.style.display = "none"; }
  window.addEventListener('click', function(event) { if (event.target === modalHorarios) modalHorarios.style.display = "none"; });
}

// toast
function showToast(msg = "Produto adicionado ao pedido") {
  const toast = document.getElementById("toast");
  if(toast){
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); }, 2000);
  }
}

// Modal info (quando clicar no card)
const modalInfo = document.getElementById("modalInfo");
const modalInfoTitle = document.getElementById("modalInfo-title");
const modalInfoImg = document.getElementById("modalInfo-img");
const modalInfoDesc = document.getElementById("modalInfo-desc");
const modalInfoClose = document.getElementById("modalInfo-close");

// Abrir modal ao clicar na imagem do produto
document.addEventListener("click", e => {
  const card = e.target.closest(".produto");
  if (!card) return;

  // Se o clique foi em elementos interativos do produto, não abrir o modal
  if (!e.target.closest(".thumb")) {
    return; 
  }

  const nome = card.querySelector("h3")?.textContent || "";
  const imgSrc = card.querySelector("img")?.src || "";

  if(modalInfo && modalInfoTitle && modalInfoImg && modalInfoDesc){
      modalInfoTitle.textContent = nome;
      modalInfoImg.src = imgSrc;
      modalInfoDesc.textContent = "Corte Especial. Entregue resfriado para máxima suculência.";
      modalInfo.classList.add("show");
  }
});

if(modalInfoClose){
  modalInfoClose.addEventListener('click', () => { modalInfo.classList.remove('show'); });
}
if(modalInfo){
  modalInfo.addEventListener('click', e => { if (e.target === modalInfo) modalInfo.classList.remove('show'); });
}

// --- Sidebar cart (mobile) behavior ---
const btnCartMobile = document.querySelector(".btn-cart-mobile");
const sidebar = document.getElementById("sidebarCarrinho");
const closeSidebar = document.getElementById("closeSidebar");
const sidebarFinalizar = document.getElementById("sidebarFinalizar");

if(btnCartMobile && sidebar){
  btnCartMobile.addEventListener("click", () => {
    sidebar.classList.add("show");
  });
}

if(sidebar){
  sidebar.addEventListener("click", (e) => { if (e.target === sidebar) sidebar.classList.remove("show"); });
}
if(sidebarFinalizar){
  sidebarFinalizar.addEventListener("click", () => {
    if(btnFinalizar) btnFinalizar.click();
    if(sidebar) sidebar.classList.remove("show");
  });
}

const btnFecharX = document.getElementById("fecharX");
if(btnFecharX && sidebar){
  btnFecharX.addEventListener("click", () => sidebar.classList.remove("show"));
}

// ensure cart UI is synced on load
atualizarCarrinho();

// =========================================
// LÓGICA DO MODAL DE CORTES (MOBILE)
// =========================================
const modalCortes = document.getElementById('modal-cortes-mobile');
const listaCortesEl = document.getElementById('lista-opcoes-cortes');
const closeModalCortes = document.getElementById('close-modal-cortes');
let produtoAtualIndex = null; // Para saber qual produto estamos editando

// Fechar modal
if(closeModalCortes) {
    closeModalCortes.onclick = () => modalCortes.style.display = "none";
}
window.addEventListener('click', (e) => {
    if(e.target === modalCortes) modalCortes.style.display = "none";
});

// Delegação de evento para abrir o modal ao clicar no botão "Corte: ..."
if(produtosContainer){
    produtosContainer.addEventListener('click', (ev) => {
        const btn = ev.target.closest('.btn-select-corte');
        if(!btn) return;
        
        // Pega o índice do produto
        const index = btn.dataset.index;
        produtoAtualIndex = index;
        
        // Limpa e popula o modal
        listaCortesEl.innerHTML = '';
        
        cortesPadrao.forEach(corte => {
            const btnOpcao = document.createElement('button');
            btnOpcao.textContent = corte;
            
            // Ao clicar em uma opção no modal
            btnOpcao.onclick = () => {
                selecionarCorteMobile(index, corte);
            };
            
            listaCortesEl.appendChild(btnOpcao);
        });
        
        modalCortes.style.display = 'flex';
    });
}

function selecionarCorteMobile(index, corteNome) {
    // 1. Atualiza visualmente o texto do botão no produto
    const btnMobile = document.querySelector(`.btn-select-corte[data-index="${index}"]`);
    if(btnMobile) {
        btnMobile.innerHTML = `Corte: ${corteNome} <i class="fa-solid fa-chevron-down"></i>`;
    }

    // 2. Marca o radio button original (que está escondido)
    // Isso garante que a função "Adicionar ao Pedido" continue funcionando igual!
    const radio = document.querySelector(`input[name="corte-${index}"][value="${corteNome}"]`);
    if(radio) radio.checked = true;

    // 3. Fecha o modal
    modalCortes.style.display = 'none';
}
