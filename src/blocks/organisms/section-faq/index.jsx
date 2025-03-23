
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { getCurrentInnerBlocks } from '../../../hooks/common';

import metadata from './block.json';
import Controls from "./controls.jsx";

import './style.scss';


registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'admin-site',
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

	const { variant, bgColor, marginM, marginD, itemsLength } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.section-faq-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.section-faq-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const createTemplate = () => {
		const template = [
			[
				'il/faq-item', {}
			]
		];

		return template;
	};

	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;

		setAttributes({ itemsLength: newItemsLength });

		const bookTemplate = createTemplate();
		const newItemBlock = createBlocksFromInnerBlocksTemplate(bookTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			const newInnerBlock = [...block.innerBlocks[1].innerBlocks, ...newItemBlock];
			block.innerBlocks[1].innerBlocks = newInnerBlock;
			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	const handleRemove = () => {

		if (itemsLength > 1) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);
			console.log(existingInnerBlocks)

			const idToRemove = existingInnerBlocks[0].innerBlocks[1].innerBlocks[itemsLength - 1].clientId;

			const newInnerBlocks = existingInnerBlocks.map((block, index) => {
				const newInnerBlock = block.innerBlocks[1].innerBlocks;
				block.innerBlocks[1].innerBlocks = newInnerBlock.filter((item) => item.clientId !== idToRemove);
				return block;
			});
			const newItemsLength = itemsLength - 1;

			setAttributes({ itemsLength: newItemsLength });
			replaceInnerBlocks(clientId, newInnerBlocks);
		}
	};

	const CustomAppenderButton = () => {
		return (
			<div className="custom-appender" id='custom-appender-teste'>

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

			<div className={`section-faq ${variant} wp-editor section-faq-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/container', {},
							[
								[
									'il/typography',
									{
										tag: 'h2',
										sizeM: 'body-1-m',
										sizeD: 'body-1-d',
										color: '#000',
										bgColor: 'transparent',
										content: 'Perguntas e respostas frequentes',
										textAlign: 'align-center',
										textWeight: 'weight-bold'
									},
								],
								[
									'il/wrapper', { isLocked: false },
									[
										[
											'il/faq-item', {}
										],
										[
											'il/faq-item', {}
										]
									]
								],

							]
						],
					]}
					renderAppender={() => <CustomAppenderButton />}
				/>
			</div>
		</>
	);
}