import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

import metadata from './block.json';
import Controls from './controls.jsx';

import { documentPanel } from '../../../hooks/common';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: (
		<svg transform="rotate(90)" fill="none" stroke="#fff" viewBox="0 0 24 24">
			<g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.872">
				<path
					fill="#000"
					d="M3 15.024V10h9V3h3.024C19.945 3 21 4.055 21 8.976V14h-9v7H8.976C4.055 21 3 19.945 3 15.024Z"
					opacity=".1"
				/>
				<path
					stroke="#000"
					stroke-width="2"
					d="M3 8.976C3 4.055 4.055 3 8.976 3h6.048C19.945 3 21 4.055 21 8.976v6.048C21 19.945 19.945 21 15.024 21H8.976C4.055 21 3 19.945 3 15.024V8.976ZM12 3v18M3 10h9M12 14h9"
				/>
			</g>
			<path
				fill="#000"
				d="M3 15.024V10h9V3h3.024C19.945 3 21 4.055 21 8.976V14h-9v7H8.976C4.055 21 3 19.945 3 15.024Z"
				opacity=".1"
			/>
			<path
				stroke="#fff"
				stroke-width="2"
				d="M3 8.976C3 4.055 4.055 3 8.976 3h6.048C19.945 3 21 4.055 21 8.976v6.048C21 19.945 19.945 21 15.024 21H8.976C4.055 21 3 19.945 3 15.024V8.976Z"
			/>
			<path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18" />
			<path stroke="#fff" stroke-linecap="round" stroke-width="2" d="M3 10h9M12 14h9" />
		</svg>
	),
	parent: ['il/mosaic'],
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

	const { indexId, variant, bgColor, image } = attributes;

	const inlineStyles = `
		.mosaic-item-${randomComponentId} {
			background: ${bgColor};
		}
	`;

	const getParentID = () => {
		// Gets the block tabs ID
		const parent = select('core/block-editor').getBlockParents(clientId);
		return parent[0];
	};

	const hendleActive = () => {
		// Function to activate gallery-item item relative to the item being clicked
		const DOCUMENT = documentPanel();
		const parentClientID = getParentID();
		const parentEl = DOCUMENT.querySelector(`[data-block="${parentClientID}"]`);
		const carouselAllItems = parentEl.querySelectorAll(`.modal.inner [data-type="il/gallery-item"]`);

		// Sets all items in the gallery with the hide-item class (hidden)
		carouselAllItems.forEach((item) => {
			const itemCliendId = item.getAttribute('data-block');
			dispatch('core/block-editor').updateBlockAttributes(itemCliendId, { hidePanelItem: true });

			item.querySelector('.gallery-item').classList.add('hide-item');
		});

		// Arrows the item relative to the one clicked on without the hide-item class (visible)
		const carouselItem = parentEl.querySelector(
			`.modal.inner [data-type="il/gallery-item"]:nth-child(${indexId + 1}) .gallery-item`
		);

		if (carouselItem) {
			const itemCliendId = carouselItem.parentNode.getAttribute('data-block');
			dispatch('core/block-editor').updateBlockAttributes(itemCliendId, { hidePanelItem: false });

			carouselItem.classList.remove('hide-item');
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<button
				className={`mosaic-item ${variant} wp-editor mosaic-item-${randomComponentId}`}
				data-indexId={indexId}
				onClick={() => hendleActive()}
			>
				<img src={image.src} alt={image.alt} />;
			</button>
		</>
	);
}
