// ============================================================
// CONFIGURAÇÃO SUPABASE
// ============================================================

const SUPABASE_URL = "https://bhwvkggnjgbrxjqgjayr.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJod3ZrZ2duamdicnhqcWdqYXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDQzNTEsImV4cCI6MjA5MTAyMDM1MX0.3PEMI58ER8G_Yre9cVglSogd2lJEiiQFVcKaBJ_ULI0";

// Scripts de módulo têm escopo próprio — let supabase não conflita com o var global do CDN
let supabase;
if (typeof window.supabase !== "undefined" && window.supabase.createClient) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  console.error("Erro: Supabase SDK não foi carregado");
}

// ============================================================
// ESTADO GLOBAL
// ============================================================

let currentUser = null;
let produtoEmEdicao = null;
let produtoParaDeletar = null;
let todasOsStatus = [];

// ============================================================
// ELEMENTOS DO DOM
// ============================================================

const loginPage = document.getElementById("login-page");
const dashboardPage = document.getElementById("dashboard-page");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const userEmail = document.getElementById("user-email");

const secaoProdutos = document.getElementById("produtos-section");
const secaoNovoProduto = document.getElementById("novo-produto-section");
const iosProductList = document.getElementById("ios-product-list");
const formTitle = document.getElementById("form-title");
const btnSubmitText = document.getElementById("btn-submit-text");

const productForm = document.getElementById("product-form");
const btnVoltarProdutos = document.getElementById("btn-voltar-produtos");
const btnNovoProduto = document.getElementById("btn-novo-produto");
const btnDeletarNoForm = document.getElementById("btn-deletar-no-form");
const btnCancelarForm = document.getElementById("btn-cancelar-form");

const filtroCategoria = document.getElementById("filtro-categoria");
const filtroBusca = document.getElementById("filtro-busca");

const deleteModal = document.getElementById("delete-modal");
const btnConfirmDelete = document.getElementById("btn-confirm-delete");
const btnCancelDelete = document.getElementById("btn-cancel-delete");
const deleteProductName = document.getElementById("delete-product-name");

const toast = document.getElementById("toast");
const menuItems = document.querySelectorAll(".menu-item");

const prodImgInput = document.getElementById("prod-img");
const previewContainer = document.getElementById("preview-container");
const imagePreview = document.getElementById("image-preview");

const btnTemaAdmin = document.getElementById("btn-tema-admin");
const iconTemaAdmin = document.getElementById("icon-tema-admin");

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  inicializarTema();
  verificarSessao();
  configurarUploadImagem();
  configurarEventosFormulario();
});

// ============================================================
// SISTEMA DE TEMA (CLARO / ESCURO)
// ============================================================

function inicializarTema() {
  const temaSalvo = localStorage.getItem("modoNoturnoChamaCrioula");
  const usarModoClaro = temaSalvo !== "true";

  if (usarModoClaro) {
    document.body.classList.add("modo-claro");
    if (iconTemaAdmin) iconTemaAdmin.className = "fa-solid fa-sun";
  } else {
    document.body.classList.remove("modo-claro");
    if (iconTemaAdmin) iconTemaAdmin.className = "fa-solid fa-moon";
  }

  if (btnTemaAdmin) {
    btnTemaAdmin.addEventListener("click", () => {
      const eModoClaro = document.body.classList.toggle("modo-claro");
      localStorage.setItem("modoNoturnoChamaCrioula", eModoClaro ? "false" : "true");
      if (iconTemaAdmin) {
        iconTemaAdmin.className = eModoClaro ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }
    });
  }
}

// ============================================================
// CONFIGURAR UPLOAD DE IMAGEM & BOTÕES DO FORM
// ============================================================

function configurarUploadImagem() {
  if (!prodImgInput) return;

  prodImgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Por favor, selecione um arquivo de imagem válido.", "error");
        prodImgInput.value = "";
        previewContainer.style.display = "none";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast("A imagem não pode ser maior que 5MB.", "error");
        prodImgInput.value = "";
        previewContainer.style.display = "none";
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        imagePreview.src = evt.target.result;
        previewContainer.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewContainer.style.display = "none";
      imagePreview.src = "";
    }
  });
}

function configurarEventosFormulario() {
  if (btnDeletarNoForm) {
    btnDeletarNoForm.addEventListener("click", () => {
      if (produtoEmEdicao) {
        abrirConfirmacaoDeletar(produtoEmEdicao.id, produtoEmEdicao.nome);
      }
    });
  }

  if (btnCancelarForm) {
    btnCancelarForm.addEventListener("click", () => {
      mudarSecao("produtos");
      produtoEmEdicao = null;
    });
  }
}

