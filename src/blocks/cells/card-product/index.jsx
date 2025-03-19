import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
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
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, link, textInImg, marginM, productId, product, marginD, hasText, hasImage, innerImage } = attributes;

	const inlineStyles = `
		.card-product-${randomComponentId} {
			margin-bottom: ${marginM}px;
		}
		
		@media (min-width: 768px) {
			.card-product-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
		@media (min-width: 1024px) {
			.card-product-${randomComponentId} {
				background-size: cover;
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const updatePosts = async (id) => {
		const currentLang = sessionStorage.getItem('qtranslate-xt-admin-edit-language');

		if (!id) {
			// If there is no product selected, reset the attributes
			setAttributes({
				product: {
					imgMobile: {
						type: 'object',
						default: {
							src: '',
							alt: '',
						},
					},
					imgDesktop: {
						type: 'object',
						default: {
							src: '',
							alt: '',
						},
					},
				},
				hasText: false,
				hasImage: false,
				link: {
					title: '',
					target: '',
					url: '',
				},
				textInImg: '',
				innerImage: {
					src: '',
					alt: '',
				},
			});
		}

		const post = await apiFetch({ path: `/wp/v2/product/${id}` });
		const product = post.acf.product;

		if (!post || !product) return;

		const imgMobile = await getImageData(product.img_mobile);
		const imgDesktop = await getImageData(product.img_desktop);

		const updateAttributes = async () => {
			if (product.has_inner === '1') {
				// if there is internal content and it is text
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
						innerImage: {
							src: '',
							alt: '',
						},
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
						innerImageEN: {
							src: '',
							alt: '',
						},
					});
				}
			} else if (product.has_inner === '2') {
				// else if there is internal content and it is image

				if (currentLang === 'pt') {
					const innerImage = await getImageData(product.inner_image);

					//Portuguese Settings
					await setAttributes({
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
					const innerImageEN = await getImageData(product.inner_image_en);

					//Other Languages Settings (english, in this case)
					await setAttributes({
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
						textInImg: '',
						innerImage: {
							src: '',
							alt: '',
						},
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
						textInImg: '',
						innerImageEN: {
							src: '',
							alt: '',
						},
					});
				}
			}
		};

		await updateAttributes();
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

	useEffect(() => {
		updatePosts(productId);
	}, [productId]);

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`card-product ${variant} wp-editor card-product-${randomComponentId}`}>
				<picture className="picture">
					<source media="(min-width:768px)" srcset={product?.imgDesktop?.src} />
					<img src={product?.imgMobile?.src} alt={product?.imgMobile?.alt} className="img" />
				</picture>

				{productId === 0 && (
					<div className="content empty">
						<p>Click aqui e selecione um produto nas configurações do bloco (à direita)</p>

						<p>
							Para editar um produto, use sempre a página de produtos:
							<a href="/wp-admin/edit.php?post_type=product"> Editar produtos</a>
						</p>
					</div>
				)}

				{hasText && (
					<InnerBlocks
						template={[
							[
								'il/wrapper',
								{
									extraClass: 'card-product__wrapper-text',
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
								],
							],
						]}
						templateLock={true}
					/>
				)}

				{hasImage && (
					<div class="card-product__container">
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
