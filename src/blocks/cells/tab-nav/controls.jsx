import { InspectorControls } from '@wordpress/block-editor';
import { Panel } from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

	return (
		<InspectorControls>
			<Panel>{/* Componente Tab Nav */}</Panel>
		</InspectorControls>
	);
}
