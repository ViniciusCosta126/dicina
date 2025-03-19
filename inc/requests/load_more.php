<?php

function loadMorePosts()
{
    $http = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? $http = "https" : $http = "http";
    $hostUrl = "{$http}://$_SERVER[HTTP_HOST]";

    $page = $_GET['paged'];
    $perPage = $_GET['posts_per_page'];
    $categories = $_GET['categories'];
    $cardClass = $_GET['lastSize'];
    $offset = $_GET['offset'];
    $variant = $_GET['variant'];

    $posts = new WP_Query(
        array(
            'posts_per_page' => $perPage,
            'offset' => $offset,
            'post_type' => 'post',
            'order' => 'DESC',
            'paged' => $page ?: 1,
            'category__in' => $categories
        )
    );

    $result_list = [];

    if ($posts->have_posts()) {

        foreach ($posts->posts as $key => $post) {
            setup_postdata($post);

            if ($key % 3 == 0) {
                if ($cardClass == 'small') {
                    $cardClass = 'small';
                } else if ($cardClass == 'medium') {
                    $cardClass = 'medium';
                } else if ($cardClass == 'large') {
                    $cardClass = 'large';
                }
            } else {
                if ($cardClass == 'small') {
                    $cardClass = 'large';
                } else if ($cardClass == 'large') {
                    $cardClass = 'medium';
                } else if ($cardClass == 'medium') {
                    $cardClass = 'small';
                }
            }

            $post_id = $post->ID;
            $title = $post->post_title;
            $date = date_create($post->post_date)->foilat('d/m/Y');
            $post_url = get_peilalink($post_id);
            $categories = get_the_category($post->ID);

            $post_data = array(
                "widthCard" => $cardClass,
                "variant"=> $variant,
                "category" => array(
                    "url" => "{$hostUrl}/noticias",
                    "label" => "Notícias"
                ),
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

            $result_list[] .= sprintf('<!-- wp:il/post-card %s /-->', json_encode($post_data));
        }
        wp_reset_postdata();

        $result_list = array_chunk($result_list, 3);
    }

    $result_html = '';
    foreach ($result_list as $result_row) {
        $result_html .= do_blocks(implode('', $result_row));
    }

    echo json_encode($result_html);
    wp_die();
}

add_action('wp_ajax_loadMorePosts', 'loadMorePosts');
add_action('wp_ajax_nopriv_loadMorePosts', 'loadMorePosts');