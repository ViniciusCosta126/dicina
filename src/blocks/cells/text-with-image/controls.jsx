import { Panel, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { variant, smallTitle, hasImage, isHero, modalID, videoID, hPosition, vPosition } = attributes;

	const variants = [
		{ label: 'Títulos e Texto', value: 'titles-texts' },
		{ label: 'Títulos, texto e botão', value: 'titles-texts-button' },
		{ label: 'Título e Texto Simples', value: 'simple-title-text' },
		{ label: 'Apenas texto', value: 'only-text' },
		{ label: 'Apenas depoimento', value: 'only-testimony' },
		{ label: 'Texto e Depoimento', value: 'text-testimony' },
		{ label: 'Depoimento e Texto', value: 'testimony-text' },
		{ label: 'Texto e vídeo', value: 'text-video' },
		{ label: 'Titulos,textos e depoimentos', value: 'title-text-testimony' },
	];

	const hPositions = [
		{ label: 'Esquerda', value: 'left' },
		{ label: 'Centro', value: 'center' },
		{ label: 'Direira', value: 'right' },
	];

	const vPositions = [
		{ label: 'Top', value: 'top' },
		{ label: 'Centro', value: 'middle' },
		{ label: 'Baixo', value: 'bottom' },
	];

	const setVariant = (newVariant, newSmallTitle) => {
		setAttributes({ variant: newVariant });
		setAttributes({ smallTitle: newSmallTitle });

		if (newVariant === 'titles-texts') {
			setAttributes({ vPosition: 'bottom' });
		} else {
			setAttributes({ vPosition: 'middle' });
		}

		//Clear InnerBlocks and Recreate
		resetInnerBlocks(clientId);
	};

	const setModalID = (newID) => {
		setAttributes({ variant: 'text-video' });
		setAttributes({ modalID: newID });

		//Clear InnerBlocks and Recreate
		resetInnerBlocks(clientId);
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newValue) => setVariant(newValue, false)}
					/>

					{variant === 'titles-texts' && (
						<ToggleControl
							label="Diminuir tamanho do título?"
							checked={smallTitle}
							onChange={(newValue) => setVariant(variant, newValue)}
						/>
					)}

					{variant === 'text-video' && (
						<>
							<TextControl
								label="Insira um ID para o modal do video (não pode existir outro igual) (Ao trocar o ID o conteúdo ira resetar)"
								type="String"
								value={modalID}
								onChange={(newValue) => setModalID(newValue)}
							/>

							<TextControl
								label="Insira apenas o ID do video do youtube"
								type="String"
								value={videoID}
								onChange={(newValue) => setAttributes({ videoID: newValue })}
							/>

							<hr />
						</>
					)}

					<SelectControl
						label="Selecione a posição horizontal do texto:"
						value={hPosition}
						options={hPositions}
						onChange={(newValue) => setAttributes({ hPosition: newValue })}
					/>

					{variant !== 'simple-title-text' && (
						<>
							<SelectControl
								label="Selecione a posição vertical do texto:"
								value={vPosition}
								options={vPositions}
								onChange={(newValue) => setAttributes({ vPosition: newValue })}
							/>

							<hr />

							<ToggleControl
								label="Possui Imagem?"
								checked={hasImage}
								onChange={() => setAttributes({ hasImage: !hasImage })}
							/>

							{hasImage && (
								<>
									<ImagePanel
										label={`Imagem de fundo (Mobile)`}
										attributeName="bgImageMobile"
										attributes={attributes}
										setAttributes={setAttributes}
									/>

									<hr />

									<ImagePanel
										label={`Imagem de fundo (Desktop)`}
										attributeName="bgImageDesk"
										attributes={attributes}
										setAttributes={setAttributes}
									/>

									<br />
								</>
							)}
						</>
					)}

					<ToggleControl
						label="Este é o primeiro componente da página?"
						checked={isHero}
						onChange={() => setAttributes({ isHero: !isHero })}
					/>
				</PanelBody>

				<PanelBody title="Cores" initialOpen={false} className="color-panel">
					<ColorPanel
						label="Cor do Fundo"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<ColorPanel
						label="Cor do Fundo em degradê Mobile"
						attributeName="bgColorDegrade"
						attributes={attributes}
						setAttributes={setAttributes}
					/>

					<ColorPanel
						label="Cor do Fundo em degradê Desktop"
						attributeName="bgColorDegradeDesk"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
