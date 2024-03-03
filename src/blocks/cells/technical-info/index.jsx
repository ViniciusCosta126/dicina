import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

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
			<svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					{' '}
					<path
						d="M9 17H13M9 13H13M9 9H10M17 18V21M17 15H17.01M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H13M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11.5"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>{' '}
				</g>
			</svg>
		),
	},
	edit: EditorComponent,
	parent: ['il/year-technical-sheet'],
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
		.technical-info-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.technical-info-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;
	const Default = () => {
		return (
			<div className="card">
				<InnerBlocks
					template={[
						[
							'il/wrapper',
							{
								extraClass: '',
							},
							[
								[
									'il/wrapper',
									{ extraClass: 'wrapper-desc' },
									[
										[
											'il/typography',
											{
												content: '800hp',
												color: '#fff',
												tag: 'h4',
												fontFamily: 'helveticaneue',
												manualSizes: true,
												manualSizeM: 20,
												manualSizeD: 32,
											},
										],
										[
											'il/typography',
											{
												content: '900hp',
												color: '#fff',
												tag: 'h4',
												fontFamily: 'helveticaneue',
												manualSizes: true,
												manualSizeM: 20,
												manualSizeD: 32,
											},
										],
									],
								],
								['il/separator', {}],
								[
									'il/typography',
									{
										content: 'corrida (potência)',
										color: '#fff',
										fontFamily: 'helveticaneue',
										extraClass: 'subtitle',
										textAlign: 'align-center',
										manualSizes: true,
										manualSizeM: 14,
										manualSizeD: 22,
									},
								],
							],
						],
						[
							'il/wrapper',
							{
								extraClass: '',
							},
							[
								[
									'il/wrapper',
									{ extraClass: 'wrapper-desc' },
									[
										[
											'il/typography',
											{
												content: '1000hp',
												color: '#fff',
												tag: 'h4',
												fontFamily: 'helveticaneue',
												manualSizes: true,
												manualSizeM: 20,
												manualSizeD: 32,
											},
										],
										[
											'il/typography',
											{
												content: '1200hp',
												color: '#fff',
												tag: 'h4',
												fontFamily: 'helveticaneue',
												manualSizes: true,
												manualSizeM: 20,
												manualSizeD: 32,
											},
										],
									],
								],
								['il/separator', {}],
								[
									'il/typography',
									{
										content: 'classificação',
										color: '#fff',
										fontFamily: 'helveticaneue',
										extraClass: 'subtitle',
										manualSizes: true,
										manualSizeM: 14,
										manualSizeD: 22,
										textAlign: 'align-center',
									},
								],
							],
						],
					]}
				/>
			</div>
		);
	};

	const PowerInitialEnd = () => {
		return (
			<div className="card">
				<InnerBlocks
					template={[
						[
							'il/wrapper',
							{
								extraClass: '',
							},
							[
								[
									'il/wrapper',
									{ extraClass: 'wrapper-desc' },
									[
										[
											'il/typography',
											{
												content: '675hp',
												color: '#fff',
												tag: 'h4',
												fontFamily: 'helveticaneue',
												manualSizes: true,
												manualSizeM: 20,
												manualSizeD: 32,
											},
										],
										[
											'il/typography',
											{
												content: '710hp',
												color: '#fff',
												tag: 'h4',
												fontFamily: 'helveticaneue',
												manualSizes: true,
												manualSizeM: 20,
												manualSizeD: 32,
											},
										],
									],
								],
								['il/separator', {}],
								[
									'il/typography',
									{
										content: 'Potencia',
										color: '#fff',
										fontFamily: 'helveticaneue',
										extraClass: 'subtitle',
										manualSizes: true,
										manualSizeM: 14,
										manualSizeD: 22,
										textAlign: 'align-center',
									},
								],
							],
						],
					]}
				/>
			</div>
		);
	};

	const PowerSeason = () => {
		return (
			<div className="card">
				<InnerBlocks
					template={[
						[
							'il/wrapper',
							{
								extraClass: '',
							},
							[
								[
									'il/typography',
									{
										content: '800hp',
										color: '#fff',
										tag: 'h4',
										fontFamily: 'helveticaneue',
										manualSizes: true,
										manualSizeM: 20,
										manualSizeD: 32,
									},
								],
								['il/separator', {}],
								[
									'il/typography',
									{
										content: 'corrida (potência)',
										color: '#fff',
										fontFamily: 'helveticaneue',
										extraClass: 'subtitle',
										manualSizes: true,
										manualSizeM: 14,
										manualSizeD: 22,
										textAlign: 'align-center',
									},
								],
							],
						],
						[
							'il/wrapper',
							{
								extraClass: '',
							},
							[
								[
									'il/typography',
									{
										content: '800hp',
										color: '#fff',
										tag: 'h4',
										fontFamily: 'helveticaneue',
										manualSizes: true,
										manualSizeM: 20,
										manualSizeD: 32,
										textAlign: 'align-center',
									},
								],
								['il/separator', {}],
								[
									'il/typography',
									{
										content: 'corrida (potência)',
										color: '#fff',
										fontFamily: 'helveticaneue',
										extraClass: 'subtitle',
										manualSizes: true,
										manualSizeM: 14,
										manualSizeD: 22,
										textAlign: 'align-center',
									},
								],
							],
						],
					]}
				/>
			</div>
		);
	};

	const PowerFixed = () => {
		return (
			<div className="card">
				<InnerBlocks
					template={[
						[
							'il/wrapper',
							{
								extraClass: '',
							},
							[
								[
									'il/typography',
									{
										content: '800hp',
										color: '#fff',
										tag: 'h4',
										fontFamily: 'helveticaneue',
										manualSizes: true,
										manualSizeM: 20,
										manualSizeD: 32,
									},
								],
								['il/separator', {}],
								[
									'il/typography',
									{
										content: 'corrida (potência)',
										color: '#fff',
										fontFamily: 'helveticaneue',
										extraClass: 'subtitle',
										manualSizes: true,
										manualSizeM: 14,
										manualSizeD: 22,
										textAlign: 'align-center',
									},
								],
							],
						],
					]}
				/>
			</div>
		);
	};

	const TechnicalInfo = () => {
		if (variant === 'power_fixed') {
			return <PowerFixed />;
		} else if (variant === 'power_initial_end') {
			return <PowerInitialEnd />;
		} else if (variant === 'power_season') {
			return <PowerSeason />;
		} else {
			return <Default />;
		}
	};
	return (
		<>
			{/* Editor controls */}
			<Controls clientId={clientId} attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`technical-info wp-editor ${variant} technical-info-${randomComponentId}`}>
				<TechnicalInfo />
			</div>
		</>
	);
}
