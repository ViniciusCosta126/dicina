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
		<svg viewBox="0 0 16 16">
			<path d="M0 1v14h16V1H0zm15 13H1V4h14v10zm0-11h-1V2h1v1z" />
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
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.modal-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.modal-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`modal modal-container ${variant} wp-editor modal-${randomComponentId}`}>
				<div className="modal-content">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
