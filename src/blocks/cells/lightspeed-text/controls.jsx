import { Panel, PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { containerSize, mobileVisible, gspStart } = attributes;

	const sizes = [
		{ label: 'Sem container', value: 'container none' },
		{ label: 'Padrão', value: 'container default' },
		{ label: 'Pequeno', value: 'container small' },
		{ label: 'Grande', value: 'container large' },
		{
			label: 'Normal (Mobile) | Grande (Desk)',
			value: 'container large-on-desk',
		},
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ToggleControl
						label="Mostrar no mobile?"
						checked={mobileVisible}
						onChange={() => setAttributes({ mobileVisible: !mobileVisible })}
					/>

					<SelectControl
						label="Selecione tamanho do container:"
						value={containerSize}
						options={sizes}
						onChange={(newContainer) => setAttributes({ containerSize: newContainer })}
					/>

					<TextControl
						label="Start da animação"
						value={gspStart}
						onChange={(content) => setAttributes({ gspStart: content })}
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
