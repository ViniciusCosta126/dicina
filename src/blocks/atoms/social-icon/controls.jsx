import { Panel, PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { link } = attributes;
	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Icone da rede" className="icon-panel">
					<ImagePanel
						label="Icone da rede"
						attributeName="icon"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<TextControl
						label="Link da rede social"
						value={ link }
						onChange={(content) => setAttributes({link: content})}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
