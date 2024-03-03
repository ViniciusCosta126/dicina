import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl } from '@wordpress/components';

import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { id } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do Carrossel">
					<TextControl
						label="Insira um identificador para as abas (deve ser igual ao elemento a ser filtrado)"
						type="String"
						value={id}
						onChange={(value) => setAttributes({ id: value })}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
