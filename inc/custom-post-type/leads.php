<?php

function cpt_leads()
{
    $labels = array(
        'name' => 'Leads',
        'singular_name' => "Lead",
        'menu_name' => "Leads",
        'add_new' => "Adicionar lead",
        'add_new_item' => "Adicionar novo lead",
        'edit_item' => "Editar Lead",
        'new_item' => "Novo lead",
        'view_item' => "Ver Lead",
        'all_items' => "Ver todos os leads",
        'search_items' => "Buscar Leads"
    );

    register_post_type('leads', array(
        'labels' => $labels,
        'public' => false,
        'show_ui' => true,
    ));
}

add_action('init', 'cpt_leads');


function add_lead_metaboxes()
{
    add_meta_box(
        'lead_details',
        'Detalhes do Lead',
        'render_lead_metabox',
        'leads',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'add_lead_metaboxes');

function render_lead_metabox($post)
{
    $email = get_post_meta($post->ID, 'email', true);
    $telefone = get_post_meta($post->ID, 'telefone', true);
    $endereco = get_post_meta($post->ID, 'endereco', true);
    ?>
    <p>
        <label for="email">E-mail:</label><br>
        <input type="email" name="email" id="email" value="<?php echo esc_attr($email); ?>" style="width:100%;">
    </p>
    <p>
        <label for="telefone">Telefone:</label><br>
        <input type="text" name="telefone" id="telefone" value="<?php echo esc_attr($telefone); ?>" style="width:100%;">
    </p>
    <p>
        <label for="endereco">Endereco:</label><br>
        <input type="text" name="endereco" id="endereco" value="<?php echo esc_attr($endereco); ?>" style="width:100%;">
    </p>
    <?php
}

// Salvar os dados do Lead
function save_lead_data($post_id)
{
    if (array_key_exists('email', $_POST)) {
        update_post_meta($post_id, 'email', sanitize_email($_POST['email']));
    }
    if (array_key_exists('telefone', $_POST)) {
        update_post_meta($post_id, 'telefone', sanitize_text_field($_POST['telefone']));
    }
    if (array_key_exists('endereco', $_POST)) {
        update_post_meta($post_id, 'endereco', sanitize_text_field($_POST['endereco']));
    }
}
add_action('save_post', 'save_lead_data');


function add_lead_columns($columns)
{
    $new_columns = [];

    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = "Nome";
    $new_columns['email'] = 'E-mail';
    $new_columns['telefone'] = 'Telefone';
    $new_columns['endereco'] = 'Endereço';
    if (isset($columns['date'])) {
        $new_columns['date'] = $columns['date'];
    }
    return $new_columns;
}
add_filter('manage_leads_posts_columns', 'add_lead_columns');

function show_lead_columns($column, $post_id)
{
    if ($column == 'email') {
        echo get_post_meta($post_id, 'email', true);
    }
    if ($column == 'telefone') {
        echo get_post_meta($post_id, 'telefone', true);
    }
}
add_action('manage_leads_posts_custom_column', 'show_lead_columns', 10, 2);
