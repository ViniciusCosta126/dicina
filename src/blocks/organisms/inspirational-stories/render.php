<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="inspirational-stories <?= $attributes["variant"] ?> inspirational-stories-<?= $randomComponentId ?>">
    <style>
        .inspirational-stories-<?= $randomComponentId ?> {
            /* background-color: <?= $attributes["bgColor"] ?>; */
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .inspirational-stories-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>


    <?= $content ?>
</section>

<div class="modal-video" id="inspirational-stories">
    <button class="close-button js-close-video" title="Fechar video"></button>
    <div id="player"></div>
</div>