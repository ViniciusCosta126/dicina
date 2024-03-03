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
	icon: 'format-quote',
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

	const { content, variant, marginM, marginD, hasSignature, signature, textSizeM, textSizeD, align, textColor, svgColor } =
		attributes;

	const inlineStyles = `
		.testimony-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.testimony-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const Text = () => {
		let weight = 'weight-normal';

		if (variant === 'legacy') {
			weight = 'weight-medium';
		}

		const attributes = {
			content: content,
			tag: 'p',
			manualSizes: true,
			manualSizeM: textSizeM,
			manualSizeD: textSizeD,
			color: textColor,
			bgColor: 'transparent',
			textAlign: align,
			textWeight: weight,
			marginM: 0,
			marginD: 0,
		};

		return <InnerBlocks template={[['il/typography', { ...attributes }]]} />;
	};

	const signatureClass = hasSignature ? 'has-signature' : '';

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`testimony ${variant} ${signatureClass} wp-editor testimony-${randomComponentId}`}>
				<svg className="quotation-marks top" viewBox="0 0 60 42">
					<path fill={svgColor} d="M0 0v42l22.5-21V0H0Zm37.5 0v42L60 21V0H37.5Z" />
				</svg>

				<Text />

				<svg className="quotation-marks bottom" viewBox="0 0 60 42">
					<path fill={svgColor} d="M60 42V0L37.5 21v21H60Zm-37.5 0V0L0 21v21h22.5Z" />
				</svg>

				{hasSignature && <img className="signature" src={signature.src} alt={signature.alt} />}
			</div>
		</>
	);
}
