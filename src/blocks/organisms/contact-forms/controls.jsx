import { Panel, PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ImagePanel from "../../../panels/ImagePanel";
import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { requiredMessage, successMessage, errorMessage } = attributes;


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

				<PanelBody title="Imagem de Fundo" initialOpen={true}>
					<ImagePanel
						attributeName="bgImage"
						attributes={attributes}
						setAttributes={setAttributes}
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
