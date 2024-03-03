import { Panel, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, requiredMessage, successMessage, errorMessage } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Variante 2', value: 'secondary' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Mensagens do formulário" initialOpen={true}>
					<TextControl
						label="Mensagem de campo obrigatório"
						type="String"
						value={requiredMessage}
						onChange={(value) => setAttributes({ requiredMessage: value })}
					/>
					<TextControl
						label="Mensagem de sucesso"
						type="String"
						value={successMessage}
						onChange={(value) => setAttributes({ successMessage: value })}
					/>
					<TextControl
						label="Mensagem de erro"
						type="String"
						value={errorMessage}
						onChange={(value) => setAttributes({ errorMessage: value })}
					/>
				</PanelBody>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) =>
							setAttributes({ variant: newVariant })
						}
					/>
				</PanelBody>

				<PanelBody
					title="Cores"
					initialOpen={false}
					className="color-panel"
				>
					<ColorPanel
						label="Cor do Fundo"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</Panel>
		</InspectorControls>
	);
}
