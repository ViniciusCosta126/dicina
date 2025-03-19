import { InnerBlocks, RichText } from '@wordpress/block-editor';
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
	icon: 'email',
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
	const { marginM, marginD, bgImage } = attributes;
	const inlineStyles = `
        .newsletter {
			caret-color: #fff;
            background: linear-gradient(90deg, rgba(0, 168, 81, 0.7) 0%, rgba(24, 50, 215, 0.7) 100%), url(${bgImage.src}) no-repeat;
        }
		.block-editor-rich-text__editable.newsletter__title.rich-text {
			font-size: 66px;
		}
        .newsletter.margin-bottom-${randomComponentId} {
            margin-bottom: ${marginM}px;
        }

        @media (min-width: 768px) {
            .newsletter.margin-bottom-${randomComponentId} {
                margin-bottom: ${marginD}px;
            }
        }
    `;
	return (
		<>
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<section className="newsletter">
				<div className="container wp-editor">
					<div className="left">
						<p className="info-text">%Insira os textos para o mobile (até 1023px)%</p>
						<br />
						<div className="wrapper__title">
							<RichText
								allowedFormats={[]}
								className="newsletter__title"
								placeholder="Texto principal"
								value={attributes.titleMobile.normal}
								onChange={(title) =>
									setAttributes({
										titleMobile: {
											...attributes.titleMobile,
											normal: title,
										},
									})
								}
							/>
							<RichText
								allowedFormats={[]}
								className="newsletter__title newsletter__title--senna-sans"
								placeholder="Texto principal Senna Sans"
								value={attributes.titleMobile.sennaSans}
								onChange={(title) =>
									setAttributes({
										titleMobile: {
											...attributes.titleMobile,
											sennaSans: title,
										},
									})
								}
							/>
						</div>

						<br />
						<hr />
						<br />

						<p className="info-text">%Insira os textos para o desktop (a partir de 1024px)%</p>
						<br />
						<div className="wrapper__title">
							<RichText
								allowedFormats={[]}
								className="newsletter__title"
								placeholder="Texto principal"
								value={attributes.titleDesktop.normal}
								onChange={(title) =>
									setAttributes({
										titleDesktop: {
											...attributes.titleDesktop,
											normal: title,
										},
									})
								}
							/>

							<RichText
								allowedFormats={[]}
								className="newsletter__title newsletter__title--senna-sans"
								placeholder="Texto principal Senna Sans"
								value={attributes.titleDesktop.sennaSans}
								onChange={(title) =>
									setAttributes({
										titleDesktop: {
											...attributes.titleDesktop,
											sennaSans: title,
										},
									})
								}
							/>
						</div>
					</div>

					<div className="right">
						<RichText
							value={attributes.subtitle}
							className="newsletter__subtitle"
							onChange={(subtitle) => setAttributes({ subtitle: subtitle })}
							placeholder="Texto auxiliar"
						/>
						<form className="newsletter__form" action="">
							<InnerBlocks
								template={[
									[
										'il/input',
										{
											variant: 'email',
											placeholder: 'digite seu email',
											errorMessage: 'E-mail inválido',
											name: 'email',
											ariaLabel: 'E-mail',
											required: true,
											checkboxLabel: '',
										},
									],
									[
										'il/input',
										{
											variant: 'checkbox',
											name: 'lgpd',
											ariaLabel: 'LGPD',
											required: true,
											marginM: 20,
											marginD: 40,
										},
									],
									[
										'il/input',
										{
											variant: 'submit',
											name: '',
											ariaLabel: '',
											checkboxLabel: '',
										},
									],
								]}
							/>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
