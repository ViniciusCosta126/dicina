import { Panel, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">{/* Componente de páginação */}</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
