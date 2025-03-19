import { InnerBlocks, RichText, useInnerBlockProps } from '@wordpress/block-editor';
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
	icon: {
		src: (
			<svg width="800" height="800" viewBox="0 0 32 32">
				<g fill="#263238">
					<path d="M20.332 30.601c-.384 0-.769-.146-1.061-.438L5.643 16.533c-.482-.482-.842-1.395-.819-2.076l.285-8.255c.027-.808.708-1.488 1.517-1.516l1.773-.053c.264 0 .507.207.517.483.009.276-.207.508-.482.518l-1.775.053c-.284.01-.541.267-.551.55l-.285 8.255c-.013.408.238 1.045.527 1.334l13.629 13.629c.195.195.512.195.707 0l9.192-9.193c.094-.094.146-.219.146-.354s-.052-.26-.146-.354L16.25 5.928c-.289-.289-.907-.571-1.336-.526l-3.938.136c-.292-.017-.508-.207-.518-.482-.009-.276.207-.508.482-.518l3.939-.136c.695.002 1.595.337 2.077.819l13.628 13.627c.282.282.438.659.438 1.061s-.156.778-.438 1.061l-9.192 9.193c-.291.291-.676.438-1.06.438z" />
					<path d="M11 13.477c-1.654 0-3-1.346-3-3 0-1.065.554-2.028 1.48-2.577.236-.14.544-.062.686.176.141.238.062.545-.176.686C9.37 9.128 9 9.77 9 10.477c0 1.103.897 2 2 2s2-.897 2-2c0-.921-.63-1.716-1.532-1.933-.269-.064-.434-.335-.369-.604.064-.267.326-.431.604-.369C13.055 7.896 14 9.091 14 10.477c0 1.654-1.346 3-3 3zM15.771 17.064c-.276.282-.587.45-.936.498-.232.037-.466-.006-.7-.131-.126-.066-.253-.164-.381-.29-.236-.239-.375-.494-.413-.766-.035-.227-.006-.461.083-.701.09-.241.234-.476.436-.701l.239.208c.208.18.256.516.106.747 0 0-.045.069-.051.272-.007.154.038.274.137.363.137.129.308.168.513.12.102-.021.212-.089.325-.205.167-.166.258-.406.271-.722-.006-.232-.016-.583-.027-1.048-.007-.395.024-.712.096-.948.084-.261.226-.496.429-.699.365-.362.765-.519 1.198-.46.265.037.51.17.733.394.216.216.352.448.41.697.044.195.036.396-.024.604-.061.208-.172.407-.332.598l-.273-.189c-.227-.157-.309-.445-.183-.641l.015-.17c.011-.122-.036-.234-.142-.338-.11-.112-.244-.147-.397-.105-.127.03-.249.105-.365.224-.185.183-.293.448-.324.797-.013.133-.009.307.013.524.022.258.033.434.032.525-.001.299-.032.562-.097.788-.029.105-.062.199-.095.28-.088.202-.185.359-.296.475zM17.306 18.753c-.174-.174-.498-.184-.721-.022l-.259.188c-.223.161-.547.151-.721-.021-.173-.173-.131-.444.094-.604l3.876-2.751c.225-.159.567-.13.762.064l.125.124c.194.194.223.537.063.761l-2.758 3.868c-.159.224-.434.265-.608.09s-.186-.499-.022-.721l.188-.258c.163-.221.154-.544-.019-.718zm1.871-1.769c.166-.22.121-.264-.099-.099l-1.006.756c-.22.165-.299.401-.176.524.124.124.359.045.525-.175l.756-1.006zM20.107 22.797c-.166.165-.461.142-.655-.053l-.94-.942c-.194-.194-.194-.513 0-.707l3.303-3.304c.194-.194.49-.217.656-.051.166.167.144.463-.051.657l-2.702 2.701c-.194.194-.194.513 0 .707l.337.337c.194.195.217.49.052.655zM20.747 24.038c-.194-.194-.194-.513 0-.707l3.306-3.308c.194-.194.513-.194.707 0l1.016 1.015c.194.194.217.49.049.657-.167.168-.463.146-.657-.049l-.41-.409c-.194-.194-.513-.194-.707 0l-.387.386c-.194.194-.194.513-.001.708l.11.109c.193.195.216.491.048.658-.167.167-.463.145-.657-.05l-.109-.108c-.194-.194-.513-.194-.707 0l-.387.387c-.194.194-.194.513 0 .707l.41.411c.194.194.217.49.049.657s-.464.145-.658-.05l-1.015-1.014z" />
					<path d="M8.84 11.699c-.215 0-.413-.139-.479-.354-.08-.264.068-.543.333-.624.501-.152.937-.411 1.294-.768 1.502-1.503 1.149-4.299-.786-6.234-.951-.952-2.136-1.552-3.335-1.687-1.155-.132-2.185.189-2.898.902-1.501 1.502-1.149 4.298.786 6.233.064.064.13.128.196.189.204.187.217.503.03.706-.188.205-.503.217-.706.03-.078-.071-.153-.145-.228-.219C.724 7.55.37 4.119 2.262 2.227c.93-.933 2.248-1.356 3.717-1.189 1.424.161 2.82.862 3.93 1.974 2.325 2.325 2.678 5.756.786 7.648-.476.475-1.051.816-1.71 1.018-.048.014-.097.021-.145.021z" />
				</g>
			</svg>
		),
	},
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
	providesContext: {
		productTitle: 'category',
	},
	supports: {
		innerBlocks: true, // Enable inner blocks
	},
});

/**
 * Block component at wp-admin
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const randomComponentId = Math.floor(Math.random() * 10000);

	const { variant, link, bgColor, image1, image2, product, marginM, marginD } = attributes;

	const inlineStyles = `
		.product-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.product-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div class={`product-item ${variant}`}>
				<img
					loading="lazy"
					src={image1.src}
					alt={image1.alt}
					{...(image1.width ?? {
						width: image1.width,
					})}
					{...(image1.height ?? {
						height: image1.height,
					})}
				/>
				<img
					loading="lazy"
					src={image2.src}
					alt={image2.alt}
					{...(image2.width ?? {
						width: image2.width,
					})}
					{...(image2.height ?? {
						height: image2.height,
					})}
				/>

				<div class="products__carousel__card__content">
					<RichText
						allowedFormats={[]}
						tagName="p"
						className="products__carousel__card__text1"
						value={attributes.category}
						onChange={(category) =>
							setAttributes({
								category: category,
								productTitle: category,
							})
						}
					/>
					<RichText
						allowedFormats={[]}
						tagName="p"
						className="products__carousel__card__text2"
						value={product}
						onChange={(product) =>
							setAttributes({
								product: product,
							})
						}
					/>
					<InnerBlocks
						allowedBlocks={['il/button']}
						template={[
							[
								'il/button',
								{
									content: 'Ver detalhes',
									extraClass: 'products__carousel__card__link__button',
									variant: 'link',
									hasLink: true,
									link: link,
									addCustomColor: true,
									color: '#ffffff',
									bgColor: 'transparent',
									colorHover: '#ffffff',
									bgColorHover: 'transparent',
									marginM: 0,
									marginD: 0,
								},
							],
						]}
					/>
				</div>
				<span className="overlay"></span>
			</div>
		</>
	);
}
