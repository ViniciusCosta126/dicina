import { PanelRow, GradientPicker, SelectControl } from '@wordpress/components';
import { gradients, gradientPallets } from '../gradients';
import { useState } from '@wordpress/element';

export default function GradientPanel({
	attributes,
	setAttributes,
	attributeName,
	label = '',
}) {
	const [palette, setPalette] = useState('gradientsPrimary');
	const [selectedPalette, setSelectedPalette] = useState(gradients[palette]);

	// handle gradient color change
	const handleColorChange = (colorCode) => {
		if (colorCode === undefined) colorCode = 'transparent';
		// deep clone attributes
		var object = structuredClone(attributes);
		object[attributeName] = colorCode;
		setAttributes(object);
	};

	//handle palette color change
	const handlePaletteChange = (palette) => {
		setSelectedPalette(gradients[palette]);
		setPalette(palette);
	};

	return (
		<PanelRow className="palette-panel">
			<label>
				<strong className="palette-label">{label}</strong>

				<SelectControl
					label="Selecione a paleta"
					className="select-palette"
					value={palette}
					options={gradientPallets}
					onChange={(newPalette) => handlePaletteChange(newPalette)}
					__nextHasNoMarginBottom
				/>

				<p className="palette-label">Selecione a cor do gradiente</p>
				<GradientPicker
					label="Selecione a paleta"
					gradients={selectedPalette}
					value={attributes[attributeName]}
					onChange={handleColorChange}
					headingLevel={5}
					style={{ marginTop: 5 }}
				/>
			</label>
		</PanelRow>
	);
}
