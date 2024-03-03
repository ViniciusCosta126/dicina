<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$hasLogo = $attributes['hasLogo'];
?>

<div class="brand-item <?= $attributes["variant"] ?> <?= $attributes["contentAlign"] ?> brand-item-<?= $randomComponentId ?>">
      <img loading="eager" src="<?= $attributes["cardimg"]["src"] ?>" class="back_img"></img>

      <div class='brand__item__content <?= $attributes["variant"] ?>'>
            <?php if ($hasLogo) : ?>
                  <img loading="eager" src="<?= $attributes["logo"]["src"] ?>" alt="<?= $attributes["logo"]["alt"] ?>" class="logo"></img>
            <?php else : ?>
                  <p class='brand__content__title'><?= $attributes["titleBrand"] ?></p>
            <?php endif; ?>

            <p class='brand__content__paragraph'><?= $attributes["content"] ?></p>

            <div class="link">
                  <?= $content ?>
            </div>
      </div>
</div>