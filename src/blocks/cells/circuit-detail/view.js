document.addEventListener(
	'DOMContentLoaded',
	function () {
		const circuits = document.querySelectorAll('.circuit-detail');

		const changeActive = (all, index) => {
			all.forEach((item) => {
				item.classList.remove('active');
			});

			all[index].classList.add('active');
		};

		if (circuits.length) {
			circuits.forEach((circuit) => {
				const details = circuit.querySelectorAll('.details');

				let ind = 0;
				const max = details.length - 1;

				setInterval(() => {
					if (ind === max) {
						ind = 0;
					} else {
						ind++;
					}

					changeActive(details, ind);
				}, 4000);
			});
		}
	},
	false
);
