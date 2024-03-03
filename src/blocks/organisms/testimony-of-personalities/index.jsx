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
		<svg baseProfile="full" viewBox="0 0 76 76">
			<path d="M39.5 38a8.5 8.5 0 1 1-3.978 16.014l-5.254 5.254a2.5 2.5 0 0 1-3.536-3.536l5.254-5.254A8.5 8.5 0 0 1 39.5 38Zm0 4a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM24.733 23a5.333 5.333 0 1 1 0 10.667 5.333 5.333 0 0 1 0-10.667ZM19.4 40.383c-.711.356-2.133 3.2-2.133 3.2s-.711 1.067-1.067 5.334L13 47.85l1.067-5.333s2.133-7.467 6.4-7.467h7.383c.868-2.174 2.83-6 5.883-6h8.534c3.054 0 5.015 3.826 5.883 6h7.383c4.267 0 6.4 7.467 6.4 7.467L63 47.85l-3.2 1.067c-.356-4.267-1.067-5.334-1.067-5.334s-1.422-2.844-2.133-3.2l.431 9.687c-1.621.633-3.386.98-5.231.98a14.45 14.45 0 0 1-3.217-.36 9.961 9.961 0 0 0 .917-4.19c0-5.523-4.477-10-10-10a9.995 9.995 0 0 0-8.576 4.854c-.312-.467-.623-.854-.857-.97l.11 2.49A9.974 9.974 0 0 0 29.5 46.5c0 1.3.248 2.543.7 3.683-1.539.56-3.2.867-4.933.867-2.25 0-4.379-.516-6.275-1.435l.408-9.232Zm23.933-6 .116 2.598a7.022 7.022 0 0 1 1.106-1.052c-.42-.696-.895-1.383-1.222-1.546ZM38 17a5.333 5.333 0 1 1 0 10.667A5.333 5.333 0 0 1 38 17Zm-5.333 17.383c-.327.163-.802.85-1.222 1.546.4.299.768.658 1.107 1.052l.115-2.598ZM51.267 23a5.333 5.333 0 1 1 0 10.667 5.333 5.333 0 0 1 0-10.667Z" />
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

	const { variant, bgColor, marginM, marginD, caroselLength } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.testimony-of-personalities-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.testimony-of-personalities-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const createTemplate = (lengthCounter, blockType) => {
		let template;

		if (blockType === 'createText') {
			template = [
				[
					'il/text-with-image',
					{
						variant: 'title-text-testimony',
						id: `text-id-${lengthCounter}`,
						indexId: lengthCounter,
						vPosition: 'top',
					},
				],
			];
		} else if (blockType === 'createImage') {
			template = [
				[
					'il/card-personality',
					{
						id: `card-personality-${lengthCounter}`,
						indexId: lengthCounter,
					},
				],
			];
		}

		return template;
	};

	// Function that adds a new item
	const handleAdd = (itemLength) => {
		const textTemplate = createTemplate(itemLength, 'createText');
		const imageTemplate = createTemplate(itemLength, 'createImage');

		const newTextBlock = createBlocksFromInnerBlocksTemplate(textTemplate);
		const newImageBlock = createBlocksFromInnerBlocksTemplate(imageTemplate);

		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const mergedBlocks = existingInnerBlocks.map((block, index) => {
			let newInnerBlock = [];
			if (index === 0) {
				newInnerBlock = [...block.innerBlocks, ...newTextBlock];
				block.innerBlocks = newInnerBlock;
			} else {
				newInnerBlock = [...block.innerBlocks[0].innerBlocks, ...newImageBlock];
				block.innerBlocks[0].innerBlocks = newInnerBlock;
			}

			const newInner = block;
			return newInner;
		});

		replaceInnerBlocks(clientId, mergedBlocks);
	};

	// Function that removes the last item
	const handleRemove = () => {
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 0) {
				const block1 = block.innerBlocks;
				const idToRemove = block1[block1.length - 1].clientId;
				const newBlocks = block.innerBlocks.filter((item) => item.clientId !== idToRemove);
				block.innerBlocks = newBlocks;
			} else {
				const block1 = block.innerBlocks[0].innerBlocks;
				const idToRemove = block1[block1.length - 1].clientId;
				const newBlocks = block.innerBlocks[0].innerBlocks.filter((item) => item.clientId !== idToRemove);
				block.innerBlocks[0].innerBlocks = newBlocks;
			}

			const newInner = block;
			return newInner;
		});

		replaceInnerBlocks(clientId, newBlocks);
	};

	const addLength = () => {
		const newLength = caroselLength + 1;
		setAttributes({ caroselLength: newLength });

		handleAdd(newLength);
	};

	const removeLength = () => {
		if (caroselLength > 1) {
			const newLength = caroselLength - 1;
			setAttributes({ caroselLength: newLength });

			handleRemove();
		}
	};

	const CustomAppenderButton = () => {
		return (
			<div className="custom-appender">
				<button
					className="button-remove"
					title="Remove sempre o ultimo item"
					type="button"
					onClick={() => removeLength()}
				>
					<svg fill="none" viewBox="0 0 24 24">
						<path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12" />
					</svg>
				</button>

				<button className="button-appender" type="button" onClick={() => addLength()}>
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
			<Controls
				clientId={clientId}
				attributes={attributes}
				setAttributes={setAttributes}
				handleAdd={(e) => handleAdd(e)}
				handleRemove={(e) => handleRemove(e)}
			/>

			<style>{inlineStyles}</style>

			<div className={`testimony-of-personalities ${variant} wp-editor testimony-of-personalities-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/carousel',
							{
								autoHeight: true,
								perView: 1,
								perView480: 1,
								perView768: 1,
								perView960: 1,
								perView1366: 1,
								delay: 400,
								variant: 'stories',
								allowed_blocks: ['il/text-with-image'],
								variant: 'text-with-image',
								id: `depositionsPersonalitiesCarousel`,
								forceHeightTransition: true,
								mode: 'gallery',
								animateIn: 'fadeInDown',
								animateOut: 'fadeOutDown',
							},
							[
								[
									'il/text-with-image',
									{
										variant: 'title-text-testimony',
										id: `text-id-${caroselLength}`,
										vPosition: 'top',
										indexId: caroselLength,
									},
								],
							],
						],
						[
							'il/container',
							{},
							[
								[
									'il/carousel',
									{
										perView: 3,
										perView480: 3,
										perView768: 3,
										perView960: 3,
										perView1366: 3,
										navigation: true,
										navigationDesktop: true,
										variant: 'about-partner',
										controlsText: true,
										otherGoTo: true,
										otherGoToId: `depositionsPersonalitiesCarousel`,
									},
									[
										[
											'il/card-personality',
											{
												id: `card-personality-${caroselLength}`,
												indexId: caroselLength,
											},
										],
									],
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
