<section class="brand-description">
	<style>
		.brand-description {
			background-color: <?= $attributes['bgColor'] ?>;
		}
	</style>

	<div class="container default">
		<?= $content ?>

		<div class="img-wrapper">
			<div class="rect"></div>

			<picture>
				<source media="(min-width:1024px)" srcset="/wp-content/themes/Template-blocks/images/logo-branco-desk.png" />
				<img class="img" src="/wp-content/themes/Template-blocks/images/logo-branco.png" />
			</picture>
		</div>
	</div>
</section>