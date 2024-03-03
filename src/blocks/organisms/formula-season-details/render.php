<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$imageMobile = $attributes["bgImageMobile"];
$imageDesk = $attributes["bgImageDesk"];

$classes = "formula-season-details {$attributes['variant']} formula-season-details-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        <?php echo "
            .formula-season-details-{$randomComponentId} {
                background-color: {$attributes["bgColor"]};
                margin-bottom: {$attributes["marginM"]}px;
            }

            .formula-season-details-{$randomComponentId} .formula-season-details-background::after {
                background: {$attributes["bgColorDegrade"]};
            }

            @media (min-width: 768px) {
                .formula-season-details-{$randomComponentId} {
                    margin-bottom: {$attributes["marginD"]}px;
                }

                .formula-season-details-{$randomComponentId} .formula-season-details-background::after {
                    background: {$attributes["bgColorDegradeDesk"]};
                }
            }
        "; ?>
    </style>

    <picture class="formula-season-details-background">
        <source srcset="<?= $imageDesk["src"] ?>" media="(min-width: 768px)" />
        <img src="<?= $imageMobile["src"]; ?>" alt="<?= $imageMobile["alt"]; ?>" />
    </picture>

    <div class="container">
        <div class="formula-season-details-content">
            <?= $content ?>
        </div>
    </div>
</div>