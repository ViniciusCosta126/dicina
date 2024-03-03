import { memoirs } from '../memoirs/view';

document.addEventListener(
	'DOMContentLoaded',
	function () {
		const memory = document.querySelectorAll('.memory');

		memoirs(memory);
	},
	false
);
