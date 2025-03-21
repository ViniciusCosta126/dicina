<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "card-reputacao {$attributes['variant']} card-reputacao-{$randomComponentId}";
?>


<div class="<?= $classes; ?>">
    <style>
        .card-reputacao-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            margin-bottom:
                <?= $attributes["marginM"] ?>
                px;
        }

        @media (min-width: 768px) {
            .card-reputacao-<?= $randomComponentId ?> {
                margin-bottom:
                    <?= $attributes["marginD"] ?>
                    px;
            }
        }
    </style>
    <img loading="eager" src="<?= $attributes["icone"]["src"] ?>" alt="<?= $attributes["icone"]["alt"] ?>"
        class="icone-card"></img>
    <?= $content ?>
</div>