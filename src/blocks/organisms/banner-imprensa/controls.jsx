import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, ToggleControl } from '@wordpress/components';

import ImagePanel from '../../../panels/ImagePanel';
import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { hasSubtitle } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Imagens do componente">
					<ToggleControl
						label="Possui subtitulo?"
						checked={hasSubtitle}
						onChange={() => setAttributes({ hasSubtitle: !hasSubtitle })}
					/>

					<hr />
					<ImagePanel
						label="banner mobile"
						attributeName="imgMobile"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<ImagePanel
						label="banner desktop"
						attributeName="imgDesk"
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
