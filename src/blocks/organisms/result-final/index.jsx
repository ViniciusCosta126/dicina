import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'awards',
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

	const { variant, bgColor, marginM, marginD, bgImageDesk, hasImage, bgImageMobile, bgColorDegrade, bgColorDegradeDesk } =
		attributes;

	const inlineStyles = `
		.result-final-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		.result-final-${randomComponentId} .text-with-image-background::after {
			background: ${bgColorDegrade};
        }
		@media (min-width: 768px) {
			.result-final-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
			.result-final-${randomComponentId} .text-with-image-background::after {
				background: ${bgColorDegradeDesk};
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`result-final ${variant} result-final-${randomComponentId}`}>
				{hasImage && (
					<picture className={`text-with-image-background`}>
						<source srcset={bgImageDesk.src} media="(min-width: 768px)" />
						<img src={bgImageMobile.src} alt={bgImageMobile.alt} />
					</picture>
				)}
				<div className="container">
					<div className="content">
						<InnerBlocks
							template={[
								[
									'il/typography',
									{
										content: 'PÓDIO',
										tag: 'p',
										manualSizes: true,
										manualSizeD: 24,
										manualSizeM: 20,
										sizeM: 'title-4-m',
										sizeD: 'body-5-d',
										color: '#fff',
										bgColor: 'transparent',
										fontFamily: 'helveticaneue',
										extraClass: 'aux-title',
									},
								],
								[
									'il/typography',
									{
										content: 'Resultado final',
										tag: 'h3',
										widthStrokeM: 1,
										widthStrokeD: 2,
										manualSizes: true,
										manualSizeD: 56,
										manualSizeM: 32,
										color: 'linear-gradient(0deg, #00A851 0%, #00A851 10%,#1832D7 100%)',
										bgColor: 'transparent',
										fontFamily: 'helveticaneue',
										extraClass: 'title',
									},
								],
								['il/podium', { hasTitle: false }],
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
