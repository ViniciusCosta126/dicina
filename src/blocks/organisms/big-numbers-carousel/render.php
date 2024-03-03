<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$loop = $attributes["loop"] ? "data-loop='true'" : "data-loop='false'";
$speed = $attributes["speed"] ? "data-speed='{$attributes["speed"]}'" : '';
$autoplayTimeout = $attributes["autoplayTimeout"] ? "data-autoplayTimeout='{$attributes["autoplayTimeout"]}'" : '';

$sliderProps = "{$loop} {$speed} {$autoplayTimeout}" ;
$mobile = wp_is_mobile() ? 'big-mobile' : '';
?>

<section  <?= $sliderProps ?> class="big-numbers-carousel <?= $mobile ?> big-numbers-carousel-<?= $randomComponentId ?>">
    <div class="carousel-content-social">
        <?= $content ?>
    </div>
</section>