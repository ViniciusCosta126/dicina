<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$image = $attributes["image"];
$imageDesk = $attributes["imageDesk"] ? $attributes["imageDesk"] : $attributes["image"];
?>

<section class="what-motivates-you <?= $attributes["variant"] ?> what-motivates-you-<?= $randomComponentId ?>">
    <style>
        .what-motivates-you-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px
        }

        @media (min-width: 768px) {
            .what-motivates-you-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px
            }
        }
    </style>

    <?php if ($image['src']) : ?>
        <picture class="what-motivates-you--image">
            <source srcset="<?= $imageDesk['src'] ?>" width="<?= $imageDesk['width'] ?>" height="<?= $imageDesk['height'] ?>" media="(min-width: 768px)" />
            <img src="<?= $image['src'] ?>" alt="<?= $image['alt'] ?>" width="<?= $image['width'] ?>" height="<?= $image['height'] ?>" />
        </picture>
    <?php endif; ?>

    <div class="container">
        <?= $content ?>
    </div>
</section>