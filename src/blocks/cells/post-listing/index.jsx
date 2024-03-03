import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'list-view',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);
	const {
		variant,
		firstItem,
		filterBy,
		amount,
		paginationType,
		marginM,
		marginD,
		excluded_categories,
		delete_category,
		isSeeAll,
	} = attributes;
	const extraClass = `post-listing-${paginationType}`;

	// Listagem preview
	const { useSelect } = wp.data;

	const PostList = () => {
		let responsePosts = null;
		let responseCategories = null;

		// Filtro de busca
		if (filterBy === -1) {
			return (
				<div className="placeholder-posts post-list">
					<div className="post-list-item full search">Listagem de notícias relacionadas com a busca</div>
				</div>
			);
		}

		responsePosts = useSelect(
			(select) => {
				const post = select('core/editor').getCurrentPost();
				const args = {
					per_page: amount,
					...(filterBy === 0 ? { category: 0 } : { categories: filterBy }),
				};

				if (variant === 'sidebar') {
					args.exclude = post.id;
				}
				return select('core').getEntityRecords('postType', 'post', args);
			},
			[variant, filterBy]
		);

		responseCategories = useSelect((select) => {
			return select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 });
		});

		if (!responsePosts) {
			return (
				<div className="placeholder-posts post-list">
					<div className="post-list-item full loading">Carregando...</div>
				</div>
			);
		}

		if (variant === 'sidebar') {
			if (!responseCategories) {
				return (
					<div className="placeholder-posts post-list">
						<div className="post-list-item full loading">Carregando...</div>
					</div>
				);
			}

			const postsWithCategories = responsePosts
				.filter(({ categories }) => (filterBy === 0 ? true : categories.length))
				.map((post) => {
					const { categories } = post;

					const category = categories.length
						? responseCategories.find(({ id }) => id === categories[0])
						: { name: 'Notícias' };

					return {
						...post,
						category: category,
					};
				});

			if (!postsWithCategories.length) {
				return (
					<div className="placeholder-posts post-list empty">
						<div className="post-list-item full">Nenhuma notícia encontrado</div>
					</div>
				);
			}

			return (
				<ul className="post-list">
					{postsWithCategories.map((post) => (
						<div class="post-card">
							<span class="post-card__category">{post.category.name}</span>
							<span lass="post-card__title">
								{post.title.raw !== undefined ? post.title.raw : post.title.rendered}
							</span>
						</div>
					))}
				</ul>
			);
		}

		let cardClass = firstItem;
		const posts = responsePosts.map((item, index) => {
			// Set item size
			if (index % 3 === 0 && index !== 0) {
				if (cardClass === 'small') {
					cardClass = 'small';
				} else if (cardClass === 'medium') {
					cardClass = 'medium';
				} else if (cardClass === 'large') {
					cardClass = 'large';
				}
			} else if (index !== 0) {
				if (cardClass === 'small') {
					cardClass = 'large';
				} else if (cardClass === 'large') {
					cardClass = 'medium';
				} else if (cardClass === 'medium') {
					cardClass = 'small';
				}
			}

			const newItem = {
				class: cardClass,
				...item,
			};

			return newItem;
		});

		if (!posts.length) {
			return (
				<div className="placeholder-posts post-list empty">
					<div className="post-list-item full">Nenhuma notícia encontrado</div>
				</div>
			);
		} else {
			return (
				<ul className="placeholder-posts post-list">
					{posts.map((post) => (
						<li key={post.id} className={`post-list-item  ${post.class}`}>
							{post.title.raw !== undefined ? post.title.raw : post.title.rendered}
						</li>
					))}
				</ul>
			);
		}
	};

	const Pagination = () => {
		if (paginationType === 'see-all') {
			return (
				<InnerBlocks
					template={[
						[
							'il/button',
							{
								variant: 'link-arrow',
								content: 'Ver todos',
								color: '002753',
							},
						],
					]}
				/>
			);
		} else if (paginationType === 'see-more' && isSeeAll === false) {
			return (
				<InnerBlocks
					template={[
						[
							'il/button',
							{
								variant: 'tertiary',
								content: 'Ver mais',
								color: '#ffffff',
								extraClass: 'see-more',
								bgColor: '#00A851',
							},
						],
					]}
				/>
			);
		} else if (paginationType === 'see-more') {
			return (
				<InnerBlocks
					template={[
						[
							'il/button',
							{
								variant: 'link-arrow',
								content: 'Ver todos',
								color: '002753',
							},
						],
						[
							'il/button',
							{
								variant: 'tertiary',
								content: 'Ver mais',
								color: '#ffffff',
								extraClass: 'see-more',
							},
						],
					]}
				/>
			);
		} else if (paginationType === 'pagination') {
			return <InnerBlocks template={[['il/posts-pagination']]} />;
		} else {
			return false;
		}
	};

	const inlineStyles = `
		.post-listing-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.post-listing-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`post-listing ${variant} ${extraClass} wp-editor post-listing-${randomComponentId}`}>
				<PostList />

				<div className={`button-wrapper`}>
					<Pagination />
				</div>
			</div>
		</>
	);
}
