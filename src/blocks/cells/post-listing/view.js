document.addEventListener(
	'DOMContentLoaded',
	function () {
		const postLists = document.querySelectorAll('.post-listing');

		if (postLists.length) {
			postLists.forEach((list) => {
				const listWrapper = list.querySelector('.post-list');
				if (listWrapper) {
					if (listWrapper.querySelectorAll('.post-card').length <= 2) {
						listWrapper.classList.add('center-items');
					}
					const buttonWrapper = list.querySelector('.button-wrapper');

					if (buttonWrapper) {
						const button = buttonWrapper.querySelector('.see-more');
						const filter = buttonWrapper.dataset.filter ? parseInt(buttonWrapper.dataset.filter) : null;
						const perPage = buttonWrapper.dataset.perpage ? parseInt(buttonWrapper.dataset.perpage) : null;
						const totalPages = buttonWrapper.dataset.totalpages ? parseInt(buttonWrapper.dataset.totalpages) : null;
						const variant = list.querySelector('.post-card').classList[1];
						let page = 2;

						if (button) {
							button.onclick = async () => {
								button.classList.add('loading');
								const last = listWrapper.lastElementChild;
								const lastSize = last.dataset.size;
								const cards = listWrapper.querySelectorAll('.post-card');
								const offset = cards.length;

								const posts = await getPosts(page, perPage, filter, lastSize, offset, variant);
								listWrapper.innerHTML += posts;
								button.classList.remove('loading');

								page++;

								if (page > totalPages) {
									button.style.display = 'none';
								}
							};
						}
					}
				}
			});
		}
	},
	false
);

const getPosts = async (page, perPage, filter, lastSize, offset, variant) => {
	let query;

	if (filter === 0) {
		query = `&posts_per_page=${perPage}&paged=${page}&category=0&lastSize=${lastSize}&offset=${offset}&variant=${variant}`;
	} else {
		query = `&posts_per_page=${perPage}&paged=${page}&categories=${filter}&lastSize=${lastSize}&offset=${offset}&variant=${variant}`;
	}

	const baseUrl = window?.location.origin;
	const response = await fetch(`${baseUrl}/wp-admin/admin-ajax.php?action=loadMorePosts${query}`, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});

	const data = await response.json();

	return data;
};
