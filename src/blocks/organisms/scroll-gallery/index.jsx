import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

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

	const {
		variant,
		bgColor,
		marginM,
		marginD,
		bgImage1,
		bgImageMobile1,
		bgImage2,
		bgImageMobile2,
		bgImage3,
		bgImageMobile3,
		bgImage4,
		bgImageMobile4,
		bgImage5,
		bgImageMobile5,
		bgImage6,
		bgImageMobile6,
	} = attributes;

	const inlineStyles = `
		.scroll-gallery-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.editor-styles-wrapper .scroll-gallery__container p{
			opacity: 1;
			position: static;
			transform: translateY(0%); 
		}
		
		@media (min-width: 768px) {
			.scroll-gallery-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`scroll-gallery ${variant} scroll-gallery-${randomComponentId}`}>
				<div className="scroll-gallery__container">
					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: 'Dentro de você existe<br>uma <strong>força</strong>',
									textAlign: 'align-unset',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: 'Alguns chamam de<br><strong>SONHO</strong>',
									textAlign: 'align-unset',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: 'Instinto, talento,<br><strong>VOCAÇÃO</strong>',
									textAlign: 'align-unset',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: 'Nós chamamos de<br><strong>VERDADE</strong>',
									textAlign: 'align-unset',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: '<strong>NÃO IMPORTA</strong><br>como você a chama',
									textAlign: 'align-unset',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: 'Mas como você a<br><strong>BUSCA</strong>',
									textAlign: 'align-unset',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: 'E se inspira para ser,<br><strong>TODO DIA</strong>',
									textAlign: 'align-unset',
								},
							],
							[
								'il/typography',
								{
									tag: 'p',
									sizeM: 'title-1-m',
									sizeD: 'title-1-d',
									color: '#FFFFFF',
									bgColor: 'transparent',
									textWeight: 'weight-bold',
									content: '<strong>A MELHOR VERSÃO</strong><br>de si mesmo',
									textAlign: 'align-unset',
								},
							],
						]}
					/>
				</div>
				<div className="scroll-gallery__images">
					{bgImage1.src && (
						<picture className="slide-item--image">
							<source
								srcset={bgImage1.src ? bgImage1.src : bgImageMobile1.src}
								media="(min-width: 768px)"
							/>
							<img src={bgImageMobile1.src} alt="MDN" />
						</picture>
					)}
					{bgImage2.src && (
						<picture className="slide-item--image">
							<source
								srcset={bgImage2.src ? bgImage2.src : bgImageMobile2.src}
								media="(min-width: 768px)"
							/>
							<img src={bgImageMobile2.src} alt="MDN" />
						</picture>
					)}
					{bgImage3.src && (
						<picture className="slide-item--image">
							<source
								srcset={bgImage3.src ? bgImage3.src : bgImageMobile3.src}
								media="(min-width: 768px)"
							/>
							<img src={bgImageMobile3.src} alt="MDN" />
						</picture>
					)}
					{bgImage4.src && (
						<picture className="slide-item--image">
							<source
								srcset={bgImage4.src ? bgImage4.src : bgImageMobile4.src}
								media="(min-width: 768px)"
							/>
							<img src={bgImageMobile4.src} alt="MDN" />
						</picture>
					)}
					{bgImage5.src && (
						<picture className="slide-item--image">
							<source
								srcset={bgImage5.src ? bgImage5.src : bgImageMobile5.src}
								media="(min-width: 768px)"
							/>
							<img src={bgImageMobile5.src} alt="MDN" />
						</picture>
					)}
					{bgImage6.src && (
						<picture className="slide-item--image">
							<source
								srcset={bgImage6.src ? bgImage6.src : bgImageMobile6.src}
								media="(min-width: 768px)"
							/>
							<img src={bgImageMobile6.src} alt="MDN" />
						</picture>
					)}
				</div>
			</section>
		</>
	);
}
