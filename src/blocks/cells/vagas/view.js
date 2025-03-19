document.addEventListener('DOMContentLoaded', () => {
	const vagas = document.querySelectorAll('.vaga');

	const toggleVagaOpen = (event) => {
		const title = event.currentTarget.querySelector('.vaga__title');
		title.classList.toggle('open');
		event.currentTarget.classList.toggle('open');
	};

	if (vagas.length > 0) {
		vagas.forEach((vaga) => {
			vaga.addEventListener('click', toggleVagaOpen);
		});
	}
});
