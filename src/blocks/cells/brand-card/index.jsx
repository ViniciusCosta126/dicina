import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	category: metadata.category,
	icon: {
		src: (
			<svg viewBox="0 0 32 32" fill="#000000">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					<g data-name="id card" id="id_card">
						<rect fill="none" height="32" id="wrapper" width="32"></rect>
						<path
							fill="#000000"
							d="M23.92,30.16H8.08a2,2,0,0,1-2-2V3.84a2,2,0,0,1,2-2H23.92a2,2,0,0,1,2,2V28.16A2,2,0,0,1,23.92,30.16Zm0-2v0ZM8.08,3.84V28.16H23.92V3.84Z"
						></path>
						<rect fill="#ffffff" height="10.34" rx="1" ry="1" width="17.84" x="7.08" y="18.82"></rect>
						<path
							fill="#000000"
							d="M23.92,30.16H8.08a2,2,0,0,1-2-2V19.82a2,2,0,0,1,2-2H23.92a2,2,0,0,1,2,2v8.34A2,2,0,0,1,23.92,30.16Zm0-2v0Zm0-8.34H8.08v8.34H23.92Z"
						></path>
						<path fill="#000000" d="M20.15,26.55h-8.3a1,1,0,1,1,0-2h8.3a1,1,0,0,1,0,2Z"></path>
						<path fill="#000000" d="M18.07,23.5H13.93a1,1,0,0,1,0-2h4.14a1,1,0,0,1,0,2Z"></path>
						<circle fill="#ffffff" cx="16" cy="10.34" r="3.09"></circle>
						<path
							fill="#000000"
							d="M16,14.44a4.1,4.1,0,1,1,4.09-4.1A4.1,4.1,0,0,1,16,14.44Zm0-6.19a2.1,2.1,0,1,0,2.09,2.09A2.1,2.1,0,0,0,16,8.25Z"
						></path>
						<path fill="#000000" d="M22.38,18.82h-2a4.38,4.38,0,1,0-8.76,0h-2a6.38,6.38,0,1,1,12.76,0Z"></path>
					</g>
				</g>
			</svg>
		),
	},
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, hasLogo, logo, cardimg, contentAlign, content, titleBrand } = attributes;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div className={`brand-item ${variant} ${contentAlign} brand-item-${randomComponentId}`}>
				{cardimg.src ? <img loading="eager" src={cardimg.src} class="back_img"></img> : ''}

				<div className={`brand__item__content ${variant}`}>
					{hasLogo ? (
						logo.src ? (
							<img loading="eager" src={logo.src} alt={logo.alt ? logo.alt : ''} class="logo"></img>
						) : null
					) : (
						<RichText
							value={titleBrand}
							tagName="p"
							className="brand__content__title"
							allowedFormats={['core/bold', 'core/italic', 'core/strikethrough', 'core/link']}
							onChange={(newContent) => setAttributes({ titleBrand: newContent })}
						/>
					)}

					<RichText
						value={content}
						tagName="p"
						className="brand__content__paragraph"
						allowedFormats={['core/bold', 'core/italic', 'core/strikethrough', 'core/link']}
						onChange={(newContent) => setAttributes({ content: newContent })}
					/>

					<div class="link">
						<InnerBlocks
							template={[
								[
									'il/button',
									{
										content: 'Saiba mais',
										variant: 'link',
										link: {
											target: '',
											url: '#',
										},
									},
								],
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
