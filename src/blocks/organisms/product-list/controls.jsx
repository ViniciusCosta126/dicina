import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Destaques - Jornada', value: 'journey_highlights' },
		{ label: 'Produtos - Jornada', value: 'journey_products' },
	];
	const clearBlocks = (newValue) => {
		setAttributes({ variant: newValue });
		setAttributes({ itemsLength: 1 });

		//Clear InnerBlocks and Recreate
		resetInnerBlocks(clientId);
	};
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl value={variant} options={variants} onChange={(newVariant) => clearBlocks(newVariant)} />
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
