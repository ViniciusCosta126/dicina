<?php if (have_posts()): while (have_posts()) : the_post();?>
<article class="interna">
		<?php the_component('components/cover-categorias'); ?>
		<div class="sobre-ano">
			<div class="conteudo">
			<div class="duas-colunas-content">
				<div class="left">
				<div class="content">
					<h4 class="temporada-title"><?php _e('A temporada', 'ayrton-senna'); ?></h4>
				</div>
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
				</div>
				<div class="right">
					<?php the_component('components/tabela'); ?>
				</div>
			</div>
			</div>
			<?php the_component('components/newsletter'); ?>
		</div> 
</article>
<?php endwhile; else:?>
<?php endif;?> 
<section class="page grandes-premios active">
	<div class="page-content">
		<div class="content">
			<div class="content-post">
 <?php
	$PostID = get_the_ID();
	$post_type = get_post_type();
	$args = array(
		'post_type' => $post_type,
		'posts_per_page' => -1,
		'post_parent' => $PostID,
	);

	$query = new WP_Query( $args );
	if ( $query->have_posts() ) {
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
							<h3><?php the_title(); ?></h3>
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
<?php the_component('components/newsletter'); ?>
</section><!-- Page Content -->