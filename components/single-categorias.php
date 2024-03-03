<?php if (have_posts()): while (have_posts()) : the_post();?>
	<div class="interna">
		<?php the_component('components/cover-single'); ?>
			<article class="conteudo">
				 <?php 
				 	if (function_exists('qtrans_getLanguage')) {
				 		 if ( qtrans_getLanguage() == 'en' ) {
				         	the_component('components/conteudo-flexivel-en');
				        }
				        elseif ( qtrans_getLanguage() == 'pt' ) {
				          the_component('components/conteudo-flexivel');
				        }
					 }else{
					 	 the_component('components/conteudo-flexivel');
					 }
				      
				?>
				<?php 
					$tipoPost = get_field('landing_type');
					if($tipoPost == 'no-list-table' || $tipoPost == 'last-level'):
				?>
					<?php the_component('components/tabela'); ?>
				<?php endif; ?>
				<?php the_component('components/infografico'); ?>
				<?php the_component('components/share'); ?>
				
			</article>
		<?php the_component('components/relacionados-categoria'); ?>
		<?php the_component('components/disqus'); ?>
	</div>
<?php endwhile; else:?>
<?php endif;?> 