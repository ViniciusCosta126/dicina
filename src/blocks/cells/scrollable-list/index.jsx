import { registerBlockType, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';
import { getCurrentInnerBlocks } from '../../../hooks/common';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg viewBox="0 0 32 32">
				<path
					d="M24 19V7a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h4v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-5h-4zM8 10H6V7a1 1 0 0 1 2 0v3zm2 14V7c0-.35-.06-.687-.171-1H21c.551 0 1 .449 1 1v12H12v5a1 1 0 0 1-2 0zm16 0c0 .551-.449 1-1 1H13.829c.111-.313.171-.65.171-1v-3h12v3zm-6-12h-8v-2h8v2zm0 4h-8v-2h8v2z"
					fill="#000"
				/>
			</svg>
		),
	},
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

	const { variant, bgColor, initialLoad, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.scrollable-list-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.scrollable-list-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates according to the selected variant
	const createTemplate = () => {
		let template;

		if (variant === 'links') {
			template = [
				[
					'il/button',
					{
						content: 'Insira o link',
						variant: 'link-double-arrow',
					},
				],
			];
		} else if (variant === 'details') {
			template = [['il/details']];
		}

		return template;
	};

	const handleAdd = () => {
		const buttonTemplate = createTemplate();
		const newButtonBlock = createBlocksFromInnerBlocksTemplate(buttonTemplate);
		//const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = [...existingInnerBlocks, ...newButtonBlock];
		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	const CustomAppenderButton = () => {
		return (
			<button className="button-appender" type="button" onClick={() => handleAdd()}>
				Adicionar item
				<svg fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24">
					<path stroke="none" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
				</svg>
			</button>
		);
	};

	const BlockContent = () => {
		if (variant === 'links') {
			return (
				<InnerBlocks
					template={[
						[
							'il/button',
							{
								content: 'Insira o link',
								variant: 'link-double-arrow',
							},
						],
						[
							'il/button',
							{
								content: 'Insira o link',
								variant: 'link-double-arrow',
							},
						],
					]}
					templateLock={false}
					renderAppender={() => <CustomAppenderButton />}
				/>
			);
		} else if (variant === 'details') {
			return (
				<InnerBlocks
					template={[
						[
							'il/button',
							{
								content: 'Insira os dealhes',
								variant: 'primary',
							},
						],
					]}
					templateLock={false}
					renderAppender={() => <CustomAppenderButton />}
				/>
			);
		}
	};

	if (initialLoad) {
		setAttributes({ initialLoad: false });
		handleAdd();
	}

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`scrollable-list ${variant} wp-editor scrollable-list-${randomComponentId}`}>
				<div className="scrollable-list-content">
					<BlockContent />
				</div>
			</div>
		</>
	);
}
