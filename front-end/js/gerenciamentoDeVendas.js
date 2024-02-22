function showAll() {
    fetch('http://localhost:8080/product/' + user.id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }
            return response.json();
        })
        .then(data => {
            const tabelaElement = document.getElementById('tabela_produtos');

            // Limpar todas as linhas da tabela
            while (tabelaElement.firstChild) {
                tabelaElement.removeChild(tabelaElement.firstChild);
            }

            // Criar uma nova linha na tabela
            const row = document.createElement('tr');

            // Criar células na linha para cada propriedade do país
            const cellProduct = document.createElement('th');
            cellProduct.textContent = "Produto";
            row.appendChild(cellProduct);

            const cellCategory = document.createElement('th');
            cellCategory.textContent = "Categoria";
            row.appendChild(cellCategory);

            const cellStockQuantity = document.createElement('th');
            cellStockQuantity.textContent = "Estoque Atual";
            row.appendChild(cellStockQuantity);

            tabelaElement.appendChild(row);

            // Criar elementos de lista (li) para cada país
            data.forEach(product => {
                // Criar uma nova linha na tabela
                const row = document.createElement('tr');

                // Criar células na linha para cada propriedade do país
                const cellProduct = document.createElement('td');
                cellProduct.textContent = product.productName;
                row.appendChild(cellProduct);

                const cellCategory = document.createElement('td');
                cellCategory.textContent = product.category;
                row.appendChild(cellCategory);

                const cellStockQuantity = document.createElement('td');
                cellStockQuantity.textContent = product.stockQuantity;
                row.appendChild(cellStockQuantity);

                // Adicionar a linha à tabela
                tabelaElement.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function showTopSellingProducts() {
    fetch('http://localhost:8080/product/ranking')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }
            return response.json();
        })
        .then(data => {
            const tabelaElement = document.getElementById('tabela_ranking');

            // Limpar todas as linhas da tabela
            while (tabelaElement.firstChild) {
                tabelaElement.removeChild(tabelaElement.firstChild);
            }

            // Criar uma nova linha na tabela
            const row = document.createElement('tr');

            // Criar células na linha para cada propriedade do país
            const cellProduct = document.createElement('th');
            cellProduct.textContent = "Produto";
            row.appendChild(cellProduct);

            const cellUnitsSold = document.createElement('th');
            cellUnitsSold.textContent = "Unidades Vendidas";
            row.appendChild(cellUnitsSold);

            const cellUsername = document.createElement('th');
            cellUsername.textContent = "Vendedor";
            row.appendChild(cellUsername);

            tabelaElement.appendChild(row);

            data.forEach(ranking => {

                const row = document.createElement('tr');

                const cellProduct = document.createElement('td');
                cellProduct.textContent = ranking.productName;
                row.appendChild(cellProduct);

                const cellUnitsSold = document.createElement('td');
                cellUnitsSold.textContent = ranking.unitsSold;
                row.appendChild(cellUnitsSold);

                const cellUsername = document.createElement('td');
                if (ranking.username === user.username) {
                    cellUsername.textContent = ranking.username;
                }
                row.appendChild(cellUsername);

                tabelaElement.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function registerNewProduct() {

    //
    //
    //
    //
    //FORMA DE IMPEDIR QUE O BOTAO SEJA CLICADO SEM QUE TODOS OS CAMPOS TENHAM ALGUMA INFORMAÇÃO
    let regex = /^([a-zA-Zà-úÀ-Ú0-9çÇ]|_|\s)+$/;

    if (!regex.test(document.getElementById("productName").value)) {
        Swal.fire({
            icon: 'error',
            title: 'Não é permitido caracteres especiais no Nome do Produto!'
        });
        return;
    }

    const productName = document.getElementById("productName").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stockQuantity = Math.floor(Math.random() * 100) + 1;
    const initialStockQuantity = stockQuantity + Math.floor(Math.random() * 30) + 1;
    const category = getCategory();
    const ownerUserId = user.id;

    const data = {
        productName: productName,
        description: description,
        price: price,
        stockQuantity: stockQuantity,
        initialStockQuantity: initialStockQuantity,
        category: category,
        ownerUserId: ownerUserId
    };

    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:8080/product', option)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar produto');
            }
            // Se a resposta for OK, exibe o alerta de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                showConfirmButton: true,
                timer: 1500
            });
        })
        .catch(error => {
            // Se ocorrer um erro, exibe o alerta de falha
            Swal.fire({
                icon: 'error',
                title: 'Erro ao cadastrar produto',
                text: error.message
            });
        });

    // Limpa os campos do formulário após o cadastro
    document.getElementById("productName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";

    document.getElementById("select").value = "";
    document.getElementById("textInput").value = "";

}

// metodo que verifica categoryLocation,
// true = valor esta no select
// false = valor esta no textInput

function getCategory() {
    if (categoryLocation) {
        var select = document.getElementById("select");
        var category = select.value;
    } else {
        var textInput = document.getElementById("textInput");
        var category = textInput.value;
    }

    return category;
}

// variavel boolean para identificar se 
// category foi selecionado pelo select = true
// ou foi digitado no textInput = false
var categoryLocation;


function getCategories() {
    document.getElementById("selecaoDeCategorias").innerText = "";

    fetch('http://localhost:8080/product/categories')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar categorias');
            }
            return response.json();
        })
        .then(data => {
            //cria lista de categorias
            var categories = [];

            //recebe da requisição cada categoria e insere na lista
            data.forEach(function (data) {
                categories.push(data.category);
            })

            //cria elemento select
            var select = document.createElement("select");
            select.setAttribute("id", "select");
            select.onclick = function () {
                updateSelectValue();
            };

            //adiciona opção padrão
            var defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione uma Categoria";
            select.appendChild(defaultOption);


            //adiciona opção para acionar o textInput
            var textOption = document.createElement("option");
            textOption.value = "startText";
            textOption.textContent = "Nova Categoria";
            select.appendChild(textOption);

            //adiciona opções da lista
            categories.forEach(function (optionText) {
                var optionCategory = document.createElement("option");
                optionCategory.value = optionText;
                optionCategory.textContent = optionText;
                select.appendChild(optionCategory);
            });

            // adiciona select ao container
            document.getElementById("selecaoDeCategorias").appendChild(select);

            // cria elemento input para permitir entrada de texto
            var textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("id", "textInput");
            textInput.style.display = "none";
            textInput.oninput = function () {
                categoryLocation = false;
            };

            // adiciona o input ao container
            document.getElementById("selecaoDeCategorias").appendChild(textInput);

            // função para atualizar o valor do selct sempre que é realizada uma seleção de uma opção
            // e determinar que categoryLocation é true, sendo assim a variavel category se localiza
            // no valor de select
            function updateSelectValue() {
                var select = document.getElementById("select");
                var selectedOption = select.options[select.selectedIndex].value;
                if (selectedOption === "startText") {
                    document.getElementById("textInput").style.display = "block";
                } else {
                    document.getElementById("textInput").style.display = "none";
                    document.getElementById("textInput").value = "";
                    categoryLocation = true;
                }
            }

        })
        .catch(error => {
            console.error('Erro:', error);
        });
}


var user;
document.addEventListener("DOMContentLoaded", () => {
    user = {
        id: sessionStorage.getItem("id"),
        username: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email")
    };

    document.getElementById("exibeUser").innerText = user.username + " - " + user.email;

    showAll();
});

document.getElementById('lista-tab').onclick = function () {
    showAll();
};

document.getElementById('busca-tab').onclick = function () {
    showTopSellingProducts();
};

document.getElementById('cadastro-tab').onclick = function () {
    getCategories();
}

document.getElementById('btn_cadastra').onclick = function () {
    registerNewProduct();
}