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
		.vagas-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.vagas-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`vagas ${variant} wp-editor vagas-${randomComponentId}`}>
				<div className="container">
					<InnerBlocks
						template={[
							[
								'il/wrapper',
								{ isLocked: false },
								[
									[
										'il/typography',
										{
											content: 'Coneça as vagas disponiveis',
											tag: 'h2',
											fontFamily: 'helveticaneue',
											manualSizes: true,
											manualSizeD: 42,
											manualSizeM: 32,
											extraClass: 'title',
											color: '#fff',
											textWeight: 'weight-bold',
										},
									],
									[
										'il/typography',
										{
											content: 'Venha fazer parte da Dicina',
											tag: 'p',
											fontFamily: 'helveticaneue',
											manualSizes: true,
											manualSizeD: 24,
											manualSizeM: 18,
											extraClass: 'subtitle',
											color: '#fff',
										},
									],
									[
										'il/typography',
										{
											content: 'Vagas abertas:',
											tag: 'h3',
											fontFamily: 'helveticaneue',
											manualSizes: true,
											manualSizeD: 38,
											manualSizeM: 26,
											extraClass: 'title-vagas',
											color: '#fff',
											textWeight: 'weight-medium',
										},
									],
								],
							],
						]}
					/>

					<div className='aviso'>
						%% Aqui vão ficar as vagas que estão disponiveis no painel %%
					</div>
				</div>
			</div>
		</>
	);
}
