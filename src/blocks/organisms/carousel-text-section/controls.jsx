import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, itemVariant } = attributes;

	const variants = [{ label: 'Padrão', value: 'default' }];

	const itemVariants = [
		{ label: 'Títulos e Texto', value: 'titles-texts' },
		{ label: 'Títulos, texto e botão', value: 'titles-texts-button' },
		{ label: 'Título e Texto Simples', value: 'simple-title-text' },
		{ label: 'Apenas texto', value: 'only-text' },
		{ label: 'Apenas depoimento', value: 'only-testimony' },
		{ label: 'Texto e Depoimento', value: 'text-testimony' },
		{ label: 'Depoimento e Texto', value: 'testimony-text' },
		{ label: 'Texto e vídeo', value: 'text-video' },
	];

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

					<SelectControl
						label="Selecione o item que será adicionado:"
						value={itemVariant}
						options={itemVariants}
						onChange={(newValue) => setAttributes({ itemVariant: newValue })}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
