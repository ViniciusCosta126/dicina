import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl } from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
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
						onChange={(newValue) => setAttributes({ variant: newValue })}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
