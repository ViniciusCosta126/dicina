import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'text',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 100000);

	const {
		content,
		tag,
		size,
		sizeM,
		sizeD,
		manualSizes,
		manualSizeM,
		manualSizeD,
		sizeType,
		widthStrokeM,
		widthStrokeD,
		textIndent,
		marginM,
		marginD,
		hasInnerBlocks,
		hasMaxWidth,
		position,
		maxWidthM,
		maxWidthD,
		textAlign,
		textTransform,
		textWeight,
		fontFamily,
		bgColor,
		color,
		extraClass,
	} = attributes;

	const maxWidth = hasMaxWidth ? `${position}` : '';
	const maxWidthMStyles = hasMaxWidth ? `max-width: ${maxWidthM}px;` : ``;
	const maxWidthDStyles = hasMaxWidth ? `max-width: ${maxWidthD}px;` : ``;
	const sizesStyleM = manualSizes ? `font-size: ${manualSizeM}${sizeType};` : '';
	const sizesStyleD = manualSizes ? `font-size: ${manualSizeD}${sizeType};` : '';
	const fixedStyle = !manualSizes ? 'fixedStyle' : '';

	const colorStyle = color.includes('gradient')
		? `
			/* Warning: no fallback */
			background: -webkit-${color};
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		`
		: `
			color: ${color};
			background: ${bgColor};
		`;

	const textStroke = color.includes('gradient')
		? `
			/* Warning: no fallback */
			background: -webkit-${color};
			-webkit-background-clip: text;
			-webkit-text-stroke: ${widthStrokeM}px transparent;
			color: ${bgColor};
			line-height: 1;
		`
		: `
			-webkit-text-stroke: ${widthStrokeM}px;
			-webkit-text-stroke-color: ${color};
			color: transparent;
		`;

	const textStrokeD = `-webkit-text-stroke-width: ${widthStrokeD}px;`;

	const inlineStyles = `
		.typography-${randomComponentId} {
			${sizesStyleM}
			${maxWidthMStyles}
			text-indent: ${textIndent}px;
			margin-bottom: ${marginM}px;
		}

		.typography-${randomComponentId}:not(.stroke) {
			${colorStyle}
		}


		@media (min-width: 768px) {
			.typography-${randomComponentId} {
				${sizesStyleD}
				${maxWidthDStyles}
				margin-bottom: ${marginD}px
			}

		}
	`;

	const fontSize = !manualSizes ? (size ? `${size}-m ${size}-d` : `${sizeM} ${sizeD}`) : '';

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<RichText
				tagName={tag}
				className={`typography ${fontFamily} ${fontSize} ${textAlign} ${textTransform} ${textWeight} ${maxWidth} typography-${randomComponentId} ${extraClass} ${fixedStyle}`}
				value={content}
				onChange={(content) => setAttributes({ content: content })}
			/>

			{hasInnerBlocks && <InnerBlocks template={[['core/list']]} />}
		</>
	);
}
