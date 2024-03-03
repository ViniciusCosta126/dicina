<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "call-to-products {$attributes['variant']} call-to-products-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .call-to-products-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .call-to-products-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>
    <button class="container-title">
        <img src="<?= $attributes['iconImg']['src'] ?>" alt="<?= $attributes['iconImg']['alt'] ?>">
        <h2 class="text"><?= $attributes["title"] ?></h2>
        <svg class="btn-svg" width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="material-symbols:arrow-back-ios-new">
                <path id="Vector" d="M3.92641 13.5101L3.74963 13.3333L3.92641 13.1566L6.88474 10.1982L7.06152 10.0214L7.2383 10.1982L20.7699 23.7298L34.3014 10.1982L34.4782 10.0214L34.655 10.1982L37.6133 13.1566L37.7901 13.3333L37.6133 13.5101L20.9466 30.1768L20.7699 30.3536L20.5931 30.1768L3.92641 13.5101Z" fill="white" stroke="white" stroke-width="0.5" />
            </g>
        </svg>
    </button>
    <?= $content ?>

</div>