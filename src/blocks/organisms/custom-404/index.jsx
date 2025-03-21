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
	icon: {
		src: (
			<svg viewBox="0 0 60 60">
				<path d="M0 0v60h60V0H0zm20 39h-3v8a1 1 0 0 1-2 0v-8H9a1 1 0 0 1-1-1V27a1 1 0 0 1 2 0v10h5v-2a1 1 0 0 1 2 0v2h3a1 1 0 0 1 0 2zm16 2.5c0 3.584-2.916 6.5-6.5 6.5S23 45.084 23 41.5v-9c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5v9zM51 39h-3v8a1 1 0 0 1-2 0v-8h-6a1 1 0 0 1-1-1V27a1 1 0 0 1 2 0v10h5v-2a1 1 0 0 1 2 0v2h3a1 1 0 0 1 0 2zM2 12V2h56v10H2z" />
				<path d="M54.293 3.293 52 5.586l-2.293-2.293-1.414 1.414L50.586 7l-2.293 2.293 1.414 1.414L52 8.414l2.293 2.293 1.414-1.414L53.414 7l2.293-2.293zM3 3h39v8H3zM29.5 28a4.505 4.505 0 0 0-4.5 4.5v9c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5v-9c0-2.481-2.019-4.5-4.5-4.5z" />
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

	const { image, imageDesk, image4k } = attributes;

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<section className={`hero404 wp-panel hero404-${randomComponentId}`}>
				<div className="text-wrapper">
					<InnerBlocks
						template={[
							[
								'il/typography',
								{
									content: `<strong>opa! algo</strong> deu errado `,
									tag: 'h2',
									sizeM: 'title-1-m',
									sizeD: 'title-2-responsive-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'poppins',
									texAlign: 'align-left',
									extraClass: 'title pt',
									marginM: 24,
									marginD: 40,
								},
							],
							[
								'il/typography',
								{
									content:
										'A página que você está procurando não existe ou o link pode estar quebrado. Clique no botão abaixo para voltar para a página inicial ou entre em contato aqui.',
									tag: 'p',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'poppins',
									texAlign: 'align-left',
									extraClass: 'content pt',
									marginM: 36,
									marginD: 35,
								},
							],
							[
								'il/button',
								{
									content: 'Página inicial',
									variant: 'link',
									addCustomColor: true,
									color: '#ffffff',
									bgColor: 'transparent',
									colorHover: '#ffffff',
									bgColorHover: 'transparent',
									extraClass: 'pt',
								},
							],
							['il/separator'],
							[
								'il/typography',
								{
									content: `<strong>Oh no!</strong>`,
									tag: 'h2',
									sizeM: 'title-1-m',
									sizeD: 'title-2-responsive-d',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'poppins',
									texAlign: 'align-left',
									extraClass: 'title en',
									marginM: 24,
									marginD: 40,
								},
							],
							[
								'il/typography',
								{
									content:
										'We can’t find the page you are looking for. You can start over from the homepage. If you feel you still need our help, contact us.',
									tag: 'p',
									color: '#ffffff',
									bgColor: 'transparent',
									fontFamily: 'poppins',
									texAlign: 'align-left',
									extraClass: 'content en',
									marginM: 36,
									marginD: 35,
								},
							],
							[
								'il/button',
								{
									content: 'Home page',
									variant: 'link',
									addCustomColor: true,
									color: '#ffffff',
									bgColor: 'transparent',
									colorHover: '#ffffff',
									bgColorHover: 'transparent',
									extraClass: 'en',
								},
							],
						]}
					/>
				</div>
				<div className="img-wrapper">
					<picture>
						<source media="(min-width:2000px)" srcset={image4k.src} alt="" />
						<source media="(min-width:1024px)" srcset={imageDesk.src} />
						<img src={image.src} alt="olhar" class="img" />
					</picture>
				</div>
			</section>
		</>
	);
}
