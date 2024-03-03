<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$popular_posts = new WP_Query(
	array(
		'posts_per_page' => 4,
		'post_type' => 'post',
		'meta_query' => array(
			'relation' => 'OR',
			array(
				'key' => 'post_views_count',
				'compare' => 'EXISTS',
			),
			array(
				'key' => 'post_views_count',
				'compare' => 'NOT EXISTS',
				'value' => '',
			),
		),
		'orderby' => 'meta_value_num',
		'meta_key' => 'post_views_count',
	)
);
$post_blocks = '';
$post_list = '';
if ($popular_posts->have_posts()) {
	foreach ($popular_posts->posts as $post) {
		$post_id = $post->ID;
		$title = $post->post_title;
		$post_url = get_permalink($post_id);
		$categories = get_the_category($post->ID);
		$category = !empty($categories) ? $categories[0] : '';
		$post_data = array(
			"post" => array(
				"link" => $post_url,
				"title" => $title,
				"featuredImage" => array(
					"src" => "https://placehold.co/600x400",
					"width" => 600,
					"height" => 400,
					"alt" => "Ayrton Senna"
				)
			),
			"category" => array(
				"link" => "#",
				"name" => "Categoria"
			),
			"variant" => $attributes['variant']

		);


		if (!empty($categories)) {
			$post_data["category"] = array(
				"link" => get_category_link($categories[0]->term_id),
				"name" => $categories[0]->name
			);
		}

		if (get_the_post_thumbnail_url($post_id)) {
			$post_data["post"]["featuredImage"] = array(
				"src" => get_the_post_thumbnail_url($post_id),
				"alt" => get_the_title(get_post_thumbnail_id($post_id)) ?: 'Imagem de exemplo',
			);
		}
		$post_blocks .= sprintf('<!-- wp:il/most-read-post-card %s /-->', json_encode($post_data));
	}

	wp_reset_postdata();
}

$carousel_block = '<!-- wp:il/carousel {"variant": "most-read-posts", "perView": 1, "perView480": 1, "perView768": 1, "perView960": 1, "perView1366": 1, "navigation": true, "navigationDesktop": true} -->';

$carousel_end_block = '<!-- /wp:il/carousel -->';

?>
<section class="most-read-posts <?= $attributes["variant"] ?> most-read-posts-<?= $randomComponentId ?>">
    <style>
    .most-read-posts-<?=$randomComponentId ?> {
        margin-bottom: <?=$attributes["marginM"] ?>px;
    }

    @media (min-width: 768px) {
        .most-read-posts-<?=$randomComponentId ?> {
            margin-bottom: <?=$attributes["marginD"] ?>px;
        }
    }
    </style>

    <div class="container">
        <div class="most-read-posts__container">
            <?= $content ?>
            <?= do_blocks($carousel_block . $post_blocks . $carousel_end_block); ?>

            <div class="most-read-posts__list">
                <?= do_blocks('<!-- wp:il/post-listing {"variant": "sidebar", "withImages": false, "amount": 4}  /-->'); ?>
            </div>
        </div>
    </div>
</section>