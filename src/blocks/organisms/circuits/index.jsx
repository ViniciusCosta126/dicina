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
	icon: (
		<svg viewBox="0 0 32 32">
			<path d="M21 26.36H11C5.288 26.36.64 21.713.64 16 .64 10.288 5.288 5.64 11 5.64h10c5.713 0 10.36 4.647 10.36 10.36S26.713 26.36 21 26.36zm-10-20c-5.315 0-9.64 4.325-9.64 9.64s4.325 9.64 9.64 9.64h10c5.315 0 9.64-4.324 9.64-9.64S26.315 6.36 21 6.36h-6.64v2.28H21c4.059 0 7.36 3.302 7.36 7.36 0 4.059-3.302 7.36-7.36 7.36H11c-4.058 0-7.36-3.302-7.36-7.36S6.942 8.64 11 8.64h.64V6.36H11zm0 3c-3.661 0-6.64 2.979-6.64 6.64s2.979 6.64 6.64 6.64h10c3.661 0 6.64-2.979 6.64-6.64S24.661 9.36 21 9.36h-6.64v2.28H21c2.404 0 4.36 1.956 4.36 4.36s-1.956 4.36-4.36 4.36H11c-2.404 0-4.36-1.956-4.36-4.36s1.956-4.36 4.36-4.36h.64V9.36H11zm0 3c-2.007 0-3.64 1.633-3.64 3.64s1.633 3.64 3.64 3.64h10c2.007 0 3.64-1.633 3.64-3.64s-1.633-3.64-3.64-3.64H11zm1.36-.72h1.28V9.36h-1.28v2.28zm0-3h1.28V6.36h-1.28v2.28z" />
			<path d="M0 0h32v32H0z" fill="none" />
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

	const { variant, bgColor, bgColorDegrade, bgColorDegradeDesk, bgImageMobile, bgImageDesk, marginM, marginD } = attributes;

	const inlineStyles = `
		.circuits-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		.circuits-${randomComponentId} .circuits-background::after {
			background: ${bgColorDegrade};
        }
		
		@media (min-width: 768px) {
			.circuits-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}

			.circuits-${randomComponentId} .circuits-background::after {
				background: ${bgColorDegradeDesk};
			}
		}
	`;

	const BlockContent = () => {
		if (variant === 'default') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Nome do circuito..',
								tag: 'strong',
								manualSizes: true,
								manualSizeM: 16,
								manualSizeD: 16,
								color: '#ffffff',
								bgColor: 'transparent',
								textWeight: 'weight-medium',
								textTransform: 'uppercase',
								marginM: 16,
								marginD: 8,
								extraClass: 'label',
							},
						],
						[
							'il/post-listing-header',
							{
								variant: 'section-title',
								bigAux: true,
								bgColor: 'transparent',
								marginM: 40,
								marginD: 57,
							},
						],
						['il/circuit-detail', { position: 'top-center' }],
					]}
					templateLock={true}
				/>
			);
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`circuits ${variant} wp-editor circuits-${randomComponentId}`}>
				<div className="container">
					<div className="circuits-content">
						<BlockContent />
					</div>
				</div>

				<picture className={`circuits-background`}>
					<source srcset={bgImageDesk.src} media="(min-width: 768px)" />
					<img src={bgImageMobile.src} alt={bgImageMobile.alt} />
				</picture>
			</div>
		</>
	);
}
