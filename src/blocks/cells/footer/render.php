<?php
$randomComponentId = random_int(1, 10000);

$language = "pt";

$template_uri = get_template_directory_uri();
$href = $attributes["link"]["url"] ?  $attributes["link"]["url"] : "";
?>

<footer class="footer footer-standard footer-<?= $randomComponentId ?> footer-<?= $randomComponentId ?>">
	<style>
		.footer-<?= $randomComponentId ?> {
			background-color: <?= $attributes["bgColor"] ?>;
		}
	</style>

	<div class="footer__wrapper container">
		<div class="footer__upper">
			<?= wp_nav_menu(['theme_location' => 'nav-footer'])?>
			<hr>
			<div class="footer__upper__social">
				<div class="footer__upper__social">
					<p><?= $language == 'pt' ?  $attributes['socialTitle'] :  $attributes['socialTitleEN'] ?></p>
				</div>
				<div class="footer__upper__social__links">
					<?= $language == 'pt' ? wp_nav_menu(['theme_location' => 'nav-social-links']) : wp_nav_menu(['theme_location' => 'en-nav-social-links']) ?>
				</div>
				<hr id="margin-desk">
			</div>
			<hr id="margin-hr">
		</div>
		<div class="footer__down">
			<div class="footer__down__logo">
				<img src="https://placehold.co/200x45" alt="">
			</div>
			<div class="footer__down__address">
				<p><?= $language == 'pt' ?  $attributes['copyright'] :  $attributes['copyrightEN'] ?></p>
			</div>
			<div class="footer__down__button">
				<a href="<?= $href ?>">
					<?= $language == 'pt' ?  $attributes['footerLink'] :  $attributes['footerLinkEN'] ?>
					<svg class="logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z" fill="white" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</footer>