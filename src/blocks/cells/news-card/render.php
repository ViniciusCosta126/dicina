<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="news-card <?= $attributes['variant'] ?> news-card-<?= $randomComponentId ?>">
    <style>
    .news-card-<?=$randomComponentId ?> {
        background-color: <?=$attributes["bgColor"] ?>;
    }
    </style>

    <?php if($attributes["cardimg"]):?>
    <img loading="eager" src="<?= $attributes["cardimg"]['src'] ?>" alt="<?= $attributes["cardimg"]['alt'] ?>"
        class="news_card_img">
    </img>
    <?php endif;?>
    <div class='news__content__texts'>
        <h3 class='news__content__paragraph'><?= $attributes["title"] ?></h3>
        <?= $content ?>
    </div>
</div>