<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$checkMobile = wp_is_mobile() ? 'is-mobile' : 'is-desktop';
?>

<div class="about-partner <?= $attributes["variant"] ?> about-partner-<?= $randomComponentId ?> <?= $checkMobile ?>">
    <style>
        .about-partner-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .about-partner-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>