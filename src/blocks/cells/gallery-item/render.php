<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$expandedImage = $attributes['expandedImage'];
$expandedCaption = $attributes['expandedCaption'];
$forceLandsape = $attributes['forceLandsape'];
$landsape = $forceLandsape ? "data-landsape='true'" : "data-landsape='false'";
$modalId = $attributes['id'];
$indexId = $attributes['indexId'];
$image = $attributes['image'];

$classes = "gallery-item {$attributes['variant']} gallery-item-{$randomComponentId}";
?>

<div class="<?= $classes; ?>" data-indexId="<?= $indexId; ?>">
    <style>
        .gallery-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .gallery-item-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="container">
        <div class="gallery-item__image">
            <button class="gallery-item__button open-modal" data-id="<?= $modalId ?>" <?= $landsape ?>>
                <svg width="26" height="25" viewBox="0 0 26 25" fill="none">
                    <path d="M25.5254 17.098L22.5524 20.0144L18.1062 15.6529L16.1242 17.5971L20.5704 21.9586L17.5974 24.875H25.5254V17.098ZM0.294678 7.902L3.2677 4.98562L7.71393 9.34713L9.69594 7.40288L5.24972 3.04137L8.22275 0.125H0.294678V7.902ZM25.5254 0.125H17.5974L20.5704 3.04137L16.1242 7.40288L18.1062 9.34713L22.5524 4.98562L25.5254 7.902V0.125ZM0.294678 24.875H8.22275L5.24972 21.9586L9.69594 17.5971L7.71393 15.6529L3.2677 20.0144L0.294678 17.098V24.875Z" fill="white" />
                </svg>
            </button>

            <img loading="lazy" src="<?= $image['src'] ?>" alt="<?= $image['alt'] ?>" width="<?= $image['width'] ?>" height="<?= $image['height'] ?>" />
        </div>

        <?= $content ?>
    </div>

    <?=
    do_blocks('
        <!-- wp:il/modal {"id": "' . $modalId . '", "forceLandsape": "' . $forceLandsape . '", "extraClass": "modal--gallery-expanded"} -->
            <!-- wp:il/gallery-item-expanded {"image": {"src": "' . $expandedImage["src"] . '", "alt": "' . $expandedImage["alt"] . '", "height": "' . $expandedImage["height"] . '", "width": "' . $expandedImage["width"] . '"}} -->
                <!-- wp:il/typography {"content": "' . $expandedCaption . '","color":"#ffffff","tag":"figcaption","manualSizes":true,"manualSizeD":26,"textAlign":"align-center","textWeight":"weight-light","extraClass":"caption"} /-->
            <!-- /wp:il/gallery-item-expanded -->
        <!-- /wp:il/modal -->
    ');
    ?>
</div>