import { registerBlockType, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

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

	const { variant, bgColor, bgPosition, itemsLength, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.product-gallery-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.product-gallery-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = () => {
		let template;

		if (variant === 'default') {
			template = [['il/product-image', {}]];
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

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 3) {
				console.log(block);
				const newInnerBlock = [...block.innerBlocks, ...newBlock];
				block.innerBlocks = newInnerBlock;
			}

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove a item
	const handleRemove = () => {
		if (itemsLength > 0) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);

			const idToRemove = existingInnerBlocks[3].innerBlocks[itemsLength - 1].clientId;

			const newInnerBlocks = existingInnerBlocks.map((block, index) => {
				if (index === 3) {
					const newInnerBlock = block.innerBlocks;
					block.innerBlocks = newInnerBlock.filter((item) => item.clientId !== idToRemove);
				}

				return block;
			});

			const newItemsLength = itemsLength - 1;
			setAttributes({ itemsLength: newItemsLength });

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

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`product-gallery ${variant} wp-editor product-gallery-${randomComponentId}`}>
				<div className="container default">
					<div
						className="product-gallery-full-image"
						style={{
							backgroundImage: `url(https://placehold.co/1920x1080?text=Imagem+do+produto)`,
							backgroundPosition: `${bgPosition} center`,
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
						}}
					></div>

					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									content: 'Nome do produto',
									tag: 'h2',
									hasManualSizes: true,
									ManualSizeM: 32,
									ManualSizeD: 32,
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'poppins',
									textAlign: 'align-center-left',
									marginM: 24,
									marginD: 32,
									extraClass: 'product-gallery-title',
								},
							],
							[
								'il/typography',
								{
									content: 'Descreva O produto aqui...',
									tag: 'p',
									sizeM: 'body-5-m',
									sizeD: 'body-7-d',
									color: '#ffffff',
									bgColor: 'transparent',
									textAlign: 'align-center-left',
									hasMaxWidth: true,
									position: 'position-left',
									maxWidthM: 768,
									maxWidthD: 380,
									marginM: 24,
									marginD: 32,
									extraClass: 'product-gallery-subtitle',
								},
							],
							[
								'il/button',
								{
									variant: 'link',
									content: 'Explore',
									color: '#ffffff',
									bgColor: 'transparent',
									extraClass: 'product-gallery-button',
									marginM: 65,
									marginD: 132,
								},
							],
							[
								'il/carousel',
								{
									variant: 'gallery-product',
									allowed_blocks: ['il/product-image'],
									bgColor: 'transparent',
									navigationDesktop: true,
									speed: 400,
									gutter: 24,
									gutterDesktop: 32,
									autoWidth: true,
									extraClass: 'product-gallery-carousel',
								},
								[['il/product-image', {}]],
							],
						]}
						renderAppender={() => <CustomAppenderButton />}
					/>
				</div>
			</div>
		</>
	);
}
