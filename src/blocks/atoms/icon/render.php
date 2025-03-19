<?php
$icon = $attributes["icon"];

$classes = "icon {$attributes['extraClass']}";
?>

<div class="<?= $classes; ?>">
    <img src="<?= $icon["src"]; ?>" alt="<?= $icon["alt"]; ?>" height="<?= $icon["height"]; ?>" width="<?= $icon["width"]; ?>">
</div>