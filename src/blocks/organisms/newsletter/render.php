<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$message = 'data-msg="' . $attributes["requiredMessage"] . '"';

$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";
$translate = $attributes['isTemplated'] && $language == 'en' ? true : false;

$titleMobile = !$translate ? $attributes['titleMobile']['normal'] : $attributes['titleMobileEn']['normal'];
$titleMobileSnans = !$translate ? $attributes['titleMobile']['sennaSans'] : $attributes['titleMobileEn']['sennaSans'];
$titleDesktop = !$translate ? $attributes['titleDesktop']['normal'] : $attributes['titleDesktopEn']['normal'];
$titleDesktopSnans = !$translate ? $attributes['titleDesktop']['sennaSans'] : $attributes['titleDesktopEn']['sennaSans'];
$subtitle = !$translate ? $attributes['subtitle'] : $attributes['subtitleEn'];
$errorMessage = !$translate ? $attributes['errorMessage'] : $attributes['errorMessageEn'];
$successMessage = !$translate ? $attributes['successMessage'] : $attributes['successMessageEn'];
?>

<section id='newsletter' class="newsletter  newsletter-<?= $randomComponentId ?>">
    <style>
        .newsletter-<?= $randomComponentId ?> {
            background: linear-gradient(90deg, rgba(0, 168, 81, 0.7) 0%, rgba(24, 50, 215, 0.7) 100%), url(<?= $attributes["bgImage"]["src"] ?>), no-repeat;
            background-size: cover;
            background-position: center center;

            @media (min-width: 1024px) {
                background-position: bottom center;
            }
        }
    </style>

    <div class="container">
        <h2 class="newsletter__title newsletter__title--mobile">
            <?= $titleMobile ?>
            <span class="newsletter__title--senna-sans"><?= $titleMobileSnans ?></span>
        </h2>

        <h2 class="newsletter__title newsletter__title--desktop">
            <?= $titleDesktop ?>
            <span class="newsletter__title--senna-sans"><?= $titleDesktopSnans ?></span>
        </h2>

        <p class="newsletter__subtitle ">
            <?= $subtitle ?>
        </p>

        <form <?= $message ?> id="newsletter-form" class="newsletter__form" action="<?= get_site_url() ?>/wp-admin/admin-ajax.php?action=insert_lead">
            <input name='lead_lg' class='lg__text' type='hidden' value='<?= $language; ?>' />

            <?= $content ?>

            <p class='return_message error_message'><?= $errorMessage ?></p>
            <p class='return_message success_message'><?= $successMessage ?></p>
        </form>
    </div>
</section>