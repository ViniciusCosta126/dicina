<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$image = $attributes["imagePartner"];
?>

<div class="partner-item <?= $attributes["variant"] ?> partner-item-<?= $randomComponentId ?>">
    <style>
        .partner-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .partner-item-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?php if ($attributes["variant"] === "image") : ?>
        <img src="<?= $image["src"] ?>" alt="<?= $image["alt"] ?>" width="<?= $image["width"] ?>" height="<?= $image["height"] ?>">
    <?php endif; ?>

    <?php if ($attributes["variant"] === "about" || $attributes["variant"] === "testimony") : ?>
        <?= $content ?>
    <?php endif; ?>
</div>