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
	icon: {
		src: (
			<svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					<path d="M8 1v13h3V1zm2 12H9V2h1zm4-1h-1V5h3v6.023a.99.99 0 0 0-.781.62l-.137.357H15V6h-1zM6 9H3v5h3zm-1 4H4v-3h1zm6 2v1H1V1h1v14zm6 1a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4.105-3.137l.705-1.538-1.166-1.167-1.624.724-.628-.296-.59-1.586h-1.65l-.636 1.66-.653.235-1.543-.71-1.166 1.168.727 1.627-.295.628-1.586.59v1.65l1.66.636.235.653-.71 1.543 1.168 1.166 1.627-.727.628.295.59 1.586h1.65l.636-1.66.653-.235 1.543.71 1.162-1.171-.724-1.624.296-.628 1.586-.59v-1.65l-1.66-.636zM22 18.266l-1.32.49-.543 1.16.623 1.398-.41.413-1.28-.588-1.207.434L17.315 23h-.581l-.491-1.32-1.16-.544-1.4.627-.412-.411.59-1.283-.434-1.206L12 18.315v-.581l1.32-.491.544-1.16-.627-1.4.411-.412 1.283.59 1.206-.434.548-1.427h.581l.491 1.32 1.158.543 1.397-.622.412.412-.585 1.28.434 1.204 1.427.548z"></path>
					<path fill="none" d="M0 0h24v24H0z"></path>
				</g>
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

	const {
		variant,
		bgColor,
		marginM,
		marginD,
		hasImage,
		title,
		nameCar,
		engine,
		horses,
		bgImageDesk,
		bgImageMobile,
		hPosition,
		subtitleEngine,
		subtitleHorses,
	} = attributes;

	const inlineStyles = `
		.technical-sheet-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.technical-sheet-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`technical-sheet wp-editor ${variant} ${hPosition} technical-sheet-${randomComponentId}`}>
				{hasImage && (
					<picture className={`text-with-image-background`}>
						<source srcset={bgImageDesk.src} media="(min-width: 768px)" />
						<img src={bgImageMobile.src} alt={bgImageMobile.alt} />
					</picture>
				)}
				<div className="container medium">
					<div className="text-with-image-content">
						<RichText
							allowedFormats={[]}
							tagName={'p'}
							className="title"
							value={title}
							onChange={(newContent) => setAttributes({ title: newContent })}
							placeholder="Ficha Técnica"
						/>
						<RichText
							allowedFormats={[]}
							tagName={'h3'}
							className="nameCar"
							value={nameCar}
							onChange={(newContent) => setAttributes({ nameCar: newContent })}
							placeholder="MClaren mp4/gb honda ra122e"
						/>

						<div className="content-technical">
							<div className="technical-info container medium">
								<svg
									width="289"
									height="146"
									viewBox="0 0 289 146"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M289 145.5C289 106.911 273.776 69.9025 246.677 42.616C219.578 15.3294 182.824 2.91339e-06 144.5 0C106.176 -2.91339e-06 69.4221 15.3294 42.3231 42.616C15.2241 69.9025 5.78673e-06 106.911 0 145.5H8.37502C8.37502 109.148 22.7167 74.284 48.2451 48.579C73.7735 22.8739 108.397 8.43298 144.5 8.43298C180.603 8.43299 215.227 22.8739 240.755 48.579C266.283 74.284 280.625 109.148 280.625 145.5H289Z"
										fill="url(#paint0_linear_10578_7909)"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_10578_7909"
											x1="0"
											y1="145.5"
											x2="289"
											y2="145.5"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#002753" />
											<stop offset="1" stop-color="#00A851" />
										</linearGradient>
									</defs>
								</svg>
								<RichText
									allowedFormats={[]}
									tagName={'p'}
									className="technical-text"
									value={engine}
									onChange={(newContent) => setAttributes({ engine: newContent })}
									placeholder="3.5 - v12"
								/>
								<RichText
									allowedFormats={[]}
									tagName={'p'}
									value={subtitleEngine}
									onChange={(newContent) => setAttributes({ subtitleEngine: newContent })}
									placeholder="motor"
								/>
							</div>
							<div className="technical-info">
								<svg xmlns="http://www.w3.org/2000/svg" width="247" height="72" viewBox="0 0 247 72" fill="none">
									<path
										d="M3 69V65.0412C3 65.0412 99.4321 65.1641 149.872 50.5257C193.501 37.8637 239.997 5 239.997 5L242 7.63917C242 7.63917 193.501 41.8225 149.872 54.4845C99.4321 69.1229 3 69 3 69Z"
										fill="url(#paint0_linear_10578_7914)"
										stroke="url(#paint1_linear_10578_7914)"
										stroke-width="6"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_10578_7914"
											x1="3"
											y1="37"
											x2="242"
											y2="37"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#002753" />
											<stop offset="1" stop-color="#00A851" />
										</linearGradient>
										<linearGradient
											id="paint1_linear_10578_7914"
											x1="3"
											y1="37"
											x2="242"
											y2="37"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#002753" />
											<stop offset="1" stop-color="#00A851" />
										</linearGradient>
									</defs>
								</svg>
								<RichText
									allowedFormats={[]}
									tagName={'p'}
									className="technical-text"
									value={horses}
									onChange={(newContent) => setAttributes({ horses: newContent })}
									placeholder="3.497Cc"
								/>
								<RichText
									allowedFormats={[]}
									tagName={'p'}
									value={subtitleHorses}
									onChange={(newContent) => setAttributes({ subtitleHorses: newContent })}
									placeholder="cavalo"
								/>
							</div>
						</div>
						<div className="block">
							<InnerBlocks
								template={[['il/technical-info', { bgColor: 'transparent', variant: 'power_season' }]]}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
