
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from "./controls.jsx";

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'admin-site',
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

	const { variant, bgColor, marginM, marginD, title, category, post, cardImg } = attributes;

	const inlineStyles = `
		.most-read-post-card-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.most-read-post-card-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`most-read-post-card ${variant} most-read-post-card-${randomComponentId}`}>
				<div className="most-read-post-card__img">
					<img src={post.featuredImage.src} alt={post.featuredImage.alt} />
				</div>
				<div className="most-read-post-card__content">
					<div className="most-read-post-card__category">{category.name}</div>
					<h3 className='most-read-post-card__title'>{post.title}</h3>
				</div>
			</div>
		</>
	);
}
