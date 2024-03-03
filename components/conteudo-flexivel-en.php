
<?php

// check if the flexible content field has rows of data
if( have_rows('conteudo-ingles') ):

     // loop through the rows of data
    while ( have_rows('conteudo-ingles') ) : the_row();

        if( get_row_layout() == 'texto' ): ?>
			<div class="content">
				<?php the_sub_field('texto'); ?>
			</div>
        <?php elseif( get_row_layout() == 'video' ): ?>
        	<div class="content">
				<div class="video-response">
				<?php the_sub_field('video'); ?>
				</div>
			</div>
		<?php elseif( get_row_layout() == 'foto_grande' ): ?>
		  	<div class="content-big">
				<?php 
					$image = get_sub_field('foto_grande');
				?>
				<picture>
				    <source srcset="<?php echo $image['sizes']['medium_large']; ?>" media="(max-width: 768px)">
				    <img rel="preload" as="image" srcset="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>">
				</picture>
			</div>
		<?php elseif( get_row_layout() == 'posts_relacionado' ): ?>
			<section class="content">
				<?php
					if( have_rows('postagens-i') ):
					    while ( have_rows('postagens-i') ) : the_row();
					    	$post_object = get_sub_field('post-each-rel');
					    	$coverpost = get_the_post_thumbnail_url($post_object->ID);
					    	
				?>
						        <article class="postagens">
						            <a href="<?php echo get_permalink($post_object->ID); ?>">
						        	<?php if (!empty($coverpost)): ?>
						        		<img rel="preload" as="image" src="<?php echo $coverpost; ?>" alt="<?php echo $coverpost['alt']; ?>">
						        	<?php endif ?>
						           	<div class="postagens-conteudo">
						           		<h3><?php echo get_the_title($post_object->ID); ?></h3>
										<?php $vez = 1; while ( have_rows('conteudo-ingles', $post_object->ID)) : the_row(); ?>
												<?php if( get_row_layout() == 'texto' && $vez == 1): ?>
												<div class="postagens-texto">
													<?php $texto = get_sub_field('texto'); ?>
													<p><?php echo mkt_truncate($texto, 200, true, false); ?></p>
												</div>
											<?php $vez++; endif; ?>
										<?php  endwhile; ?>	
										<span class="btn"><?php _e('ler mais','ayrton-senna'); ?></span>
						           	</div>
						            </a>
						        </article>
				<?php endwhile; endif;?>
			</section>
		<?php elseif( get_row_layout() == 'galeria' ): ?>
			<div class="content">
				<?php 
					$images = get_sub_field('galeria');
				?>
				<?php if( $images ): ?>
				    <div class="galeria-image">
				        <?php foreach( $images as $image ): ?>
				            <div>
				                <img rel="preload" as="image" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
									<?php if ($image['description']): ?>
										<div class="galeria-description">
											<?php echo $image['description']; ?>
										</div>
									<?php endif ?>
				            </div>
				        <?php endforeach; ?>
				    </div>
				<?php endif; ?>
				<?php if( $images ): ?>
				    <div class="galeria-pagination">
				        <?php foreach( $images as $image ): ?>
				            <div>
				                <img rel="preload" as="image" src="<?php echo $image['sizes']['thumbnail']; ?>" alt="<?php echo $image['alt']; ?>" />
				            </div>
				        <?php endforeach; ?>
				    </div>
				<?php endif; ?>
			</div>
		<?php elseif( get_row_layout() == 'frase' ): ?>
			<div class="fraseContent">
				<div class="content">
					<div class="frases">
						<?php the_sub_field('frase'); ?>
					</div>
				</div>
			</div>
        <?php endif;

    		endwhile;

			else :

			endif;
?>