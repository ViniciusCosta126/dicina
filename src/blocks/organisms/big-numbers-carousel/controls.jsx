import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, RangeControl, ToggleControl } from '@wordpress/components';


export default function Controls({ attributes, setAttributes }) {
	const {
		loop,
		speed,
		autoplayTimeout
	} = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ToggleControl
						label="O carrossel será em loop?"
						checked={loop}
						onChange={() => setAttributes({ loop: !loop })}
					/>

					<RangeControl
						label="Tempo em cada slide (em milesegundos)"
						initialPosition={autoplayTimeout}
						value={autoplayTimeout}
						onChange={(value) => setAttributes({ autoplayTimeout: value })}
						min={1000}
						step={100}
						max={10000}
					/>

					<RangeControl
							label="Velocidade de transição (em mileseggundos)"
							initialPosition={speed}
							value={speed}
							onChange={(value) => setAttributes({ speed: value })}
							min={100}
							step={100}
							max={10000}
						/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
