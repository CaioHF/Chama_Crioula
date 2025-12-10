// ==========================================================================
// 1. CONFIGURAÇÕES GERAIS E DADOS
// ==========================================================================
const VALOR_MINIMO_PEDIDO = 50.00;
const categoriasComCorte = ['bovino','suino','ofertas'];
const categoriasKg05 = ['bovino','suino','frango','ofertas'];
const categoriasUnidade = ['acompanhamentos'];
const cortesPadrao = ['Corte fino','Corte grosso','Em cubos','Moído','Para churrasco'];


// LISTA DE PRODUTOS (Banco de Dados)
const produtos = [
  { 
    nome: "Acém", 
    preco: 29.98,
    precoOriginal: 32.90,
    img: "imagens/produtos/acem.png", 
    categoria: "bovino", 
    descricao: "Carne resfriada e selecionada. Corte dianteiro muito saboroso e rico em colágeno. Ideal para ensopados, carne de panela que desmancha na boca ou moída para hambúrgueres artesanais." 
  },
  { 
    nome: "Alcatra com Picanha", 
    preco: 49.98, 
    img: "imagens/produtos/alcatra.png", 
    categoria: "bovino", 
    descricao: "Peça nobre selecionada. A união perfeita da maciez da alcatra com a capa de gordura saborosa da picanha. Excelente para churrascos em família ou assados ao forno." 
  },
  { 
    nome: "Bife de Alcatra", 
    preco: 49.98, 
    img: "imagens/produtos/bife.png", 
    categoria: "bovino", 
    descricao: "Corte resfriado de altíssima maciez e pouca gordura. Ideal para bifes acebolados, à milanesa ou grelhados rápidos na chapa. Praticidade e sabor para o dia a dia." 
  },
  { 
    nome: "Bisteca com Filé", 
    preco: 48.98, 
    img: "imagens/produtos/bisteca_c_file.png", 
    categoria: "bovino", 
    descricao: "Também conhecida como T-Bone. Reúne o sabor do contrafilé e a maciez do filé mignon separados pelo osso. Carne selecionada, perfeita para churrasco ou grelha." 
  },
  { 
    nome: "Bisteca sem Filé", 
    preco: 38.98, 
    img: "imagens/produtos/bisteca_s_mignon.png", 
    categoria: "bovino", 
    descricao: "Corte do contrafilé com osso, garantindo muito mais sabor ao preparo. Carne resfriada ideal para fritar ou assar na brasa, mantendo a suculência." 
  },
  { 
    nome: "Bisteca Suína", 
    preco: 23.98, 
    precoOriginal: 32.90,
    img: "imagens/produtos/bisteca_suina.png", 
    categoria: "suino", 
    descricao: "Oferta especial! Corte suíno resfriado, leve e saboroso. Perfeita para fritar, empanar ou fazer na chapa com um toque de limão e alecrim." 
  },
  { 
    nome: "Carne moída 1º", 
    preco: 44.98, 
    img: "imagens/produtos/carne_moida1.png", 
    categoria: "bovino", 
    descricao: "Moída de cortes nobres (geralmente Patinho ou Coxão Mole). Carne magra, vermelhinha e selecionada. Ideal para receitas leves, molhos, quibes e tartar." 
  },
  { 
    nome: "Carne moída 2º", 
    preco: 32.98, 
    img: "imagens/produtos/carne_moida2.png", 
    categoria: "bovino", 
    descricao: "Moída de cortes dianteiros (Acém/Músculo), com equilíbrio ideal de gordura para garantir sabor. Perfeita para bolonhesa, hambúrgueres e recheios." 
  },
  { 
    nome: "Carvão 4kg", 
    preco: 29.98, 
    img: "imagens/produtos/carvao4.png", 
    categoria: "acompanhamentos", 
    descricao: "Carvão vegetal selecionado de eucalipto. Acendimento fácil, brasa duradoura e calor constante para garantir o ponto perfeito do seu churrasco." 
  },
  { 
    nome: "Coração", 
    preco: 25.98, 
    img: "imagens/produtos/coracao.png", 
    categoria: "frango", 
    descricao: "Coraçãozinho de frango limpo e resfriado. O aperitivo indispensável do churrasco brasileiro. Fica ótimo no espeto ou acebolado na frigideira." 
  },
  { 
    nome: "Corte Americano", 
    preco: 41.98, 
    img: "imagens/produtos/americano.png", 
    categoria: "bovino", 
    descricao: "Corte especial com osso, retirado do dianteiro ou acém. Carne marmorizada e muito saborosa, ideal para assados lentos ou churrasco diferenciado." 
  },
  { 
    nome: "Costela Minga", 
    preco: 30.98, 
    img: "imagens/produtos/costela_minga.png", 
    categoria: "bovino", 
    descricao: "A rainha do sabor! Costela ponta de agulha resfriada, com ossos mais finos e cartilagens. Ideal para cozimento lento na brasa ou fogo de chão." 
  },
  { 
    nome: "Costela Ripa", 
    preco: 34.98, 
    img: "imagens/produtos/costela_ripa.png", 
    categoria: "bovino", 
    descricao: "Corte selecionado com ossos largos e achatados. Carne fibrosa e extremamente saborosa, cozinha um pouco mais rápido que a Minga. Perfeita para churrasco." 
  },
  { 
    nome: "Costela Suína", 
    preco: 29.98, 
    img: "imagens/produtos/costela_suina.png", 
    categoria: "suino", 
    descricao: "Costelinha suína resfriada e com capa de gordura na medida. Fica incrível assada com molho barbecue ou frita em pedaços pequenos." 
  },
  { 
    nome: "Coxão Mole", 
    preco: 48.98, 
    img: "imagens/produtos/coxao_mole.png", 
    categoria: "bovino", 
    descricao: "Corte traseiro nobre e macio. Excelente para bifes finos, rosbife, escalopes e bife à rolê. Carne resfriada de alta qualidade." 
  },
  { 
    nome: "Coxinha da Asa", 
    preco: 22.98, 
    img: "imagens/produtos/coxinha_asa.png", 
    categoria: "frango", 
    descricao: "O famoso Drumet. Parte mais carnuda da asa, resfriada e suculenta. As crianças adoram! Ótima assada, frita ou na AirFryer." 
  },
  { 
    nome: "Filá Agulha", 
    preco: 31.98, 
    img: "imagens/produtos/file_agulha.png", 
    categoria: "bovino", 
    descricao: "Corte da costela desossada, entremeado de gordura. Extremamente saboroso para grelhar em tiras ou fazer cozidos ricos em sabor." 
  },
  { 
    nome: "Fraldinha", 
    preco: 39.98, 
    img: "imagens/produtos/fraldinha.png", 
    categoria: "bovino", 
    descricao: "Peça pequena, fibras longas e muito suculenta. Carne resfriada, considerada uma das melhores para churrasco. Deve ser servida mal passada ou ao ponto." 
  },
  { 
    nome: "Frango Inteiro", 
    preco: 14.98, 
    img: "imagens/produtos/frango.png", 
    categoria: "frango", 
    descricao: "Frango resfriado de primeira linha. Ideal para o assado de domingo em família, recheado ou cortado à passarinho." 
  },
  { 
    nome: "Maminha", 
    preco: 0.00, 
    img: "imagens/produtos/maminha.png", 
    categoria: "bovino", 
    descricao: "A ponta mais macia da alcatra. Carne resfriada, sabor suave e suculência garantida. Perfeita para assar inteira no forno ou na brasa com manteiga." 
  },
  { 
    nome: "Meio da Asa", 
    preco: 29.98, 
    img: "imagens/produtos/meio_da_asa.png", 
    categoria: "frango", 
    descricao: "A famosa Tulipa. É a parte mais nobre e saborosa da asa. Selecionada e resfriada, fica crocante por fora e suculenta por dentro. Indispensável no churrasco." 
  },
  { 
    nome: "Músculo", 
    preco: 28.98, 
    img: "imagens/produtos/musculo.png", 
    categoria: "bovino", 
    descricao: "Corte magro, muito saboroso e rico em colágeno. Carne selecionada, essencial para sopas nutritivas, caldos, papinhas e carne de panela." 
  },
  { 
    nome: "Paleta 7", 
    preco: 39.98, 
    img: "imagens/produtos/paleta7.png", 
    categoria: "bovino", 
    descricao: "Também conhecida como Paleta Sete. Corte dianteiro saboroso, com osso que enriquece o sabor. Ótima para assados de panela e cozidos lentos." 
  },
  { 
    nome: "Paleta Simples", 
    preco: 33.95, 
    img: "imagens/produtos/paleta0.png", 
    categoria: "bovino", 
    descricao: "Corte do braço bovino. Carne resfriada versátil e econômica, excelente para moer, fazer picadinhos ou cozidos com legumes." 
  },
  { 
    nome: "Paleta Suíno", 
    preco: 23.98, 
    img: "imagens/produtos/paleta_suina.png", 
    categoria: "suino", 
    descricao: "Corte dianteiro suíno, muito saboroso e úmido. Carne selecionada, ideal para assar lentamente no forno ou desfiada para sanduíches (pulled pork)." 
  },
  { 
    nome: "Panceta Suína", 
    preco: 23.98, 
    img: "imagens/produtos/panceta.png", 
    categoria: "suino", 
    descricao: "Barriga suína selecionada com carne e gordura em equilíbrio. O corte perfeito para fazer aquele torresmo crocante ou assada com limão." 
  },
  { 
    nome: "Pão de Alho", 
    preco: 12.98, 
    img: "imagens/produtos/pao.png", 
    categoria: "acompanhamentos", 
    descricao: "Tradicional e cremoso. Pãozinho crocante com recheio generoso de pasta de alho. O acompanhamento que não pode faltar na entrada do seu churrasco." 
  },
  { 
    nome: "Patinho", 
    preco: 46.98, 
    img: "imagens/produtos/patinho.png", 
    categoria: "bovino", 
    descricao: "Carne nobre do traseiro, totalmente magra e sem nervos. Resfriada e selecionada, é a melhor opção para bifes à milanesa, moída magra ou strogonoff." 
  },
  { 
    nome: "Pernil Suíno", 
    preco: 23.98, 
    img: "imagens/produtos/pernil.png", 
    categoria: "suino", 
    descricao: "Corte traseiro clássico, carne firme e saborosa com pouca gordura. Ideal para assados de datas festivas, fatiado na chapa ou cubos fritos." 
  },
  { 
    nome: "Picanha", 
    preco: 0.00, 
    img: "imagens/produtos/picanha.png", 
    categoria: "bovino", 
    descricao: "A estrela do churrasco! Peça selecionada com capa de gordura uniforme. Extremamente macia, saborosa e suculenta. Qualidade garantida Chama Crioula." 
  },
  { 
    nome: "Ponta de Peito", 
    preco: 30.98, 
    img: "imagens/produtos/ponta_de_peito.png", 
    categoria: "bovino", 
    descricao: "Conhecido como Brisket. Corte com fibras firmes e gordura saborosa. Quando preparado lentamente (defumado ou panela de pressão), desmancha na boca." 
  },
  { 
    nome: "Posta Vermelha", 
    preco: 36.95, 
    img: "imagens/produtos/posta_vermelha.png", 
    categoria: "bovino", 
    descricao: "Corte magro e versátil (semelhante ao coxão duro). Carne resfriada ideal para bifes de panela, rolês e cozidos do dia a dia." 
  },
  { 
    nome: "Traseiro", 
    preco: 39.98, 
    img: "imagens/produtos/traseiro.png", 
    categoria: "bovino", 
    descricao: "Corte robusto do traseiro bovino. Carne selecionada, excelente para preparos de panela com molho, garantindo sustância e sabor caseiro." 
  },
];

