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
	icon: {
		src: (
			<svg width="800" height="800" viewBox="0 0 512 512">
				<path d="M478.13 203.97h-16.107v-3.259c0-15.747-12.811-28.558-28.558-28.558s-28.558 12.811-28.558 28.558v3.259H107.092v-3.259c0-3.325-.577-6.516-1.626-9.486l123.892-45.886c7.378 6.524 17.063 10.496 27.663 10.496 12.869 0 24.395-5.847 32.072-15.021l60.754 26.415c1.325.575 2.704.849 4.061.849 3.937 0 7.688-2.294 9.359-6.135 2.246-5.166-.121-11.174-5.287-13.42l-59.994-26.084c.558-2.72.852-5.536.852-8.418 0-19.541-13.473-35.995-31.617-40.559V33.445c0-5.633-4.567-10.199-10.199-10.199-5.633 0-10.199 4.566-10.199 10.199v48.956c0 5.633 4.566 10.199 10.199 10.199 11.782 0 21.369 9.564 21.414 21.337l-14.288-6.212c-5.165-2.245-11.174.122-13.42 5.287-2.246 5.166.121 11.174 5.287 13.42l12.688 5.517c-3.363 2.199-7.371 3.489-11.68 3.489-11.811 0-21.418-9.608-21.418-21.418 0-5.633-4.566-10.199-10.199-10.199s-10.199 4.566-10.199 10.199c0 4.881.849 9.566 2.393 13.924L90.772 174.915c-3.711-1.768-7.861-2.761-12.238-2.761-15.747 0-28.558 12.811-28.558 28.558v3.259H33.87C15.194 203.97 0 219.342 0 238.236v216.648c0 18.676 15.194 33.87 33.87 33.87h444.26c18.676 0 33.87-15.194 33.87-33.87V238.236c0-18.894-15.194-34.266-33.87-34.266zm-52.823-3.258c0-4.499 3.661-8.159 8.159-8.159 4.499 0 8.159 3.659 8.159 8.159v3.259h-16.319v-3.259zm-354.932 0c0-4.499 3.66-8.159 8.159-8.159 4.499 0 8.159 3.659 8.159 8.159v3.259H70.375v-3.259zm421.227 254.172c0 7.428-6.043 13.471-13.471 13.471H33.87c-7.428 0-13.471-6.043-13.471-13.471V238.236c0-7.518 6.168-13.868 13.471-13.868h444.26c7.302 0 13.471 6.351 13.471 13.868v216.648z" />
				<path d="M93.323 253.238c-5.633 0-10.199 4.566-10.199 10.199v166.247c0 5.633 4.566 10.199 10.199 10.199s10.199-4.566 10.199-10.199V263.437c0-5.633-4.566-10.199-10.199-10.199zM173.896 253.238c-5.633 0-10.199 4.566-10.199 10.199v166.247c0 5.633 4.566 10.199 10.199 10.199s10.199-4.566 10.199-10.199V263.437c.001-5.633-4.566-10.199-10.199-10.199zM255.49 253.238c-5.633 0-10.199 4.566-10.199 10.199v166.247c0 5.633 4.566 10.199 10.199 10.199 5.632 0 10.199-4.566 10.199-10.199V263.437c0-5.633-4.567-10.199-10.199-10.199zM337.084 253.238c-5.632 0-10.199 4.566-10.199 10.199v166.247c0 5.633 4.567 10.199 10.199 10.199s10.199-4.566 10.199-10.199V263.437c0-5.633-4.567-10.199-10.199-10.199zM418.677 253.238c-5.632 0-10.199 4.566-10.199 10.199v166.247c0 5.633 4.567 10.199 10.199 10.199s10.199-4.566 10.199-10.199V263.437c.001-5.633-4.567-10.199-10.199-10.199zM394.611 163.817l-7.068-3.061c-5.167-2.24-11.172.136-13.412 5.306-2.239 5.169.137 11.174 5.306 13.412l7.068 3.061c1.321.572 2.695.842 4.048.842 3.942 0 7.697-2.3 9.365-6.148 2.238-5.169-.138-11.175-5.307-13.412z" />
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

	const { appender, containerSize, paddingSize, islocked, allowed_blocks, extraClass } = attributes;

	const inlineStyles = `
		.container-${randomComponentId} {
			padding-top: ${paddingSize.mob.top}px;
			padding-bottom: ${paddingSize.mob.bottom}px;
		}
		
		@media (min-width: 768px) {
			.container-${randomComponentId} {
				padding-top: ${paddingSize.desk.top}px;
				padding-bottom: ${paddingSize.desk.bottom}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`${containerSize} ${extraClass} container-${randomComponentId}`}>
				<InnerBlocks
					templateLock={islocked}
					{...(allowed_blocks.length && {
						allowedBlocks: [...allowed_blocks],
					})}
					{...(!appender && {
						renderAppender: appender,
					})}
				/>
			</div>
		</>
	);
}
