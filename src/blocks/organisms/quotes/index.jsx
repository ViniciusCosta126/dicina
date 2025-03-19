import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

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
			<svg width="800" height="800" viewBox="0 0 32 32">
				<path d="M11.116 24.115 8.25 26.981V2C8.25 1.31 7.69.75 7 .75S5.75 1.31 5.75 2v24.982l-2.866-2.867c-.226-.226-.539-.366-.884-.366-.691 0-1.251.56-1.251 1.251 0 .346.14.658.367.885l5 5c.226.226.538.365.882.365.173 0 .337-.035.487-.099l-.008.003h.001c.141-.062.261-.143.364-.242.013-.012.029-.015.042-.027l5-5c.227-.226.367-.539.367-.885 0-.691-.56-1.251-1.251-1.251-.345 0-.658.14-.884.366zM30 2.75H19c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25h11c.69 0 1.25-.56 1.25-1.25S30.69 2.75 30 2.75zm-2 6h-9c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25h9c.69 0 1.25-.56 1.25-1.25S28.69 8.75 28 8.75zm-6 18h-3c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25h3c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25zm2-6h-5c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25h5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25zm2-6h-7c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25h7c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25z" />
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
	const { variant, bgColor, marginM, marginD, textContent } = attributes;
	const imagePath = 'https://placehold.co/954x1470';

	const inlineStyles = `
		.frase {
			background: ${bgColor};
			margin-bottom: ${marginM}px;

			p.editorHelper {
				margin: 0;
			}
		}
		
		@media (min-width: 768px) {
			.frase-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`frase ${variant} frase-${randomComponentId}`}>
				<div className="container large-on-desk">
					<div class="frase__text">
						<p class="frase__text__opening">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 40 28" fill="none">
								<path d="M0 0V28L15 14V0H0ZM25 0V28L40 14V0H25Z" fill="white" />
							</svg>
						</p>
						<p class="frase__text__textone editorHelper">
							<RichText
								allowedFormats={['core/bold', 'core/italic']}
								value={attributes.textContent}
								onChange={(textContent) => setAttributes({ textContent: textContent })}
								placeholder="Insira o texto"
							/>
						</p>
						<p class="frase__text__closing">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 40 28" fill="none">
								<path d="M40 28V-1.90735e-06L25 14V28H40ZM15 28V-1.90735e-06L0 14V28H15Z" fill="white" />
							</svg>
						</p>
					</div>

					<div class="frase__images">
						<img
							className="frase__images__mobileimage"
							src={attributes.imgMob.src ? attributes.imgMob.src : imagePath}
							loading="lazy"
							width="181"
							height="342"
						/>
						<img
							className="frase__images__deskimage"
							src={attributes.imgDeskOne.src ? attributes.imgDeskOne.src : imagePath}
							loading="lazy"
							width="477"
							height="735"
						/>
						<img
							className="frase__images__deskimage"
							src={attributes.imgDeskTwo.src ? attributes.imgDeskTwo.src : imagePath}
							loading="lazy"
							width="386"
							height="521"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
