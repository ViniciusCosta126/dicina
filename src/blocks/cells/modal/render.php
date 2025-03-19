<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$id = $attributes['id'];
$videoID = $attributes['videoID'];
$isYoutubeVideo = $attributes['youtubeVideo'];
$forceLandsape = $attributes['forceLandsape'] ? "data-landsape='true'" : "data-landsape='false'";

$classes = "modal modal-container {$attributes['variant']} {$attributes['extraClass']} modal-{$randomComponentId}";
?>

<div class="<?= $classes; ?>" id="<?= $id; ?>">
    <style>
        .modal-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .modal-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="modal-content">
        <?php if ($attributes['variant'] === 'inner') : ?>
            <div class="container">
                <button class="modal-close-button" data-id="<?= $id; ?>" <?= $forceLandsape; ?>>
                    <svg fill="none" viewBox="0 0 24 24">
                        <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 12H4m0 0 6-6m-6 6 6 6" />
                    </svg>
                    voltar
                </button>
            </div>
        <?php else : ?>
            <button class="modal-close-button" data-id="<?= $id; ?>" <?= $forceLandsape; ?>></button>
        <?php endif; ?>


        <?php if ($isYoutubeVideo) : ?>
            <iframe width="1054" height="588" src="https://www.youtube-nocookie.com/embed/<?= $videoID ?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <?php else : ?>
            <?= $content ?>
        <?php endif; ?>
    </div>
</div>