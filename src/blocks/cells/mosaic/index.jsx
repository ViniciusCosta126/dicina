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
		<svg transform="rotate(90)" viewBox="0 0 24 24" fill="none">
			<path
				d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
				stroke="#000000"
				fill="#fff"
				stroke-width="2"
			></path>
			<path d="M12 3V21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
			<path d="M3 10H12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
			<path d="M12 14H21" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
		</svg>
	),
	parent: ['il/gallery-mosaic'],
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

	const { amount, item, variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.mosaic-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.mosaic-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`mosaic ${variant} mosaic-${amount} wp-editor mosaic-${randomComponentId}`}>
				<span>
					Item do carrossel - {item}
					<br />
					Quantidade neste item - {amount}
				</span>

				<div className={`mosaic-content mosaic-content-${amount}`}>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
