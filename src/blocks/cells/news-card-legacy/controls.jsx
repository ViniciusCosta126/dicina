import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';
import ImagePanel from '../../../panels/ImagePanel';
import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Imagem Mobile"
						attributeName="cardImgM"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem Desk"
						attributeName="cardImgD"
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
