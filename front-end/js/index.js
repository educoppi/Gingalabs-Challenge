function login(){
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if(!username || !email){
        Swal.fire({
            icon: 'info',
            title: 'Campos vazios!',
            text: 'Preencha os campos de login.'
        });
        return;
    }

    const url = `http://localhost:8080/user/${username}/${email}`;

    const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			// Adicione outros cabeçalhos conforme necessário
		},
	};

    fetch(url, requestOptions)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Falha ao efetuar login. Código de status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// Verifique se há resultados
			if (data.length === 0) {
				Swal.fire({
					icon: 'info',
					title: 'Resultado da Autenticação',
					text: 'Usuário e email inválidos, tente novamente.'
				});
				return;
			}
			data.forEach(user =>{
				sessionStorage.setItem("id", user.id);
				sessionStorage.setItem("username", user.username);
				sessionStorage.setItem("email", user.email);
			});

            window.location.assign("GerenciamentoDeVendas.html");
            
		})
		.catch(error => {
			Swal.fire({
				icon: 'error',
				title: 'Atenção',
				text: `Erro ao efetuar login: ${error.message}`
			});
		});
}

document.getElementById('btnLogin').onclick = function() {
	login();
};