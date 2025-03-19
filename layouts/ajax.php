<?php

/**
 * Template para requisições Ajax
 */

	function loadMorePosts() {
		$search_data = new WP_Query([
			// 'post_type' => 'post',
			's' => $_POST['search'],
			'posts_per_page' => 3,
			'paged' => $_POST['paged'] ?: 1,
		]);
		$result_list = [];
		if ($search_data->have_posts()) {
			$card_sizes = array('small', 'large', 'medium');
			$card_count = 0;

			foreach ($search_data->posts as $post) {
				setup_postdata($post);

				$result_list[] .= sprintf(
					'<!-- wp:rm/post-card {"widthCard":"%s", "title":"%s"}  /-->',
					$card_sizes[$card_count],
					$post->post_title
				);

				$card_count++;
				$card_count = $card_count > 2 ? 0 : $card_count;
			}
			wp_reset_postdata();

			$result_list = array_chunk($result_list, 3);
		}

		$result_html = '';
		foreach ($result_list as $result_row) {
			$result_html .= '<div class="result-search__row">' . do_blocks(implode('', $result_row)) . '</div>';
		}
		echo json_encode($result_html);
		wp_die();
	}

	add_action('wp_ajax_loadMorePosts', 'loadMorePosts');
	add_action('wp_ajax_nopriv_loadMorePosts', 'loadMorePosts');

?>
<?php echo $args['content']; ?>
