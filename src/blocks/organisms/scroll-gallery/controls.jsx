import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const {
		variant,
		bgImage1,
		bgImageMobile1,
		bgImage2,
		bgImageMobile2,
		bgImage3,
		bgImageMobile3,
		bgImage4,
		bgImageMobile4,
		bgImage5,
		bgImageMobile5,
		bgImage6,
		bgImageMobile6,
	} = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Variante 2', value: 'secondary' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
					/>
				</PanelBody>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Imagem do slide Mobile 1"
						attributeName="bgImageMobile1"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do slide Dektop (a partir de 768px) 1"
						attributeName="bgImage1"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Imagem do slide Mobile 2"
						attributeName="bgImageMobile2"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do slide Dektop (a partir de 768px) 2"
						attributeName="bgImage2"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Imagem do slide Mobile 3"
						attributeName="bgImageMobile3"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do slide Dektop (a partir de 768px) 3"
						attributeName="bgImage3"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Imagem do slide Mobile 4"
						attributeName="bgImageMobile4"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do slide Dektop (a partir de 768px) 4"
						attributeName="bgImage4"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Imagem do slide Mobile 5"
						attributeName="bgImageMobile5"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do slide Dektop (a partir de 768px) 5"
						attributeName="bgImage5"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Imagem do slide Mobile 6"
						attributeName="bgImageMobile6"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<br />

					<ImagePanel
						label="Imagem do slide Dektop (a partir de 768px) 6"
						attributeName="bgImage6"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
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
