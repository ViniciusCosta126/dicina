<?php

function vagas_custom_post_type(){
    $labels = array(
        'name' => 'Vagas',
        'singular_name' =>"Vagas",
        'menu_name' => "Vagas",
        'name_admin_bar' =>'Vagas',
        'add_new' => 'Nova Vaga',
        'add_new_item' => 'Nova Vaga',
        'new_item' => 'Nova Vaga',
        'edit_item' => 'Editar Vaga',
        'view_item' => 'Ver Vaga',
    );

    $args = array(
        'label' => 'vagas',
        'labels' =>$labels,
        'supports'              =>  array('title'),
        'hierarchical'          => false,
        'public'                => false,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-groups',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => false,
        'capability_type'       => 'page',
        'rewrite'               => false,
        'show_in_rest'          => false,
    );

    register_post_type( 'vagas', $args );
}

add_action('init','vagas_custom_post_type',0);