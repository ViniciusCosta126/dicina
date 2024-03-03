import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';

import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label={`Imagem do icone`}
						attributeName="iconImg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
