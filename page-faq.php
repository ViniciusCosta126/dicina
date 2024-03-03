<?php

/**
 * Template Name: Legado - FAQ
 */

require_once ABSPATH . "/wp-content/themes/Template-blocks/inc/legacy.php";

$css = ['css/faq.css', 'css/interna.css'];
$js = ['js/source/faq.js'];

get_header(null, ['header' => 'visible']);
?>

<section class="page">
	<?php the_component('components/cover'); ?>
	<div class="conteudo">
		<div class="content container">
			<?php the_content(); ?>
		</div>
	</div>
	<div class="page-content">
		<div class="content container">
			<section class="faq">
				<?php
				$itens = 0;
				if (have_rows('list-aq')) :
					while (have_rows('list-aq')) :
						the_row(); ?>
						<?php if ($itens == 0) : ?>
							<article class="faqeach">
								<h3><?php the_sub_field('pergunta'); ?></h3>
								<div class="texto">
									<p><?php the_sub_field('resposta'); ?></p>
								</div>
							</article>
						<?php else : ?>
							<article class="faqeach ">
								<h3><?php the_sub_field('pergunta'); ?></h3>
								<div class="texto">
									<p><?php the_sub_field('resposta'); ?></p>
								</div>
							</article>
						<?php endif; ?>
				<?php $itens++;
					endwhile;
				else :
				endif;
				?>
			</section>
			<aside class="aside">
				<div class="block-blue fale">
					<a href="/fale-com-a-gente">
						<span class="table">
							<span class="v-align middle">
								<h3 class="titulo">
									<?php _e('FALE CONOSCO', 'ayrton-senna'); ?>
								</h3>
								<p>
									<?php _e(
										'Não encontrou a resposta que procurava?<br> Entre em contato conosco e envie sua dúvida ou sugestão que responderemos o mais rápido possível.',
										'ayrton-senna'
									); ?>
								</p>
							</span>
						</span>
					</a>
				</div>
			</aside><!-- Aside -->
		</div>
	</div>
</section><!-- Page Content -->
<?php get_footer(); ?>