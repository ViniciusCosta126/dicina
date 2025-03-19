import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

import ColorPanel from '../../../panels/ColorPanel';
import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ attributes, setAttributes }) {
	const {
		variant,
		navigation,
		navigationDesktop,
		dots,
		centered,
		autoWidth,
		loop,
		isVertical,
		autoplay,
		speed,
		autoplayTimeout,
		gutter,
		gutterDesktop,
		perView,
		perView480,
		perView768,
		perView960,
		perView1366,
		controlsText,
		id,
	} = attributes;

	const variants = [
		{ label: 'Hero', value: 'hero' },
		{ label: 'Tab Nav', value: 'tabs' },
		{ label: 'Sobre o parceiro', value: 'about-partner' },
		{ label: 'Produtos em uma linha', value: 'products-in-line' },
		{ label: 'Marcas do Grupo', value: 'group-brands' },
		{ label: 'Carousel Números redes socciais', value: 'big-social' },
		{ label: 'Apenas Imagens', value: 'just-image-carousel' },
		{ label: 'Histórias inspiradoras', value: 'stories' },
		{ label: 'Galeria para Produto', value: 'gallery-product' },
		{ label: 'Posts mais lidos', value: 'most-read-posts' },
		{ label: 'Imprensa/Blog', value: 'blog-hero' },
		{ label: 'Texto com Imagem', value: 'text-with-image' },
		{ label: 'Galeria de imagens', value: 'gallery-carousel' },
		{ label: 'Galeria em mosaico', value: 'gallery-mosaic' },
		{ label: 'Wallpapers', value: 'carousel-wallpapers' },
		{ label: 'Livros', value: 'books-carousel' },
	];

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do Carrossel">
					<SelectControl
						label="Selecione o estilo deste componente: "
						value={variant}
						options={variants}
						onChange={(newVariant) => setAttributes({ variant: newVariant })}
					/>

					<ToggleControl
						label="Setas de navegação no mobile?"
						checked={navigation}
						onChange={() => setAttributes({ navigation: !navigation })}
					/>

					<ToggleControl
						label="Setas de navegação em desktop?"
						checked={navigationDesktop}
						onChange={() =>
							setAttributes({
								navigationDesktop: !navigationDesktop,
							})
						}
					/>

					<ToggleControl
						label="Adicionar paginação (dots)?"
						checked={dots}
						onChange={() => setAttributes({ dots: !dots })}
					/>

					<ToggleControl
						label="Largura automáica?"
						checked={autoWidth}
						onChange={() => setAttributes({ autoWidth: !autoWidth })}
					/>

					<ToggleControl
						label="Centralizar items?"
						checked={centered}
						onChange={() => setAttributes({ centered: !centered })}
					/>

					<ToggleControl
						label="O carrossel será em loop?"
						checked={loop}
						onChange={() => setAttributes({ loop: !loop })}
					/>

					<ToggleControl
						label="O carrossel será vertical?"
						checked={isVertical}
						onChange={() => setAttributes({ isVertical: !isVertical })}
					/>

					<ToggleControl
						label="O carrossel passará automaticamente?"
						checked={autoplay}
						onChange={() => setAttributes({ autoplay: !autoplay })}
					/>

					{autoplay && (
						<RangeControl
							label="Tempo em cada slide (em milesegundos)"
							initialPosition={autoplayTimeout}
							value={autoplayTimeout}
							onChange={(value) => setAttributes({ autoplayTimeout: value })}
							min={1000}
							step={100}
							max={20000}
						/>
					)}

					<RangeControl
						label="Espaçamento entre os itens"
						initialPosition={gutter}
						value={gutter}
						onChange={(value) => setAttributes({ gutter: value })}
						min={0}
						step={1}
						max={100}
					/>

					<RangeControl
						label="Espaçamento entre os itens em desktop"
						initialPosition={gutterDesktop}
						value={gutterDesktop}
						onChange={(value) => setAttributes({ gutterDesktop: value })}
						min={0}
						step={1}
						max={100}
					/>

					<RangeControl
						label="Velocidade de transição (em mileseggundos)"
						initialPosition={speed}
						value={speed}
						onChange={(value) => setAttributes({ speed: value })}
						min={100}
						step={10}
						max={2000}
					/>

					{!autoWidth && (
						<>
							<RangeControl
								label="Slides visíveis abaixo de 480px:"
								initialPosition={perView}
								value={perView}
								onChange={(value) => setAttributes({ perView: value })}
								min={1}
								step={0.05}
								max={5}
							/>

							<RangeControl
								label="Slides visíveis acima de 480px:"
								initialPosition={perView480}
								value={perView480}
								onChange={(value) => setAttributes({ perView480: value })}
								min={1}
								step={0.05}
								max={5}
							/>

							<RangeControl
								label="Slides visíveis acima de 768px:"
								initialPosition={perView768}
								value={perView768}
								onChange={(value) => setAttributes({ perView768: value })}
								min={1}
								step={0.1}
								max={5}
							/>

							<RangeControl
								label="Slides visíveis acima de 960px:"
								initialPosition={perView960}
								value={perView960}
								onChange={(value) => setAttributes({ perView960: value })}
								min={1}
								step={0.1}
								max={5}
							/>

							<RangeControl
								label="Slides visíveis acima de 1366px:"
								initialPosition={perView1366}
								value={perView1366}
								onChange={(value) => setAttributes({ perView1366: value })}
								min={1}
								step={0.1}
								max={5}
							/>
						</>
					)}

					<ToggleControl
						label="Alterar botão para setas?"
						checked={controlsText}
						onChange={() => setAttributes({ controlsText: !controlsText })}
					/>

					<TextControl
						label="Insira um identificador ao carrossel"
						type="String"
						value={id}
						onChange={(value) => setAttributes({ id: value })}
					/>
				</PanelBody>

				<PanelBody title="Cores" initialOpen={false} className="color-panel">
					<ColorPanel
						label="Cor do Fundo"
						attributeName="bgColor"
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
