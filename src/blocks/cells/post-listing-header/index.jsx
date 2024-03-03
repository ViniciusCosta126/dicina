import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

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
			<svg width="800" height="800" viewBox="0 0 1920 1920">
				<path
					fill-rule="evenodd"
					d="M1740 0c99.24 0 180 80.76 180 180v1560c0 99.24-80.76 180-180 180H180c-99.24 0-180-80.76-180-180V180C0 80.76 80.76 0 180 0h1560Zm-420 1200h480V720h-480v480Zm480 540v-420h-480v480h420c33 0 60-27 60-60ZM720 1200h480V720H720v480Zm0 600h480v-480H720v480Zm-600-600h480V720H120v480Zm480 600v-480H120v420c0 33 27 60 60 60h420Z"
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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, auxTitle, bigAux, middleSize, title, titleColor, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.post-listing-header-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.post-listing-header-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const Text = () => {
		let auxAttributes,
			titleAttributes = {};

		if (variant === 'default') {
			auxAttributes = {
				content: auxTitle,
				tag: 'strong',
				manualSizes: true,
				manualSizeM: 32,
				manualSizeD: 40,
				color: '#002753',
				bgColor: 'transparent',
				textWeight: 'medium',
				marginM: 8,
				marginD: 16,
				extraClass: 'aux-title',
			};
			titleAttributes = {
				content: title,
				tag: 'h2',
				fontFamily: 'helveticaneue',
				manualSizes: true,
				manualSizeM: 32,
				manualSizeD: 50,
				widthStrokeM: 2,
				widthStrokeD: 1.5,
				color: 'linear-gradient(0deg, #00A851 0%, #00A851 10%,#1832D7 100%)',
				bgColor: 'transparent',
				extraClass: 'title',
			};
		} else if (variant === 'left-line') {
			auxAttributes = {
				content: auxTitle,
				tag: 'strong',
				manualSizes: true,
				manualSizeM: 14,
				manualSizeD: 20,
				color: '#ffffff',
				bgColor: 'transparent',
				textWeight: 'medium',
				marginM: 8,
				marginD: 24,
				extraClass: 'aux-title',
			};
			titleAttributes = {
				content: title,
				tag: 'h2',
				manualSizes: true,
				manualSizeM: 20,
				manualSizeD: 30,
				color: '#ffffff',
				bgColor: 'transparent',
				textWeight: 'medium',
				extraClass: 'title',
			};
		} else if (variant === 'section-title') {
			let auxSizes,
				titleSizes = {};

			if (bigAux) {
				auxSizes = {
					manualSizeM: 32,
					manualSizeD: 50,
					marginM: 5,
					marginD: 0,
					extraClass: 'aux-title big',
				};
			} else if (middleSize) {
				auxSizes = {
					manualSizeM: 24,
					manualSizeD: 32,
					marginM: 5,
					marginD: 0,
					extraClass: 'aux-title middle',
				};
			} else {
				auxSizes = {
					manualSizeM: 20,
					manualSizeD: 24,
					marginM: 8,
					marginD: 16,
					extraClass: 'aux-title',
				};
			}

			auxAttributes = {
				content: auxTitle,
				tag: 'strong',
				manualSizes: true,
				...auxSizes,
				color: '#ffffff',
				bgColor: 'transparent',
				textWeight: 'medium',
			};
			titleAttributes = {
				content: title,
				tag: 'h2',
				fontFamily: 'sennasans sennasans-stroke',
				manualSizes: true,
				manualSizeM: 32,
				manualSizeD: 52,
				widthStrokeM: 2.5,
				widthStrokeD: 5,
				color: titleColor,
				bgColor: 'transparent',
				extraClass: 'title',
			};
		}

		return (
			<InnerBlocks
				template={[
					['il/typography', { ...auxAttributes }],
					['il/typography', { ...titleAttributes }],
				]}
			/>
		);
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`post-listing-header ${variant} post-listing-header-${randomComponentId}`}>
				<Text />
			</div>
		</>
	);
}
