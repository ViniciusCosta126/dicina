import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg width="200" height="200" viewBox="0 0 395.78 395.78">
				<g fill="#010002">
					<path d="m184.291 30.445-47.162-.057c-12.453 0-22.549 10.071-22.557 22.581l-.163 289.792c0 12.445 10.079 22.606 22.557 22.606l47.129.024c12.485 0 22.597-10.112 22.597-22.549l.154-289.816c.043-12.46-10.078-22.581-22.555-22.581zm-4.503 301.506-38.261.041c-4.357 0-7.925-3.56-7.925-7.917.008-4.357 3.552-7.925 7.933-7.925l38.269.049c4.349 0 7.909 3.56 7.909 7.909 0 4.364-3.544 7.843-7.925 7.843zm.041-226.812-38.261-.024c-4.357 0-7.925-3.56-7.925-7.925s3.568-7.917 7.925-7.917l38.261-.041c4.357 0 7.909 3.633 7.909 7.99-.017 4.348-3.553 7.917-7.909 7.917zM69.849 30.437l-47.105-.057C10.267 30.38.147 40.451.122 52.961L0 342.77c-.033 12.445 10.071 22.606 22.524 22.606l47.113.024c12.494 0 22.622-10.112 22.638-22.549l.122-289.816c.033-12.478-10.063-22.598-22.548-22.598zm-4.455 301.514-38.277.041c-4.341 0-7.917-3.56-7.917-7.917.024-4.357 3.56-7.925 7.925-7.925l38.269.049c4.357 0 7.893 3.56 7.893 7.909.008 4.364-3.544 7.843-7.893 7.843zm0-226.812-38.245-.024c-4.349 0-7.901-3.56-7.901-7.925s3.552-7.917 7.901-7.917l38.245-.041c4.365 0 7.901 3.633 7.901 7.99 0 4.348-3.552 7.917-7.901 7.917zM248.417 62.228c-1.561-7.186-8.649-11.746-15.843-10.169-7.186 1.561-11.738 8.657-10.177 15.843l61.988 284.208c1.561 7.186 8.657 11.738 15.843 10.185 7.186-1.569 11.746-8.665 10.177-15.851L248.417 62.228zM395.471 327.886 333.483 43.671c-1.561-7.186-8.657-11.738-15.843-10.169-7.186 1.569-11.746 8.657-10.177 15.843l61.989 284.216c1.561 7.186 8.657 11.73 15.843 10.169 7.177-1.57 11.745-8.658 10.176-15.844zM270.909 49.987c-.723-3.316-3.991-5.422-7.308-4.698s-5.422 3.999-4.698 7.316l65.037 298.221c.732 3.316 3.999 5.414 7.308 4.698 3.325-.732 5.422-4.007 4.698-7.316L270.909 49.987zM292.247 45.329a6.14 6.14 0 0 0-7.308-4.698 6.157 6.157 0 0 0-4.698 7.308l65.045 298.229a6.13 6.13 0 0 0 7.308 4.682c3.316-.723 5.422-3.991 4.69-7.308L292.247 45.329z" />
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

	const { variant, bgColor } = attributes;

	const inlineStyles = `
		.memory-${randomComponentId} {
			background: ${bgColor};
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`memory ${variant} wp-editor memory-${randomComponentId}`}>
				<div className="container">
					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									content: 'Memórias de um',
									tag: 'strong',
									manualSizes: true,
									manualSizeM: 16,
									manualSizeD: 32,
									color: '#ffffff',
									bgColor: 'transparent',
									textWeight: 'weight-medium',
									marginM: 4,
									marginD: 16,
									extraClass: 'label',
								},
							],
							[
								'il/typography',
								{
									content: 'CAMPEÃO',
									tag: 'h2',
									fontFamily: 'helveticaneue',
									disableSizes: true,
									widthStrokeM: 3,
									widthStrokeD: 6,
									color: 'linear-gradient(0deg, #00A851 0%, #1832D7 100%)',
									bgColor: '#002753',
									marginM: 24,
									marginD: 50,
									extraClass: `big-title`,
								},
							],
							[
								'il/wrapper',
								{
									extraClass: 'memory-image',
									allowedBlocks: ['il/typography', 'il/data-selector'],
								},
								[
									['core/image'],
									[
										'il/sharing-buttons',
										{
											variant: 'closed',
											bgColor: 'transparent',
											enables: ['facebook', 'twitter', 'whatsapp', 'copy'],
										},
									],
								],
							],
							['il/post-listing-header', { variant: 'left-line', bgColor: 'transparent' }],
							[
								'il/typography',
								{
									content:
										'Ayrton Senna completaria 62 anos em 21 de março e essa sempre será uma data especial - assim como toda sua trajetória! <br /><br />Para comemorar, você poderá relembrar 365 momentos memoráveis de sua carreira, um para cada dia do ano.',
									tag: 'p',
									manualSizes: true,
									manualSizeM: 18,
									manualSizeD: 26,
									marginM: 40,
									marginD: 60,
									textWeight: 'weight-light',
									bgColor: 'transparent',
									color: '#ffffff',
									extraClass: 'text',
								},
							],
							[
								'il/sharing-buttons',
								{
									variant: 'default',
									bgColor: 'transparent',
									enables: ['facebook', 'twitter', 'whatsapp', 'copy'],
								},
							],
							[
								'il/wrapper',
								{ extraClass: 'memoirs-form', allowedBlocks: ['il/typography', 'il/data-selector'] },
								[
									[
										'il/typography',
										{
											content: 'Continue pesquisando:',
											tag: 'p',
											manualSizes: true,
											manualSizeM: 20,
											manualSizeD: 26,
											textWeight: 'weight-medium',
											bgColor: 'transparent',
											color: '#ffffff',
											marginM: 24,
											marginD: 37,
											extraClass: 'memoirs-form-text',
										},
									],
									[
										'il/data-selector',
										{
											variant: 'day-month',
											submitLabel: 'VER MEMÓRIA',
										},
									],
								],
							],
						]}
					/>
				</div>
			</div>
		</>
	);
}
