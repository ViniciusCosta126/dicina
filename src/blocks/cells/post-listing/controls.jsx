import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

import MarginPanel from '../../../panels/MarginPanel';

export default function Controls({ clientId, attributes, setAttributes }) {
	const {
		variant,
		firstItem,
		filterBy,
		delete_category,
		excluded_categories,
		amount,
		perPage,
		paginationType,
		titleTag,
		withImages,
		isSeeAll,
	} = attributes;

	const tags = [
		{ label: 'H1', value: 'h1' },
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
	];

	const variants = [
		{ label: 'Padrão', value: 'default' },
		{ label: 'Sidebar', value: 'sidebar' },
		{ label: 'Jornada', value: 'journey' },
	];

	// Listagem de categorias
	const { useSelect } = wp.data;
	const filters = useSelect(
		(select) => {
			const categories = select('core').getEntityRecords('taxonomy', 'category', { per_page: 100 });
			const all = [
				{ label: 'Todos', value: 0 },
				{ label: 'Busca', value: -1, disabled: variant === 'sidebar' },
				{ label: 'Mais lidas', value: -2, disabled: variant === 'sidebar' },
			];

			if (!categories) {
				return false;
			} else {
				const cats = categories.map((item) => {
					return { label: item.name, value: item.id };
				});

				all.push(...cats);
				return all;
			}
		},
		[variant]
	);

	const sizes = [
		{ label: 'Pequeno', value: 'small' },
		{ label: 'Médio', value: 'medium' },
		{ label: 'Grande', value: 'large' },
	];

	const paginations = [
		{ label: 'Nenhuma', value: 'none' },
		{ label: 'Ver Todos', value: 'see-all' },
		{ label: 'Ver Mais', value: 'see-more' },
		{ label: 'Paginação', value: 'pagination' },
	];

	const clearBlocks = (newValue) => {
		setAttributes({ paginationType: newValue });

		//Clear InnerBlocks and Recreate
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};

	const clearBlocksPagination = () => {
		setAttributes({ isSeeAll: !isSeeAll });
		const currentBlock = wp.data.select('core/block-editor').getBlocksByClientId(clientId)[0];
		const childBlocks = currentBlock.innerBlocks;
		const clientIds = childBlocks.map((block) => block.clientId);
		wp.data.dispatch('core/editor').removeBlocks(clientIds);
	};

	const setExcludeCategories = (newValue) => {
		if (excluded_categories.includes(newValue)) {
			const categorias = excluded_categories.filter((item) => item !== newValue);
			setAttributes({ excluded_categories: categorias });
		} else {
			const categorias = excluded_categories;
			categorias.push(newValue);
			setAttributes({ excluded_categories: categorias });
		}
	};

	const setExcludeToogle = () => {
		if (delete_category === false) {
			setAttributes({
				delete_category: !delete_category,
				excluded_categories: [],
			});
		} else {
			setAttributes({
				delete_category: !delete_category,
			});
		}
	};

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Selecione a variant:"
						value={variant}
						options={variants}
						onChange={(newValue) => {
							if (newValue === 'sidebar') setAttributes({ amount: 4 });
							setAttributes({ variant: newValue });
						}}
					/>

					{variant === 'sidebar' && (
						<ToggleControl
							label="Com imagens?"
							checked={withImages}
							onChange={() => setAttributes({ withImages: !withImages })}
						/>
					)}

					<SelectControl
						label="Selecione o filtro:"
						value={filterBy}
						options={filters}
						onChange={(newValue) => setAttributes({ filterBy: parseInt(newValue) })}
					/>

					<ToggleControl
						label="Deseja excluir alguma categoria?"
						checked={delete_category}
						onChange={() => setExcludeToogle()}
					/>
					{delete_category && filters.length > 3 && (
						<SelectControl
							multiple
							label="Selecione as categorias:"
							value={excluded_categories}
							options={filters.slice(3)}
							onChange={(newValue) => setExcludeCategories(parseInt(newValue))}
						/>
					)}

					{variant !== 'sidebar' && (
						<SelectControl
							label="Selecione o tamanho do primeiro item:"
							value={firstItem}
							options={sizes}
							onChange={(newValue) => setAttributes({ firstItem: newValue })}
						/>
					)}

					<SelectControl
						label="Seleciona a Tag dos títulos"
						value={titleTag}
						options={tags}
						onChange={(newValue) => setAttributes({ titleTag: newValue })}
					/>

					<RangeControl
						label="Quantidade inicial"
						initialPosition={amount}
						value={amount}
						onChange={(value) => setAttributes({ amount: value })}
						min={1}
						step={1}
						max={30}
					/>

					<SelectControl
						label="Selecione tipo de paginação:"
						value={paginationType}
						options={paginations}
						onChange={(newValue) => clearBlocks(newValue)}
					/>

					{paginationType === 'see-more' && (
						<>
							<RangeControl
								label="Quantos cards carregar?"
								initialPosition={perPage}
								value={perPage}
								onChange={(value) => setAttributes({ perPage: value })}
								min={3}
								step={3}
								max={9}
							/>
							<br />
							<ToggleControl
								label="Quer adicionar o botao ver todos?"
								checked={isSeeAll}
								onChange={() => clearBlocksPagination()}
							/>
						</>
					)}
				</PanelBody>

				<MarginPanel attributes={attributes} setAttributes={setAttributes} />
			</Panel>
		</InspectorControls>
	);
}
