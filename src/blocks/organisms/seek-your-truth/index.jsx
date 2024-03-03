import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg width="800" height="800" viewBox="0 -2 20 20">
				<path
					fill="#000"
					fill-rule="evenodd"
					d="M0 16h14v-2H0v2ZM0 2h20V0H0v2Zm0 7h20V7H0v2Z"
				/>
			</svg>
		),
	},
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

	const {
		showVideo,
		variant,
		bgColor,
		line1,
		line2,
		line3,
		image,
		video,
		marginM,
		marginD,
	} = attributes;
	const showVideoHtml = showVideo ? '' :'hide';

	const inlineStyles = `
		.seek-your-truth-section {
			background: ${bgColor};
		}
		.editor-styles-wrapper .degrade-border-text {
			font-family:  Helvetica, Arial, sans-serif;
			font-size: 12vw;
			text-transform: uppercase;
			color: #032653;
			caret-color: #fff;
			padding: 5px;
			background: linear-gradient(90deg, #00a851 0%, #1832d7 100%);
			-webkit-background-clip: text;
			-webkit-text-stroke: 8px transparent;
		}
		.wrapper4Edition {
			display: flex;
			gap: 5vw;
		}
		.seek-your-truth__video--wrapper {
			position: static;
			text-align: center;
		}
		.block-editor__container .wrapper4Edition > img {
			max-height: 90%;
			height: 90%;
		}

		.seek-your-truth-section.margin-bottom-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}


		@media (min-width: 768px) {
			.seek-your-truth-section.margin-bottom-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>
			<section
				className={`seek-your-truth-section ${variant} seek-your-truth-${randomComponentId}`}
			>
				<div className="seek-your-truth__content">
					<RichText
						allowedFormats={[]}
						tagName="p"
						className="seek-your-truth__text degrade-border-text"
						id="texto1SYT"
						value={line1}
						onChange={(value) => setAttributes({ line1: value })}
						placeholder="Insira o texto aqui..."
					/>
					<hr />
					<div className="wrapper4Edition">
						<RichText
							allowedFormats={[]}
							tagName="p"
							className="seek-your-truth__text degrade-border-text"
							id="texto2SYT"
							value={line2}
							onChange={(value) => setAttributes({ line2: value })}
							placeholder="Insira o texto aqui..."
						/>
						{image.src && <img src={image.src} alt={image.alt} />}
					</div>
					<hr />
					<RichText
						allowedFormats={[]}
						tagName="p"
						className="seek-your-truth__text degrade-border-text"
						id="texto3SYT"
						value={line3}
						onChange={(value) => setAttributes({ line3: value })}
						placeholder="Insira o texto aqui..."
					/>
				</div>
				<hr />
				<div className={`seek-your-truth__video  ${showVideoHtml}`}>
					<div className="seek-your-truth__video--wrapper">
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
				</div>
			</section>
			<hr />
		</>
	);
}
