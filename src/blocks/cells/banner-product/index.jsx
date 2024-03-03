import apiFetch from '@wordpress/api-fetch';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Controls from './controls.jsx';

import { useEffect } from 'react';
import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'format-image',
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

	const { variant, link, textInImg, marginM, productId, product, marginD, hasText, hasImage, innerImage } = attributes;

	const inlineStyles = `
		.banner-product-${randomComponentId} {
			background: #a2a1a8 ${product?.imgMobile?.src ? `url(${product?.imgMobile?.src})` : ''} no-repeat center center;
			background-size: cover;
			margin-bottom: ${marginM}px;
			position: relative;
		}

		.banner-product-${randomComponentId} >.block-editor-inner-blocks{
			position: absolute;
			bottom: 24px;
			left: 30px;
		}

		@media (min-width: 768px) {
			.banner-product-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}

		@media (min-width: 1024px) {
			.banner-product-${randomComponentId} {
				background: #a2a1a8 ${product?.imgDesktop?.src ? `url(${product?.imgDesktop?.src})` : ''} no-repeat center center;
				background-size: cover;
				margin-bottom: ${marginD}px;
			}
		}
	`;

	useEffect(() => {
		updatePosts();
	}, [productId]);

	const updatePosts = async () => {
		const currentLang = sessionStorage.getItem('qtranslate-xt-admin-edit-language');

		if (!productId) return;
		const post = await apiFetch({ path: `/wp/v2/product/${productId}` });
		const product = post.acf.product;

		if (!post || !product) return;
		const imgMobile = await getImageData(product.img_mobile);
		const imgDesktop = await getImageData(product.img_desktop);
		const innerImage = await getImageData(product.inner_image);
		const innerImageEN = await getImageData(product.inner_image_en);

		if (product.has_inner === '1') {
			if (currentLang === 'pt') {
				//Portuguese Settings
				setAttributes({
					product: {
						imgMobile,
						imgDesktop,
					},
					hasText: true,
					hasImage: false,
					link: {
						title: product.link.title,
						target: product.link.target,
						url: product.link.url,
					},
					textInImg: product.text_in_img,
					innerImage: innerImage,
				});
			} else {
				//Other Languages Settings (english, in this case)
				setAttributes({
					product: {
						imgMobile,
						imgDesktop,
					},
					hasText: true,
					hasImage: false,
					//TODO link em EN e PB
					link: {
						//DUPLICAR
						title: product.link_en.title,
						target: product.link_en.target,
						url: product.link_en.url,
					},
					//TODO TEXTO em EN e PB
					textInImg: product.text_in_img_en, //DUPLICAR
					innerImageEN: innerImageEN,
				});
			}
		} else if (product.has_inner === '2') {
			if (currentLang === 'pt') {
				//Portuguese Settings
				setAttributes({
					product: {
						imgMobile,
						imgDesktop,
					},
					hasText: false,
					hasImage: true,
					link: {
						title: product.link.title,
						target: product.link.target,
						url: product.link.url,
					},
					textInImg: product.text_in_img,
					innerImage: innerImage,
				});
			} else {
				//Other Languages Settings (english, in this case)
				setAttributes({
					product: {
						imgMobile,
						imgDesktop,
					},
					hasText: false,
					hasImage: true,
					//TODO link em EN e PB
					link: {
						//DUPLICAR
						title: product.link_en.title,
						target: product.link_en.target,
						url: product.link_en.url,
					},
					//TODO TEXTO em EN e PB
					textInImg: product.text_in_img_en, //DUPLICAR
					innerImageEN: innerImageEN,
				});
			}
		} else {
			//Dont have any text or image
			if (currentLang === 'pt') {
				//Portuguese Settings
				setAttributes({
					product: {
						imgMobile,
						imgDesktop,
					},
					hasText: false,
					hasImage: false,
					link: {
						title: product.link.title,
						target: product.link.target,
						url: product.link.url,
					},
					textInImg: product.text_in_img,
					innerImage: innerImage,
				});
			} else {
				//Other Languages Settings (english, in this case)
				setAttributes({
					product: {
						imgMobile,
						imgDesktop,
					},
					hasText: false,
					hasImage: false,
					//TODO link em EN e PB
					link: {
						//DUPLICAR
						title: product.link_en.title,
						target: product.link_en.target,
						url: product.link_en.url,
					},
					//TODO TEXTO em EN e PB
					textInImg: product.text_in_img_en, //DUPLICAR
					innerImageEN: innerImageEN,
				});
			}
		}
	};

	const getImageData = async (imageId) => {
		try {
			const response = await apiFetch({ path: `/wp/v2/media/${imageId}` });
			return {
				src: response.source_url,
				id: response.id,
				alt: response.alt_text || response.title.rendered,
				width: response.media_details.width,
				height: response.media_details.height,
			};
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`banner-product wp-editor ${variant} banner-product-${randomComponentId}`}>
				{productId === 0 && (
					<div className="banner-product-info">
						<p>Click aqui e selecione um produto nas configurações do bloco (à direita)</p>
						<br />
						<p>Para editar os banner user sempre a página de produtos:</p>
						<a href="/wp-admin/edit.php?post_type=product"></a>
					</div>
				)}

				{hasText && (
					<InnerBlocks
						template={[
							[
								'il/wrapper',
								{
									extraClass: 'banner-product__wrapper-text',
									isLocked: true,
								},
								[
									[
										'il/typography',
										{
											content: textInImg || 'Preencha o campo título',
											manualSizes: true,
											manualSizeM: 18,
											manualSizeD: 30,
											color: '#fff',
											textWeight: 'weight-medium',
										},
									],
									[
										'il/button',
										{
											variant: 'link-arrow',
											extraClass: 'link__button',
											content: link.title || 'Preencha o campo do link',
											hasLink: true,
											link: {
												url: link.url || '#',
												target: link.target,
											},
										},
									],
								],
							],
						]}
						templateLock={true}
					/>
				)}

				{hasImage && (
					<div class="banner-product__container">
						<picture className={'inner-image'}>
							<source srcset={innerImage.src} media="(min-width: 768px)" />
							<img src={innerImage.src} alt={innerImage.alt} />
						</picture>
					</div>
				)}
			</div>
		</>
	);
}
