<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$videoID = $attributes["videoID"];
$modalID = $attributes["modalID"];

$imageMobile = $attributes["bgImageMobile"];
$imageDesk = $attributes["bgImageDesk"];
$indexId = $attributes['indexId'];

$heroClass = $attributes["isHero"] ? 'is-hero' : '';

$classes = "text-with-image {$attributes['variant']} {$attributes['vPosition']} {$attributes['hPosition']} text-with-image-{$randomComponentId}";
$indexId = $attributes['indexId']
?>

<div class="<?= $classes; ?>" data-indexId="<?= $indexId; ?>">
    <style>
        <?php echo "
            .text-with-image-{$randomComponentId} {
                background-color: {$attributes["bgColor"]};
                margin-bottom: {$attributes["marginM"]}px;
            }

            .text-with-image-{$randomComponentId} .text-with-image-background::after {
                background: {$attributes["bgColorDegrade"]};
            }

            @media (min-width: 768px) {
                .text-with-image-{$randomComponentId} {
                    margin-bottom: {$attributes["marginD"]}px;
                }

                .text-with-image-{$randomComponentId} .text-with-image-background::after {
                    background: {$attributes["bgColorDegradeDesk"]};
                }
            }
        "; ?>
    </style>

    <?php if ($attributes["hasImage"]) : ?>
        <picture class="text-with-image-background">
            <source srcset="<?= $imageDesk["src"] ?>" media="(min-width: 768px)" />
            <img src="<?= $imageMobile["src"]; ?>" alt="<?= $imageMobile["alt"]; ?>" />
        </picture>
    <?php endif; ?>

    <div class="container">
        <div class="text-with-image-content <?= $heroClass; ?>">
            <?= $content ?>
        </div>
    </div>
</div>

<?php if ($attributes["variant"] === "text-video" && $attributes["videoID"] !== "") : ?>
    <?= do_blocks('<!-- wp:il/modal {"id": "' . $modalID . '", "videoID": "' . $videoID . '", "youtubeVideo": true} /-->'); ?>
<?php endif; ?>