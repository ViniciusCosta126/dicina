import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import ImagePanel from '../../../panels/ImagePanel';
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
			<svg width="1440" height="380" viewBox="0 0 1440 380" fill="none">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M1440 0H0V380H1440V0ZM262.672 76V84V124.227V132.227H254.672H85.6015C82.3474 132.227 79.6628 133.315 77.1569 135.821L77.121 135.857L77.0848 135.892C74.6749 138.242 73.5624 140.875 73.5624 144.266C73.5624 147.645 74.6709 150.357 77.1209 152.823C79.6015 155.226 82.298 156.305 85.6015 156.305H190.992C204.525 156.305 217.025 159.623 228.311 166.323C239.567 172.947 248.553 181.932 255.176 193.188C261.877 204.474 265.195 216.975 265.195 230.507C265.195 244.133 261.88 256.691 255.167 267.992C248.542 279.143 239.568 288.108 228.348 294.819L228.338 294.825L228.328 294.831C217.037 301.538 204.531 304.859 190.992 304.859H25.9296H17.9296V296.859V256.632V248.632H25.9296H189.508C194.639 248.632 198.731 246.932 202.257 243.405C205.915 239.747 207.633 235.592 207.633 230.507C207.633 225.427 205.92 221.351 202.312 217.813L202.257 217.758L202.202 217.703C198.664 214.095 194.588 212.382 189.508 212.382H84.2656C71.8324 212.382 60.294 209.367 49.8189 203.285L49.7747 203.26L49.7309 203.233C39.4922 197.112 31.2701 188.89 25.1492 178.651L25.1325 178.624L25.1162 178.596C19.0152 168.202 16 156.699 16 144.266C16 131.833 19.0152 120.329 25.1162 109.935L25.1229 109.923L25.1297 109.912C31.2514 99.5609 39.4907 91.3104 49.7751 85.2714C60.2547 79.0765 71.8089 76 84.2656 76H254.672H262.672ZM298.779 76H306.779H537.599H545.599V84V124.227V132.227H537.599H356.342V156.305H537.599H545.599V164.305V204.382V212.382H537.599H356.342V240.601C356.342 242.898 357.059 244.666 358.703 246.329C360.349 247.904 362.145 248.632 364.521 248.632H537.599H545.599V256.632V296.859V304.859H537.599H355.021C339.635 304.859 326.238 299.314 315.254 288.444L315.224 288.414L315.194 288.385C304.324 277.4 298.779 264.003 298.779 248.617V84V76ZM641.496 304.859H633.496H591.934H583.934V296.859V84V76H591.934H634.684H638.121L640.486 78.4931L773.043 218.174V84V76H781.043H822.605H830.605V84V296.859V304.859H822.605H780.004H776.569L774.204 302.369L641.496 162.67V296.859V304.859ZM919.229 304.859H911.229H869.666H861.666V296.859V84V76H869.666H912.416H915.853L918.219 78.4931L1050.78 218.174V84V76H1058.78H1100.34H1108.34V84V296.859V304.859H1100.34H1057.74H1054.31L1051.94 302.369L919.229 162.67V296.859V304.859ZM1196.97 304.859H1188.97H1147.4H1139.4V296.859V84V76H1147.4H1190.15H1193.59L1195.96 78.4928L1397.98 291.352L1410.8 304.859H1392.18H1335.47H1332.04L1329.67 302.369L1196.97 162.67V296.859V304.859Z"
					fill="#000000"
				/>
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

	const { imgMobile, imgTablet, imgDesk, img4k } = attributes;

	return (
		<>
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<section className="animated-senna panel">
				<div className="content-wrapper">
					<div className="wrapper-img">
						<picture>
							<source
								media="(min-width:2000px)"
								srcset={img4k.src}
								alt=""
							/>
							<source
								media="(min-width:1024px)"
								srcset={imgDesk.src}
							/>
							<source
								media="(min-width:540px)"
								srcset={imgTablet.src}
							/>
							<img
								src={imgMobile.src}
								alt="olhar-senna"
								class="img"
							/>
						</picture>
					</div>
					<div class="text-wrapper editor">
						<div class="container large-on-mobile">
							<div class="title-wrapper">
								<RichText
									allowedFormats={[]}
									tagName="strong"
									value={attributes.title1}
									onChange={(title1) =>
										setAttributes({ title1: title1 })
									}
								/>
								<RichText
									allowedFormats={[]}
									tagName="strong"
									value={attributes.title2}
									onChange={(title2) =>
										setAttributes({ title2: title2 })
									}
								/>
							</div>
							<div class="from">
								<InnerBlocks
									template={[
										[
											'il/typography',
											{
												content: 'do Brasil',
												extraClass: 'from-text show',
											},
										],
										[
											'il/typography',
											{
												content: 'dos fãs',
												extraClass: 'from-text',
											},
										],
										[
											'il/typography',
											{
												content: 'da Silva',
												extraClass: 'from-text',
											},
										],
										[
											'il/typography',
											{
												content: 'das pistas',
												extraClass: 'from-text',
											},
										],
										[
											'il/typography',
											{
												content:
													'de todas <br> <span>as gerações</span>',
												extraClass: 'from-text',
											},
										],
									]}
									allowedBlocks={['il/typography']}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
