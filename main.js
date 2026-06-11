const API = "https://6a2a0285f59cb8f65f1df32a.mockapi.io/api/v1/materiais";

/================================LISTAR PRODUTOS===================================/

async function listarProdutos() {
    const resposta = await fetch(API);
    const produtos = await resposta.json();
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";
    produtos.forEach(produto => { lista.innerHTML += `
        <div class="card">
            <h3>${produto.nome}</h3>
            <p>Categoria:${produto.categoria}</p>
            <p>Quantidade:${produto.quantidade}</p>
            <button onclick="excluirProduto('${produto.id}')">Excluir</button>
        </div>
        `;
    });
}
listarProdutos();

