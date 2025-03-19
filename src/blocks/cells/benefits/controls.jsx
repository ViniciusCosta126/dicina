import { InspectorControls } from "@wordpress/block-editor";
import ColorPanel from "../../../panels/ColorPanel";
import ImagePanel from "../../../panels/ImagePanel";
import { Panel, PanelBody } from "@wordpress/components";

export default function Controls({ attributes, setAttributes }) {
    return <InspectorControls>
        <Panel>
            <PanelBody title="Seção">
                <ColorPanel
                    label="Cor do Título"
                    attributeName="titleColor"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <ColorPanel
                    label="Cor do Subtítulo"
                    attributeName="subtitleColor"
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
            <PanelBody title="Cards">
                <ColorPanel
                    label="Cor do Texto"
                    attributeName="cardTextColor"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <ImagePanel
                    label="Imagem Card 1"
                    attributeName="card1img"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <ImagePanel
                    label="Imagem Card 2"
                    attributeName="card2img"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <ImagePanel
                    label="Imagem Card 3"
                    attributeName="card3img"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            </PanelBody>
        </Panel>
    </InspectorControls>
}

