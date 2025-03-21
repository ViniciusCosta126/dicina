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
	icon: (
		<svg viewBox="0 0 16 16">
			<path
				d="M422.714 532.79v6h6v-6zm1 1h4v4h-4z"
				fill="#000"
				strokeWidth=".87499952"
				transform="translate(-421.714 -531.79)"
			/>
			<path
				d="M422.714-546.791h6v6h-6z"
				fill="#000"
				strokeWidth=".87499952"
				transform="matrix(1 0 0 -1 -421.714 -531.79)"
			/>
			<path
				d="M430.714 533.791h6v1h-6zM430.714 541.791h4v1h-4zM430.714 544.791h4v1h-4zM430.714 536.791h6v1h-6z"
				fill="#000"
				strokeWidth=".87499952"
				transform="translate(-421.714 -531.79)"
			/>
		</svg>
	),
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

	const { hasIcon, hasNumber, hasText, hasTextLabel, variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.details-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.details-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const BlockContent = () => {
		let innerBlocks = [];
		let numberSizes = {};

		if (variant === 'centralized') {
			numberSizes = {
				manualSizeM: 48,
				manualSizeD: 90,
			};
		} else {
			numberSizes = {
				manualSizeM: 40,
				manualSizeD: 56,
			};
		}

		const number = [
			'il/typography',
			{
				content: '1º',
				tag: 'p',
				manualSizes: true,
				...numberSizes,
				widthStrokeM: 1.5,
				widthStrokeD: 2,
				color: '#ffffff',
				bgColor: '#ffffff',
				textWeight: 'medium',
				extraClass: 'details-big-number',
			},
		];

		const icon = ['il/icon', { extraClass: 'details-icon' }];

		if (variant === 'centralized') {
			const wrapperInner = [];

			if (hasNumber) {
				wrapperInner.push(number);
			}

			if (hasIcon) {
				wrapperInner.push(icon);
			}

			const wrapper = ['il/wrapper', { extraClass: 'details-number-wrapper' }, [...wrapperInner]];

			innerBlocks.push(wrapper);
		} else {
			if (hasNumber) {
				innerBlocks.push(number);
			}

			if (hasIcon) {
				innerBlocks.push(icon);
			}
		}

		if (hasTextLabel) {
			const text = [
				'il/wrapper',
				{ extraClass: 'details-text-wrapper' },
				[
					[
						'il/typography',
						{
							content: 'Nome',
							tag: 'p',
							manualSizes: true,
							manualSizeM: 24,
							manualSizeD: 26,
							color: '#ffffff',
							bgColor: 'transparent',
							textWeight: 'bold',
							extraClass: 'details-text-wrapper-name',
						},
					],
					[
						'il/typography',
						{
							content: 'Marca',
							tag: 'p',
							manualSizes: true,
							manualSizeM: 16,
							manualSizeD: 20,
							color: '#ffffff',
							bgColor: 'transparent',
							extraClass: 'details-text-wrapper-brand',
						},
					],
				],
			];
			innerBlocks.push(text);
		} else if (hasText) {
			const text = [
				'il/typography',
				{
					content: 'Insira o texto',
					tag: 'p',
					manualSizes: true,
					manualSizeM: 16,
					manualSizeD: 20,
					color: '#ffffff',
					bgColor: 'transparent',
					textWeight: 'medium',
					textTransform: 'uppercase',
					extraClass: 'details-text',
				},
			];
			innerBlocks.push(text);
		}

		return <InnerBlocks template={[...innerBlocks]} />;
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`details ${variant} wp-editor details-${randomComponentId}`}>
				<BlockContent />
			</div>
		</>
	);
}
