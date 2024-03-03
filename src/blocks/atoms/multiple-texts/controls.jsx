
import { Panel, PanelBody, SelectControl } from '@wordpress/components';
import { InspectorControls } from "@wordpress/block-editor";

import ColorPanel from "../../../panels/ColorPanel";
import MarginPanel from '../../../panels/MarginPanel';


export default function Controls({ attributes, setAttributes }) {
	const { variant, tag, textQuantity } = attributes;

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Variante 2', value: 'secondary' },
	];

    const tags = [
		{ label: 'H1', value: 'h1' },
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
		{ label: 'H4', value: 'h4' },
		{ label: 'H5', value: 'h5' },
		{ label: 'H6', value: 'h6' },
		{ label: 'p', value: 'p' },
	];

    const textQuantities = [ 
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 }
    ]

    return <InspectorControls>
        <Panel>
            <PanelBody title="Atributos do texto" className="color-panel">
                <SelectControl
                    label="Selecione o estilo deste componente:"
                    value={variant}
                    options={variants}
                    onChange={newVariant => setAttributes({ variant: newVariant })}
                />
                <SelectControl
                    label="Selecione a tag deste texto"
                    value={tag}
                    options={tags}
                    onChange={newTag => setAttributes({ tag: newTag })}
                />
                <SelectControl
                    label="Selecione a quantidade de blocos de texto"
                    value={textQuantity}
                    options={textQuantities}
                    onChange={newTextQuantity => setAttributes({ textQuantity: newTextQuantity })}
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
}

