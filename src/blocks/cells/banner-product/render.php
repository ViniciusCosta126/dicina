<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";

$product = null;
$productID = $attributes["productId"];

$args = [
	'post_type' => 'product',
	'p' => $productID
];
$productsQuery = new WP_Query($args);


foreach ($productsQuery->posts as $key => $product) {
	$acfProduct = get_field('product', $product->ID);
	$product = $acfProduct;
}

if ($product) {
	// Texto interno
	$hasInnerText = $product["has_inner"] === "1" ? true  : false;

	$textContent = "";
	$linkHref = "";
	$linkText = "";
	$linkTarget = "";

	if ($hasInnerText) {
		if ($language === "pt") {
			$textContent = $product["text_in_img"];
			$linkHref = $product["link"]["url"];
			$linkTarget = $product["link"]["target"];
			$linkText = $product["link"]["title"];
		} else if ($language === "en") {
			$textContent = $product["text_in_img_en"];
			$linkHref = $product["link_en"]["url"];
			$linkTarget = $product["link_en"]["target"];
			$linkText = $product["link_en"]["title"];
		}
	}

	// Imagem interna
	$hasInnerImage = $product["has_inner"] === "2" ? true  : false;
	$innerImage = null;
	$innerImageEN = null;

	if ($hasInnerImage) {
		$innerImage = $product["inner_image"];
		$innerImageEn = $product["inner_image_en"];
	}

	// Cria link para o banner
	$tag = $hasInnerText ? "div" : "a";
	$hasHref = '';
	$hasTarget = '';

	if ($tag == 'a' && !empty($attributes["link"])) {
		if ($language === "pt") {
			$hasHref = 'href="' . $product["link"]["url"] . '"';
			$hasTarget = 'target="' . $product["link"]["target"] . '"';
		} else if ($language === "en") {
			$hasHref = 'href="' . $product["link_en"]["url"] . '"';
			$hasTarget = 'target="' . $product["link_en"]["target"] . '"';
		}
	};
?>

	<<?= $tag ?> <?= $hasHref . $hasTarget ?> class="banner-product <?= $attributes["variant"] ?> banner-product-<?= $randomComponentId ?>">
		<style>
			.banner-product-<?= $randomComponentId ?> {
				background: #a2a1a8 <?= !empty($attributes['product']['imgMobile']['src']) ? 'url(' . $attributes['product']["imgMobile"]["src"] . ')' : '' ?> no-repeat center center;
				background-size: cover;
				margin-bottom: <?= $attributes["marginM"] ?>px;
			}

			@media (min-width: 768px) {
				.banner-product-<?= $randomComponentId ?> {
					margin-bottom: <?= $attributes["marginD"] ?>px;
				}
			}

			@media (min-width: 1024px) {
				.banner-product-<?= $randomComponentId ?> {
					background: #a2a1a8 <?= !empty($attributes['product']['imgDesktop']['src']) ? 'url(' . $attributes['product']["imgDesktop"]["src"] . ')' : '' ?> no-repeat center center;
					background-size: cover;
					margin-bottom: <?= $attributes["marginD"] ?>px;
				}
			}
		</style>

		<?php if ($hasInnerText) : ?>
			<?= do_blocks(
				'<!-- wp:il/wrapper {"extraClass":"banner-product__wrapper-text"} -->
				<!-- wp:il/typography {"content":"' . $textContent . '","color":"#fff","manualSizes":true,"manualSizeM":18,"manualSizeD":30,"textWeight":"weight-medium"} /-->
				<!-- wp:il/button {"content":"' . $linkText . '","hasLink":true,"link":{"url":"' . $linkHref . '","target":"' . $linkTarget . '"},"variant":"link-arrow","extraClass":"link__button"} /-->
			<!-- /wp:il/wrapper -->'
			); ?>
		<?php elseif ($hasInnerImage) : ?>
			<div class="banner-product__container">
				<?php if ($innerImage && $language === 'pt') : ?>
					<picture class="inner-image">
						<img src="<?= $innerImage['url'] ?>" alt="<?= $innerImage['alt'] ?>" width="<?= $innerImage['width'] ?>" height="<?= $innerImage['height'] ?>" />
					</picture>
				<?php elseif ($innerImageEn && $language === 'en') : ?>
					<picture class="inner-image">
						<img src="<?= $innerImageEn['url'] ?>" alt="<?= $innerImageEn['alt'] ?>" width="<?= $innerImageEn['width'] ?>" height="<?= $innerImageEn['height'] ?>" />
					</picture>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</<?= $tag ?>>

<?php }; ?>