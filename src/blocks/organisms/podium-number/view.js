// If Needs to import any script:
// import { tns } from 'tiny-slider';

document.addEventListener('DOMContentLoaded', function () {
	var numbers = document.querySelectorAll('.number');

	numbers.forEach((number) => {
		number.innerHTML = '0';
	});
	const sectionPodium = document.querySelector('.podium-number');

	if (sectionPodium) {
		const ScrollTrigger = window.ScrollTrigger;
		const numbers = document.querySelectorAll('.number');
		const numbersCallback = document.querySelectorAll('.number-callback');

		numbers.forEach((number, index) => {
			const numberValue = parseFloat(numbersCallback[index].innerHTML);
			const isFloat = Number(numberValue) === numberValue && numberValue % 1 !== 0;

			ScrollTrigger.create({
				trigger: number,
				start: 'top bottom-=35px',
				onToggle: (self) =>
					self.isActive
						? animateValue(number, 0, numberValue, 600, isFloat)
						: animateValue(number, numberValue, 0, 600, isFloat),
				endTrigger: 'html',
			});
		});
	}
});

function animateValue(obj, start, end, duration, isFloat) {
	if (isFloat) {
		end = parseFloat(end);
	} else {
		end = parseInt(end);
	}

	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		obj.innerHTML = isFloat
			? Number((progress * (end - start) + start).toFixed(2))
			: Math.floor(progress * (end - start) + start);
		if (progress < 1) {
			window.requestAnimationFrame(step);
		}
	};
	window.requestAnimationFrame(step);
}
