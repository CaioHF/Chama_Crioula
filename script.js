// ==========================================================================
// 1. CONFIGURAÇÕES GERAIS E DADOS
// ==========================================================================
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
if (localStorage.getItem('carrinhoSalvo')) {
  try { carrinho = JSON.parse(localStorage.getItem('carrinhoSalvo')) || []; }
  catch(e){ carrinho = []; }
}

// Funções Auxiliares
function fmtMoney(v){ return Number(v).toFixed(2); }

function formatarTexto(texto) {
    return texto.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

function showToast(msg = "Produto adicionado ao pedido") {
  const toast = document.getElementById("toast");
  if(toast){
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(() => { toast.classList.remove("show"); }, 2000);
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
        <div class="thumb"><img src="${p.img || 'imagens/default.png'}" alt="${p.nome}"></div>
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


// ==========================================================================
// 4. CARRINHO: ATUALIZAÇÃO E RENDERIZAÇÃO
// ==========================================================================
function atualizarCarrinho(){
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

  // Atualiza Desktop
  const listaDesktop = document.querySelector("#lista-carrinho");
  if (listaDesktop) listaDesktop.innerHTML = html;

  // Atualiza Mobile
  const listaMobile = document.querySelector("#cartItems");
  if (listaMobile) listaMobile.innerHTML = html;

  // Atualiza Totais
  const totalMobile = document.querySelector("#cartTotal");
  if (totalMobile) totalMobile.textContent = fmtMoney(total);
  if(totalGeralEl) totalGeralEl.textContent = fmtMoney(total);

  // Salva no Navegador
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


// ==========================================================================
// 7. ENVIO PARA WHATSAPP
// ==========================================================================
function enviarPedidoWhatsApp(idRua, idNumero, idBairro) {
    const ruaEl = document.getElementById(idRua);
    const numeroEl = document.getElementById(idNumero);
    const bairroEl = document.getElementById(idBairro);

    const rua = ruaEl ? formatarTexto(ruaEl.value.trim()) : '';
    const numero = numeroEl ? numeroEl.value.trim() : '';
    const bairro = bairroEl ? formatarTexto(bairroEl.value.trim()) : '';

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

    const totalTexto = document.getElementById('total-geral') ? document.getElementById('total-geral').textContent : '0,00';

    mensagem += `*Endereço de entrega:*%0A${rua}, nº ${numero}%0ABairro: ${bairro}%0A%0A`;
    mensagem += `*Total: R$ ${ totalTexto }%0A`;

    window.open(`https://wa.me/5545991120288?text=${mensagem}`);

    // Reset após envio
    carrinho = [];
    try { localStorage.removeItem('carrinhoSalvo'); } catch(e){}
    atualizarCarrinho();
    if(ruaEl) ruaEl.value = '';
    if(numeroEl) numeroEl.value = '';
    if(bairroEl) bairroEl.value = '';
}

// Eventos dos Botões de Finalizar
const btnFinalizar = document.getElementById('btn-finalizar');
if(btnFinalizar){
  btnFinalizar.addEventListener('click', ()=>{
    enviarPedidoWhatsApp('rua-desk', 'numero-desk', 'bairro-desk');
  });
}

const btnMobileFinalizar = document.getElementById('sidebarFinalizar');
if(btnMobileFinalizar){
  btnMobileFinalizar.addEventListener('click', ()=>{
    enviarPedidoWhatsApp('rua', 'numero', 'bairro');
    const sidebar = document.getElementById("sidebarCarrinho");
    if(sidebar) sidebar.classList.remove("show");
  });
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
const btnCartMobile = document.querySelector(".btn-cart-mobile");
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