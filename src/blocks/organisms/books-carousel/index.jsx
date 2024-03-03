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
			<path d="M30.639 26.361 24.428 3.178A3.257 3.257 0 0 0 20.425.886l.023-.005-2.896.776c-.23.065-.429.145-.618.243l.018-.008A3.225 3.225 0 0 0 14.499.749H11.5c-.76.003-1.457.27-2.006.713l.006-.005A3.198 3.198 0 0 0 7.501.749H4.5a3.254 3.254 0 0 0-3.25 3.25v24a3.254 3.254 0 0 0 3.25 3.25h3a3.203 3.203 0 0 0 2.006-.712l-.006.005c.543.438 1.24.704 1.999.708h2.999a3.254 3.254 0 0 0 3.25-3.25V14.947l3.717 13.873a3.252 3.252 0 0 0 4.002 2.291l-.023.005 2.898-.775a3.26 3.26 0 0 0 2.292-4.003l.005.023zm-11.613-16.3 4.346-1.165 3.494 13.042-4.345 1.164zm-.827-5.989 2.895-.775a.762.762 0 0 1 .919.524l.001.005.712 2.656-4.346 1.165-.632-2.357v-.848a.748.748 0 0 1 .446-.37l.005-.001zM11.5 3.25h2.998a.76.76 0 0 1 .75.749v2.75l-4.498.001V4a.76.76 0 0 1 .749-.75h.001zm-3.25 19.5h-4.5V9.25l4.5-.001zm2.5-13.5 4.498-.001V22.75H10.75zm-6.25-6h3a.76.76 0 0 1 .75.749v2.75l-4.5.001V4a.76.76 0 0 1 .749-.75H4.5zm3 25.5h-3a.76.76 0 0 1-.75-.749V25.25h4.5V28a.76.76 0 0 1-.749.75H7.5zm6.998 0H11.5a.76.76 0 0 1-.75-.749V25.25h4.498V28a.76.76 0 0 1-.749.75h-.001zm13.195-.822-2.896.775a.752.752 0 0 1-.57-.078l.004.002a.748.748 0 0 1-.35-.45l-.001-.005-.711-2.655 4.345-1.164.712 2.657a.76.76 0 0 1-.526.916l-.005.001z" />
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

	// Creates the templates to new block
	const createTemplate = () => {
		const template = [
			[
				'il/book-for-carousel',
				{
					variant: 'default',
				},
			],
		];

		return template;
	};

	// Function that adds a new item
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const bookTemplate = createTemplate(newItemsLength);
		const newItemBlock = createBlocksFromInnerBlocksTemplate(bookTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 1) {
				const newInnerBlock = [...block.innerBlocks, ...newItemBlock];
				block.innerBlocks = newInnerBlock;
			}

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	const handleRemove = () => {
		if (itemsLength > 1) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);

			const idToRemove = existingInnerBlocks[1].innerBlocks[itemsLength - 1].clientId;

			const newInnerBlocks = existingInnerBlocks.map((block, index) => {
				if (index === 1) {
					const newInnerBlock = block.innerBlocks;
					block.innerBlocks = newInnerBlock.filter((item) => item.clientId !== idToRemove);
				}

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

	const inlineStyles = `
		.books-carousel-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.books-carousel-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`books-carousel ${variant} wp-editor books-carousel-${randomComponentId}`}>
				<div className="container">
					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									tag: 'h2',
									content: 'Idioma',
									manualSizes: true,
									manualSizeD: 32,
									manualSizeM: 20,
									marginM: 32,
									marginD: 40,
									textWeight: 'weight-medium',
									textTransform: 'uppercase',
									color: '#002753',
									bgColor: 'transparent',
								},
							],
							[
								'il/carousel',
								{
									id: 'books-carousel',
									variant: 'books-carousel',
									allowed_blocks: ['il/book-for-carousel'],
									bgColor: 'transparent',
									navigation: false,
									navigationDesktop: true,
									dots: false,
									autoplay: false,
									autoHeight: true,
									getHigher: true,
									forceHeightTransition: true,
									loop: false,
									gutter: 24,
									gutterDesktop: 40,
									perView: 1,
									perView480: 2,
									perView768: 3,
									perView960: 4,
									perView1366: 5,
									controlsText: true,
								},
								[['il/book-for-carousel', { variant: 'default' }]],
							],
						]}
						renderAppender={() => <CustomAppenderButton />}
					/>
				</div>
			</div>
		</>
	);
}
