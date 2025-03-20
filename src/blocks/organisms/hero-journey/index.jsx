import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'cover-image',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { smallTitle, variant, bgColor, marginM, marginD, bgMob, bgDesk, isTextAux, label, title } = attributes;

	const inlineStyles = `
		.hero-journey-${randomComponentId} {
			background: ${bgColor};
			background-image: url(${bgMob.src ? bgMob.src : bgMob.placeholder});
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.hero-journey-${randomComponentId} {
				margin-bottom: ${marginD}px;
				background-image: url(${bgDesk.src ? bgDesk.src : bgDesk.placeholder});
			}
		}
	`;

	const Text = () => {
		if (variant === 'full-screen' && isTextAux) {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								tag: 'h1',
								color: '#ffffff',
								bgColor: 'transparent',
								manualSizes: true,
								manualSizeM: 36,
								manualSizeD: 64,
								widthStrokeM: 3,
								widthStrokeD: 2,
								extraClass: `big-title ${smallTitle ? 'small' : 'big'}`,
								fontFamily: 'poppins',
								content: title,
							},
						],
					]}
				/>
			);
		} else if (variant === 'full-screen') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								tag: 'p',
								color: '#ffffff',
								bgColor: 'transparent',
								manualSizes: true,
								manualSizeM: 20,
								manualSizeD: 32,
								fontFamily: 'poppins',
								textWeight: 'weight-bold',
								extraClass: `label`,
								content: label,
							},
						],
						[
							'il/typography',
							{
								tag: 'h1',
								color: '#ffffff',
								bgColor: 'transparent',
								manualSizes: true,
								manualSizeM: 36,
								manualSizeD: 64,
								widthStrokeM: 3,
								widthStrokeD: 2,
								extraClass: `big-title ${smallTitle ? 'small' : 'big'}`,
								fontFamily: 'poppins',
								content: title,
							},
						],
					]}
				/>
			);
		} else {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								tag: 'h1',
								color: '#ffffff',
								bgColor: 'transparent',
								manualSizes: true,
								manualSizeM: 36,
								manualSizeD: 64,
								widthStrokeM: 3,
								widthStrokeD: 2,
								extraClass: `big-title ${smallTitle ? 'small' : 'big'}`,
								fontFamily: 'poppins',
								content: title,
							},
						],
					]}
				/>
			);
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} clientId={clientId} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`hero-journey ${variant} hero-journey-${randomComponentId}`}>
				<div className="overlay">
					<div className="container">
						<div className="hero-journey__content">
							<Text />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
