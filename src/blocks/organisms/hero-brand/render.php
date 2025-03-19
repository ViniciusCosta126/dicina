<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="hero-brand <?= $attributes["variant"] ?> hero-brand-<?= $randomComponentId ?>">
    <style>
        .hero-brand-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .hero-brand-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="hero-brand">
        <div class="hero-brand__content">
            <?= $content ?>
        </div>
    </div>
</div>