import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Controls from './controls.jsx';

import './style.scss';

registerBlockType(metadata.name, {
	title: metadata.title,
	description: metadata.description,
	attributes: metadata.attributes,
	example: metadata.example,
	category: metadata.category,
	icon: 'share',
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

	const { variant, bgColor, enables, marginM, marginD } = attributes;
	const templteUri = '/wp-content/themes/Template-blocks';

	const inlineStyles = `
		.sharing-buttons-${randomComponentId} {
			background: ${bgColor};
			margin-bottom: ${marginM}px;
		}

		@media (min-width: 768px) {
			.sharing-buttons-${randomComponentId} {
				margin-bottom: ${marginD}px;
			}
		}
	`;

	const Variants = () => {
		const buttons = [];

		enables.forEach((enable) => {
			let shareLink, iconLink, iconAlt;
			let the_tooltip = {};

			if (enable === 'facebook') {
				shareLink = 'https://www.facebook.com/sharer/sharer.php?u=';
				iconAlt = enable;

				if (variant === 'closed') {
					iconLink = templteUri + `/images/icons/shareFacebook.svg`;
				} else {
					iconLink = templteUri + `/images/icons/shareFacebook.svg`;
				}
			} else if (enable === 'linkedin') {
				shareLink = 'https://www.linkedin.com/shareArticle?mini=true&url=';
				iconAlt = enable;

				if (variant === 'closed') {
					iconLink = templteUri + `/images/icons/shareLinkedin.svg`;
				} else {
					iconLink = templteUri + `/images/icons/shareLinkedin.svg`;
				}
			} else if (enable === 'twitter') {
				shareLink = 'https://twitter.com/intent/tweet';
				iconAlt = enable;

				if (variant === 'closed') {
					iconLink = templteUri + `/images/icons/shareTwitter.svg`;
				} else {
					iconLink = templteUri + `/images/icons/shareTwitter.svg`;
				}
			} else if (enable === 'whatsapp') {
				shareLink = 'https://wa.me/?text=';
				iconAlt = enable;

				if (variant === 'closed') {
					iconLink = templteUri + `/images/icons/shareWhatsApp.svg`;
				} else {
					iconLink = templteUri + `/images/icons/shareWhatsApp.svg`;
				}
			} else if (enable === 'copy') {
				shareLink = '';
				iconAlt = 'copy to clipboard';

				if (variant === 'closed') {
					iconLink = templteUri + `/images/icons/shareCopyLink.svg`;
				} else {
					iconLink = templteUri + `/images/icons/shareCopyLink.svg`;
				}

				the_tooltip = {
					hasTooltip: true,
					tooltip: 'copied!',
				};
			}

			buttons.push([
				'il/button',
				{
					hasLink: true,
					link: {
						url: shareLink,
						target: '_blank',
					},
					extraClass: `${enable}-icon`,
					variant: 'share-button',
					hasIcon: true,
					icon: {
						src: iconLink,
						alt: `${enable}`,
					},
					...the_tooltip,
				},
			]);
		});

		if (variant === 'default') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								content: 'Compartilhe esse fato:',
								tag: 'p',
								bgColor: 'transparent',
								manualSizes: true,
								manualSizeM: 18,
								manualSizeD: 24,
								marginM: 16,
								marginD: 32,
								color: '#ffffff',
								extraClass: 'sharing-buttons--text',
							},
						],
						[
							'il/wrapper',
							{
								extraClass: 'sharing-buttons--icons',
								isLocked: true,
							},
							[...buttons],
						],
					]}
				/>
			);
		} else if (variant === 'closed') {
			return (
				<InnerBlocks
					template={[
						[
							'il/wrapper',
							{
								extraClass: 'sharing-buttons--icons',
								isLocked: true,
							},
							[...buttons],
						],
						[
							'il/wrapper',
							{
								extraClass: 'sharing-buttons--closed',
								isLocked: true,
							},
						],
					]}
				/>
			);
		} else if (variant === 'post-footer') {
			return (
				<InnerBlocks
					template={[
						[
							'il/typography',
							{
								tag: 'p',
								bgColor: 'transparent',
								manualSizes: true,
								manualSizeM: 20,
								manualSizeD: 24,
								color: '#121212',
								textWeight: 'weight-medium',
								extraClass: 'sharing-buttons--text',
							},
						],
						[
							'il/wrapper',
							{
								extraClass: 'sharing-buttons--icons',
								isLocked: true,
							},
							[...buttons],
						],
					]}
				/>
			);
		}
	};

	return (
		<>
			{/* Editor controls */}
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<style>{inlineStyles}</style>

			<div className={`sharing-buttons ${variant} wp-editor sharing-buttons-${randomComponentId}`}>
				<Variants />
			</div>
		</>
	);
}
