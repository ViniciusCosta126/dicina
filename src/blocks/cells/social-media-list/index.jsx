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
	icon: 'admin-site',
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
		.social-media-list-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.social-media-list-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const templteUri = '/wp-content/themes/Template-blocks';

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`social-media-list ${variant} wp-editor social-media-list-${randomComponentId}`}>
				<InnerBlocks
					allowedBlocks={['il/social-icon']}
					template={[
						['il/social-icon', { icon: { src: 'https://placehold.co/45x45' } }],
						['il/social-icon', { icon: { src: 'https://placehold.co/45x45' } }],
						['il/social-icon', { icon: { src: 'https://placehold.co/45x45' } }],
						['il/social-icon', { icon: { src: 'https://placehold.co/45x45' } }],
					]}
				/>
			</div>
		</>
	);
}
