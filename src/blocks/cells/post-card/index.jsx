import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg viewBox="0 0 24 24">
				<path d="M2 4v16a2 2 0 0 0 2 2h12l6-6V4H2z" />
				<path fill="#fff" d="m22 16-6 6v-4c0-1.1.895-2 2-2h4z" />
				<path d="M4 2a2 2 0 0 0-2 2v2h20V4a2 2 0 0 0-2-2H4z" />
				<g fill="#fff">
					<path d="M5 6h14v2H5zM5 10h14v2H5zM5 14h9v2H5z" />
				</g>
			</svg>
		),
	},
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

	const { variant, marginM, marginD, title, cardImg, category, date, widthCard } = attributes;

	const inlineStyles = `
		.post-card-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.post-card-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<style>{inlineStyles}</style>

			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div className={`post-card ${variant} ${widthCard} post-card-${randomComponentId}`}>
				<div className="post-card__img">
					<img src={cardImg.src} alt={cardImg.alt ?? 'Imagem do card'} />
				</div>

				<div className="post-card__content">
					<div className="post-card__content__info">
						<div className="post-card__category">{category.label}</div>
						<div className="post-card__date">{date}</div>
					</div>

					<div className="title-wrapper panel">
						<RichText
							className="post-card__title"
							tagName="h3"
							placeholder="Título do card"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
