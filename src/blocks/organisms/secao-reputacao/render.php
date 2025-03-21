<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "secao-reputacao {$attributes['variant']} secao-reputacao-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .secao-reputacao-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            margin-bottom:
                <?= $attributes["marginM"] ?>
                px;
        }

        @media (min-width: 768px) {
            .secao-reputacao-<?= $randomComponentId ?> {
                margin-bottom:
                    <?= $attributes["marginD"] ?>
                    px;
            }
        }
    </style>

    <?= $content ?>
</div>