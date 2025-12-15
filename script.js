// ==========================================================================
// 1. CONFIGURAÇÕES GERAIS E DADOS
// ==========================================================================
const VALOR_MINIMO_PEDIDO = 100.00;
// Tirei os sinais de comentário (/* */) e removi a palavra 'ofertas' de dentro
const categoriasComCorte = ['bovino','suino'];
const categoriasKg05 = ['bovino','suino','frango',];
const categoriasUnidade = ['acompanhamentos'];
const cortesPadrao = ['Corte Fino','Corte Grosso','Em cubos','Moído','Em tiras', 'Para Grelha', 'Espeto Simples', 'Espeto Duplo'];

// ELEMENTOS DOM
const produtosContainer = document.getElementById('produtos-container');
const totalGeralEl = document.getElementById('total-geral'); 
const inputBusca = document.getElementById('buscar');
const boxAuto = document.getElementById('autocomplete');
const botaoLupa = document.getElementById('btn-buscar');
const botoesFiltro = document.querySelectorAll('.tipos');

// ==========================================================================
// 2. ESTADO DO APLICATIVO
// ==========================================================================
let carrinho = [];
let taxaEntrega = 0;
let lojaAberta = false; // Controle global

if (localStorage.getItem('carrinhoSalvo')) {
  try { carrinho = JSON.parse(localStorage.getItem('carrinhoSalvo')) || []; }
  catch(e){ carrinho = []; }
}

