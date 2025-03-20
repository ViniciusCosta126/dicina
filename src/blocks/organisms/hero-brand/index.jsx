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
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, marginM, marginD } = attributes;

	const imagePath = '/wp-content/themes/Template-blocks/images/the-brand/';

	const ALLOWED_BLOCKS = ['il/product'];

	const TEMPLATE = [
		[
			'il/slide-item',
			{
				variant: 'home-hero',
				bgImageMobile: {
					src: imagePath + 'brand-bg-1-m.jpg',
					alt: '',
				},
				bgImage: {
					src: imagePath + 'brand-bg-1.jpg',
					alt: '',
				},
				hasOverlay: true,
				bgOverlay:
					'radial-gradient(50% 50% at 50% 50%, rgba(18, 18, 18, 0.2) 0%, rgba(18, 18, 18, 0.8) 100%)',
			},
			[
				[
					'il/typography',
					{
						content: 'A MARCA',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
				[
					'il/typography',
					{
						content: 'senna',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
			],
		],
		[
			'il/slide-item',
			{
				variant: 'home-hero',
				bgImageMobile: {
					src: imagePath + 'brand-bg-2-m.jpg',
					alt: '',
				},
				bgImage: {
					src: imagePath + 'brand-bg-2.jpg',
					alt: '',
				},
				hasOverlay: true,
				bgOverlay:
					'radial-gradient(50% 50% at 50% 50%, rgba(18, 18, 18, 0.2) 0%, rgba(18, 18, 18, 0.8) 100%)',
			},
			[
				[
					'il/typography',
					{
						content: 'um Legado global em',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
				[
					'il/typography',
					{
						content: 'constante movimento',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
			],
		],
		[
			'il/slide-item',
			{
				variant: 'home-hero',
				bgImageMobile: {
					src: imagePath + 'brand-bg-3-m.jpg',
					alt: '',
				},
				bgImage: {
					src: imagePath + 'brand-bg-3.jpg',
					alt: '',
				},
				hasOverlay: true,
				bgOverlay:
					'radial-gradient(50% 50% at 50% 50%, rgba(18, 18, 18, 0.2) 0%, rgba(18, 18, 18, 0.8) 100%)',
			},
			[
				[
					'il/typography',
					{
						content: 'Inspirando pessoas',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
				[
					'il/typography',
					{
						content: 'em todo o mundo',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
			],
		],
		[
			'il/slide-item',
			{
				variant: 'home-hero',
				bgImageMobile: {
					src: imagePath + 'brand-bg-4-m.jpg',
					alt: '',
				},
				bgImage: {
					src: imagePath + 'brand-bg-4.jpg',
					alt: '',
				},
				hasOverlay: true,
				bgOverlay:
					'radial-gradient(50% 50% at 50% 50%, rgba(18, 18, 18, 0.2) 0%, rgba(18, 18, 18, 0.8) 100%)',
			},
			[
				[
					'il/typography',
					{
						content: 'perpetuando o espírito',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
				[
					'il/typography',
					{
						content: 'INDOMÁVEL de Ayrton Senna',
						color: '#FFFFFF',
						fontFamily: 'poppins',
						sizeM: 'title-3-m',
						sizeD: 'title-3-d',
					},
				],
			],
		],
	];

	const inlineStyles = `
		.hero-brand-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.hero-brand-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`hero-brand ${variant} hero-brand-${randomComponentId}`}>
				<div className="hero-brand__content">
					<InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS} />
				</div>
			</div>
		</>
	);
}
