import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

import { resetInnerBlocks } from '../../../hooks/common';

export default function Controls({ clientId, attributes, setAttributes }) {
	const { hasIcon, hasNumber, hasText, hasTextLabel, variant } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Centralizado', value: 'centralized' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione o estilo deste componente:"
						value={variant}
						options={variants}
						onChange={(newValue) => setAttributes({ variant: newValue })}
					/>

					<ToggleControl
						label="Possui Número?"
						checked={hasNumber}
						onChange={() => {
							setAttributes({ hasNumber: !hasNumber }), resetInnerBlocks(clientId);
						}}
					/>

					<ToggleControl
						label="Possui Icone?"
						checked={hasIcon}
						onChange={() => {
							setAttributes({ hasIcon: !hasIcon }), resetInnerBlocks(clientId);
						}}
					/>
					{hasIcon && (
						<>
							<p>Clique no icone para alterá-lo</p>
							<hr />
						</>
					)}

					<ToggleControl
						label="Possui Texto?"
						checked={hasText}
						onChange={() => {
							setAttributes({ hasText: !hasText, hasTextLabel: false }), resetInnerBlocks(clientId);
						}}
					/>

					<ToggleControl
						label="Possui Texto e Label?"
						checked={hasTextLabel}
						onChange={() => {
							setAttributes({ hasText: false, hasTextLabel: !hasTextLabel }), resetInnerBlocks(clientId);
						}}
					/>
				</PanelBody>

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
