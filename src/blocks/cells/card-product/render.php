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
    $tag =  "a";
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
}

$classes = "card-product {$attributes['variant']} card-product-{$randomComponentId} card";
?>
<div class="<?= $classes ?>">
    <style>
        .card-product-<?= $randomComponentId ?> {
            background-size: cover;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .card-product-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }

        @media (min-width: 1024px) {
            .card-product-<?= $randomComponentId ?> {
                background-size: cover;
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?php
    if ($product) :
    ?>
        <<?= $tag ?> <?= $hasHref . $hasTarget ?>>
            <?php
            if (!empty($attributes['product']['imgMobile']['src']) && !empty($attributes['product']['imgDesktop']['src'])) :
            ?>
                <picture class="picture">
                    <source media="(min-width:768px)" srcset="<?= $attributes['product']['imgDesktop']['src'] ?>" />
                    <img src="<?= $attributes['product']['imgMobile']['src'] ?>" alt="<?= $attributes['product']['imgMobile']['alt'] ?>" class="img" />
                </picture>
            <?php
            endif;
            ?>
            <?php if ($hasInnerText) : ?>
                <p class="titulo">
                    <?= $textContent ?>
                </p>
            <?php elseif ($hasInnerImage) : ?>
                <div class="<?= $classes ?>">
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
    <?php endif; ?>
</div>