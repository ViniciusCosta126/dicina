<?php
/**
* Exemplos de como criar post types e taxonomias via código para não comprometer com plugin CPTUI.
*/

//Cria o post type
function custom_post_type_create() {
	$labels = array(
		'name' => 'O Piloto',
		'singular_name' => 'O Piloto',
		);
	$args = array(
		'labels' => $labels,
		'description' => 'O Piloto',
		'public' => true,
		'show_ui' => true,
		'menu_position' => 5, //não é incrementavel, o valor 5 posiciona acima de MEDIA, 10 = Abaixo de Media
		'has_archive' => true,
		'show_in_menu' => true,
		'exclude_from_search' => false,
		'capability_type' => 'page',
		'map_meta_cap' => true,
		'hierarchical' => true,
		'rewrite' => array( 'slug' =>'piloto', 'with_front' => true ),
		'query_var' => true,
		'supports' => array('page-attributes', 'post-formats', 'title', 'excerpt', 'editor', 'thumbnail'),
		);
	register_post_type('piloto', $args );

	$labels = array(
		'name' => 'O Ídolo',
		'singular_name' => 'O Ídolo',
		);
	$args = array(
		'labels' => $labels,
		'description' => 'O Ídolo',
		'public' => true,
		'show_ui' => true,
		'menu_position' => 5, //não é incrementavel, o valor 5 posiciona acima de MEDIA, 10 = Abaixo de Media
		'has_archive' => true,
		'show_in_menu' => true,
		'exclude_from_search' => false,
		'capability_type' => 'page',
		'map_meta_cap' => true,
		'hierarchical' => true,
		'rewrite' => array( 'slug' =>'idolo', 'with_front' => true ),
		'query_var' => true,
		'supports' => array('page-attributes', 'post-formats', 'title', 'excerpt', 'editor', 'thumbnail'),
		);
	register_post_type('idolo', $args );

	$labels = array(
		'name' => 'O Legado',
		'singular_name' => 'O Legado',
		);
	$args = array(
		'labels' => $labels,
		'description' => 'O Legado',
		'public' => true,
		'show_ui' => true,
		'menu_position' => 5, //não é incrementavel, o valor 5 posiciona acima de MEDIA, 10 = Abaixo de Media
		'has_archive' => true,
		'show_in_menu' => true,
		'exclude_from_search' => false,
		'capability_type' => 'page',
		'map_meta_cap' => true,
		'hierarchical' => true,
		'rewrite' => array( 'slug' =>'legado', 'with_front' => true ),
		'query_var' => true,
		'supports' => array('page-attributes', 'post-formats', 'title', 'excerpt', 'editor', 'thumbnail'),
		);
	register_post_type('legado', $args );

	// $labels = array(
	// 	'name' => 'Depoimentos',
	// 	'singular_name' => 'Depoimento',
	// 	);
	// $args = array(
	// 	'labels' => $labels,
	// 	'description' => 'Depoimentos',
	// 	'public' => true,
	// 	'show_ui' => true,
	// 	'menu_position' => 5, //não é incrementavel, o valor 5 posiciona acima de MEDIA, 10 = Abaixo de Media
	// 	'has_archive' => true,
	// 	'show_in_menu' => true,
	// 	'exclude_from_search' => false,
	// 	'capability_type' => 'post',
	// 	'map_meta_cap' => true,
	// 	'hierarchical' => true,
	// 	'rewrite' => array( 'slug' =>'depoimentos', 'with_front' => true ),
	// 	'query_var' => true,
	// 	'supports' => array('page-attributes', 'post-formats', 'title', 'excerpt', 'editor', 'thumbnail'),
	// 	);
	// register_post_type('depoimentos', $args );

	// $labels = array(
	// 	'name' => 'Livros',
	// 	'singular_name' => 'Livro',
	// 	);
	// $args = array(
	// 	'labels' => $labels,
	// 	'description' => 'Livros',
	// 	'public' => true,
	// 	'show_ui' => true,
	// 	'menu_position' => 5, //não é incrementavel, o valor 5 posiciona acima de MEDIA, 10 = Abaixo de Media
	// 	'has_archive' => true,
	// 	'show_in_menu' => true,
	// 	'exclude_from_search' => false,
	// 	'capability_type' => 'post',
	// 	'map_meta_cap' => true,
	// 	'hierarchical' => true,
	// 	'rewrite' => array( 'slug' =>'livro', 'with_front' => true ),
	// 	'query_var' => true,
	// 	'supports' => array('page-attributes', 'post-formats', 'title', 'excerpt', 'editor', 'thumbnail'),
	// 	);
	// register_post_type('livro', $args );
}
add_action( 'init', 'custom_post_type_create' );

