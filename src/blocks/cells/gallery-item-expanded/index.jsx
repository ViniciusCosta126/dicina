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
	icon: 'format-image',
	parent: ['il/gallery-item'],
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

	const { variant, caption, hasCaption, image, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.gallery-item-expanded-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.gallery-item-expanded-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const Caption = () => {
		if (!hasCaption) return null;

		return (
			<InnerBlocks
				template={[
					[
						'il/typography',
						{
							content: caption,
							tag: 'figcaption',
							manualSizes: true,
							manualSizeM: 16,
							manualSizeD: 26,
							color: '#ffffff',
							bgColor: 'transparent',
							textAlign: 'align-center',
							textWeight: 'weight-light',
							extraClass: 'caption',
						},
					],
				]}
			/>
		);
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`gallery-item-expanded ${variant} wp-editor gallery-item-expanded-${randomComponentId}`}>
				<figure className="gallery-item-expanded--image">
					<img src={image.src} alt={image.alt} />

					<Caption />
				</figure>
			</div>
		</>
	);
}
