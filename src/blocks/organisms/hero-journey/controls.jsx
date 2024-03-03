import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant, smallTitle, isTextAux } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Full Screen', value: 'full-screen' },
	];

	const setTitleSize = (newSmallTitle) => {
		setAttributes({ smallTitle: newSmallTitle });

		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};

	const setVariant = (newVariant) => {
		setAttributes({ variant: newVariant });

		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};

	const setIsTextAux = () => {
		setAttributes({ isTextAux: !isTextAux });
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
						onChange={(newVariant) => setVariant(newVariant)}
					/>

					{variant === 'full-screen' && (
						<ToggleControl
							label="Deseja remover o texto auxiliar?"
							checked={isTextAux}
							onChange={() => setIsTextAux()}
						/>
					)}

					<ToggleControl
						label="Diminuir tamanho do título no mobile? Obs: Esta alteração não será refletida no desktop"
						checked={smallTitle}
						onChange={(newValue) => setTitleSize(newValue)}
					/>

					<hr />

					<ImagePanel
						label="Mobile Background"
						attributeName="bgMob"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />
					<hr />

					<ImagePanel
						label="Desktop Background"
						attributeName="bgDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<hr />
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
