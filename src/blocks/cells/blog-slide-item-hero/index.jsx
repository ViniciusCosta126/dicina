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
	icon: 'wordpress-alt',
	parent: ['il/carousel'],
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

	const { bgImage, bgImageMobile, variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.slide-item-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.slide-item-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`slide-item ${variant} slide-item-${randomComponentId}`}>
				{
					bgImage.src && (
						<picture className="slide-item--image">
							<source srcset={bgImage.src ? bgImage.src : bgImageMobile.src} media="(min-width: 768px)" />
							<img src={bgImageMobile.src} alt="MDN" />
						</picture>
					)
				}

				<div className="container">
					<div className="slide-item--text-box">
						<InnerBlocks
							template={[
								[
									'il/typography',
									{
										tag: 'p',
										manualSizes: true,
										manualSizeM: 12,
										manualSizeD: 14,
										sizeType: 'px',
										fontFamily: 'helveticaneue',
										content: 'Categoria',
										color: '#002753',
										bgColor: 'transparent',
										extraClass: 'post-content--category',
										textWeight: 'weight-medium'
									},
								],
								[
									'il/typography',
									{
										tag: 'h3',
										manualSizes: true,
										manualSizeM: 24,
										manualSizeD: 26,
										fontFamily: 'helveticaneue',
										content: 'Título do post',
										color: '#000000',
										bgColor: 'transparent',
										extraClass: 'post-content--title',
										textWeight: 'weight-medium'
									},
								],
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
