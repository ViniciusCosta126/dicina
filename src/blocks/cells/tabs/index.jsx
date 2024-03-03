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
		<svg viewBox="0 0 32 32">
			<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2">
				<path d="M12 10V5H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V10H12z" />
				<path d="M30 10H12V5h16c1.1 0 2 .9 2 2v3zM18 5v5M24 5v5M6 8h2" />
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

	const { allowed_blocks, bgColor, marginM, marginD, itemsLength, autoHeight, variant } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.tabs-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.tabs-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = (itemsLength, type) => {
		let template;

		if (type === 'button') {
			template = [
				[
					'il/tabs-item',
					{
						variant: 'button-tab',
						id: `tab-item-id-${itemsLength}`,
						isActive: false,
					},
				],
			];
		} else if (type === 'content') {
			template = [
				[
					'il/tabs-item',
					{
						variant: 'content-tab',
						id: `tab-item-id-${itemsLength}`,
						isActive: false,
						allowed_blocks: allowed_blocks,
					},
				],
			];
		}

		return template;
	};

	// Function that adds a new item to the tabs
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const buttonTemplate = createTemplate(newItemsLength, 'button');
		const contentTemplate = createTemplate(newItemsLength, 'content');
		const newButtonBlock = createBlocksFromInnerBlocksTemplate(buttonTemplate);
		const newContentBlock = createBlocksFromInnerBlocksTemplate(contentTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 0) {
				const newInnerBlock = [...block.innerBlocks[1].innerBlocks, ...newButtonBlock];
				block.innerBlocks[1].innerBlocks = newInnerBlock;
			} else {
				const newInnerBlock = [...block.innerBlocks, ...newContentBlock];
				block.innerBlocks = newInnerBlock;
			}

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove a item from the tabs
	const handleRemove = () => {
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const idToRemove = existingInnerBlocks[0].innerBlocks[1].innerBlocks[itemsLength - 1].attributes.id;

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 0) {
				const newInnerBlock = block.innerBlocks[1].innerBlocks;
				block.innerBlocks[1].innerBlocks = newInnerBlock.filter((item) => item.attributes.id !== idToRemove);
			} else {
				const newInnerBlock = block.innerBlocks;
				block.innerBlocks = newInnerBlock.filter((item) => item.attributes.id !== idToRemove);
			}

			return block;
		});

		const newItemsLength = itemsLength - 1;
		setAttributes({ itemsLength: newItemsLength });

		replaceInnerBlocks(clientId, newInnerBlocks);
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

			<div className={`tabs ${variant} wp-editor tabs-${randomComponentId}`} data-autoheight={autoHeight}>
				<InnerBlocks
					template={[
						[
							'il/wrapper',
							{ extraClass: 'tabs-buttons', isLocked: false, renderAppender: false },
							[
								[
									'il/wrapper',
									{
										extraClass: 'tab-bar',
									},
									[
										[
											'il/wrapper',
											{
												extraClass: 'tab-bar-item',
											},
										],
									],
								],
								[
									'il/wrapper',
									{
										extraClass: 'tabs-buttons-content',
									},
									[
										[
											'il/tabs-item',
											{
												variant: 'button-tab',
												id: `tab-item-id-${itemsLength}`,
												isActive: true,
											},
										],
									],
								],
							],
						],
						[
							'il/wrapper',
							{ extraClass: 'tabs-contents', isLocked: false, renderAppender: false },
							[
								[
									'il/tabs-item',
									{
										variant: 'content-tab',
										id: `tab-item-id-${itemsLength}`,
										isActive: true,
										allowed_blocks: allowed_blocks,
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
