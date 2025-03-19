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

	const { bgImage, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.contact-forms-${randomComponentId} {
			background-color: ${bgColor};
            background-image: url(${bgImage.src});
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.contact-forms-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`contact-forms contact-forms-${randomComponentId}`}>
				<div className="container">
					<div class="contact-forms__content">
						<div className="wrapper__title">
							<RichText
								allowedFormats={[]}
								className="contact-forms__title"
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
								className="contact-forms__title contact-forms__title--senna-sans"
								placeholder="Texto principal Senna Sans"
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
						</div>

						<RichText
							value={attributes.subtitle}
							className="contact-forms__description"
							onChange={(subtitle) => setAttributes({ subtitle: subtitle })}
							placeholder="Texto auxiliar"
						/>
					</div>

					<form className="contact-forms__form" action="">
						<InnerBlocks
							template={[
								[
									'il/input',
									{
										variant: 'select',
										placeholder: 'Selecione um assunto',
										errorMessage: 'assunto inválido',
										name: 'assunto',
										ariaLabel: 'assunto',
										required: true,
										checkboxLabel: 'Comercial, Institucional',
									},
								],
								[
									'il/input',
									{
										variant: 'text',
										placeholder: 'nome completo',
										errorMessage: 'Nome incompleto',
										name: 'nome completo',
										ariaLabel: 'nome completo',
										required: true,
										checkboxLabel: '',
										regexValidate: '^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$',
									},
								],
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
										placeholder: 'escreva aqui sua mensagem',
										errorMessage: '',
										name: 'mensagem',
										ariaLabel: 'escreva aqui sua mensagem',
										required: true,
										checkboxLabel: 'Máximo 200 caracteres',
									},
								],
								[
									'il/input',
									{
										variant: 'submit',
										name: '',
										ariaLabel: '',
										checkboxLabel: '',
										buttonLabel: 'Enviar mensagem',
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
