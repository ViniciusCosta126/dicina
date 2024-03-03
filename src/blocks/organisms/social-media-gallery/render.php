<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="social-media-gallery social-media-gallery-container <?= $attributes["variant"] ?> social-media-gallery-<?= $randomComponentId ?>">
    <style>
        .social-media-gallery-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .social-media-gallery-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="container">
        <div class="social-media-gallery-content">
            <?= $content ?>
        </div>
    </div>
</section>