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
			<svg width="800" height="800" viewBox="0 0 16 16">
				<path fill="#000000" d="M14 4V2H0v12h16V4h-2zm-4-1h3v1h-3V3zM6 3h3v1H6V3zm9 10H1V3h4v2h10v8z" />
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

	const { variant, bgColor, gradient, marginM, marginD } = attributes;

	const inlineStyles = `
		.tab-buttons-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.tab-buttons-${randomComponentId} .tab-bar .tab-bar-item {
			background: ${gradient};
		}
		
		@media (min-width: 768px) {
			.tab-buttons-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`tab-buttons ${variant} tab-buttons-${randomComponentId}`}>
				<div className="tab-buttons-content">
					<InnerBlocks
						allowedBlocks={['il/button']}
						template={[
							[
								'il/button',
								{
									content: 'Mais Recentes',
									variant: 'tab-button',
									action: 'sort-carousel-newest',
									extraClass: 'active',
								},
							],
							[
								'il/button',
								{
									content: 'Mais Antigos',
									variant: 'tab-button',
									action: 'sort-carousel-oldest',
								},
							],
						]}
					/>
				</div>

				<div className="tab-bar">
					<span className="tab-bar-item"></span>
				</div>
			</div>
		</>
	);
}
