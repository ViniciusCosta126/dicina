<?php 
$habilitainfo = get_field('show-info');
if (function_exists('qtrans_getLanguage')) {
	if ( qtrans_getLanguage() == 'en' ) {
		$imagem = get_field('infografico-en');
	}
	elseif ( qtrans_getLanguage() == 'pt' ) {
		$imagem = get_field('infografico-br');
	}	
}
if($habilitainfo == 1): ?>

<div class="infoContent">
	<div class="content">
		<button class="btn-infografico"><?php echo __('Mostrar Infográfico', 'ayrton-senna') ?></button>
	</div>
	<div class="infografico disable">
		<img rel="preload" as="image" src="<?php echo wp_get_attachment_url($imagem); ?>" alt="">
	</div>
</div>

<?php endif; ?>