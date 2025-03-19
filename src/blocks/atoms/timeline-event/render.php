<?php if ($attributes['contentUp']) : ?>
    <div class="node-down-top">
        <div class="info">
            <p class="event-title"><?= $attributes['title'] ?></p>
            <p class="event-text"><?= $attributes['text'] ?></p>
            <p class="event-year"><?= $attributes['year'] ?></p>
        </div>
        <img src="<?=$attributes['img']['src'] ? $attributes['img']['src'] : get_theme_file_uri() . "/images/timeline-default1.png" ?>" alt="" loading="lazy" width="184" height="111">


    </div>
<?php else : ?>
    <div class="node-top-down">
        <img src="<?= get_theme_file_uri() . "/images/timeline-default1.png" ?>" alt="" loading="lazy" width="184" height="111">
        <div class="info">
            <p class="event-title"><?= $attributes['title'] ?></p>
            <p class="event-text"><?= $attributes['text'] ?></p>
            <p class="event-year"><?= $attributes['year'] ?></p>
        </div>
    </div>
<?php endif ?>