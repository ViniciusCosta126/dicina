import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const aligns = [
		{ label: 'Direita', value: 'right' },
		{ label: 'Esquerda', value: 'left' },
		{ label: 'Centro', value: 'center' },
	];
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Imagem mobile. Tamanho recomendado: até 540px"
						attributeName="imgMobile"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem tablet. Tamanho recomendado: 540px"
						attributeName="imgTablet"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem desktop. Tamanho recomendado: 1024px"
						attributeName="imgDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem 4k. Tamanho recomendo: 2000px"
						attributeName="img4k"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<PanelBody>
					<SelectControl
						label="Escolha a posição do conteúdo"
						value={attributes.contentAlign}
						options={aligns}
						onChange={(newAlign) => setAttributes({ contentAlign: newAlign })}
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
			</Panel>
		</InspectorControls>
	);
}
