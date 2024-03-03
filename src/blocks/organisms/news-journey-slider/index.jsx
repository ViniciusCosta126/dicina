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
	icon: (
		<svg viewBox="0 0 42 32">
			<path d="M37 29c1.196 0 2-.804 2-2V.5a.5.5 0 0 0-1 0V27c0 .87-.627 1-1 1-.103 0-1-.028-1-1V.5a.5.5 0 0 0-1 0V27c0 1.313 1.006 2 2 2zM4.5 21h10a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5zm.5-9h9v8H5v-8zM4.5 8h24a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-24a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5zM5 4h23v3H5V4zM28.5 11h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zM28.5 14h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zM28.5 17h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zM28.5 20h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zM28.5 23h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zM4.5 24h10a.5.5 0 0 0 0-1h-10a.5.5 0 0 0 0 1zM28.5 26h-10a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1zM4.5 27h10a.5.5 0 0 0 0-1h-10a.5.5 0 0 0 0 1z" />
			<path d="M5 31.947h32.02c.007 0 .013-.004.02-.004A4.951 4.951 0 0 0 41.948 27V.5a.447.447 0 1 0-.894 0V27c0 2.235-1.818 4.053-4.053 4.053S32.947 29.235 32.947 27V.5c0-.247-.2-.447-.447-.447H.5C.253.053.053.253.053.5V27A4.952 4.952 0 0 0 5 31.947zM.947.947h31.105V27c0 .306.037.603.09.895.011.058.02.116.033.173.062.278.144.547.251.806.019.047.042.091.063.137.108.242.233.475.378.695.017.025.03.052.047.077.158.23.338.443.531.643.042.043.083.085.127.127.186.18.382.351.594.5H5A4.058 4.058 0 0 1 .947 27V.947z" />
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

	const { variant, bgColor, itemsLength, marginM, marginD, upperTitle, title } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.news-journey-slider-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.news-journey-slider-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = (itemsLength) => {
		const template = [
			[
				'il/news-card-legacy',
				{
					id: `news-card-${itemsLength}-${randomComponentId}`,
					indexId: itemsLength,
				},
			],
		];

		return template;
	};

	// Function that adds a new item
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const cardTemplate = createTemplate(newItemsLength);
		const newItemBlock = createBlocksFromInnerBlocksTemplate(cardTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block) => {
			const newInnerBlock = [...block.innerBlocks, ...newItemBlock];
			block.innerBlocks = newInnerBlock;
			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove an new item
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
						className={`button-remove`}
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

			<div className={`news-journey-slider wp-editor ${variant} news-journey-slider-${randomComponentId}`}>
				<div className="container large-on-desk">
					<h2 class="news__content__title__container">
						<RichText
							value={upperTitle}
							tagName="span"
							className="news__content__upper__title"
							allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
							onChange={(upperTitle) => setAttributes({ upperTitle: upperTitle })}
							placeholder="grandes"
						/>

						<RichText
							value={title}
							placeholder="premiações"
							tagName="span"
							className="news__content__title"
							allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
							onChange={(title) => setAttributes({ title: title })}
						/>
					</h2>
				</div>

				<InnerBlocks
					template={[
						[
							'il/carousel',
							{
								variant: 'group-brands',
								allowed_blocks: ['il/news-card-legacy'],
								bgColor: '#002753',
								dots: true,
								speed: 400,
								loop: true,
								perView: 1,
								perView480: 1,
								perView768: 1,
								perView960: 1,
								perView1024: 1,
								perView1366: 1,
								extraClass: 'container large-on-desk',
							},
							[
								[
									'il/news-card-legacy',
									{
										id: `news-card-${itemsLength}-${randomComponentId}`,
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
