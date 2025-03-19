import { Panel, PanelBody, DateTimePicker, SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';
import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes, handleUpdate }) {
	const {
		variant,
		hasControls,
		hasExpanded,
		date,
		bgFile,
		bgFileExpanded,
		hasEmbed,
		hasEmbedExpanded,
		embedContent,
		embedContentExpanded,
	} = attributes;

	const variants = [{ label: 'Padrão', value: 'Default' }];

	const isVideo = bgFile.type.includes('video');
	const expandedIsVideo = bgFileExpanded.type.includes('video');

	return (
		<InspectorControls>
			<Panel>
				{hasControls ? (
					<>
						<PanelBody title="Atributos do slide">
							<SelectControl
								label="Selecione o estilo deste componente:"
								value={variant}
								options={variants}
								onChange={(newVariant) => setAttributes({ variant: newVariant })}
							/>

							<ToggleControl
								label="Inserir código embedado?"
								checked={hasEmbed}
								onChange={() => setAttributes({ hasEmbed: !hasEmbed })}
							/>

							{!hasEmbed ? (
								<>
									<ImagePanel
										label={`Imagem do slide`}
										attributeName="bgFile"
										attributes={attributes}
										setAttributes={setAttributes}
									/>

									{isVideo && (
										<>
											<br />
											<ImagePanel
												label={`Insira uma capa para o vídeo`}
												attributeName="posterImage"
												attributes={attributes}
												setAttributes={setAttributes}
											/>
											<br />
										</>
									)}
								</>
							) : (
								<TextControl
									label="Cole o código fornecido pela plataforma"
									type="String"
									value={embedContent}
									onChange={(newValue) => setAttributes({ embedContent: newValue })}
								/>
							)}

							<br />

							<div className="data-controler">
								<p>Selecione a data deste Vídeo/Imagem: </p>
								<br />

								<DateTimePicker
									currentDate={date}
									onChange={(newValue) => {
										setAttributes({ date: newValue });
										handleUpdate({ date: newValue });
									}}
									is12Hour={false}
								/>
							</div>
						</PanelBody>

						{hasExpanded && (
							<PanelBody title="Atributos do slide expandido">
								<ToggleControl
									label="Inserir código embedado?"
									checked={hasEmbedExpanded}
									onChange={() => {
										setAttributes({ hasEmbedExpanded: !hasEmbedExpanded });
										handleUpdate({ hasEmbed: !hasEmbedExpanded });
									}}
								/>

								{!hasEmbedExpanded ? (
									<>
										<ImagePanel
											label={`Imagem do slide`}
											attributeName="bgFileExpanded"
											attributes={attributes}
											setAttributes={setAttributes}
											onChange={(e) => handleUpdate(e)}
											onChangeAttribute="bgFile"
										/>
										{expandedIsVideo && (
											<>
												<br />
												<ImagePanel
													label={`Insira uma capa para o vídeo`}
													attributeName="posterImageExpanded"
													attributes={attributes}
													setAttributes={setAttributes}
													onChange={(e) => handleUpdate(e)}
													onChangeAttribute="posterImage"
												/>
												<br />
											</>
										)}
									</>
								) : (
									<TextControl
										label="Cole o código fornecido pela plataforma"
										type="String"
										value={embedContentExpanded}
										onChange={(newValue) => {
											setAttributes({ embedContentExpanded: newValue });
											handleUpdate({ embedContent: newValue });
										}}
									/>
								)}
							</PanelBody>
						)}
					</>
				) : (
					<PanelBody title="Atributos do slide">
						<p>Insira as informações do bloco a partir da thumb</p>
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
