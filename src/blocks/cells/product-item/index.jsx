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
			<svg width="800" height="800" viewBox="0 0 60 60">
				<path
					fill="#000"
					fill-rule="evenodd"
					d="M26.2051 26.2929c-.391.391-.391 1.023 0 1.414l6 6c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414l-6-6c-.391-.391-1.023-.391-1.414 0Zm-2.586 4c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l6 6c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414l-6-6Zm-4 4c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l6 6c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414l-6-6Zm18.879-2.293-10.586-10.586-14.586 14.586 10.586 10.586 14.586-14.586Zm-9.879-12.707 12 12c.391.391.391 1.023 0 1.414l-16 16c-.195.195-.451.293-.707.293-.256 0-.512-.098-.707-.293l-12-12c-.391-.391-.391-1.023 0-1.414l16-16c.391-.391 1.023-.391 1.414 0Zm23.268 17.282c-.478-.281-1.09-.12-1.369.357l-11.462 19.55c-.828 1.433-2.667 1.926-4.055 1.126l-2.233-1.447c-.462-.301-1.082-.168-1.382.295-.301.464-.169 1.083.295 1.383l2.276 1.475c.785.453 1.644.668 2.492.668 1.729 0 3.412-.895 4.335-2.494l11.459-19.545c.279-.476.12-1.088-.356-1.368Zm8.025-31.575v16c0 3.094-.984 5.399-3.293 7.707l-29.698 29.74c-.945.945-2.201 1.464-3.537 1.464-1.336 0-2.591-.519-3.534-1.464l-18.385-18.384c-.945-.945-1.465-2.201-1.465-3.537 0-1.336.52-2.591 1.465-3.535l25.974-25.939c-6.792-1.544-11.007-1.648-12.241-1.287.521.533 2.144 1.665 6.061 3.209.514.203.766.783.564 1.297-.203.514-.784.763-1.297.564-8.108-3.196-7.634-4.968-7.455-5.635.371-1.39 2.352-1.853 6.41-1.498 3.305.289 7.571 1.104 12.012 2.293 4.441 1.19 8.541 2.617 11.547 4.02 3.695 1.723 5.176 3.112 4.803 4.503-.36 1.342-2.231 1.506-2.846 1.56-.029.003-.059.004-.088.004-.513 0-.949-.393-.995-.913-.049-.55.358-1.035.909-1.083.426-.037.709-.095.892-.147-.428-.447-1.511-1.144-3.243-1.974-.363.612-.56 1.315-.56 2.035 0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4c-.553 0-1-.447-1-1 0-.553.447-1 1-1 3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6c0-1.003.264-1.98.735-2.852-2.393-1.005-5.603-2.13-9.671-3.221-.429-.115-.842-.22-1.255-.325l-26.842 26.804c-.567.566-.879 1.32-.879 2.12 0 .802.312 1.555.879 2.122l18.385 18.385c1.133 1.133 3.109 1.133 4.242 0l29.698-29.74c1.949-1.948 2.708-3.713 2.708-6.293v-16c0-1.654-1.346-3-3-3h-16c-2.58 0-4.345.759-6.293 2.707-.391.391-1.023.391-1.414 0s-.391-1.023 0-1.414c2.308-2.309 4.613-3.293 7.707-3.293h16c2.757 0 5 2.243 5 5Z"
				/>
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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, productImage, productImageCover, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.product-item-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.product-item-${randomComponentId}.in-top .product-item-content::after {
            background: linear-gradient(to bottom, ${bgColor} 40%, transparent 100%);
		}
		
		@media (min-width: 768px) {
			.product-item-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const ProductItem = () => {
		if (variant === 'journey_highlights') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Circuito',
								tag: 'h4',
								sizeM: 'title-5-m',
								sizeD: 'title-5-d',
								color: '#ffffff',
								bgColor: 'transparent',
								textAlign: 'align-center',
								marginM: 16,
								marginD: 16,
								extraClass: 'firstText',
							},
						],
						[
							'il/typography',
							{
								content: 'GP Pais',
								tag: 'h3',
								manualSizes: true,
								manualSizeD: 32,
								manualSizeM: 20,
								color: '#ffffff',
								bgColor: 'transparent',
								fontFamily: 'helveticaneue',
								textAlign: 'align-center',
								marginM: 16,
								marginD: 16,
								extraClass: 'secondText',
							},
						],
						[
							'il/typography',
							{
								content: 'Lorem ipsum',
								tag: 'h4',
								sizeM: 'body-2-m',
								sizeD: 'body-4-d',
								color: '#ffffff',
								bgColor: 'transparent',
								textAlign: 'align-center',
								marginM: 16,
								marginD: 16,
								textWeight: 'weight-thin',
							},
						],
						[
							'il/button',
							{
								variant: 'link small',
								content: 'ver detalhes',
								color: '#ffffff',
								bgColor: 'transparent',
								marginD: 24,
								marginM: 24,
							},
						],
					]}
				/>
			);
		} else if (variant === 'default') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Categoria',
								tag: 'h4',
								sizeM: 'title-5-m',
								sizeD: 'title-5-d',
								color: '#ffffff',
								bgColor: 'transparent',
								textAlign: 'align-center',
								marginM: 16,
								marginD: 8,
							},
						],
						[
							'il/typography',
							{
								content: 'Nome do produto',
								tag: 'h3',
								sizeM: 'title-3-m',
								sizeD: 'body-5-d',
								color: '#ffffff',
								bgColor: 'transparent',
								fontFamily: 'helveticaneue',
								textAlign: 'align-center',
								marginM: 24,
								marginD: 20,
							},
						],
						[
							'il/button',
							{
								variant: 'link small',
								content: 'Explore',
								color: '#ffffff',
								bgColor: 'transparent',
							},
						],
					]}
				/>
			);
		} else if (variant === 'journey_products') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Categoria',
								tag: 'h4',
								sizeM: 'title-5-m',
								sizeD: 'title-5-d',
								color: '#ffffff',
								bgColor: 'transparent',
								textAlign: 'align-center',
								marginM: 16,
								marginD: 8,
								extraClass: 'category',
							},
						],
						[
							'il/typography',
							{
								content: 'Nome do produto',
								tag: 'h3',
								sizeM: 'title-3-m',
								sizeD: 'body-5-d',
								color: '#ffffff',
								bgColor: 'transparent',
								textAlign: 'align-center',
								marginM: 24,
								marginD: 20,
								extraClass: 'title',
								textWeight: 'weight-medium',
							},
						],
						[
							'il/button',
							{
								variant: 'link small',
								content: 'Explore',
								color: '#ffffff',
								bgColor: 'transparent',
							},
						],
					]}
				/>
			);
		}
	};
	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`product-item ${variant} product-item-${randomComponentId}`}>
				<div className="product-item-wrapper">
					<div className={`img-wrapper ${productImageCover ? 'cover' : ''}`}>
						<img src={productImage.src} alt={productImage.alt} />
					</div>

					<div className="product-item-content">
						<ProductItem />
					</div>
				</div>
			</div>
		</>
	);
}
