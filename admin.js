// ============================================================
// CONFIGURAÇÃO SUPABASE
// ============================================================

const SUPABASE_URL = 'https://bhwvkggnjgbrxjqgjayr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJod3ZrZ2duamdicnhqcWdqYXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDQzNTEsImV4cCI6MjA5MTAyMDM1MX0.3PEMI58ER8G_Yre9cVglSogd2lJEiiQFVcKaBJ_ULI0';

// Evitar declaração duplicada do supabase
let supabase;
if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
    console.error('Erro: Supabase SDK não foi carregado');
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

const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const userEmail = document.getElementById('user-email');

const secaoProdutos = document.getElementById('produtos-section');
const secaoNovoProduto = document.getElementById('novo-produto-section');
const produtosTbody = document.getElementById('produtos-tbody');
const formTitle = document.getElementById('form-title');
const btnSubmitText = document.getElementById('btn-submit-text');

const productForm = document.getElementById('product-form');
const btnVoltarProdutos = document.getElementById('btn-voltar-produtos');
const btnNovoProduto = document.getElementById('btn-novo-produto');

const filtroCategoria = document.getElementById('filtro-categoria');
const filtroBusca = document.getElementById('filtro-busca');

const deleteModal = document.getElementById('delete-modal');
const btnConfirmDelete = document.getElementById('btn-confirm-delete');
const btnCancelDelete = document.getElementById('btn-cancel-delete');
const deleteProductName = document.getElementById('delete-product-name');

const toast = document.getElementById('toast');
const menuItems = document.querySelectorAll('.menu-item');

// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    verificarSessao();
});

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
        console.error('Erro ao verificar sessão:', erro);
        mostrarLogin();
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    errorDiv.textContent = '';
    errorDiv.classList.remove('show');

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw error;
        }

        currentUser = data.user;
        mostrarDashboard();
    } catch (erro) {
        console.error('Erro de login:', erro);
        errorDiv.textContent = 'E-mail ou senha incorretos. Tente novamente.';
        errorDiv.classList.add('show');
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await supabase.auth.signOut();
        currentUser = null;
        produtoEmEdicao = null;
        mostrarLogin();
        limparFormulario();
    } catch (erro) {
        console.error('Erro ao fazer logout:', erro);
    }
});

function mostrarLogin() {
    loginPage.style.display = 'flex';
    dashboardPage.style.display = 'none';
}

function mostrarDashboard() {
    loginPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    userEmail.textContent = currentUser.email;
    carregarProdutos();
}

// ============================================================
// NAVEGAÇÃO E SEÇÕES
// ============================================================

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        mudarSecao(section);
        
        menuItems.forEach(m => m.classList.remove('active'));
        item.classList.add('active');
    });
});

btnNovoProduto.addEventListener('click', () => {
    mudarSecao('novo-produto');
    produtoEmEdicao = null;
    formTitle.textContent = 'Novo Produto';
    btnSubmitText.textContent = 'Criar Produto';
    limparFormulario();
});

btnVoltarProdutos.addEventListener('click', () => {
    mudarSecao('produtos');
    produtoEmEdicao = null;
});

function mudarSecao(nomeDaSecao) {
    document.querySelectorAll('.admin-section').forEach(s => {
        s.classList.remove('active');
    });

    if (nomeDaSecao === 'produtos') {
        secaoProdutos.classList.add('active');
    } else if (nomeDaSecao === 'novo-produto') {
        secaoNovoProduto.classList.add('active');
    }
}

// ============================================================
// CARREGAR PRODUTOS
// ============================================================

async function carregarProdutos() {
    produtosTbody.innerHTML = '<tr class="loading-row"><td colspan="6">Carregando produtos...</td></tr>';

    try {
        const { data, error } = await supabase
            .from('carnes')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;

        todasOsStatus = data || [];
        renderizarProdutos(todasOsStatus);
    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
        produtosTbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #999;">Erro ao carregar produtos</td></tr>';
        showToast('Erro ao carregar produtos', 'error');
    }
}

