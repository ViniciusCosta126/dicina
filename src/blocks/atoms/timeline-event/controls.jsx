import { InspectorControls } from "@wordpress/block-editor";
import { Panel, PanelBody, PanelRow, ToggleControl } from "@wordpress/components";
import { useState } from '@wordpress/element';
import ImagePanel from "../../../panels/ImagePanel";

export default function Controls({ attributes, setAttributes }) {
    const [contentUp, setContentUp] = useState(false);

    return <InspectorControls>
        <Panel>
            <PanelBody title="Orientação">
                <PanelRow>
                    <ToggleControl
                        label="Para Cima / Para Baixo"
                        checked={contentUp}
                        onChange={() => {
                            setContentUp((state) => !state);
                            setAttributes({...attributes, contentUp: contentUp});
                        }}
                    />
                </PanelRow>
            </PanelBody>
            <PanelBody title="Imagem">
                <ImagePanel
                    label="Imagem"
                    attributeName="img"
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            </PanelBody>
        </Panel>
    </InspectorControls>
}

