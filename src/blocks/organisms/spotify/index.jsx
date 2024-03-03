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
	icon: 'spotify',
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
		.spotify-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.spotify-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`spotify ${variant} wp-editor spotify-${randomComponentId}`}>
				<div className="container">
					<InnerBlocks
						template={[
							[
								'il/wrapper',
								{ extraClass: 'container-title' },
								[
									[
										'il/typography',
										{
											tag: 'p',
											manualSizes: true,
											manualSizeM: 20,
											manualSizeD: 32,
											color: '#fff',
											bgColor: 'transparent',
											content: 'TOP PICKS DO',
											extraClass: 'aux-title',
											textWeight: 'weight-medium',
										},
									],
									[
										'il/typography',
										{
											tag: 'h2',
											manualSizes: true,
											manualSizeM: 28,
											manualSizeD: 64,
											widthStrokeM: 1,
											widthStrokeD: 2,
											fontFamily: 'helveticaneue',
											content: 'Ayrton',
											color: 'linear-gradient(0deg,#00A851 0%,#1832D7 100%)',
											extraClass: 'title',
										},
									],
								],
							],
						]}
					/>
					<h1>%% AQUI VAI FICAR O SPOTIFY %%</h1>
				</div>
			</div>
		</>
	);
}
