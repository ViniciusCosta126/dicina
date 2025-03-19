import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import MarginPanel from '../../../panels/MarginPanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant, bigAux } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Linha Esquerda', value: 'left-line' },
		{ label: 'Título de seção', value: 'section-title' },
	];

	const setVariant = (newVariant) => {
		setAttributes({ variant: newVariant });

		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};
	return (
		<InspectorControls>
			<PanelBody title="Atributos do componente">
				<SelectControl
					label="Selecione o estilo deste componente:"
					value={variant}
					options={variants}
					onChange={(newValue) => {
						setAttributes({ variant: newValue }), resetInnerBlocks(clientId);
					}}
				/>

				{variant === 'section-title' && (
					<>
						<ToggleControl
							label="Titulo auxiliar grande?"
							checked={bigAux}
							onChange={() => {
								setAttributes({ bigAux: !bigAux }), resetInnerBlocks(clientId);
							}}
						/>
					</>
				)}
			</PanelBody>

			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione a variante:"
						value={variant}
						options={variants}
						onChange={(newValue) => {
							setVariant(newValue);
						}}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
