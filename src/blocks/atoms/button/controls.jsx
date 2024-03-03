import { BlockControls, InspectorControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import {
	Button,
	Panel,
	PanelBody,
	Popover,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { link } from '@wordpress/icons';

import ColorPanel from '../../../panels/ColorPanel';
import ImagePanel from '../../../panels/ImagePanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const { variant, action, modalID, hasLink, addCustomColor, hasIcon, hasTooltip, tooltip } = attributes;
	const [showLinkPicker, setshowLinkPicker] = useState(false);

	function handleLinkChange(newLink) {
		let newLinkAttribute, hasLink;

		if (newLink) {
			newLinkAttribute = {
				url: newLink.url,
				target: newLink.target,
				title: newLink.title,
			};

			hasLink = true;
		} else {
			newLinkAttribute = {
				url: '',
				target: '',
				title: '',
			};

			hasLink = false;
		}

		setAttributes({ hasLink });
		setAttributes({ link: newLinkAttribute });
	}

	function handleVariantChange(variant) {
		let hasIcon;
		if (variant == 'link-icon' || variant == 'share-button') {
			hasIcon = true;
		} else {
			hasIcon = false;
		}

		setAttributes({ hasIcon });
	}

	const linkButtonHandler = () => {
		setshowLinkPicker((prev) => !prev);
	};

	const variants = [
		{ label: 'Primário', value: 'primary' },
		{ label: 'Secundário', value: 'secondary' },
		{ label: 'Terciário', value: 'tertiary' },
		{ label: 'Link', value: 'link' },
		{ label: 'Link Pequeno', value: 'link small' },
		{ label: 'Link Icone', value: 'link-icon' },
		{ label: 'Link Arrow', value: 'link-arrow' },
		{ label: 'Link Double Arrow', value: 'link-double-arrow' },
		{ label: 'Link Tab', value: 'link-tab' },
		{ label: 'Link Preto', value: 'link black' },
		{ label: 'Botão de Abas', value: 'tab-button' },
		{ label: 'Botão de Compartilhamento', value: 'share-button' },
		{ label: 'Icone em css', value: 'css-icon' },
	];

	// Ações que esse botão pode executar
	const actions = [
		{ label: 'Selecione uma opção', value: '', disabled: true },
		{ label: 'Ordenar Carrossel (mais recentes)', value: 'sort-carousel-newest' },
		{ label: 'Ordenar Carrossel (mais antigos)', value: 'sort-carousel-oldest' },
		{ label: 'Abrir modal', value: 'open-modal' },
	];

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton onClick={linkButtonHandler} icon={link} />
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<Panel>
					<PanelBody title="Atributos do botão">
						{variant !== 'css-icon' && (
							<SelectControl
								label="Selecione o estilo deste botão"
								value={variant}
								options={variants}
								onChange={(newVariant) => {
									setAttributes({ variant: newVariant });
									handleVariantChange(newVariant);
								}}
							/>
						)}

						{variant === 'share-button' && (
							<>
								<p>
									As funções de compartilhamento só funcionarão se o botão estiver dentro da célula "Post
									Footer"
								</p>
								<hr />
							</>
						)}

						<ToggleControl
							label="Adicionar tooltip?"
							checked={hasTooltip}
							onChange={() =>
								setAttributes({
									hasTooltip: !hasTooltip,
								})
							}
						/>

						{hasTooltip && (
							<>
								<TextControl
									label="tooltip"
									type="String"
									value={tooltip}
									onChange={(value) => setAttributes({ tooltip: value })}
								/>
								<hr />
							</>
						)}

						{!hasLink && variant !== 'share-button' && (
							<SelectControl
								label="Selecione a ação deste botão: "
								value={action}
								options={actions}
								onChange={(newAction) => setAttributes({ action: newAction })}
							/>
						)}

						{action === 'open-modal' && (
							<>
								<TextControl
									label="Insira um ID para o modal"
									type="String"
									value={modalID}
									onChange={(value) => setAttributes({ modalID: value })}
								/>
								<hr />
							</>
						)}

						<ToggleControl
							label="Adicionar cores customizadas?"
							checked={addCustomColor}
							onChange={() =>
								setAttributes({
									addCustomColor: !addCustomColor,
								})
							}
						/>
					</PanelBody>

					{hasIcon && (
						<Panel>
							<PanelBody title="Icone do botão" className="icon-panel">
								<ImagePanel
									label="Icone do botão"
									attributeName="icon"
									attributes={attributes}
									setAttributes={setAttributes}
								/>
							</PanelBody>
						</Panel>
					)}

					{addCustomColor && (
						<>
							<PanelBody title="Cores do botão" initialOpen={false} className="color-panel">
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

							<PanelBody title="Cores de hover do botão" initialOpen={false} className="color-panel">
								<ColorPanel
									label="Hover do Texto"
									attributeName="colorHover"
									attributes={attributes}
									setAttributes={setAttributes}
								/>
								<ColorPanel
									label="Hover do Fundo"
									attributeName="bgColorHover"
									attributes={attributes}
									setAttributes={setAttributes}
								/>
							</PanelBody>
						</>
					)}

					<MarginPanel attributes={attributes} setAttributes={setAttributes} />
				</Panel>
			</InspectorControls>

			{showLinkPicker && (
				<Popover position="middle center" className="popover-button-option">
					<LinkControl
						settings={[
							{
								id: 'target',
								title: 'Abrir em nova guia?',
							},
						]}
						value={attributes.link}
						onChange={handleLinkChange}
					/>

					<Button className="clear-link" variant="secondary" onClick={() => handleLinkChange()}>
						Limpar
					</Button>

					<Button
						variant="primary"
						onClick={() => setshowLinkPicker(false)}
						style={{ display: 'block', width: '100%' }}
					>
						OK
					</Button>
				</Popover>
			)}
		</>
	);
}
