import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'cover-image',
	edit: EditorComponent,
	save: () => {},
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { showVideo, variant, bgColor, staticText, mutationText, video, marginM, marginD } = attributes;
	const showVideoClass = showVideo ? '' : 'hide';

	const inlineStyles = `
		.hero-seek-your-truth-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
	
		@media (min-width: 768px) {
			.hero-seek-your-truth-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`hero-seek-your-truth ${variant} wp-editor hero-seek-your-truth-${randomComponentId}`}>
				<div className="seek-your-truth__content">
					<RichText
						allowedFormats={[]}
						tagName="h2"
						value={staticText}
						onChange={(value) => setAttributes({ staticText: value })}
						placeholder="Insira o texto aqui..."
					/>

					<RichText
						allowedFormats={[]}
						tagName="h2"
						className="multi-txt"
						value={mutationText}
						onChange={(value) => setAttributes({ mutationText: value })}
						placeholder="Separe com vírgula...."
					/>
				</div>

				<hr />

				{showVideo && (
					<div className={`seek-your-truth__video  ${showVideoClass}`}>
						<video
							className="video-image"
							poster={video.poster}
							width={video.width}
							height={video.height}
							controls
							muted="muted"
							preload="none"
							autostart="0"
						>
							<source src={video.src} type={video.type} />
						</video>
					</div>
				)}
			</section>
		</>
	);
}
