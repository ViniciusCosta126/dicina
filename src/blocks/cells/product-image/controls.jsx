import { Panel, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Imagem da Thumb"
						attributeName="smallImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />

					<ImagePanel
						label="Imagem de fundo Mobile (até 768px)"
						attributeName="largeImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />

					<ImagePanel
						label="Imagem de fundo Desk (a partir de 768px)"
						attributeName="largeImageDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
