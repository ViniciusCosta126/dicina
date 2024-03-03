import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: (
		<svg width="800" height="800" transform="scale(-1 1)" viewBox="0 0 32 32">
			<g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2">
				<path d="M22 3h7m-7 6h7m-7 6h7M3 21h26M3 27h26M3 3h13v12H3z" />
				<path d="m3 13 5-4 4 3 4-3" />
				<circle cx="12" cy="7" r="1" />
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

	const {
		variant,
		smallTitle,
		hasImage,
		bgColor,
		bgColorDegrade,
		bgColorDegradeDesk,
		bgImageMobile,
		bgImageDesk,
		isHero,
		modalID,
		vPosition,
		hPosition,
		marginM,
		marginD,
	} = attributes;

	const inlineStyles = `
		.text-with-image-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.text-with-image-${randomComponentId} .text-with-image-background::after {
			background: ${bgColorDegrade};
        }
		
		@media (min-width: 768px) {
			.text-with-image-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}

			.text-with-image-${randomComponentId} .text-with-image-background::after {
				background: ${bgColorDegradeDesk};
			}
		}
	`;

	const Text = () => {
		if (variant === 'titles-texts') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Label...',
								tag: 'strong',
								manualSizes: true,
								manualSizeM: 16,
								manualSizeD: 32,
								color: '#ffffff',
								bgColor: 'transparent',
								textWeight: 'weight-medium',
								marginM: 4,
								marginD: 16,
								extraClass: 'label',
							},
						],
						[
							'il/typography',
							{
								content: '0000',
								tag: 'h2',
								fontFamily: 'helveticaneue',
								disableSizes: true,
								widthStrokeM: 3,
								widthStrokeD: 6,
								color: 'linear-gradient(0deg, #00A851 0%, #1832D7 100%)',
								bgColor: '#002753',
								marginM: 24,
								marginD: 50,
								extraClass: `big-title ${smallTitle ? 'small' : 'big'}`,
							},
						],
						[
							'il/typography',
							{
								content:
									'Quis sit quis excepteur voluptate occaecat. Amet officia mollit pariatur occaecat id excepteur ipsum cillum amet esse occaecat ut officia. Occaecat eu Lorem ad laboris amet aute sunt. Ea officia irure laborum anim duis ullamco eiusmod nostrud veniam non nulla anim tempor. Ad sunt consectetur eiusmod nostrud aliqua Lorem aute labore excepteur et ea eiusmod fugiat.',
								tag: 'p',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 26,
								bgColor: 'transparent',
								color: '#ffffff',
								extraClass: 'text',
							},
						],
					]}
				/>
			);
		} else if (variant === 'titles-texts-button') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Label...',
								tag: 'strong',
								manualSizes: true,
								manualSizeM: 16,
								manualSizeD: 32,
								color: '#ffffff',
								bgColor: 'transparent',
								textWeight: 'weight-medium',
								marginM: 4,
								marginD: 16,
								extraClass: 'label',
							},
						],
						[
							'il/typography',
							{
								content: '0000',
								tag: 'h2',
								fontFamily: 'helveticaneue',
								disableSizes: true,
								widthStrokeM: 3,
								widthStrokeD: 6,
								color: 'linear-gradient(0deg, #00A851 0%, #1832D7 100%)',
								bgColor: '#002753',
								marginM: 24,
								marginD: 50,
								extraClass: `big-title ${smallTitle ? 'small' : 'big'}`,
							},
						],
						[
							'il/typography',
							{
								content:
									'Quis sit quis excepteur voluptate occaecat. Amet officia mollit pariatur occaecat id excepteur ipsum cillum amet esse occaecat ut officia. Occaecat eu Lorem ad laboris amet aute sunt. Ea officia irure laborum anim duis ullamco eiusmod nostrud veniam non nulla anim tempor. Ad sunt consectetur eiusmod nostrud aliqua Lorem aute labore excepteur et ea eiusmod fugiat.',
								tag: 'p',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 26,
								bgColor: 'transparent',
								color: '#ffffff',
								extraClass: 'text',
								marginM: 28,
								marginD: 44,
							},
						],
						[
							'il/button',
							{
								variant: 'link',
								content: 'Saiba mais',
							},
						],
					]}
				/>
			);
		} else if (variant === 'simple-title-text') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Title...',
								tag: 'h2',
								fontFamily: 'helveticaneue',
								manualSizes: true,
								manualSizeM: 24,
								manualSizeD: 32,
								color: '#ffffff',
								bgColor: 'transparent',
								marginM: 40,
								marginD: 40,
								extraClass: 'title',
							},
						],
						[
							'il/typography',
							{
								content:
									'Quis sit quis excepteur voluptate occaecat. Amet officia mollit pariatur occaecat id excepteur ipsum cillum amet esse occaecat ut officia. Occaecat eu Lorem ad laboris amet aute sunt. Ea officia irure laborum anim duis ullamco eiusmod nostrud veniam non nulla anim tempor. Ad sunt consectetur eiusmod nostrud aliqua Lorem aute labore excepteur et ea eiusmod fugiat.',
								tag: 'p',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 26,
								bgColor: 'transparent',
								color: '#ffffff',
								extraClass: 'text',
							},
						],
					]}
				/>
			);
		} else if (variant === 'only-text') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content:
									'Quis sit quis excepteur voluptate occaecat. Amet officia mollit pariatur occaecat id excepteur ipsum cillum amet esse occaecat ut officia. Occaecat eu Lorem ad laboris amet aute sunt. Ea officia irure laborum anim duis ullamco eiusmod nostrud veniam non nulla anim tempor. Ad sunt consectetur eiusmod nostrud aliqua Lorem aute labore excepteur et ea eiusmod fugiat.',
								tag: 'p',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 26,
								bgColor: 'transparent',
								color: '#ffffff',
								extraClass: 'text',
							},
						],
					]}
				/>
			);
		} else if (variant === 'only-testimony') {
			return (
				<InnerBlocks
					template={[
						[
							'il/testimony',
							{
								textSizeM: 20,
								textSizeD: 40,
								textColor: '#FFFFFF',
								svgColor: '#EFD936',
							},
						],
					]}
				/>
			);
		} else if (variant === 'text-testimony') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content:
									'Quis sit quis excepteur voluptate occaecat. Amet officia mollit pariatur occaecat id excepteur ipsum cillum amet esse occaecat ut officia. Occaecat eu Lorem ad laboris amet aute sunt. Ea officia irure laborum anim duis ullamco eiusmod nostrud veniam non nulla anim tempor. Ad sunt consectetur eiusmod nostrud aliqua Lorem aute labore excepteur et ea eiusmod fugiat.',
								tag: 'p',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 26,
								bgColor: 'transparent',
								color: '#ffffff',
								extraClass: 'text',
								marginM: 24,
								marginD: 40,
							},
						],
						[
							'il/testimony',
							{
								textSizeM: 20,
								textSizeD: 40,
								textColor: '#FFFFFF',
								svgColor: '#EFD936',
							},
						],
					]}
				/>
			);
		} else if (variant === 'testimony-text') {
			return (
				<InnerBlocks
					template={[
						[
							'il/testimony',
							{
								textSizeM: 20,
								textSizeD: 40,
								textColor: '#FFFFFF',
								svgColor: '#EFD936',
								marginM: 24,
								marginD: 40,
							},
						],
						[
							'il/typography',
							{
								content:
									'Quis sit quis excepteur voluptate occaecat. Amet officia mollit pariatur occaecat id excepteur ipsum cillum amet esse occaecat ut officia. Occaecat eu Lorem ad laboris amet aute sunt. Ea officia irure laborum anim duis ullamco eiusmod nostrud veniam non nulla anim tempor. Ad sunt consectetur eiusmod nostrud aliqua Lorem aute labore excepteur et ea eiusmod fugiat.',
								tag: 'p',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 26,

								bgColor: 'transparent',
								color: '#ffffff',
								extraClass: 'text',
							},
						],
					]}
				/>
			);
		} else if (variant === 'text-video') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content:
									'Quis sit quis excepteur voluptate occaecat. Amet officia mollit pariatur occaecat id excepteur ipsum cillum amet esse occaecat ut officia. Occaecat eu Lorem ad laboris amet aute sunt. Ea officia irure laborum anim duis ullamco eiusmod nostrud veniam non nulla anim tempor. Ad sunt consectetur eiusmod nostrud aliqua Lorem aute labore excepteur et ea eiusmod fugiat.',
								tag: 'p',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 26,
								bgColor: 'transparent',
								color: '#ffffff',
								extraClass: 'text',
								marginM: 28,
								marginD: 60,
							},
						],
						[
							'il/button',
							{
								content: 'VER VÍDEO NA ÍNTEGRA',
								modalID: modalID,
								action: 'open-modal',
							},
						],
					]}
				/>
			);
		} else if (variant === 'title-text-testimony') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Label...',
								tag: 'strong',
								manualSizes: true,
								manualSizeM: 16,
								manualSizeD: 32,
								color: '#ffffff',
								bgColor: 'transparent',
								textWeight: 'weight-medium',
								marginM: 4,
								marginD: 16,
								extraClass: 'label',
							},
						],
						[
							'il/typography',
							{
								content: '0000',
								tag: 'h2',
								fontFamily: 'helveticaneue',
								disableSizes: true,
								widthStrokeM: 3,
								widthStrokeD: 6,
								color: 'linear-gradient(0deg, #00A851 0%, #1832D7 100%)',
								marginM: 24,
								marginD: 50,
							},
						],
						[
							'il/testimony',
							{
								textSizeM: 20,
								textSizeD: 26,
								textColor: '#FFFFFF',
								svgColor: '#EFD936',
							},
						],
						[
							'il/button',
							{
								hasLink: true,
								link: {
									url: '',
									target: '',
								},
								variant: 'link',
							},
						],
					]}
				/>
			);
		}
	};

	const heroClass = isHero ? 'is-hero' : 'teste';
	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div
				className={`text-with-image ${variant} ${hPosition} ${vPosition} wp-editor text-with-image-${randomComponentId}`}
			>
				{hasImage && (
					<picture className={`text-with-image-background`}>
						<source srcset={bgImageDesk.src} media="(min-width: 768px)" />
						<img src={bgImageMobile.src} alt={bgImageMobile.alt} />
					</picture>
				)}

				<div className="container">
					<div className={`text-with-image-content ${heroClass}`}>
						<Text />
					</div>
				</div>
			</div>
		</>
	);
}
