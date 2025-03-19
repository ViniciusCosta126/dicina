<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$bgImageMobile = $attributes["bgImageMobile"];
$bgImage = $attributes["bgImage"];
$video = $attributes['videoBg'];
$isAnimated = $attributes["isAnimated"] ? 'have-animation' : '';
?>

<div class="slide-item <?= $attributes["variant"] ?> <?= $isAnimated ?> slide-item-<?= $randomComponentId ?>">
    <style>
        .slide-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        .slide-item-<?= $randomComponentId ?>.slide-item--picture-overlay {
            background: <?= $attributes["bgOverlay"] ?>;
        }

        @media (min-width: 768px) {
            .slide-item-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?php if ($attributes['isVideo']) : ?>
        <video class="slide-item--video" preload="none" poster="<?= $video['poster'] ?>" title="<?= $video['alt'] ?>" muted="muted">
            <source src="<?= $video['src'] ?>" type="<?= $video['type'] ?>" />
        </video>
    <?php else : ?>
        <?php if ($bgImage['src']) : ?>
            <picture class="slide-item--image">
                <source srcset="<?= $bgImage['src'] ? $bgImage['src'] : $bgImageMobile['src'] ?>" media=" (min-width: 768px)" />
                <img src="<?= $bgImageMobile['src'] ?>" alt="<?= $bgImageMobile['alt'] ?>" />
            </picture>

            <?php if ($attributes['hasOverlay']) : ?>
                <div class="slide-item--picture-overlay"></div>
            <?php endif; ?>
        <?php endif; ?>
    <?php endif; ?>

    <div class="container">
        <?php if ($attributes["hasText"]) : ?>
            <div class="slide-item--text-box">
                <?= $content ?>
            </div>
        <?php endif; ?>
    </div>
</div>