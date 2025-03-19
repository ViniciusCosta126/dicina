<?php
add_action( 'login_head', 'wp_custom_login_head_javascript' );
add_action( 'login_head', 'wp_custom_login_header' );
add_action( 'login_footer', 'wp_custom_login_footer' );
add_action( 'login_enqueue_scripts', 'remove_default_styles' );
add_action( 'login_init', 'login_remove_scripts' );

function remove_default_styles() {
	wp_deregister_style( 'wp-admin' );
}

function login_remove_scripts() {
	wp_deregister_style( 'wp-admin' );
}

function wp_custom_login_head_javascript() {
	?>
	<script type="text/javascript">
	wp_custom_login_remove_element('wp-admin-css');
	wp_custom_login_remove_element('colors-fresh-css');

	function wp_custom_login_remove_element(id) {
		var element = document.getElementById(id);
		if( typeof element !== 'undefined' && element.value == '' )
			element.parentNode.removeChild(element);
	}
	</script>
	<?php
}


function wp_custom_login_header()
{
	wp_register_style( 'wp-main-css', get_stylesheet_directory_uri() . '/assets/css/main.css' );
	wp_register_style( 'wp-admin-custom-css', get_stylesheet_directory_uri() . '/assets/css/admin.css' );

	wp_enqueue_style( 'wp-main-css' );
	wp_enqueue_style( 'wp-admin-custom-css' );

	do_action('wp_custom_login_header_before');
	get_header();
	the_component('components/header');
	do_action('wp_custom_login_header_after');
}


function wp_custom_login_footer()
{
	do_action('wp_custom_login_footer_before');
	get_footer();
	do_action('wp_custom_login_footer_after');
}

function wp_custom_login_is_login_page()
{
	return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
}