// REFERÊNCIAS AO DOM (Elementos da Página)
const produtosContainer = document.getElementById('produtos-container');
const totalGeralEl = document.getElementById('total-geral'); 
const sidebarTotalEl = document.getElementById('sidebar-total');
const inputBusca = document.getElementById('buscar');
const boxAuto = document.getElementById('autocomplete');
const botaoLupa = document.getElementById('btn-buscar');
const botoesFiltro = document.querySelectorAll('.tipos');
const botaoReset = document.querySelector('.tipos-delet');

// ==========================================================================
// 2. ESTADO DO APLICATIVO (CARRINHO)
// ==========================================================================
let carrinho = [];
let taxaEntrega = 0;

if (localStorage.getItem('carrinhoSalvo')) {
  try { carrinho = JSON.parse(localStorage.getItem('carrinhoSalvo')) || []; }
  catch(e){ carrinho = []; }
}

// Funções Auxiliares
function fmtMoney(v){ return Number(v).toFixed(2); }

function formatarTexto(texto) {
    return texto.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

// =========================================
// FUNÇÃO TOAST CORRIGIDA (Coloque isso no script.js)
// =========================================

let toastTimer;

function showToast(msg = "Produto adicionado ao pedido") {
  const toast = document.getElementById("toast");
  
  if (toast) {

      clearTimeout(toastTimer);

      toast.classList.remove("show");
      
      void toast.offsetWidth; 

      toast.textContent = msg;
      toast.classList.add("show");
 
      toastTimer = setTimeout(() => { 
          toast.classList.remove("show"); 
      }, 1000);
  }
}

// ==========================================================================
// 3. FUNÇÃO PRINCIPAL: RENDERIZAR PRODUTOS
// ==========================================================================
function renderProdutos(filtro = 'todos'){
  if(!produtosContainer) return;
  produtosContainer.innerHTML = '';

  let lista = [];

  // 1. Filtragem
  if(filtro === 'todos') {
      lista = produtos;
  } 
  else if (filtro === 'ofertas') {
      // Pega tudo que tem preço original maior que preço atual
      lista = produtos.filter(p => p.precoOriginal && p.precoOriginal > p.preco);
  }
  else {
      // Busca por Categoria OU Texto (Barra de busca)
      const existeCategoria = produtos.some(p => p.categoria && p.categoria.toLowerCase() === String(filtro).toLowerCase());
      
      if(existeCategoria) {
          lista = produtos.filter(p => p.categoria.toLowerCase() === String(filtro).toLowerCase());
      } else {
          const termo = String(filtro).toLowerCase().trim();
          lista = produtos.filter(p => p.nome.toLowerCase().includes(termo));
      }
  }

  // 2. Feedback Vazio
  if(lista.length === 0){
    produtosContainer.innerHTML = '<p style="text-align:center;font-size:1.1rem;margin-top:12px;">Produto não encontrado</p>';
    return;
  }

  // 3. Construção do HTML
  lista.forEach((p) => {
    const index = produtos.indexOf(p);
    const isCorte = categoriasComCorte.includes(p.categoria);
    const isUnidade = categoriasUnidade.includes(p.categoria);
    const defaultQty = isUnidade ? 1 : 1.0;
    const textoDescricao = p.descricao || "Corte especial selecionado e de alta qualidade.";

    // Lógica do Preço Riscado (Oferta)
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
      <article class="produto" data-index="${index}" data-desc="${textoDescricao}">
        <div class="thumb"><img loading="lazy" src="${p.img || 'imagens/default.png'}" alt="${p.nome}"></div>
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

  // Ajusta inputs de quantidade
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
// 4. CARRINHO: ATUALIZAÇÃO E RENDERIZAÇÃO
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

  // === CÁLCULO FINAL COM A TAXA ===
  const totalComTaxa = total + taxaEntrega;

  // Atualiza HTML das listas
  const listaDesktop = document.querySelector("#lista-carrinho");
  if (listaDesktop) listaDesktop.innerHTML = html;

  const listaMobile = document.querySelector("#cartItems");
  if (listaMobile) listaMobile.innerHTML = html;

  // Atualiza Totais Visuais
  const totalMobile = document.querySelector("#cartTotal");
  if (totalMobile) totalMobile.textContent = fmtMoney(totalComTaxa);
  
  if(totalGeralEl) totalGeralEl.textContent = fmtMoney(totalComTaxa);


  // === LÓGICA DE VALOR MÍNIMO (CORRIGIDA) ===
  const btnFinalizarDesk = document.getElementById('btn-finalizar');
  const btnFinalizarMobile = document.getElementById('sidebarFinalizar');
  
  if(carrinho.length > 0) {
      // MUDANÇA AQUI: Agora verificamos o totalComTaxa, não apenas o total
      if (totalComTaxa < VALOR_MINIMO_PEDIDO) {
          const falta = VALOR_MINIMO_PEDIDO - totalComTaxa;
          const textoAviso = `Mínimo R$ ${VALOR_MINIMO_PEDIDO},00 (Faltam R$ ${fmtMoney(falta)})`;
          
          if(btnFinalizarDesk) {
              btnFinalizarDesk.classList.add('btn-disabled');
              btnFinalizarDesk.innerHTML = textoAviso;
          }
          if(btnFinalizarMobile) {
              btnFinalizarMobile.classList.add('btn-disabled');
              btnFinalizarMobile.innerHTML = textoAviso;
          }
      } else {
          // Se passou do mínimo, libera
          if(btnFinalizarDesk) {
              btnFinalizarDesk.classList.remove('btn-disabled');
              btnFinalizarDesk.innerHTML = 'Enviar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
          }
          if(btnFinalizarMobile) {
              btnFinalizarMobile.classList.remove('btn-disabled');
              btnFinalizarMobile.innerHTML = 'Finalizar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
          }
      }
  } else {
     // Carrinho vazio
     if(btnFinalizarDesk) btnFinalizarDesk.innerHTML = 'Enviar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
     if(btnFinalizarMobile) btnFinalizarMobile.innerHTML = 'Finalizar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
  }

  // === ATUALIZA O CONTADOR (BOLINHA VERMELHA) ===
  const cartCountEl = document.getElementById('cart-count');
  if(cartCountEl) {
      // Conta quantos itens diferentes tem na lista
      const qtdItens = carrinho.length; 
      
      cartCountEl.textContent = qtdItens;

      if(qtdItens > 0){
          cartCountEl.style.display = 'flex'; // Mostra a bolinha
      } else {
          cartCountEl.style.display = 'none'; // Esconde se for zero
      }
  }

  try { localStorage.setItem('carrinhoSalvo', JSON.stringify(carrinho)); } catch(e){}
}

// ==========================================================================
// 5. EVENTOS: INTERAÇÃO COM PRODUTOS (Delegation)
// ==========================================================================
if(produtosContainer){
  produtosContainer.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if(!btn) return;
    const artigo = ev.target.closest('.produto');
    if(!artigo) return;
    const idx = Number(artigo.dataset.index);
    const p = produtos[idx];

    // Botões Mais/Menos
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

    // Botão Adicionar ao Carrinho
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
      showToast();
    }
  });
}

