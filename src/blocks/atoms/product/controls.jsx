import {
	Panel,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Produto Home', value: 'products__carousel__card' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Image do Produto 1" className="image-panel1">
					<ImagePanel
						label="Image do Produto 1"
						attributeName="image1"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
					<ImagePanel
						label="Image do Produto 2"
						attributeName="image2"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<br />
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
