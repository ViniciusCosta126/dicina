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
		<svg width="64" height="64" viewBox="0 0 24 24">
			<path
				fill="#212121"
				fill-rule="nonzero"
				d="m14.762 13.127.138.137 5.6 5.876v-5.391a.75.75 0 0 1 1.493-.102l.007.102v5.502a2.75 2.75 0 0 1-2.582 2.745l-.168.005h-5.5a.75.75 0 0 1-.102-1.493l.102-.007h5.284l-5.582-5.857a2 2 0 0 0-2.772-.12l-.124.12-5.578 5.857h5.272l.102.007a.75.75 0 0 1 0 1.486l-.102.007h-5.5l-.168-.005a2.75 2.75 0 0 1-2.577-2.57L2 19.25V13.75l.007-.102a.75.75 0 0 1 1.486 0l.007.102v5.404l5.607-5.888a4 4 0 0 1 5.655-.138ZM10.25 1.999a.75.75 0 0 1 .102 1.493l-.102.007h-5.5A1.25 1.25 0 0 0 3.506 4.62l-.006.128v5.502a.75.75 0 0 1-1.493.102L2 10.25V4.75a2.75 2.75 0 0 1 2.582-2.745l.168-.005h5.5Zm9 0 .168.005a2.75 2.75 0 0 1 2.577 2.57L22 4.75v5.502l-.007.102a.75.75 0 0 1-1.486 0l-.007-.102V4.75l-.006-.128a1.25 1.25 0 0 0-1.116-1.116L19.25 3.5h-5.5l-.102-.007a.75.75 0 0 1 0-1.486l.102-.007h5.5Zm-3.247 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
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

	const { variant, bgColor, itemsLength, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.wallpapers-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.wallpapers-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = (itemsLength) => {
		const template = [
			[
				'il/wallpaper-card',
				{
					modalId: `wallpaper-modal-${itemsLength}`,
				},
			],
		];

		return template;
	};

	// Function that adds a new item to the tabs
	const handleAdd = () => {
		const newItemsLength = itemsLength + 1;
		setAttributes({ itemsLength: newItemsLength });

		const itemTemplate = createTemplate(newItemsLength);
		const newItemBLock = createBlocksFromInnerBlocksTemplate(itemTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 1) {
				const newInnerBlock = [...block.innerBlocks, ...newItemBLock];
				block.innerBlocks = newInnerBlock;
			}

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove a item from the tabs
	const handleRemove = () => {
		if (itemsLength > 0) {
			const existingInnerBlocks = getCurrentInnerBlocks(clientId);

			const idToRemove = existingInnerBlocks[1].innerBlocks[itemsLength].attributes.modalId;

			const newInnerBlocks = existingInnerBlocks.map((block, index) => {
				if (index === 1) {
					const newInnerBlock = block.innerBlocks;
					block.innerBlocks = newInnerBlock.filter((item) => item.attributes.modalId !== idToRemove);
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

			<div className={`wallpapers ${variant} wp-editor wallpapers-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/container',
							{ containerSize: 'container-block default' },
							[
								[
									'il/wrapper',
									{ extraClass: 'wallpapers__texts', isLocked: false },
									[
										[
											'il/post-listing-header',
											{
												variant: 'section-title',
												auxTitle: 'Nosso',
												title: 'Wallpapers',
												middleSize: true,
												bgColor: 'transparent',
												marginM: 0,
												marginD: -10,
											},
										],
										[
											'il/typography',
											{
												content:
													'Tenha sempre em mão as fotos emblemáticas do nosso herói brasileiro, Ayrton Senna. E baixe agora mesmo dentro do seu dispositivo e compartilhe com seus amigos!',
												color: '#fff',
												manualSizes: true,
												manualSizeM: 16,
												manualSizeD: 24,
												textWeight: 'weight-light',
												extraClass: 'text',
											},
										],
									],
								],
							],
						],
						[
							'il/carousel',
							{
								variant: 'carousel-wallpapers',
								extraClass: 'simulate-container',
								bgColor: 'transparent',
								appender: false,
								navigation: true,
								navigationDesktop: true,
								gutter: 16,
								gutterDesktop: 32,
								autoWidth: true,
								perView: 1,
								perView480: 1,
								perView960: 2,
								perView1366: 4,
							},
							[
								['il/wrapper', { extraClass: 'carousel-empty-item' }],
								['il/wallpaper-card', { modalId: `wallpaper-modal-${itemsLength}` }],
							],
						],
					]}
					renderAppender={() => <CustomAppenderButton />}
				/>
			</div>
		</>
	);
}
