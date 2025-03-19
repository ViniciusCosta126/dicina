<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$hasEmbed = $attributes["hasEmbed"];
$embedContent = $attributes["embedContent"];
$bgFile = $attributes["bgFile"];
$posterImage = $attributes["posterImage"];

$indexId = $attributes["indexId"];

$classes = "social-media-item {$attributes["variant"]} social-media-item-{$randomComponentId}";
?>

<div class="<?= $classes; ?>" data-date="<?= $attributes["date"] ?>" data-id="<?= $attributes["id"] ?>" data-indexid="<?= $indexId; ?>">
    <style>
        .social-media-item-<?= $randomComponentId ?> {
            background: <?= $attributes["bgColor"] ?>;
        }
    </style>

    <?php if (!$hasEmbed) : ?>
        <?php if ($bgFile['type'] === 'image/jpeg' || $bgFile['type'] === 'image/png') : ?>
            <picture class="social-media-item--image <?= $attributes['hasContent'] ? 'has-content' : '' ?>">
                <img loading="lazy" src="<?= $bgFile['src'] ?>" alt="<?= $bgFile['alt'] ?>" />
            </picture>
        <?php elseif ($bgFile['type'] === 'video/mp4' || $bgFile['type'] === 'video/webm') : ?>
            <div class="social-media-item--video">
                <video preload="none" muted="muted" title="<?= $bgFile['alt'] ?>" loop poster="<?= $posterImage['src'] ?>">
                    <source src="<?= $bgFile['src'] ?>" type="<?= $bgFile['type'] ?>" />
                </video>
            </div>
        <?php endif; ?>

        <?php if ($attributes['hasContent']) : ?>
            <div class="social-media-item--content">
                <?= $content ?>
            </div>
        <?php endif; ?>
    <?php else : ?>
        <div class="social-media-item--embed">
            <?= $embedContent ?>
        </div>
    <?php endif; ?>
</div>