import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, contentAlign, hasLogo } = attributes;

	const variants = [
		{ label: 'Escura', value: 'default dark' },
		{ label: 'Clara', value: 'default light' },
	];

	const aligns = [
		{ label: 'Esquerda', value: 'left' },
		{ label: 'Centro', value: 'center' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Conteúdo" className="content-panel">
					<SelectControl
						label="Selecione o estilo deste componente: "
						value={variant}
						options={variants}
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
					/>

					<SelectControl
						label="Selecione o alinhamento do conteúdo: "
						value={contentAlign}
						options={aligns}
						onChange={(newValue) => setAttributes({ contentAlign: newValue })}
					/>

					<ImagePanel
						label="Imagem de fundo"
						attributeName="cardimg"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<hr />

					<ToggleControl
						label="Os itens possuem logo?"
						checked={hasLogo}
						onChange={() =>
							setAttributes({
								hasLogo: !hasLogo,
							})
						}
					/>

					{hasLogo && (
						<>
							<ImagePanel label="Logo" attributeName="logo" attributes={attributes} setAttributes={setAttributes} />
							<hr />
						</>
					)}
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
