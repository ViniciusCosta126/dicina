<?php
require_once "JSXBlock.php";

/**
 * Register Raccoon.Monks blocks
 *
 * @return void
 */
function registerBlocks()
{
	$blocks_path = get_template_directory() . "/src/blocks/";
	// Scan block folders
	$atoms = scandir($blocks_path . "atoms");
	$cells = scandir($blocks_path . "cells");
	$organisms = scandir($blocks_path . "organisms");
	$templates = scandir($blocks_path . "templates");

	// Remove relativa paths
	$atoms = array_diff($atoms, [".", "..", ".DS_Store"]);
	$cells = array_diff($cells, [".", "..", ".DS_Store"]);
	$organisms = array_diff($organisms, [".", "..", ".DS_Store"]);
	$templates = array_diff($templates, [".", "..", ".DS_Store"]);

	// Create theme_blocks array
	$GLOBALS["theme_blocks"] = [];
	$GLOBALS["theme_blocks"]["atoms"] = $atoms;
	$GLOBALS["theme_blocks"]["cells"] = $cells;
	$GLOBALS["theme_blocks"]["organisms"] = $organisms;
	$GLOBALS["theme_blocks"]["templates"] = $templates;
}
registerBlocks();

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook.
 */
function setup()
{
	// Add support for block styles.
	add_theme_support('wp-block-styles');

	// Add support for WP editor
	add_theme_support("editor-styles");

	// Enqueue Main styles
	wp_enqueue_style(
		"global-css",
		get_theme_file_uri("/build/index/style-index.css")
	);

	$editor_styles = [];
	$editor_styles[] = "/build/index/style-index.css";
	foreach ($GLOBALS["theme_blocks"] as $category => $blocks) {
		foreach ($blocks as $block) {
			$GLOBALS["allowed_blocks"][] = "il/" . $block;

			new JSXBlock($category, $block);
			$editor_styles[] = "/build/blocks/$category/$block/style-index.css";
		}
	}

	// Enqueue editor styles
	add_editor_style(array_merge($editor_styles));

	// Add main js
	wp_enqueue_script("global-js", get_theme_file_uri("/build/index/view.js"));
}
add_action('init', 'setup');

// Styles to blocks in editor
function enqueue_block_editor_styles()
{
	foreach ($GLOBALS["theme_blocks"] as $category => $blocks) {
		foreach ($blocks as $block) {
			// Enqueue editor Style
			$style_path = "/build/blocks/{$category}/{$block}/style-index.css";
			if (file_exists(get_template_directory() . $style_path)) {
				wp_enqueue_style(
					"{$category}/{$block}-css",
					get_theme_file_uri($style_path)
				);
			}
		}
	}
}

add_action('enqueue_block_editor_assets', 'enqueue_block_editor_styles');


function insertArticleStructure()
{
	global $pagenow;
	if (($pagenow == 'post-new.php') || ($pagenow == 'post.php') || (get_post_type() == 'post')) {
		//Insert default blocks into new posts
		$post_type_object = get_post_type_object('post');
		$post_type_object->template = array(
			array('core/heading', array('level' => 2, 'content' => 'Titulo do parágrafo...')),
			array('core/paragraph', array('content' => 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br/><br/>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original foil, accompanied by English versions from the 1914 translation by H. Rackham.')),
			array('il/banner-product')
		);

		//Insert Styles to article page
		$style_path = "/build/blocks/atoms/post-single-content/style-index.css";
		if (file_exists(get_template_directory() . $style_path)) {
			wp_enqueue_style(
				"post-single-content-css",
				get_theme_file_uri($style_path)
			);
		}

		//Insert Styles to banner product
		$style_path = "/build/blocks/cells/banner-product/style-index.css";
		if (file_exists(get_template_directory() . $style_path)) {
			wp_enqueue_style(
				"banner-product-css",
				get_theme_file_uri($style_path)
			);
		}

		//Insert Styles to button
		$style_path = "/build/blocks/atoms/button/style-index.css";
		if (file_exists(get_template_directory() . $style_path)) {
			wp_enqueue_style(
				"button-css",
				get_theme_file_uri($style_path)
			);
		}
	}
}
add_action('admin_init', 'insertArticleStructure');


/**
 * Change blocks allowed in page/post editor and full site editor.
 * @param array $allowed_block_types list of block types
 * @param object $editor_context
 * @return array of allowed blocks
 */
function allowed_blocks($allowed_block_types, $editor_context)
{
	// page/post editor
	if (!empty($editor_context->post)) {
		return $allowed_block_types;
	}

	// full site editor screen
	return $GLOBALS['allowed_blocks'];
}
add_filter('allowed_block_types_all', 'allowed_blocks', 10, 2);

/**
 * Adding a new block categories.
 * @param string WP filter
 * @param array Filter function
 */
add_filter('block_categories_all', function ($categories) {
	$custom_categories = [];
	$custom_categories[] = [
		'slug' => 'atoms',
		'title' => 'Atomos',
	];

	$custom_categories[] = [
		'slug' => 'cells',
		'title' => 'Células',
	];

	$custom_categories[] = [
		'slug' => 'organisms',
		'title' => 'Organismos',
	];

	$custom_categories[] = [
		'slug' => 'templates',
		'title' => 'Templates',
	];

	array_unshift($categories, ...$custom_categories);

	return $categories;
});