// Eventos Globais do Carrinho (+/- nos itens já adicionados)
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


// ==========================================================================
// 6. FILTROS E BUSCA
// ==========================================================================
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

// Autocomplete e Busca
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

// =========================================
// LÓGICA DE TAXA DE ENTREGA (Faltava isso!)
// =========================================
const bairroDesk = document.getElementById('bairro-desk');
const bairroMobile = document.getElementById('bairro');

function atualizarTaxa(evento) {
    const select = evento.target;
    // Pega o valor do option (ex: "5.00") e transforma em número
    const valor = parseFloat(select.value) || 0; 
    
    // Atualiza a variável global que criamos lá em cima
    taxaEntrega = valor;
    
    // Sincroniza: se mudou no PC, muda no celular também (e vice-versa)
    if(bairroDesk && bairroDesk !== select) bairroDesk.value = select.value;
    if(bairroMobile && bairroMobile !== select) bairroMobile.value = select.value;

    // Manda recalcular o carrinho agora com a taxa nova
    atualizarCarrinho();
}

// Adiciona o "ouvidor" de eventos nos selects
// Isso diz: "Quando mudar (change), rode a função atualizarTaxa"
if(bairroDesk) bairroDesk.addEventListener('change', atualizarTaxa);
if(bairroMobile) bairroMobile.addEventListener('change', atualizarTaxa);


