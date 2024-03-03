<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$imageMobile = $attributes["bgImageMobile"];
$imageDesk = $attributes["bgImageDesk"];

$hasImage = $imageMobile !== null && $imageDesk !== null ? true : false;

$classes = "circuits {$attributes['variant']} circuits-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        <?php echo "
            .circuits-{$randomComponentId} {
                background-color: {$attributes["bgColor"]};
                margin-bottom: {$attributes["marginM"]}px;
            }

            .circuits-{$randomComponentId} .circuits-background::after {
                background: {$attributes["bgColorDegrade"]};
            }

            @media (min-width: 768px) {
                .circuits-{$randomComponentId} {
                    margin-bottom: {$attributes["marginD"]}px;
                }

                .circuits-{$randomComponentId} .circuits-background::after {
                    background: {$attributes["bgColorDegradeDesk"]};
                }
            }
        "; ?>
    </style>


    <div class="container">
        <div class="circuits-content">
            <?= $content ?>
        </div>
    </div>

    <?php if ($hasImage) : ?>
        <picture class="circuits-background">
            <source srcset="<?= $imageDesk["src"] ?>" media="(min-width: 768px)" />
            <img src="<?= $imageMobile["src"]; ?>" alt="<?= $imageMobile["alt"]; ?>" />
        </picture>
    <?php endif; ?>
</div>