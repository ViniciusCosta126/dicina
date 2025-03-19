import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import ImagePanel from '../../../panels/ImagePanel';

import ColorPanel from '../../../panels/ColorPanel';

export default function Controls({ attributes, setAttributes }) {
	

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Imagem de fundo Desktop"
						attributeName="bgImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem de fundo Mobile"
						attributeName="bgImageMobile"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<PanelBody
					title="Cores"
					initialOpen={false}
					className="color-panel"
				>
					<ColorPanel
						label="Cor do Fundo"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
