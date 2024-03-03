
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

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

	const { variant, bgColor, marginM, marginD, bgImage, videoThumb1,videoThumb2, phrase, instagram, video1Caption, video2Caption, profession, title, titleSenna } = attributes;

	const inlineStyles = `
		.inspirational-item-${randomComponentId} {
			background: url(${bgImage.src}) no-repeat top center;
			background-size: cover;
			min-height: 600px;
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.inspirational-item-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`inspirational-item painel ${variant} inspirational-item-${randomComponentId}`}>
				<div className="wrapper__painel">
					<div className="text">
						<RichText
							className='phrase'
							value={phrase}
							onChange={(newContent) => setAttributes({ phrase: newContent })}
						/>
						<div className="social">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M1.06955 3.06758C0.571289 4.04546 0.571289 5.32558 0.571289 7.88582V16.1144C0.571289 18.6746 0.571289 19.9547 1.06955 20.9327C1.50783 21.7928 2.20716 22.4921 3.06733 22.9304C4.04522 23.4287 5.32534 23.4287 7.88558 23.4287H16.1141C18.6744 23.4287 19.9545 23.4287 20.9324 22.9304C21.7925 22.4921 22.4919 21.7928 22.9301 20.9327C23.4284 19.9547 23.4284 18.6746 23.4284 16.1144V7.88582C23.4284 5.32558 23.4284 4.04546 22.9301 3.06758C22.4919 2.20741 21.7925 1.50807 20.9324 1.06979C19.9545 0.571533 18.6744 0.571533 16.1141 0.571533H7.88558C5.32534 0.571533 4.04522 0.571533 3.06733 1.06979C2.20716 1.50807 1.50783 2.20741 1.06955 3.06758ZM18.9047 6.38105C19.5621 6.38105 20.0951 5.84806 20.0951 5.19058C20.0951 4.5331 19.5621 4.0001 18.9047 4.0001C18.2472 4.0001 17.7141 4.5331 17.7141 5.19058C17.7141 5.84806 18.2472 6.38105 18.9047 6.38105ZM6.28557 12.0001C6.28557 8.8442 8.84395 6.28582 11.9999 6.28582C15.1557 6.28582 17.7141 8.8442 17.7141 12.0001C17.7141 15.156 15.1557 17.7144 11.9999 17.7144C8.84395 17.7144 6.28557 15.156 6.28557 12.0001Z" fill="white"/>
							</svg>
							<RichText
								value={instagram}
								onChange={(newContent) => setAttributes({ instagram: newContent })}
							/>
						</div>

					</div>


					<div class="videos">
						<div class="wrapper__video">
							<div class="video">

								<img class="video-thumb" src={videoThumb1.src}  />
							</div>
							<RichText
								value={video1Caption}
								tagName='span'
								onChange={(newContent) => setAttributes({ video1Caption: newContent })}
							/>
						</div>
						<div className="wrapper">
							<div className="video">
								<img class="video-thumb" src={videoThumb2.src}  />

							</div>
							<RichText
								value={video2Caption}
								tagName='span'
								onChange={(newContent) => setAttributes({ video2Caption: newContent })}
							/>
						</div>
					</div>


					<div className='text__controls'>
						<RichText 
							class="profession" 
							value={profession} 
							onChange={(newContent) => setAttributes({ profession: newContent })}
						/>
						<RichText 
							class="title" 
							value={title} 
							onChange={(newContent) => setAttributes({ title: newContent })}
						/>
						<RichText 
							className='senna-sans' 
							value={titleSenna} 
							onChange={(newContent) => setAttributes({ titleSenna : newContent })}
						/>
					</div>
				</div>


			</div>
		</>
	);
}
