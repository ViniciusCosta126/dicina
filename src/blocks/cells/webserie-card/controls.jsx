import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';
import { TextControl } from '@wordpress/components';
export default function Controls({ attributes, setAttributes }) {
	const { linkEpisodio } = attributes;
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Imagem do card"
						attributeName="imgCard"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<br />
					<TextControl
						label="Link do episodio"
						type="String"
						value={linkEpisodio}
						onChange={(value) => setAttributes({ linkEpisodio: value })}
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
