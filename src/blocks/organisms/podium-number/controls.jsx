import { Panel, PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, valueTime, valueRacing, valuePole } = attributes;

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Imagem de fundo">
					<ImagePanel
						label="Imagem de fundo"
						attributeName="bgImg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>
				<PanelBody title="Icones podio">
					<ImagePanel
						label="Imagem Primeiro Lugar"
						attributeName="firstImg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem Segundo Lugar"
						attributeName="secondImg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<ImagePanel
						label="Imagem Terceiro Lugar"
						attributeName="thirdImg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>
				<PanelBody title="Numeros do Podio">
					<RangeControl
						label="Primeiro Lugar"
						initialPosition={parseFloat(valueTime)}
						value={valueTime}
						onChange={(newValueTime) => setAttributes({ valueTime: newValueTime })}
						min={0}
						step={0.1}
						max={200}
					/>
					<RangeControl
						label="Segundo Lugar"
						initialPosition={parseFloat(valueRacing)}
						value={valueRacing}
						onChange={(newValueRacing) => setAttributes({ valueRacing: newValueRacing })}
						min={0}
						step={0.1}
						max={250}
					/>
					<RangeControl
						label="Terceiro Lugar"
						initialPosition={parseFloat(valuePole)}
						value={valuePole}
						onChange={(newValuePole) => setAttributes({ valuePole: newValuePole })}
						min={0}
						step={0.1}
						max={250}
					/>
				</PanelBody>
				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
