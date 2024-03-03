import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';
import { documentPanel } from '../../../hooks/common';
import { updateHeight } from '../tabs/view';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg viewBox="0 0 32 32">
				<g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2">
					<path d="M12 10V5H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V10H12z" />
					<path fill="none" d="M30 10H12V5h16c1.1 0 2 .9 2 2v3zM18 5v5M24 5v5M6 8h2" />
				</g>
			</svg>
		),
	},
	parent: ['il/tabs'],
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

	const { allowed_blocks, bgColor, id, isActive, variant } = attributes;

	const inlineStyles = `
		.tabs-item-${randomComponentId} {
			background: ${bgColor};
		}
	`;

	const getParentID = () => {
		// Gets the block tabs ID
		const parent = select('core/block-editor').getBlockParents(clientId);
		if (variant === 'button-tab') {
			const parent = select('core/block-editor').getBlockParents(clientId);
			const ind = parent.length - 3;
			return parent[ind];
		} else {
			const ind = parent.length - 2;
			return parent[ind];
		}
	};

	const updateActive = () => {
		// Updates the active item
		const parentClientID = getParentID();
		const DOCUMENT = documentPanel();

		const buttons =
			select('core/block-editor').getBlocksByClientId(parentClientID)[0].innerBlocks[0].innerBlocks[1].innerBlocks;
		const contents = select('core/block-editor').getBlocksByClientId(parentClientID)[0].innerBlocks[1].innerBlocks;
		const tabsItem = [...buttons, ...contents];

		tabsItem.forEach(function (tab) {
			dispatch('core/block-editor').updateBlockAttributes(tab.clientId, { isActive: false });
		});

		// Select dom elements to get the active block id
		const tabsParent = DOCUMENT.querySelector(`[data-block="${parentClientID}"] .tabs`);
		const idToActive = tabsParent.querySelector(`[data-block="${clientId}"] .button-tab`).dataset.id;
		const contentToActive = tabsParent.querySelector(`.tabs-contents [data-id="${idToActive}"]`);

		// ClientIds of active items
		const idButton = clientId;
		const idContent = contentToActive.parentNode.dataset.block;

		// Updates the attribute of the active item's blocks
		dispatch('core/block-editor').updateBlockAttributes(idButton, { isActive: true });
		dispatch('core/block-editor').updateBlockAttributes(idContent, { isActive: true });
	};

	const callUpdateHeight = () => {
		// If active, it updates the height of the parent component
		const parentClientID = getParentID();

		const DOCUMENT = documentPanel();
		const tabsParent = DOCUMENT.querySelector(`[data-block="${parentClientID}"] .tabs`);

		if (tabsParent) {
			// Delay to get items only after rendering
			setTimeout(() => {
				// Select the currently active item
				const buttonActive = tabsParent.querySelector(`.button-tab.active`);
				const contentActive = tabsParent.querySelector(`.content-tab.active`);

				if (buttonActive && contentActive) {
					updateHeight(tabsParent, buttonActive, contentActive, true);
				}
			}, 10);
		}
	};

	if (isActive) {
		callUpdateHeight();
	}

	// Block content
	const BlockContent = () => {
		if (variant === 'button-tab') {
			return (
				<div onClick={() => updateActive()}>
					<InnerBlocks
						templateLock={true}
						template={[
							[
								'il/button',
								{
									content: 'Título',
									id: { id },
									variant: 'tab-button',
								},
							],
						]}
					/>
				</div>
			);
		} else if (variant === 'content-tab') {
			return (
				<InnerBlocks
					{...(allowed_blocks.length && {
						allowedBlocks: [...allowed_blocks],
					})}
				/>
			);
		}
	};

	const activeClass = isActive ? 'active' : '';

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`tabs-item ${variant} ${activeClass} wp-editor tabs-item-${randomComponentId}`} data-id={id}>
				<BlockContent />
			</div>
		</>
	);
}
