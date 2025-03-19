import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Variante 2', value: 'secondary' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do texto" className="color-panel">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) =>
							setAttributes({ variant: newVariant })
						}
					/>
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

				<PanelBody
					title="Imagens"
					initialOpen={false}
					className="image-panel"
				>
					<ImagePanel
						label="Imagem Mobile"
						attributeName="imgMob"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Imagem Desk 1"
						attributeName="imgDeskOne"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Imagem Desk 2"
						attributeName="imgDeskTwo"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
				</PanelBody>

				<MarginPanel
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</Panel>
		</InspectorControls>
	);
}
