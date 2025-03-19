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
	const imagePath = '/wp-content/themes/Template-blocks/images/';

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.pathway {
			background: ${bgColor};
			
		}

		.pathway.margin-bottom-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		.pathway__products{
			height: auto !important;
		}
		.products__carousel__card{
			text-align: center;
		}
		
		.products__carousel__card img{
			max-height: 600px
		}
		
		@media (min-width: 768px) {
			.pathway.margin-bottom-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className="pathway">
				<div className="pathway__container">
					<p className="info-text">%%Insira o bloco de Parceiros %%</p>
					<div className="pathway__products">
						<InnerBlocks
							allowedBlocks={['il/product']}
							template={[
								[
									'il/product',
									{
										link: {
											url: '/senna-shop',
											target: 'blank',
										},
										category: 'PRODUTOS OFICIAIS ',
										product: 'Senna Shops',
										image1: {
											src: imagePath + 'senna-shops-360w.jpg',
											alt: 'Senna Shops',
										},
										image2: {
											src: imagePath + 'senna-shops-720w.jpg',

											alt: 'Senna Shops',
										},
									},
								],
								[
									'il/product',
									{
										className: 'open-big-menu',
										link: {
											url: '',
											target: 'blank',
										},
										category: 'SENNA COLLECTION ',
										product: 'Collabs',
										image1: {
											src: imagePath + 'collabs-360w.jpg',
											alt: 'Parceiros Senna',
										},
										image2: {
											src: imagePath + 'collabs-720w.jpg',

											alt: 'Parceiros Senna',
										},
									},
								],
							]}
							templateLock="all"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
