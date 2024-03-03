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
			<g fill="#000" fill-rule="evenodd" clip-rule="evenodd">
				<path d="M7.5 5.25h9v7.5H21V18H3v-6.75h4.5v-6ZM9 6.75v6H4.5v3.75h15v-2.25H15v-7.5H9Z" />
				<path d="M10.5 8.25h2.25v4.5h.75v1.5h-3v-1.5h.75v-3h-.75v-1.5Z" />
			</g>
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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, hasAuxText, marginM, marginD } = attributes;

	const inlineStyles = `
		.podium-item-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.podium-item-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const BlockContent = () => {
		let number,
			title,
			text = {};

		number = {
			tag: 'h2',
			content: '1º',
			sizeM: 'title-1-m',
			sizeD: 'title-3-d',
			color: '#fff',
			bgColor: 'transparent',
			widthStrokeM: 2,
			widthStrokeD: 2,
			fontFamily: 'helveticaneue',
		};
		title = {
			tag: 'p',
			content: 'Ayrton Senna',
			manualSizes: true,
			manualSizeM: 24,
			manualSizeM: 26,
			color: '#fff',
			textWeight: 'weight-bold',
			bgColor: 'transparent',
		};
		text = {
			tag: 'p',
			content: '18m 07.14s',
			manualSizes: true,
			manualSizeM: 18,
			manualSizeM: 20,
			color: '#fff',
			bgColor: 'transparent',
		};

		if (hasAuxText) {
			return (
				<InnerBlocks
					template={[
						['il/typography', { ...number }],
						[
							'il/wrapper',
							{ extraClass: 'box-info' },
							[
								['il/typography', { ...title }],
								['il/typography', { ...text }],
							],
						],
					]}
				/>
			);
		} else {
			return (
				<InnerBlocks
					template={[
						['il/typography', { ...number }],
						['il/wrapper', { extraClass: 'box-info' }, [['il/typography', { ...title }]]],
					]}
				/>
			);
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`podium-item ${variant} wp-editor podium-item-${randomComponentId}`}>
				<svg viewBox="0 0 404 115" fill="none" className="border-linear">
					<path
						d="M1.5 1.5H377.737L402.5 35.4885V113.5H1.5V1.5Z"
						fill="#002753"
						fill-opacity="0.2"
						stroke="url(#paint0_linear_9575_31181)"
						stroke-width="3"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_9575_31181"
							x1="3.76254e-07"
							y1="57.4999"
							x2="404"
							y2="57.4999"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#00A851" />
							<stop offset="1" stop-color="#1832D7" />
						</linearGradient>
					</defs>
				</svg>

				<BlockContent />
			</div>
		</>
	);
}
