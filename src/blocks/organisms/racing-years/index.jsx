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
			<svg fill="#000000" viewBox="0 0 512 512">
				<g stroke-width="0"></g>
				<g stroke-linecap="round" stroke-linejoin="round"></g>
				<g>
					<title></title>
					<path d="M448.24,140.92l-.77-.77c-19.39-19.2-39.75-31.51-62.15-37.62v0l-1.8-.47h0l-2.06-.53v0c-17.63-4.21-36.52-4.7-59-1.51v0l-2.73.42h0l-1.43.21v0c-15.69,2.48-31.56,6.39-46.92,10.19-4.94,1.22-9.88,2.44-14.81,3.62h0c-20,4.76-41.36,9.16-62.57,9.16h0c-21.56,0-40.81-4.58-58.74-14l3.58-20.32A8,8,0,1,0,123,86.54L63.75,422.68A8,8,0,0,0,70.24,432a7.34,7.34,0,0,0,1.39.13,8,8,0,0,0,7.87-6.62l24.33-137.95c17.08,15.13,35,25.12,54.48,30.43v0l1.79.46h0l2.08.53v0a135,135,0,0,0,31.66,3.59,194.88,194.88,0,0,0,27.36-2.07v0l2.73-.41h0l1.42-.21v0c15.69-2.48,31.56-6.39,46.92-10.19,4.94-1.22,9.88-2.44,14.81-3.61h0c20-4.76,41.35-9.16,62.57-9.16h0c22.89,0,43.19,5.16,62.05,15.76l2.43,1.37.52-2.74c3.74-19.76,7.48-39.28,11.11-58l0-.13c3.72-19.19,7.45-38.14,11.08-56.32l0-.15c3.72-18.66,7.45-37,11.08-54.66ZM348,292.87c-20,.22-40.05,4.15-58.88,8.57,0-.1,0-.19,0-.28q5.19-31.52,10.36-62.94c16.48-3.58,37.66-7.31,58.93-6.05-.22,1.29-.45,2.59-.67,3.89l-.42,2.39q-.48,2.81-1,5.62l-.36,2.09C353.39,261.45,350.7,277.09,348,292.87Zm-161.71-111,.84-4.88c.16-.88.31-1.75.46-2.64.42-2.43.84-4.88,1.26-7.33a1.06,1.06,0,0,0,0-.19c2.22-12.88,4.47-26,6.73-39.19,20-.21,40-4.15,58.88-8.56l0,.15q-5.19,31.58-10.38,63.06c-16.49,3.58-37.66,7.31-58.93,6.05l.48-2.79C185.87,184.28,186.08,183.06,186.29,181.83Zm109.73,53h0c-8.25,1.84-16.6,3.89-24.69,5.89-11.2,2.77-22.75,5.62-34.14,7.89q5.2-31.44,10.41-63h0c8.25-1.84,16.6-3.89,24.69-5.89,11.2-2.77,22.75-5.62,34.15-7.89q-5.22,31.44-10.42,63ZM180.47,192c-.13.75-.25,1.49-.38,2.24-.28,1.58-.55,3.17-.83,4.76-.17,1-.33,1.91-.5,2.87-.29,1.69-.59,3.39-.88,5.09l-.21,1.18c-2.55,14.68-5.09,29.2-7.58,43.38-20-3.54-38.17-11.82-55.46-25.24l9.42-53.45A125.09,125.09,0,0,0,180.47,192Zm242,57.54a125.52,125.52,0,0,0-59.3-21c.11-.63.21-1.25.32-1.88q.48-2.72.94-5.41l.27-1.53c.36-2.1.73-4.21,1.09-6.3l.06-.34q1.44-8.26,2.86-16.43.54-3,1.06-6.06l0-.1c.45-2.56.89-5.11,1.34-7.65.05-.3.1-.6.16-.9l1.23-7,.08-.43c.32-1.83.64-3.64.95-5.45,21.41,3.8,40.81,13.05,59.22,28.24C429.37,214.13,425.91,231.71,422.45,249.52ZM380.73,105.46q-1.17,6.5-2.34,13.12l-.08.43q-2.06,11.51-4.13,23.29c-.05.24-.09.49-.13.74q-1.87,10.58-3.76,21.3h0v0c-17.22-2.51-36.09-1.73-59,2.43q1.9-11.47,3.8-22.93l1.38-8.27c.39-2.37.78-4.73,1.18-7.1q2-12.18,4.05-24.34C344.37,100.82,363.21,101.24,380.73,105.46ZM162.89,315q1.19-6.6,2.38-13.3l0-.27c2.65-14.86,5.34-30,8-45.34h.13c2,.3,4.08.54,6.16.75l.42,0c4.45.42,9,.65,13.74.65a215.59,215.59,0,0,0,38.51-3.87q-.93,5.56-1.85,11.13-4.27,25.82-8.56,51.52C199.25,319.65,180.41,319.23,162.89,315Z"></path>
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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, bgColorDegrade, bgImage, title, titleBreakeLine, marginM, marginD } = attributes;

	const inlineStyles = `
		.racing-years-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.racing-years-${randomComponentId} .racing-years-image-background::after {
			background: ${bgColorDegrade};
		}

		.racing-years-${randomComponentId} .racing-years-content {
			background: ${bgColor};
		}
		
		@media (min-width: 768px) {
			.racing-years-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`racing-years ${variant} wp-editor racing-years-${randomComponentId}`}>
				<picture className={`racing-years-image-background`}>
					<img src={bgImage.src} alt={bgImage.alt} />
				</picture>

				<div className="container">
					<div className="racing-years-content">
						<InnerBlocks
							template={[
								[
									'il/typography',
									{
										content: title,
										tag: 'h2',
										fontFamily: 'helveticaneue',
										manualSizes: true,
										manualSizeM: 32,
										manualSizeD: 53,
										color: 'linear-gradient(0deg,#E4CE36 0%,#E0CB39 13.21%,#BCB152 26.23%,#7A8381 50.19%,#3551B2 75.19%,#0A33D0 98.96%)',
										bgColor: '#002753',
										textAlign: 'align-left-right',
										marginM: 40,
										marginD: 72,
										extraClass: `racing-years-content__title ${titleBreakeLine ? '' : 'not-break-line'}`,
									},
								],
								['il/scrollable-list', { variant: 'links' }],
							]}
							templateLock={true}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
