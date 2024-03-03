import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import ImagePanel from '../../../panels/ImagePanel';
import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Imagem" initialOpen={false}>
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
			</Panel>
		</InspectorControls>
	);
}
