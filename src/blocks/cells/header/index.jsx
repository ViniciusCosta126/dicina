import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ExternalLink } from '@wordpress/components';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

// Register block.
registerBlockType(metadata.name, {
	title: metadata.title,
	attributes: metadata.attributes,
	category: metadata.category,
	icon: {
		src: (
			<svg viewBox="0 0 24 24" width="48" height="48">
				<path d="M18.5 10.5H10v8h8a.5.5 0 00.5-.5v-7.5zm-10 0h-3V18a.5.5 0 00.5.5h2.5v-8zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
			</svg>
		),
	},
	edit: EditorComponent,
	save: () => <InnerBlocks.Content />,
});

/**
 * Editor view
 * @param {*} props Block's properties
 * @returns JSX
 */
export default function EditorComponent({ attributes, setAttributes }) {
	const { bigMenuImg, breadcrumb, hasSearch, colorVariant } = attributes;

	const imagePath = '/wp-content/themes/Template-blocks/images/';

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<header className={`header ${colorVariant} p-relative open wp-panel`}>
				<span className="header__background-overlay"></span>

				<div className="header__container">
					<div className="container medium main-container show">
						<div className="header__logo">
							<a href="/" className='header__logo_link"'>
								<img
									loading="eager"
									src={`${imagePath}/white_logo_horizontal.png`}
									alt="Logo"
									width="89"
									height="22"
									className="logo"
								/>
							</a>

							{breadcrumb.pt && <strong className="header__logo_breadcrumb">{breadcrumb.pt}</strong>}
						</div>

						<div className="header__links desktop">
							<ExternalLink href="/wp-admin/nav-menus.php">Configurar menu Header curto</ExternalLink>
						</div>

						<div class="buttons-wrapper">
							{hasSearch && (
								<button class="search-button">
									<svg width="24" height="24" fill="none">
										<mask id="a" fill="#fff">
											<path d="m.072 22.275 7.791-7.791A8.92 8.92 0 0 1 6 9a8.95 8.95 0 0 1 2.637-6.363A8.934 8.934 0 0 1 15 0c2.403 0 4.665.939 6.363 2.637A8.928 8.928 0 0 1 24 9a8.946 8.946 0 0 1-2.637 6.363A8.928 8.928 0 0 1 15 18a8.926 8.926 0 0 1-5.48-1.86l-7.792 7.788a.246.246 0 0 1-.348 0L.072 22.623a.246.246 0 0 1 0-.348Zm10.176-8.523A6.684 6.684 0 0 0 15 15.72c1.794 0 3.48-.7 4.752-1.968A6.684 6.684 0 0 0 21.72 9a6.679 6.679 0 0 0-1.968-4.752A6.684 6.684 0 0 0 15 2.28a6.666 6.666 0 0 0-4.752 1.968A6.684 6.684 0 0 0 8.28 9c0 1.794.7 3.483 1.968 4.752Z" />
										</mask>
										<path
											fill="#fff"
											d="m.072 22.275 7.791-7.791A8.92 8.92 0 0 1 6 9a8.95 8.95 0 0 1 2.637-6.363A8.934 8.934 0 0 1 15 0c2.403 0 4.665.939 6.363 2.637A8.928 8.928 0 0 1 24 9a8.946 8.946 0 0 1-2.637 6.363A8.928 8.928 0 0 1 15 18a8.926 8.926 0 0 1-5.48-1.86l-7.792 7.788a.246.246 0 0 1-.348 0L.072 22.623a.246.246 0 0 1 0-.348Zm10.176-8.523A6.684 6.684 0 0 0 15 15.72c1.794 0 3.48-.7 4.752-1.968A6.684 6.684 0 0 0 21.72 9a6.679 6.679 0 0 0-1.968-4.752A6.684 6.684 0 0 0 15 2.28a6.666 6.666 0 0 0-4.752 1.968A6.684 6.684 0 0 0 8.28 9c0 1.794.7 3.483 1.968 4.752Z"
										/>
										<path
											fill="#fff"
											d="m7.863 14.484.791-.612.539.697-.623.622-.707-.707Zm13.5-11.847-.706.708h-.001l.707-.708Zm0 12.726-.708-.707.708.707Zm-11.844.777-.707-.707.622-.622.696.537-.61.792Zm-7.79 7.788-.708-.707.707.707ZM1.553 24v1-1Zm-.174-.072.706-.708.001.001-.707.707ZM.072 22.623l-.706.708.706-.708Zm0-.348.707.707-.707-.707Zm10.176-8.523-.706.708-.001-.001.707-.707Zm9.504 0 .708.706-.002.002-.706-.708Zm0-9.504.706-.708h.001l-.707.708ZM-.635 21.568l7.791-7.791L8.57 15.19.78 22.982l-1.415-1.414Zm7.707-6.472A9.92 9.92 0 0 1 5 9h2a7.92 7.92 0 0 0 1.654 4.872l-1.582 1.224ZM5 9a9.946 9.946 0 0 1 2.93-7.07l1.415 1.413A7.946 7.946 0 0 0 7 9H5Zm2.93-7.07A9.933 9.933 0 0 1 15-1v2c-2.138 0-4.145.83-5.655 2.343L7.929 1.931ZM15-1a9.946 9.946 0 0 1 7.07 2.93l-1.414 1.414A7.946 7.946 0 0 0 15 1v-2Zm7.07 2.93A9.928 9.928 0 0 1 25 9h-2c0-2.14-.83-4.145-2.343-5.655l1.413-1.416ZM25 9a9.946 9.946 0 0 1-2.93 7.07l-1.414-1.414A7.946 7.946 0 0 0 23 9h2Zm-2.93 7.07A9.928 9.928 0 0 1 15 19v-2c2.14 0 4.145-.83 5.655-2.344l1.416 1.413ZM15 19a9.926 9.926 0 0 1-6.092-2.068l1.222-1.584A7.927 7.927 0 0 0 15 17v2Zm-4.774-2.153-7.79 7.788-1.415-1.414 7.791-7.788 1.414 1.414Zm-7.79 7.788a1.246 1.246 0 0 1-.405.27l-.766-1.848a.756.756 0 0 0-.244.164l1.414 1.414Zm-.405.27a1.247 1.247 0 0 1-.477.095v-2a.775.775 0 0 0-.289.057l.766 1.848ZM1.554 25c-.164 0-.326-.032-.477-.095l.766-1.848A.754.754 0 0 0 1.554 23v2Zm-.477-.095a1.246 1.246 0 0 1-.404-.27l1.414-1.414a.755.755 0 0 0-.244-.164l-.766 1.848Zm-.403-.27-1.308-1.304 1.412-1.416 1.308 1.305-1.412 1.416ZM-.635 23.33a1.246 1.246 0 0 1-.27-.404l1.848-.766a.753.753 0 0 0-.164-.244L-.635 23.33Zm-.27-.404A1.246 1.246 0 0 1-1 22.449h2c0-.1-.02-.197-.057-.289l-1.848.766ZM-1 22.449c0-.164.032-.326.095-.477l1.848.766a.754.754 0 0 0 .057-.29h-2Zm.095-.477a1.24 1.24 0 0 1 .27-.404L.78 22.982a.754.754 0 0 0 .164-.244l-1.848-.766Zm11.86-8.928A5.684 5.684 0 0 0 15 14.72v2c-2.06 0-4-.805-5.458-2.26l1.412-1.416ZM15 14.72c1.528 0 2.96-.593 4.046-1.676l1.412 1.416A7.684 7.684 0 0 1 15 16.72v-2Zm4.044-1.674A5.684 5.684 0 0 0 20.72 9h2c0 2.06-.805 4-2.26 5.458l-1.416-1.412ZM20.72 9a5.679 5.679 0 0 0-1.675-4.045l1.414-1.414A7.678 7.678 0 0 1 22.72 9h-2Zm-1.674-4.044A5.684 5.684 0 0 0 15 3.28v-2c2.06 0 4 .805 5.458 2.26l-1.412 1.416ZM15 3.28c-1.53 0-2.964.591-4.044 1.674L9.54 3.542A7.666 7.666 0 0 1 15 1.28v2Zm-4.044 1.674A5.684 5.684 0 0 0 9.28 9h-2c0-2.06.805-4 2.26-5.458l1.416 1.412ZM9.28 9c0 1.529.594 2.963 1.675 4.045l-1.414 1.414A7.678 7.678 0 0 1 7.281 9h2Z"
											mask="url(#a)"
										/>
									</svg>
								</button>
							)}

							<a target="_blank" className="shop-link">
								<svg width="21" height="24" fill="none">
									<path
										fill="#fff"
										d="M10.212 0C7.677 0 5.597 2.08 5.597 4.615v.923H1.038l-.057.866L.058 23.02 0 24h20.423l-.057-.981-.923-16.616-.058-.865h-4.558v-.923c0-2.534-2.08-4.615-4.615-4.615Zm0 1.846a2.77 2.77 0 0 1 2.77 2.77v.922h-5.54v-.923a2.77 2.77 0 0 1 2.77-2.769ZM2.769 7.385h2.828v2.769h1.846v-2.77h5.538v2.77h1.846v-2.77h2.828l.807 14.77h-16.5l.807-14.77Z"
									/>
								</svg>
							</a>

							<div className="header__lang desktop">
								<div className="header__lang_items">
									<a href="#" className="active">
										PT
									</a>

									<a href="#">EN</a>
								</div>
							</div>

							<button className="header__menu_btn">
								<span></span>
								<span></span>
								<span></span>
							</button>
						</div>
					</div>

					<nav className="navbar open">
						<div className="container">
							<div className="navbar__container__left">
								<div className="navbar__lang mobile">
									<ul className="navbar__lang_list">
										<li>
											<a href="#" className="active">
												PT
											</a>
										</li>
										<li>
											<a href="#">EN</a>
										</li>
									</ul>
								</div>

								<div className="navbar__text_up">
									<RichText
										allowedFormats={[]}
										tagName="p"
										className="navbar__text_up_menu desktop"
										value={attributes.menu}
										onChange={(menu) =>
											setAttributes({
												menu: menu,
											})
										}
									/>
									{bigMenuImg.src && <img src={bigMenuImg.src} alt={bigMenuImg.alt} className="big-img-menu" />}
								</div>

								<div className="mobile">
									<ExternalLink href="/wp-admin/nav-menus.php">Configurar menu Header</ExternalLink>
								</div>

								<div className="navbar__text_down">
									<InnerBlocks
										template={[
											'il/button',
											{
												content: 'mude vidas',
												hasEN: true,
												contentEN: 'change lives',
												variant: 'secondary',
												needTranslate: true,
												addCustomColor: true,
												color: '#ffffff',
												bgColor: 'transparent',
												colorHover: '#ffffff',
												bgColorHover: 'transparent',
												marginM: 0,
												marginD: 0,
											},
										]}
										allowedBlocks={['il/button']}
									/>
									<div>
										<RichText
											allowedFormats={[]}
											tagName="p"
											value={attributes.donation}
											onChange={(donation) =>
												setAttributes({
													donation: donation,
												})
											}
										/>
										<RichText
											allowedFormats={[]}
											tagName="p"
											value={attributes.donationEN}
											onChange={(donationEN) =>
												setAttributes({
													donationEN: donationEN,
												})
											}
										/>
									</div>
								</div>
							</div>

							<div className="navbar__container__right">
								<div className="desktop">
									<ExternalLink href="/wp-admin/nav-menus.php">Configurar menu Header</ExternalLink>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</header>
		</>
	);
}
