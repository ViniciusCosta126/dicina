<details>
  <summary>
	<h3 class="accordion__title"><?= $attributes['title'] ?></h3>
  </summary>

  <picture>
    <source media="(min-width:2000px)" srcset="<?= $attributes['img4k']['src'] ?>" alt="" />
    <source media="(min-width:1024px)" srcset="<?= $attributes['imgDesk']['src'] ?>" />
    <source media="(min-width:540px)" srcset="<?= $attributes['imgTablet']['src'] ?>" />
    <img src="<?= $attributes['imgMobile']['src'] ?>" alt="olhar" class="img" />
  </picture>

  <div class="content <?= $attributes['contentAlign'] ?>">
    <?= $content ?>
  </div>
</details>
