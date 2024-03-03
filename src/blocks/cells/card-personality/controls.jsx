import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { hasVideo, videoId, titleCard } = attributes;

	const setModalVideo = (value) => {
		setAttributes({ modalId: value, modalId: value, videoId: value });
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<ToggleControl
						label="O card vai ter um video?"
						checked={hasVideo}
						onChange={() =>
							setAttributes({
								hasVideo: !hasVideo,
							})
						}
					/>

					{hasVideo ? (
						<TextControl
							label="Video ID (digite apenas o embed do video)"
							type="String"
							value={videoId}
							onChange={(value) => setModalVideo(value)}
						/>
					) : (
						<TextControl
							label="Titulo Card"
							type="String"
							value={titleCard}
							onChange={(value) => setAttributes({ titleCard: value })}
						/>
					)}

					<hr />
					<ImagePanel
						label="Imagem da Thumb"
						attributeName="smallImage"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
