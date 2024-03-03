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
	icon: 'images-alt2',
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

	const { bgImage, bgImageMobile, variant, bgColor, marginM, marginD, hasOverlay, bgOverlay, hasText, isVideo, videoBg } =
		attributes;

	const inlineStyles = `
		.slide-item-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.slide-item-${randomComponentId} .slide-item--picture-overlay {
			background: ${bgOverlay};
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
				{isVideo ? (
					<video
						// poster={videoBg.poster}
						width={videoBg.width}
						height={videoBg.height}
						controls
						preload="none"
						muted="muted"
						className="slide-item--video"
					>
						<source src={videoBg.src} type={videoBg.type} />
					</video>
				) : (
					bgImage.src && (
						<picture className="slide-item--image">
							<source srcset={bgImage.src ? bgImage.src : bgImageMobile.src} media="(min-width: 768px)" />
							<img src={bgImageMobile.src} alt="MDN" />
						</picture>
					)
				)}

				{hasOverlay && <div className="slide-item--picture-overlay"></div>}
				<div className="container">
					{hasText && (
						<div className="slide-item--text-box">
							<InnerBlocks
								template={[
									[
										'il/typography',
										{
											tag: 'p',
											color: '#FFFF',
											bgColor: 'transparent',
											sizeD: 'body-2-d',
											textWeight: 'weight-medium',
											marginM: 20,
											marginD: 20,
										},
									],
									[
										'il/button',
										{
											content: 'Saiba mais',
											variant: 'link',
											addCustomColor: true,
											color: '#ffff',
											bgColor: 'transparent',
											colorHover: '#ffff',
											bgColorHover: 'transparent',
										},
									],
								]}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
