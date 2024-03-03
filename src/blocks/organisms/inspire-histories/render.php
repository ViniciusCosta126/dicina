<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="inspire-histories inspire-histories-<?= $randomComponentId ?>">
    <style>
        .inspire-histories-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
        }
    </style>

    <div class="container default">
        <?= $content ?>
    </div>
</section>