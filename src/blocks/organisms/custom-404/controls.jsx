import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Imagens do componente" className="color-panel">
					<ImagePanel
						label="Imagem mobile"
						attributeName="image"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem desktop"
						attributeName="imageDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel label="Imagem 4k" attributeName="image4k" attributes={attributes} setAttributes={setAttributes} />
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
