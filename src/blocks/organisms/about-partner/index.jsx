import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: (
		<svg width="800" height="800" fill="none" viewBox="0 0 15 15">
			<path
				fill="#000"
				fill-rule="evenodd"
				d="M14 11.0001V4.00006H1v7.00004h13Zm1-7.00004v7.00004c0 .5522-.4477 1-1 1H1c-.55229 0-1-.4478-1-1V4.00006c0-.55228.44771-1 1-1h13c.5523 0 1 .44772 1 1ZM2 5.25c0-.13807.11193-.25.25-.25h3.5c.13807 0 .25.11193.25.25v4.5c0 .13807-.11193.25-.25.25h-3.5C2.11193 10 2 9.88807 2 9.75v-4.5ZM7.5 7c-.27614 0-.5.22386-.5.5s.22386.5.5.5h3c.2761 0 .5-.22386.5-.5s-.2239-.5-.5-.5h-3ZM7 9.5c0-.27614.22386-.5.5-.5h5c.2761 0 .5.22386.5.5s-.2239.5-.5.5h-5c-.27614 0-.5-.22386-.5-.5ZM7.5 5c-.27614 0-.5.22386-.5.5s.22386.5.5.5h4c.2761 0 .5-.22386.5-.5s-.2239-.5-.5-.5h-4Z"
				clip-rule="evenodd"
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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, hasTestimony, marginM, marginD } = attributes;

	const inlineStyles = `
		.about-partner-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.about-partner-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const BlockContent = () => {
		let blocks = [];

		if (hasTestimony) {
			blocks = [
				['il/partner-item', { variant: 'image' }],
				['il/partner-item', { variant: 'about' }],
				['il/partner-item', { variant: 'testimony' }],
			];
		} else {
			blocks = [
				['il/partner-item', { variant: 'image' }],
				['il/partner-item', { variant: 'about' }],
			];
		}

		if (variant === 'default') {
			return (
				<InnerBlocks
					template={[
						[
							'il/carousel',
							{
								variant: 'about-partner-slide',
								allowed_blocks: ['il/partner-item'],
								bgColor: 'transparent',
								navigation: true,
								navigationDesktop: true,
								speed: 400,
								perView: 1,
								perView480: 1,
								destroy: true,
								destroyIn: 960,
							},
							[...blocks],
						],
					]}
					renderAppender={false}
				/>
			);
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`about-partner ${variant} about-partner-${randomComponentId} wp-editor`}>
				<BlockContent />
			</div>
		</>
	);
}