// =========================================
// 7. ENVIO PARA WHATSAPP (CORRIGIDO PARA SOMAR TAXA NA VALIDAÇÃO)
// =========================================
function enviarPedidoWhatsApp(idRua, idNumero, idBairroSelect, idPagamento, idObs) {
    console.log("Tentando enviar pedido...");

    // 1. SEGURANÇA: Pega o valor mínimo
    let minimo = 0;
    try {
        if (typeof VALOR_MINIMO_PEDIDO !== 'undefined') {
            minimo = VALOR_MINIMO_PEDIDO;
        }
    } catch (e) { minimo = 0; }

    // 2. CÁLCULO DO TOTAL (PRODUTOS + TAXA)
    let totalCalculado = 0;
    carrinho.forEach(item => {
        totalCalculado += item.preco * item.qtd;
    });

    // Pega a taxa do bairro selecionado AGORA
    const elBairro = document.getElementById(idBairroSelect);
    let taxaNoMomento = 0;
    if(elBairro && elBairro.value) {
        taxaNoMomento = parseFloat(elBairro.value) || 0;
    }

    // SOMA A TAXA AO TOTAL PARA A VERIFICAÇÃO
    totalCalculado += taxaNoMomento;

    console.log(`Total com Taxa: ${totalCalculado}, Mínimo: ${minimo}`);

    // 3. VERIFICAÇÃO DO MÍNIMO
    if (totalCalculado < minimo) {
        const falta = minimo - totalCalculado;
        alert(`O pedido mínimo é de R$ ${minimo.toFixed(2)}.\nFaltam R$ ${falta.toFixed(2)} para completar.`);
        return; 
    }

    // --- CÓDIGO NORMAL DE ENVIO ---
    
    const ruaEl = document.getElementById(idRua);
    const numeroEl = document.getElementById(idNumero);
    const bairroEl = document.getElementById(idBairroSelect);
    const pagamentoEl = document.getElementById(idPagamento);
    const obsEl = document.getElementById(idObs);

    const rua = ruaEl ? formatarTexto(ruaEl.value.trim()) : '';
    const numero = numeroEl ? numeroEl.value.trim() : '';
    const pagamento = pagamentoEl ? pagamentoEl.value : '';
    const observacao = obsEl ? obsEl.value.trim() : '';

    let bairroNome = '';
    if(bairroEl && bairroEl.tagName === 'SELECT' && bairroEl.selectedIndex >= 0) {
        bairroNome = bairroEl.options[bairroEl.selectedIndex].text;
    } else if (bairroEl) {
        bairroNome = bairroEl.value; 
    }

    if(!rua || !numero){ alert('Por favor, preencha o endereço completo.'); return; }
    if(bairroEl && bairroEl.value === "") { alert('Por favor, selecione seu Bairro/Região.'); return; }
    if(!pagamento){ alert('Por favor, selecione uma forma de pagamento.'); return; }
    if(carrinho.length === 0){ alert('Seu carrinho está vazio!'); return; }

    let mensagem = '*Pedido:*%0A';
    carrinho.forEach(item => {
      const unitLabel = categoriasUnidade.includes(item.categoria) ? 'un' : 'KG';
      mensagem += `Produto: ${item.nome}%0A`;
      if(item.corte) mensagem += `Corte: ${item.corte}%0A`;
      mensagem += `Quantidade: ${item.qtd} ${unitLabel}%0A`;
      mensagem += `Subtotal: R$ ${(item.preco * item.qtd).toFixed(2)}%0A%0A`;
    });

    // Usa o total calculado (Produtos + Taxa)
    const totalTexto = totalCalculado.toFixed(2);

    mensagem += `*Endereço de entrega:*%0A${rua}, nº ${numero}%0A`;
    mensagem += `Bairro: ${bairroNome}%0A`; 
    mensagem += `*Pagamento:* ${pagamento}%0A`;
    
    if(observacao) {
        mensagem += `*Observação:* ${observacao}%0A`;
    }
    
    mensagem += `%0A*Total com Entrega: R$ ${ totalTexto }%0A`;

    window.open(`https://wa.me/5545991120288?text=${mensagem}`);

    carrinho = [];
    taxaEntrega = 0; 
    try { localStorage.removeItem('carrinhoSalvo'); } catch(e){}
    atualizarCarrinho();
    
    if(ruaEl) ruaEl.value = '';
    if(numeroEl) numeroEl.value = '';
    if(typeof bairroDesk !== 'undefined' && bairroDesk) bairroDesk.selectedIndex = 0;
    if(typeof bairroMobile !== 'undefined' && bairroMobile) bairroMobile.selectedIndex = 0;
    if(pagamentoEl) pagamentoEl.value = '';
    if(obsEl) obsEl.value = '';
}

