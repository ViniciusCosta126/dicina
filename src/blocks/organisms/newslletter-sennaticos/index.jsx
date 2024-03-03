import { InnerBlocks, RichText } from '@wordpress/block-editor';
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
		<svg viewBox="0 0 166.781 166.781">
			<path d="m163.451 70.046-32.35-20.847c-.253-.161-.532-.222-.804-.312v-7.19a3.473 3.473 0 0 0-3.475-3.475H113.92L86.97 21.378a3.47 3.47 0 0 0-3.685 0l-26.95 16.844H39.958a3.473 3.473 0 0 0-3.475 3.475v7.188c-.272.09-.552.152-.804.314L3.329 70.046a3.482 3.482 0 0 0-1.592 2.921v90.339a3.473 3.473 0 0 0 3.475 3.475h156.356a3.473 3.473 0 0 0 3.475-3.475V72.968c0-1.181-.601-2.28-1.592-2.922zM85.128 28.423l15.681 9.799H69.447l15.681-9.799zM43.433 45.171h79.915v78.178c0 .01.006.018.006.029l-11.754 7.137-28.284-15.427a3.483 3.483 0 0 0-3.386.034l-25.81 14.749-10.692-6.492c0-.01.006-.018.006-.028l-.001-78.18zM8.687 74.861l27.796-17.91v62.212L8.687 102.285V74.861zm0 35.551 38.537 23.397-38.537 22.022v-45.419zm7.002 49.421 66.005-37.715 69.145 37.715H15.689zm142.405-3.959L118.65 134.36l39.444-23.949v45.463zm0-53.589-27.797 16.877V56.951l27.797 17.911v27.423z" />
			<path d="M57.331 79.917h41.695a3.473 3.473 0 0 0 3.475-3.475V55.595a3.473 3.473 0 0 0-3.475-3.475H57.331a3.473 3.473 0 0 0-3.475 3.475v20.847a3.473 3.473 0 0 0 3.475 3.475zm3.474-20.848h34.746v13.898H60.805V59.069zM53.856 86.866h55.593v6.949H53.856zM53.856 100.765h55.593v6.949H53.856zM147.67 41.697c.889 0 1.778-.339 2.457-1.018l12.283-12.283a3.473 3.473 0 1 0-4.913-4.913l-12.283 12.283a3.473 3.473 0 0 0 2.456 5.931zM16.654 40.679a3.463 3.463 0 0 0 2.457 1.018 3.473 3.473 0 0 0 2.457-5.931L9.284 23.483a3.473 3.473 0 1 0-4.913 4.913l12.283 12.283zM118.584 24.076a3.474 3.474 0 0 0 4.516-1.938l6.949-17.373a3.475 3.475 0 0 0-6.453-2.579l-6.949 17.373a3.475 3.475 0 0 0 1.937 4.517zM47.155 22.139a3.472 3.472 0 0 0 4.516 1.937 3.475 3.475 0 0 0 1.937-4.516L46.659 2.187a3.475 3.475 0 0 0-6.453 2.579l6.949 17.373z" />
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
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, bgColor, marginM, marginD, bgImage } = attributes;

	const inlineStyles = `
		.newslletter-sennaticos-${randomComponentId} {
			caret-color: #fff;
            background: ${bgColor}, url(${bgImage.src}) no-repeat;
			background-size: cover;
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.newslletter-sennaticos-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`newslletter-sennaticos ${variant} wp-editor newslletter-sennaticos-${randomComponentId}`}>
				<div className="container">
					<RichText
						allowedFormats={[]}
						className="newslletter-sennaticos__title"
						placeholder="Texto principal"
						value={attributes.titleMobile.normal}
						onChange={(title) =>
							setAttributes({
								titleMobile: {
									...attributes.titleMobile,
									normal: title,
								},
							})
						}
					/>

					<form className="newslletter-sennaticos__form" action="">
						<InnerBlocks
							template={[
								[
									'il/input',
									{
										variant: 'email',
										placeholder: 'digite seu email',
										errorMessage: 'E-mail inválido',
										name: 'email',
										ariaLabel: 'E-mail',
										required: true,
										checkboxLabel: '',
										regexValidate: '^[w-.]+@([w-]+.)+[w-]{2,4}$',
									},
								],
								[
									'il/input',
									{
										variant: 'submit',
										buttonLabel: 'INSCREVER',
										name: '',
										ariaLabel: '',
										checkboxLabel: '',
									},
								],
								['il/social-media-list', { variant: 'sennaticos' }],
							]}
						/>
					</form>
				</div>
			</div>
		</>
	);
}