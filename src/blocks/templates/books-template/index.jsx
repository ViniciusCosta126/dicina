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
	icon: 'edit-page',
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */

export default function EditorComponent({ attributes, setAttributes }) {
	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div className={`books-template wp-editor`}>
				<InnerBlocks
					template={[
						[
							'il/banner-imprensa',
							{
								title: 'LIVROS DE SENNA',
								subtitle: 'Conheça mais sobre as histórias do eterno campeão das pistas.',
							},
						],
						['il/books-carousel', {}],
						['il/newsletter', {}],
					]}
				/>
			</div>
		</>
	);
}
