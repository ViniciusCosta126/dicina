<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "webserie-card {$attributes['variant']} webserie-card-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <style>
        .webserie-card-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .webserie-card-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <a href="<?= $attributes['linkEpisodio'] ?>">
        <div class="webserie-card__image">
            <img src="<?= $attributes['imgCard']['src'] ?>" alt="<?= $attributes['imgCard']['alt'] ?>">
        </div>

        <p class="episodio"><?= $attributes['episode'] ?></p>
        <p class="sinopse">Sinopse: <span><?= $attributes['sinopse'] ?></span></p>
        <p class="diretor">Direção: <span><?= $attributes['diretor'] ?></span></p>
    </a>
</div>