// ============================================================
// UPLOAD DE IMAGEM PARA SUPABASE STORAGE
// ============================================================

async function uploadImagem(file) {
  try {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const nomeArquivo = `${timestamp}-${randomString}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("produtos")
      .upload(nomeArquivo, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("produtos")
      .getPublicUrl(nomeArquivo);

    return publicUrlData.publicUrl;
  } catch (erro) {
    console.error("Erro ao fazer upload da imagem:", erro);
    throw new Error("Erro ao fazer upload da imagem. Verifique a conexão.");
  }
}

// ============================================================
// REMOVER IMAGEM DO SUPABASE STORAGE
// ============================================================

async function removerImagemDoStorage(imageUrl) {
  if (!imageUrl) return;

  try {
    const urlParts = imageUrl.split("/storage/v1/object/public/produtos/");
    if (urlParts.length < 2) return;

    const caminhoArquivo = urlParts[1];

    const { error } = await supabase.storage
      .from("produtos")
      .remove([caminhoArquivo]);

    if (error) {
      console.error("Erro ao remover imagem do storage:", error);
    }
  } catch (erro) {
    console.error("Erro ao processar remoção de imagem:", erro);
  }
}

// ============================================================
// AUTENTICAÇÃO
// ============================================================

async function verificarSessao() {
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      currentUser = data.session.user;
      mostrarDashboard();
    } else {
      mostrarLogin();
    }
  } catch (erro) {
    console.error("Erro ao verificar sessão:", erro);
    mostrarLogin();
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("login-error");

    errorDiv.textContent = "";
    errorDiv.classList.remove("show");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      currentUser = data.user;
      mostrarDashboard();
      showToast("Bem-vindo ao Painel Administrativo!", "success");
    } catch (erro) {
      console.error("Erro de login:", erro);
      errorDiv.textContent = "E-mail ou senha incorretos. Tente novamente.";
      errorDiv.classList.add("show");
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await supabase.auth.signOut();
      currentUser = null;
      produtoEmEdicao = null;
      mostrarLogin();
      limparFormulario();
      showToast("Sessão encerrada com sucesso.", "success");
    } catch (erro) {
      console.error("Erro ao fazer logout:", erro);
    }
  });
}

function mostrarLogin() {
  loginPage.style.display = "flex";
  dashboardPage.style.display = "none";
}

function mostrarDashboard() {
  loginPage.style.display = "none";
  dashboardPage.style.display = "block";
  if (userEmail && currentUser) {
    userEmail.textContent = currentUser.email;
  }
  carregarProdutos();
}

// ============================================================
// NAVEGAÇÃO E SEÇÕES
// ============================================================

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const section = item.getAttribute("data-section");
    mudarSecao(section);

    menuItems.forEach((m) => m.classList.remove("active"));
    item.classList.add("active");
  });
});

if (btnNovoProduto) {
  btnNovoProduto.addEventListener("click", () => {
    mudarSecao("novo-produto");
    produtoEmEdicao = null;
    formTitle.textContent = "Cadastrar Novo Produto";
    btnSubmitText.textContent = "Criar Produto";
    limparFormulario();
  });
}

if (btnVoltarProdutos) {
  btnVoltarProdutos.addEventListener("click", () => {
    mudarSecao("produtos");
    produtoEmEdicao = null;
  });
}

function mudarSecao(nomeDaSecao) {
  document.querySelectorAll(".admin-section").forEach((s) => {
    s.classList.remove("active");
  });

  if (nomeDaSecao === "produtos") {
    secaoProdutos.classList.add("active");
  } else if (nomeDaSecao === "novo-produto") {
    secaoNovoProduto.classList.add("active");
  }
}

// ============================================================
// CARREGAR & ESTATÍSTICAS
// ============================================================

async function carregarProdutos() {
  if (iosProductList) {
    iosProductList.innerHTML = `
      <div class="table-loader">
        <i class="fa-solid fa-spinner fa-spin"></i> Carregando produtos do Supabase...
      </div>`;
  }

  try {
    const { data, error } = await supabase
      .from("carnes")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    todasOsStatus = data || [];
    atualizarEstatisticas(todasOsStatus);
    renderizarProdutos(todasOsStatus);
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    if (iosProductList) {
      iosProductList.innerHTML = '<div style="text-align:center; color: #ff5252; padding: 30px;">Erro ao carregar produtos do banco.</div>';
    }
    showToast("Erro ao carregar produtos", "error");
  }
}

function atualizarEstatisticas(produtos) {
  const elTotal = document.getElementById("stat-total");
  const elAtivos = document.getElementById("stat-ativos");

  if (elTotal) elTotal.textContent = produtos.length;
  if (elAtivos) elAtivos.textContent = produtos.filter((p) => p.ativo !== false).length;
}

// ============================================================
// RENDERIZAR PRODUTOS (ESTILO CLEAN iOS LIST)
// ============================================================

function renderizarProdutos(produtos) {
  if (!iosProductList) return;

  if (produtos.length === 0) {
    iosProductList.innerHTML = '<div style="text-align:center; color: var(--txt-muted); padding: 40px; font-size: 0.9rem;">Nenhum produto encontrado.</div>';
    return;
  }

  iosProductList.innerHTML = produtos
    .map((produto) => {
      const precoFmt = parseFloat(produto.preco || 0).toFixed(2);
      const eAtivo = produto.ativo !== false;
      return `
        <div class="ios-list-item" onclick="editarProduto(${produto.id})">
          <img src="${produto.img || "imagens/Favicon.png"}" alt="${produto.nome}" class="ios-item-thumb" />
          <div class="ios-item-details">
            <span class="ios-item-name">${produto.nome}</span>
            <span class="ios-item-price">R$ ${precoFmt}</span>
            <div class="ios-item-status-wrapper">
              <span class="ios-status-pill ${eAtivo ? "ios-status-active" : "ios-status-inactive"}">
                ${eAtivo ? "Active" : "Non Active"}
              </span>
            </div>
          </div>
          <i class="fa-solid fa-chevron-right ios-item-arrow"></i>
        </div>
      `;
    })
    .join("");
}

function formatarCategoria(categoria) {
  const map = {
    bovino: "Bovino",
    suino: "Suíno",
    frango: "Frango",
    acompanhamentos: "Acompanhamentos",
  };
  return map[categoria] || categoria;
}

// ============================================================
// FILTROS
// ============================================================

if (filtroBusca) filtroBusca.addEventListener("input", aplicarFiltros);
if (filtroCategoria) filtroCategoria.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  const textoBusca = filtroBusca ? filtroBusca.value.toLowerCase() : "";
  const categoriaSelecionada = filtroCategoria ? filtroCategoria.value : "";

  const produtosFiltrados = todasOsStatus.filter((produto) => {
    const matchBusca =
      produto.nome.toLowerCase().includes(textoBusca) ||
      (produto.descricao && produto.descricao.toLowerCase().includes(textoBusca));
    const matchCategoria =
      categoriaSelecionada === "" || produto.categoria === categoriaSelecionada;
    return matchBusca && matchCategoria;
  });

  renderizarProdutos(produtosFiltrados);
}

// ============================================================
// CRIAR/EDITAR PRODUTO
// ============================================================

if (productForm) {
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formError = document.getElementById("form-error");
    if (formError) {
      formError.textContent = "";
      formError.classList.remove("show");
    }

    const imageFile = prodImgInput.files[0];

    const produtoData = {
      nome: document.getElementById("prod-nome").value.trim(),
      preco: parseFloat(document.getElementById("prod-preco").value),
      categoria: document.getElementById("prod-categoria").value,
      mais_vendidos: document.getElementById("prod-mais-vendido").checked,
      cortes_especiais: document.getElementById("prod-especial").checked,
      descricao: document.getElementById("prod-descricao").value.trim(),
      ativo: document.getElementById("prod-ativo").checked,
    };

    if (!produtoData.nome || isNaN(produtoData.preco) || !produtoData.categoria) {
      if (formError) {
        formError.textContent = "Preencha todos os campos obrigatórios (*)";
        formError.classList.add("show");
      }
      return;
    }

    try {
      if (imageFile) {
        const imgUrl = await uploadImagem(imageFile);

        if (produtoEmEdicao && produtoEmEdicao.img) {
          await removerImagemDoStorage(produtoEmEdicao.img);
        }

        produtoData.img = imgUrl;
      }

      if (produtoEmEdicao) {
        const { error } = await supabase
          .from("carnes")
          .update(produtoData)
          .eq("id", produtoEmEdicao.id);

        if (error) throw error;
        showToast("Produto atualizado com sucesso!", "success");
      } else {
        const { error } = await supabase
          .from("carnes")
          .insert([{ ...produtoData, created_at: new Date().toISOString() }]);

        if (error) throw error;
        showToast("Produto criado com sucesso!", "success");
      }

      limparFormulario();
      produtoEmEdicao = null;
      await carregarProdutos();
      mudarSecao("produtos");
    } catch (erro) {
      console.error("Erro ao salvar produto:", erro);
      if (formError) {
        formError.textContent = erro.message || "Erro ao salvar o produto.";
        formError.classList.add("show");
      }
      showToast(erro.message || "Erro ao salvar produto", "error");
    }
  });
}

function limparFormulario() {
  if (productForm) productForm.reset();
  const elAtivo = document.getElementById("prod-ativo");
  if (elAtivo) elAtivo.checked = true;
  if (prodImgInput) prodImgInput.value = "";
  if (previewContainer) previewContainer.style.display = "none";
  if (imagePreview) imagePreview.src = "";
  if (formTitle) formTitle.textContent = "Cadastrar Novo Produto";
  if (btnSubmitText) btnSubmitText.textContent = "Criar Produto";
  if (btnDeletarNoForm) btnDeletarNoForm.style.display = "none";
}

async function editarProduto(id) {
  try {
    const { data, error } = await supabase
      .from("carnes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    produtoEmEdicao = data;

    document.getElementById("prod-nome").value = data.nome || "";
    document.getElementById("prod-preco").value = data.preco || "";
    document.getElementById("prod-categoria").value = data.categoria || "";
    document.getElementById("prod-mais-vendido").checked = !!data.mais_vendidos;
    document.getElementById("prod-especial").checked = !!data.cortes_especiais;
    document.getElementById("prod-descricao").value = data.descricao || "";
    document.getElementById("prod-ativo").checked = data.ativo !== false;

    if (prodImgInput) prodImgInput.value = "";
    if (previewContainer) previewContainer.style.display = "block";
    if (imagePreview) imagePreview.src = data.img || "imagens/Favicon.png";

    if (formTitle) formTitle.textContent = `Editar Produto: ${data.nome}`;
    if (btnSubmitText) btnSubmitText.textContent = "Atualizar Produto";
    if (btnDeletarNoForm) btnDeletarNoForm.style.display = "inline-flex";

    mudarSecao("novo-produto");
    document.querySelectorAll(".menu-item").forEach((m) => m.classList.remove("active"));
  } catch (erro) {
    console.error("Erro ao carregar produto:", erro);
    showToast("Erro ao carregar dados do produto", "error");
  }
}

// ============================================================
// DELETAR PRODUTO
// ============================================================

function abrirConfirmacaoDeletar(id, nome) {
  produtoParaDeletar = id;
  if (deleteProductName) deleteProductName.textContent = nome;
  if (deleteModal) deleteModal.style.display = "flex";
}

if (btnConfirmDelete) {
  btnConfirmDelete.addEventListener("click", async () => {
    if (!produtoParaDeletar) return;

    try {
      const { data: produtoData, error: erroFetch } = await supabase
        .from("carnes")
        .select("img")
        .eq("id", produtoParaDeletar)
        .single();

      if (erroFetch) throw erroFetch;

      if (produtoData && produtoData.img) {
        await removerImagemDoStorage(produtoData.img);
      }

      const { error } = await supabase
        .from("carnes")
        .delete()
        .eq("id", produtoParaDeletar);

      if (error) throw error;

      showToast("Produto deletado com sucesso!", "success");
      if (deleteModal) deleteModal.style.display = "none";
      produtoParaDeletar = null;
      produtoEmEdicao = null;
      limparFormulario();
      await carregarProdutos();
      mudarSecao("produtos");
    } catch (erro) {
      console.error("Erro ao deletar produto:", erro);
      showToast("Erro ao deletar produto", "error");
    }
  });
}

if (btnCancelDelete) {
  btnCancelDelete.addEventListener("click", () => {
    if (deleteModal) deleteModal.style.display = "none";
    produtoParaDeletar = null;
  });
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================

function showToast(mensagem, tipo = "success") {
  if (!toast) return;
  toast.textContent = mensagem;
  toast.className = `toast ${tipo} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// ============================================================
// FECHAR MODAL AO CLICAR FORA
// ============================================================

window.addEventListener("click", (e) => {
  if (e.target === deleteModal) {
    deleteModal.style.display = "none";
    produtoParaDeletar = null;
  }
});

// ============================================================
// EXPORTANDO FUNÇÕES PARA O HTML
// ============================================================
window.editarProduto = editarProduto;
window.abrirConfirmacaoDeletar = abrirConfirmacaoDeletar;
window.limparFormulario = limparFormulario;
