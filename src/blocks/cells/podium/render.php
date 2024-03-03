<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "podium {$attributes['variant']} podium-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <?= $content ?>
</div>