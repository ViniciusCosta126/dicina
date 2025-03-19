
import { InspectorControls } from "@wordpress/block-editor";
import { Panel, PanelBody, TextControl } from '@wordpress/components';

import ImagePanel from "../../../panels/ImagePanel";


export default function Controls({ attributes, setAttributes }) {
	const { variant, requiredMessage, successMessage, errorMessage } = attributes;

	return <InspectorControls>
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

			<PanelBody title="Imagem de Fundo" initialOpen={true}>
				<ImagePanel
					attributeName="bgImage"
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</PanelBody>
		</Panel>
	</InspectorControls>
}

