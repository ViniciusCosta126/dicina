import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { expandedCaption, forceLandsape, hidePanelItem } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					{hidePanelItem}
					<ImagePanel
						label={`Imagem do slide`}
						attributeName="image"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<hr />

					<ImagePanel
						label={`Imagem expandida do slide`}
						attributeName="expandedImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<hr />

					<TextControl
						label="Legenda da imagem expandida:"
						type="String"
						value={expandedCaption}
						onChange={(newValue) => setAttributes({ expandedCaption: newValue })}
					/>

					<ToggleControl
						label="Imagem horizontal?"
						checked={forceLandsape}
						onChange={() => setAttributes({ forceLandsape: !forceLandsape })}
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
			</Panel>
		</InspectorControls>
	);
}
