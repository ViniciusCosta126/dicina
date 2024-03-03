<div class="<?php if(get_field('paginacao') == "1"): ?>pag-monaco <?php endif; ?>cover" style="background-image: url('<?php the_post_thumbnail_url('full'); ?>');">
	<div class="table">
		<div class="v-align middle">
				<div class="content">
					<?php if(get_field('paginacao') == "1"): ?>
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
					<?php else: ?>
						<div class="links">
							<?php the_component('components/breadcrumb'); ?>
						</div>
						<h1><?php the_title(); ?></h1>
						<?php the_component('components/voltar'); ?>
					<?php endif; ?>
				</div>
			</div>
	</div>
</div>

