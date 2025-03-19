<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "trabalhe-conosco-secao {$attributes['variant']} trabalhe-conosco-secao-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .trabalhe-conosco-secao-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .trabalhe-conosco-secao-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <?= $content ?>
</div>