// Sua nova URL da MockAPI
const API = "https://6a2a0285f59cb8f65f1df32a.mockapi.io/api/v1/materiais";

let produtosGlobal = []; 

// Validação do Autograding: Iniciar a listagem ao carregar e atrelar evento ao botão exato
document.addEventListener("DOMContentLoaded", () => {
    listarProdutos();
    document.getElementById("btn-cadastrar").addEventListener("click", cadastrarProduto);
});

// GET: Buscar os produtos
async function listarProdutos() {
    try {
        const resposta = await fetch(API);
        if (!resposta.ok) throw new Error("Erro ao buscar dados da API.");
        
        const produtos = await resposta.json();
        produtosGlobal = produtos; 
        renderizarLista(produtos);
    } catch (error) {
        console.error("Erro na listagem:", error);
    }
}

// Injeta os CARDS na Div obrigatória
function renderizarLista(produtos) {
    const lista = document.getElementById("lista-materiais"); // ID corrigido para o autograding
    lista.innerHTML = ""; 

    if (produtos.length === 0) {
        lista.innerHTML = `<div class="col-12 text-center text-muted mt-4">Estoque vazio no momento.</div>`;
        return;
    }

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="col-md-6 mb-3">
                <div class="card shadow-sm border-secondary-subtle h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title fw-bold text-dark mb-0">${produto.nome}</h5>
                            <span class="text-muted small">#${produto.id}</span>
                        </div>
                        <p class="card-text mb-1 text-muted">Categoria: <strong class="text-dark">${produto.categoria || '-'}</strong></p>
                        <p class="card-text mb-3 text-muted">Quantidade: <span class="badge bg-dark fs-6">${produto.quantidade}</span></p>
                        <button class="btn btn-sm btn-outline-danger w-100 fw-bold" onclick="excluirProduto('${produto.id}')">Excluir Registro</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Filtro de Pesquisa
function filtrarProdutos() {
    const termo = document.getElementById("pesquisa").value.toLowerCase();
    
    const produtosFiltrados = produtosGlobal.filter(produto => 
        produto.nome.toLowerCase().includes(termo) || 
        (produto.categoria && produto.categoria.toLowerCase().includes(termo))
    );
    
    renderizarLista(produtosFiltrados);
}

// POST: Enviar para a MockAPI
async function cadastrarProduto() {
    const nomeInput = document.getElementById("input-nome");
    const categoriaInput = document.getElementById("input-categoria");
    const quantidadeInput = document.getElementById("input-quantidade");
    const btn = document.getElementById("btn-cadastrar");
    
    const nome = nomeInput.value.trim();
    const categoria = categoriaInput.value.trim();
    const quantidade = quantidadeInput.value.trim();
    
    if (!nome || !quantidade || !categoria) {
        alert("Por favor, preencha todos os campos do formulário.");
        return;
    }
    
    btn.disabled = true;
    btn.innerText = "Salvando...";

    const novoProduto = {
        nome: nome,
        categoria: categoria,
        quantidade: Number(quantidade)
    };

    try {
        const resposta = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoProduto)
        });
        
        if (resposta.ok) {
            nomeInput.value = "";
            categoriaInput.value = "";
            quantidadeInput.value = "";
            document.getElementById("pesquisa").value = ""; 
            
            listarProdutos(); 
        } else {
            alert("Erro ao salvar na nuvem.");
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
    } finally {
        btn.disabled = false;
        btn.innerText = "Cadastrar";
    }
}

// DELETE: Remover item da MockAPI
async function excluirProduto(id) {
    if (!confirm("Remover este item do almoxarifado?")) return;

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            listarProdutos(); 
        } else {
            alert("Falha ao excluir.");
        }
    } catch (error) {
        console.error("Erro na requisição DELETE:", error);
    }
}