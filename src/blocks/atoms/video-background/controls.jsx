import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ImagePanel from '../../../panels/ImagePanel';
import VideoPanel from '../../../panels/VideoPanel';

export default function Controls({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ImagePanel
						label="Apenas imagem"
						attributeName="cardimg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<VideoPanel label="Vídeo" attributeName="cardVideo" attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
