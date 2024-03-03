<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$message = 'data-msg="' . $attributes["requiredMessage"] . '"';

$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";
$translate = $attributes['isTemplated'] && $language == 'en' ? true : false;

$titleMobile = !$translate ? $attributes['titleMobile']['normal'] : $attributes['titleMobileEn']['normal'];
$errorMessage = !$translate ? $attributes['errorMessage'] : $attributes['errorMessageEn'];
$successMessage = !$translate ? $attributes['successMessage'] : $attributes['successMessageEn'];

$classes = "newslletter-sennaticos {$attributes['variant']} newslletter-sennaticos-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .newslletter-sennaticos-<?= $randomComponentId ?> {
            background: <?= $attributes["bgColor"] ?>, url(<?= $attributes["bgImage"]["src"] ?>), no-repeat;
            background-size: cover;
            background-position: center center;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 1024px) {
            .newslletter-sennaticos-<?= $randomComponentId ?> {
                background-position: bottom center;
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="container">
        <h2 class="newslletter-sennaticos__title">
            <?= $titleMobile ?>
        </h2>

        <form <?= $message ?> id="newslletter-sennaticos-form" class="newslletter-sennaticos__form" action="<?= get_site_url() ?>/wp-admin/admin-ajax.php?action=insert_leads_sennaticos">
            <input name='lead_lg' class='lg__text' type='hidden' value='<?= $language; ?>' />
            <div class="input-container">
                <?= $content ?>
            </div>
            <p class='return_message error_message'><?= $errorMessage ?></p>
            <p class='return_message success_message'><?= $successMessage ?></p>
        </form>
    </div>
</div>