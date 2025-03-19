<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="fight fight-<?= $randomComponentId ?>">
    <style>
        .fight-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
        }
    </style>

        <h2 class='fight__title__container'>
            <p class='fight__upper__title'><?= $attributes["upperTitle"] ?></p>
            <p class='fight__title'><?= $attributes["title"] ?></p>
        </h2>

        <div class="link">
            <?= $content ?>
        </div>

        <picture class='back_img'>
            <source media="(max-width: 769px)" srcset="<?= $attributes["bgImageMobile"]["src"] ?>">
            <source media="(min-width: 768px)" srcset="<?= $attributes["bgImage"]["src"] ?>">
            <img src="<?= $attributes["bgImage"]["src"] ?>" >
        </picture>      

</section>