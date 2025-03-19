import { InnerBlocks, RichText } from '@wordpress/block-editor';
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
	icon: 'email',
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

	const { variant, bgImage, marginM, marginD } = attributes;

	const inlineStyles = `
		.community-${randomComponentId} {
			background: linear-gradient(180deg, #002753 0%, rgba(0, 39, 83, 0) 100%), url(${bgImage.src}) no-repeat;
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.community-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`community ${variant} community-${randomComponentId}`}>
				<div className="container">
					<div className="community__content">
						<RichText
							allowedFormats={[]}
							className="community__title"
							placeholder="Texto principal"
							value={attributes.textoPrincipal.normal}
							onChange={(title) =>
								setAttributes({
									textoPrincipal: {
										...attributes.textoPrincipal,
										normal: title,
									},
								})
							}
						/>
						<RichText
							allowedFormats={[]}
							className="community__title--helvetica"
							placeholder="Texto principal Helvetica"
							value={attributes.textoPrincipal.sennaSans}
							onChange={(title) =>
								setAttributes({
									textoPrincipal: {
										...attributes.textoPrincipal,
										sennaSans: title,
									},
								})
							}
						/>
						<hr className="divider" />
						<RichText
							tagName="p"
							className="community__description"
							value={attributes.subtitle}
							onChange={(subtitle) => setAttributes({ subtitle: subtitle })}
							placeholder="Texto auxiliar"
						/>
					</div>

					<form className="community__form" action="">
						<InnerBlocks
							template={[
								[
									'il/input',
									{
										variant: 'email',
										placeholder: 'digite seu email',
										errorMessage: 'E-mail inválido',
										name: 'email',
										ariaLabel: 'E-mail',
										required: true,
										checkboxLabel: '',
									},
								],
								[
									'il/input',
									{
										variant: 'textarea',
										placeholder: 'escreva sua sugestão',
										errorMessage: '',
										name: 'lead_sg',
										ariaLabel: 'Sugestão',
										required: true,
										checkboxLabel: 'Máximo 200 caracteres',
									},
								],
								[
									'il/input',
									{
										variant: 'checkbox',
										name: 'lgpd',
										ariaLabel: 'LGPD',
										required: true,
									},
								],
								[
									'il/input',
									{
										variant: 'submit',
										name: '',
										ariaLabel: '',
										checkboxLabel: '',
										buttonLabel: 'Envie sua sugestão',
									},
								],
							]}
						/>
					</form>
				</div>
			</section>
		</>
	);
}
