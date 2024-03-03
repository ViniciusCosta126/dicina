import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from "@wordpress/block-editor";

import ColorPanel from "../../../panels/ColorPanel";
import MarginPanel from '../../../panels/MarginPanel';
import VideoPanel from '../../../panels/VideoPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, showVideo  } = attributes;


	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Small Container', value: 'small' },
		{ label: 'Large Container', value: 'large' },
		{ label: 'Desktop Large Container', value: 'large-on-desk' },
		{ label: 'Sem Container (full width)', value: 'full-width' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={newVariant => setAttributes({ variant: newVariant })}
					/>
					<ImagePanel
						label="Imagem do Texto"
						attributeName="image"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<hr />
					<ToggleControl
						label="Mostrar Vídeo"
						checked={showVideo}
						onChange={() => setAttributes({ showVideo: !showVideo })}
					/>

					<VideoPanel
						label="Selecione um vídeo para a seção"
						attributeName="video"
						attributes={attributes}
						setAttributes={setAttributes}
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
