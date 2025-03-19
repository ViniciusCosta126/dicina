import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import metadata from "./block.json";

registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	category: metadata.category,
	icon: "button",
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
		<div class="line"></div>
	);
}
