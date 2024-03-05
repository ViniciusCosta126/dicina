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
	icon: 'admin-site',
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
		.declaracao-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.declaracao-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`declaracao ${variant} wp-editor declaracao-${randomComponentId}`}>
				<div className="container">
					<InnerBlocks
						template={[
							[
								'il/wrapper',
								{ extraClass: 'container-text', isLocked: false },
								[
									[
										'il/typography',
										{
											tag: 'p',
											extraClass: 'text-bold',
											manualSizes: true,
											manualSizeD: 24,
											manualSizeM: 18,
											color: '#546060',
											bgColor: 'transparent',
											content:
												'<span>DECLARAÇÃO DE IGUALDADE SALARIAL E DE CRITÉRIOS REMUNERATÓRIOS</span> - 1º Semestre de 2024 ',
										},
									],
									[
										'il/typography',
										{
											tag: 'p',
											manualSizes: true,
											manualSizeD: 24,
											manualSizeM: 18,
											color: '#546060',
											bgColor: 'transparent',
											content: 'DICINA INDUSTRIA E COMERCIO, IMPORTACÃO E EXPORTACAÃO DE TABACOS LTDA',
										},
									],
									[
										'il/typography',
										{
											tag: 'p',
											extraClass: 'text-bold',
											manualSizes: true,
											manualSizeD: 20,
											manualSizeM: 16,
											color: '#546060',
											bgColor: 'transparent',
											content:
												'Declaração preenchida e enviada por <span>MARIO OLIVEIRA LACOURT NETO</span> em 23/02/2024 09:41:22.',
										},
									],
								],
							],
							[
								'il/wrapper',
								{ extraClass: 'container-text', isLocked: false },
								[
									[
										'il/typography',
										{
											tag: 'h2',
											manualSizes: true,
											manualSizeD: 24,
											manualSizeM: 16,
											color: '#546060',
											extraClass: 'text-bold',
											bgColor: 'transparent',
											content: `<p>1. A empresa (DICINA INDUSTRIA E COMERCIO, IMPORTACAO E EXPORTACAO DE TABACOS LTDA) <span>NÃO
											POSSUI</span> plano de cargos e salários ou plano de carreira.</p>
											<p>2. A empresa (DICINA INDUSTRIA E COMERCIO, IMPORTACAO E EXPORTACAO DE TABACOS LTDA) <span>NÃO
											POSSUI</span> politicas de incentivo à contratação de mulheres.</p>
											<p>3. A empresa (DICINA INDUSTRIA E COMERCIO, IMPORTACAO E EXPORTACAO DE TABACOS LTDA) <span>NÃO
											POSSUI</span> políticas para promoção de mulheres a cargos de direção e gerência.</p>
											<p>4. Consideradas políticas que apoiam o incentivo ao compartilhamento de obrigações familiares, a
											empresa (DICINA INDUSTRIA E COMERCIO, IMPORTACAO E EXPORTACAO DE TABACOS LTDA) adota:
											<br/>	- <span>NÃO ADOTA</span> Flexibilização do regime de trabalho para apoio à parentalidade
											<br/>	- Concessão antecipada de férias individuais <span>PARA AMBOS</span>
											<br/>	- Faltas abonadas (art. 4/3 da CLT) <span>PARA AMBOS</span>
											<br/>	- <span>NÃO ADOTA</span> Licença paternidade estendida
											<br/>	- <span>NÃO ADOTA</span> Licença maternidade estendida
											<br/>	- <span>NÃO ADOTA</span> Auxílio creche (ou creche)
											</p>
											<p>5. Os <span>critérios salariais e remuneratórios para progressão na carreira</span> utilizados por sua empresa
											(DICINA INDUSTRIA E COMERCIO, IMPORTACAO E EXPORTACAO DE TABACOS LTDA) são:
											<br/>	- Cumprimento de metas de produção, definidas pela empresa
											<br/>	- Disponibilidade de pessoas em ocupações específicas no mercado de trabalho
											<br/>	- Capacidade de trabalho em equipe </p>`,
										},
									],
								],
							],
						]}
					/>
				</div>
			</div>
		</>
	);
}
