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
	icon: (
		<svg width="800" height="800" transform="scale(-1 1)" viewBox="0 0 32 32">
			<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2">
				<path d="M22 3h7m-7 6h7m-7 6h7M3 21h26M3 27h26M3 3h13v12H3z" />
				<path d="m3 13 5-4 4 3 4-3" />
				<circle cx="12" cy="7" r="1" />
			</g>
		</svg>
	),
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

	const { variant, hPosition, vPosition, isHero, itemsLength, itemVariant, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.carousel-text-section-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.carousel-text-section-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates according to the selected variant
	const createTemplate = (counter) => {
		let template;
		const direction = counter % 2 === 0 ? 'right' : 'left';

		if (variant === 'default') {
			template = [['il/text-with-image', { variant: 'titles-texts', hPosition: direction }]];
		}

		return template;
	};

	// Function that adds a new item to the menu
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const newBlockTemplate = createTemplate(newItemsLength);
		const newBlock = createBlocksFromInnerBlocksTemplate(newBlockTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block) => {
			const newInnerBlock = [...block.innerBlocks, ...newBlock];
			block.innerBlocks = newInnerBlock;

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	const handleRemove = () => {
		if (itemsLength > 1) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);

			const idToRemove = existingInnerBlocks[0].innerBlocks[itemsLength - 1].clientId;

			const newInnerBlocks = existingInnerBlocks.map((block) => {
				const newInnerBlock = block.innerBlocks;
				block.innerBlocks = newInnerBlock.filter((item) => item.clientId !== idToRemove);

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
				{itemsLength > 1 && (
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
				)}

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

			<div className={`carousel-text-section ${variant} wp-editor carousel-text-section-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/carousel',
							{
								id: 'text-with-image-carousel',
								variant: 'text-with-image',
								allowed_blocks: ['il/text-with-image'],
								bgColor: 'transparent',
								navigation: true,
								navigationDesktop: true,
								dots: false,
								autoplay: false,
								loop: false,
								perView: 1,
								perView480: 1,
								perView768: 1,
								perView960: 1,
								perView1366: 1,
								controlsText: true,
								isLocked: true,
							},
							[
								[
									'il/text-with-image',
									{
										variant: itemVariant,
										hPosition: hPosition,
										vPosition: vPosition,
										isHero: isHero,
									},
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
