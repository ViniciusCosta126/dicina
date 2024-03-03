<div class="share-content">
	<div class="share">
			<span class="titulo">
				<?php echo __('Compartilhe este artigo', 'ayrton-senna'); ?>
			</span>
			<button class="btn-share face" data-social="face" data-link="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>"></button>
			<button class="btn-share twitter" data-social="twitter" data-link="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>"></button>
			<button class="btn-share whatsapp" data-social="whatsapp" data-link="https://api.whatsapp.com/send?text=<?php the_permalink(); ?>"></button>
	</div>
	
	<?php 
	 $postype = get_post_type();
	if($postype == 'piloto'): ?>
		<div class="share share-float">
			<span class="titulo">
					<?php echo __('Compartilhe este artigo', 'ayrton-senna'); ?>
			</span>

			<button class="btn-share face" data-social="face" data-link="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>"></button>
			<button class="btn-share twitter" data-social="twitter" data-link="https://twitter.com/intent/tweet?url=<?php the_permalink(); ?>"></button>
			<button class="btn-share whatsapp" data-social="whatsapp" data-link="https://api.whatsapp.com/send?text=<?php the_permalink(); ?>"></button>
		</div>
	<?php endif; ?>
</div>