// ==========================================================================
// 8. CONTROLE DE MODAIS (Horários, Info, Cortes)
// ==========================================================================

// Modal Horários
const btnHorarios = document.getElementById("btn-horarios");
const modalHorarios = document.getElementById("modal-horarios");
const closeHorarios = modalHorarios ? modalHorarios.querySelector(".close") : null;
if(btnHorarios && modalHorarios && closeHorarios) {
  btnHorarios.onclick = function() { modalHorarios.style.display = "flex"; }
  closeHorarios.onclick = function() { modalHorarios.style.display = "none"; }
  window.addEventListener('click', function(event) { if (event.target === modalHorarios) modalHorarios.style.display = "none"; });
}

// Modal Info Produto
const modalInfo = document.getElementById("modalInfo");
const modalInfoTitle = document.getElementById("modalInfo-title");
const modalInfoImg = document.getElementById("modalInfo-img");
const modalInfoDesc = document.getElementById("modalInfo-desc");
const modalInfoClose = document.getElementById("modalInfo-close");

document.addEventListener("click", e => {
  const card = e.target.closest(".produto");
  if (!card) return;
  if (!e.target.closest(".thumb")) return; // Só abre se clicar na imagem

  const nome = card.querySelector("h3")?.textContent || "";
  const imgSrc = card.querySelector("img")?.src || "";
  const descricaoEspecifica = card.getAttribute("data-desc");

  if(modalInfo && modalInfoTitle && modalInfoImg && modalInfoDesc){
      modalInfoTitle.textContent = nome;
      modalInfoImg.src = imgSrc;
      modalInfoDesc.textContent = descricaoEspecifica || "Corte Especial. Entregue resfriado para máxima suculência.";
      modalInfo.classList.add("show");
  }
});
if(modalInfoClose){
  modalInfoClose.addEventListener('click', () => { modalInfo.classList.remove('show'); });
}
if(modalInfo){
  modalInfo.addEventListener('click', e => { if (e.target === modalInfo) modalInfo.classList.remove('show'); });
}

