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

	const {
		buttonLabel,
		variant,
		required,
		bgColor,
		marginM,
		marginD,
		name,
		placeholder,
		ariaLabel,
		regexValidate,
		errorMessage,
		checkboxLabel,
		type,
	} = attributes;
	const requiredHtml = required ? 'required' : '';
	const inlineStyles = `
		.input-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.input-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>
			{variant == 'text' && (
				<label className={`input__label ${name}_input_label input-${randomComponentId}`} aria-label={`${ariaLabel}`}>
					<input
						class="input__text"
						placeholder={`${placeholder}`}
						type="text"
						aria-label={`${ariaLabel}`}
						name={`${name}`}
						error-msg={`${errorMessage}`}
						pattern={`${regexValidate}`}
						requiredHtml
					/>
					<span class="alert-msg"></span>
				</label>
			)}
			{variant == 'email' && (
				<label className={`input ${name}_input_label input-${randomComponentId}`} aria-label={`${ariaLabel}`}>
					<input
						class="input__text"
						placeholder={`${placeholder}`}
						type="email"
						aria-label={`${ariaLabel}`}
						name={`${name}`}
						error-msg={`${errorMessage}`}
						pattern={`${regexValidate}`}
						requiredHtml
					/>
					<span class="alert-msg"></span>
				</label>
			)}
			{variant == 'checkbox' && (
				<div
					className={`input__label custom-checkbox ${name}_input_label input-${randomComponentId}`}
					aria-label={`${ariaLabel}`}
				>
					<input
						class="wp-editor"
						type="checkbox"
						aria-label={`${ariaLabel}`}
						name={`${name}`}
						error-msg={`${errorMessage}`}
						requiredHtml
					/>
					<span class="alert-msg"></span>
					<RichText
						value={checkboxLabel}
						tagName="p"
						placeholder="Li e concordo com as Políticas de Privacidade"
						onChange={(newContent) => setAttributes({ checkboxLabel: newContent })}
					/>
				</div>
			)}
			{variant == 'textarea' && (
				<label
					className={`input__label wrapper__textarea ${name}_input_label input-${randomComponentId}`}
					aria-label={`${ariaLabel}`}
				>
					<textarea
						class="input__text"
						rows="5"
						placeholder={`${placeholder}`}
						aria-label={`${ariaLabel}`}
						name={`${name}`}
						error-msg={`${errorMessage}`}
						pattern={`${regexValidate}`}
						requiredHtml
					></textarea>
					<RichText
						allowedFormats={['core/bold', 'core/italic', 'core/link']}
						value={checkboxLabel}
						tagName="span"
						placeholder="Máximo 200 caracteres"
						className="textarea__info"
						onChange={(newContent) => setAttributes({ checkboxLabel: newContent })}
					/>
					<span class="alert-msg"></span>
				</label>
			)}
			{variant == 'submit' && (
				<RichText
					allowedFormats={['core/bold', 'core/italic', 'core/link']}
					value={buttonLabel}
					tagName="p"
					className="submit__form__button"
					onChange={(newContent) => setAttributes({ buttonLabel: newContent })}
				/>
			)}

			{variant == 'select' && (
				<label
					className={`input__label  custom-select ${name}_input_label input-${randomComponentId}`}
					aria-label={`${ariaLabel}`}
				>
					<span class="alert-msg"></span>
					<RichText
						value={checkboxLabel}
						className="input__text"
						tagName="p"
						placeholder="Opção1, Opção2, Opção3"
						onChange={(newContent) => setAttributes({ checkboxLabel: newContent })}
					/>
				</label>
			)}
		</>
	);
}
