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
		.vaga-form-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.vaga-form-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`vaga-form ${variant} wp-editor vaga-form-${randomComponentId}`}>
				<form action="" className='form'>
					<fieldset className='wrapper-input'>
						<label htmlFor="">Seu nome</label>
						<input type="text" name="nome" id="nome" placeholder="Digite seu nome" />
					</fieldset>
					<fieldset className='wrapper-input'>
						<label htmlFor="">Email</label>
						<input type="email" name="emaiç" id="emaiç" placeholder="Digite seu Email" />
					</fieldset >
					<fieldset className='wrapper-input'>
						<label htmlFor="">Seu telefone</label>
						<input type="text" name="telefone" id="telefone" placeholder="Digite seu telefone" />
					</fieldset>
					<fieldset className='wrapper-input'>
						<label htmlFor="">Vaga desejada</label>
						<select name="vaga" id="vaga">
							<option value="teste">teste</option>
						</select>
					</fieldset>
					<fieldset className='wrapper-input'>
						<label htmlFor="Anexar currículo (PDF até 5MB)"></label>
						<input type="file" name="curriculo" id="curriculo" />
					</fieldset>
				</form>
			</div>
		</>
	);
}