function fmtMoney(v){ return Number(v).toFixed(2); }
function formatarTexto(texto) {
    return texto.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

// TOAST (Notificação)
let toastTimer;
function showToast(msg = "Produto adicionado ao pedido") {
  const toast = document.getElementById("toast");
  if (toast) {
      clearTimeout(toastTimer);
      toast.classList.remove("show");
      void toast.offsetWidth; 
      toast.textContent = msg;
      toast.classList.add("show");
      toastTimer = setTimeout(() => { toast.classList.remove("show"); }, 1000);
  }
}

// ==========================================================================
// 3. RENDERIZAR PRODUTOS (Híbrido)
// ==========================================================================
function renderProdutos(filtro = 'todos'){
  if(!produtosContainer) return;
  produtosContainer.innerHTML = '';

  let lista = [];

  // Filtragem
  if(filtro === 'todos') {
      lista = produtos;
  } 
  // NOVA REGRA AQUI:
  else if (filtro === 'mais-vendidos') {
      lista = produtos.filter(p => p.maisVendido === true);
  }
  else if (filtro === 'especiais') {
      lista = produtos.filter(p => p.especial === true);
  }
  // Mantenha o ofertas comentado se quiser
  // else if (filtro === 'ofertas') { ... } 
  else {
      // Verifica se o filtro é uma categoria válida...
      const existeCategoria = produtos.some(p => p.categoria && p.categoria.toLowerCase() === String(filtro).toLowerCase());
      
      if(existeCategoria) {
          lista = produtos.filter(p => p.categoria.toLowerCase() === String(filtro).toLowerCase());
      } else {
          // Busca por nome
          const termo = String(filtro).toLowerCase().trim();
          lista = produtos.filter(p => p.nome.toLowerCase().includes(termo));
      }
  }

  // ... resto da função

  if(lista.length === 0){
    produtosContainer.innerHTML = '<p style="text-align:center;font-size:1.1rem;margin-top:12px;">Produto não encontrado</p>';
    return;
  }

  lista.forEach((p) => {
    const index = produtos.indexOf(p);
    const isCorte = categoriasComCorte.includes(p.categoria);
    const isUnidade = categoriasUnidade.includes(p.categoria);
    const defaultQty = isUnidade ? 1 : 1.0;
    const textoDescricao = p.descricao || "Corte especial selecionado.";

    let htmlPreco;
    if(p.precoOriginal && p.precoOriginal > p.preco) {
        htmlPreco = `
            <span class="preco-antigo">R$ ${fmtMoney(p.precoOriginal)}</span>
            <span class="preco-novo">R$ ${fmtMoney(p.preco)} ${isUnidade ? 'Und' : 'Kg'}</span>
        `;
    } else {
        htmlPreco = `<div class="preco">R$ ${fmtMoney(p.preco)} ${isUnidade ? 'Und' : 'Kg'}</div>`;
    }

    produtosContainer.innerHTML += `
      <article class="produto" data-index="${index}">
        <div class="thumb" onclick="abrirModalProduto(${index})" style="cursor: pointer;">
            <img loading="lazy" src="${p.img || 'imagens/default.png'}" alt="${p.nome} - Casa de Carnes Chama Crioula em Ouro Verde do Oeste">
        </div>
        <div class="info">
          <h3>${p.nome}</h3>
          <div class="preco-box">${htmlPreco}</div>

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

  document.querySelectorAll('.produto').forEach(prodEl => {
    const idx = prodEl.dataset.index;
    const p = produtos[idx];
    const input = prodEl.querySelector('.input-qtd');
    if(!input) return;
    if(categoriasUnidade.includes(p.categoria)) input.value = '1';
    else input.value = '1.00';
  });
}

// =========================================
// 4. CARRINHO (Atualização)
// =========================================
function atualizarCarrinho(){
  let html = '';
  let total = 0;

  if(!carrinho || carrinho.length === 0){
    html = '<p style="text-align:center; padding: 20px;">Seu carrinho está vazio.</p>';
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

  const totalComTaxa = total + taxaEntrega;

  const listaDesktop = document.querySelector("#lista-carrinho");
  if (listaDesktop) listaDesktop.innerHTML = html;

  const listaMobile = document.querySelector("#cartItems");
  if (listaMobile) listaMobile.innerHTML = html;

  const totalMobile = document.querySelector("#cartTotal");
  if (totalMobile) totalMobile.textContent = fmtMoney(totalComTaxa);
  
  if(totalGeralEl) totalGeralEl.textContent = fmtMoney(totalComTaxa);

  // BOTÕES FINALIZAR E AVISO DE PESO
  const botoesFinalizar = [document.getElementById('btn-finalizar'), document.getElementById('sidebarFinalizar')];
  
  botoesFinalizar.forEach(btn => {
      if(!btn) return;

      // --- CÓDIGO NOVO: INSERE O AVISO ABAIXO DO BOTÃO ---
      // Cria um ID único para o aviso baseado no ID do botão
      const idAviso = 'aviso-peso-' + (btn.id || 'padrao');
      
      // Verifica se o aviso JÁ EXISTE. Se não, cria e insere.
      if (!document.getElementById(idAviso)) {
          const avisoHTML = `
              <p id="${idAviso}" style="font-size: 11px; color: #555; text-align: center; margin-top: 8px; line-height: 1.3; width: 100%; opacity: 0.8;">
                  ⚠️ <b>Importante:</b> Produtos <i>in natura</i> podem sofrer variação de peso e valor final na pesagem. O total acima é uma estimativa.
              </p>
          `;
          // Insere o HTML logo DEPOIS do botão
          btn.insertAdjacentHTML('afterend', avisoHTML);
      }
      // ----------------------------------------------------

      if (typeof lojaAberta !== 'undefined' && !lojaAberta) {
          btn.classList.add('btn-disabled');
          btn.innerHTML = 'Loja Fechada (Abre às 08:00)';
          return;
      }
      if (carrinho.length === 0) {
          btn.classList.remove('btn-disabled'); 
          btn.innerHTML = 'Enviar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
          return;
      }
      const minimo = (typeof VALOR_MINIMO_PEDIDO !== 'undefined') ? VALOR_MINIMO_PEDIDO : 0;
      if (totalComTaxa < minimo) {
          const falta = minimo - totalComTaxa;
          btn.classList.add('btn-disabled');
          btn.innerHTML = `Mínimo R$ ${fmtMoney(minimo)} (Falta R$ ${fmtMoney(falta)})`;
      } else {
          btn.classList.remove('btn-disabled');
          btn.innerHTML = 'Finalizar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
      }
  });

  // BADGE CONTADOR
  const cartCountEl = document.getElementById('cart-count');
  if(cartCountEl) {
      const qtdItens = carrinho.length; 
      cartCountEl.textContent = qtdItens;
      cartCountEl.style.display = qtdItens > 0 ? 'flex' : 'none';
  }

  try { localStorage.setItem('carrinhoSalvo', JSON.stringify(carrinho)); } catch(e){}
}

// ==========================================================================
// 5. EVENTOS (Produtos, Carrinho, Filtros)
// ==========================================================================
if(produtosContainer){
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
      let val = parseFloat(String(input.value).replace(',', '.')) || 0;
      
      if(btn.dataset.action === 'mais') val = +(val + step);
      else val = +(val - step);
      
      if(isUnit) val = Math.max(1, Math.round(val)); else val = Math.max(step, Math.round(val*100)/100);
      input.value = isUnit ? String(Math.round(val)) : val.toFixed(2);
      return;
    }

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
          key, nome: p.nome, preco: p.preco, categoria: p.categoria, corte: corte, qtd: qty
        });
      }
      
      atualizarCarrinho();
      
      // AQUI ESTÁ A MUDANÇA:
      showToast(`Adicionado: ${p.nome}`); 
    }
  });
}

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

if(botoesFiltro && botoesFiltro.length){
  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', ()=> {
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      const cat = btn.getAttribute('data-cat');
      renderProdutos(cat === 'todos' ? 'todos' : cat);
    });
  });
}

// BUSCA
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

// TAXA ENTREGA
const bairroDesk = document.getElementById('bairro-desk');
const bairroMobile = document.getElementById('bairro');

function atualizarTaxa(evento) {
    const select = evento.target;
    const valor = parseFloat(select.value) || 0; 
    taxaEntrega = valor;
    
    if(bairroDesk && bairroDesk !== select) bairroDesk.value = select.value;
    if(bairroMobile && bairroMobile !== select) bairroMobile.value = select.value;
    atualizarCarrinho();
}
if(bairroDesk) bairroDesk.addEventListener('change', atualizarTaxa);
if(bairroMobile) bairroMobile.addEventListener('change', atualizarTaxa);

// =========================================
// 7. ENVIO WHATSAPP (Finalizar)
// =========================================
function enviarPedidoWhatsApp(idRua, idNumero, idBairroSelect, idPagamento, idObs) {
    let minimo = (typeof VALOR_MINIMO_PEDIDO !== 'undefined') ? VALOR_MINIMO_PEDIDO : 0;
    
    let totalCalculado = 0;
    carrinho.forEach(item => { totalCalculado += item.preco * item.qtd; });

    const elBairro = document.getElementById(idBairroSelect);
    let taxaNoMomento = elBairro && elBairro.value ? parseFloat(elBairro.value) || 0 : 0;
    
    totalCalculado += taxaNoMomento;

    if (totalCalculado < minimo) {
        alert(`Mínimo R$ ${minimo.toFixed(2)}.`);
        return; 
    }

    const ruaEl = document.getElementById(idRua);
    const numeroEl = document.getElementById(idNumero);
    const pagamentoEl = document.getElementById(idPagamento);
    const obsEl = document.getElementById(idObs);

    const rua = ruaEl ? formatarTexto(ruaEl.value.trim()) : '';
    const numero = numeroEl ? numeroEl.value.trim() : '';
    const pagamento = pagamentoEl ? pagamentoEl.value : '';
    const observacao = obsEl ? obsEl.value.trim() : '';
    let bairroNome = elBairro && elBairro.options ? elBairro.options[elBairro.selectedIndex].text : '';

    if(!rua || !numero){ alert('Preencha o endereço.'); return; }
    if(elBairro && elBairro.value === "") { alert('Selecione o Bairro.'); return; }
    if(!pagamento){ alert('Selecione o pagamento.'); return; }
    if(carrinho.length === 0){ alert('Carrinho vazio!'); return; }

    let mensagem = '*Pedido Chama Crioula:*%0A';
    carrinho.forEach(item => {
      const unitLabel = categoriasUnidade.includes(item.categoria) ? 'un' : 'KG';
      mensagem += `${item.nome}`;
      if(item.corte) mensagem += ` (${item.corte})`;
      mensagem += ` - ${item.qtd} ${unitLabel}%0A`;
    });

    mensagem += `%0A*Endereço:* ${rua}, nº ${numero}%0A`;
    mensagem += `Bairro: ${bairroNome}%0A`; 
    mensagem += `*Pagamento:* ${pagamento}%0A`;
    if(observacao) mensagem += `*Obs:* ${observacao}%0A`;
    mensagem += `\n *Total Estimado:* R$ ${totalCarrinho.toFixed(2)}\n\n`;

    window.open(`https://wa.me/5545991120288?text=${mensagem}`);

    mensagem += "-----------------------------------\n";
    mensagem += "⚠️ *OBSERVAÇÃO IMPORTANTE:*\n";
    mensagem += "As carnes são entregues *in natura* (frescas). ";
    mensagem += "A pesagem e o valor final estão sujeitos a pequenas alterações na hora do preparo, ";
    mensagem += "sendo o valor do site meramente estimativo.";

    carrinho = []; taxaEntrega = 0; 
    try { localStorage.removeItem('carrinhoSalvo'); } catch(e){}
    atualizarCarrinho();
    
    if(ruaEl) ruaEl.value = ''; if(numeroEl) numeroEl.value = '';
    if(bairroDesk) bairroDesk.selectedIndex = 0; if(bairroMobile) bairroMobile.selectedIndex = 0;
    if(pagamentoEl) pagamentoEl.value = ''; if(obsEl) obsEl.value = '';
}

const btnFinalizar = document.getElementById('btn-finalizar');
if(btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        enviarPedidoWhatsApp('rua-desk', 'numero-desk', 'bairro-desk', 'pagamento-desk', 'obs-desk');
    });
}
const btnFinalizarMobile = document.getElementById('sidebarFinalizar');
if(btnFinalizarMobile) {
    btnFinalizarMobile.addEventListener('click', () => {
        enviarPedidoWhatsApp('rua', 'numero', 'bairro', 'pagamento', 'obs');
    });
}

// =========================================
// 8. MODAIS
// =========================================
// Modal Horários
const btnHorarios = document.getElementById("btn-horarios");
const modalHorarios = document.getElementById("modal-horarios");
const closeHorarios = modalHorarios ? modalHorarios.querySelector(".close") : null;
if(btnHorarios && modalHorarios && closeHorarios) {
  btnHorarios.onclick = function() { modalHorarios.style.display = "flex"; }
  closeHorarios.onclick = function() { modalHorarios.style.display = "none"; }
  window.addEventListener('click', function(event) { if (event.target === modalHorarios) modalHorarios.style.display = "none"; });
}

// Modal Cortes (Mobile)
const modalCortes = document.getElementById('modal-cortes-mobile');
const listaCortesEl = document.getElementById('lista-opcoes-cortes');
const closeModalCortes = document.getElementById('close-modal-cortes');

if(closeModalCortes) closeModalCortes.onclick = () => modalCortes.style.display = "none";
window.addEventListener('click', (e) => { if(e.target === modalCortes) modalCortes.style.display = "none"; });

if(produtosContainer){
    produtosContainer.addEventListener('click', (ev) => {
        const btn = ev.target.closest('.btn-select-corte');
        if(!btn) return;
        const index = btn.dataset.index;
        
        if(listaCortesEl) {
            listaCortesEl.innerHTML = ''; 
            cortesPadrao.forEach(corte => {
                const btnOpcao = document.createElement('button');
                btnOpcao.textContent = corte;
                btnOpcao.onclick = () => { 
                    const btnMobile = document.querySelector(`.btn-select-corte[data-index="${index}"]`);
                    if(btnMobile) btnMobile.innerHTML = `Corte: ${corte} <i class="fa-solid fa-chevron-down"></i>`;
                    const radio = document.querySelector(`input[name="corte-${index}"][value="${corte}"]`);
                    if(radio) radio.checked = true;
                    modalCortes.style.display = 'none';
                };
                listaCortesEl.appendChild(btnOpcao);
            });
            modalCortes.style.display = 'flex';
        }
    });
}

// Modal Sobre
const btnSobre = document.getElementById("btn-sobre");
const modalSobre = document.getElementById("modal-sobre");
const closeSobre = document.querySelector(".close-sobre");
if(btnSobre && modalSobre && closeSobre) {
    btnSobre.onclick = function() { modalSobre.style.display = "flex"; }
    closeSobre.onclick = function() { modalSobre.style.display = "none"; }
    window.addEventListener('click', function(event) { if (event.target === modalSobre) modalSobre.style.display = "none"; });
}

// =========================================
// 9. SIDEBAR MOBILE (Lógica de Fechar e Travar)
// =========================================
const btnCartMobile = document.querySelector(".cart-icon-wrap"); 
const sidebar = document.getElementById("sidebarCarrinho");
const sidebarFinalizar = document.getElementById("sidebarFinalizar");
const btnFecharX = document.getElementById("fecharX");

if(btnCartMobile && sidebar){
  btnCartMobile.addEventListener("click", (e) => { 
      e.stopPropagation(); 
      sidebar.classList.add("show"); 
      document.body.style.overflow = 'hidden'; // TRAVA O SITE ATRÁS
  });
}

function fecharCarrinho() {
    if(sidebar) sidebar.classList.remove("show");
    document.body.style.overflow = ''; // DESTRAVA O SITE
}

if(btnFecharX) btnFecharX.addEventListener("click", fecharCarrinho);

document.addEventListener('click', (event) => {

    if (sidebar && sidebar.classList.contains('show')) {
        
        if(!document.body.contains(event.target)) {
            return; 
        }

        if (!sidebar.contains(event.target) && !btnCartMobile.contains(event.target)) {
            fecharCarrinho();
        }
    }
});

// =========================================
// 11. SALVAR DADOS (LOCALSTORAGE)
// =========================================
const camposParaSalvar = [
    { idMobile: 'rua', idDesk: 'rua-desk', chave: 'endereco_rua' },
    { idMobile: 'numero', idDesk: 'numero-desk', chave: 'endereco_numero' },
    { idMobile: 'bairro', idDesk: 'bairro-desk', chave: 'endereco_bairro' },
    { idMobile: 'pagamento', idDesk: 'pagamento-desk', chave: 'user_pagamento' },
    { idMobile: 'obs', idDesk: 'obs-desk', chave: 'user_obs' }
];

function salvarDadosFormulario() {
    const dados = {};
    camposParaSalvar.forEach(campo => {
        const elMobile = document.getElementById(campo.idMobile);
        const elDesk = document.getElementById(campo.idDesk);
        let valor = '';
        if(elMobile && elMobile.value) valor = elMobile.value;
        else if(elDesk && elDesk.value) valor = elDesk.value;
        dados[campo.chave] = valor;
    });
    localStorage.setItem('dadosClienteChamaCrioula', JSON.stringify(dados));
}

function carregarDadosFormulario() {
    const dadosSalvos = localStorage.getItem('dadosClienteChamaCrioula');
    if(!dadosSalvos) return;
    const dados = JSON.parse(dadosSalvos);
    camposParaSalvar.forEach(campo => {
        const elMobile = document.getElementById(campo.idMobile);
        const elDesk = document.getElementById(campo.idDesk);
        const valorSalvo = dados[campo.chave];
        if(valorSalvo) {
            if(elMobile) elMobile.value = valorSalvo;
            if(elDesk) elDesk.value = valorSalvo;
            if(campo.idMobile === 'bairro' && elMobile) elMobile.dispatchEvent(new Event('change'));
        }
    });
}
camposParaSalvar.forEach(campo => {
    const elMobile = document.getElementById(campo.idMobile);
    const elDesk = document.getElementById(campo.idDesk);
    const eventos = ['input', 'change', 'blur'];
    eventos.forEach(evento => {
        if(elMobile) elMobile.addEventListener(evento, () => { if(elDesk) elDesk.value = elMobile.value; salvarDadosFormulario(); });
        if(elDesk) elDesk.addEventListener(evento, () => { if(elMobile) elMobile.value = elDesk.value; salvarDadosFormulario(); });
    });
});

// =========================================
// 12. BOTÃO VOLTAR AO TOPO
// =========================================
const btnTopo = document.getElementById('btn-topo');
if(btnTopo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btnTopo.classList.add('show'); else btnTopo.classList.remove('show');
    });
    btnTopo.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// =========================================
