<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$id = $attributes["id"] !== "" ? "data-id='{$id}'" : "";
$classes = "wrapper {$attributes["extraClass"]} wrapper-{$randomComponentId}";
?>

<div class="<?= $classes; ?>" <?= $id; ?>>
    <?= $content ?>
</div>