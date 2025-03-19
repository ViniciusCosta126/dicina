<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="product-gallery <?= $attributes["variant"] ?> product-gallery-<?= $randomComponentId ?>">
    <style>
        .product-gallery-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .product-gallery-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="container default">
        <div class="product-gallery-full-image" style="
                background-image: url('https://placehold.co/1920x1080/121212/666666?text=Imagem+do+produto');
                background-position: <?= $attributes['bgPosition'] ?> center;
                background-size: cover;
                background-repeat: no-repeat;
            ">
        </div>

        <?= $content ?>
    </div>
</div>