import { Panel } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

	return (
		<InspectorControls>
			<Panel>{/* Componente de produtos Para a Home */}</Panel>
		</InspectorControls>
	);
}