function renderizarProdutos(produtos) {
    if (produtos.length === 0) {
        produtosTbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color: #999;">Nenhum produto encontrado</td></tr>';
        return;
    }

    produtosTbody.innerHTML = produtos.map(produto => `
        <tr>
            <td>
                <img src="${produto.img || 'imagens/Favicon.png'}" alt="${produto.nome}" class="product-img">
            </td>
            <td>
                <strong>${produto.nome}</strong>
            </td>
            <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
            <td>
                <span class="badge">${formatarCategoria(produto.categoria)}</span>
            </td>
            <td>
                <span class="badge ${produto.ativo ? 'badge-active' : 'badge-inactive'}">
                    ${produto.ativo ? 'Ativo' : 'Inativo'}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-admin btn-edit" onclick="editarProduto(${produto.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-admin btn-delete" onclick="abrirConfirmacaoDeletar(${produto.id}, '${produto.nome.replace(/'/g, "\\'")}')">
                        <i class="fas fa-trash"></i> Deletar
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function formatarCategoria(categoria) {
    const map = {
        'bovino': 'Bovino',
        'suino': 'Suíno',
        'frango': 'Frango',
        'acompanhamentos': 'Acompanhamentos'
    };
    return map[categoria] || categoria;
}

// ============================================================
// FILTROS
// ============================================================

filtroBusca.addEventListener('input', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);

function aplicarFiltros() {
    const textoBusca = filtroBusca.value.toLowerCase();
    const categoriaSelecionada = filtroCategoria.value;

    const produtosFiltrados = todasOsStatus.filter(produto => {
        const matchBusca = produto.nome.toLowerCase().includes(textoBusca) ||
                          produto.descricao?.toLowerCase().includes(textoBusca);
        const matchCategoria = categoriaSelecionada === '' || produto.categoria === categoriaSelecionada;
        return matchBusca && matchCategoria;
    });

    renderizarProdutos(produtosFiltrados);
}

// ============================================================
// CRIAR/EDITAR PRODUTO
// ============================================================

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formError = document.getElementById('form-error');
    formError.textContent = '';
    formError.classList.remove('show');

    const produtoData = {
        nome: document.getElementById('prod-nome').value.trim(),
        preco: parseFloat(document.getElementById('prod-preco').value),
        categoria: document.getElementById('prod-categoria').value,
        img: document.getElementById('prod-img').value.trim(),
        mais_vendidos: document.getElementById('prod-mais-vendido').checked,
        cortes_especiais: document.getElementById('prod-especial').checked,
        descricao: document.getElementById('prod-descricao').value.trim(),
        ativo: document.getElementById('prod-ativo').checked
    };

    if (!produtoData.nome || !produtoData.preco || !produtoData.categoria || !produtoData.img) {
        formError.textContent = 'Preencha todos os campos obrigatórios (*)';
        formError.classList.add('show');
        return;
    }

    try {
        let result;

        if (produtoEmEdicao) {
            // EDITAR
            const { data, error } = await supabase
                .from('carnes')
                .update(produtoData)
                .eq('id', produtoEmEdicao.id)
                .select();

            if (error) throw error;
            result = data;
            showToast('Produto atualizado com sucesso!', 'success');
        } else {
            // CRIAR
            const { data, error } = await supabase
                .from('carnes')
                .insert([{ ...produtoData, created_at: new Date().toISOString() }])
                .select();

            if (error) throw error;
            result = data;
            showToast('Produto criado com sucesso!', 'success');
        }

        limparFormulario();
        produtoEmEdicao = null;
        carregarProdutos();
        mudarSecao('produtos');
    } catch (erro) {
        console.error('Erro ao salvar produto:', erro);
        formError.textContent = 'Erro ao salvar o produto. Tente novamente.';
        formError.classList.add('show');
        showToast('Erro ao salvar produto', 'error');
    }
});

function limparFormulario() {
    productForm.reset();
    document.getElementById('prod-ativo').checked = true;
    formTitle.textContent = 'Novo Produto';
    btnSubmitText.textContent = 'Criar Produto';
}

async function editarProduto(id) {
    try {
        const { data, error } = await supabase
            .from('carnes')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        produtoEmEdicao = data;

        // PREENCHER FORMULÁRIO
        document.getElementById('prod-nome').value = data.nome;
        document.getElementById('prod-preco').value = data.preco;
        document.getElementById('prod-categoria').value = data.categoria;
        document.getElementById('prod-img').value = data.img;
        document.getElementById('prod-mais-vendido').checked = data.mais_vendidos || false;
        document.getElementById('prod-especial').checked = data.cortes_especiais || false;
        document.getElementById('prod-descricao').value = data.descricao || '';
        document.getElementById('prod-ativo').checked = true;

        formTitle.textContent = 'Editar Produto';
        btnSubmitText.textContent = 'Atualizar Produto';

        mudarSecao('novo-produto');
        document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));

    } catch (erro) {
        console.error('Erro ao carregar produto:', erro);
        showToast('Erro ao carregar produto', 'error');
    }
}

// ============================================================
// DELETAR PRODUTO
// ============================================================

function abrirConfirmacaoDeletar(id, nome) {
    produtoParaDeletar = id;
    deleteProductName.textContent = nome;
    deleteModal.style.display = 'flex';
}

btnConfirmDelete.addEventListener('click', async () => {
    if (!produtoParaDeletar) return;

    try {
        const { error } = await supabase
            .from('carnes')
            .delete()
            .eq('id', produtoParaDeletar);

        if (error) throw error;

        showToast('Produto deletado com sucesso!', 'success');
        deleteModal.style.display = 'none';
        produtoParaDeletar = null;
        carregarProdutos();
    } catch (erro) {
        console.error('Erro ao deletar produto:', erro);
        showToast('Erro ao deletar produto', 'error');
    }
});

btnCancelDelete.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    produtoParaDeletar = null;
});

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================

function showToast(mensagem, tipo = 'success') {
    toast.textContent = mensagem;
    toast.className = `toast ${tipo} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================================
// FECHAR MODAL AO CLICAR FORA
// ============================================================

window.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.style.display = 'none';
        produtoParaDeletar = null;
    }
});

// ============================================================
// EXPORTANDO FUNÇÕES PARA O HTML (Devido ao type="module")
// ============================================================
window.editarProduto = editarProduto;
window.abrirConfirmacaoDeletar = abrirConfirmacaoDeletar;
