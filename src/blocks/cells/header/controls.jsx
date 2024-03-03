import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

import ImagePanel from '../../../panels/ImagePanel';

export default function Controls({ attributes, setAttributes }) {
	const {
		colorVariant,
		breadcrumb,
		breadcrumbLink,
		startTransparent,
		hasSearch,
		position,
		shortMenu,
		shopLink,
		shopLinkEn,
		keepShortMenus,
	} = attributes;

	const colorVariants = [
		{ label: 'Azul', value: 'blue' },
		{ label: 'Preto', value: 'black' },
		{ label: 'Transparent', value: 'transparent' },
	];

	const positions = [
		{ label: 'Fixa', value: 'p-fixed' },
		{ label: 'Normal', value: 'p-relative' },
	];

	const shortMenus = [
		{ label: 'Principal', value: 'main' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Imagem do Big menu" initialOpen={true}>
					<SelectControl
						label="Selecione a cor do cabeçalho:"
						value={colorVariant}
						options={colorVariants}
						onChange={(newValue) => setAttributes({ colorVariant: newValue })}
					/>

					<ToggleControl
						label="Inicia transparent?"
						checked={startTransparent}
						onChange={() => setAttributes({ startTransparent: !startTransparent })}
					/>

					<SelectControl
						label="Selecione o menu curto:"
						value={shortMenu}
						options={shortMenus}
						onChange={(newValue) => setAttributes({ shortMenu: newValue })}
					/>

					<TextControl
						label="Nome do menu Português"
						type="String"
						value={breadcrumb.pt}
						onChange={(newValue) => setAttributes({ breadcrumb: { pt: newValue, en: breadcrumb.en } })}
					/>

					<TextControl
						label="Link do menu Português"
						type="String"
						value={breadcrumbLink.pt}
						onChange={(newValue) => setAttributes({ breadcrumbLink: { pt: newValue, en: breadcrumbLink.en } })}
					/>

					<TextControl
						label="Nome do menu Inglês"
						type="String"
						value={breadcrumb.en}
						onChange={(newValue) => setAttributes({ breadcrumb: { pt: breadcrumb.pt, en: newValue } })}
					/>

					<TextControl
						label="Link do menu Inglês"
						type="String"
						value={breadcrumbLink.en}
						onChange={(newValue) => setAttributes({ breadcrumbLink: { pt: breadcrumbLink.pt, en: newValue } })}
					/>

					<ToggleControl
						label="Manter menu curto no mobile?"
						checked={keepShortMenus}
						onChange={() => setAttributes({ keepShortMenus: !keepShortMenus })}
					/>

					<TextControl
						label="Link da loja"
						type="String"
						value={shopLink}
						onChange={(newValue) => setAttributes({ shopLink: newValue })}
					/>

					<TextControl
						label="Link da loja em ingles"
						type="String"
						value={shopLinkEn}
						onChange={(newValue) => setAttributes({ shopLinkEn: newValue })}
					/>

					<ToggleControl
						label="Mostrar busca?"
						checked={hasSearch}
						onChange={() => setAttributes({ hasSearch: !hasSearch })}
					/>

					<SelectControl
						label="Selecione posição:"
						value={position}
						options={positions}
						onChange={(newValue) => setAttributes({ position: newValue })}
					/>

					<ImagePanel attributeName="bigMenuImg" attributes={attributes} setAttributes={setAttributes} />
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
