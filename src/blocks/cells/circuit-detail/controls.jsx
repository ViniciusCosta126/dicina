import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { position } = attributes;

	const positions = [
		{ label: 'Topo - Centro', value: 'top-center' },
		{ label: 'Topo - Esquerda', value: 'top-left' },
		{ label: 'Baixo - Esquerda', value: 'bottom-left' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione a posição desejada (x - y):"
						value={position}
						options={positions}
						onChange={(newValue) => setAttributes({ position: newValue })}
					/>

					<ImagePanel
						label={`Imagem do circuito`}
						attributeName="circuitImage"
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
