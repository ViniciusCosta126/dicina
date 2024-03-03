<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "podium-item {$attributes['variant']} podium-item-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .podium-item-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .podium-item-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <svg class="border-linear" viewBox="0 0 404 115" width="404" height="115" fill="none">
        <path d="M1.5 1.5H377.737L402.5 35.4885V113.5H1.5V1.5Z" fill="#002753" fill-opacity="0.2" stroke="url(#paint0_linear_9575_31181)" stroke-width="3" />
        <defs>
            <linearGradient id="paint0_linear_9575_31181" x1="3.76254e-07" y1="57.4999" x2="404" y2="57.4999" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00A851" />
                <stop offset="1" stop-color="#1832D7" />
            </linearGradient>
        </defs>
    </svg>

    <?= $content ?>
</div>