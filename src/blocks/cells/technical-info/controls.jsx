import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Potencia inicial e final', value: 'power_initial_end' },
		{ label: 'Potencia inicial e final - temporada', value: 'power_season' },
		{ label: 'Potencia Fixa', value: 'power_fixed' },
	];

	const clearBlocks = (newValue) => {
		setAttributes({ variant: newValue });

		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/block-editor').removeBlocks(clientIds);
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newValue) => clearBlocks(newValue)}
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
