<aside class="descubra">
	<h3><?php _e('Descubra mais', 'ayrton-senna'); ?></h3>
		<ul>
			<?php
				global $post;

				$parentId = $post->post_parent;
				$postype = get_post_type();
				$atual = get_the_ID();
				$args = array(
				    'post_type'      => $postype,
				    'posts_per_page' => -1,
				    'post_parent'    => $post->ID,
				    'order'          => 'ASC',
				    'orderby'        => 'date',
					'order'          => 'ASC',
				 );


				$parent = new WP_Query( $args );

			if ( $parent->have_posts() ) : ?>

    		<?php while ( $parent->have_posts() ) : $parent->the_post(); ?>
    			<?php if ($atual == get_the_ID()): ?>
        			<li><a href="<?php the_permalink(); ?>" class="active" title="<?php the_title(); ?>"><?php the_title(); ?></a></li>
        		<?php else: ?>
        			<li><a href="<?php the_permalink(); ?>" class="" title="<?php the_title(); ?>"><?php the_title(); ?></a></li>
    			<?php endif; ?>
    		<?php endwhile; ?>	
    	<?php else: ?>
    		<?php 
				$atual2 = get_the_ID();
				$args2 = array(
				    'post_type'      => $postype,
				    'posts_per_page' => -1,
				    'post_parent'    => $parentId,
					'orderby'        => 'date',
					'order'          => 'ASC',
				 );


				$parent2 = new WP_Query( $args2 );
    		?>
    		<?php while ( $parent2->have_posts() ) : $parent2->the_post(); ?>
    			<?php if ($atual2 == get_the_ID()): ?>
        			<li><a href="<?php the_permalink(); ?>" class="active" title="<?php the_title(); ?>"><?php the_title(); ?></a></li>
        		<?php else: ?>
        			<li><a href="<?php the_permalink(); ?>" class="" title="<?php the_title(); ?>"><?php the_title(); ?></a></li>
    			<?php endif; ?>
    		<?php endwhile; ?>	
		<?php endif; wp_reset_query(); ?>
		</ul>
</aside>

