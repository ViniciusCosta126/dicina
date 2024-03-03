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
	icon: (
		<svg fill="none" viewBox="0 0 24 24">
			<path
				fill="#000"
				d="M18.512 10.077c0 .738-.625 1.337-1.396 1.337-.77 0-1.395-.599-1.395-1.337 0-.739.625-1.338 1.395-1.338s1.396.599 1.396 1.338Z"
			/>
			<path
				fill="#000"
				fill-rule="evenodd"
				d="M18.036 5.532c-1.06-.137-2.414-.137-4.123-.136h-3.826c-1.71 0-3.064 0-4.123.136-1.09.14-1.974.437-2.67 1.104S2.29 8.149 2.142 9.195C2 10.21 2 11.508 2 13.147v.1c0 1.64 0 2.937.142 3.953.147 1.046.456 1.892 1.152 2.559.696.667 1.58.963 2.67 1.104 1.06.136 2.414.136 4.123.136h3.826c1.71 0 3.064 0 4.123-.136 1.09-.14 1.974-.437 2.67-1.104s1.005-1.514 1.152-2.559C22 16.184 22 14.886 22 13.248v-.1c0-1.64 0-2.937-.142-3.953-.147-1.046-.456-1.892-1.152-2.559-.696-.667-1.58-.963-2.67-1.104ZM6.15 6.858c-.936.12-1.475.346-1.87.724-.393.377-.629.894-.755 1.791-.1.72-.123 1.619-.128 2.795l.47-.395c1.125-.942 2.819-.888 3.875.124l3.99 3.825a1.2 1.2 0 0 0 1.491.124l.278-.187a3.606 3.606 0 0 1 4.34.25l2.407 2.077c.098-.264.173-.579.227-.964.128-.916.13-2.124.13-3.824 0-1.7-.002-2.909-.13-3.825-.126-.897-.362-1.414-.756-1.791-.393-.378-.933-.604-1.869-.724-.956-.124-2.216-.125-3.99-.125h-3.72c-1.774 0-3.034.001-3.99.125Z"
				clip-rule="evenodd"
			/>
			<path
				fill="#000"
				d="M17.087 2.61c-.86-.11-1.955-.11-3.32-.11h-3.09c-1.364 0-2.459 0-3.318.11-.89.115-1.633.358-2.222.92a2.9 2.9 0 0 0-.724 1.12c.504-.23 1.074-.366 1.714-.45 1.085-.14 2.47-.14 4.22-.14h3.915c1.749 0 3.134 0 4.219.14.559.073 1.064.186 1.52.366a2.875 2.875 0 0 0-.693-1.035c-.589-.563-1.331-.806-2.221-.92Z"
				opacity=".3"
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

	const { variant, bgColor, hidePanelItem, image, marginM, marginD } = attributes;

	const inlineStyles = `
		.gallery-item-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.gallery-item-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const hideClass = hidePanelItem ? 'hide-item' : '';

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`gallery-item ${variant} ${hideClass} wp-editor gallery-item-${randomComponentId}`}>
				<div className="container">
					<div className="gallery-item__image">
						<button className="gallery-item__button">
							<svg width="26" height="25" viewBox="0 0 26 25" fill="none">
								<path
									d="M25.5254 17.098L22.5524 20.0144L18.1062 15.6529L16.1242 17.5971L20.5704 21.9586L17.5974 24.875H25.5254V17.098ZM0.294678 7.902L3.2677 4.98562L7.71393 9.34713L9.69594 7.40288L5.24972 3.04137L8.22275 0.125H0.294678V7.902ZM25.5254 0.125H17.5974L20.5704 3.04137L16.1242 7.40288L18.1062 9.34713L22.5524 4.98562L25.5254 7.902V0.125ZM0.294678 24.875H8.22275L5.24972 21.9586L9.69594 17.5971L7.71393 15.6529L3.2677 20.0144L0.294678 17.098V24.875Z"
									fill="white"
								/>
							</svg>
						</button>

						<img src={image.src} alt={image.alt} />
					</div>

					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									tag: 'p',
									manualSizes: true,
									manualSizeM: 16,
									manualSizeD: 24,
									color: '#ffffff',
									bgColor: 'transparent',
									extraClass: 'gallery-item__text',
								},
							],
						]}
					/>
				</div>
			</div>
		</>
	);
}
