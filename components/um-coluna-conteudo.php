<?php if (have_posts()): while (have_posts()) : the_post();?>
	<article class="interna">
		<?php the_component('components/cover'); ?>
		<div class="conteudo uma-coluna-content">
			 <?php 
				 	if (function_exists('qtrans_getLanguage')) {
				 		 if ( qtrans_getLanguage() == 'en' ) {
				         	the_component('components/conteudo-flexivel-en');
				        }
				        elseif ( qtrans_getLanguage() == 'pt' ) {
				          the_component('components/conteudo-flexivel');
				        }
					 }
				      
				?>
				<?php the_component('components/infografico'); ?>
				<div class="btn-saiba-mais">
					<?php if(get_field('ativar_saiba_mais')) : ?>
						<a class="btn-marcas-saiba" href="<?php the_field('link_saiba_mais') ?>"><?php the_field('texto_saiba_mais') ?></a>
					<?php endif; ?>
				</div>
		</div>
	</article>
<?php endwhile; else:?>
<?php endif;?> 
<section class="page">
	<div class="page-content">
		<div class="content">
			<div class="content-post">
 <?php
	$PostID = get_the_ID();
	$post_type = get_post_type();
	$args = array(
		'post_type' => $post_type,
		'posts_per_page' => '-1',
		'post_parent' => $PostID,
	);

	$query = new WP_Query( $args );
	if ( $query->have_posts() ) {
 
    // Start looping over the query results.
    while ( $query->have_posts() ) {
 
        $query->the_post(); 
?>
	<article class="block-post four-blocks">
		<div class="conteudopost">
			<a href="<?php the_permalink(); ?>" alt="<?php the_title(); ?>">
				<div class="cover" style="background-image: url('<?php echo getThumbnail(get_the_ID()); ?>');">
					<?php the_component('components/tag-post'); ?>
				</div>
				<div class="infos">
					<div class="table">
						<div class="v-align middle">
							<h3><?php the_title(); ?> <br> <?php echo get_field('link-marca');?></h3>
						</div>
					</div>
				</div>
			</a>
		</div>
	</article>
<?php
    }
} wp_reset_postdata();

?>
		</div>
		</div><!-- Content -->
	</div>
</section><!-- Page Content -->