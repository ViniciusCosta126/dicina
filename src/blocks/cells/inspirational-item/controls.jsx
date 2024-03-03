import { InspectorControls } from '@wordpress/block-editor';
import { CardDivider, Panel, PanelBody, SelectControl, TextControl } from '@wordpress/components';

import ImagePanel from '../../../panels/ImagePanel';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, video2Id, video1Id } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Variante 2', value: 'secondary' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Imagem de Fundo" initialOpen={true}>
					<ImagePanel attributeName="bgImage" attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
				<PanelBody title="Video 1" initialOpen={true}>
					<ImagePanel
						attributeName="videoThumb1"
						attributes={attributes}
						setAttributes={setAttributes}
						label="Imagem de Thumb 1"
					/>

					<CardDivider />

					<TextControl
						label="Insira um identificador (deve ser o mesmo inserido no thumb/vídeo)"
						type="String"
						value={video1Id}
						onChange={(value) => setAttributes({ video1Id: value })}
					/>
				</PanelBody>
				<PanelBody title="Video 2" initialOpen={true}>
					<ImagePanel
						attributeName="videoThumb2"
						attributes={attributes}
						setAttributes={setAttributes}
						label="Imagem de Thumb 2"
					/>
					<CardDivider />

					<TextControl
						label="Insira um identificador (deve ser o mesmo inserido no thumb/vídeo)"
						type="String"
						value={video2Id}
						onChange={(value) => setAttributes({ video2Id: value })}
					/>
				</PanelBody>

				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
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
