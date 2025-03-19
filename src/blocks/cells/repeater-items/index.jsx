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
		<svg width="800" height="800" viewBox="0 0 1920 1920">
			<path d="M0 426.667C0 191.025 191.025 0 426.667 0c235.641 0 426.666 191.025 426.666 426.667 0 235.641-191.025 426.666-426.666 426.666C191.025 853.333 0 662.308 0 426.667zm853.333 640.003V1920H0v-853.33h853.333zM1360 1920v-346.67h-346.67v-160H1360v-346.66h160v346.66h346.67v160H1520V1920h-160zm560-1066.667L1440 0 960 853.333h960z" />
		</svg>
	),
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const { variant, bgColor, marginM, marginD } = attributes;
	const randomComponentId = Math.floor(Math.random() * 10000);

	let ALLOWED_BLOCKS = [];
	let TEMPLATE_BLOCK = [];

	if (variant === 'podium-item') {
		ALLOWED_BLOCKS = [];
		TEMPLATE_BLOCK = [];
		ALLOWED_BLOCKS = ['il/podium-item'];
		TEMPLATE_BLOCK = [['il/podium-item'], ['il/podium-item'], ['il/podium-item']];
	}

	const inlineStyles = `
		.bg-${randomComponentId} {
			background: ${bgColor}
		}

		.repeater-items.margin-bottom-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.repeater-items.margin-bottom-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`repeater-items repeater-${variant} margin-bottom-${randomComponentId} bg-${randomComponentId}`}>
				<InnerBlocks template={[...TEMPLATE_BLOCK]} allowedBlocks={[...ALLOWED_BLOCKS]} />
			</div>
		</>
	);
}
