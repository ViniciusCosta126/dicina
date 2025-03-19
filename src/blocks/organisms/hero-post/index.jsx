import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';

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
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.hero-post-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;

		}

		@media (min-width: 768px) {
			.hero-post-${randomComponentId} {
				margin-bottom: ${marginD}px;

				.block-editor-block-list__layout {
					.wp-block-post-title {
						font-family: 'HelveticaNeue';
						font-style: normal;
						font-weight: 400;
						font-size: 40px;
						line-height: 140%;
						color: #002753;
						width: 90%;
						max-width: 1248px;
						margin: 24px auto;
					}
				}
				.post-hero__content {
					.block-editor-block-list__layout {
						display: flex;
						justify-content: space-between;
						margin: 40px 0;
						padding-bottom: 32px;
						font-family: "HelveticaNeue", Helvetica, Arial, sans-serif;
						font-size: 16px;
						font-weight: 400;
						line-height: 24px;
						letter-spacing: 0em;
						text-align: left;
						border-bottom: 2px solid transparent;
						-o-border-image: linear-gradient(90deg, #00A851 0%, #1832D7 100%);
						border-image: linear-gradient(90deg, #00A851 0%, #1832D7 100%);
						border-image-slice: 1;
						> div {
							&:not(:first-child) {
								margin-top: 0;
								padding-bottom: 0;
								padding-left: 16px;
								border-left: 2px solid #EFD936;
							}

							> * {
								font-family: 'HelveticaNeue';
								font-size: 16px;
							}
						}
					}
				}
			}
		}
	`;

	return (
		<>
			<style>{inlineStyles}</style>

			<section className={`hero-post ${variant} hero-post-${randomComponentId} wp-editor`}>
				<InnerBlocks
					template={[
						['core/post-featured-image'],
						[
							'core/post-title',
							{
								tag: 'h1',
								sizeM: 'body-1-m',
								sizeD: 'body-1-d',
								color: ' #002753',
								bgColor: 'transparent',
							},
						],
						[
							'il/wrapper',
							{
								extraClass: 'post-hero__content container',
								isLocked: true,
							},
							[
								['core/post-date'],
								[
									'il/typography',
									{
										tag: 'p',
										sizeM: 'body-1-m',
										sizeD: 'body-1-d',
										color: ' #232323',
										bgColor: 'transparent',
										content: 'Tempo de leitura (automático)',
									},
								],
								[
									'il/typography',
									{
										tag: 'p',
										sizeM: 'body-1-m',
										sizeD: 'body-1-d',
										color: ' #232323',
										bgColor: 'transparent',
										content: 'Fotografia: (Painel da Hero)',
									},
								],
							],
						],
					]}
				/>
			</section>
		</>
	);
}
