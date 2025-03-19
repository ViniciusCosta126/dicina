<?php $products = [1, 2, 3, 4, 5, 6]; ?>

<section class="products">
    <div class="mobile">
        <h2 class="products__title"><?= $attributes['productsTitle'] ?></h2>
        <p class="products__subtitle"><?= $attributes['productsSubtitle'] ?></p>

        <div class="carousel-container">
            <div class="products__carousel">
                <?= $content ?>
            </div>
        </div>

        <div class="products__dots">
            <?php foreach ($products as $product) : ?>
                <div class="products__dots__dot"></div>
            <?php endforeach; ?>
        </div>
    </div>

    <div class="desktop">
        <div class="container large large-full">
            <div class="text-wrapper">
                <div class="text-wrapper-content">
                    <h2 class="title"><?= $attributes['title'] ?></h2>

                    <div class="white-bar"></div>

                    <div class="subtitle-wrapper">
                        <span class="subtitle"><?= $attributes['subtitle'] ?></span>
                        <span class="subtitle__second"><?= $attributes['subtitle__second'] ?></span>
                    </div>
                </div>
            </div>

            <div class="carousel-container">
                <div class="wrapper-row">
                    <?= $content ?>
                </div>
                <div class="wrapper-row second hide"></div>
            </div>
        </div>
    </div>
</section>