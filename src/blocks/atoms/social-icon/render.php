<?php 
if($attributes['icon']['src']):?>
	<a href="<?= $attributes['link']?>">
		<img loading="eager" 
			src="<?= $attributes['icon']['src'] ?>" 
			alt="<?= $attributes['icon']['alt'] ?>"
			class="logo" 
		/>
	</a>
<?php endif;?>