
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from "./controls.jsx";

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

	const { variant, bgColor, title, upperTitle, bgImage, bgImageMobile } = attributes;

	const inlineStyles = `
		.fight-${randomComponentId} {
			background: ${bgColor};
		}		
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`fight ${variant} fight-${randomComponentId}`}>
				<h2 class='fight__title__container'>
					<RichText
							value={upperTitle}
							tagName='p'
							className='fight__upper__title'
							allowedFormats={['core/bold', 'core/italic', 'core/strikethrough', 'core/link']}
							onChange={newContent => setAttributes({ upperTitle: newContent })}
					/>
					<RichText
							value={title}
							tagName='p'
							className='fight__title'
							allowedFormats={['core/bold', 'core/italic', 'core/strikethrough', 'core/link']}
							onChange={newContent => setAttributes({ title: newContent })}
					/>
				</h2>

				<div class="link">
					<InnerBlocks 
						template={[
							[
								"il/button",  
								{
									content: "Faça parte desse movimento", 
									variant: 'link',
									link: {
										target: "",
										url: "#"
									}
								}
							]
						]} 
					/>
				</div>

				{bgImage.src ? (
					<picture class='back_img'>
						<source media="(max-width: 769px)" srcset={bgImageMobile.src}></source>
						<source media="(min-width: 768px)" srcset={bgImage.src}></source>
						<img src={bgImage.src} ></img>
				 	</picture>

				): ""}
			</section>
		</>
	);
}