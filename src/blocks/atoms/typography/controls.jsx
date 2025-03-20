import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ clientId, attributes, setAttributes }) {
	const {
		tag,
		size,
		sizeM,
		sizeD,
		disableSizes,
		manualSizes,
		manualSizeM,
		manualSizeD,
		sizeType,
		widthStrokeM,
		widthStrokeD,
		textIndent,
		hasInnerBlocks,
		hasMaxWidth,
		position,
		maxWidthM,
		maxWidthD,
		fontFamily,
		textAlign,
		textTransform,
		textWeight,
	} = attributes;

	const oldSizeM = size ? `${size}-m` : null;
	const oldSizeD = size ? `${size}-d` : null;

	const tags = [
		{ label: 'H1', value: 'h1' },
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
		{ label: 'H4', value: 'h4' },
		{ label: 'H5', value: 'h5' },
		{ label: 'H6', value: 'h6' },
		{ label: 'p', value: 'p' },
		{ label: 'strong', value: 'strong' },
		{ label: 'span', value: 'span' },
	];

	const fontFamilies = [
		{ label: 'Poppins', value: 'poppins' },
		{ label: 'Helvetica Neue Condensed', value: 'poppins-cond' },
	];

	const sizesM = [
		{ label: 'Heading 1', value: 'title-1-m' },
		{ label: 'Heading 2', value: 'title-2-m' },
		{ label: 'Heading 3', value: 'title-3-m' },
		{ label: 'Heading 4', value: 'title-4-m' },
		{ label: 'Heading 5', value: 'title-5-m' },
		{ label: 'Heading 2 Responsive', value: 'title-2-responsive-m' },
		{ label: 'Body 1', value: 'body-1-m' },
		{ label: 'Body 2', value: 'body-2-m' },
		{ label: 'Body 2 Desk', value: 'body-2-m-desk' },
		{ label: 'Body 3', value: 'body-3-m' },
		{ label: 'Body 4', value: 'body-4-m' },
		{ label: 'Body 4 Desk', value: 'body-4-m-desk' },
		{ label: 'Body 5', value: 'body-5-m' },
		{ label: 'Body 6', value: 'body-6-m' },
		{ label: 'Body 7', value: 'body-7-m' },
		{ label: 'Body 8', value: 'body-8-m' },
		{ label: 'Body 9', value: 'body-9-m' },
		{ label: 'CTA', value: 'cta-m' },
	];

	const sizesD = [
		{ label: 'Heading 1', value: 'title-1-d' },
		{ label: 'Heading 2', value: 'title-2-d' },
		{ label: 'Heading 3', value: 'title-3-d' },
		{ label: 'Heading 4', value: 'title-4-d' },
		{ label: 'Heading 5', value: 'title-5-d' },
		{ label: 'Heading 2 Responsive', value: 'title-2-responsive-d' },
		{ label: 'Body 1', value: 'body-1-d' },
		{ label: 'Body 2', value: 'body-2-d' },
		{ label: 'Body 3', value: 'body-3-d' },
		{ label: 'Body 4', value: 'body-4-d' },
		{ label: 'Body 5', value: 'body-5-d' },
		{ label: 'Body 6', value: 'body-6-d' },
		{ label: 'Body 7', value: 'body-7-d' },
		{ label: 'Body 8', value: 'body-8-d' },
		{ label: 'Body 9', value: 'body-9-d' },
		{ label: 'CTA', value: 'cta-d' },
	];

	const aligns = [
		{ label: 'Não setar', value: 'align-unset' },
		{ label: 'Esquerda - Centro', value: 'align-left-center' },
		{ label: 'Esquerda - Direita', value: 'align-left-right' },
		{ label: 'Centro - Esquerda', value: 'align-center-left' },
		{ label: 'Esquerda', value: 'align-left' },
		{ label: 'Centro', value: 'align-center' },
		{ label: 'Direita', value: 'align-right' },
	];

	const transforms = [
		{ label: 'Uppercase', value: 'transform-uppercase' },
		{ label: 'Lowercase', value: 'transform-lowercase' },
		{ label: 'Captalize', value: 'transform-captalize' },
	];

	const weights = [
		{ label: 'Thin', value: 'weight-thin' },
		{ label: 'Light', value: 'weight-light' },
		{ label: 'Normal', value: 'weight-normal' },
		{ label: 'Normal Italic', value: 'weight-normal-italic' },
		{ label: 'Medium', value: 'weight-medium' },
		{ label: 'Bold', value: 'weight-bold' },
		{ label: 'Black', value: 'weight-black' },
	];

	const positions = [
		{ label: 'Esquerda', value: 'position-left' },
		{ label: 'Centro', value: 'position-center' },
		{ label: 'Direita', value: 'position-right' },
	];

	const sizeTypes = [
		{ label: 'Px', value: 'px' },
		{ label: 'REM', value: 'rem' },
		{ label: 'VW', value: 'vw' },
		{ label: '%', value: '%' },
	];

	const sizeValues = {
		px: {
			label: 'px',
			min: 10,
			step: 1,
			max: 200,
		},
		rem: {
			label: 'rem',
			min: 0.1,
			step: 0.1,
			max: 10,
		},
		vw: {
			label: 'vw',
			min: 0.1,
			step: 0.1,
			max: 20,
		},
		'%': {
			label: '%',
			min: 1,
			step: 1,
			max: 200,
		},
	};

	const resetInnerBlocks = (clientId) => {
		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do texto" className="color-panel">
					<SelectControl
						label="Selecione a tag deste texto"
						value={tag}
						options={tags}
						onChange={(newTag) => setAttributes({ tag: newTag })}
					/>

					<SelectControl
						label="Selecione a fonte deste texto"
						value={fontFamily}
						options={fontFamilies}
						onChange={(newFontFamily) => setAttributes({ fontFamily: newFontFamily })}
					/>

					{!disableSizes && (
						<>
							<ToggleControl
								label="Adicionar tamanhos manualmente:"
								checked={manualSizes}
								onChange={() =>
									setAttributes({
										manualSizes: !manualSizes,
									})
								}
							/>

							{!manualSizes ? (
								<>
									<SelectControl
										label="Tamanho mobile (até 767px)"
										value={oldSizeM ? oldSizeM : sizeM}
										options={sizesM}
										onChange={(newSizeM) => setAttributes({ sizeM: newSizeM })}
									/>

									<SelectControl
										label="Tamanho desktop (a partir de 768px)"
										value={oldSizeD ? oldSizeD : sizeD}
										options={sizesD}
										onChange={(newSizeD) => setAttributes({ sizeD: newSizeD })}
									/>
								</>
							) : (
								<>
									<PanelRow className="font-size-control">
										<p>Tamanho mobile (até 767px)</p>
										<RangeControl
											className="size-value"
											initialPosition={manualSizeM}
											value={manualSizeM}
											onChange={(value) => setAttributes({ manualSizeM: value })}
											min={sizeValues[sizeType].min}
											step={sizeValues[sizeType].step}
											max={sizeValues[sizeType].max}
										/>

										<SelectControl
											className="size-type"
											value={sizeType}
											options={sizeTypes}
											onChange={(newValue) => setAttributes({ sizeType: newValue })}
										/>
									</PanelRow>

									<PanelRow className="font-size-control">
										<p>Tamanho desktop (a partir de 768px)</p>

										<RangeControl
											className="size-value"
											initialPosition={manualSizeD}
											value={manualSizeD}
											onChange={(value) => setAttributes({ manualSizeD: value })}
											min={sizeValues[sizeType].min}
											step={sizeValues[sizeType].step}
											max={sizeValues[sizeType].max}
										/>

										<SelectControl
											className="size-type"
											value={sizeType}
											options={sizeTypes}
											onChange={(newValue) => setAttributes({ sizeType: newValue })}
										/>
									</PanelRow>

									<hr />
								</>
							)}
						</>
					)}

					<RangeControl
						label="Identação do texto"
						initialPosition={textIndent}
						value={textIndent}
						onChange={(value) => setAttributes({ textIndent: value })}
						min={0}
						step={1}
						max={200}
					/>

					<SelectControl
						label="Selecione o peso da fonte"
						value={textWeight}
						options={weights}
						onChange={(newWeight) => setAttributes({ textWeight: newWeight })}
					/>

					<SelectControl
						label="Selecione o alinhamento"
						value={textTransform}
						options={transforms}
						onChange={(newValue) => setAttributes({ textTransform: newValue })}
					/>

					<SelectControl
						label="Selecione o alinhamento"
						value={textAlign}
						options={aligns}
						onChange={(newAlign) => setAttributes({ textAlign: newAlign })}
					/>

					<ToggleControl
						label="Adicionar Largura máxima?"
						checked={hasMaxWidth}
						onChange={() =>
							setAttributes({
								hasMaxWidth: !hasMaxWidth,
							})
						}
					/>

					{hasMaxWidth && (
						<>
							<RangeControl
								label="Largura máxima até 768px (em px)"
								initialPosition={maxWidthM}
								value={maxWidthM}
								onChange={(value) => setAttributes({ maxWidthM: value })}
								min={300}
								step={1}
								max={768}
							/>

							<RangeControl
								label="Largura máxima a partir de 768px (em px)"
								initialPosition={maxWidthD}
								value={maxWidthD}
								onChange={(value) => setAttributes({ maxWidthD: value })}
								min={300}
								step={1}
								max={2400}
							/>

							<SelectControl
								label="Selecione a posição"
								value={position}
								options={positions}
								onChange={(newPosition) => setAttributes({ position: newPosition })}
							/>

							<hr />
						</>
					)}

					<ToggleControl
						label="Adicionar lista junto ao texto?"
						checked={hasInnerBlocks}
						onChange={() => {
							setAttributes({ hasInnerBlocks: !hasInnerBlocks }), resetInnerBlocks(clientId);
						}}
					/>

					<br />
				</PanelBody>

				<PanelBody title="Cores" initialOpen={false} className="color-panel">
					<ColorPanel
						label="Cor do Texto"
						attributeName="color"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
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
