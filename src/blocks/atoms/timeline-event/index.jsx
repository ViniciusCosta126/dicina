import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import metadata from "./block.json";
import Controls from "./controls";
import { RichText } from '@wordpress/block-editor';

registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	category: metadata.category,
	icon: "button",
	edit: EditorComponent,
	save: () => { },
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
			<Controls attributes={attributes} setAttributes={setAttributes} />

			{attributes.contentUp ?
				<div class="node-down-top">
					<div class="info">
						<RichText
							allowedFormats={[]}
							tagName="p"
							className="event-title"
							value={attributes.title}
							onChange={title => setAttributes({ title: title })}
						/>
						<RichText
							allowedFormats={[]}
							tagName="p"
							className="event-text"
							value={attributes.text}
							onChange={text => setAttributes({ text: text })}
						/>
						<RichText
							allowedFormats={[]}
							tagName="p"
							className="event-year"
							value={attributes.year}
							onChange={year => setAttributes({ year: year })}
						/>
					</div>
					<img src={attributes.img.src ? attributes.img.src : imagePath + "/timeline-default1.png"} alt="" loading="lazy" width="184" height="111" />
				</div>

				:
				<div class="node-top-down">
					<img src={imagePath + "/timeline-default1.png"} alt="" loading="lazy" width="184" height="111" />
					<div class="info">
						<RichText
							allowedFormats={[]}
							tagName="p"
							className="event-title"
							value={attributes.title}
							onChange={title => setAttributes({ title: title })}
						/>
						<RichText
							allowedFormats={[]}
							tagName="p"
							className="event-text"
							value={attributes.text}
							onChange={text => setAttributes({ text: text })}
						/>
						<RichText
							allowedFormats={[]}
							tagName="p"
							className="event-year"
							value={attributes.year}
							onChange={year => setAttributes({ year: year })}
						/>
					</div>
				</div>
			}
		</>
	);
}