/*Cria as taxonomias*/
function custom_taxonomy_create() {
	$labels = array(
		'name'              => _x( 'Categorias', 'taxonomy general name' ),
		'singular_name'     => _x( 'Categorias', 'taxonomy singular name' ),
		'search_items'      => __( 'Procurar Categoria' ),
		'all_items'         => __( 'Todas as Categorias' ),
		'parent_item'       => __( 'Categoria pai' ),
		'parent_item_colon' => __( 'Categoria pai:' ),
		'edit_item'         => __( 'Editar Categoria' ),
		'update_item'       => __( 'Atualizar Categoria' ),
		'add_new_item'      => __( 'Adicionar nova Categoria' ),
		'new_item_name'     => __( 'Nova Categoria' ),
		'menu_name'         => __( 'Categoria' ),
	);
	$args = array(
		'labels' => $labels,
		'hierarchical' 	=> true,
		'public'		=> true,
		'query_var'		=> 'category-livro',
		//slug internacional deve coincidere con il primo parametro dello slug del Custom Post Type correlato
		//'rewrite'		=>  array('slug' => 'cursos' ),
		'_builtin'		=> false,
	);
	register_taxonomy( 'category-livro', 'livro', $args );

	/*$labels = array(
		'name'              => _x( 'Categorias', 'taxonomy general name' ),
		'singular_name'     => _x( 'Categorias', 'taxonomy singular name' ),
		'search_items'      => __( 'Procurar Categoria' ),
		'all_items'         => __( 'Todas as Categorias' ),
		'parent_item'       => __( 'Categoria pai' ),
		'parent_item_colon' => __( 'Categoria pai:' ),
		'edit_item'         => __( 'Editar Categoria' ),
		'update_item'       => __( 'Atualizar Categoria' ),
		'add_new_item'      => __( 'Adicionar nova Categoria' ),
		'new_item_name'     => __( 'Nova Categoria' ),
		'menu_name'         => __( 'Categoria na listagem' ),
	);
	$args = array(
		'labels' => $labels,
		'hierarchical' 	=> true,
		'public'		=> true,
		'query_var'		=> 'cat_noticias',
		//slug internacional deve coincidere con il primo parametro dello slug del Custom Post Type correlato
		//'rewrite'		=>  array('slug' => 'cursos' ),
		'_builtin'		=> false,
	);
	register_taxonomy( 'cat_noticias_ed', 'noticias-educacao', $args );

	$labels = array(
		'name'              => _x( 'Categorias', 'taxonomy general name' ),
		'singular_name'     => _x( 'Categorias', 'taxonomy singular name' ),
		'search_items'      => __( 'Procurar Categoria' ),
		'all_items'         => __( 'Todas as Categorias' ),
		'parent_item'       => __( 'Categoria pai' ),
		'parent_item_colon' => __( 'Categoria pai:' ),
		'edit_item'         => __( 'Editar Categoria' ),
		'update_item'       => __( 'Atualizar Categoria' ),
		'add_new_item'      => __( 'Adicionar nova Categoria' ),
		'new_item_name'     => __( 'Nova Categoria' ),
		'menu_name'         => __( 'Categoria na listagem' ),
	);
	$args = array(
		'labels' => $labels,
		'hierarchical' 	=> true,
		'public'		=> true,
		'query_var'		=> 'cursos_eventos',
		//slug internacional deve coincidere con il primo parametro dello slug del Custom Post Type correlato
		//'rewrite'		=>  array('slug' => 'cursos' ),
		'_builtin'		=> false,
	);
	register_taxonomy( 'cursos_eventos', 'cursos-e-eventos', $args );*/
}
add_action( 'init', 'custom_taxonomy_create', 0 );

/*Filtro para trocar o permalink permalink -- começa aqui*/
/*add_filter('post_link', 'curso_nome_permalink', 1, 3);
add_filter('post_type_link', 'curso_nome_permalink', 1, 3);

function curso_nome_permalink($permalink, $post_id, $leavename) {
    if (strpos($permalink, '%curso_nome%') === FALSE) return $permalink;
        // Get post
        $post = get_post($post_id);
        if (!$post) return $permalink;

        // Get taxonomy terms
        $terms = wp_get_object_terms($post->ID, 'curso_nome');
        if (!is_wp_error($terms) && !empty($terms) && is_object($terms[0]))
        	$taxonomy_slug = $terms[0]->slug;
        else $taxonomy_slug = 'no-curso_nome';

    return str_replace('%curso_nome%', $taxonomy_slug, $permalink);
}*/
/*termina aqui*/