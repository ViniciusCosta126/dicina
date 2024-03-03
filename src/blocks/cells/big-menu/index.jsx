import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

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
	supports: {
		innerBlocks: true, // Enable inner blocks
	},
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
	apiVersion: 2,
	usesContext: ['il/product/category'],
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);
	const imagePath = '/wp-content/themes/Template-blocks/images/products/';

	const { variant, bgColor, marginM, marginD, slideDots } = attributes;

	const updateDots = ({ type = 'name', value = '', index = 0 }) => {
		let newSlideDots = slideDots;

		const oldName = newSlideDots[index].name;
		const oldLink = newSlideDots[index].link;

		if (type === 'name') {
			newSlideDots[index] = {
				name: value,
				link: oldLink,
			};
		} else {
			newSlideDots[index] = {
				name: oldName,
				link: value,
			};
		}

		setAttributes({
			slideDots: [...newSlideDots],
		});
	};

	const inlineStyles = `
		.big-menu-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		.editor-styles-wrapper .partners .info-text {
			width: 100%;
			text-align: center;
			font-size: 30px;
			font-weight: 600;
			color: #efd936;
		}
		.editor-styles-wrapper .partners.default.open{
			max-height: none !important;
		}
		.big-menu__content{
			height: 100%;
			left: 0;
			overflow-x: auto;
			position: static;
			top: 0;
			white-space: nowrap;
			width: 100%;
		}
		.big-menu__content .block-editor-block-list__layout{
			display: flex;
			width: max-content;
			margin: auto;
		}
		.big-menu .products__carousel__card img{
			max-height: 400px;
		}

		.big-menu .products__carousel__card img:first-child{
			display: none;
		}

		.wp-editor .big-menu__dots{
			position: static !important;
			display: block;
		}

		.wp-editor .big-menu__dots__dot{
			position: static !important;
			background-color: #002753;
		}
		.editor-styles-wrapper .big-menu__dots__dot:not(:last-child){
			margin-bottom: 10px !important;
		}
		.editor-styles-wrapper .big-menu__dots_container{
			position: static !important;

		}
		.editor-styles-wrapper .big-menu__container{
			height: auto !important;
		}
		.big-menu .products__carousel__card__content{
			position: absolute;
			text-align: center;
			left: 50%;
			transform: translateX(-50%);
		}
		@media (min-width: 768px) {
			.big-menu-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`big-menu ${variant} big-menu-${randomComponentId} wp-editor`}>
				<div className="big-menu__container">
					<p className="info-text">%%Insira os nomes de navegacao para os produtos%%</p>
					<div className="big-menu__dots_container">
						<div className="big-menu__dots">
							{slideDots.map((dot, index) => (
								<div className="big-menu__dots__dot">
									<RichText
										className="big-menu__dots__dot--name"
										allowedFormats={[]}
										tagName="p"
										placeholder="Insira um nome"
										value={dot.name}
										onChange={(newValue) => updateDots({ type: 'name', value: newValue, index: index })}
									/>

									<RichText
										className="big-menu__dots__dot--link"
										allowedFormats={[]}
										tagName="span"
										placeholder="Insira um link"
										value={dot.link}
										onChange={(newValue) => updateDots({ type: 'link', value: newValue, index: index })}
									/>
								</div>
							))}
						</div>
					</div>

					<p className="info-text">%%Insira os produtos%%</p>
					<div className="big-menu__content">
						<InnerBlocks
							template={[
								[
									[
										'il/product',
										{
											link: {
												url: '',
												target: 'blank',
											},
											category: 'Coleções | RELÓGIO',
											product:
												'Nesta parceria com a TAG HEUER, desenvolvemos coleções de relógios de alta performance e sofisticação. ',
											image1: {
												src: imagePath + 'tag-hauer/tag-hauer-bg-360.png',
												alt: 'Capa Tênis Esportivo LOTUS Special Edition Feminina Ayrton Senna Preto',
											},
											image2: {
												src: imagePath + 'tag-hauer/tag-hauer-bg.png',
												alt: 'Tênis Esportivo LOTUS Special Edition Feminina Ayrton Senna Preto',
											},
										},
									],
									[
										'il/product',
										{
											link: {
												url: '',
												target: 'blank',
											},
											category: 'pulseira ',
											product:
												'Braceletes produzidos em parceria com a MONGRIP™ e lançado no Automóvel Clube de Mônaco.',
											image1: {
												src: imagePath + 'mongrip/mongrip-bg-360.png',
												alt: 'Braceletes produzidos em parceria com a MONGRIP™ e lançado no Automóvel Clube de Mônaco.',
											},
											image2: {
												src: imagePath + 'mongrip/mongrip-bg.png',

												alt: 'Braceletes produzidos em parceria com a MONGRIP™ e lançado no Automóvel Clube de Mônaco.',
											},
										},
									],
									[
										'il/product',
										{
											link: {
												url: '',
												target: 'blank',
											},
											category: 'cainã gartner',
											product:
												'Os capacetes do tricampeonato e o clássico da vitória de kart em Bercy, esculpidos manualmente em blocos de marchetaria de marfim e imbuia, com detalhes folheados em ouro.',
											image1: {
												src: imagePath + 'caina-gartner/caina-gartner-bg-360.png',
												alt: 'Os capacetes do tricampeonato e o clássico da vitória de kart em Bercy, esculpidos manualmente em blocos de marchetaria de marfim e imbuia, com detalhes folheados em ouro.',
											},
											image2: {
												src: imagePath + 'caina-gartner/caina-gartner-bg.png',
												alt: 'Os capacetes do tricampeonato e o clássico da vitória de kart em Bercy, esculpidos manualmente em blocos de marchetaria de marfim e imbuia, com detalhes folheados em ouro.',
											},
										},
									],
								],
							]}
							allowedBlocks={['il/product']}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
