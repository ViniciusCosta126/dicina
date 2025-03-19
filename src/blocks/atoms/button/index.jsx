import { RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';
import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'button',
	edit: EditorComponent,
	save: () => {},
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const {
		content,
		hasEN,
		contentEN,
		variant,
		extraClass,
		addCustomColor,
		action,
		color,
		bgColor,
		colorHover,
		bgColorHover,
		marginM,
		marginD,
	} = attributes;

	const isSecondary = variant === 'secondary' ? true : false;
	const hasCustomColor = addCustomColor ? `overwrite-colors colors-${randomComponentId}` : '';
	const hasThiniArrow = variant === 'link-arrow' ? true : false;
	const hasDoubleArrow = variant === 'link-double-arrow' ? true : false;

	const customColor = addCustomColor
		? `
		.button.colors-${randomComponentId} {
			border: ${isSecondary ? `1px solid ${color ? color : '#fff'}` : 'none'} !important;
			color: ${color ? color : '#ffffff'} !important;
			background-color: ${bgColor ? bgColor : '#0d3842 '} !important;
		}

		.button.colors-${randomComponentId}:hover {
			border: ${isSecondary ? `1px solid ${colorHover ? colorHover : '#fff'}` : 'none'} !important;
			color: ${colorHover ? colorHover : '#ffffff'} !important;
			background-color: ${bgColorHover ? bgColorHover : '#4dbac1'} !important;
		}
		`
		: '';

	const inlineStyles = `
		.button.margin-bottom-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.button.margin-bottom-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>
				{inlineStyles} {customColor}
			</style>

			<div
				className={`button wp-editor ${variant} ${extraClass} ${action} margin-bottom-${randomComponentId} ${hasCustomColor}`}
			>
				{attributes.hasIcon ? (
					<img
						loading="eager"
						src={attributes.icon.src ? attributes.icon.src : ''}
						alt={attributes.icon.alt ? attributes.icon.alt : ''}
						class="logo"
					/>
				) : (
					<>
						<RichText
							allowedFormats={[]}
							tagName={'p'}
							className="text"
							value={content}
							onChange={(newContent) => setAttributes({ content: newContent })}
							placeholder="Call to action"
						/>
						{hasEN && (
							<RichText
								allowedFormats={[]}
								tagName={'p'}
								className="text"
								value={contentEN}
								onChange={(newContent) => setAttributes({ contentEN: newContent })}
								placeholder="Call to action"
							/>
						)}

						{hasThiniArrow && (
							<svg width="22" height="22" fill="none">
								<path
									fill={`#${color}`}
									d="M.217 12.219V9.782h16.71L9.442 2.297l1.74-1.74L21.627 11 11.183 21.444l-1.74-1.74 7.484-7.485H.217Z"
								/>
							</svg>
						)}

						{hasDoubleArrow && <div className="arrows right"></div>}
					</>
				)}
			</div>
		</>
	);
}
