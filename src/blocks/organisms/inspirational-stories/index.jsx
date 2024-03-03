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
		.inspirational-stories-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.inspirational-stories-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`inspirational-stories wp-editor ${variant} inspirational-stories-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/lightspeed-text',
							{
								tag: 'p',
								sizeM: 'body-1',
								sizeD: 'body-1',
								color: '#0063A4',
								bgColor: '#002753',
								gspStart: 'top+=200px center',
							},
						],
						[
							'il/carousel',
							{
								variant: 'stories',
								allowed_blocks: ['il/inspirational-item'],
								bgColor: 'transparent',
								mode: 'gallery',
								navigation: true,
								navigationDesktop: true,
								modificationIn: 'inspirational-stories',
								id: 'inspirational-stories-carousel',
								speed: 400,
								perView: 1,
								perView480: 1,
								perView960: 1,
								perView1366: 1,
							},
							[
								['il/inspirational-item', {}],
								['il/inspirational-item', {}],
							],
						],
					]}
				/>
			</div>
		</>
	);
}
