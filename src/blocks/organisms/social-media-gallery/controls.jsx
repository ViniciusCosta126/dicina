import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant, selectedColor } = attributes;

	const variants = [
		{ label: 'Tiktok', value: 'tiktok' },
		{ label: 'Instagram', value: 'instagram' },
	];

	const gradientTitleColors = [
		{
			label: 'Amarelo / Azul',
			value: 'linear-gradient(0, #e4ce36 0%, #e0cb39 13.21%, #bcb152 26.23%, #7a8381 50.19%, #3551b2 75.19%, #0a33d0 98.96%)',
		},
		{ label: 'Verde / Azul', value: 'linear-gradient(0, #00A851 0%, #1832D7 100%)' },
	];
	const gradientColors = [
		{
			label: 'Amarelo / Azul',
			value: 'linear-gradient(90deg, #e4ce36 0%, #e0cb39 13.21%, #bcb152 26.23%, #7a8381 50.19%, #3551b2 75.19%, #0a33d0 98.96%)',
		},
		{ label: 'Verde / Azul', value: 'linear-gradient(90deg, #00A851 0%, #1832D7 100%)' },
	];

	const setGradientColors = (value) => {
		setAttributes({
			selectedColor: value,
			gradientTitleColor: gradientTitleColors[value].value,
			gradientColor: gradientColors[value].value,
		});
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newValue) => {
							setAttributes({ variant: newValue }), resetInnerBlocks(clientId);
						}}
					/>

					<SelectControl
						label="Selecione o esquema de cores:"
						value={selectedColor}
						options={[
							{
								label: 'Amarelo / Azul',
								value: 0,
							},
							{
								label: 'Verde / Azul',
								value: 1,
							},
						]}
						onChange={(newValue) => {
							setGradientColors(newValue), resetInnerBlocks(clientId);
						}}
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
