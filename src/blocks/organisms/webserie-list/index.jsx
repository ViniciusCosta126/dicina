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
			<path d="M48 45h10v3H48v-3Zm0 5h10v3H48v-3Zm0 5h10v3H48v-3Zm-4 0h3v3h-3v-3Zm0-5h3v3h-3v-3Zm0-5h3v3h-3v-3ZM21 19h32v24h-8v-3H29v13h13v4H21V19Zm8 4v13h16V23H29Zm-4 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 28a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm24-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0-7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
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

	const { variant, bgColor, itemsLength, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.webserie-list-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.webserie-list-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;
	const createTemplate = (lengthCounter) => {
		const template = [
			[
				'il/webserie-card',
				{
					id: `card-id-${lengthCounter}`,
				},
			],
		];

		return template;
	};

	// Function that adds a new item
	const handleAdd = () => {
		const newLength = itemsLength + 1;
		setAttributes({ itemsLength: newLength });

		const cardTemplate = createTemplate(newLength);
		const newCardBlock = createBlocksFromInnerBlocksTemplate(cardTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);
		const mergedBlocks = [...existingInnerBlocks, ...newCardBlock];

		replaceInnerBlocks(clientId, mergedBlocks);
	};

	// Function that removes the last item
	const handleRemove = () => {
		if (itemsLength > 1) {
			let existingInnerBlocks = getCurrentInnerBlocks(clientId);
			const idToRemove = existingInnerBlocks[itemsLength - 1].clientId;
			existingInnerBlocks = existingInnerBlocks.filter((item) => item.clientId !== idToRemove);

			const newLength = itemsLength - 1;
			setAttributes({ itemsLength: newLength });

			replaceInnerBlocks(clientId, existingInnerBlocks);
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

			<div className={`webserie-list ${variant} wp-editor webserie-list-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/webserie-card',
							{
								id: `card-id-${itemsLength}`,
							},
						],
					]}
					renderAppender={() => <CustomAppenderButton />}
				/>
			</div>
		</>
	);
}
