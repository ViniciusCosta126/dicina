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
	icon: {
		src: (
			<svg viewBox="0 0 512 512" version="1.1" fill="#000000">
				<g id="SVGRepo_iconCarrier">
					<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<g id="Combined-Shape" fill="#000000" transform="translate(64.000000, 64.000000)">
							<path d="M384,64 L384,384 L64,384 L64,64 L384,64 Z M341.333333,106.666667 L106.666667,106.666667 L106.666667,341.333333 L341.333333,341.333333 L341.333333,106.666667 Z M320,1.42108547e-14 L320,42.6666667 L42.666,42.666 L42.6666667,320 L1.42108547e-14,320 L1.42108547e-14,1.42108547e-14 L320,1.42108547e-14 Z M298.666667,234.666667 L298.666667,277.333333 L149.333333,277.333333 L149.333333,234.666667 L298.666667,234.666667 Z M298.666667,149.333333 L298.666667,192 L149.333333,192 L149.333333,149.333333 L298.666667,149.333333 Z"></path>
						</g>
					</g>
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

	const { variant, bgColor, bgColorDegrade, bgColorDegradeDesk, bgImageMobile, bgImageDesk, marginM, marginD } = attributes;

	const inlineStyles = `
		.formula-season-details-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.formula-season-details-${randomComponentId} .formula-season-details-background::after {
			background: ${bgColorDegrade};
        }
		
		@media (min-width: 768px) {
			.formula-season-details-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}

			.formula-season-details-${randomComponentId} .formula-season-details-background::after {
				background: ${bgColorDegradeDesk};
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`formula-season-details ${variant} wp-editor formula-season-details-${randomComponentId}`}>
				<picture className={`formula-season-details-background`}>
					<source srcset={bgImageDesk.src} media="(min-width: 768px)" />
					<img src={bgImageMobile.src} alt={bgImageMobile.alt} />
				</picture>

				<div className="container">
					<div className="formula-season-details-content">
						<InnerBlocks
							template={[
								[
									'il/post-listing-header',
									{
										variant: 'section-title',
										auxTitle: 'Fórmula 3',
										title: 'Temporada 0000',
										bgColor: 'transparent',
									},
								],
								[
									'il/tabs',
									{
										allowed_blocks: ['il/scrollable-list', 'il/testimony', 'il/podium'],
									},
								],
							]}
							renderAppender={false}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
