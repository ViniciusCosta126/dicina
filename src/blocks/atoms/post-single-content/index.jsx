import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'admin-post',
	edit: EditorComponent,
	save: () => {},
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent() {
	return (
		<div className={`press-content-single wp-panel`}>
			<p className="post-content-info">
				Não insira este componente na página, <br />
				ele já vem dentro da parte de modelo em "parts/post-content.html", <br />
				utilizado apenas para funções js e estilizações
				<br /> <br />
				Insira todo o conteúdo diretamente na página
			</p>
		</div>
	);
}
