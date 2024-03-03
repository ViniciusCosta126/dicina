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
	icon: {
		src: (
			<svg viewBox="0 0 16 16">
				<path
					d="M422.714 532.79v6h6v-6zm1 1h4v4h-4z"
					fill="#000"
					strokeWidth=".87499952"
					transform="translate(-421.714 -531.79)"
				/>
				<path
					d="M422.714-546.791h6v6h-6z"
					fill="#000"
					strokeWidth=".87499952"
					transform="matrix(1 0 0 -1 -421.714 -531.79)"
				/>
				<path
					d="M430.714 533.791h6v1h-6zM430.714 541.791h4v1h-4zM430.714 544.791h4v1h-4zM430.714 536.791h6v1h-6z"
					fill="#000"
					strokeWidth=".87499952"
					transform="translate(-421.714 -531.79)"
				/>
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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { auxTitle, variant, bgColor, marginM, marginD, title } = attributes;

	const inlineStyles = `
		.press-post-listing-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.press-post-listing-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`press-post-listing ${variant} press-post-listing-${randomComponentId}`}>
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
										top: 96,
										bottom: 96,
									},
								},
							},
							[
								[
									'il/post-listing-header',
									{
										auxTitle: auxTitle,
										title: title,
										marginM: 32,
										marginD: 40,
										variant: variant === 'journey' ? 'section-title' : 'default',
										bgColor: variant === 'journey' ? '#002753' : '',
									},
								],
								['il/post-listing', { variant: variant }],
							],
						],
					]}
				/>
			</div>
		</>
	);
}
