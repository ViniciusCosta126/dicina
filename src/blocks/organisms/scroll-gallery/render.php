<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$bgImageMobile1 = $attributes["bgImageMobile1"];
$bgImage1 = $attributes["bgImage1"];
$bgImageMobile2 = $attributes["bgImageMobile2"];
$bgImage2 = $attributes["bgImage2"];
$bgImageMobile3 = $attributes["bgImageMobile3"];
$bgImage3 = $attributes["bgImage3"];
$bgImageMobile4 = $attributes["bgImageMobile4"];
$bgImage4 = $attributes["bgImage4"];
$bgImageMobile5 = $attributes["bgImageMobile5"];
$bgImage5 = $attributes["bgImage5"];
$bgImageMobile6 = $attributes["bgImageMobile6"];
$bgImage6 = $attributes["bgImage6"];
?>

<div class="scroll-gallery  <?= $attributes["variant"] ?> scroll-gallery-<?= $randomComponentId ?>">
    <style>
        .scroll-gallery-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .scroll-gallery-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="scroll-gallery__container container">
            <?= $content ?>
    </div>
    <div class="scroll-gallery__images container">
        <?php if ($bgImage1['src']) : ?>
            <div class= "scroll-gallery__image scroll-gallery__image1">
                <picture class="">
                    <source srcset="<?= $bgImage1['src'] ? $bgImage1['src'] : $bgImageMobile1['src'] ?>" media=" (min-width: 768px)" />
                    <img src="<?= $bgImageMobile1['src'] ?>" alt="<?= $bgImageMobile1['alt'] ?>" />
                </picture>
            </div>
        <?php endif; ?>
        <?php if ($bgImage2['src']) : ?>
            <div class= "scroll-gallery__image scroll-gallery__image2">
                <picture class="">
                    <source srcset="<?= $bgImage2['src'] ? $bgImage2['src'] : $bgImageMobile2['src'] ?>" media=" (min-width: 768px)" />
                    <img src="<?= $bgImageMobile2['src'] ?>" alt="<?= $bgImageMobile2['alt'] ?>" />
                </picture>
            </div>
        <?php endif; ?>
        <?php if ($bgImage3['src']) : ?>
            <div class= "scroll-gallery__image scroll-gallery__image3">
                <picture class="">
                    <source srcset="<?= $bgImage3['src'] ? $bgImage3['src'] : $bgImageMobile3['src'] ?>" media=" (min-width: 768px)" />
                    <img src="<?= $bgImageMobile3['src'] ?>" alt="<?= $bgImageMobile3['alt'] ?>" />
                </picture>
            </div>
        <?php endif; ?>
        <?php if ($bgImage4['src']) : ?>
            <div class= "scroll-gallery__image scroll-gallery__image4">
                <picture class="">
                    <source srcset="<?= $bgImage4['src'] ? $bgImage4['src'] : $bgImageMobile4['src'] ?>" media=" (min-width: 768px)" />
                    <img src="<?= $bgImageMobile4['src'] ?>" alt="<?= $bgImageMobile4['alt'] ?>" />
                </picture>
            </div>
        <?php endif; ?>
        <?php if ($bgImage5['src']) : ?>
            <div class= "scroll-gallery__image scroll-gallery__image5">
                <picture class="">
                    <source srcset="<?= $bgImage5['src'] ? $bgImage5['src'] : $bgImageMobile5['src'] ?>" media=" (min-width: 768px)" />
                    <img src="<?= $bgImageMobile5['src'] ?>" alt="<?= $bgImageMobile5['alt'] ?>" />
                </picture>
            </div>
        <?php endif; ?>
        <?php if ($bgImage6['src']) : ?>
            <div class= "scroll-gallery__image scroll-gallery__image6">
                <picture class="">
                    <source srcset="<?= $bgImage6['src'] ? $bgImage6['src'] : $bgImageMobile6['src'] ?>" media=" (min-width: 768px)" />
                    <img src="<?= $bgImageMobile6['src'] ?>" alt="<?= $bgImageMobile6['alt'] ?>" />
                </picture>
            </div>
        <?php endif; ?>
    </div>
</div>