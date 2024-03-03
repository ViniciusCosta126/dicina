<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

if ((wp_is_mobile() && $attributes["mobileVisible"]) || (!wp_is_mobile() && $attributes["desktopVisible"])) :
?>
    <div class="big_numbers_card <?= $attributes["variant"] ?> big_numbers_card-<?= $randomComponentId ?>">
        <?php if ($attributes["bgImageMobile"]) : ?>
            <picture class='back_img'>
                <source media="(max-width: 1024px)" srcset="<?= $attributes["bgImageMobile"]["src"] ?>">
                <source media="(min-width: 1023px)" srcset="<?= $attributes["bgImage"]["src"] ?>">
                <img src="<?= $attributes["bgImageMobile"]["src"] ?>">
            </picture>
        <?php endif ?>

        <p class='mobile_text'> <?= $attributes["textMobile"] ?> </p>

        <p class='social__number'><?= ($attributes["firtsText"]) ?>
            <span class="m_letter"><?= ($attributes["firtsTextMini"]) ?></span>
        </p>

        <p class="social__text">
            <span class='social__text__content'> <?= $attributes["secundText"] ?>
                <?= $content ?>
            </span>
        </p>
    </div>
<?php endif; ?>