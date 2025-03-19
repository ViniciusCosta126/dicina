import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import metadata from './block.json';
import Controls from './controls.jsx';
import { ExternalLink } from '@wordpress/components';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: {
		src: (
			<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048">
				<path
					fill="#000"
					d="M128 0h1792v2048H128V0zm1664 1920V128H256v1792h1536zm-128-640v512H384v-512h1280zm-128 384v-256H512v256h1024z"
				/>
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

	const { bgColor, marginM, marginD } = attributes;

	const inlineStyles = `
	.footer-${randomComponentId} {
		background: ${bgColor}
	}
`;
	const templteUri = '/wp-content/themes/Template-blocks';
	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<footer className={`footer  footer-${randomComponentId}`}>
				<div className={`footer__wrapper container `}>
					<div className="footer__upper">
						<div className="footer__upper__container">
							<ExternalLink href="/wp-admin/nav-menus.php">Configurar menu Footer</ExternalLink>
							<div className="footer__upper__social">
								<div className="footer__upper__social">
									<RichText
										allowedFormats={[]}
										tagName="p"
										value={attributes.socialTitle}
										onChange={(socialTitle) =>
											setAttributes({
												socialTitle: socialTitle,
											})
										}
									/>
									<RichText
										allowedFormats={[]}
										tagName="p"
										value={attributes.socialTitleEN}
										onChange={(socialTitleEN) =>
											setAttributes({
												socialTitleEN: socialTitleEN,
											})
										}
									/>
								</div>
								<div className="footer__upper__social__icons">
									<InnerBlocks
										template={[
											[
												'il/button',
												{
													content: 'texto do botão',
													variant: 'link-icon',
													hasIcon: true,
													icon: {
														src: templteUri + '/images/facebook-icon.svg',
														alt: 'facebook',
													},
												},
											],
											[
												'il/button',
												{
													content: 'texto do botão',
													variant: 'link-icon',
													hasIcon: true,
													icon: {
														src: templteUri + '/images/instagram-icon.svg',
														alt: 'instagram',
													},
												},
											],
											[
												'il/button',
												{
													content: 'texto do botão',
													variant: 'link-icon',
													hasIcon: true,
													icon: {
														src: templteUri + '/images/youtube-icon.svg',
														alt: 'youtube',
													},
												},
											],
											[
												'il/button',
												{
													content: 'texto do botão',
													variant: 'link-icon',
													hasIcon: true,
													icon: {
														src: templteUri + '/images/linkedin-icon.svg',
														alt: 'linkedin',
													},
												},
											],
											[
												'il/button',
												{
													content: 'texto do botão',
													variant: 'link-icon',
													hasIcon: true,
													icon: {
														src: templteUri + '/images/twitter-icon.svg',
														alt: 'twitter',
													},
												},
											],
										]}
										allowedBlocks={['il/button']}
									/>
								</div>
								<div className="footer__upper__social__links">
									<ExternalLink href="/wp-admin/nav-menus.php">Configurar menu Links Social Midia</ExternalLink>
								</div>
								<hr />
							</div>
							<hr />
						</div>
					</div>
					<div className="footer__down">
						<div className="footer__down__logo">
							<img
								loading="eager"
								src={`https://placehold.co/200x45`}
								alt="Logo"
								width="89"
								height="22"
								className="logo"
							/>
						</div>
						<div className="footer__down__address">
							<RichText
								allowedFormats={[]}
								tagName="p"
								value={attributes.copyright}
								onChange={(copyright) => setAttributes({ copyright: copyright })}
							/>
							<RichText
								allowedFormats={[]}
								tagName="p"
								value={attributes.copyrightEN}
								onChange={(copyrightEN) => setAttributes({ copyrightEN: copyrightEN })}
							/>
						</div>
						<div className="footer__down__button">
							<a href="">
								<RichText
									allowedFormats={[]}
									tagName="a"
									onChange={(footerLink) =>
										setAttributes({
											footerLink: footerLink,
										})
									}
									placeholder="Busque sua verdade"
								/>
								<RichText
									allowedFormats={[]}
									tagName="a"
									onChange={(footerLinkEN) =>
										setAttributes({
											footerLinkEN: footerLinkEN,
										})
									}
									placeholder="Seek your Truth"
								/>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path
										d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z"
										fill="white"
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
