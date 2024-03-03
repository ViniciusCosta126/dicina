<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$bgImage = $attributes["bgImage"];

$classes = "racing-years {$attributes['variant']} racing-years-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        <?php
        echo "
            .racing-years-{$randomComponentId} {
                background-color: {$attributes["bgColor"]};
                margin-bottom: {$attributes["marginM"]}px;
            }

            .racing-years-{$randomComponentId} .racing-years-image-background::after {
                background: {$attributes["bgColorDegrade"]};
            }

            .racing-years-{$randomComponentId} .racing-years-content {
                background-color: {$attributes["bgColor"]};
            }
    
            @media (min-width: 768px) {
                .racing-years-{$randomComponentId} {
                    margin-bottom: {$attributes["marginD"]}px;
                }
            }
        ";
        ?>
    </style>

    <picture class="racing-years-image-background">
        <img src="<?= $bgImage["src"]; ?>" alt="<?= $bgImage["alt"]; ?>" width="<?= $bgImage["width"]; ?>" height="<?= $bgImage["height"]; ?>" />
    </picture>

    <div class="container">
        <div class="racing-years-content">
            <?= $content ?>
        </div>
    </div>
</div>