import { Panel, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';
import VideoPanel from '../../../panels/VideoPanel';

export default function Controls({ attributes, setAttributes }) {
	const { isAnimated, bgImage, bgImageMobile, hasOverlay, hasText, isVideo } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do slide">
					<ToggleControl
						label="Adicionar Video?"
						checked={isVideo}
						onChange={() => setAttributes({ isVideo: !isVideo })}
					/>

					{!isVideo ? (
						<>
							<ImagePanel
								label="Imagem do slide Mobile"
								attributeName="bgImageMobile"
								attributes={attributes}
								setAttributes={setAttributes}
							/>

							<br />

							<ImagePanel
								label="Imagem do slide Dektop (a partir de 768px)"
								attributeName="bgImage"
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						</>
					) : (
						<VideoPanel
							label="Selecione um vídeo para o fundo"
							attributeName="videoBg"
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					)}

					<br />

					{(bgImage || bgImageMobile) && (
						<ToggleControl
							label="A imagem deste item tera animação?"
							checked={isAnimated}
							onChange={() => setAttributes({ isAnimated: !isAnimated })}
						/>
					)}

					<ToggleControl
						label="Adicionar campo de texto?"
						checked={hasText}
						onChange={() => setAttributes({ hasText: !hasText })}
					/>

					<ToggleControl
						label="Adicionar overlay na image?"
						checked={hasOverlay}
						onChange={() => setAttributes({ hasOverlay: !hasOverlay })}
					/>
				</PanelBody>

				{hasOverlay && (
					<PanelBody title="Overlay Cor" initialOpen={false} className="overlay-color-panel">
						<ColorPanel
							label="Cor do Overlay"
							attributeName="bgOverlay"
							attributes={attributes}
							setAttributes={setAttributes}
						/>
					</PanelBody>
				)}

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
