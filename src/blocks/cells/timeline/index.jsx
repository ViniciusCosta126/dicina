import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import metadata from "./block.json";
import Controls from "./controls.jsx";
import { InnerBlocks } from "@wordpress/block-editor";

// Register block.
registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	category: metadata.category,
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {

	const imagePath = "/wp-content/themes/Template-blocks/images/";

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<section class="timeline">
				<div class="container">
					<h2 class="title">Nossa história</h2>
					<p class="subtitle">Nosso caminho para chegar até aqui.</p>
					<a href="" class="cta">Quero fazer parte</a>

					<div class="scroll-x-viewport">
						<InnerBlocks allowedBlocks={["il/timeline-event", "il/timeline-separator"]} />
					</div>
				</div>
			</section>
		</>
	);
}
