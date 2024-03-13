document.addEventListener('DOMContentLoaded', function () {
	var form = document.getElementById('candidate-form');

	form.addEventListener('submit', async function (e) {
		e.preventDefault();
		var formulario = document.getElementById("candidate-form");
		var formData = new FormData(formulario);

		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}
		try {
			const response = await fetch(formulario.getAttribute('action'), {
				method: "POST",
				body: formData
			});

			if (response.ok) {
				const data = await response.text();
				console.log('Resposta do servidor:', data);
			} else {
				console.error('Erro ao enviar o formulário. Código de status:', response.status);
				const errorText = await response.text();
				console.error('Detalhes do erro:', errorText);
			}
		} catch (error) {
			console.error('Erro ao enviar o formulário:', error);
		}
	});
});
