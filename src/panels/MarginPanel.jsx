import { PanelBody, RangeControl } from '@wordpress/components';

export default function MarginPanel({ attributes, setAttributes }) {
	const { marginM, marginD } = attributes;

	return (
		<PanelBody title="Margem" initialOpen={false}>
			<strong>Selecione a margem abaixo deste elemento</strong>
			<br />

			<RangeControl
				label="Mobile (até 767px)"
				initialPosition={parseInt(marginM)}
				value={marginM}
				onChange={newMarginM => setAttributes({ marginM: newMarginM })}
				min={-150}
				max={150}
			/>

			<RangeControl
				label="Desktop (a partir de 768px)"
				initialPosition={parseInt(marginD)}
				value={marginD}
				onChange={newMarginD => setAttributes({ marginD: newMarginD })}
				min={-150}
				max={150}
			/>
		</PanelBody>
	);
}
