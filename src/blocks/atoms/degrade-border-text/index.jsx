import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'editor-textcolor',
	edit: EditorComponent,
	save: () => {},
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
		.degrade-border-text {
			background: ${bgColor};
			text-transform: capitalize;
			-webkit-background-clip: text;
			-webkit-text-stroke: 8px transparent;
		}

		.degrade-border-text.margin-bottom-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		
		@media (min-width: 768px) {
			.degrade-border-text.margin-bottom-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`degrade-border-text ${variant} margin-bottom-${randomComponentId}`}>
				<RichText
					allowedFormats={[]}
					tagName="p"
					className="paragraph"
					value={attributes.content}
					onChange={(content) => setAttributes({ content: content })}
					placeholder="Call to action"
					style={{
						color: attributes.color,
						backgroundColor: attributes.bgColor,
					}}
				/>
			</div>
		</>
	);
}
