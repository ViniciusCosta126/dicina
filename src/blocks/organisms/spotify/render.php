<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "spotify {$attributes['variant']} spotify-{$randomComponentId}";
$spotifyLink = isset($attributes['link']) ? $attributes['link'] : null;
$link = $spotifyLink ? 'https://open.spotify.com/embed/playlist/' . $spotifyLink . '?utm_source=generator width="100%"' : null;
$height = wp_is_mobile() ? 352 : 152;

?>

<div class="<?= $classes; ?>">
    <style>
        .spotify-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .spotify-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>
    <div class="container">
        <?= $content ?>

        <?php if ($link) : ?>
            <iframe style="border-radius:12px" src=<?= $link ?> height="<?= $height ?>" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <?php endif; ?>
    </div>
</div>