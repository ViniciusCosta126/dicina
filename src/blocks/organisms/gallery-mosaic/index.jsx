import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import { documentPanel, getCurrentInnerBlocks } from '../../../hooks/common';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: (
		<svg viewBox="0 0 45.964 45.964">
			<path d="M7.071 30.834V11.062H4.042C1.803 11.062 0 12.893 0 15.13v26.732a4.04 4.04 0 0 0 4.042 4.051h26.733c2.238 0 4.076-1.811 4.076-4.051v-2.92H15.179c-4.446.001-8.108-3.661-8.108-8.108z" />
			<path d="M41.913.05H15.179c-2.238 0-4.066 1.813-4.066 4.051v26.733a4.075 4.075 0 0 0 4.066 4.067h26.734c2.237 0 4.051-1.826 4.051-4.067V4.102A4.05 4.05 0 0 0 41.913.05zm-.55 28.539a1.261 1.261 0 0 1-1.12.656H17.336c-.403 0-.782-.18-1.022-.502a1.266 1.266 0 0 1-.197-1.123l3.277-10.839a1.953 1.953 0 0 1 3.462-.564l4.582 6.437a1.951 1.951 0 0 0 2.689.484l4.219-2.865a1.949 1.949 0 0 1 1.48-.299c.515.102.966.408 1.253.848l4.229 6.472c.256.393.277.885.055 1.295z" />
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

	const { teste, currentFocus, variant, bgColor, galleryID, initialLoad, mosaicCounter, itemsLength, marginM, marginD } =
		attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.gallery-mosaic-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.gallery-mosaic-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates according to the selected variant
	const createTemplate = (itemsLength, type) => {
		let template;

		if (type === 'mosaic') {
			template = [
				[
					'il/mosaic',
					{
						amount: 1,
					},
				],
			];
		} else if (type === 'mosaic-item') {
			template = [
				[
					'il/mosaic-item',
					{
						indexId: itemsLength,
						modalId: `mosaic-modal-${galleryID}`,
					},
				],
			];
		} else if (type === 'gallery-item') {
			template = [
				[
					'il/gallery-item',
					{
						hidePanelItem: true,
						indexId: itemsLength,
						id: `gallery-modal-${itemsLength}-${clientId}`,
					},
				],
			];
		}

		return template;
	};

	const forceUpdate = (focusId) => {
		// Workaround to update the number of items within the mosaic
		// Attributes are only updating after focusing on a different element than the previously focused element
		const DOCUMENT = documentPanel();
		const mosaic = DOCUMENT.querySelector(`[data-block="${focusId}"]`);
		const mosaicItem = DOCUMENT.querySelector(`[data-block="${focusId}"] [data-type="il/mosaic-item"]`);
		if (currentFocus === 'mosaic') {
			if (mosaicItem) mosaicItem.focus();
			setAttributes({ currentFocus: 'mosaic-item' });
		} else if (currentFocus === 'mosaic-item') {
			if (mosaic) mosaic.focus();
			setAttributes({ currentFocus: 'mosaic' });
		}
	};

	//Adicionando um novo item para a galeria
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;

		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		let mosaicBlock,
			mosaicItemBlock,
			galleryItemBlock,
			focusId = null;

		let newMosaicCounter = mosaicCounter;
		let newMosaicItemsCounter = teste;
		let mosaicIndex = newMosaicCounter - 1;

		if (newMosaicItemsCounter[mosaicIndex] === 6) {
			// If the item mosaic already has 6 items, then create a new mosaic as a carousel item
			newMosaicCounter = mosaicCounter + 1;
			mosaicIndex = mosaicIndex + 1;
			setAttributes({ mosaicCounter: newMosaicCounter });

			// Adds one more item to the tile count array
			newMosaicItemsCounter.push(1);

			const mosaicTemplate = createTemplate(newMosaicCounter, 'mosaic');
			mosaicBlock = createBlocksFromInnerBlocksTemplate(mosaicTemplate);
		} else {
			// Add one more item to the last tile
			newMosaicItemsCounter[mosaicIndex] = newMosaicItemsCounter[mosaicIndex] + 1;
		}

		// Create templates for mosaicItem and galleryItem
		const mosaicItemTemplate = createTemplate(newItemsLength - 1, 'mosaic-item');
		const galleryItemTemplate = createTemplate(newItemsLength - 1, 'gallery-item');
		mosaicItemBlock = createBlocksFromInnerBlocksTemplate(mosaicItemTemplate);
		galleryItemBlock = createBlocksFromInnerBlocksTemplate(galleryItemTemplate);

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 0) {
				if (mosaicBlock) {
					// Adds new mosaic to the carousel
					const newInnerBlock = [...block.innerBlocks, ...mosaicBlock];
					block.innerBlocks = newInnerBlock;
				}

				// Add mosaic item inside the last mosaic
				const newInnerBlock = [...block.innerBlocks[mosaicIndex].innerBlocks, ...mosaicItemBlock];
				block.innerBlocks[mosaicIndex].innerBlocks = newInnerBlock;
				block.innerBlocks[mosaicIndex].attributes.amount = newMosaicItemsCounter[mosaicIndex];
				block.innerBlocks[mosaicIndex].attributes.item = newMosaicCounter;
				focusId = block.innerBlocks[mosaicIndex].clientId;
			} else if (index === 1) {
				// Add gallery item inside the last carousel
				const newInnerBlock = [...block.innerBlocks[0].innerBlocks[0].innerBlocks, ...galleryItemBlock];
				block.innerBlocks[0].innerBlocks[0].innerBlocks = newInnerBlock;
			}

			return block;
		});

		setAttributes({ itemsLength: newItemsLength });
		setAttributes({ teste: [...newMosaicItemsCounter] });

		// Force rendering update with new attributes
		forceUpdate(focusId);

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	const handleRemove = () => {
		const newItemsLength = itemsLength - 1;
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		let focusId = null;
		let newMosaicCounter = mosaicCounter;
		let newMosaicItemsCounter = teste;
		let mosaicIndex = newMosaicCounter - 1;
		let mosaicItemIndex = newMosaicItemsCounter[mosaicIndex] - 1;

		const idToRemove = existingInnerBlocks[0].innerBlocks[mosaicIndex].innerBlocks[mosaicItemIndex].attributes.indexId;

		let removeMosicItem = false;

		if (newMosaicItemsCounter[mosaicIndex] === 1) {
			// If the mosaic item is 1, then you must remove a mosaic item from the carousel
			newMosaicCounter = mosaicCounter - 1;
			mosaicIndex = mosaicIndex - 1;
			setAttributes({ mosaicCounter: newMosaicCounter });

			removeMosicItem = true;
		} else {
			// Add one more item to the last tile
			newMosaicItemsCounter[mosaicIndex] = newMosaicItemsCounter[mosaicIndex] - 1;
		}

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 0) {
				if (removeMosicItem) {
					const newInnerBlock = block.innerBlocks;
					block.innerBlocks = newInnerBlock.filter((item) => item.attributes.item !== mosaicCounter);
				} else {
					const newInnerBlock = block.innerBlocks[mosaicIndex].innerBlocks;
					block.innerBlocks[mosaicIndex].innerBlocks = newInnerBlock.filter(
						(item) => item.attributes.indexId !== idToRemove
					);
					block.innerBlocks[mosaicIndex].attributes.amount = newMosaicItemsCounter[mosaicIndex];
					block.innerBlocks[mosaicIndex].attributes.item = newMosaicCounter;
				}

				focusId = block.innerBlocks[mosaicIndex].clientId;
			} else if (index === 1) {
				const newInnerBlock = block.innerBlocks[0].innerBlocks[0].innerBlocks;
				block.innerBlocks[0].innerBlocks[0].innerBlocks = newInnerBlock.filter(
					(item) => item.attributes.indexId !== idToRemove
				);
			}

			return block;
		});

		setAttributes({ itemsLength: newItemsLength });
		setAttributes({ teste: [...newMosaicItemsCounter] });

		replaceInnerBlocks(clientId, newInnerBlocks);

		// Force rendering update with new attributes
		forceUpdate(focusId);
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

			<div className={`gallery-mosaic ${variant} wp-editor gallery-mosaic-${randomComponentId}`}>
				<div className="gallery-mosaic-content">
					<InnerBlocks
						template={[
							[
								'il/carousel',
								{
									id: `gallery-mosaic`,
									variant: 'gallery-mosaic',
									allowed_blocks: ['il/gallery-item'],
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
									selfGoTo: false,
									otherGoTo: true,
									otherGoToId: `gallery-carousel-mosaic`,
									isLocked: true,
								},
								[
									[
										'il/mosaic',
										{
											id: `mosaic-${itemsLength}-${randomComponentId}`,
										},
									],
								],
							],
							[
								'il/modal',
								{
									variant: 'inner',
									id: `mosaic-modal-${galleryID}`,
								},
								[
									[
										'il/gallery-carousel',
										{
											id: `gallery-carousel-mosaic`,
											appender: false,
										},
									],
								],
							],
						]}
						renderAppender={() => <CustomAppenderButton />}
					/>
				</div>
			</div>
		</>
	);
}
