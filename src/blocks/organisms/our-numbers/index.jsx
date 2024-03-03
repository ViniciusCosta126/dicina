import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import { getCurrentInnerBlocks } from '../../../hooks/common';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: (
		<svg width="64px" height="64px" viewBox="0 0 24 24" fill="#000000">
			<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<path d="M2 4h14v1H2zm0 17h14v-1H2zm0-8h14v-1H2zm19 5h-1c-.553 0-1 0-1 1h2v1h-.5a.5.5 0 0 0 0 1h.5v1h-2c0 1 .447 1 1 1h1a1 1 0 0 0 1-1v-1a.975.975 0 0 0-.153-.5A.964.964 0 0 0 22 20v-1a1 1 0 0 0-1-1zm0-16h-2v1h1v3h-1v1h3V6h-1zm0 8h-1a1 1 0 0 0-1 1h2v1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2v-1h-2v-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1z"></path>
				<path fill="none" d="M0 0h24v24H0z"></path>
			</g>
		</svg>
	),
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ clientId, attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);
	const { replaceInnerBlocks } = wp.data.useDispatch('core/block-editor');
	const { variant, bgColor, marginM, marginD, columLength, initialLoad } = attributes;

	const inlineStyles = `
		.our-numbers-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.our-numbers-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const createTemplate = (cardsLength) => {
		let template;
		if (cardsLength >= 1) {
			template = [['il/brand-big-numbers']];
		}
		return template;
	};

	// Function that adds a new item to the menu
	const handleAdd = (newMenuLength) => {
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);
		const template = createTemplate(newMenuLength);
		const newTemplate = createBlocksFromInnerBlocksTemplate(template);

		const newBlocks = existingInnerBlocks.map((block, index) => {
			if (newMenuLength % 2 === 1) {
				const newInnerBlock = [...block.innerBlocks[1].innerBlocks[0].innerBlocks, ...newTemplate];
				block.innerBlocks[1].innerBlocks[0].innerBlocks = newInnerBlock;
			} else {
				const newInnerBlock = [...block.innerBlocks[1].innerBlocks[1].innerBlocks, ...newTemplate];
				block.innerBlocks[1].innerBlocks[1].innerBlocks = newInnerBlock;
			}
			const newInner = block;
			return newInner;
		});
		replaceInnerBlocks(clientId, newBlocks);
	};

	// Function that removes the last item from the menu
	const handleRemove = (newLength) => {
		const existingInnerBlocks = getCurrentInnerBlocks(clientId);

		const newBlocks = existingInnerBlocks.map((block, index) => {
			if (newLength === 0) {
				const block1 = block.innerBlocks[1].innerBlocks[0].innerBlocks;
				const idToRemove = block1[block1.length - 1].clientId;
				const newInnerBlock = block.innerBlocks[1].innerBlocks[0].innerBlocks.filter(
					(item) => item.clientId !== idToRemove
				);
				block.innerBlocks[1].innerBlocks[0].innerBlocks = newInnerBlock;
			} else if (newLength % 2 === 0) {
				const block1 = block.innerBlocks[1].innerBlocks[0].innerBlocks;
				const idToRemove = block1[block1.length - 1].clientId;
				const newInnerBlock = block.innerBlocks[1].innerBlocks[0].innerBlocks.filter(
					(item) => item.clientId !== idToRemove
				);
				block.innerBlocks[1].innerBlocks[0].innerBlocks = newInnerBlock;
			} else {
				const block1 = block.innerBlocks[1].innerBlocks[1].innerBlocks;
				const idToRemove = block1[block1.length - 1].clientId;
				const newInnerBlock = block.innerBlocks[1].innerBlocks[1].innerBlocks.filter(
					(item) => item.clientId !== idToRemove
				);
				block.innerBlocks[1].innerBlocks[1].innerBlocks = newInnerBlock;
			}
			const newInner = block;
			return newInner;
		});
		replaceInnerBlocks(clientId, newBlocks);
	};

	const addLength = () => {
		const newLength = columLength + 1;
		setAttributes({ columLength: newLength });
		console.log(newLength);
		handleAdd(newLength);
	};

	const removeLength = () => {
		const newLength = columLength - 1;
		if (newLength < 0) {
			return;
		} else {
			setAttributes({ columLength: newLength });
			handleRemove(newLength);
		}
	};

	const CustomAppenderButton = () => {
		return (
			<div className="custom-appender">
				<button
					className="button-remove"
					title="Remove sempre o ultimo item"
					type="button"
					onClick={() => removeLength()}
				>
					<svg fill="none" viewBox="0 0 24 24">
						<path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12" />
					</svg>
				</button>

				<button className="button-appender" type="button" onClick={() => addLength()}>
					<svg fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 24 24">
						<path stroke="none" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
					</svg>
				</button>
			</div>
		);
	};

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`our-numbers ${variant} wp-editor our-numbers-${randomComponentId}`}>
				<InnerBlocks
					template={[
						[
							'il/container',
							{},
							[
								[
									'il/wrapper',
									{ extraClass: 'our-numbers-content', isLocked: false },
									[
										[
											'il/typography',
											{
												content: 'a marca senna',
												tag: 'p',
												manualSizes: true,
												manualSizeM: 20,
												manualSizeD: 32,
												color: '#fff',
												bgColor: 'transparent',
												textWeight: 'weight-bold',
												extraClass: 'title-aux',
											},
										],
										[
											'il/typography',
											{
												content: 'nossos números',
												tag: 'h2',
												manualSizes: true,
												manualSizeM: 40,
												manualSizeD: 64,
												fontFamily: 'helveticaneue',
												color: 'linear-gradient(0deg,#00A851 0%,#1832D7 100%)',
												widthStrokeM: 3,
												widthStrokeD: 4,
												textWeight: 'weight-medium',
												extraClass: 'title',
											},
										],
										[
											'il/typography',
											{
												content:
													'Esses são os parceiros que nos ajudam a transformar realidades porque acreditam que a educação é pilar central para o desenvolvimento do país. ',
												tag: 'p',
												manualSizes: true,
												manualSizeM: 16,
												manualSizeD: 24,
												color: '#fff',
												bgColor: 'transparent',
												textWeight: 'weight-light',
												extraClass: 'text-info',
											},
										],
									],
								],
								[
									'il/wrapper',
									{ extraClass: 'our-numbers-big-numbers', isLocked: false },
									[
										['il/wrapper', { extraClass: 'left' }, [['il/brand-big-numbers']]],
										['il/wrapper', { extraClass: 'right' }],
									],
								],
							],
						],
					]}
					renderAppender={() => <CustomAppenderButton />}
				/>
			</div>
		</>
	);
}
