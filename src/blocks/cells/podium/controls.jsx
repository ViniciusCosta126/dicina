import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, ToggleControl } from '@wordpress/components';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { hasTitle } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ToggleControl
						label="Possui título?"
						checked={hasTitle}
						onChange={() => {
							setAttributes({ hasTitle: !hasTitle }), resetInnerBlocks(clientId);
						}}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
