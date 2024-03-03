	<div class="frase-content">
		<article class="frase-rodape">
			<p>
				<?= get_field('txt-frases', '16013'); ?>
			</p>
			<div class="share">
				<div class="table">
					<div class="v-align middle">
						<span><?php _e('Compartilhe:', 'ayrton-senna'); ?></span>
						<button class="share-btn  facebook" data-social="face" data-link="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.ayrtonsenna.com.br%2F&picture=http%3A%2F%2Fwww.ayrtonsenna.com.br%2Fwp-content%2Fthemes%2Fayrton-senna%2Fassets%2Fimages%2Flogo-black.png&title=Ayrton+Senna&caption=Ayrton+Senna&quote=<?php echo strip_tags($frase); ?>&description="></button>
						<button class="share-btn twitter" data-social="twitter" data-link="https://twitter.com/intent/tweet?text=<?php echo strip_tags($frase); ?> @ayrtonsenna - http://ayrtonsenna.com.br"></button>
					</div>
				</div>
			</div>
		</article>
	</div>