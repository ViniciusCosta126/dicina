<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="hero <?= $attributes["variant"] ?> hero-<?= $randomComponentId ?>">
    <style>
        .hero-<?= $randomComponentId ?> {
            margin-bottom: <?= $attributes["marginM"] ?>px
        }

        @media (min-width: 768px) {
            .hero-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px
            }
        }
    </style>

    <?= $content ?>

    <?php if (!wp_is_mobile()) : ?>
        <button class="arrow-down" id="go-to-sectio-2"></button>
    <?php endif; ?>
</section>