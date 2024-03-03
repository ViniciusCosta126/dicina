import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { widthCard, titleTag } = attributes;

	const widths = [
		{ label: 'Pequeno', value: 'small' },
		{ label: 'Médio', value: 'medium' },
		{ label: 'Grande', value: 'large' },
	];

	const tags = [
		{ label: 'H1', value: 'h1' },
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Tamanho do Card"
						className="variant-select"
						value={widthCard}
						options={widths}
						onChange={(newValue) => setAttributes({ widthCard: newValue })}
					/>

					<SelectControl
						label="Tag do título"
						value={titleTag}
						options={tags}
						onChange={(newValue) => setAttributes({ titleTag: newValue })}
					/>

					<hr />
					<ImagePanel
						label="Imagem do Card"
						attributeName="cardImg"
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
