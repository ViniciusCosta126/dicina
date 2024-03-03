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

	const { cardimg, bgColor, title, textAux, variant, textAux2 } = attributes;

	const inlineStyles = `
		.news-card-${randomComponentId} {
			background: ${bgColor};
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`news-card ${variant}  news-card-${randomComponentId}`}>
				{cardimg.src ? <img loading="eager" src={cardimg.src} alt={cardimg.alt} class="news_card_img"></img> : ''}
				<div class="news__content__texts">
					<RichText
						value={title}
						tagName="h3"
						className="news__content__paragraph"
						allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
						onChange={(newContent) => setAttributes({ title: newContent })}
					/>
					<InnerBlocks
						template={[
							[
								'il/button',
								{
									content: 'Saiba mais',
									variant: 'link',
									link: {
										target: '',
										url: '#',
									},
								},
							],
						]}
					/>
				</div>
			</div>
		</>
	);
}
