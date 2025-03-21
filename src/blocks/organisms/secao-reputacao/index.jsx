
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from "./controls.jsx";

import './style.scss';

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

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.secao-reputacao-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.secao-reputacao-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`secao-reputacao ${variant} wp-editor secao-reputacao-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/container', {
								containerSize: 'container-block default',
								paddingSize: {
									mob: {
										top: 40,
										bottom: 40,
									},
									desk: {
										top: 80,
										bottom: 80,
									},
								},
								islocked: false,
								allowed_blocks: [],
							}, [
								[
									'il/typography',
									{
										tag: 'h1',
										sizeM: 'body-1-m',
										sizeD: 'body-1-d',
										color: '#000',
										bgColor: 'transparent',
										content: 'Nossa reputação',
										textAlign: 'align-center',
										textWeight: 'weight-bold'
									},
								],
								[
									'il/wrapper', {
										extraClass: 'container-cards'
									}, [['il/card-reputacao', {}], ['il/card-reputacao', {}], ['il/card-reputacao', {}]]
								]
							]
						],

					]}
				/>
			</div>
		</>
	);
}