import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant, hasSignature } = attributes;

	const variants = [
		{ label: 'Collabs', value: 'collabs' },
		{ label: 'Legado', value: 'legacy' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newVariant) => {
							setAttributes({ variant: newVariant }), resetInnerBlocks(clientId);
						}}
					/>

					<ToggleControl
						label="Possui assinatura?"
						checked={hasSignature}
						onChange={() => setAttributes({ hasSignature: !hasSignature })}
					/>

					{hasSignature && (
						<ImagePanel
							label={`Imagem da assinatura`}
							attributeName="signature"
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					)}
				</PanelBody>

				<PanelBody title="Cores" initialOpen={false} className="color-panel">
					<ColorPanel
						label="Cor do texto"
						attributeName="textColor"
						attributes={attributes}
						setAttributes={setAttributes}
						onChange={() => resetInnerBlocks(clientId)}
					/>

					<ColorPanel
						label="Cor das aspas"
						attributeName="svgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