// Modal Cortes (Mobile)
const modalCortes = document.getElementById('modal-cortes-mobile');
const listaCortesEl = document.getElementById('lista-opcoes-cortes');
const closeModalCortes = document.getElementById('close-modal-cortes');
let produtoAtualIndex = null; 

if(closeModalCortes) {
    closeModalCortes.onclick = () => modalCortes.style.display = "none";
}
window.addEventListener('click', (e) => {
    if(e.target === modalCortes) modalCortes.style.display = "none";
});

if(produtosContainer){
    produtosContainer.addEventListener('click', (ev) => {
        const btn = ev.target.closest('.btn-select-corte');
        if(!btn) return;
        
        const index = btn.dataset.index;
        produtoAtualIndex = index;
        
        if(listaCortesEl) {
            listaCortesEl.innerHTML = ''; 
            cortesPadrao.forEach(corte => {
                const btnOpcao = document.createElement('button');
                btnOpcao.textContent = corte;
                btnOpcao.onclick = () => { selecionarCorteMobile(index, corte); };
                listaCortesEl.appendChild(btnOpcao);
            });
            modalCortes.style.display = 'flex';
        }
    });
}

function selecionarCorteMobile(index, corteNome) {
    const btnMobile = document.querySelector(`.btn-select-corte[data-index="${index}"]`);
    if(btnMobile) {
        btnMobile.innerHTML = `Corte: ${corteNome} <i class="fa-solid fa-chevron-down"></i>`;
    }
    const radio = document.querySelector(`input[name="corte-${index}"][value="${corteNome}"]`);
    if(radio) radio.checked = true;
    if(modalCortes) modalCortes.style.display = 'none';
}


