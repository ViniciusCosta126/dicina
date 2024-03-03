import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import { getCurrentInnerBlocks } from '../../../hooks/common';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'cart',
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

	const { variant, bgColor, itemsLength, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.product-list-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.product-list-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = () => {
		let template;

		if (variant === 'default') {
			template = [
				[
					'il/product-item',
					{
						productImageCover: true,
					},
				],
			];
		} else if (variant === 'journey_highlights') {
			template = [
				[
					'il/product-item',
					{
						variant: variant,
						bgColor: '#002753',
						productImageCover: true,
					},
				],
			];
		} else if (variant === 'journey_products') {
			template = [
				[
					'il/product-item',
					{
						variant: variant,
						bgColor: '#002753',
						productImageCover: true,
					},
				],
			];
		}

		return template;
	};

	// Function that adds a new item
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const blockTemplate = createTemplate();
		const newBlock = createBlocksFromInnerBlocksTemplate(blockTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		if (newItemsLength === 1) {
			existingInnerBlocks[1].innerBlocks[0].attributes.perView = 1;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView480 = 1;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView768 = 1;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView960 = 1;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView1366 = 1;
		} else if (newItemsLength === 2) {
			existingInnerBlocks[1].innerBlocks[0].attributes.perView = 1;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView480 = 2;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView768 = 2;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView960 = 2;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView1366 = 2;
		} else if (newItemsLength >= 3) {
			existingInnerBlocks[1].innerBlocks[0].attributes.perView = 1;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView480 = 2;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView768 = 2;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView960 = 3;
			existingInnerBlocks[1].innerBlocks[0].attributes.perView1366 = 3;
		}

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 1) {
				const newInnerBlock = [...block.innerBlocks[0].innerBlocks, ...newBlock];
				block.innerBlocks[0].innerBlocks = newInnerBlock;
			}

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove a item
	const handleRemove = () => {
		if (itemsLength > 0) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);

			const idToRemove = existingInnerBlocks[1].innerBlocks[0].innerBlocks[itemsLength - 1].clientId;

			const newItemsLength = itemsLength - 1;
			setAttributes({ itemsLength: newItemsLength });

			if (newItemsLength === 1) {
				existingInnerBlocks[1].innerBlocks[0].attributes.perView = 1;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView480 = 1;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView768 = 1;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView960 = 1;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView1366 = 1;
			} else if (newItemsLength === 2) {
				existingInnerBlocks[1].innerBlocks[0].attributes.perView = 1;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView480 = 2;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView768 = 2;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView960 = 2;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView1366 = 2;
			} else if (newItemsLength >= 3) {
				existingInnerBlocks[1].innerBlocks[0].attributes.perView = 1;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView480 = 2;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView768 = 2;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView960 = 3;
				existingInnerBlocks[1].innerBlocks[0].attributes.perView1366 = 3;
			}

			const newInnerBlocks = existingInnerBlocks.map((block, index) => {
				if (index === 1) {
					const newInnerBlock = block.innerBlocks[0].innerBlocks;
					block.innerBlocks[0].innerBlocks = newInnerBlock.filter((item) => item.clientId !== idToRemove);
				}

				return block;
			});

			replaceInnerBlocks(clientId, newInnerBlocks);
		}
	};

	const CustomAppenderButton = () => {
		return (
			<div className="custom-appender">
				<button
					className="button-remove"
					title="Remove sempre a ultima aba da lista"
					type="button"
					onClick={() => handleRemove()}
				>
					<svg fill="none" viewBox="0 0 24 24">
						<path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12" />
					</svg>
				</button>

				<button className="button-appender" type="button" onClick={() => handleAdd()}>
					<svg fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24">
						<path stroke="none" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
					</svg>
				</button>
			</div>
		);
	};

	const Journey_highlights = () => {
		return (
			<InnerBlocks
				template={[
					[
						'il/container',
						{ extraClass: 'title-container' },
						[
							[
								'il/typography',
								{
									content: 'Principais destaques',
									tag: 'h2',
									sizeM: 'title-3-m',
									sizeD: 'body-1-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									textAlign: 'align-left-center',
									marginM: 32,
									marginD: 40,
									extraClas: 'title',
								},
							],
						],
					],
					[
						'il/container',
						{ extraClass: 'carousel-container' },
						[
							[
								'il/carousel',
								{
									variant: 'products-in-line',
									allowed_blocks: ['il/product-item'],
									bgColor: 'transparent',
									dots: true,
									gutter: 24,
									speed: 400,
									navigation: true,
									perView: 1,
									perView480: 1,
									perView768: 1,
									perView960: 1,
									perView1366: 1,
									navigationDesktop: true,
								},
								[['il/product-item', { variant: variant, bgColor: '#002753', productImageCover: true }]],
							],
						],
					],
				]}
				renderAppender={() => <CustomAppenderButton />}
			/>
		);
	};

	const JourneyProducts = () => {
		return (
			<InnerBlocks
				template={[
					[
						'il/container',
						{ extraClass: 'title-container' },
						[
							[
								'il/typography',
								{
									content: 'Coleções',
									tag: 'h2',
									sizeM: 'title-3-m',
									sizeD: 'body-5-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									textAlign: 'align-center',
									marginM: 24,
									marginD: 24,
								},
							],
							[
								'il/typography',
								{
									content: 'Descreva a coleção do artista aqui...',
									tag: 'p',
									sizeM: 'body-5-m',
									sizeD: 'body-7-d',
									color: '#ffffff',
									bgColor: 'transparent',
									textAlign: 'align-center',
									hasMaxWidth: true,
									position: 'position-center',
									marginD: 40,
									marginM: 22,
								},
							],
						],
					],
					[
						'il/container',
						{ extraClass: 'carousel-container' },
						[
							[
								'il/carousel',
								{
									variant: 'products-in-line',
									allowed_blocks: ['il/product-item'],
									bgColor: 'transparent',
									dots: true,
									speed: 400,
									gutter: 24,
									perView: 1,
									perView480: 1,
									perView768: 1,
									perView960: 1,
									perView1366: 1,
									navigationDesktop: true,
								},
								[['il/product-item', { variant: variant, bgColor: '#002753', productImageCover: true }]],
							],
						],
					],
				]}
				renderAppender={() => <CustomAppenderButton />}
			/>
		);
	};

	const Default = () => {
		return (
			<InnerBlocks
				template={[
					[
						'il/container',
						{ containerSize: 'container-block default text-wrapper' },
						[
							[
								'il/typography',
								{
									content: 'Coleções',
									tag: 'h2',
									sizeM: 'title-3-m',
									sizeD: 'body-5-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									textAlign: 'align-center',
									marginM: 32,
									marginD: 32,
								},
							],
							[
								'il/typography',
								{
									content: 'Descreva a coleção do artista aqui...',
									tag: 'p',
									sizeM: 'body-5-m',
									sizeD: 'body-7-d',
									color: '#ffffff',
									bgColor: 'transparent',
									textAlign: 'align-center',
									hasMaxWidth: true,
									position: 'position-center',
									maxWidthM: 628,
									maxWidthD: 628,
								},
							],
						],
					],
					[
						'il/container',
						{
							containerSize: 'container-block large mobile-full large-full products-wrapper',
						},
						[
							[
								'il/carousel',
								{
									variant: 'products-in-line',
									allowed_blocks: ['il/product-item'],
									bgColor: 'transparent',
									dots: true,
									speed: 400,
									navigationDesktop: true,
									perView: 1,
									perView480: 1,
									perView768: 1,
									perView960: 1,
									perView1366: 1,
								},
								[
									[
										'il/product-item',
										{
											productImageCover: true,
										},
									],
								],
							],
						],
					],
				]}
				renderAppender={() => <CustomAppenderButton />}
			/>
		);
	};

	const Productlist = () => {
		if (variant === 'journey_highlights') {
			return <Journey_highlights />;
		} else if (variant === 'default') {
			return <Default />;
		} else if (variant === 'journey_products') {
			return <JourneyProducts />;
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`product-list ${variant} product-list-${randomComponentId} wp-editor`}>
				<Productlist />
			</div>
		</>
	);
}
