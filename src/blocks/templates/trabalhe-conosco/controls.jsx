import { Panel } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>{/* Atributos para o template Trabalhe Conosco */}</Panel>
		</InspectorControls>
	);
}
