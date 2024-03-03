<?php
/**
 * Pagination
 */
global $wp_query;
?>

<?php if ($wp_query->max_num_pages > 1) { ?>
    <ul class="pagination">
        <li class="pagination__previous"><?php previous_posts_link('Anterior'); ?></li>
		<?php
		$big = 999999999; // need an unlikely integer

		echo '<li class="numbers">' . paginate_links( array(
			'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format' => '?paged=%#%',
			'current' => max( 1, get_query_var('paged') ),
			'total' => $wp_query->max_num_pages
		) ) . '</li>';
		?>

        <li class="pagination__next"><?php next_posts_link('Próxima'); ?></li>
    </ul>
<?php } ?>