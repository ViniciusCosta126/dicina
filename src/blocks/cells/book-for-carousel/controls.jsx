import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, TextControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { bookLink, variant } = attributes;

	const variants = [{ label: 'Padrão', value: 'default' }];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newValue) => setAttributes({ variant: newValue })}
					/>

					<ImagePanel
						label="Imagem do slide Mobile"
						attributeName="imageMobile"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<hr />
					<br />

					<ImagePanel
						label="Imagem do slide Dektop (telas a partir de 768px)"
						attributeName="image"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<hr />
					<br />

					<TextControl
						label="Link do Livro"
						attributeName="bookLink"
						type="String"
						value={bookLink}
						onChange={(value) => setAttributes({ bookLink: value })}
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
