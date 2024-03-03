import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import GradientPanel from '../../../panels/GradientPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

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
					<GradientPanel
						label="Cor do Fundo Gradiente"
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
