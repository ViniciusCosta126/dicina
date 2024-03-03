import { InspectorControls } from '@wordpress/block-editor';
import { Panel } from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>{/* Componente sem atributos editáveis */}</Panel>
		</InspectorControls>
	);
}
