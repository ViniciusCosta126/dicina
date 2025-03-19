import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg width="682.667" height="682.667" version="1.0" viewBox="0 0 512 512">
				<path d="M66.6 189.8-.3 257.2l66.9 66.9 66.9 66.9 14.2-14.2 14.3-14.3-52.7-52.7L56.5 257 77 236.3c11.3-11.5 35.1-35.5 53-53.5l32.4-32.7-2.9-3.2c-1.7-1.7-8.2-7.9-14.5-13.8l-11.5-10.7-66.9 67.4zM364 136l-14.5 13.8 32.5 32.9c17.9 18 41.7 42.1 53 53.6l20.5 20.7-52.8 52.8-52.7 52.7 14.3 14.3 14.2 14.2 66.9-66.9 66.9-66.9-66.3-66.8c-36.5-36.8-66.6-67.2-66.9-67.6-.3-.4-7.1 5.5-15.1 13.2z" />
				<path d="M167 239.7c-4.4 2.3-6 3.9-8.2 8.2-3.6 6.8-3.6 11.4 0 18.2 2.2 4.3 3.8 5.9 8.1 8.1 6.6 3.5 11.2 3.5 17.8.3 6.8-3.4 10.3-8.6 11-16.2.4-4.8.1-6.6-1.9-10.3-3.3-6.2-9-10-15.9-10.6-4.6-.5-6.2-.2-10.9 2.3zM250.6 237.7c-4.6 1.3-9.6 5.7-12.1 10.6-3.2 6.6-3.2 11.2.3 17.8 2.2 4.3 3.8 5.9 8.1 8.1 3.1 1.6 6.9 2.8 9.1 2.8 2.2 0 6-1.2 9.1-2.8 4.3-2.2 5.9-3.8 8.1-8.1 3.5-6.6 3.5-11.2.3-17.8-3.3-6.6-8.8-10.3-15.9-10.8-2.8-.2-6-.1-7 .2zM329.7 238c-4.6 1.4-9.4 5.6-11.7 10.6-4.7 9.6-.6 20.9 9.3 25.9 6.6 3.2 11.2 3.2 17.8-.3 4.3-2.2 5.9-3.8 8.1-8.1 1.6-3.1 2.8-6.9 2.8-9.1 0-2.2-1.2-6-2.8-9.1-4.4-8.5-14.3-12.7-23.5-9.9z" />
			</svg>
		),
	},
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

	const { variant, marginM, marginD } = attributes;

	const inlineStyles = `
		.posts-pagination-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.posts-pagination-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`posts-pagination ${variant} posts-pagination-${randomComponentId}`}>
				<ul class="posts-pagination-list">
					<li>
						<div class="posts-pagination-list--link active">01</div>
					</li>
					<li>
						<div class="posts-pagination-list--link">02</div>
					</li>
					<li>
						<div class="posts-pagination-list--link">03</div>
					</li>
					<li>
						<div class="posts-pagination-list--link">04</div>
					</li>

					<li>
						<div title="Anterior" class="posts-pagination-list--prev disabled" aria-disabled="true">
							<svg width="17" height="28" fill="none">
								<path
									fill="#fff"
									d="M16.865 3.161 13.675 0 0 13.548l13.674 13.549 3.19-3.162L6.439 13.549 16.865 3.161Z"
								/>
							</svg>
						</div>
					</li>

					<li>
						<div title="Próoximo" class="posts-pagination-list--next">
							<svg width="17" height="28" fill="none">
								<path
									fill="#fff"
									d="m-.002 23.936 3.191 3.162 13.674-13.549L3.19.001 0 3.162 10.424 13.55-.002 23.936Z"
								/>
							</svg>
						</div>
					</li>
				</ul>
			</div>
		</>
	);
}
