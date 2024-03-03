import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="48"
				height="48"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M19 3H5c-.6 0-1 .4-1 1v7c0 .5.4 1 1 1h14c.5 0 1-.4 1-1V4c0-.6-.4-1-1-1zM5.5 10.5v-.4l1.8-1.3 1.3.8c.3.2.7.2.9-.1L11 8.1l2.4 2.4H5.5zm13 0h-2.9l-4-4c-.3-.3-.8-.3-1.1 0L8.9 8l-1.2-.8c-.3-.2-.6-.2-.9 0l-1.3 1V4.5h13v6zM4 20h9v-1.5H4V20zm0-4h16v-1.5H4V16z"></path>
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

	const { variant, marginM, marginD } = attributes;

	const inlineStyles = `
		.hero-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.hero-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`hero ${variant} hero-${randomComponentId} wp-editor`}>
				<InnerBlocks
					template={[
						[
							'il/carousel',
							{
								variant: 'hero',
								allowed_blocks: ['il/slide-item'],
								bgColor: 'transparent',
								navigation: true,
								navigationDesktop: true,
								dots: true,
								autoplay: true,
								speed: 400,
								autoplayTimeout: 5000,
								loop: true,
								perView: 1,
								perView480: 1,
								perView768: 1,
								perView960: 1,
								perView1366: 1,
							},
							[['il/slide-item', { variant: 'home-hero' }]],
						],
					]}
				/>
			</section>
		</>
	);
}
