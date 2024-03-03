export function changeSlide(goTo) {
	const postContent = document.querySelectorAll('.post-content');

	if (postContent) {
		postContent.forEach((element) => {
			element.addEventListener(
				'mouseover',
				() => {
					goTo(element.id);
				},
				false
			);
		});
	}
}
