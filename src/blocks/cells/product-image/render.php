<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="product-image <?= $attributes["variant"] ?> product-image-<?= $randomComponentId ?>" data-imageMobile="<?= $attributes["largeImage"]["src"] ?>" data-imageDesk="<?= $attributes["largeImageDesk"]["src"] ?>">
    <div class="product-image-content">
        <img src="<?= $attributes["smallImage"]["src"] ?>" alt="<?= $attributes["smallImage"]["alt"] ?>" />
    </div>
</div>
