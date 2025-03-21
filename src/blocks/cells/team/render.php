<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="team <?= $attributes["variant"] ?> team-<?= $randomComponentId ?>">
    <style>
        .team-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            padding:
                <?= $attributes["marginM"] ?>
                px 0;
        }

        @media (min-width: 768px) {
            .team-<?= $randomComponentId ?> {
                padding:
                    <?= $attributes["marginD"] ?>
                    px 0;
            }
        }
    </style>
    <div class="team__container container">
        <div class='team__left'>
            <p class="team__subtitle"><?= $attributes['subtitle'] ?></p>
            <p class="team__title sans-serif stroke"><?= $attributes['title'] ?></p>
        </div>
        <!-- <hr> -->
        <div class='hr'></div>
        <div class='team__right'>

            <p class="team__content"> <?= $attributes['content'] ?></p>
            <?= $content ?>
        </div>
    </div>
</section>