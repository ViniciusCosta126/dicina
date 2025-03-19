<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "data-selector {$attributes['variant']} data-selector-{$randomComponentId}";
?>

<form class="<?= $classes; ?>">
    <?= $content ?>
</form>