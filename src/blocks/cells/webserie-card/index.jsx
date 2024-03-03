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
	icon: (
		<svg viewBox="0 -2 32 32">
			<path
				fill="#000"
				fill-rule="evenodd"
				d="M19 12.012A5.011 5.011 0 1 1 19 1.99a5.011 5.011 0 0 1 0 10.022ZM6 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm24 0-6 4a3.97 3.97 0 0 0-1.406-3.021C24.626 11.753 26 9.546 26 7a7 7 0 1 0-14 0c0 1.962.812 3.729 2.111 5h-3.668C11.4 10.937 12 9.544 12 8A6 6 0 0 0 0 8c0 1.809.816 3.41 2.082 4.511C.847 13.191 0 14.49 0 16v8a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4l6 4a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2Z"
			/>
		</svg>
	),
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

	const { variant, bgColor, marginM, marginD, episode, sinopse, diretor, imgCard } = attributes;

	const inlineStyles = `
		.webserie-card-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.webserie-card-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`webserie-card ${variant} wp-editor webserie-card-${randomComponentId}`}>
				<div class="webserie-card__image">
					<img src={imgCard.src} alt={imgCard.alt} />
				</div>

				<p>
					Episodio:
					<RichText
						allowedFormats={[]}
						value={episode}
						tagName="p"
						placeholder="Digite o numero do episodio"
						className="episodio"
						onChange={(newContent) => setAttributes({ episode: newContent })}
					/>
				</p>
				<p>
					Sinopse:
					<RichText
						allowedFormats={[]}
						value={sinopse}
						tagName="p"
						placeholder="Digite a sinopse"
						className="sinopse"
						onChange={(newContent) => setAttributes({ sinopse: newContent })}
					/>
				</p>
				<p>
					Diretor:
					<RichText
						allowedFormats={[]}
						value={diretor}
						tagName="p"
						placeholder="Digite o nome do diretor"
						className="diretor"
						onChange={(newContent) => setAttributes({ diretor: newContent })}
					/>
				</p>
			</div>
		</>
	);
}
