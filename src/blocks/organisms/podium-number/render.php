<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="podium-number <?= $attributes["variant"] ?> podium-number-<?= $randomComponentId ?>">
    <style>
        .podium-number-<?= $randomComponentId ?> {

            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .podium-number-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>
    <div class="container medium">
        <?= $content ?>
        <div class="img-wrapper">
            <img src="<?= $attributes["bgImg"]["src"] ?>" alt="<?= $attributes["bgImg"]["alt"] ?>" />
        </div>
    </div>
    <div class="podium container medium">
        <div class="podium_item">
            <img src="<?= $attributes["secondImg"]["src"] ?>" alt="<?= $attributes["secondImg"]["alt"] ?>" />
            <div class="content-item">
                <p class="number"><?= $attributes["valueRacing"] ?></p>
                <p><?= $attributes['secondContent'] ?></p>
            </div>
        </div>
        <div class="podium_item">
            <img src="<?= $attributes["firstImg"]["src"] ?>" alt="<?= $attributes["firstImg"]["alt"] ?>" />
            <div class="content-item">
                <p class="number"><?= $attributes["valueTime"] ?></p>
                <p><?= $attributes['firstContent'] ?></p>
            </div>
        </div>
        <div class="podium_item">
            <img src="<?= $attributes["thirdImg"]["src"] ?>" alt="<?= $attributes["thirdImg"]["alt"] ?>" />
            <div class="content-item">
                <p class="number"><?= $attributes["valuePole"] ?></p>
                <p><?= $attributes['thirdContent'] ?></p>
            </div>
        </div>
    </div>
    <span class="number-callback"><?= $attributes["valueRacing"] ?></span>
    <span class="number-callback"><?= $attributes["valueTime"] ?></span>
    <span class="number-callback"><?= $attributes["valuePole"] ?></span>
</div>