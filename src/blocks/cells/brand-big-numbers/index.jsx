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
		<svg width="64" height="64" fill="none" viewBox="0 0 25 25">
			<g fill="#101112">
				<path fill-rule="evenodd" d="M21.017 17.634H3.837v-1.2h17.18v1.2Z" clip-rule="evenodd" />
				<path d="M7.098 13.397V7.508H5.741L3.836 8.782v1.309l1.817-1.206h.088v4.512h-1.9v1.157H8.9v-1.157H7.098ZM9.818 9.632v.03h1.289v-.035c0-.674.469-1.133 1.167-1.133.684 0 1.128.4 1.128 1.011 0 .474-.25.845-1.211 1.807l-2.295 2.27v.972h4.966v-1.167H11.78v-.088l1.377-1.313c1.191-1.143 1.596-1.802 1.596-2.574 0-1.22-.981-2.046-2.436-2.046-1.48 0-2.5.918-2.5 2.266ZM17.67 11.463h.84c.81 0 1.332.405 1.332 1.035 0 .62-.512 1.016-1.318 1.016-.757 0-1.265-.381-1.314-.982h-1.284c.064 1.319 1.099 2.163 2.637 2.163 1.577 0 2.656-.854 2.656-2.104 0-.933-.566-1.558-1.518-1.67v-.088c.771-.156 1.245-.766 1.245-1.596 0-1.114-.972-1.87-2.403-1.87-1.489 0-2.431.81-2.48 2.133h1.235c.044-.62.508-1.015 1.202-1.015.707 0 1.157.37 1.157.957 0 .59-.46.976-1.162.976h-.826v1.045Z" />
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
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.brand-big-numbers-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.brand-big-numbers-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`brand-big-numbers ${variant} brand-big-numbers-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								tag: 'p',
								manualSizes: true,
								manualSizeM: 32,
								manualSizeD: 40,
								color: '#fff',
								bgColor: 'transparent',
								fontFamily: 'helveticaneue',
								textAlign: 'align-center',
								content: '+36mi',
							},
						],
						[
							'il/typography',
							{
								tag: 'p',
								manualSizes: true,
								manualSizeM: 16,
								manualSizeD: 22,
								color: '#fff',
								bgColor: 'transparent',
								textWeight: 'weight-medium',
								content: 'de alunos impactados',
							},
						],
					]}
				/>
			</div>
		</>
	);
}
