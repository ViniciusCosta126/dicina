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
	icon: 'format-quote',
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

	const { variant, bgColor, content, marginM, marginD, signature } = attributes;

	const inlineStyles = `
		.section-testimony-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.section-testimony-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`section-testimony ${variant} section-testimony-${randomComponentId}`}>
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
										top: 56,
										bottom: 56,
									},
								},
							},
							[
								[
									'il/testimony',
									{
										content: content,
										signature: signature,
										variant: 'legacy',
										textColor: '#ffffff',
										align: 'align-left',
										svgColor: '#EBC535',
										bgColor: 'transparent',
										hasSignature: true,
									},
								],
							],
						],
					]}
				/>
			</div>
		</>
	);
}
