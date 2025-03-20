import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

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
		.team-${randomComponentId} {
			background: ${bgColor};
			padding: ${marginM}px 0;
		}
		.team p{
			font-family: poppins;
		}
		
		
		@media (min-width: 768px) {
			.team-${randomComponentId} {
				padding: ${marginD}px 0;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`team ${variant} team-${randomComponentId}`}>
				<div class="team__container  container">
					<div class="team__left">
						<RichText
							tagName="p"
							className="team__subtitle"
							value={attributes.subtitle}
							onChange={(subtitle) => setAttributes({ subtitle: subtitle })}
						/>
						<RichText
							tagName="p"
							className="team__title"
							value={attributes.title}
							onChange={(title) => setAttributes({ title: title })}
						/>
					</div>
					<hr></hr>
					<div class="team__right">
						<RichText
							tagName="p"
							className="team__content"
							value={attributes.content}
							onChange={(content) => setAttributes({ content: content })}
						/>
						<InnerBlocks
							template={[
								[
									'il/button',
									{
										content: 'Acompanhe a página',
										variant: 'link',
										addCustomColor: true,
										color: '#ffff',
										bgColor: 'transparent',
										colorHover: '#ffff',
										bgColorHover: 'transparent',
									},
								],
							]}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