// 13. CARROSSEL
// =========================================
const track = document.querySelector('.banner-track');
const dots = document.querySelectorAll('.dot');
let autoPlayInterval;

if(track && dots.length > 0) {
    function atualizarBolinhas() {
        const slideWidth = track.offsetWidth;
        const scrollPos = track.scrollLeft;
        const indexAtual = Math.round(scrollPos / slideWidth);
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots[indexAtual]) dots[indexAtual].classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            track.scrollTo({ left: track.offsetWidth * index, behavior: 'smooth' });
        });
    });

    track.addEventListener('scroll', atualizarBolinhas);
    function iniciarAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const slideWidth = track.offsetWidth;
            const scrollPos = track.scrollLeft;
            let index = Math.round(scrollPos / slideWidth) + 1;
            if (index >= dots.length) index = 0;
            track.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
        }, 4000);
    }
    track.addEventListener('touchstart', () => clearInterval(autoPlayInterval));
    iniciarAutoPlay();
}

// =========================================
// 16. MODAL DETALHE PRODUTO (NOVO)
// =========================================
const modalProduto = document.getElementById('modal-produto-detalhe');
let produtoSelecionadoIndex = null;
let qtdAtualModal = 1;

function abrirModalProduto(index) {
    const p = produtos[index];
    produtoSelecionadoIndex = index;
    
    document.getElementById('detalhe-img').src = p.img || 'imagens/default.png';
    document.getElementById('detalhe-nome').textContent = p.nome;
    document.getElementById('detalhe-descricao').innerHTML = p.descricao || "Produto selecionado.";
    document.getElementById('detalhe-preco').textContent = `R$ ${p.preco.toFixed(2)}`;
    
    const isUnit = categoriasUnidade.includes(p.categoria);
    document.getElementById('detalhe-unidade').textContent = isUnit ? 'Unidade' : 'Kg';

    qtdAtualModal = isUnit ? 1 : 1.0;
    atualizarInputModal(isUnit);

    const boxCortes = document.getElementById('detalhe-cortes-container');
    const listaCortes = document.getElementById('lista-cortes-detalhe');
    listaCortes.innerHTML = ''; 

    if (categoriasComCorte.includes(p.categoria)) {
        boxCortes.classList.remove('hidden');
        cortesPadrao.forEach((corte, i) => {
            const label = document.createElement('label');
            label.className = `radio-corte-label ${i === 0 ? 'selecionado' : ''}`;
            label.innerHTML = `<input type="radio" name="corte-modal" value="${corte}" class="radio-corte-input" ${i === 0 ? 'checked' : ''}>${corte}`;
            label.onclick = () => {
                document.querySelectorAll('.radio-corte-label').forEach(l => l.classList.remove('selecionado'));
                label.classList.add('selecionado');
                label.querySelector('input').checked = true;
            };
            listaCortes.appendChild(label);
        });
    } else {
        boxCortes.classList.add('hidden');
    }
    modalProduto.style.display = 'flex';
    atualizarBotaoPreco();
}

