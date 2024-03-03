import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { hasAuxText } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ToggleControl
						label="Possui texto auxiliar?"
						checked={hasAuxText}
						onChange={() => {
							setAttributes({ hasAuxText: !hasAuxText }), resetInnerBlocks(clientId);
						}}
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
