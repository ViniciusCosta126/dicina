import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

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
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
					/>
					<hr />
					<ImagePanel
						label="Mobile Background"
						attributeName="bgMob"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<hr />

					<ImagePanel
						label="Desktop Background"
						attributeName="bgDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<hr />
					<ImagePanel
						label="Logo SENNA"
						attributeName="sennaLogo"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<hr />
					<ImagePanel
						label="Logo do Parceiro"
						attributeName="partnerLogo"
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
