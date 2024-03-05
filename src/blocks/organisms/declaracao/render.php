<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "declaracao {$attributes['variant']} declaracao-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .declaracao-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            margin-bottom:
                <?= $attributes["marginM"] ?>
                px;
        }

        @media (min-width: 768px) {
            .declaracao-<?= $randomComponentId ?> {
                margin-bottom:
                    <?= $attributes["marginD"] ?>
                    px;
            }
        }
    </style>
    <div class="container">
        <?= $content ?>
    </div>
</div>