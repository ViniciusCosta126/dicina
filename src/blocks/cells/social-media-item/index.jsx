import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { dispatch, select } from '@wordpress/data';

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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, hasContent, hasEmbed, hasExpanded, embedContent, bgFile, posterImage, bgColor } = attributes;

	const inlineStyles = `
		.social-media-item-${randomComponentId} {
			background: ${bgColor};
		}
	`;

	const getParentID = () => {
		// Gets the block tabs ID
		const parent = select('core/block-editor').getBlockParents(clientId);
		return parent[0];
	};

	const handleUpdate = (newAttibute) => {
		// Updates the expanded item equivalent to the current item (so you don't need to change it in two different locations at the risk of updating the wrong item)
		if (hasExpanded) {
			const parentId = getParentID();
			const parentBlocks = select('core/block-editor').getBlocksByClientId(parentId)[0];
			let slideItemsWrapper;
			if (parentBlocks.name === 'il/social-media-gallery') {
				slideItemsWrapper = parentBlocks.innerBlocks[4].innerBlocks;
			} else {
				const socialGalleryInd = parentBlocks.innerBlocks.findIndex(function (inBlock) {
					return inBlock.name == 'il/social-media-gallery';
				});
				slideItemsWrapper = parentBlocks.innerBlocks[socialGalleryInd].innerBlocks[4].innerBlocks;
			}

			const slideItemsWrapperInd = slideItemsWrapper.findIndex(function (inBlock) {
				return inBlock.name == 'il/carousel';
			});
			const slideItems = slideItemsWrapper[slideItemsWrapperInd].innerBlocks;

			// get ClientId of equivalent item
			const currentId = attributes.id;
			const ind = slideItems.findIndex(function (inBlock) {
				return inBlock.attributes.id == currentId;
			});
			const expandedCliendID = slideItems[ind].clientId;

			// Update sibling attributes
			dispatch('core/block-editor').updateBlockAttributes(expandedCliendID, { ...newAttibute });
		} else {
			console.log("don't have an item to update");
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} handleUpdate={(e) => handleUpdate(e)} />

			<style>{inlineStyles}</style>

			<div className={`social-media-item ${variant} wp-editor social-media-item-${randomComponentId}`}>
				{!hasEmbed ? (
					<>
						{bgFile.type === 'image/jpeg' || bgFile.type === 'image/png' ? (
							<picture className={`social-media-item--image ${hasContent ? 'has-content' : ''}`}>
								<img src={bgFile.src} alt={bgFile.alt} />
							</picture>
						) : (
							(bgFile.type === 'video/mp4' || bgFile.type === 'video/webm') && (
								<video
									poster={posterImage.src}
									width={bgFile.width}
									height={bgFile.height}
									controls
									muted="muted"
									className="social-media-item--image"
								>
									<source src={bgFile.src} type={bgFile.type} />
								</video>
							)
						)}

						{hasContent && (
							<div className={`social-media-item--content has-content`}>
								<InnerBlocks
									templateLock={true}
									template={[
										[
											'il/typography',
											{
												content: '@insira-o-arroba',
												tag: 'p',
												manualSizes: true,
												manualSizeM: 16,
												manualSizeD: 16,
												color: '#ffffff',
												bgColor: 'transparent',
												textAlign: 'align-left',
												textWeight: 'weight-medium',
											},
										],
										[
											'il/typography',
											{
												content: 'Data',
												tag: 'p',
												manualSizes: true,
												manualSizeM: 16,
												manualSizeD: 16,
												color: '#ffffff',
												bgColor: 'transparent',
												textAlign: 'align-left',
												textWeight: 'weight-medium',
												extraClass: 'slider-in-phone-date',
											},
										],
									]}
								/>
							</div>
						)}
					</>
				) : (
					<div className="social-media-item--embed" dangerouslySetInnerHTML={{ __html: embedContent }}></div>
				)}
			</div>
		</>
	);
}
