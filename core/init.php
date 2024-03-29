<?php

/**
 * Init
 */

/**
 * Theme support
 */
add_theme_support('post-thumbnails');
add_theme_support('menus');
add_theme_support('post-thumbnails');

/**
 * Menus
 */
// register_nav_menu('main-menu', 'Menu Principal');
// register_nav_menu('footer-menu', 'Menu Blog');

/**
 * Path constants
 */
define('PATH_TEMPLATE', get_bloginfo('template_directory'));
define('PATH_IMAGES', get_bloginfo('template_directory') . '/assets/images');
define('PATH_URL', get_bloginfo('url'));

if (!defined('MKT_AJAX')) {
	define('MKT_AJAX', false);
}
