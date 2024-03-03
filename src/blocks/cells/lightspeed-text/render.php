<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$gspStart = "data-gspStart='" . $attributes["gspStart"] . "'";

if (!wp_is_mobile() || (wp_is_mobile() && $attributes["mobileVisible"])) :
?>

    <div class="lightspeed-text <?= $attributes["variant"] ?> lightspeed-text-<?= $randomComponentId ?>">
        <style>
            .lightspeed-text-<?= $randomComponentId ?> {
                background-color: <?= $attributes["bgColor"] ?>;
                margin-bottom: <?= $attributes["marginM"] ?>px;
            }

            @media (min-width: 768px) {
                .lightspeed-text-<?= $randomComponentId ?> {
                    margin-bottom: <?= $attributes["marginD"] ?>px;
                }
            }
        </style>

        <div class="<?= $attributes["containerSize"] ?>">
            <div <?= $gspStart ?> class="lightspeed-text__container">
                <?= $content ?>
            </div>
        </div>
    </div>
<?php endif; ?>