<?php
$randomComponentId = random_int(1, 10000);
?>

<section class="brand-carousel <?= $attributes['variant'] ?> brand-carousel-<?= $randomComponentId ?>">
     <?= $content ?>
</section>