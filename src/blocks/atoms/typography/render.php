<?php
$randomComponentId = random_int(1, 100000);

$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";

$fontFamily = $attributes["fontFamily"];
$sizeType = $attributes["sizeType"];
$fontSize = !$attributes['manualSizes'] ? ($attributes["size"] ? $attributes["size"] . "-m " . $attributes["size"] . "-d"  : $attributes["sizeM"] . " " . $attributes["sizeD"]) : '';
$textAlign = $attributes["textAlign"];
$textTransform = $attributes["textTransform"];
$fontWeight = $attributes["textWeight"];
$extraClass = $attributes["extraClass"];
$maxWidth = $attributes['hasMaxWidth'] ? $attributes['position'] : '';
$fixedStyle = !$attributes['manualSizes'] ? 'fixedStyle' : '';

$text = $language === "pt" ? $attributes['content'] : ($attributes['contentEn'] !== "" ? $attributes['contentEn'] : $attributes['content']);
?>

<?php if ($text !== '') : ?>
    <<?= $attributes['tag'] ?> class="typography typography-<?= $randomComponentId ?> <?= $fontFamily ?> <?= $fontSize ?> <?= $fontWeight ?> <?= $textTransform; ?> <?= $textAlign ?> <?= $extraClass ?> <?= $maxWidth ?> <?= $fixedStyle ?>">
        <style>
            .typography-<?= $randomComponentId ?> {
                font-size: <?= $attributes['manualSizes'] ? $attributes['manualSizeM'] . $sizeType . " !important" : 'unset'; ?>;
                margin-bottom: <?= $attributes['marginM'] ?>px;
                max-width: <?= $attributes['hasMaxWidth'] ? $attributes['maxWidthM'] . 'px' : 'none' ?>;
                text-indent: <?= $attributes['textIndent'] . 'px' ?>;
            }

            .typography-<?= $randomComponentId ?>:not(.stroke) {
                <?php if (str_contains($attributes['color'], 'gradient')) {
                    echo "
                background: -webkit-" . $attributes['color'] . ";
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                ";
                } else {
                    echo "
                    color: " . $attributes['color'] . ";
                    background: " . $attributes['bgColor'] . ";
                ";
                } ?>
            }

            @media (min-width: 768px) {
                .typography-<?= $randomComponentId ?> {
                    margin-bottom: <?= $attributes['marginD'] ?>px;
                    max-width: <?= $attributes['hasMaxWidth'] ? $attributes['maxWidthD'] . 'px' : 'none' ?>;
                    font-size: <?= $attributes['manualSizes'] ? $attributes['manualSizeD'] . $sizeType  . " !important" : 'unset'; ?>;
                }

            }
        </style>

        <?= $text; ?>
    </<?= $attributes['tag'] ?>>
<?php endif; ?>

<?php if ($content !== '') : ?>
    <div class="typography-content typography-content-<?= $randomComponentId ?>">
        <style>
            .typography-content-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes['marginM'] ?>px;
            }

            @media (min-width: 768px) {
                .typography-<?= $randomComponentId ?> {
                    margin-bottom: <?= $attributes['marginD'] ?>px;
                }
            }
        </style>

        <?= $content; ?>
    </div>
<?php endif; ?>