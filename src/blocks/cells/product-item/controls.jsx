import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant, productImageCover } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Destaques - Jornada', value: 'journey_highlights' },
		{ label: 'Produtos - Jornada', value: 'journey_products' },
	];
	const clearBlocks = (newValue) => {
		setAttributes({ variant: newValue });

		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) => clearBlocks(newVariant)}
					/>

					<ImagePanel
						label="Imagem do produto"
						attributeName="productImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />

					<ToggleControl
						label="Preencher caixa com imagem?"
						checked={productImageCover}
						onChange={() => setAttributes({ productImageCover: !productImageCover })}
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
