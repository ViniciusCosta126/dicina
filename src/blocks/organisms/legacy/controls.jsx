import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente" className="color-panel">
					<ImagePanel
						attributeName="bgImage"
						attributes={attributes}
						setAttributes={setAttributes}
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
