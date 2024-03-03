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
	icon: (
		<svg fill="none" viewBox="0 0 24 24">
			<path
				stroke="#000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 19V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 3 6.08 3 7.2 3h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 4.52 20 5.08 20 6.2V17H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h14M9 7h6m-6 4h6m4 6v4"
			/>
		</svg>
	),
	parent: ['il/books-carousel'],
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { image, imageMobile, variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.book-for-carousel-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.book-for-carousel-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`book-for-carousel ${variant} wp-editor book-for-carousel-${randomComponentId}`}>
				{image.src && (
					<picture className="slide-item--image">
						<source srcset={image.src ? image.src : imageMobile.src} media="(min-width: 768px)" />
						<img src={imageMobile.src} alt="MDN" />
					</picture>
				)}

				<div className="text-container">
					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									tag: 'p',
									content: 'Título do Livro',
									manualSizes: true,
									manualSizeM: 16,
									manualSizeD: 18,
									marginM: 8,
									marginD: 8,
									textWeight: 'weight-medium',
									color: '#002753',
									bgColor: 'transparent',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									content: '<strong>Autor:</strong> ',
									manualSizes: true,
									manualSizeD: 16,
									manualSizeM: 16,
									marginM: 4,
									marginD: 4,
									color: '#232323',
									bgColor: 'transparent',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									content: '<strong>Ano:</strong> ',
									manualSizes: true,
									manualSizeD: 16,
									manualSizeM: 16,
									marginM: 4,
									marginD: 4,
									color: '#232323',
									bgColor: 'transparent',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									content: '<strong>Editora:</strong> ',
									manualSizes: true,
									manualSizeD: 16,
									manualSizeM: 16,
									color: '#232323',
									bgColor: 'transparent',
								},
							],
						]}
					/>
				</div>
			</div>
		</>
	);
}
