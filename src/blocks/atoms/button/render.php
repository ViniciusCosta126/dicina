<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$language = "pt";

$hasCustomColor = $attributes["addCustomColor"] ? "overwrite-colors" : "";
$isSecondary = $attributes["variant"]  === 'secondary' ? true : false;
$hasThiniArrow = $attributes["variant"]  === 'link-arrow' ? true : false;
$hasDoubleArrow = $attributes["variant"]  === 'link-double-arrow' ? true : false;

$renderColor = $attributes["color"] ? $attributes["color"] : "#ffffff";
$renderBgColor = $attributes["bgColor"] ? $attributes["bgColor"] : "#0d3842";
$renderColorHover = $attributes["colorHover"] ? $attributes["colorHover"] : "#ffffff";
$renderBgColorHover = $attributes["bgColorHover"] ? $attributes["bgColorHover"] : "#4dbac1";

$tag = $attributes["hasLink"] ? "a" : "button";
$href = $attributes["link"]["url"] ? "href='" . $attributes["link"]["url"] . "'" : "";
$target = $attributes["link"]["target"] ? "target='_blank'" : "";
$icon = $attributes["icon"]["src"] ? $attributes["icon"]["src"] : "";

$iconAlt = isset($attributes["icon"]["alt"]) ? "alt='{$attributes["icon"]["alt"]}'" : "";
$iconHeight = isset($attributes["icon"]["height"]) ? "height='{$attributes["icon"]["height"]}'" : "";
$iconWidth = isset($attributes["icon"]["width"]) ? "width='{$attributes["icon"]["width"]}'" : "";

$modalID = $attributes["modalID"];
$id = $attributes["action"] === "open-modal" ? "data-id='{$modalID}'" : "";

$tooltipClass = $attributes["hasTooltip"] ? "hasTooltip" : "";
$classes = "{$attributes["variant"]} {$attributes["extraClass"]} {$attributes["action"]} button-{$randomComponentId} {$hasCustomColor} {$tooltipClass}";
?>

<<?= $tag ?> <?= $href ?> <?= $target ?> <?= $id ?> class="button <?= $classes ?> ">
    <?php if ($attributes["addCustomColor"]) : ?>
    <style>
    .button-<?=$randomComponentId ?>.overwrite-colors {
        border: <?=$isSecondary ? '1px solid '. $renderColor . '': "none"?> !important;
        color: <?=$renderColor ?> !important;
        background-color: <?=$renderBgColor ?>;
    }

    .button-<?=$randomComponentId ?>.overwrite-colors:hover {
        border: <?=$isSecondary ? '1px solid '. $renderColorHover: "none";
        ?> !important;
        color: <?=$renderColorHover ?> !important;
        background-color: <?=$renderBgColorHover ?> !important;
    }
    </style>
    <?php endif; ?>

    <style>
    .button-<?=$randomComponentId ?> {
        margin-bottom: <?=$attributes["marginM"] ?>px;
    }

    @media (min-width: 768px) {
        .button-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px;
        }
    }
    </style>

    <?php if ($attributes["hasIcon"]) : ?>
    <?php if ($icon !== "") : ?>
    <img loading="lazy" src="<?= $icon ?>" <?= $iconAlt, $iconWidth, $iconHeight ?> class="logo" />
    <?php endif; ?>
    <?php else : ?>
    <p class="text">
        <?= $attributes['contentEN'] ? ($language == 'pt' ?  $attributes['content'] :  $attributes['contentEN']) :  $attributes['content']; ?>
    </p>

    <?php if ($hasThiniArrow) : ?>
    <svg width="22" height="22" fill="none">
        <path fill="#<?= $attributes['color'] ?>"
            d="M.217 12.219V9.782h16.71L9.442 2.297l1.74-1.74L21.627 11 11.183 21.444l-1.74-1.74 7.484-7.485H.217Z" />
    </svg>
    <?php endif; ?>

    <?php if ($hasDoubleArrow) : ?>
    <div class="arrows right"></div>
    <?php endif; ?>
    <?php endif; ?>

    <?php
    // check if has tooltip and added element in positive case
    if ($attributes["hasTooltip"]) : ?>
    <span class="tooltiptext"><?= $attributes['tooltip'] ?></span>
    <?php endif; ?>
</<?= $tag ?>>