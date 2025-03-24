
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from "./controls.jsx";

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg fill="#000000" width="64px" height="64px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
				<g id="SVGRepo_bgCarrier" stroke-width="0" />
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
				<g id="SVGRepo_iconCarrier"> <title /> <g id="FAQ"> <path d="M74.05,45H47a6,6,0,0,0-6,6v14.1a6,6,0,0,0,6,6H71.22l7.93,7.85a.47.47,0,0,0,.35.15.43.43,0,0,0,.19,0A.5.5,0,0,0,80,78.5V51A6,6,0,0,0,74.05,45Zm5,32.3-7.22-7.15a.47.47,0,0,0-.35-.15H47a5,5,0,0,1-5-5V51a5,5,0,0,1,5-5h27.1a5,5,0,0,1,5,5Z" /> <path d="M55,36.05V22a6,6,0,0,0-6-5.95H22A6,6,0,0,0,16,22V49.5a.5.5,0,0,0,.31.46.43.43,0,0,0,.19,0,.47.47,0,0,0,.35-.15L24.78,42H49.05A6,6,0,0,0,55,36.05ZM24.57,41a.47.47,0,0,0-.35.15L17,48.3V22A5,5,0,0,1,22,17h27.1A5,5,0,0,1,54,22v14.1a5,5,0,0,1-5,5Z" /> <path d="M35.5,34.5a2,2,0,1,0,2,2A2,2,0,0,0,35.5,34.5Zm0,3a1,1,0,1,1,1-1A1,1,0,0,1,35.5,37.5Z" /> <path d="M52,54.5A3.5,3.5,0,1,0,55.5,58,3.5,3.5,0,0,0,52,54.5Zm0,6A2.5,2.5,0,1,1,54.5,58,2.5,2.5,0,0,1,52,60.5Z" /> <path d="M70,54.5A3.5,3.5,0,1,0,73.5,58,3.5,3.5,0,0,0,70,54.5Zm0,6A2.5,2.5,0,1,1,72.5,58,2.5,2.5,0,0,1,70,60.5Z" /> <path d="M61,54.5A3.5,3.5,0,1,0,64.5,58,3.5,3.5,0,0,0,61,54.5Zm0,6A2.5,2.5,0,1,1,63.5,58,2.5,2.5,0,0,1,61,60.5Z" /> <path d="M36.79,19.13a6,6,0,0,0-6.88,3.7,1.88,1.88,0,0,0,.21,1.79,2,2,0,0,0,3.54-.4,2,2,0,0,1,2.44-1.13,2,2,0,0,1,1.32,1.35,2,2,0,0,1-3.12,2.15.49.49,0,0,0-.52-.05.51.51,0,0,0-.28.45v5a2,2,0,0,0,4,0V30.65a6,6,0,0,0-.71-11.52Zm.07,10.68a.5.5,0,0,0-.36.48V32a1,1,0,0,1-2,0V27.82a3,3,0,0,0,3.89-3.64,3,3,0,0,0-5.65-.35,1.05,1.05,0,0,1-1,.67,1,1,0,0,1-.84-.45.91.91,0,0,1-.11-.86,5,5,0,0,1,5.74-3.08,5,5,0,0,1,.28,9.7Z" /> </g> </g>
			</svg>
		)
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

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.faq-item-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.faq-item-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`faq-item ${variant} wp-editor faq-item-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								tag: 'h2',
								sizeM: 'body-4-m',
								sizeD: 'body-4-d',
								color: '#000',
								bgColor: 'transparent',
								content: 'What is Lorem Ipsum?',
								textWeight: "weight-bold"
							},
						],
						[
							'il/typography',
							{
								tag: 'p',
								sizeM: 'body-6-m',
								sizeD: 'body-6-d',
								color: '#000',
								bgColor: 'transparent',
								content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
								textWeight: "weight-normal",
								extraClass: 'resposta'
							},
						],
						[
							'il/overlay-line', {
								heightM: 4,
								heightT: 4,
								heightD: 4,
								bgColor: '#CDD6DA'
							}
						]
					]}
				/>
				<span className='icon-button'></span>
			</div>
		</>
	);
}