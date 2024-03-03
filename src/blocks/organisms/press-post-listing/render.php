<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="press-post-listing <?= $attributes["variant"] ?> press-post-listing-<?= $randomComponentId ?>">
    <style>
        .press-post-listing-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .press-post-listing-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>