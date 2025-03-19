import {registerBlockType} from "@wordpress/blocks";
import "./style.scss";
import {RichText, InspectorControls} from "@wordpress/block-editor";
import metadata from "./block.json";
import ColorPanel from "../../../panels/ColorPanel";
import {Panel, PanelBody} from "@wordpress/components";

registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	category: metadata.category,
	icon: "heading",
	edit: EditorComponent,
	save: () => {},
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({attributes, setAttributes}) {
	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title="Seção">
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
				</Panel>
			</InspectorControls>

			<RichText
				allowedFormats={[]}
				tagName="h1"
				className="heading"
				value={attributes.content}
				onChange={(content) => setAttributes({content: content})}
				placeholder="Call to action"
				style={{
					color: attributes.color,
					backgroundColor: attributes.bgColor,
				}}
			/>
		</>
	);
}
