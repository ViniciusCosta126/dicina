<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<nav class="tab-nav <?= $attributes["variant"] ?> tab-nav-<?= $randomComponentId ?>">
    <style>
        .tab-nav-<?= $randomComponentId ?> {
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .tab-nav-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="container">
        <?= $content ?>
    </div>
</nav>