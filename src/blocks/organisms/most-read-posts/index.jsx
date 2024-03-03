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
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);
	const { variant, marginM, marginD } = attributes;

	const inlineStyles = `
		.most-read-posts-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.most-read-posts-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const MostReadPost = () => {
		if (variant === 'default') {
			return <InnerBlocks template={[['il/post-listing-header']]} />;
		} else if (variant === 'journey') {
			return <></>;
		}
	};
	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className="container">
				<div className={`most-read-posts ${variant} most-read-posts-${randomComponentId}`}>
					<MostReadPost />
					<p className="info-panel">%% AQUI VÃO APARECER OS POSTS MAIS LIDOS, CAROUSEL COM UMA LISTA DOS POSTS %%</p>
				</div>
			</div>
		</>
	);
}
