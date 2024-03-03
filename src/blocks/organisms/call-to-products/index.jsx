import { InnerBlocks, RichText } from '@wordpress/block-editor';
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
	icon: 'products',
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

	const { variant, bgColor, marginM, marginD, iconImg, title, carouselLength } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.call-to-products-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.call-to-products-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const createTemplate = (lengthCounter) => {
		const template = [
			[
				'il/card-product',
				{
					id: `card-id-${lengthCounter}`,
				},
			],
		];

		return template;
	};

	// Function that adds a new item
	const handleAdd = () => {
		const newLength = carouselLength + 1;
		setAttributes({ carouselLength: newLength });

		const cardTemplate = createTemplate(newLength);
		const newCardBlock = createBlocksFromInnerBlocksTemplate(cardTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);
		const mergedBlocks = existingInnerBlocks.map((block) => {
			let newInnerBlock = [];
			newInnerBlock = [...block.innerBlocks[1].innerBlocks, ...newCardBlock];
			block.innerBlocks[1].innerBlocks = newInnerBlock;
			return block;
		});
		replaceInnerBlocks(clientId, mergedBlocks);
	};

	// Function that removes the last item
	const handleRemove = () => {
		if (carouselLength > 1) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);

			const mergedBlocks = existingInnerBlocks.filter((block) => {
				const idToRemove = block.innerBlocks[1].innerBlocks[carouselLength - 1].clientId;
				const newBlocks = block.innerBlocks[1].innerBlocks.filter((block) => block.clientId !== idToRemove);
				block.innerBlocks[1].innerBlocks = newBlocks;
				return block;
			});

			const newLength = carouselLength - 1;
			setAttributes({ carouselLength: newLength });

			replaceInnerBlocks(clientId, mergedBlocks);
		}
	};

	const CustomAppenderButton = () => {
		return (
			<div className="custom-appender">
				<button
					className="button-remove"
					title="Remove sempre o ultimo item"
					type="button"
					onClick={() => handleRemove()}
				>
					<svg fill="none" viewBox="0 0 24 24">
						<path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12" />
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

			<div className={`call-to-products ${variant} wp-editor call-to-products-${randomComponentId}`}>
				<button className="container-title">
					<img src={iconImg.src} alt={iconImg.src} />

					<RichText
						allowedFormats={[]}
						tagName={'h2'}
						className="text"
						value={title}
						onChange={(newValue) => setAttributes({ title: newValue })}
					/>

					<svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="material-symbols:arrow-back-ios-new">
							<path
								id="Vector"
								d="M3.92641 13.5101L3.74963 13.3333L3.92641 13.1566L6.88474 10.1982L7.06152 10.0214L7.2383 10.1982L20.7699 23.7298L34.3014 10.1982L34.4782 10.0214L34.655 10.1982L37.6133 13.1566L37.7901 13.3333L37.6133 13.5101L20.9466 30.1768L20.7699 30.3536L20.5931 30.1768L3.92641 13.5101Z"
								fill="white"
								stroke="white"
								stroke-width="0.5"
							/>
						</g>
					</svg>
				</button>

				<InnerBlocks
					template={[
						[
							'il/container',
							{ extraClass: 'content-container', appender: false },
							[
								[
									'il/typography',
									{
										tag: 'p',
										manualSizes: true,
										manualSizeD: 32,
										manualSizeM: 24,
										color: '#fff',
										content: 'Conheça os produtos oficiais da marca Senna.',
									},
								],
								[
									'il/carousel',
									{
										allowed_blocks: ['il/card-product'],
										navigation: false,
										navigationDesktop: true,
										perView: 1,
										perView480: 2,
										perView768: 3,
										perView960: 3,
										perView1366: 4,
										gutter: 16,
										gutterDesktop: 16,
										extraClass: 'carousel-container',
										appender: false,
									},
									[['il/card-product', {}]],
								],
							],
						],
					]}
					renderAppender={() => <CustomAppenderButton />}
				/>
			</div>
		</>
	);
}
