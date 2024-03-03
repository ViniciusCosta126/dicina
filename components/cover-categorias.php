<div class="page-header" style="background-image: url('<?php echo get_template_directory_uri(); ?>/assets/images/delete/categoria-lista.jpg');">
	<div class="page-conteudo">
		<div class="table">
			<div class="v-align middle">
				<div class="content">
					<div class="left">
						<div class="links">
							<?php the_component('components/breadcrumb'); ?>
						</div>
						<div class="titulo">
							<?php echo getControles('anterior'); ?>
							<h1>
								<?php the_title(); ?>
							</h1>
							<?php echo getControles('proximo'); ?>
						</div>
					</div><!-- Conteudo Left -->
					<div class="options-page">
						<button class="btn-temporada btn-gpremios active" data-alvo="premios"><?php echo __('Grandes Prêmios', 'ayrton-senna') ?></button>
						<button class="btn-temporada btn-gpremios" data-alvo="sobre-ano"><?php echo __('Sobre o Ano', 'ayrton-senna') ?></button>
						<form class="search" role="search" method="get" id="searchform" action="<?php echo get_option('home'); ?>">
						   <input value="" name="s" id="s" type="text" class="input" placeholder="<?php _e('Pesquisar'); ?>">
						    <input id="searchsubmit" value="" type="submit" class="btn-search">
						</form>
					</div><!-- Options Page -->
				</div><!-- Content -->
			</div>
		</div>
	</div>
</div><!-- Page Header -->