<?php
/**
 * Thumbnails
 */

/**
 * Default WordPress sizes
 */
update_option('thumbnail_size_w', 150);
update_option('thumbnail_size_h', 150);

update_option('medium_size_w', 295);
update_option('medium_size_h', 600);

update_option('large_size_w', 630);
update_option('large_size_h', 800);

/**
 * Custom sizes
 */
if (function_exists('add_image_size')) {
    add_image_size('post', 630, true);
}

add_action( 'after_setup_theme', 'theme_setup' );
function theme_setup() {
	//Blog
	add_image_size('mosaic_home', 478, 326, array( 'center', 'top' ));
	add_image_size('post', 650, 430, array( 'center', 'top' ));
}
