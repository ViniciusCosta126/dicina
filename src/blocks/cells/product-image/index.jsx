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
	icon: 'format-image',
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

	const { variant, smallImage, largeImage, largeImageDesk } = attributes;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div
				className={`product-image ${variant} product-image-${randomComponentId}`}
				data-imageMobile={largeImage.src}
				data-imageDesk={largeImageDesk.src}
			>
				<div className="product-image-content">
					<img src={smallImage.src} alt={smallImage.alt} />
				</div>
			</div>
		</>
	);
}
