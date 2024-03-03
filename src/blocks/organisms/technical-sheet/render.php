<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$imageMobile = $attributes["bgImageMobile"];
$imageDesk = $attributes["bgImageDesk"];
$classes = "technical-sheet {$attributes['variant']} {$attributes['hPosition']} technical-sheet-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
    .technical-sheet-<?=$randomComponentId ?> {
        background-color: <?=$attributes["bgColor"] ?>;
        margin-bottom: <?=$attributes["marginM"] ?>px;
    }

    @media (min-width: 768px) {
        .technical-sheet-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px;
        }
    }
    </style>
    <?php if ($attributes["hasImage"]) : ?>
    <picture class="text-with-image-background">
        <source srcset="<?= $imageDesk["src"] ?>" media="(min-width: 768px)" />
        <img src="<?= $imageMobile["src"]; ?>" alt="<?= $imageMobile["alt"]; ?>" />
    </picture>
    <?php endif; ?>
    <div class="container ">
        <div class="text-with-image-content">
            <p class="title"><?= $attributes['title'] ?></p>
            <h3 class="nameCar"><?= $attributes['nameCar'] ?></h3>

            <div class="content-technical">
                <div class="technical-info">
                    <svg width="289" height="146" viewBox="0 0 289 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M289 145.5C289 106.911 273.776 69.9025 246.677 42.616C219.578 15.3294 182.824 2.91339e-06 144.5 0C106.176 -2.91339e-06 69.4221 15.3294 42.3231 42.616C15.2241 69.9025 5.78673e-06 106.911 0 145.5H8.37502C8.37502 109.148 22.7167 74.284 48.2451 48.579C73.7735 22.8739 108.397 8.43298 144.5 8.43298C180.603 8.43299 215.227 22.8739 240.755 48.579C266.283 74.284 280.625 109.148 280.625 145.5H289Z"
                            fill="url(#paint0_linear_10578_7909)" />
                        <defs>
                            <linearGradient id="paint0_linear_10578_7909" x1="0" y1="145.5" x2="289" y2="145.5"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#002753" />
                                <stop offset="1" stop-color="#00A851" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <p class="technical-text"><?= $attributes['engine'] ?></p>
                    <p><?= $attributes['subtitleEngine']?></p>
                </div>
                <div class="technical-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="247" height="72" viewBox="0 0 247 72" fill="none">
                        <path
                            d="M3 69V65.0412C3 65.0412 99.4321 65.1641 149.872 50.5257C193.501 37.8637 239.997 5 239.997 5L242 7.63917C242 7.63917 193.501 41.8225 149.872 54.4845C99.4321 69.1229 3 69 3 69Z"
                            fill="url(#paint0_linear_10578_7914)" stroke="url(#paint1_linear_10578_7914)"
                            stroke-width="6" />
                        <defs>
                            <linearGradient id="paint0_linear_10578_7914" x1="3" y1="37" x2="242" y2="37"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#002753" />
                                <stop offset="1" stop-color="#00A851" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_10578_7914" x1="3" y1="37" x2="242" y2="37"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#002753" />
                                <stop offset="1" stop-color="#00A851" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <p class="technical-text"><?= $attributes['horses'] ?></p>
                    <p><?= $attributes['subtitleHorses']?></p>
                </div>
            </div>
            <?= $content ?>
        </div>
    </div>
</div>
