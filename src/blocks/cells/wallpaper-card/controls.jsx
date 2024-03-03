import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Imagem da thumb"
						attributeName="thumbImg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do Wallpaper"
						attributeName="wallpaper"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />
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
