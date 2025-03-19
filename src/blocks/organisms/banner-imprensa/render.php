<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$hasSubtitle = $attributes['hasSubtitle'];
?>

<section class="banner-imprensa banner-imprensa-<?= $randomComponentId ?> ">
    <style>
        .banner-imprensa-<?= $randomComponentId ?> {
            background-image: url(<?= $attributes["imgMobile"]['src'] ?>);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }

        @media (min-width: 1024px) {
            .banner-imprensa-<?= $randomComponentId ?> {
                background-image: url(<?= $attributes["imgDesk"]['src'] ?>);
                background-repeat: no-repeat;
                background-size: cover;
            }
        }
    </style>

    <div class="container">
        <h1 class="banner-imprensa__title"><?= $attributes['title'] ?></h1>

        <?php if ($hasSubtitle) : ?>
            <p class="banner-imprensa__subtitle"><?= $attributes['subtitle'] ?></p>
        <?php endif; ?>
    </div>
</section>