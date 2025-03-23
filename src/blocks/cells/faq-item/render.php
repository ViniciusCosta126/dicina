<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "faq-item {$attributes['variant']} faq-item-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .faq-item-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            margin-bottom:
                <?= $attributes["marginM"] ?>
                px;
        }

        @media (min-width: 768px) {
            .faq-item-<?= $randomComponentId ?> {
                margin-bottom:
                    <?= $attributes["marginD"] ?>
                    px;
            }
        }
    </style>

    <?= $content ?>
    <span class='icon-button'></span>
</div>