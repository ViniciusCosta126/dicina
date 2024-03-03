import {registerBlockType} from "@wordpress/blocks";
import "./style.scss";

registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	category: metadata.category,
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
		<></>
	);
}
