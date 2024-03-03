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
		<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<path d="M5.648 24.339h2.402v1.035h-3.967v-1.035l1.993-1.759c0.178-0.161 0.31-0.318 0.395-0.472s0.128-0.313 0.128-0.479c0-0.256-0.087-0.462-0.26-0.618-0.171-0.156-0.399-0.234-0.684-0.234-0.219 0-0.459 0.048-0.72 0.143-0.261 0.093-0.54 0.232-0.837 0.417v-1.199c0.317-0.105 0.63-0.184 0.94-0.238 0.31-0.056 0.613-0.084 0.91-0.084 0.653 0 1.16 0.144 1.521 0.431 0.363 0.288 0.545 0.689 0.545 1.203 0 0.297-0.077 0.575-0.23 0.834-0.154 0.256-0.476 0.6-0.969 1.031l-1.166 1.024zM27.449 26.392c0.368 0.095 0.647 0.261 0.837 0.497 0.193 0.234 0.289 0.533 0.289 0.896 0 0.541-0.207 0.953-0.622 1.236-0.414 0.28-1.019 0.42-1.813 0.42-0.28 0-0.562-0.023-0.845-0.069-0.28-0.044-0.558-0.111-0.834-0.201v-1.086c0.263 0.132 0.524 0.232 0.782 0.3 0.261 0.066 0.517 0.099 0.768 0.099 0.373 0 0.658-0.065 0.856-0.194 0.2-0.129 0.3-0.314 0.3-0.556 0-0.249-0.102-0.436-0.307-0.563-0.202-0.129-0.502-0.194-0.899-0.194h-0.563v-0.907h0.592c0.353 0 0.617-0.055 0.79-0.165 0.173-0.112 0.26-0.282 0.26-0.508 0-0.21-0.084-0.372-0.252-0.486s-0.406-0.172-0.713-0.172c-0.227 0-0.456 0.026-0.687 0.077s-0.462 0.127-0.691 0.227v-1.031c0.278-0.078 0.553-0.137 0.826-0.175s0.541-0.058 0.804-0.059c0.709 0 1.239 0.117 1.59 0.351 0.353 0.232 0.53 0.581 0.53 1.049 0 0.319-0.084 0.581-0.252 0.786-0.168 0.202-0.417 0.345-0.746 0.428zM14.73 14.397h1.243v-3.528l-1.276 0.263v-0.958l1.269-0.263h1.338v4.486h1.243v0.973h-3.817v-0.972zM30.949 30.949v-8.985h-8.985v-13.977h-10.982v9.984h-9.984v12.979z"></path>
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
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, hasTitle } = attributes;

	const BlockContent = () => {
		const title = {
			tag: 'h3',
			content: 'Pódio',
			manualSizes: true,
			manualSizeM: 16,
			manualSizeM: 20,
			marginM: 24,
			marginD: 16,
			color: '#fff',
			textTransform: 'uppercase',
			bgColor: 'transparent',
		};

		if (hasTitle) {
			return (
				<InnerBlocks
					template={[
						['il/typography', { ...title }],
						['il/repeater-items', { variant: 'podium-item' }],
					]}
				/>
			);
		} else {
			return <InnerBlocks template={[['il/repeater-items', { variant: 'podium-item' }]]} />;
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<div className={`podium ${variant} wp-editor podium-${randomComponentId}`}>
				<BlockContent />
			</div>
		</>
	);
}
