<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$language =  qtrans_getLanguage();

$classes = "navigation-journey {$attributes['variant']} navigation-journey-{$randomComponentId}";
?>

<div class="<?= $classes; ?>">
    <div class="container medium">
        <?= $language == 'pt'
            ? wp_nav_menu(['theme_location' => "nav-navigation-journey"])
            : wp_nav_menu(['theme_location' => 'en-' . "nav-navigation-journey"]) ?>
    </div>
</div>