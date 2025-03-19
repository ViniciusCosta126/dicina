import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'admin-users',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const [templateBlock, setTemplateBlock] = useState(null);

	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, imagePartner, marginM, marginD } = attributes;

	const inlineStyles = `
		.partner-item-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.partner-item-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const contentClass = `partner-item-${variant}`;

	useEffect(() => {
		if (variant === 'about') {
			setTemplateBlock([
				'il/container',
				{
					containerSize: 'container-block default',
				},
				[
					[
						'il/typography',
						{
							content: 'Nome do parceiro...',
							tag: 'h1',
							sizeM: 'body-3-m',
							sizeD: 'body-5-d',
							color: '#121212',
							bgColor: 'transparent',
							textWeight: 'weight-medium',
							marginM: 29,
							marginD: 32,
							extraClass: 'uppercase',
						},
					],
					[
						'il/typography',
						{
							content:
								'Excepteur officia exercitation in et reprehenderit nulla minim irure ut. Proident do ad consequat deserunt duis. Fugiat dolore adipisicing dolore cillum consequat esse in officia esse irure do adipisicing nulla. Incididunt anim dolor nostrud elit aute incididunt. Ut aute cillum enim nostrud sit deserunt sunt non veniam sint do veniam. Occaecat veniam laborum commodo ad laboris dolore elit Lorem exercitation occaecat ex quis.',
							tag: 'p',
							sizeM: 'body-5-m',
							sizeD: 'body-7-d',
							color: '#121212',
							bgColor: 'transparent',
							marginM: 29,
							marginD: 32,
						},
					],
				],
			]);
		} else if (variant === 'testimony') {
			setTemplateBlock([
				'il/container',
				{ containerSize: 'container-block default' },
				[
					[
						'il/testimony',
						{
							content:
								'Bloco opcional.<br />Caso Não exista um depoimento, o bloco "Item parceiro" deve ser removido por inteiro!',
						},
					],
				],
			]);
		} else {
			setTemplateBlock(null);
		}
	}, [variant]);

	if (variant === 'image') {
		return (
			<>
				{/* Editor controls */}
				<Controls attributes={attributes} setAttributes={setAttributes} />
				<style>{inlineStyles}</style>

				<div className={`partner-item ${variant} partner-item-${randomComponentId}`}>
					<div className="partner-item-image">
						<img src={imagePartner.src} alt={imagePartner.alt} />
					</div>
				</div>
			</>
		);
	} else if (templateBlock && variant !== 'image') {
		return (
			<>
				{/* Editor controls */}
				<Controls attributes={attributes} setAttributes={setAttributes} />

				<style>{inlineStyles}</style>

				<div className={`partner-item ${variant} partner-item-${randomComponentId}`}>
					<div className={contentClass}>
						<InnerBlocks template={[templateBlock]} />
					</div>
				</div>
			</>
		);
	} else {
		return <Controls attributes={attributes} setAttributes={setAttributes} />;
	}
}
