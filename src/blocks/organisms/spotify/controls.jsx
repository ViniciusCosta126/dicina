import { InspectorControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { Panel, PanelBody } from '@wordpress/components';

import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { link } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<TextControl
						label="Link Playlist/Musica"
						type="String"
						value={link}
						onChange={(value) => setAttributes({ link: value })}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
