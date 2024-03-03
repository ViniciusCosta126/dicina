import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ExternalLink } from '@wordpress/components';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'menu',
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

	const { variant } = attributes;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<div className={`navigation-journey ${variant} wp-editor navigation-journey-${randomComponentId}`}>
				<div className="container medium">
					<ExternalLink className="navigation-journey__link" href="/wp-admin/nav-menus.php">
						Configure os links pelo menu: Navegação Jornada Senna
					</ExternalLink>
				</div>
			</div>
		</>
	);
}