// ==========================================================================
// 9. SIDEBAR CARRINHO (MOBILE)
// ==========================================================================
const btnCartMobile = document.querySelector(".cart-icon-wrap"); 
const sidebar = document.getElementById("sidebarCarrinho");
const sidebarFinalizar = document.getElementById("sidebarFinalizar");
const btnFecharX = document.getElementById("fecharX");

if(btnCartMobile && sidebar){
  btnCartMobile.addEventListener("click", () => { sidebar.classList.add("show"); });
}
if(sidebar){
  sidebar.addEventListener("click", (e) => { if (e.target === sidebar) sidebar.classList.remove("show"); });
}
if(sidebarFinalizar){
  sidebarFinalizar.addEventListener("click", () => {
    if(btnFinalizar) btnFinalizar.click(); // Chama a lógica principal
    if(sidebar) sidebar.classList.remove("show");
  });
}
if(btnFecharX && sidebar){
  btnFecharX.addEventListener("click", () => sidebar.classList.remove("show"));
}

// INICIALIZAÇÃO
renderProdutos();
atualizarCarrinho();
// =========================================
// 10. VERIFICADOR DE HORÁRIO (ABERTO/FECHADO)
// =========================================
function verificarStatusLoja() {
    const data = new Date();
    const diaSemana = data.getDay(); // 0 = Domingo
    const hora = data.getHours();    // 0 a 23

    // Elementos da tela
    const statusContainer = document.getElementById('status-container');
    const statusTexto = document.getElementById('status-texto');
    const btnFinalizarDesk = document.getElementById('btn-finalizar');
    const btnFinalizarMobile = document.getElementById('sidebarFinalizar');

    // REGRA DE NEGÓCIO:
    // Aberto: Segunda(1) a Sábado(6) | Horário: 08:00 às 18:59
    let estaAberto = false;
    if (diaSemana !== 0 && (hora >= 8 && hora < 19)) {
        estaAberto = true;
    }

    if (estaAberto) {
        // LOJA ABERTA
        if(statusContainer) {
            statusContainer.classList.remove('status-fechado');
            statusContainer.classList.add('status-aberto');
            statusTexto.textContent = "Aberto agora";
        }
        
        // IMPORTANTE: Só removemos o 'disabled' SE não estiver bloqueado pelo valor mínimo
        // Verificamos se o texto do botão NÃO é o aviso de valor mínimo
        if(btnFinalizarDesk && !btnFinalizarDesk.textContent.includes("Mínimo R$")) {
            btnFinalizarDesk.classList.remove('btn-disabled');
            // Só reseta o texto se não for aviso de preço
            btnFinalizarDesk.innerHTML = 'Enviar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
        }

        if(btnFinalizarMobile && !btnFinalizarMobile.textContent.includes("Mínimo R$")) {
            btnMobileFinalizar.classList.remove('btn-disabled');
            btnMobileFinalizar.innerHTML = 'Finalizar Pedido no WhatsApp <i class="fa-brands fa-whatsapp"></i>';
        }

    } else {
        // LOJA FECHADA (Aqui bloqueia tudo, sem choro)
        if(statusContainer) {
            statusContainer.classList.remove('status-aberto');
            statusContainer.classList.add('status-fechado');
            statusTexto.textContent = "Fechado agora";
        }

        if(btnFinalizarDesk) {
            btnFinalizarDesk.classList.add('btn-disabled');
            btnFinalizarDesk.innerHTML = 'Loja Fechada (Abre às 08:00)';
        }
        if(btnFinalizarMobile) {
            btnMobileFinalizar.classList.add('btn-disabled');
            btnMobileFinalizar.innerHTML = 'Loja Fechada (Abre às 08:00)';
        }
    }
}
// =========================================
// 11. SALVAR ENDEREÇO E DADOS (LOCALSTORAGE)
// =========================================

