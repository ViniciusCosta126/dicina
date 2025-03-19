import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import ImagePanel from "../../../panels/ImagePanel";


export default function Controls({ attributes, setAttributes }) {
	const { variant, desktopVisible,mobileVisible } = attributes;

	const variants = [
		{ label: 'Título', value: 'title' },
		{ label: 'Números', value: 'numbers' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente: "
						value={variant}
						options={variants}
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
					/>

					<ToggleControl
						label="Mostrar no desktop?"
						checked={desktopVisible}
						onChange={() => setAttributes({ desktopVisible: !desktopVisible })}
					/>

					<ToggleControl
						label="Mostrar no mobile?"
						checked={mobileVisible}
						onChange={() => setAttributes({ mobileVisible: !mobileVisible })}
					/>
					mobileVisible
					<ImagePanel
						label="Imagem de fundo Mobile"
						attributeName="bgImageMobile"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					{desktopVisible && (
						<ImagePanel
							label="Imagem de fundo Desktop"
							attributeName="bgImage"
							attributes={attributes}
							setAttributes={setAttributes}
						/>		
					)}
									
				</PanelBody>				
			</Panel>
		</InspectorControls>
	);
}
