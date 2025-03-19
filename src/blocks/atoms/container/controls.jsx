import {
	Panel,
	PanelBody,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export default function Controls({ attributes, setAttributes }) {
	const { containerSize, paddingSize } = attributes;

	const sizes = [
		{ label: 'Sem container', value: '' },
		{ label: 'Padrão', value: 'container-block default' },
		{ label: 'Pequeno', value: 'container-block small' },
		{ label: 'Grande', value: 'container-block large' },
		{
			label: 'Normal (Mobile) | Grande (Desk)',
			value: 'container-block large-on-desk',
		},
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione tamanho do container:"
						value={containerSize}
						options={sizes}
						onChange={(newContainer) =>
							setAttributes({ containerSize: newContainer })
						}
					/>

					<PanelBody title="Paddings" initialOpen={false}>
						<p>Padding mobile (até 768px)</p>
						<RangeControl
							label="Padding Top (espaço interno superior)"
							initialPosition={paddingSize.mob.top}
							value={paddingSize.mob.top}
							onChange={(value) =>
								setAttributes({
									paddingSize: {
										mob: {
											top: value,
											bottom: paddingSize.mob.bottom,
										},
										desk: paddingSize.desk,
									},
								})
							}
							min={0}
							step={1}
							max={500}
						/>

						<RangeControl
							label="Padding Bottom (espaço interno inferior)"
							initialPosition={paddingSize.mob.bottom}
							value={paddingSize.mob.bottom}
							onChange={(value) =>
								setAttributes({
									paddingSize: {
										mob: {
											top: paddingSize.mob.top,
											bottom: value,
										},
										desk: paddingSize.desk,
									},
								})
							}
							min={0}
							step={1}
							max={500}
						/>

						<br />

						<p>Padding Desk (a partir de 768px)</p>
						<RangeControl
							label="Padding Top (espaço interno superior)"
							initialPosition={paddingSize.desk.top}
							value={paddingSize.desk.top}
							onChange={(value) =>
								setAttributes({
									paddingSize: {
										mob: paddingSize.mob,
										desk: {
											top: value,
											bottom: paddingSize.desk.bottom,
										},
									},
								})
							}
							min={0}
							step={1}
							max={500}
						/>

						<RangeControl
							label="Padding Bottom (espaço interno inferior)"
							initialPosition={paddingSize.desk.bottom}
							value={paddingSize.desk.bottom}
							onChange={(value) =>
								setAttributes({
									paddingSize: {
										mob: paddingSize.mob,
										desk: {
											top: paddingSize.desk.top,
											bottom: value,
										},
									},
								})
							}
							min={0}
							step={1}
							max={500}
						/>
					</PanelBody>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
