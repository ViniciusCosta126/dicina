<?php $escolhasPosts = get_field('noticias_list');
if (empty($escolhasPosts)) : ?>
	<?php
	$parenPost = wp_get_post_parent_id(get_the_ID());
	$postType = get_post_type($parenPost);
	$args = array(
		'post_type' => $postType,
		'post_parent' => $parenPost,
		'posts_per_page' => '4',
		'orderby' => 'rand',
		'post__not_in' => $do_not_duplicate,
	);

	$query = new WP_Query($args);
	if ($query->have_posts()) { ?>
		<aside class="relacionados categorias">
			<div class="content">
				<h3 class="titulo"><?php _e('continue explorando', 'ayrton-senna') ?></h3>
				<div class="content-post">

					<?php // Start looping over the query results.
					while ($query->have_posts()) {

						$query->the_post();
					?>
						<article class="block-post">
							<div class="conteudopost">
								<a href="<?php the_permalink(); ?>">
									<div class="cover" style="background-image: url('<?php echo getThumbnail(get_the_ID()); ?>');">
										<?php the_component('components/tag-post'); ?>
									</div>
									<div class="infos">
										<h3><?php the_title(); ?></h3>
									</div>
								</a>
							</div>
						</article>
					<?php } ?>
				</div>
			</div><!-- Content -->
		</aside>
	<?php }
	wp_reset_postdata(); ?>
<?php else : ?>

	<?php if (have_rows('noticias_list')) :  ?>
		<aside class="relacionados categorias">
			<div class="content">
				<h3 class="titulo"><?php _e('continue explorando', 'ayrton-senna') ?></h3>
				<div class="content-post">
					<?php while (have_rows('noticias_list')) : the_row(); ?>
						<?php $postInfo = get_sub_field('noticia_each'); ?>
						<article class="block-post">
							<div class="conteudopost">
								<a href="<?php the_permalink($postInfo->ID); ?>">
									<div class="cover" style="background-image: url('<?php echo getThumbnail($postInfo->ID); ?>');">
										<?php $tagsPost = get_field('tag_post', $postInfo->ID);
										if ($tagsPost) : ?>
											<div class="tag-post">
												<?php if (qtrans_getLanguage() == 'en') : ?>
													<?php the_field('texto_tag_in', $postInfo->ID); ?>
												<?php else : ?>
													<?php the_field('texto_tag', $postInfo->ID); ?>
												<?php endif; ?>
											</div>
										<?php endif; ?>
									</div>
									<div class="infos">
										<h3><?php echo $postInfo->post_title ?></h3>
									</div>
								</a>
							</div>
						</article>
					<?php endwhile; ?>
				</div>
			</div>
		</aside>
	<?php endif; ?>

<?php endif; ?>