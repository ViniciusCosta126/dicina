import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'admin-site',
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

	const { variant, bgColor, marginM, marginD, containerSize } = attributes;

	const inlineStyles = `
		.lightspeed-text-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.lightspeed-text__container{
			position: static !important;
		}

		.lightspeed-text__container > *{
			transform: translateX(0);
		}

		@media (min-width: 768px) {
			.lightspeed-text-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>
			<div className={`lightspeed-text ${variant} lightspeed-text-${randomComponentId}`}>
				<div className={`${containerSize}`}>
					<div className={`lightspeed-text__container wiggle`}>
						<InnerBlocks
							template={[
								[
									'il/typography',
									{
										tag: 'p',
										manualSizes: true,
										manualSizeM: 3,
										manualSizeD: 5,
										sizeType: 'vw',
										color: '#FFF',
										content: 'Texto auxiliar',
										textWeight: 'weight-bold',
									},
								],
								[
									'il/typography',
									{
										tag: 'h2',
										manualSizes: true,
										manualSizeM: 3,
										manualSizeD: 5,
										sizeType: 'vw',
										fontFamily: 'poppins',
										content: 'Texto principal',
										color: 'linear-gradient(0deg,#00A851 0%,#1832D7 100%)',
										bgColor: '#002753',
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
