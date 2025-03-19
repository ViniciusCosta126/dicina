import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'slides',
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

	const { appender, variant, extraClass, allowed_blocks, isLocked, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.carousel-${randomComponentId} {
			background: ${bgColor}
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.carousel-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`carousel ${variant} wp-editor ${extraClass} carousel-${randomComponentId}`}>
				<div className="carousel-content">
					<InnerBlocks
						allowedBlocks={[...allowed_blocks]}
						templateLock={isLocked}
						{...(!appender && {
							renderAppender: appender,
						})}
					/>
				</div>
			</div>
		</>
	);
}
