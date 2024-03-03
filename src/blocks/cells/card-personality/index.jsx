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
		<svg width="200" height="200" viewBox="0 0 24 24">
			<path d="M6 12h1v1h6v-1h1v-1h1V5h-1V4h-1V3H7v1H6v1H5v6h1v1zm1-5h1V6h1V5h2v1h1v1h1v2h-1v1h-1v1H9v-1H8V9H7V7zM17 15h-1v-1H4v1H3v1H2v5h2v-3h1v-1h1v-1h8v1h1v1h1v3h2v-5h-1zM21 5v1h-1v1h-1v1h-1V7h-2v2h1v1h3V9h1V8h1V7h1V5z" />
		</svg>
	),
	parent: ['il/testimony-of-personalities'],
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

	const { variant, hasVideo, smallImage, titleCard } = attributes;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div className={`card-personality ${variant} wp-editor card-personality-${randomComponentId}`}>
				<div className="card-personality__content">
					<img src={smallImage.src} alt={smallImage.alt} />
				</div>

				{hasVideo ? (
					<svg className="card-personality__play" viewBox="0 0 24 24" fill="none">
						<path
							d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
							fill="#000000"
						></path>
					</svg>
				) : (
					<div className="title-card-container">
						<p>{titleCard}</p>
					</div>
				)}
			</div>
		</>
	);
}
