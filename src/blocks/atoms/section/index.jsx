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
				<path d="M18.5 5.5V8H20V5.5h2.5V4H20V1.5h-1.5V4H16v1.5h2.5zM12 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6h-1.5v6a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5h6V4z"></path>
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

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.section-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.section-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section
				className={`section ${variant} section-${randomComponentId}`}
			>
				<InnerBlocks
					template={[
						[
							'il/container',
							{
								containerSize: 'container-block default',
								paddingSize: {
									mob: {
										top: 40,
										bottom: 40,
									},
									desk: {
										top: 80,
										bottom: 80,
									},
								},
								islocked: false,
								allowed_blocks: [],
							},
							[
								[
									'il/typography',
									{
										tag: 'p',
										sizeM: 'body-1-m',
										sizeD: 'body-1-d',
										color: '#0063A4',
										bgColor: 'transparent',
									},
								],
							],
						],
					]}
				/>
			</section>
		</>
	);
}
