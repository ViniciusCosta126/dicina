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
	icon: 'text-page',
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

	const { variant, bgColor, marginM, marginD, title, titleFontSenna, content, bgImage } = attributes;

	const inlineStyles = `
		.legacy {

		}

		.legacy .legacy__hero{
			background: url(${bgImage.src}) no-repeat center top;
			background-size: cover;
		}

		.legacy.margin-bottom-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}


		@media (min-width: 768px) {
			.legacy.margin-bottom-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			<style>{inlineStyles}</style>
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<section className={`legacy ${variant} margin-bottom-${randomComponentId}`}>
				<div className="container">
					<div className="legacy__hero">
						<h3 className="legacy__title__container">
							<RichText
								className="legacy__title"
								value={title}
								placeholder="digite"
								onChange={(title) => setAttributes({ title: title })}
							/>
							<br />
							<RichText
								value={titleFontSenna}
								className="senna-sans"
								onChange={(titleFontSenna) => setAttributes({ titleFontSenna: titleFontSenna })}
							/>
						</h3>
					</div>

					<div className="legacy__content">
						<RichText
							value={content}
							tagName="p"
							className="legacy__content__paragraph"
							allowedFormats={['core/bold', 'core/italic', 'core/strikethrough', 'core/link']}
							onChange={(newContent) => setAttributes({ content: newContent })}
						/>
						<div class="link">
							<InnerBlocks template={[['il/button', { content: 'Explore o legado', variant: 'link' }]]} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
