<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "wallpaper-card {$attributes['variant']} wallpaper-card-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .wallpaper-card-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .wallpaper-card-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="wallpaper-card__content">
        <button class="download-button" title="Baixar Wallpapper">
            <svg width="40" height="40" fill="none">
                <g clip-path="url(#a)" filter="url(#b)">
                    <path fill="#fff" d="m20 26.668-8.334-8.333 2.333-2.417 4.334 4.333V6.668h3.333v13.583l4.333-4.333 2.334 2.417-8.334 8.333Zm-10 6.667a3.21 3.21 0 0 1-2.356-.98c-.653-.654-.98-1.438-.978-2.354v-5h3.333v5h20v-5h3.334v5c0 .917-.327 1.702-.98 2.355-.654.654-1.438.98-2.354.979H10Z" />
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" d="M0 0h40v40H0z" />
                    </clipPath>
                    <filter id="b" width="34.666" height="34.667" x="2.666" y="6.668" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_9658_10124" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_9658_10124" result="shape" />
                    </filter>
                </defs>
            </svg>
        </button>

        <img class="thumb open-modal" data-id="<?= $attributes['modalId'] ?>" src="<?= $attributes['thumbImg']['src'] ?>" alt="<?= $attributes['thumbImg']['alt'] ?>">
    </div>
</div>

<?php
$img = "<img class='wallpaper-img-modal' src='{$attributes['wallpaper']['src']}'/>";

echo do_blocks('<!-- wp:il/modal {"id":"' . $attributes["modalId"] . '"} -->' . sprintf($img) . '<!-- /wp:il/modal -->');
?>