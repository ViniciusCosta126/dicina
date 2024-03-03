import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { requiredMessage, successMessage, errorMessage } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Mensagens do formulário" initialOpen={true}>
					<ImagePanel
						label="insira a imagem de fundo"
						attributeName="bgImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<hr />

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
