<section class="animated-senna">
    <div class="content-wrapper">
        <svg class="senna-svg" width="1920" height="5000" viewBox="0 0 1920 5000" version="1.2">
            <path fill="#002753" fill-rule="evenodd" d="m0-93 1919.6-.3v5210.1L.4 5122.5zm112.7 2441c-16.6 0-32 4.1-46 12.3-13.7 8.1-24.7 19.1-32.8 32.9h-.1c-8.1 13.8-12.1 29.2-12.1 45.8 0 16.5 4 31.9 12.1 45.7h.1v.1c8.1 13.6 19.1 24.6 32.7 32.7l.1.1h.1c13.9 8.1 29.3 12.1 45.9 12.1h140.2c6.8 0 12.2 2.3 17 7.1l.1.2c4.8 4.7 7.1 10.1 7.1 16.9 0 6.8-2.3 12.3-7.2 17.2-4.7 4.7-10.1 7-17 7H24.3v74.9h230.6c18.1 0 34.7-4.4 49.8-13.4 15-8.9 26.9-20.9 35.7-35.7 9-15.1 13.4-31.8 13.4-50 0-18-4.4-34.7-13.3-49.7s-20.8-27-35.8-35.9c-15.1-8.9-31.7-13.3-49.8-13.3H114.5c-4.5 0-8-1.4-11.4-4.6-3.2-3.3-4.7-6.9-4.7-11.4 0-4.6 1.5-8.1 4.7-11.2v-.1h.1c3.3-3.3 6.9-4.8 11.3-4.8h236V2348zm285.9 230c0 20.5 7.3 38.4 21.8 53l.1.1c14.7 14.5 32.5 21.9 53 21.9h254v-74.9H486.2c-3.2 0-5.6-1-7.8-3.1-2.2-2.2-3.1-4.6-3.1-7.7v-37.6h252.2V2455H475.3v-32.1h252.2V2348H398.6zm456.7-114.6 176.9 186.2 3.2 3.3h72v-305h-76.7v189.5L854 2351.2l-3.2-3.3h-72.2v305h76.7zm370.2 0 176.9 186.2 3.1 3.3h72v-305h-76.7v189.5l-176.7-186.2-3.1-3.3h-72.2v305h76.7zm370.2 0 176.8 186.2 3.2 3.3h105l-17.1-18-269.3-283.7-3.1-3.3h-72.3v305h76.8z" />
        </svg>

        <div class="wrapper-img">
            <picture>
                <source media="(min-width:2000px)" srcset="<?= $attributes[
                	'img4k'
                ]['src'] ?>">
                <source media="(min-width:1024px)" srcset="<?= $attributes[
                	'imgDesk'
                ]['src'] ?>">
                <source media="(min-width:540px)" srcset="<?= $attributes[
                	'imgTablet'
                ]['src'] ?>">
                <img src="<?= $attributes['imgMobile'][
                	'src'
                ] ?>" alt="olhar-senna" class="img">
            </picture>
        </div>
        <div class="text-wrapper ">
            <div class="container large-on-mobile">
                <div class="title-wrapper">
                    <strong><?= $attributes['title1'] ?></strong>
                    <strong class="left"><?= $attributes['title2'] ?></strong>
                </div>
                <div class="from">
                    <?= $content ?>
                </div>

            </div>
        </div>
    </div>
</section>