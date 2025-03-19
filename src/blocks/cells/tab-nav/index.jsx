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
	icon: 'minus',
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
		.tab-nav-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.tab-nav-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = () => {
		let template;

		template = [
			[
				'il/button',
				{
					variant: 'link-tab',
				},
			],
		];

		return template;
	};

	// Function that adds a new item to the tabs
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const buttonTemplate = createTemplate();
		const newButtonBlock = createBlocksFromInnerBlocksTemplate(buttonTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block) => {
			const newInnerBlock = [...block.innerBlocks, ...newButtonBlock];
			block.innerBlocks = newInnerBlock;

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove a item from the tabs
	const handleRemove = () => {
		if (itemsLength > 0) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);
			console.log(existingInnerBlocks);

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

			<div className={`tab-nav wp-editor ${variant} tab-nav-${randomComponentId}`}>
				<div className="container">
					<InnerBlocks
						template={[
							[
								'il/carousel',
								{
									variant: 'tabs',
									allowed_blocks: ['il/button'],
									bgColor: 'transparent',
									navigationDesktop: true,
									speed: 400,
									gutter: 24,
									gutterDesktop: 48,
									autoWidth: true,
									perView: 1,
									perView480: 1,
									perView960: 2,
									perView1366: 4,
								},
								[['il/button', { variant: 'link-tab' }]],
							],
						]}
						renderAppender={() => <CustomAppenderButton />}
					/>
				</div>
			</div>
		</>
	);
}
