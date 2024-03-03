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
	icon: 'format-quote',
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
		.brand-description-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.brand-description-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`brand-description ${variant} brand-description-${randomComponentId}`}>
				<div className="container default">
					<InnerBlocks
						template={[
							[
								'il/testimony',
								{
									content:
										'Um movimento que inspira um estilo de vida, motivando pessoas no mundo todo a buscarem sua verdade. Nos posicionamos como agentes da mudança que impulsiona pessoas a encontrarem seu chamado descobrindo o extraordinário em ações rotineiras.',
									textColor: '#fff',
									svgColor: '#EBC535',
								},
							],
						]}
					/>

					<div class="img-wrapper">
						<div class="rect"></div>

						<picture>
							<source
								media="(min-width:1024px)"
								srcset="/wp-content/themes/Template-blocks/images/logo-branco-desk.png"
							/>
							<img class="img" src="/wp-content/themes/Template-blocks/images/logo-branco.png" />
						</picture>
					</div>
				</div>
			</div>
		</>
	);
}
