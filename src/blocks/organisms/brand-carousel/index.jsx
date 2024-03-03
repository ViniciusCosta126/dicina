import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

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
			<svg fill="#000000" version="1.1" viewBox="0 0 512 512">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					<rect width="149.333" height="512"></rect> <rect x="192" width="128" height="512"></rect>
					<rect x="362.667" width="149.333" height="512"></rect>
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

	const { variant, firstItem, hasLogo, contentAlign } = attributes;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<section className={`brand-carousel ${variant} wp-editor brand-carousel-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/carousel',
							{
								variant: 'group-brands',
								allowed_blocks: ['il/brand-card'],
								bgColor: 'transparent',
								navigation: true,
								navigationDesktop: true,
								dots: false,
								autoplay: false,
								loop: false,
								perView: 1,
								perView480: 1,
								perView768: 2,
								perView960: 3,
								perView1366: 3,
								controlsText: true,
							},
							[
								[
									'il/brand-card',
									{
										variant: `default ${firstItem === 'dark' ? 'dark' : 'light'}`,
										hasLogo: hasLogo,
										contentAlign: contentAlign,
									},
								],
								[
									'il/brand-card',
									{
										variant: `default ${firstItem === 'dark' ? 'light' : 'dark'}`,
										hasLogo: hasLogo,
										contentAlign: contentAlign,
									},
								],
								[
									'il/brand-card',
									{
										variant: `default ${firstItem === 'dark' ? 'dark' : 'light'}`,
										hasLogo: hasLogo,
										contentAlign: contentAlign,
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
