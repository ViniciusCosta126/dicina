<?php

/**
 * Adds a custom block to theme editor.
 */
class JSXBlock
{
	protected $category;
	protected $name;
	function __construct($category, $name)
	{
		$this->category = $category;
		$this->name = $name;

		// Enqueue editor scripts
		wp_register_script($this->name, get_theme_file_uri("/build/blocks/{$this->category}/{$this->name}/index.js"), ["wp-blocks", "wp-editor"]);

		// Parse block.json
		$json = file_get_contents(get_theme_file_path("/src/blocks/{$this->category}/{$this->name}/block.json"));

		// Get attributes from json
		try {
			$attributes = json_decode($json, true)["attributes"];
		} catch (Exception $e) {
			$attributes = null;
		}

		// Register custom block
		register_block_type("il/{$this->name}", [
			"editor_script" => $this->name,
			"editor_style"  => "style-index.css",
			"style" => "style-index.css",
			"render_callback" => [$this, "php_render_callback"],
			"attributes" => $attributes,
		]);
	}

	/**
	 * Render PHP file instead of JSX content from block save() function.
	 */
	function php_render_callback($attributes, $content)
	{
		// Enqueue view style
		$style_path = "/build/blocks/{$this->category}/{$this->name}/style-index.css";
		if (file_exists(get_template_directory() . $style_path)) {
			wp_enqueue_block_style("il/{$this->name}", [
				"src" => get_theme_file_uri("/build/blocks/{$this->category}/{$this->name}/style-index.css"),
				"handle" => $this->name,
			]);
		}

		// Enqueue view script
		$view_script_path = "/build/blocks/{$this->category}/{$this->name}/view.js";
		if (file_exists(get_template_directory() . $view_script_path)) {
			wp_enqueue_script($this->name . "-js", get_theme_file_uri($view_script_path));
		}

		// Get render.php content
		ob_start();
		require get_theme_file_path("/src/blocks/{$this->category}/{$this->name}/render.php");
		return ob_get_clean();
	}
}
