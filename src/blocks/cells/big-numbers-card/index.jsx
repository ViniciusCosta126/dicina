import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg fill="none" viewBox="-0.5 0 12 12">
				<path
					fill="#000"
					fill-rule="evenodd"
					d="M7 1h3a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2zm0 4h3a1 1 0 1 1 0 2H7a1 1 0 0 1 0-2zm2 4h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2zM2 3.414l-.293.293A1 1 0 1 1 .293 2.293l2-2C2.923-.337 4 .109 4 1v9h1a1 1 0 1 1 0 2H1c-1.333 0-1.333-2 0-2h1V3.414z"
					clip-rule="evenodd"
				/>
			</svg>
		),
	},
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

	const { variant, bgImage, firtsText, secundText, bgImageMobile, textMobile, firtsTextMini } = attributes;
	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div className={`big_numbers_card ${variant}  big_numbers_card_${randomComponentId}`}>
				{bgImageMobile.src && (
					<picture class="back_img">
						<source media="(max-width: 1024px)" srcset={bgImageMobile.src}></source>
						<source media="(min-width: 1023px)" srcset={bgImage.src}></source>
						<img src={bgImageMobile.src}></img>
					</picture>
				)}

				<RichText
					tagName="p"
					className="mobile_text"
					value={textMobile}
					onChange={(textMobile) => setAttributes({ textMobile: textMobile })}
				/>
				<p class="social__number">
					<RichText
						allowedFormats={['core/bold', 'core/italic']}
						tagName="span"
						value={firtsText}
						onChange={(value) => setAttributes({ firtsText: value })}
					/>

					<RichText
						allowedFormats={['core/bold', 'core/italic']}
						tagName="span"
						className="m_letter"
						value={firtsTextMini}
						onChange={(value) => setAttributes({ firtsTextMini: value })}
					/>
				</p>

				<p class="social__text">
					<RichText
						allowedFormats={['core/bold', 'core/italic']}
						tagName="span"
						className="social__text__content"
						value={secundText}
						onChange={(secundText) => setAttributes({ secundText: secundText })}
					/>

					<InnerBlocks allowedBlocks={['il/social-icon']} template={[['il/social-icon']]} />
				</p>
			</div>
		</>
	);
}
