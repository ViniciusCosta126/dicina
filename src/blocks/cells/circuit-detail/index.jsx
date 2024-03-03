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
		<svg class="icon flat-line" data-name="Flat Line" viewBox="0 0 24 24">
			<path
				d="M21 17H6a3 3 0 0 1-3-3h0a3 3 0 0 1 3-3h9a3 3 0 0 0 3-3h0a3 3 0 0 0-3-3H3"
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
			<path
				d="m19 19 2-2-2-2"
				data-name="primary"
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			/>
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

	const { variant, bgColor, circuitImage, itemsLength, position, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.circuit-detail-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.circuit-detail-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = (itemsLength, type) => {
		let template;

		if (type === 'details') {
			template = [
				[
					'il/details',
					{
						variant: 'centralized',
						id: `detail-id-${itemsLength}`,
						isActive: false,
					},
				],
			];
		}

		return template;
	};

	// Function that adds a new item to the circuit details
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const detailTemplate = createTemplate(newItemsLength, 'details');
		const newdetailBlock = createBlocksFromInnerBlocksTemplate(detailTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = [...existingInnerBlocks, ...newdetailBlock];

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove a item from the circuit details
	const handleRemove = () => {
		if (itemsLength > 1) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);

			const newInnerBlocks = existingInnerBlocks.slice(0, -1);

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
					title="Remove sempre o ultimo item"
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

			<div className={`circuit-detail ${variant} ${position} wp-editor circuit-detail-${randomComponentId}`}>
				<img className="circuit-detail-image" src={circuitImage.src} alt={circuitImage.alt} />

				<div className="circuit-detail-wrapper">
					<InnerBlocks
						template={[
							[
								'il/details',
								{
									variant: 'centralized',
									id: `detail-id-${itemsLength}`,
									isActive: true,
								},
							],
						]}
						templateLock={false}
						renderAppender={() => <CustomAppenderButton />}
					/>
				</div>
			</div>
		</>
	);
}
