import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [
		{ label: 'Imagem', value: 'image' },
		{ label: 'Sobre', value: 'about' },
		{ label: 'Depoimento', value: 'testimony' },
	];

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
						label="Imagem do parceiro"
						attributeName="imagePartner"
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
