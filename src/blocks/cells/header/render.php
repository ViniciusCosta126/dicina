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