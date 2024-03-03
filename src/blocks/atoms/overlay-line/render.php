<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="overlay-line <?= $attributes["variant"] ?> overlay-line-<?= $randomComponentId ?>">
  <style>
        .overlay-line-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px
        }

        @media (min-width: 768px) {
            .overlay-line-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px
            }
        }
    </style>

    <?= $content ?>
</div>