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
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { upperTitle, bgColor, title, link } = attributes;

	const inlineStyles = `
		.news-slider-${randomComponentId} {
			background: ${bgColor};
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`news-slider news-slider-${randomComponentId}`}>
				<h2 class="news__content__title__container">
					<RichText
						value={upperTitle}
						tagName="span"
						className="news__content__upper__title"
						allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
						onChange={(upperTitle) => setAttributes({ upperTitle: upperTitle })}
					/>
					<RichText
						value={title}
						tagName="span"
						className="news__content__title"
						allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
						onChange={(title) => setAttributes({ title: title })}
					/>
				</h2>
				<InnerBlocks
					template={[
						[
							'il/carousel',
							{
								variant: 'group-brands',
								allowed_blocks: ['il/news-card'],
								bgColor: '#002753',
								dots: true,
								autoplay: true,
								speed: 400,
								autoplayTimeout: 15000,
								loop: true,
								perView: 1,
								perView480: 2,
								perView768: 2,
								perView960: 1,
								perView1366: 1,
							},
							[['il/news-card']],
						],
					]}
				/>

				<a class="news__content__link__content">
					<RichText
						value={link}
						tagName="p"
						className="news__content__link"
						allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
						onChange={(newContent) => setAttributes({ link: newContent })}
					/>

					<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10.0953 0.90469L12.5321 0.904689L12.5321 17.6142L20.0166 10.1297L21.7572 11.8703L11.3137 22.3137L0.870307 11.8703L2.61088 10.1297L10.0953 17.6142L10.0953 0.90469Z"
							fill="white"
						/>
					</svg>
				</a>
			</section>
		</>
	);
}