// Lista dos campos que queremos salvar
const camposParaSalvar = [
    { idMobile: 'rua', idDesk: 'rua-desk', chave: 'endereco_rua' },
    { idMobile: 'numero', idDesk: 'numero-desk', chave: 'endereco_numero' },
    { idMobile: 'bairro', idDesk: 'bairro-desk', chave: 'endereco_bairro' },
    { idMobile: 'pagamento', idDesk: 'pagamento-desk', chave: 'user_pagamento' },
    { idMobile: 'obs', idDesk: 'obs-desk', chave: 'user_obs' }
];

// Função que salva no navegador
function salvarDadosFormulario() {
    const dados = {};
    
    camposParaSalvar.forEach(campo => {
        // Tenta pegar o valor do Mobile, se não tiver, pega do Desk
        const elMobile = document.getElementById(campo.idMobile);
        const elDesk = document.getElementById(campo.idDesk);
        
        let valor = '';
        if(elMobile && elMobile.value) valor = elMobile.value;
        else if(elDesk && elDesk.value) valor = elDesk.value;
        
        dados[campo.chave] = valor;
    });

    localStorage.setItem('dadosClienteChamaCrioula', JSON.stringify(dados));
}

// Função que recupera os dados quando abre o site
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

            // CASO ESPECIAL: BAIRRO
            // Se recuperarmos o bairro, precisamos avisar o sistema para somar a taxa de novo!
            if(campo.idMobile === 'bairro') {
                // Simula um evento de "mudança" para ativar a função atualizarTaxa()
                if(elMobile) elMobile.dispatchEvent(new Event('change'));
            }
        }
    });
}

// Configura os "ouvidores" para salvar assim que digitar
camposParaSalvar.forEach(campo => {
    const elMobile = document.getElementById(campo.idMobile);
    const elDesk = document.getElementById(campo.idDesk);
    
    // Lista de eventos para monitorar (digitação e seleção)
    const eventos = ['input', 'change', 'blur'];

    eventos.forEach(evento => {
        if(elMobile) {
            elMobile.addEventListener(evento, () => {
                // Sincroniza visualmente com o Desktop
                if(elDesk) elDesk.value = elMobile.value; 
                salvarDadosFormulario();
            });
        }
        if(elDesk) {
            elDesk.addEventListener(evento, () => {
                // Sincroniza visualmente com o Mobile
                if(elMobile) elMobile.value = elDesk.value;
                salvarDadosFormulario();
            });
        }
    });
});

// =========================================
// 12. BOTÃO VOLTAR AO TOPO
// =========================================
const btnTopo = document.getElementById('btn-topo');

if(btnTopo) {
    // Monitora a rolagem da tela
    window.addEventListener('scroll', () => {
        // Se rolar mais de 400px, mostra o botão
        if (window.scrollY > 400) {
            btnTopo.classList.add('show');
        } else {
            btnTopo.classList.remove('show');
        }
    });

    // Quando clicar, sobe suavemente
    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rolar suave
        });
    });
}

// =========================================
// 13. AUTO-PLAY DO CARROSSEL
// =========================================
const track = document.querySelector('.banner-track');
let slideIndex = 0;

if(track) {
    setInterval(() => {
        slideIndex++;
        // Se chegou no fim, volta para o começo
        if (slideIndex >= 3) { // Temos 3 slides
            slideIndex = 0;
        }
        
        // Calcula a largura do slide para saber quanto rolar
        const width = track.offsetWidth;
        
        track.scrollTo({
            left: width * slideIndex,
            behavior: 'smooth'
        });
    }, 4000); // Muda a cada 4000ms (4 segundos)
}

// =========================================
// INICIALIZAÇÃO (O "Chute Inicial")
// =========================================

// 1. Carrega dados salvos do cliente
document.addEventListener('DOMContentLoaded', carregarDadosFormulario);

// 2. Desenha os produtos na tela
renderProdutos();

// 3. Verifica se a loja está aberta (ISSO QUE FALTAVA RODAR)
verificarStatusLoja();

// 4. Atualiza o carrinho e os botões
atualizarCarrinho();

// 5. Configura para verificar o horário a cada 60 segundos automaticamente
setInterval(verificarStatusLoja, 60000);