import { InnerBlocks } from '@wordpress/block-editor';
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
	parent: ['il/wallpapers'],
	icon: (
		<svg width="64" height="64" fill="none" viewBox="0 0 24 24">
			<path
				stroke="#fff"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m13.614 15.347 4.251-4.37L21 13.984M6.965 19l5.004-5.023L17.973 19M9.969 9.977a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm2.094-3.914-.126-.126c-.346-.346-.519-.519-.72-.642a2.001 2.001 0 0 0-.579-.24C10.409 5 10.165 5 9.676 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 19 5.08 19 6.2 19h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 17.48 21 16.92 21 15.8v-5.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 7 18.92 7 17.8 7h-3.475c-.489 0-.733 0-.963-.055-.204-.05-.4-.13-.579-.24-.201-.123-.374-.296-.72-.642Z"
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

	const { variant, bgColor, marginM, marginD, thumbImg } = attributes;

	const inlineStyles = `
		.wallpaper-card-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.wallpaper-card-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`wallpaper-card ${variant} wp-editor wallpaper-card-${randomComponentId}`}>
				<div class="wallpaper-card__content">
					<button className="download-button">
						<svg width="40" height="40" fill="none">
							<g clip-path="url(#a)" filter="url(#b)">
								<path
									fill="#fff"
									d="m20 26.668-8.334-8.333 2.333-2.417 4.334 4.333V6.668h3.333v13.583l4.333-4.333 2.334 2.417-8.334 8.333Zm-10 6.667a3.21 3.21 0 0 1-2.356-.98c-.653-.654-.98-1.438-.978-2.354v-5h3.333v5h20v-5h3.334v5c0 .917-.327 1.702-.98 2.355-.654.654-1.438.98-2.354.979H10Z"
								/>
							</g>
							<defs>
								<clipPath id="a">
									<path fill="#fff" d="M0 0h40v40H0z" />
								</clipPath>
								<filter
									id="b"
									width="34.666"
									height="34.667"
									x="2.666"
									y="6.668"
									color-interpolation-filters="sRGB"
									filterUnits="userSpaceOnUse"
								>
									<feFlood flood-opacity="0" result="BackgroundImageFix" />
									<feColorMatrix
										in="SourceAlpha"
										result="hardAlpha"
										values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									/>
									<feOffset dy="4" />
									<feGaussianBlur stdDeviation="2" />
									<feComposite in2="hardAlpha" operator="out" />
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
									<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_9658_10124" />
									<feBlend in="SourceGraphic" in2="effect1_dropShadow_9658_10124" result="shape" />
								</filter>
							</defs>
						</svg>
					</button>

					<img className="thumb" src={thumbImg.src} alt={thumbImg.alt} />
				</div>
			</div>
		</>
	);
}
