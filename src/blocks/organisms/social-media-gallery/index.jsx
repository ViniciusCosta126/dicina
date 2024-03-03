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
		<svg fill="none" viewBox="0 0 24 24">
			<g stroke-width="1.5">
				<path d="M12.5 5c1.886 0 2.828 0 3.414.586.586.586.586 1.528.586 3.414v6c0 1.886 0 2.828-.586 3.414C15.328 19 14.386 19 12.5 19h-1c-1.886 0-2.828 0-3.414-.586C7.5 17.828 7.5 16.886 7.5 15V9c0-1.886 0-2.828.586-3.414C8.672 5 9.614 5 11.5 5h1Z" />
				<path
					stroke-linecap="round"
					d="M22 19h-.5a2.5 2.5 0 0 1-2.5-2.5v-9A2.5 2.5 0 0 1 21.5 5h.5M2 19h.5A2.5 2.5 0 0 0 5 16.5v-9A2.5 2.5 0 0 0 2.5 5H2"
					opacity=".5"
				/>
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

	const { variant, bgColor, itemsLength, gradientColor, gradientTitleColor, marginM, marginD } = attributes;
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');

	const inlineStyles = `
		.social-media-gallery-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.social-media-gallery-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	// Creates the templates to new block
	const createTemplate = (itemsLength, type) => {
		let template;

		if (type === 'thumb') {
			let hasEmbedExpanded = false;
			hasEmbedExpanded = true;

			if (variant === 'instagram') {
				hasEmbedExpanded = true;
			}

			template = [
				[
					'il/social-media-item',
					{
						variant: 'default',
						date: '2023-01-26T18:30:59',
						id: `media-item-${itemsLength}`,
						indexId: itemsLength,
						hasExpanded: true,
						hasEmbedExpanded: true,
						hasGoTo: true,
						hasContent: false,
						bgColor: gradientColor,
					},
				],
			];
		} else if (type === 'expanded') {
			let tiktokContent,
				hasEmbed = false;

			if (variant === 'tiktok') {
				tiktokContent = true;
			}

			if (variant === 'instagram') {
				hasEmbed = true;
			}

			template = [
				[
					'il/social-media-item',
					{
						variant: 'default',
						id: `media-item-${itemsLength}`,
						indexId: itemsLength,
						hasControls: false,
						isExpanded: true,
						hasEmbed: hasEmbed,
						hasGoTo: true,
						hasContent: tiktokContent,
						bgColor: gradientColor,
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

		const thumbTemplate = createTemplate(newItemsLength - 1, 'thumb');
		const expandedTemplate = createTemplate(newItemsLength - 1, 'expanded');
		const newThumbBlock = createBlocksFromInnerBlocksTemplate(thumbTemplate);
		const newExpandedBlock = createBlocksFromInnerBlocksTemplate(expandedTemplate);
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 3) {
				const newInnerBlock = [...block.innerBlocks, ...newThumbBlock];
				block.innerBlocks = newInnerBlock;
			} else if (index === 4) {
				const ind = block.innerBlocks.findIndex(function (inBlock) {
					return inBlock.name == 'il/carousel';
				});
				const newInnerBlock = [...block.innerBlocks[ind].innerBlocks, ...newExpandedBlock];
				block.innerBlocks[ind].innerBlocks = newInnerBlock;
			}

			return block;
		});

		replaceInnerBlocks(clientId, newInnerBlocks);
	};

	// Function that remove a item from the tabs
	const handleRemove = () => {
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const idToRemove = existingInnerBlocks[3].innerBlocks[itemsLength - 1].attributes.id;

		const newInnerBlocks = existingInnerBlocks.map((block, index) => {
			if (index === 3) {
				const newInnerBlock = block.innerBlocks;
				block.innerBlocks = newInnerBlock.filter((item) => item.attributes.id !== idToRemove);
			} else if (index === 4) {
				const ind = block.innerBlocks.findIndex(function (inBlock) {
					return inBlock.name == 'il/carousel';
				});
				const newInnerBlock = block.innerBlocks[ind].innerBlocks;
				block.innerBlocks[ind].innerBlocks = newInnerBlock.filter((item) => item.attributes.id !== idToRemove);
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
					Remover último
					<svg fill="none" viewBox="0 0 24 24">
						<path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12" />
					</svg>
				</button>

				<button className="button-appender" type="button" onClick={() => handleAdd()}>
					Adicionar Item
					<svg fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24">
						<path stroke="none" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
					</svg>
				</button>
			</div>
		);
	};

	const BlockContent = () => {
		let soundButtons = [];
		let tiktokContent,
			hasEmbed,
			hasEmbedExpanded = false;
		let navigationExpanded = {
			navigation: true,
			navigationDesktop: true,
		};

		if (variant === 'tiktok') {
			soundButtons = [
				[
					'il/button',
					{
						variant: 'link-icon',
						hasIcon: true,
						extraClass: 'unmute-button',
						title: 'Desmutar Vídeo',
						bgColor: 'transparent',
						icon: {
							src: '/wp-content/themes/Template-blocks/images/icon-muted.svg',
							alt: 'Icone mute',
							height: '24',
							width: '24',
						},
					},
				],
				[
					'il/button',
					{
						variant: 'link-icon',
						hasIcon: true,
						extraClass: 'mute-button hide',
						title: 'Mutar Vídeo',
						bgColor: 'transparent',
						icon: {
							src: '/wp-content/themes/Template-blocks/images/icon-unmuted.svg',
							alt: 'Icone unmute',
							height: '24',
							width: '24',
						},
					},
				],
			];

			tiktokContent = true;
		}

		if (variant === 'instagram') {
			hasEmbed = true;
			hasEmbedExpanded = true;
			navigationExpanded = {
				navigation: false,
				navigationDesktop: false,
			};
		}

		return (
			<InnerBlocks
				template={[
					[
						'il/post-listing-header',
						{
							variant: 'section-title',
							auxTitle: 'Descubra qual sua',
							title: 'Verdade',
							titleColor: gradientTitleColor,
							middleSize: true,
							bgColor: 'transparent',
							marginM: 32,
							marginD: 24,
						},
					],
					[
						'il/typography',
						{
							content:
								'Compartilhe com o mundo sua jornada em busca da sua verdade! Sua história pode inspirar outras pessoas a fazerem o mesmo. <br /><br />Faça parte do movimento compartilhando sua melhor versão nas redes sociais usando <strong>#BusqueSuaVerdade</strong>. Seu post pode ser selecionado e nossa equipe entrará em contato via inbox!',
							tag: 'p',
							manualSizes: true,
							manualSizeM: 18,
							manualSizeD: 26,
							color: '#ffffff',
							bgColor: 'transparent',
							marginM: 32,
							marginD: 48,
							extraClass: 'text',
						},
					],
					['il/tab-buttons', { id: 'filter-tiktoks-by-date', gradient: gradientColor }],
					[
						'il/carousel',
						{
							variant: 'just-image-carousel',
							extraClass: 'small',
							allowed_blocks: ['il/social-media-item'],
							speed: 400,
							loop: true,
							autoWidth: true,
							id: 'filter-tiktoks-by-date',
							sort: true,
							selfGoTo: true,
							otherGoTo: true,
							otherGoToId: `${variant}-${randomComponentId}`,
							appender: false,
						},
						[
							[
								'il/social-media-item',
								{
									variant: 'default',
									date: '2023-01-26T18:30:59',
									id: `media-item-${itemsLength}`,
									indexId: itemsLength - 1,
									hasExpanded: true,
									hasEmbedExpanded: hasEmbedExpanded,
									hasGoTo: true,
									hasContent: false,
									bgColor: gradientColor,
								},
							],
						],
					],
					[
						'il/wrapper',
						{ extraClass: `slider-in-phone ${variant}` },
						[
							[
								'il/button',
								{
									variant: 'css-icon',
									hasIcon: true,
									extraClass: 'close-button',
									title: 'Fechar modal',
									bgColor: 'transparent',
									icon: {
										src: '',
									},
								},
							],
							...soundButtons,
							[
								'il/carousel',
								{
									id: `${variant}-${randomComponentId}`,
									variant: 'just-image-carousel',
									allowed_blocks: ['il/social-media-item'],
									mouseDrag: true,
									swipeAngle: false,
									loop: true,
									...navigationExpanded,
									perView: 1,
									perView480: 1,
									perView768: 1,
									perView960: 1,
									perView1366: 1,
									appender: false,
								},
								[
									[
										'il/social-media-item',
										{
											variant: 'default',
											id: `media-item-${itemsLength}`,
											indexId: itemsLength - 1,
											hasControls: false,
											hasEmbed: hasEmbed,
											isExpanded: true,
											hasGoTo: true,
											hasContent: tiktokContent,
											bgColor: gradientColor,
										},
									],
								],
							],
						],
					],
				]}
				renderAppender={() => <CustomAppenderButton />}
			/>
		);
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`social-media-gallery ${variant} wp-editor social-media-gallery-${randomComponentId}`}>
				<div className="container default">
					<div className="social-media-gallery-content">
						<BlockContent />
					</div>
				</div>
			</div>
		</>
	);
}
