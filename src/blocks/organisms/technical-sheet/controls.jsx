import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, hasImage, hPosition } = attributes;
	const hPositions = [
		{ label: 'Esquerda', value: 'left' },
		{ label: 'Centro', value: 'center' },
		{ label: 'Direira', value: 'right' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente" initialOpen={true}>
					<>
						<SelectControl
							label="Selecione a posição horizontal do texto:"
							value={hPosition}
							options={hPositions}
							onChange={(newValue) => setAttributes({ hPosition: newValue })}
						/>

						<hr />

						<ToggleControl
							label="Possui Imagem?"
							checked={hasImage}
							onChange={() => setAttributes({ hasImage: !hasImage })}
						/>

						{hasImage && (
							<>
								<ImagePanel
									label={`Imagem de fundo (Mobile)`}
									attributeName="bgImageMobile"
									attributes={attributes}
									setAttributes={setAttributes}
								/>

								<hr />

								<ImagePanel
									label={`Imagem de fundo (Desktop)`}
									attributeName="bgImageDesk"
									attributes={attributes}
									setAttributes={setAttributes}
								/>

								<br />
							</>
						)}
					</>
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
