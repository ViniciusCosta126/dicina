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
	icon: 'products',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const imagePath = '/wp-content/themes/Template-blocks/images/products/';

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<section className="products wp-editor">
				<div className="">
					<p className="info-text">%%Insira os textos para o mobile (até 1023px)%%</p>
					<br />
					<RichText
						allowedFormats={[]}
						tagName="h2"
						className="products__title"
						value={attributes.productsTitle}
						onChange={(productsTitle) =>
							setAttributes({
								productsTitle: productsTitle,
							})
						}
					/>
					<hr />
					<RichText
						allowedFormats={[]}
						tagName="p"
						className="products__subtitle"
						value={attributes.productsSubtitle}
						onChange={(productsSubtitle) =>
							setAttributes({
								productsSubtitle: productsSubtitle,
							})
						}
					/>
					<br />
					<br />

					<p className="info-text">%%Insira os textos para o desktop (a partir de 1024px)%%</p>
					<div className="text-wrapper">
						<div class="text-wrapper-content">
							<RichText
								allowedFormats={[]}
								tagName="h1"
								className="title"
								value={attributes.title}
								onChange={(title) =>
									setAttributes({
										title: title,
									})
								}
							/>
							<div className="subtitle-wrapper">
								<RichText
									allowedFormats={[]}
									tagName="span"
									className="subtitle"
									value={attributes.subtitle}
									onChange={(subtitle) =>
										setAttributes({
											subtitle: subtitle,
										})
									}
								/>
								<hr />
								<RichText
									allowedFormats={[]}
									tagName="span"
									className="subtitle__second"
									value={attributes.subtitle__second}
									onChange={(subtitle__second) =>
										setAttributes({
											subtitle__second: subtitle__second,
										})
									}
								/>
							</div>
						</div>
					</div>
					<br />
					<div className="carousel-container" style={{ height: 'auto' }}>
						<div className="products__carousel">
							<InnerBlocks
								template={[
									[
										'il/product',
										{
											link: {
												url: '',
												target: 'blank',
											},
											category: 'LINHA EXCLUSIVA',
											product: 'Tênis Esportivo LOTUS Special Edition Feminina Ayrton Senna Preto',
											image1: {
												src:
													imagePath +
													'tenis-ASICS-feminino/Tênis-Esportivo-LOTUS-Special-Edition-Feminina-Ayrton-Senna-Preto-Capa.jpg',
												alt: 'Capa Tênis Esportivo LOTUS Special Edition Feminina Ayrton Senna Preto',
											},
											image2: {
												src:
													imagePath +
													'tenis-ASICS-feminino/Tênis-Esportivo-LOTUS-Special-Edition-Feminina-Ayrton-Senna-Preto.jpg',
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
											category: 'Livros',
											product: 'Livro Ayrton Senna Uma Lenda da Velocidade F1 Ayrton Senna Preto',
											image1: {
												src:
													imagePath +
													'Livro_Ayrton-Senna-uma-lenda-da-velocidade/Livro-Ayrton-Senna-Uma-Lenda-da-Velocidade-F1-Ayrton-Senna-Preto.jpg',
												alt: 'Livro Ayrton Senna Uma Lenda da Velocidade F1 Ayrton Senna Preto',
											},
											image2: {
												src:
													imagePath +
													'Livro_Ayrton-Senna-uma-lenda-da-velocidade/Livro-Ayrton-Senna-Uma-Lenda-da-Velocidade-F1-Ayrton-Senna-Preto-Aberto.jpg',

												alt: 'Livro Ayrton Senna Uma Lenda da Velocidade F1 Ayrton Senna Preto Aberto',
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
											category: 'CAMISETAS',
											product: 'Camiseta duplo S',
											image1: {
												src: imagePath + 'Camiseta-duplo-S/senna-usando-camiseta.jpg',
												alt: 'Senna usando camiseta Duplo S',
											},
											image2: {
												src: imagePath + 'Camiseta-duplo-S/camiseta-duplo-s-senna.jpg',
												alt: 'Camiseta Duplo S',
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
											category: 'Bonés',
											product: 'Bone Nacional Ayrton Senna',
											image1: {
												src: imagePath + 'Bone-Nacional/Ayrton-Senna-usando-o-bone-Nacional-senna.jpg',
												alt: 'Ayrton Senna Usando Bone Nacional ',
											},
											image2: {
												src: imagePath + 'Bone-Nacional/Bone-Nacional-senna.jpg',
												alt: 'Bone Nacional Ayrton Senna',
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
											category: 'Álbuns',
											product: 'Album de Figurinhas 2022 Ayrton Senna',
											image1: {
												src: imagePath + 'album-topps/album-de-Figurinhas-2022-Ayrton-Senna.jpg',
												alt: 'Album de Figurinhas 2022 Ayrton Senna',
											},
											image2: {
												src: imagePath + 'album-topps/brtopps_magento-senna-14.jpg',
												alt: 'brtopps magento Album de Figurinhas 2022 Ayrton Senna',
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
											category: 'Livros',
											product: 'Livro 100 Senna Capa Bota Vermelha',
											image1: {
												src:
													imagePath +
													'Livro-100-Senna/Patrocinios-Livro-100-Senna-Capa-Bota-Vermelha.jpg',
												alt: 'Livro 100 Senna Capa Bota Vermelha',
											},
											image2: {
												src: imagePath + 'Livro-100-Senna/Livro-100-Senna-Capa-Bota-Vermelha.jpg',
												alt: 'Livro 100 Senna Capa Bota Vermelha',
											},
										},
									],
								]}
								allowedBlocks={['il/product']}
								templateLock="all"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
