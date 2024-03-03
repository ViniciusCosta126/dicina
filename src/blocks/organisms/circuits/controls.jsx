import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [{ label: 'Padrão', value: 'default' }];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newValue) => {
							setAttributes({ variant: newValue }), resetInnerBlocks(clientId);
						}}
					/>

					<hr />

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
