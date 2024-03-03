import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import metadata from "./block.json";
import { RichText } from "@wordpress/block-editor";
import Controls from "./controls.jsx";

// Register block.
registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	category: metadata.category,
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
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<section class="benefits" style={{ background: attributes.bgColor }}>
				<div class="container">
					<RichText
						allowedFormats={[]}
						tagName="h2"
						value={attributes.title}
						onChange={(title) => setAttributes({ title: title })}
						style={{
							color: attributes.titleColor,
						}}
					/>

					<RichText
						tagName="p"
						className="subtitle"
						value={attributes.subtitle}
						onChange={(subtitle) => setAttributes({ subtitle: subtitle })}
						style={{
							color: attributes.subtitleColor,
						}}
					/>

					<div class="cards-wrapper">
						<div class="card">
							<div class="img-wrapper" style={{ border: `2px solid ${attributes.cardTextColor}` }}>
								<img src={attributes.card1img.src ? attributes.card1img.src : imagePath + "benefits-default1.png"} alt="" loading="lazy" width="176" height="158" />
							</div>
							<RichText
								tagName="h3"
								value={attributes.card1title}
								onChange={(card1title) => setAttributes({ card1title: card1title })}
								style={{ color: attributes.cardTextColor }}

							/>
							<RichText
								tagName="p"
								value={attributes.card1text}
								onChange={(card1text) => setAttributes({ card1text: card1text })}
								style={{ color: attributes.cardTextColor }}

							/>
						</div>

						<div class="card">
							<div class="img-wrapper" style={{ border: `2px solid ${attributes.cardTextColor}` }}>
								<img src={attributes.card2img.src ? attributes.card2img.src : imagePath + "benefits-default2.png"} alt="" loading="lazy" width="176" height="158" />
							</div>
							<RichText
								tagName="h3"
								value={attributes.card2title}
								onChange={(card2title) => setAttributes({ card2title: card2title })}
								style={{ color: attributes.cardTextColor }}

							/>
							<RichText
								tagName="p"
								value={attributes.card2text}
								onChange={(card2text) => setAttributes({ card2text: card2text })}
								style={{ color: attributes.cardTextColor }}
							/>
						</div>

						<div class="card">
							<div class="img-wrapper" style={{ border: `2px solid ${attributes.cardTextColor}` }}>
								<img src={attributes.card3img.src ? attributes.card3img.src : imagePath + "benefits-default3.png"} alt="" loading="lazy" width="176" height="158" />
							</div>
							<RichText
								tagName="h3"
								value={attributes.card3title}
								onChange={(card3title) => setAttributes({ card3title: card3title })}
								style={{ color: attributes.cardTextColor }}
							/>
							<RichText
								tagName="p"
								value={attributes.card3text}
								onChange={(card3text) => setAttributes({ card3text: card3text })}
								style={{ color: attributes.cardTextColor }}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
