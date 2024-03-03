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

	const { bgColor, title, text } = attributes;

	const inlineStyles = `
		.inspire-histories-${randomComponentId} {
			background: ${bgColor};
		}		
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className={`inspire-histories wp-editor inspire-histories-${randomComponentId}`}>
				<div className="container default">
					<InnerBlocks
						template={[
							[
								'il/lightspeed-text',
								{
									tag: 'p',
									sizeM: 'body-1',
									sizeD: 'body-1',
									color: '#0063A4',
									bgColor: '#002753',
								},
							],
							[
								'il/video-background',
								{
									tag: 'p',
									sizeM: 'body-1',
									sizeD: 'body-1',
									color: '#0063A4',
									bgColor: 'transparent',
								},
							],
							[
								'il/typography',
								{
									content: 'Texto',
									tag: 'p',
									sizeM: 'body-5-m',
									sizeD: 'body-4-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'helveticaneue',
									texAlign: 'align-left',
									hasMaxWidth: true,
									position: 'position-left',
									maxWidthM: '100%',
									maxWidthD: '50%',
									marginM: 24,
									marginD: 8,
								},
							],
							[
								'il/button',
								{
									content: 'Conheça a jornada de Ayrton Senna',
									variant: 'link',
									addCustomColor: true,
									color: '#ffffff',
									bgColor: 'transparent',
									colorHover: '#ffffff',
									bgColorHover: 'transparent',
									marginM: 24,
									marginD: 0,
								},
							],
						]}
					/>
				</div>
			</section>
		</>
	);
}
