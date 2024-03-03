import { InnerBlocks } from '@wordpress/block-editor';
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
	icon: 'edit-page',
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

			<div className={`privacy-policy wp-editor`}>
				<InnerBlocks
					template={[
						['il/hero-journey', {}],
						[
							'il/section',
							{ bgColor: '#ffffff', templateLock: true },
							[
								[
									'il/container',
									{
										templateLock: true,
										paddingSize: {
											mob: {
												top: 70,
												bottom: 70,
											},
											desk: {
												top: 96,
												bottom: 96,
											},
										},
									},
									[
										[
											'il/typography',
											{
												content: 'Termo de uso e Conduta de Privacidade',
												fontFamily: 'sennasans sennasans-stroke',
												position: 'position-left',
												hasMaxWidth: true,
												maxWidthM: 768,
												widthStrokeM: 1,
												widthStrokeD: 1,
												color: '#002753',
												bgColor: '#002753',
												tag: 'h2',
												manualSizes: true,
												manualSizeM: 28,
												manualSizeD: 40,
												textTransform: 'transform-uppercase',
												marginM: 38,
												marginD: 64,
											},
										],
										[
											'il/wrapper',
											{ extraClass: 'privacy-policy-paragraph' },
											[
												[
													'il/typography',
													{
														content: 'OBJETIVO',
														color: '#002753',
														tag: 'h3',
														manualSizes: true,
														manualSizeM: 18,
														textWeight: 'weight-bold',
														textTransform: 'transform-uppercase',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/separator',
													{
														variant: 'line-gradient',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/typography',
													{
														content:
															'Lorem ipsum dolor sit amet consectetur. Tortor etiam at dictum tincidunt nunc nibh. A sagittis lectus amet porttitor et donec odio urna. Sed eu lectus aliquet leo rutrum. Aliquam gravida nibh donec sit volutpat phasellus lorem. Aliquam eleifend arcu odio faucibus odio dolor erat. Mauris vel tempor ac sed enim nibh. Egestas in eget tristique odio in sit sit quis. Sed ac sit viverra ultrices pulvinar orci amet. \u003cstrong\u003eConsectet ur feugiat sed mauris vulputate.\u003c/strong\u003e',
														color: '#43485C',
														manualSizes: true,
														manualSizeD: 20,
														marginM: 30,
														marginD: 40,
													},
												],
											],
										],
										[
											'il/wrapper',
											{ extraClass: 'privacy-policy-paragraph' },
											[
												[
													'il/typography',
													{
														content: 'Perfil do conteúdo',
														color: '#002753',
														tag: 'h3',
														manualSizes: true,
														manualSizeM: 18,
														textWeight: 'weight-bold',
														textTransform: 'transform-uppercase',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/separator',
													{
														variant: 'line-gradient',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/typography',
													{
														content:
															'Lorem ipsum dolor sit amet consectetur. Blandit risus diam vel non laoreet. Urna enim amet quam sit turpis vestibulum. Erat nulla pulvinar a lectus velit senectus arcu vitae. Morbi vitae egestas sed id euismod vel mattis diam a.<br /><br /> Est vulputate aliquam eu sed consectetur arcu massa. Hendrerit vitae pellentesque pharetra nisl augue malesuada ligula in.',
														color: '#43485C',
														manualSizes: true,
														manualSizeD: 20,
														marginM: 30,
														marginD: 40,
													},
													[['core/list']],
												],
											],
										],
										[
											'il/wrapper',
											{ extraClass: 'privacy-policy-paragraph' },
											[
												[
													'il/typography',
													{
														content: 'Uso e segurança da informação',
														color: '#002753',
														tag: 'h3',
														manualSizes: true,
														manualSizeM: 18,
														textWeight: 'weight-bold',
														textTransform: 'transform-uppercase',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/separator',
													{
														variant: 'line-gradient',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/typography',
													{
														content:
															'Lorem ipsum dolor sit amet consectetur. Blandit risus diam vel non laoreet. Urna enim amet quam sit turpis vestibulum. Erat nulla pulvinar a lectus velit senectus arcu vitae. Morbi vitae egestas sed id euismod vel mattis diam a. Est vulputate aliquam eu sed consectetur arcu massa. Hendrerit vitae pellentesque pharetra nisl augue malesuada ligula in. Lorem ipsum dolor sit amet consectetur. Sagittis lectus in a urna nisl cursus placerat id. <br /><br />Lorem fusce semper luctus viverra. Maecenas sed in amet sit quam risus. Vitae dui eget eget praesent id nam magna. Ipsum faucibus sed donec neque. Malesuada massa cras ut ornare hac donec diam. Nisi est neque quam vel feugiat sit egestas varius at nascetur. <br /><br />Lorem ipsum dolor sit amet consectetur. Mauris arcu purus velit ut. Ut fermentum cras faucibus consequat urna dui elit in nec. Eu nec metus arcu adipiscing ultricies felis bibendum. Habitant nunc morbi sit sagittis rutrum id massa ipsum. A mattis egestas pulvinar urna quam risus. At sed mollis auctor mi. Duis cursus morbi sit amet nullam tempus nisl pellentesque. Sem sem est egestas congue at duis. Ut sit ullamcorper duis nisi cum pharetra adipiscing a. Augue aliquet in sit platea sed. Dictum nulla fringilla mauris nulla. Metus et quis nulla faucibus.',
														color: '#43485C',
														manualSizes: true,
														manualSizeD: 20,
														marginM: 30,
														marginD: 40,
													},
												],
											],
										],
										[
											'il/wrapper',
											{ extraClass: 'privacy-policy-paragraph' },
											[
												[
													'il/typography',
													{
														content: 'Obrigações e conduta do usuário',
														color: '#002753',
														tag: 'h3',
														manualSizes: true,
														manualSizeM: 18,
														textWeight: 'weight-bold',
														textTransform: 'transform-uppercase',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/separator',
													{
														variant: 'line-gradient',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/typography',
													{
														content:
															'Lorem ipsum dolor sit amet consectetur. Quisque habitasse et donec eu suspendisse nisi purus morbi fringilla. Mollis dolor senectus ligula et in praesent purus egestas. Massa posuere hac faucibus neque commodo urnaosu ere hac faucibus neque como.',
														color: '#43485C',
														manualSizes: true,
														manualSizeD: 20,
														marginM: 30,
														marginD: 40,
													},
												],
											],
										],
										[
											'il/wrapper',
											{ extraClass: 'privacy-policy-paragraph' },
											[
												[
													'il/typography',
													{
														content:
															'Os comentários são de exclusiva responsabilidade dos internautas',
														color: '#002753',
														tag: 'h3',
														manualSizes: true,
														manualSizeM: 18,
														textWeight: 'weight-bold',
														textTransform: 'transform-uppercase',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/separator',
													{
														variant: 'line-gradient',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/typography',
													{
														content:
															'Lorem ipsum dolor sit amet consectetur. Quisque habitasse et donec eu suspendisse nisi purus morbi fringilla. Mollis dolor senectus ligula et in praesent purus egestas. Massa posuere hac faucibus neque commodo urna. Morbi enim tellus scelerisque metus tortor ut etiam eget nulla. Vitae amet urna odio eget vitae eget pellentesque senectus ligula et in praesent purus egestas.',
														color: '#43485C',
														manualSizes: true,
														manualSizeD: 20,
														marginM: 30,
														marginD: 40,
													},
												],
											],
										],
										[
											'il/wrapper',
											{ extraClass: 'privacy-policy-paragraph' },
											[
												[
													'il/typography',
													{
														content: 'Mudança na Política de Privacidade',
														color: '#002753',
														tag: 'h3',
														manualSizes: true,
														manualSizeM: 18,
														textWeight: 'weight-bold',
														textTransform: 'transform-uppercase',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/separator',
													{
														variant: 'line-gradient',
														marginM: 12,
														marginD: 16,
													},
												],
												[
													'il/typography',
													{
														content:
															'Lorem ipsum dolor sit amet consectetur. Blandit risus diam vel non laoreet. Urna enim amet quam sit turpis vestibulum. Erat nulla pulvinar a lectus velit senectus arcu vitae. Morbi vitae egestas sed id euismod vel mattis diam a.<br /><br /> Est vulputate aliquam eu sed consectetur arcu massa. Hendrerit vitae pellentesque pharetra nisl augue malesuada ligula in.',
														color: '#43485C',
														manualSizes: true,
														manualSizeD: 20,
													},
												],
											],
										],
									],
								],
							],
						],
					]}
				/>
			</div>
		</>
	);
}
