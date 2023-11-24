// Declarando variáveis globais
let clientes = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo cliente
    let btnNovoCliente = document.getElementById("btnNovoCliente");
    let modalNovoCliente = document.getElementById("modalNovoCliente");
    let spanNovoCliente = modalNovoCliente.querySelector(".close");

    // Configurando eventos do modal novo cliente
    btnNovoCliente.onclick = function () {
        modalNovoCliente.style.display = "block";
    };

    spanNovoCliente.onclick = function () {
        modalNovoCliente.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoCliente) {
            modalNovoCliente.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar cliente por placa
function identifica(placa) {
    for (let cliente of clientes) {
        if (cliente.placa === placa.id) {
            return cliente;
        }
    }
    return null;
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let cliente = identifica(button);

    let modalInfo = document.getElementById("myModal");

    if (!modalInfo) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modalInfo.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cliente
    let placaModal = modalInfo.querySelector("#placaModal");
    let nomeModal = modalInfo.querySelector("#nomeModal");
    let atendimentoModal = modalInfo.querySelector("#atendimentoModal");
    let conhecimentoModal = modalInfo.querySelector("#conhecimentoModal");
    let infraestruturaModal = modalInfo.querySelector("#infraestruturaModal");
    let comentarioModal = modalInfo.querySelector("#comentarioModal");
    let btnExcluirCliente = modalInfo.querySelector("#btnExcluirCliente");

    if (!placaModal || !nomeModal || !atendimentoModal || !conhecimentoModal || !infraestruturaModal || !comentarioModal || !btnExcluirCliente) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    placaModal.innerHTML = cliente.placa;
    nomeModal.innerHTML = cliente.nome;
    atendimentoModal.innerHTML = cliente.atendimento;
    conhecimentoModal.innerHTML = cliente.conhecimento;
    infraestruturaModal.innerHTML = cliente.infraestrutura;
    comentarioModal.innerHTML = cliente.comentario;

    // Configurando o botão de excluir
    btnExcluirCliente.onclick = function () {
        excluirCliente(cliente.placa);
        modalInfo.style.display = "none";
    };

    span.onclick = function () {
        modalInfo.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalInfo) {
            modalInfo.style.display = "none";
        }
    };

    modalInfo.style.display = "block";
}


// Função para excluir cliente
function excluirCliente(placa) {
    clientes = clientes.filter(cliente => cliente.placa !== placa);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("carros");
    clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    tabela.innerHTML = "";

    for (let cliente of clientes) {
        let botaoid = `<td><button id='${cliente.placa}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${cliente.placa}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.atendimento}</td>
            <td>${cliente.conhecimento}</td>
            <td>${cliente.infraestrutura}</td>
            <td>${cliente.comentario}</td>          
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo cliente
function cadastrarCliente() {
    let placa = document.getElementById("placa").value;
    let nome = document.getElementById("nome").value;
    let atendimento = document.getElementById("atendimento").value;
    let conhecimento = document.getElementById("conhecimento").value;
    let infraestrutura = document.getElementById("infraestrutura").value;
    let comentario = document.getElementById("comentario").value;

    // Verifica se a placa já está cadastrada
    if (clienteExistente(placa)) {
        alert("Placa já cadastrada. Insira uma placa única.");
        return;
    }

    let novoCliente = {
        placa: placa,
        nome: nome,
        atendimento: atendimento,
        conhecimento: conhecimento,
        infraestrutura: infraestrutura,
        comentario: comentario,
    };

    clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(novoCliente);

    // Salva no localStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Recarrega a tabela após cadastrar um novo cliente
    carrega();

    // Esconde o modal de novo cliente
}

// Função para verificar se o cliente já existe
function clienteExistente(placa) {
    return clientes.some(cliente => cliente.placa === placa);
}
