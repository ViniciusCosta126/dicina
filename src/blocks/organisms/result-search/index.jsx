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
	icon: 'search',
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
		.result-search-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.result-search-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`result-search ${variant} result-search-${randomComponentId}`}>
				<div className="container">
					<div className="info">
						<span>%% Textos para busca com sucesso</span>
						<RichText
							tagName="p"
							placeholder="Digite aqui o texto de busca"
							value={attributes.textSuccess}
							onChange={(value) => setAttributes({ textSuccess: value })}
						/>
						<hr />
					</div>

					<div className="info">
						<span>%% Textos para busca sem resultados</span>

						<span>%% Texto principal %% </span>
						<RichText
							tagName="p"
							placeholder="Digite aqui o texto de busca"
							value={attributes.textFail}
							onChange={(value) => setAttributes({ textFail: value })}
						/>
						<hr />
						<span>%% Texto auxiliar %% </span>
						<RichText
							tagName="p"
							placeholder="Digite aqui o texto de busca"
							value={attributes.subTextFail}
							onChange={(value) => setAttributes({ subTextFail: value })}
						/>

						<hr />

						<span>%% Texto e link para página de sugestão (contato)%% </span>
						<RichText
							placeholder="Digite o texto"
							value={attributes.linkFailSuggestion}
							onChange={(value) => setAttributes({ linkFailSuggestion: value })}
						/>
					</div>

					<div className="info">
						<span>%% Textos para titulo da listagem de posts %% </span>
						<span>%% Texto auxiliar %% </span>
						<RichText
							tagName="p"
							placeholder="Digite aqui o texto de busca"
							value={attributes.auxTextPostListFail}
							onChange={(value) => setAttributes({ auxTextPostListFail: value })}
						/>
						<hr />
						<span>%% Texto principal %% </span>
						<RichText
							tagName="p"
							placeholder="Digite aqui o texto de busca"
							value={attributes.textPostListFail}
							onChange={(value) => setAttributes({ textPostListFail: value })}
						/>
					</div>

					<InnerBlocks
						template={[
							[
								'il/post-listing',
								{
									paginationType: 'pagination',
									filterBy: -1,
								},
							],
						]}
					/>
				</div>
			</div>
		</>
	);
}
