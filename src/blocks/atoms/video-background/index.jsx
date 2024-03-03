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
	const { cardimg, cardVideo } = attributes;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div className={`video-background video-background-${randomComponentId}`}>
				{cardVideo.src ? (
					<video muted poster={cardVideo.poster}>
						<source src={cardVideo.src} type={cardVideo.type} />
					</video>
				) : (
					<img loading="lazy" src={cardimg.src} alt={cardimg.alt}></img>
				)}
			</div>
		</>
	);
}
