import { Panel, PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, heightM, heightT, heightD } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Variante 2', value: 'secondary' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do texto" className="color-panel">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
					/>
				</PanelBody>

				<PanelBody title="Cores" initialOpen={false} className="color-panel">
					<ColorPanel
						label="Cor da Linha"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<PanelBody title="Altura" initialOpen={false} className="size-panel">
					<RangeControl
						label="Mobile (até 767px)"
						initialPosition={parseInt(heightM)}
						value={heightM}
						onChange={(newHeightM) => setAttributes({ heightM: newHeightM })}
						min={0}
						max={150}
					/>

					<RangeControl
						label="Tablet (até 1365px)"
						initialPosition={parseInt(heightT)}
						value={heightT}
						onChange={(newHeightT) => setAttributes({ heightT: newHeightT })}
						min={0}
						max={150}
					/>

					<RangeControl
						label="Desktop (a partir de 1366px)"
						initialPosition={parseInt(heightD)}
						value={heightD}
						onChange={(newHeightD) => setAttributes({ heightD: newHeightD })}
						min={0}
						max={150}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
