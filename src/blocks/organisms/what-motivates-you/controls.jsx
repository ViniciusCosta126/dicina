import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [{ label: 'Padrão', value: 'default' }];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) =>
							setAttributes({ variant: newVariant })
						}
					/>

					<ImagePanel
						label="Imagem Mobile"
						attributeName="image"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />

					<ImagePanel
						label="Imagem Dektop (a partir de 768px)"
						attributeName="imageDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
				</PanelBody>

				<PanelBody
					title="Cores"
					initialOpen={false}
					className="color-panel"
				>
					<ColorPanel
						label="Cor do Fundo"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</Panel>
		</InspectorControls>
	);
}
