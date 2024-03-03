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
	icon: 'format-image',
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

	const { title, subtitle, hasSubtitle, imgMobile, imgDesk } = attributes;

	const inlineStyles = `
		.banner-imprensa-${randomComponentId} {
			background-image: url(${imgMobile.src});
			background-repeat: no-repeat;
    		background-size: cover;
			background-position: center;
		}
		
		@media (min-width: 1024px) {
			.banner-imprensa-${randomComponentId} {
				background-image: url(${imgDesk.src});
				background-repeat: no-repeat;
    			background-size: cover;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`banner-imprensa banner-imprensa-${randomComponentId}`}>
				<div className="container">
					<RichText
						value={title}
						tagName="h1"
						className="banner-imprensa__title"
						onChange={(title) => setAttributes({ title })}
						withoutInteractiveFormatting
					/>

					{hasSubtitle && (
						<RichText
							value={subtitle}
							tagName="p"
							className="banner-imprensa__subtitle"
							onChange={(subtitle) => setAttributes({ subtitle })}
							withoutInteractiveFormatting
						/>
					)}
				</div>
			</section>
		</>
	);
}
