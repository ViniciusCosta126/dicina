import { Panel, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
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
