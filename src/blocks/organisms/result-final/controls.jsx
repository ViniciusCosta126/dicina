import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { hasImage } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ToggleControl
						label="Possui Imagem?"
						checked={hasImage}
						onChange={() => setAttributes({ hasImage: !hasImage })}
					/>

					{hasImage && (
						<>
							<ImagePanel
								label={`Imagem de fundo (Mobile)`}
								attributeName="bgImageMobile"
								attributes={attributes}
								setAttributes={setAttributes}
							/>

							<hr />

							<ImagePanel
								label={`Imagem de fundo (Desktop)`}
								attributeName="bgImageDesk"
								attributes={attributes}
								setAttributes={setAttributes}
							/>

							<br />
						</>
					)}
				</PanelBody>

				<PanelBody title="Cores" initialOpen={false} className="color-panel">
					<ColorPanel
						label="Cor do Fundo"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ColorPanel
						label="Cor do Fundo em degradê Mobile"
						attributeName="bgColorDegrade"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<ColorPanel
						label="Cor do Fundo em degradê Desktop"
						attributeName="bgColorDegradeDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
