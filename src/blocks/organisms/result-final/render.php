<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$hasImage = isset($attributes["hasImage"]) ? $attributes["hasImage"] : true;
?>

<div class="result-final <?= $attributes["variant"] ?> result-final-<?= $randomComponentId ?>">
    <style>
    .result-final-<?=$randomComponentId ?> {
        background-color: <?=$attributes["bgColor"] ?>;
        margin-bottom: <?=$attributes["marginM"] ?>px
    }

    @media (min-width: 768px) {
        .result-final-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px
        }
    }
    </style>
    <?php if ($hasImage): ?>
    <picture class="text-with-image-background">
        <source srcset="<?=$attributes["bgImageDesk"]["src"]?> " media="(min-width: 768px)" />
        <img src="<?=$attributes["bgImageMobile"]["src"]?>" alt="<?=$attributes["bgImageMobile"]["alt"]?>" />
    </picture>
    <?php endif;?>
    <div class="container">
        <div class="content"> <?= $content ?></div>
    </div>

</div>