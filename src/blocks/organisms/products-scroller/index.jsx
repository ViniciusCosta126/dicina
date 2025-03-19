import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'products',
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

			<section className="products wp-editor">
				<div className="">
					<p className="info-text">%%Insira os textos para o mobile (até 1023px)%%</p>
					<br />
					<RichText
						allowedFormats={[]}
						tagName="h2"
						className="products__title"
						value={attributes.productsTitle}
						onChange={(productsTitle) =>
							setAttributes({
								productsTitle: productsTitle,
							})
						}
					/>
					<hr />
					<RichText
						allowedFormats={[]}
						tagName="p"
						className="products__subtitle"
						value={attributes.productsSubtitle}
						onChange={(productsSubtitle) =>
							setAttributes({
								productsSubtitle: productsSubtitle,
							})
						}
					/>
					<br />
					<br />

					<p className="info-text">%%Insira os textos para o desktop (a partir de 1024px)%%</p>
					<div className="text-wrapper">
						<div class="text-wrapper-content">
							<RichText
								allowedFormats={[]}
								tagName="h1"
								className="title"
								value={attributes.title}
								onChange={(title) =>
									setAttributes({
										title: title,
									})
								}
							/>
							<div className="subtitle-wrapper">
								<RichText
									allowedFormats={[]}
									tagName="span"
									className="subtitle"
									value={attributes.subtitle}
									onChange={(subtitle) =>
										setAttributes({
											subtitle: subtitle,
										})
									}
								/>
								<hr />
								<RichText
									allowedFormats={[]}
									tagName="span"
									className="subtitle__second"
									value={attributes.subtitle__second}
									onChange={(subtitle__second) =>
										setAttributes({
											subtitle__second: subtitle__second,
										})
									}
								/>
							</div>
						</div>
					</div>
					<br />
					<div className="carousel-container" style={{ height: 'auto' }}>
						<div className="products__carousel">
							<InnerBlocks
								template={[
									[
										'il/product',
										{
											link: {
												url: '',
												target: 'blank',
											},
											category: 'Lorem Ipsum',
											product: 'Lorem Ipsum',
											image1: {
												src: 'https://placehold.co/360x360',
												alt: 'https://placehold.co/360x360',
											},
											image2: {
												src: 'https://placehold.co/360x360',
												alt: 'https://placehold.co/360x360',
											},
										},
									],
									[
										'il/product',
										{
											link: {
												url: '',
												target: 'blank',
											},
											category: 'Lorem Ipsum',
											product: 'Lorem Ipsum',
											image1: {
												src: 'https://placehold.co/360x360',
												alt: 'https://placehold.co/360x360',
											},
											image2: {
												src: 'https://placehold.co/360x360',
												alt: 'https://placehold.co/360x360',
											},
										},
									],
								]}
								allowedBlocks={['il/product']}
								templateLock="all"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