function atualizarInputModal(isUnit) {
    const input = document.getElementById('detalhe-qtd');
    if(isUnit) input.value = qtdAtualModal;
    else input.value = qtdAtualModal.toFixed(2);
    atualizarBotaoPreco();
}

function atualizarBotaoPreco() {
    if(produtoSelecionadoIndex === null) return;
    const p = produtos[produtoSelecionadoIndex];
    const total = p.preco * qtdAtualModal;
    document.getElementById('btn-preco-total').textContent = `R$ ${total.toFixed(2)}`;
}

document.getElementById('btn-mais-detalhe').onclick = () => {
    const p = produtos[produtoSelecionadoIndex];
    const isUnit = categoriasUnidade.includes(p.categoria);
    if(isUnit) qtdAtualModal++; else qtdAtualModal += 0.5;
    atualizarInputModal(isUnit);
};

document.getElementById('btn-menos-detalhe').onclick = () => {
    const p = produtos[produtoSelecionadoIndex];
    const isUnit = categoriasUnidade.includes(p.categoria);
    const min = isUnit ? 1 : 0.5;
    if(qtdAtualModal > min) { if(isUnit) qtdAtualModal--; else qtdAtualModal -= 0.5; }
    atualizarInputModal(isUnit);
};

document.getElementById('fechar-modal-produto').onclick = () => { modalProduto.style.display = 'none'; };

