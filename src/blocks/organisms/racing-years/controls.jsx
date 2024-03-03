import { Panel, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { titleBreakeLine } = attributes;

	const resetBlock = (newTitleBreakeLine) => {
		setAttributes({ titleBreakeLine: newTitleBreakeLine });

		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ToggleControl
						label="Permitir quebra de linha do título?"
						checked={titleBreakeLine}
						onChange={() => resetBlock(!titleBreakeLine)}
					/>

					<hr />

					<ImagePanel
						label={`Imagem de fundo`}
						attributeName="bgImage"
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
