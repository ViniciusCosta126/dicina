import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'text-page',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, image, imageDesk, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.what-motivates-you-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.what-motivates-you-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const imageDeskop = imageDesk ? imageDesk : image;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div
				className={`what-motivates-you ${variant} what-motivates-you-${randomComponentId}`}
			>
				{image.src && (
					<picture className="what-motivates-you--image">
						<source
							srcset={imageDeskop.src}
							width={imageDeskop.width}
							height={imageDeskop.height}
							media="(min-width: 768px)"
						/>
						<img src={image.src} alt={image.alt} />
					</picture>
				)}

				<div className="container">
					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									content:
										'<strong>O QUE TE <senna class="sennasans stroke strip">MOTIVA</senna> A SER <br>SUA MELHOR VERSÃO?</strong>',
									tag: 'h2',
									sizeM: 'title-1-m',
									sizeD: 'title-2-responsive-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									texAlign: 'align-left',
									marginM: 40,
									marginD: 70,
								},
							],
							[
								'il/typography',
								{
									content:
										'Ayrton Senna nos ensinou a trilhar as metas de nossa vida com muita determinação e amor. A eterna busca do piloto por sua melhor versão motiva ainda hoje milhares de pessoas a lutarem para conquistar <strong>seu lugar no mundo.</strong>',
									tag: 'p',
									sizeM: 'body-5-m',
									sizeD: 'body-4-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									texAlign: 'align-left',
									hasMaxWidth: true,
									position: 'position-left',
									maxWidthM: 768,
									maxWidthD: 746,
									marginM: 20,
									marginD: 40,
								},
							],
							[
								'il/typography',
								{
									content:
										'<strong>Você tem um sonho que precisa de uma força para te mover adiante?</strong>',
									tag: 'p',
									sizeM: 'body-6-m',
									sizeD: 'body-9-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									texAlign: 'align-center-left',
									hasMaxWidth: true,
									position: 'position-left',
									maxWidthM: 768,
									maxWidthD: 746,
									marginM: 24,
									marginD: 40,
								},
							],
							[
								'il/typography',
								{
									content:
										'Se inspire com relatos cheios de <strong>coragem, ousadia e determinação</strong> de pessoas que lutam por seus sonhos e resignificam suas jornadas todos os dias, assim como Ayrton fez!',
									tag: 'p',
									sizeM: 'body-5-m',
									sizeD: 'body-4-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									texAlign: 'align-left',
									hasMaxWidth: true,
									position: 'position-left',
									maxWidthM: 768,
									maxWidthD: 746,
									marginM: 44,
									marginD: 44,
								},
							],
							[
								'il/button',
								{
									content: 'Busque sua verdade',
									variant: 'link',
									addCustomColor: true,
									color: '#ffffff',
									bgColor: 'transparent',
									colorHover: '#ffffff',
									bgColorHover: 'transparent',
									marginM: 0,
									marginD: 0,
								},
							],
						]}
					/>
				</div>
			</div>
		</>
	);
}