document.getElementById('btn-adicionar-modal').onclick = () => {
    const p = produtos[produtoSelecionadoIndex];
    let corteEscolhido = null;
    if (!document.getElementById('detalhe-cortes-container').classList.contains('hidden')) {
        const radio = document.querySelector('input[name="corte-modal"]:checked');
        if(radio) corteEscolhido = radio.value;
    }
    const key = `${p.nome}|${corteEscolhido || ''}`;
    const existing = carrinho.find(i => i.key === key);
    if(existing){ existing.qtd = +(existing.qtd + qtdAtualModal).toFixed(2); } 
    else { carrinho.push({ key, nome: p.nome, preco: p.preco, categoria: p.categoria, corte: corteEscolhido, qtd: qtdAtualModal }); }
    atualizarCarrinho();
    modalProduto.style.display = 'none'; 
    showToast(`Adicionado: ${p.nome}`);
};

// =========================================
// INICIALIZAÇÃO E HORÁRIO
// =========================================
function verificarStatusLoja() {
    const data = new Date();
    const diaSemana = data.getDay(); 
    const hora = data.getHours();    
    const statusContainer = document.getElementById('status-container');
    const statusTexto = document.getElementById('status-texto');

    let estaAberto = false;
    // Segunda(1) a Sábado(6) | 08:00 - 18:59
    if (diaSemana !== 0 && (hora >= 8 && hora < 19)) { estaAberto = true; }
    
    lojaAberta = estaAberto; 
    if (estaAberto) {
        if(statusContainer) { statusContainer.classList.remove('status-fechado'); statusContainer.classList.add('status-aberto'); statusTexto.textContent = "Aberto agora"; }
    } else {
        if(statusContainer) { statusContainer.classList.remove('status-aberto'); statusContainer.classList.add('status-fechado'); statusTexto.textContent = "Fechado agora"; }
    }
    atualizarCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosFormulario(); 
    renderProdutos();          
    verificarStatusLoja();
});
setInterval(verificarStatusLoja, 60000);