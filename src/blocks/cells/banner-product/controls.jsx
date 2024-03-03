import { InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl } from '@wordpress/components';

export default function Controls({ attributes, setAttributes }) {
	const { productId } = attributes;

	const { useSelect } = wp.data;

	const filters = useSelect((select) => {
		const options = [{ label: 'Selecione um produto', value: 0 }];
		const products = select('core').getEntityRecords('postType', 'product');

		if (!products) return [];

		const productsOptions = products.map((item) => {
			return { label: item.title.rendered, value: item.id };
		});

		return options.concat(productsOptions);
	}, []);

	return (
		<InspectorControls>
			<Panel>
				<PanelBody title="Atributos do componente">
					<SelectControl
						label="Produto:"
						value={productId}
						options={filters}
						onChange={(newValue) => setAttributes({ productId: parseInt(newValue) })}
					/>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
