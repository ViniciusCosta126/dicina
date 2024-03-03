<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<section class="frase <?= $attributes["variant"] ?> frase-<?= $randomComponentId ?>">
    <style>
        .frase-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px
        }

        @media (min-width: 768px) {
            .frase-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px
            }
        }
    </style>

    <div class="container large-on-desk">
        <div class="frase__text">
            <p class="frase__text__opening">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 40 28" fill="none">
                    <path d="M0 0V28L15 14V0H0ZM25 0V28L40 14V0H25Z" fill="white" />
                </svg>
            </p>
            <p class="frase__text__textone"><?= $attributes['textContent'] ?></p>
            <p class="frase__text__closing">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 40 28" fill="none">
                    <path d="M40 28V-1.90735e-06L25 14V28H40ZM15 28V-1.90735e-06L0 14V28H15Z" fill="white" />
                </svg>
            </p>
        </div>

        <div class="frase__images">
            <div class="frase__images__mobileimage">
                <img loading="lazy" src="<?= $attributes['imgMob']['src'] ?>" alt="<?= $attributes['imgMob']['alt'] ?>" width="<?= $attributes['imgMob']['width'] ?>" height="<?= $attributes['imgMob']['height'] ?>" />
            </div>
            <div class="frase__images__deskimage frases__images__deskimageOne">
                <img loading="lazy" src="<?= $attributes['imgDeskOne']['src'] ?>" alt="<?= $attributes['imgDeskOne']['alt'] ?>" width="<?= $attributes['imgDeskOne']['width'] ?>" height="<?= $attributes['imgDeskOne']['height'] ?>" />
            </div>
            <div class="frase__images__deskimage frases__images__deskimageTwo">
                <img loading="lazy" src="<?= $attributes['imgDeskTwo']['src'] ?>" alt="<?= $attributes['imgDeskTwo']['alt'] ?>" width="<?= $attributes['imgDeskTwo']['width'] ?>" height="<?= $attributes['imgDeskTwo']['height'] ?>" />
            </div>
        </div>
    </div>
</section>