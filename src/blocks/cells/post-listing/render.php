<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$http = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? $http = "https" : $http = "http";
$hostUrl = "{$http}://$_SERVER[HTTP_HOST]";
$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";

$page = isset($_GET['pg']) ? $_GET['pg'] : 1;
$tax_query = array('relation' => 'AND');
$args = [
    'posts_per_page' => $attributes["amount"],
    'post_type' => 'post',
    'order' => 'DESC',
    'paged' => $page,
    'tax_query' => $tax_query,
];

if ($attributes['variant'] === 'sidebar') {
    $postID = get_the_ID() ?: 0;

    $currentCat = get_the_category($postID);

    if ($currentCat && $attributes["filterBy"] == 0) {
        if (count($currentCat) > 1) {
            $term_list = wp_get_post_terms($postID, 'category', ['fields' => 'all']);
            foreach ($term_list as $term) {
                if (get_post_meta($postID, '_yoast_wpseo_primary_category', true) == $term->term_id) {
                    $currentCat = $term->term_id;
                }
            }
        } else {
            $currentCat = $currentCat[0]->cat_ID;
        }
        $args['category__in'] = (int)$currentCat;
    } else {
        $args['category__in'] = $attributes["filterBy"];
    }

    $args['orderby'] = 'meta_value_num';
    $args['meta_key'] = 'post_views_count';
    $args['post__not_in'] = array($postID);
} else {
    if ($attributes["filterBy"] !== 0) {
        if ($attributes["filterBy"] === -1) {
            $search_term = isset($_GET['q']) ? sanitize_text_field($_GET['q']) : '';
            $args['s'] = $search_term;
        } else if ($attributes["filterBy"] === -2) {
            $args['orderby'] = 'meta_value_num';
            $args['meta_key'] = 'post_views_count';
            $args['meta_query'] = array(
                'relation' => 'OR',
                array(
                    'key' => 'post_views_count',
                    'compare' => 'EXISTS'
                ),
                array(
                    'key' => 'post_views_count',
                    'compare' => 'NOT EXISTS'
                )
            );
        } else {
            $args['category__in'] = $attributes["filterBy"];
        }
    }
};

$posts = new WP_Query($args);



$post_blocks = "";
$totalPages = (int)$posts->max_num_pages;
$pagination_data = array(
    "currentPage" => $page,
    "totalPages" => $totalPages
);


$pagination_block = sprintf('<!-- wp:il/posts-pagination %s /-->', json_encode($pagination_data));

if ($posts->have_posts()) {
    $cardClass = $attributes["firstItem"];

    foreach ($posts->posts as $key => $post) {
        // Modify card size
        if ($key % 3 == 0 || $key == 0) {
            if ($cardClass === 'small') {
                $cardClass = 'small';
            } else if ($cardClass === 'medium') {
                $cardClass = 'medium';
            } else if ($cardClass === 'large') {
                $cardClass = 'large';
            }
        } else {
            if ($cardClass === 'small') {
                $cardClass = 'large';
            } else if ($cardClass === 'large') {
                $cardClass = 'medium';
            } else if ($cardClass === 'medium') {
                $cardClass = 'small';
            }
        }

        $post_id = $post->ID;
        $title = $post->post_title;
        $date = date_create($post->post_date)->format('d/m/Y');
        $post_url = get_permalink($post_id);
        $categories = get_the_category($post->ID);
        $category = !empty($categories) ? $categories[0] : '';
        $titleTag = $attributes['titleTag'];
        $withImages = $attributes['withImages'];
        
        $post_data = array(
            "variant" => $attributes['variant'],
            "hasImage" => $withImages,
            "widthCard" => $cardClass,
            "category" => array(
                "url" => "{$hostUrl}/noticias",
                "label" => "Notícias"
            ),
            "titleTag" => $titleTag,
            "date" => $date,
            "title" => $title,
            "link" => $post_url,
            "cardImg" => array(
                "src" => "",
                "alt" => "Ayrton Senna",
                "width" => "600",
                "height" => "400"
            )
        );

        if (!empty($categories)) {
            $catLink = "$hostUrl/imprensa/{$categories[0]->slug}";

            $post_data["category"] = array(
                "url" => $catLink,
                "label" => $categories[0]->name
            );
        }

        if (get_the_post_thumbnail_url($post_id)) {
            $thumbnail_id = get_post_meta($post->ID, '_thumbnail_id', true);
            $img_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);

            $attachment = wp_get_attachment_image_src($thumbnail_id, 'full', false);
            $width = $attachment[1];
            $height = $attachment[2];

            $post_data["cardImg"] = array(
                "src" => get_the_post_thumbnail_url($post_id),
                "alt" => $img_alt ?: 'Imagem do post',
                "width" => $width,
                "height" => $height
            );
        }

        if ($attributes['variant'] === 'sidebar') {
            $post_data['variant'] = "sidebar";
        }
        
        $categorias_excluidas = false;
        
        if($attributes['delete_category']){
            foreach($categories as $categorie){
                if(in_array($categorie->term_id,$attributes['excluded_categories'])){
                    $categorias_excluidas = true;
                }else {
                    continue;
                }
            }
        }
 

        if($categorias_excluidas){
            continue;
        }else{
            $post_blocks .= sprintf('<!-- wp:il/post-card %s /-->', json_encode($post_data));
        }
    }

    wp_reset_postdata();
}

$extraClass = "post-listing-" . $attributes["paginationType"];
$filter = "data-filter='{$attributes["filterBy"]}'";
$perPage = "data-perPage='{$attributes["perPage"]}'";
$pagesNumbers = "data-totalPages='{$totalPages}'";
$textButton = $language === "pt" ? "Ver todos" : "See All";
$linkButton = $language === "pt" ? "noticias" : "news";

?>

<div class="post-listing <?= "{$attributes["variant"]} {$extraClass}" ?> post-listing-<?= $randomComponentId ?>">
    <style>
    .post-listing-<?=$randomComponentId ?> {
        margin-bottom: <?=$attributes["marginM"] ?>px;
    }

    @media (min-width: 768px) {
        .post-listing-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px;
        }
    }
    </style>

    <div class="post-list">
        <?= do_blocks($post_blocks); ?>
    </div>


    <?php if ($attributes["paginationType"] === "pagination") : ?>
    <div class="button-wrapper">
        <?= do_blocks($pagination_block); ?>
    </div>
    <?php elseif ($page < $totalPages) : ?>
    <div class="button-wrapper" <?= $filter ?> <?= $perPage ?> <?= $pagesNumbers; ?>>
        <?php if ($attributes["filterBy"] != -2) : ?>
        <?= $content ?>
        <?php else : ?>
        <?= do_blocks('<!-- wp:il/button { "variant": "link-arrow", "content": "' . $textButton . '", "color": "002753", "hasLink": true, "link": {"url": "' . $linkButton . '", "target": false} } /-->'); ?>
        <?php endif; ?>
    </div>
    <?php endif; ?>
</div>