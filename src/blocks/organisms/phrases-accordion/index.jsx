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
	icon: {
		src: (
			<svg width="800" height="800" viewBox="0 0 16 16">
				<path fill="#000" d="M0 4v8h16V4H0zm15 7H1V7h14v4zM0 0h16v3H0V0zM0 13h16v3H0v-3z" />
			</svg>
		),
	},
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

	const { bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.phrase-accordion-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.phrase-accordion-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className="phrase-accordion">
				<InnerBlocks
					template={[
						['il/accordion-item', {}],
						[
							'il/accordion-item',
							{
								title: 'capacidade',
								content:
									'Eu tenho essa sensação de responsabilidade, onde eu devo tentar o melhor possível dentro da minha capacidade.',
								imgMobile: {
									src: '/wp-content/themes/Template-blocks/images/carro-amarelo-mobile.jpg',
								},
								imgDesk: {
									src: '/wp-content/themes/Template-blocks/images/carro-amarelo-desk.jpeg',
								},
							},
						],
						[
							'il/accordion-item',
							{
								title: 'experiência',
								content:
									'Podem ser encontrados aspectos positivos até nas situações negativas e é possível utilizar tudo isso como experiência para o futuro seja como piloto, seja como homem.',
								imgMobile: {
									src: '/wp-content/themes/Template-blocks/images/carro-vermelho-mobile.jpg',
								},
								imgDesk: {
									src: '/wp-content/themes/Template-blocks/images/carro-vermelho-desk.jpeg',
								},
							},
						],
						[
							'il/accordion-item',
							{
								title: 'Habilidade',
								content:
									'Acredito na habilidade da concentração, você se concentra bastante em algo que você acaba sendo capaz de extrair mais daquilo.',
								imgMobile: {
									src: '/wp-content/themes/Template-blocks/images/carro-branco-mobile.jpg',
								},
								imgDesk: {
									src: '/wp-content/themes/Template-blocks/images/carro-branco-desk.jpeg',
								},
							},
						],
					]}
					allowedBlocks={['il/accordion-item']}
				/>
			</section>
		</>
	);
}
