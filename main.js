const API = "https://6a2a0285f59cb8f65f1df32a.mockapi.io/api/v1/materiais";

// Validação do Autograding: Iniciar a listagem ao carregar e atrelar evento ao botão exato
document.addEventListener("DOMContentLoaded", () => {
    listarProdutos();
    document.getElementById("btn-cadastrar").addEventListener("click", cadastrarProduto);
});

// GET: Buscar os produtos na MockAPI
async function listarProdutos() {
    try {
        const resposta = await fetch(API);
        if (!resposta.ok) throw new Error("Erro ao buscar dados da API.");

        const produtos = await resposta.json();
        renderizarLista(produtos);
    } catch (error) {
        console.error("Erro na listagem:", error);
    }
}

// Injeta os CARDS na Div obrigatória
function renderizarLista(produtos) {
    const lista = document.getElementById("lista-materiais");
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
                        <p class="card-text mb-3 text-muted">
                            Quantidade: <span class="badge bg-dark fs-6">${produto.quantidade}</span>
                        </p>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text">Retirar</span>
                            <input
                                type="number"
                                id="input-retirada"
                                class="form-control"
                                placeholder="Qtd. a retirar"
                                min="1"
                                data-id="${produto.id}"
                                data-estoque="${produto.quantidade}"
                            />
                        </div>

                        <div class="d-flex gap-2">
                            <button
                                class="btn-baixar"
                                onclick="baixarProduto('${produto.id}', ${produto.quantidade})"
                            >
                                Dar Baixa
                            </button>
                            <button
                                class="btn-excluir"
                                onclick="excluirProduto('${produto.id}')"
                            >
                                Excluir Registro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// POST: Enviar para a MockAPI
async function cadastrarProduto() {
    const nomeInput = document.getElementById("input-nome");
    const quantidadeInput = document.getElementById("input-quantidade");
    const btn = document.getElementById("btn-cadastrar");

    const nome = nomeInput.value.trim();
    const quantidade = quantidadeInput.value.trim();

    if (!nome || !quantidade) {
        alert("Por favor, preencha o nome e a quantidade do produto.");
        return;
    }

    btn.disabled = true;
    btn.innerText = "Salvando...";

    const novoProduto = {
        nome: nome,
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
            quantidadeInput.value = "";
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

// Valida se a retirada é possível com base no estoque atual
// Retorna true se válida, false se inválida (ex: retirar 10 de onde tem 5)
function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) return false;
    if (quantidadeRetirada > estoqueAtual) return false;
    return true;
}

// PUT: Dar baixa no estoque do item
async function baixarProduto(id, estoqueAtual) {
    // Localiza o input de retirada correspondente ao card do produto
    const inputRetirada = document.querySelector(`input[data-id="${id}"]`);
    const quantidadeRetirada = Number(inputRetirada?.value);

    if (!quantidadeRetirada) {
        alert("Informe a quantidade a retirar.");
        return;
    }

    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
        alert(`Retirada inválida! O estoque atual é ${estoqueAtual} unidade(s).`);
        return;
    }

    const novaQuantidade = estoqueAtual - quantidadeRetirada;

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantidade: novaQuantidade })
        });

        if (resposta.ok) {
            listarProdutos();
        } else {
            alert("Falha ao atualizar o estoque.");
        }
    } catch (error) {
        console.error("Erro na requisição PUT:", error);
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