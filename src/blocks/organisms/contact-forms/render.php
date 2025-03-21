<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$message = 'data-msg="' . $attributes["requiredMessage"] . '"';
$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";

?>

<section class="contact-forms contact-forms-<?= $randomComponentId ?>">
    <style>
        .contact-forms-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            background-image: url(<?= $attributes["bgImage"]["src"] ?>);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            margin-bottom:
                <?= $attributes["marginM"] ?>
                px;
        }

        @media (min-width: 768px) {
            .contact-forms-<?= $randomComponentId ?> {
                margin-bottom:
                    <?= $attributes["marginD"] ?>
                    px;
            }
        }
    </style>

    <div class="container">
        <div class="contact-forms__content">
            <h2 class="contact-forms__title contact-formsr__title--desktop">
                <?= $attributes['textoPrincipal']['normal'] ?>
                <br>
                <span class="contact-forms__title--senna-sans"><?= $attributes['textoPrincipal']['sans-serif'] ?></span>
            </h2>

            <p class="contact-forms__description">
                <?= $attributes['subtitle'] ?>
            </p>
        </div>

        <form <?= $message ?> id="contact-forms-form" class="contact-forms__form"
            action="<?= get_site_url() ?>/wp-admin/admin-ajax.php?action=insert_leads_contact">
            <input name='lead_lg' class='lg__text' type='hidden' value='<?= qtranxf_getLanguage() ?>' />

            <?= $content ?>

            <p class='return_message error_message'><?= $attributes['errorMessage'] ?></p>
            <p class='return_message success_message'><?= $attributes['successMessage'] ?></p>
        </form>
    </div>
</section>