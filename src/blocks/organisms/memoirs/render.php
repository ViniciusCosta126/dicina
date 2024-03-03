<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$imageMobile = $attributes["bgImageMobile"];
$imageDesk = $attributes["bgImageDesk"];

$isHeroClass = $attributes["isHero"] ? 'is-hero' : '';

$classes = "memoirs memory-parent {$attributes['variant']} memoirs-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        <?php echo "
            .memoirs-{$randomComponentId} {
                background-color: {$attributes["bgColor"]};
                margin-bottom: {$attributes["marginM"]}px;
            }

            .memoirs-{$randomComponentId} .memoirs-background::after {
                background: {$attributes["bgColorDegrade"]};
            }

            @media (min-width: 768px) {
                .memoirs-{$randomComponentId} {
                    margin-bottom: {$attributes["marginD"]}px;
                }

                .memoirs-{$randomComponentId} .memoirs-background::after {
                    background: {$attributes["bgColorDegradeDesk"]};
                }
            }
        "; ?>
    </style>

    <picture class="memoirs-background">
        <source srcset="<?= $imageDesk["src"] ?>" media="(min-width: 768px)" />
        <img src="<?= $imageMobile["src"]; ?>" alt="<?= $imageMobile["alt"]; ?>" />
    </picture>

    <div class="container">
        <div class="memoirs-content <?= $isHeroClass; ?>">
            <?= $content ?>
        </div>
    </div>

    <div class="request-content  <?= $isHeroClass; ?>"></div>
</div>