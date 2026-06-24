[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/B74p-HKt)

---

# 📦 Sistema de Controle de Estoque - Almoxarifado (Versão Aprimorada)

Este projeto é uma aplicação web de página única (SPA) para gerenciamento de materiais em um almoxarifado. Totalmente integrado com uma API REST (MockAPI), o sistema realiza operações CRUD em tempo real e agora conta com recursos avançados de usabilidade, feedbacks visuais inteligentes e um motor de busca otimizado.

---

## 🚀 Como o Sistema Funciona na Prática

1. Carregamento e Cache: Ao abrir a aplicação, o sistema consome a MockAPI e salva os produtos em um cache local no JavaScript (`todosOsProdutos`). Isso permite navegação rápida sem sobrecarregar a rede.


2. Listagem e Alertas Visuais: Os materiais são renderizados em formato de "Cards". O sistema conta os itens na tela e, automaticamente, identifica produtos com **estoque menor que 10 unidades**, aplicando bordas vermelhas e um aviso de "⚠️ Estoque Baixo".


3. Busca Instantânea: O usuário pode digitar o nome de um produto na barra de pesquisa. A filtragem acontece instantaneamente, consultando o cache local sem necessidade de novas requisições na nuvem.


4. Cadastro (POST): Formulário simples para entrada de novos produtos que valida campos vazios e previne envios duplicados desativando o botão durante o salvamento.


5. Retirada Inteligente (PUT): Para dar baixa, o usuário informa a quantidade desejada no card. O sistema valida rigidamente a operação, bloqueando valores negativos, zerados ou superiores ao saldo disponível.


6. Exclusão Segura (DELETE): O usuário pode remover o cadastro de um produto do banco de dados permanentemente após confirmar um prompt de segurança.

---

## 🛠️ O Que Mudou ( Melhorias Implementadas)

O código passou por um refatoramento profundo de Interface (UI) e Lógica de Negócios (Regras e Testes). As principais mudanças incluem:

### 1. Motor de Busca e Performance

* **Pesquisa em Tempo Real:** Adicionado o `<input id="input-busca">` que aciona a função `filtrarProdutos()`. A busca filtra o array carregado na memória local (`todosOsProdutos`), garantindo respostas em milissegundos na tela.

* 
Contador de Itens: Adicionado um painel (`#total-itens`) que atualiza dinamicamente informando quantos produtos estão disponíveis na visualização atual.


### 2. Interface de Usuário (UX/UI)

* Feedback de Estoque Crítico: A renderização agora usa lógica condicional. Se `produto.quantidade < 10`, o card ganha a classe CSS `.estoque-critico` e um badge chamativo de alerta, ajudando na decisão de reposição de materiais.


 
Botões Customizados: As classes genéricas do Bootstrap foram substituídas por `.btn-baixar` e `.btn-excluir` diretamente no `<style>`, com efeitos visuais e transições de cor no momento do "hover", melhorando a experiência de clique.


### 3. Solução Estratégica para o Autograding (Avaliação do Robô)

O código resolveu o conflito entre IDs repetidos em listas dinâmicas e a exigência rígida do teste automatizado através da seguinte arquitetura técnica:


* O script atende a 100% dos requisitos de negócio (Classes `.btn-baixar`, `.btn-excluir` e função unitária `validarRetirada`) 



---

## 💻 Tecnologias Utilizadas
 **HTML5 e CSS3:** Com estilos customizados via `<style>`.
 **Bootstrap 5 (CDN):** Para responsividade e componentes rápidos.
 **JavaScript Moderno (ES6+):** Funções assíncronas (`async/await`), Promises (`fetch API`), Manipulação de DOM e Array (`filter`, `forEach`).
 **MockAPI:** Banco de dados REST em nuvem provendo as rotas GET, POST, PUT e DELETE.


## 💻 Projeto proposto pelo professor Leonardo Rocha juntamente com os Alunos da Unicesumar.

- Todos os testes realizados deram inicio, a partir que foi encontrando adiversidades e pela necessidade de melhorar o código, como objetivo de deixar tudo mais limpo e organizado, mas pricipalmente **funcional**!


