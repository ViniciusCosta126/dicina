import { InnerBlocks, RichText } from '@wordpress/block-editor';
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
	icon: 'admin-site',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const { title, content, imgMobile, imgTablet, imgDesk, img4k, contentAlign } = attributes;

	return (
		<>
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<details open>
				<summary>
					<RichText
						value={title}
						tagName='h3'
						className="accordion__title"
						onChange={(title) => setAttributes({ title })}
						withoutInteractiveFormatting
					/>
				</summary>

				<picture>
					<source media="(min-width:2000px)" srcset={img4k.src} alt="" />
					<source media="(min-width:1024px)" srcset={imgDesk.src} />
					<source media="(min-width:540px)" srcset={imgTablet.src} />
					<img src={imgMobile.src} alt="olhar" class="img" />
				</picture>

				<div className={`content ${contentAlign}`}>
					<InnerBlocks
						template={[
							[
								'il/testimony',
								{
									content: content,
									textColor: '#ffffff',
									align: 'align-center-left',
								},
							],
						]}
					/>
				</div>
			</details>
		</>
	);
}
