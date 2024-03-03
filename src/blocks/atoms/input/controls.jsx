import { Panel, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, placeholder, errorMessage, regexValidate, name, required } = attributes;

	const variants = [
		{ label: 'Texto', value: 'text' },
		{ label: 'E-mail', value: 'email' },
		{ label: 'Área de texto', value: 'textarea' },
		{ label: 'Checkbox', value: 'checkbox' },
		{ label: 'Enviar (Input)', value: 'submit' },
		{ label: 'Enviar (Button)', value: 'submit-button' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
					/>
				</PanelBody>
				<PanelBody title="Mensagens do input" initialOpen={true}>
					<TextControl label="Nome" type="String" value={name} onChange={(value) => setAttributes({ name: value })} />
					<TextControl
						label="Placeholder"
						type="String"
						value={placeholder}
						onChange={(value) => setAttributes({ placeholder: value })}
					/>
					<TextControl
						label="Regex para validação"
						type="String"
						value={regexValidate}
						onChange={(value) => setAttributes({ regexValidate: value })}
					/>
					<TextControl
						label="Mensagem de erro"
						type="String"
						value={errorMessage}
						onChange={(value) => setAttributes({ errorMessage: value })}
					/>
					<ToggleControl
						label="Obrigatório?"
						checked={required}
						onChange={() => setAttributes({ required: !required })}
					/>
				</PanelBody>

				<PanelBody title="Cores" initialOpen={false} className="color-panel">
					<ColorPanel
						label="Cor do Fundo"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
