
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

	const { variant, bgColor, marginM, marginD, icone } = attributes;

	const inlineStyles = `
		.card-reputacao-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.card-reputacao-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;
	console.log(icone)
	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`card-reputacao icone-card ${variant} wp-editor card-reputacao-${randomComponentId}`}>

				<img className='icone-card' src={icone.src} alt={icone.alt} />
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								tag: 'h5',
								sizeM: 'body-5-m',
								sizeD: 'body-7-d',
								content: 'Melhores times',
								textWeight: "weight-bold",
								color: '#000',
								bgColor: 'transparent',
								extraClass: "titulo-card"
							},
						],
						[
							'il/typography',
							{
								tag: 'h5',
								sizeM: 'body-5-m',
								sizeD: 'body-7-d',
								content: 'Cursus semper tellus volutpat aliquet lacus.',
								textWeight: "weight-normal",
								color: '#858EAD',
								bgColor: 'transparent',
								extraClass: 'subtitulo-card'
							},
						],
					]}
				/>
			</div>
		</>
	);
}