import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	link: metadata.link,
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
	const templteUri = '/wp-content/themes/Template-blocks/images';
	const { link } = attributes;

	return (
		<>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<a class='social-icon' href={link}>
				{attributes.icon.src ? (						
					<img
						loading="eager"
						src={attributes.icon.src}
						alt={attributes.icon.alt}
						class="logo"
					/>
				): <p class='logo_placeholder'>Rede social</p>}

			</a>
		</>
	);
}
