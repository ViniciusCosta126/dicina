<?php
$template_uri = get_template_directory_uri();

$language = "pt";

$isStick = $attributes["colorVariant"] !== 'transparent' ? 'sticky' : '';

$showMenus = !$attributes["startTransparent"] ? "show" : '';
$everVisible = !$attributes["startTransparent"] ? "ever-visible {$isStick}" : '';
$isLargeHeader = $attributes["keepShortMenus"] ? "large-on-mobile" : '';
$classes = "{$attributes["position"]} {$attributes["colorVariant"]} {$everVisible} {$isLargeHeader}";


// set the visible menu
$shortMenu = "";
if ($attributes["shortMenu"] === "main") {
	$shortMenu = "nav-header-short";
} else if ($attributes["shortMenu"] === "press") {
	$shortMenu = "nav-header-short-press";
} else if ($attributes["shortMenu"] === "journey") {
	$shortMenu = "nav-header-short-journey";
} else if ($attributes["shortMenu"] === "empty") {
	$shortMenu = null;
}

//set breadcrumb text
$breadcrumb =  $attributes["breadcrumb"]["pt"];
$breadcrumbLink =  $attributes["breadcrumbLink"]["pt"];
?>

<header class="header <?= $classes; ?>">
	<span class="header__background-overlay"></span>

	<div class="header__container">
		<div class="container medium main-container <?= $showMenus; ?>">
			<div class="header__logo">
				<a href="/" class="header__logo_link">
					<img src="https://placehold.co/133x40" alt="">
				</a>

				<?php if ($breadcrumb !== "") : ?>
					<a href="<?= $breadcrumbLink; ?>" class="header__logo_breadcrumb"><?= $breadcrumb ?></a>
				<?php endif; ?>
			</div>

			<div class="header__links <?= !$attributes["keepShortMenus"] ? "desktop" : ""; ?>">
				<?php if ($shortMenu) : ?>
					<?= wp_nav_menu(['theme_location' => $shortMenu])?>
				<?php endif; ?>
			</div>

			<div class="buttons-wrapper">
				<a href="<?= $attributes["shopLink"]; ?>" target="_blank" class="shop-link">
					<svg width="21" height="24" fill="none">
						<path fill="#fff" d="M10.212 0C7.677 0 5.597 2.08 5.597 4.615v.923H1.038l-.057.866L.058 23.02 0 24h20.423l-.057-.981-.923-16.616-.058-.865h-4.558v-.923c0-2.534-2.08-4.615-4.615-4.615Zm0 1.846a2.77 2.77 0 0 1 2.77 2.77v.922h-5.54v-.923a2.77 2.77 0 0 1 2.77-2.769ZM2.769 7.385h2.828v2.769h1.846v-2.77h5.538v2.77h1.846v-2.77h2.828l.807 14.77h-16.5l.807-14.77Z" />
					</svg>
				</a>

				<button class="header__menu_btn" aria-label="Menu hamburguer">
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>

		<nav class="navbar">
			<div class="container">
				<div class="navbar__container__left">

					<div class="navbar__text_up">
						<p class="navbar__text_up_menu desktop"> <?= $attributes['menu'] ?></p>
						<img src="<?= $attributes['bigMenuImg']['src'] ?>" alt="<?= $attributes['bigMenuImg']['alt'] ?>"  class="navbar__text_up_img">
					</div>

					<div class="mobile">
						<div class="menu-header-container">
							<?= wp_nav_menu(['theme_location' => 'nav-header']) ?>
						</div>
					</div>

					<div class="navbar__text_down">
						<?= $content ?>
						<p>
							<?= $attributes['donation'] ?>
						</p>
					</div>
				</div>

				<div class="navbar__container__right">
					<div class="desktop">
						<div class="menu-header-container">
							<?= wp_nav_menu(['theme_location' => 'nav-header'])?>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>

</header>