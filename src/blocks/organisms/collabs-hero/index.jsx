import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'cover-image',
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

	const { variant, bgColor, marginM, marginD, bgMob, bgDesk, sennaLogo, partnerLogo } = attributes;

	const inlineStyles = `
		.collabs-hero-${randomComponentId} {
			background-color: ${bgColor};
			background-image: url(${bgMob.src ? bgMob.src : bgMob.placeholder});
			margin-bottom: ${marginM}px;
		}
		.collabs-hero-${randomComponentId} > .container > .logo-content {
			bottom: 2rem;
			display: flex;
			position: absolute;
		}
		
		@media (min-width: 768px) {
			.collabs-hero-${randomComponentId} {
				margin-bottom: ${marginD}px;
				background-image: url(${bgDesk.src ? bgDesk.src : bgDesk.placeholder});
			}
			.collabs-hero-${randomComponentId} > .container > .logo-content {
				gap: 7rem;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`collabs-hero collabs-hero-${randomComponentId}`}>
				<div className="overlay">
					<div className={`container ${variant}`}>
						<div className="logo-content">
							<div className="senna-logo">
								<img
									src={sennaLogo.src ? sennaLogo.src : sennaLogo.placeholder}
									alt={sennaLogo.alt}
									loading="lazy"
								/>
							</div>
							<div className="partner-logo">
								<img
									src={partnerLogo.src ? partnerLogo.src : partnerLogo.placeholder}
									alt={partnerLogo.alt}
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
