import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, RangeControl } from '@wordpress/components';

import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Linha Degrade', value: 'line-gradient' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo do separador:"
						value={variant}
						options={variants}
						onChange={(newValue) => setAttributes({ variant: newValue })}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
