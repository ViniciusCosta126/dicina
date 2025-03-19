
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

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

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.hero-blog-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.hero-blog-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`hero-blog ${variant} wp-editor hero-blog-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/carousel',
							{	id: 'hero-blog-carousel',
								variant: 'blog-hero',
								allowed_blocks: ['il/blog-slide-item-hero'],
								bgColor: 'transparent',
								navigation: false,
								navigationDesktop: false,
								dots: true,
								autoplay: true,
								loop: true,
								perView: 1,
								perView480: 1,
								perView768: 1,
								perView960: 1,
								perView1366: 1,
								controlsText: true
							},
							[
								['il/blog-slide-item-hero', { variant: 'blog-hero' }],
								['il/blog-slide-item-hero', { variant: 'blog-hero' }],
								['il/blog-slide-item-hero', { variant: 'blog-hero' }]
							],

						],
					]}
				/>
			</div>
		</>
	);
}
