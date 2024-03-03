<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$requiredHtml = $attributes["required"] ? "required" : "";
$name = str_replace(' ', '-', $attributes["name"]);

$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";
$translate = $attributes['isTemplated'] && $language == 'en' ? true : false;

$type = $attributes['type'] !== "" ? "data-type='{$attributes['type']}'" : "";
$hasLimit = count($attributes['limit']) > 0 ? true : false;

$placeholder = !$translate ? $attributes['placeholder'] : $attributes['placeholderEn'];
$ariaLabel = !$translate ? $attributes['ariaLabel'] : $attributes['ariaLabelEn'];
$errorMessage = !$translate ? $attributes['errorMessage'] : $attributes['errorMessageEn'];
$checkboxLabel = !$translate ? $attributes['checkboxLabel'] : $attributes['checkboxLabelEn'];
$buttonLabel = !$translate ? $attributes['buttonLabel'] : $attributes['buttonLabelEn'];
?>
<style>
.input-<?=$randomComponentId ?> {
    background-color: <?=$attributes["bgColor"] ?>;
    margin-bottom: <?=$attributes["marginM"] ?>px;
}

@media (min-width: 768px) {
    .input-<?=$randomComponentId ?> {
        margin-bottom: <?=$attributes["marginD"] ?>px;
    }
}
</style>
<?php if ($attributes["variant"] == 'text') : ?>
<label class='input__label <?= $name ?>_input_label input-<?= $randomComponentId  ?>' aria-label="<?= $ariaLabel ?>">
    <input class='input__text' placeholder="<?= $placeholder; ?>" type="text" aria-label="<?= $ariaLabel ?>"
        name="<?= $name ?>" error-msg="<?= $errorMessage ?>" pattern="<?= $attributes['regexValidate'] ?>"
        <?= $requiredHtml ?> />
    <span class="alert-msg"></span>
</label>
<?php elseif ($attributes["variant"] == 'email') : ?>
<label class='input__lanbel <?= $name ?>_input_label input-<?= $randomComponentId ?>' aria-label="<?= $ariaLabel ?>">
    <?php 
        $pattern = $attributes['regexValidate'] ? "pattern={$attributes['regexValidate']}" : "";
    ?>
    <input class='input__text' placeholder="<?= $placeholder; ?>" type="email" aria-label="<?= $ariaLabel ?>"
        name="<?= $name ?>" error-msg="<?= $errorMessage ?>" <?= $requiredHtml ?> <?= $pattern ?> />
    <span class="alert-msg"></span>
</label>
<?php elseif ($attributes["variant"] == 'checkbox') : ?>
<label class='input__label custom-checkbox <?= $name ?>_input_label input-<?= $randomComponentId  ?>'
    aria-label="<?= $ariaLabel ?>">
    <input class='checkbox' placeholder="<?= $placeholder; ?>" type="checkbox" aria-label="<?= $ariaLabel ?>"
        name="<?= $name ?>" error-msg="<?= $errorMessage ?>" pattern="<?= $attributes['regexValidate'] ?>"
        <?= $requiredHtml ?> />
    <p><?= $checkboxLabel ?></p>
    <span class="alert-msg"></span>
</label>
<?php elseif ($attributes["variant"] == 'textarea') : ?>
<label class='input__label wrapper__textarea <?= $name ?>_input_label input-<?= $randomComponentId  ?>'
    aria-label="<?= $ariaLabel ?>">
    <textarea class='input__text' rows='5' placeholder="<?= $placeholder; ?>" aria-label="<?= $ariaLabel ?>"
        name="<?= $name ?>" error-msg="<?= $errorMessage ?>" pattern="<?= $attributes['regexValidate'] ?>"
        <?= $requiredHtml ?>></textarea>
    <span class="textarea__info"><?= $checkboxLabel ?></span>
    <span class="alert-msg"></span>
</label>
<?php elseif ($attributes["variant"] == 'submit') : ?>
<input class="submit__form__button" value='<?= $buttonLabel ?>' type="submit" />
<?php elseif ($attributes["variant"] == 'submit-button') : ?>
<button class="submit__form__button" type="submit"><?= $buttonLabel ?></button>
<?php elseif ($attributes["variant"] == 'select') :
    $checkboxLabelArray = explode(',', $checkboxLabel);
?>
<div class="<?= $name ?>_input_label custom-select" aria-label="<?= $ariaLabel ?>" name="<?= $name ?>"
    error-msg="<?= $errorMessage ?>" data-option-selected="">
    <div class="custom-select__label" data-placeholder="<?= $placeholder; ?>">
        <?= $placeholder; ?>
    </div>

    <ul class="custom-select__options">
        <?php foreach ($checkboxLabelArray as $key => $valor) : ?>
        <li data-value="<?= $valor ?>" <?= $type ?>
            <?= $hasLimit ? "data-limit='{$attributes['limit'][$key]}'" : ""; ?>><?= $valor ?></li>
        <?php endforeach; ?>
    </ul>
    <span class="alert-msg"></span>
</div>
<?php endif; ?>