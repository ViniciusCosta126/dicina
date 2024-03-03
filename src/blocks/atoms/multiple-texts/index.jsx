
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from "./controls.jsx";

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

	const { variant, bgColor, marginM, marginD, tag, textQuantity } = attributes;

	const inlineStyles = `
		.multiple-texts {
			background: ${bgColor}
		}

		.multiple-texts.margin-bottom-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		
		@media (min-width: 768px) {
			.multiple-texts.margin-bottom-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	var items = [];
	for (let j=1; j <= textQuantity; j++) {
		let tempObj = {};
  		tempObj[`content${j}`] = attributes[`content${j}`];
		items.push(				
			<RichText
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				tagName={tag}
				className={`multiple-texts-${randomComponentId} multiple-texts-block-${randomComponentId}`}
				value={attributes[`content${j}`]}
				onChange={(content) => setAttributes({ [`content${j}`]: content })}
				placeholder="Insira o Texto"
				key= {j}
				style={{
					color: attributes.color,
					background: 'transparent',
				}}
			/>
		)
	}

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`multiple-texts ${variant} margin-bottom-${randomComponentId}`}>
				{items}
			</div>
		</>
	);
}