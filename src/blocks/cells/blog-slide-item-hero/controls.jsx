import { Panel, PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { postLink } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do slide">
					<ImagePanel
						label="Imagem do slide Mobilee"
						attributeName="bgImageMobile"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do slide Dektop (a partir de 768px)"
						attributeName="bgImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />
					<TextControl
						label="Link do Post"
						attributeName="postLink"
						type="String"
						value={postLink}
						onChange={(value) => setAttributes({ postLink : value })}
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
