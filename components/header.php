<?php
/**
 * Header
 */

global $disableMainMenu;

$postsByPiloto = new WP_Query([
	'posts_per_page' => -1,
	'post_type' => 'piloto',
	'orderby' => 'date',
	'order' => 'ASC',
	'hierarchical' => 0,
	'post_parent' => 0,
]);

$postsByIdolo = new WP_Query([
	'posts_per_page' => -1,
	'post_type' => 'idolo',
	'orderby' => 'date',
	'order' => 'ASC',
	'hierarchical' => 0,
	'post_parent' => 0,
]);

if ( $post = get_page_by_path( 'marcas', OBJECT, 'legado' ) )
    $postIDMarcas = $post->ID;
else
    $postIDMarcas = 0;

$postsByLegado = new WP_Query([
	'posts_per_page' => -1,
	'post_type' => 'legado',
	'orderby' => 'date',
	'order' => 'ASC',
	'hierarchical' => 0,
	'post_parent' => 0,	
	'post__not_in ' => array($postIDMarcas),
]);

$postsInsideLegado = get_posts([
	'post_type'        => 'legado',
	'posts_per_page'   => -1,
	'child_of'         => $postIDMarcas,
	'post_parent'      => $postIDMarcas,
	'orderby'          => 'menu_order',
	'order'            => 'asc',
	'post_status'      => 'publish',
	
]);


?>

<header class="header">
	<div class="container">
		
		<div class="flex-menu">
			<div class="anchor-button">
				<div class="menu-anchor">
					<span class="line first"></span>
					<span class="line second"></span>
					<span class="line third"></span>
				</div>
			</div>

			<div class="logo">
				<a href="<?php echo get_site_url(); ?>/" class="main-logo">
					<img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-white.png" alt="Ayrton Senna" class="logo-white" />
				</a>
			</div>

			<div class="sec-flex-menu">
				<div class="flags">
					<div class="flags__content">
						<a href="#<?php //echo getLanguageUrl('en'); ?>" class="flags__uk"></a>
						<a href="#<?php //echo getLanguageUrl('pt'); ?>" class="flags__br"></a>
					</div>
				</div>

				<div class="top">
					<ul class="social-menu">
						<li><a href="https://www.facebook.com/oficialayrtonsenna" target="_blank" data-social="Facebook"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/svg/facebook.svg" alt="Facebook" class="svg" /></a></li>

						<li><a href="https://twitter.com/ayrtonsenna" target="_blank" data-social="Twitter"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/svg/twitter.svg" alt="Twitter" class="svg" /></a></li>

						<li><a href="https://www.instagram.com/oficialayrtonsenna/" target="_blank" data-social="Instagram"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/svg/instagram.svg" alt="Instagram" class="svg" /></a></li>

						<li><a href="https://www.youtube.com/channel/UCMNHx0v3CePF3RFNs3mr0vg" target="_blank" data-social="YouTube"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/svg/youtube.svg" alt="YouTube" class="svg" /></a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="menu">
			<nav class="main-menu">
				<ul class="menu-list">
					<li class="menu-item first">
						<ul class="submenu">
							<li class="submenu-item">
								<a href="<?= home_url('/mundo-senna') ?>" class="menu-link gtm-mundo-senna">
									<?= __('Campanha #MundoSenna', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('/quem-foi-ayrton-senna') ?>" class="menu-link gtm-quem-foi-ayrton-senna">
									<?= __('Quem foi Ayrton Senna', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('/noticias') ?>" class="menu-link gtm-noticias">
									<?= __('Notícias', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('senna-tv') ?>" class="menu-link gtm-senna-tv">
									<?= __('Senna TV', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item highlight">
								<span class="submenu-title gtm-loja-dropdown-icon-1">
									<a class="menu-link gtm-loja-dropdown-link-1">
										<?= __('Loja Oficial', 'ayrton-senna') ?>
									</a>
								</span>
								<ul class="submenu-subitems" style="column-count: 1">
									<li class="submenu-subitem">
										<a href="https://www.sennashop.com.br/" target="_blank" class="submenu-sublink gtm-loja-dropdown-item-1">
										<?= __('BRASIL', 'ayrton-senna') ?>
										</a>
									</li>									
									<li class="submenu-subitem">
										<a href="https://www.sennashop.com/en/home/" target="_blank" class="submenu-sublink gtm-loja-dropdown-item-1">
										<?= __('INTERNACIONAL', 'ayrton-senna') ?>
										</a>
									</li>									
								</ul>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('/memorial') ?>" class="menu-link gtm-memorial">
									<?= __('Memorial', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item mobile">
								<a href="<?= home_url('/newsletter') ?>" class="menu-link gtm-newsletter">
									<?= __('Newsletter', 'ayrton-senna') ?>
								</a>
							</li>            
							<li class="submenu-item mobile">
								<a href="<?= home_url('/fale-conosco') ?>" class="menu-link gtm-fale-conosco">
									<?= __('Fale Conosco', 'ayrton-senna') ?>
								</a>
							</li>            
							<li class="submenu-item mobile">
								<a href="<?= home_url('/perguntas-frequentes') ?>" class="menu-link gtm-perguntas-frequentes">
									<?= __('Perguntas Frequentes', 'ayrton-senna') ?>
								</a>
							</li>            
							<li class="submenu-item mobile">
								<a href="<?= home_url('/politica-de-uso') ?>" class="menu-link gtm-politica-de-uso">
									<?= __('Política de Uso', 'ayrton-senna') ?>
								</a>
							</li>            
						</ul>
					</li>
					<li class="menu-item line">
						<span></span>
						<span></span>
						<span></span>
					</li>
					<li class="menu-item second">
						<div class="menu-container" data-tab="first">
							<div class="menu-title" data-color="first">
								<button class="menu-title-icon gtm-piloto-button">
									<svg nable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
								</button>
								<a href="<?= home_url('/piloto') ?>" class="menu-title-text gtm-piloto-link"><?= __('piloto', 'ayrton-senna') ?></a>
							</div>    
							<ul class="submenu">
								<?php $pilotoCounter = 1; ?>
								<?php while ($postsByPiloto->have_posts()): $postsByPiloto->the_post() ?>
									<?php 
										$postID = get_the_ID();

										$secondaryItems = get_posts([
											'post_type'        => 'piloto',
											'posts_per_page'   => -1,
											'child_of'         => $postID,
											'post_parent'      => $postID,
											'orderby'          => 'menu_order',
											'order'            => 'asc',
											'post_status'      => 'publish'
										]);
									?>

									<li class="submenu-item <?= count($secondaryItems) > 0 ? 'highlight' : '' ?>">
										<?php if (count($secondaryItems) > 0): ?>
											<span class="submenu-title gtm-piloto-dropdown-icon-<?= $pilotoCounter ?>">
												<a href="<?php the_permalink() ?>" class="menu-link gtm-piloto-dropdown-link-<?= $pilotoCounter ?>"><?php the_title() ?></a>
											</span>

											<ul class="submenu-subitems">
												<?php $dropdown = 1; ?>
												
												<?php foreach ($secondaryItems as $item): ?>
													<li class="submenu-subitem">
														<a href="<?= bloginfo('url') . "/$item->post_type/$item->post_name/" ?>" class="submenu-sublink gtm-piloto-dropdown-item-<?= $dropdown ?>"><?= $item->post_title ?></a>
													</li>

													<?php $dropdown++; ?>
												<?php endforeach ?>
											</ul>

										<?php else: ?>
											<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
										<?php endif ?>
									</li>     

									<?php $pilotoCounter++; ?>
								<?php endwhile ?>
								<?php wp_reset_postdata() ?>
							</ul>
						</div>
						<div class="menu-container" data-tag="second">
							<div class="menu-title" data-color="second">
								<button class="menu-title-icon gtm-idolo-button">
									<svg nable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
								</button>
								<a href="<?= home_url('idolo') ?>" class="menu-title-text gtm-idolo-link"><?= __('idolo', 'ayrton-senna') ?></a>
							</div>    
							<ul class="submenu">
								
								<li class="submenu-item highlight">
									<a href="<?= home_url('/meu-ayrton') ?>" class="menu-link gtm-meu-ayrton">
										<?= __('#MeuAyrton', 'ayrton-senna') ?>
									</a>
								</li>
								
								<?php /*
								<li class="submenu-item highlight">
									<span class="submenu-title gtm-idolo-dropdown-icon-1">
										<a href="<?= home_url('/idolo/55-anos-de-ayrton-senna/') ?>" class="menu-link gtm-piloto-dropdown-link-1">
											<?= __('55 ANOS DE AYRTON SENNA', 'ayrton-senna') ?>
										</a>
									</span>

									<ul class="submenu-subitems">
										<li class="submenu-subitem">
											<a href="<?= home_url('/55-anos-de-ayrton-senna/anuario-da-f1-1988-1988-011/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-1">
												<?= __('ANUÁRIO DA F1 – 1988', 'ayrton-senna') ?>
											</a>
										</li>
									</ul>
								</li> */ ?>
								
								<li class="submenu-item highlight">
									<a href="<?= home_url('/idolo/infancia/') ?>" class="menu-link">
										<?= __('Infância', 'ayrton-senna') ?>
									</a>
								</li>
								<li class="submenu-item highlight">
									<span class="submenu-title gtm-idolo-dropdown-icon-1">
										<a  <?php // href=" <?= home_url('/idolo/55-anos-de-ayrton-senna/') ?> class="menu-link gtm-piloto-dropdown-link-1">
											<?= __('Atitude Ayrton Senna', 'ayrton-senna') ?>
										</a>
									</span>

									<ul class="submenu-subitems">
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/atitude-ayrton-senna/perfil/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-1">
												<?= __('Perfil', 'ayrton-senna') ?>
											</a>
										</li>
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/atitude-ayrton-senna/hobbies/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-2">
												<?= __('Hobbies', 'ayrton-senna') ?>
											</a>
										</li>
									</ul>
								</li>
								<li class="submenu-item highlight">
									<span class="submenu-title gtm-idolo-dropdown-icon-1">
										<a <?php // href="<?= home_url('/idolo/55-anos-de-ayrton-senna/') ?> class="menu-link gtm-piloto-dropdown-link-1">
											<?= __('Memórias', 'ayrton-senna') ?>
										</a>
									</span>

									<ul class="submenu-subitems">
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/memorias/ferias-de-verao/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-1">
												<?= __('Férias de Verão', 'ayrton-senna') ?>
											</a>
										</li>
									</ul>
								</li>
								<li class="submenu-item highlight">
									<a href="<?= home_url('/idolo/amigo/') ?>" class="menu-link">
										<?= __('Amigos', 'ayrton-senna') ?>
									</a>
								</li>
								<li class="submenu-item highlight">
									<span class="submenu-title gtm-idolo-dropdown-icon-1">
										<a class="menu-link gtm-piloto-dropdown-link-1">
											<?= __('Ayrton Senna: O Legado', 'ayrton-senna') ?>
										</a>
									</span>

									<ul class="submenu-subitems">
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/ayrton-para-sempre-legado/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-1">
												<?= __('O Legado', 'ayrton-senna') ?>
											</a>
										</li>
																								
										<?php foreach ($postsInsideLegado as $item): ?>
											<li class="submenu-subitem">
												<a href="<?= bloginfo('url') . "/$item->post_type/$item->post_name/" ?>" class="submenu-sublink gtm-legado-dropdown-item-<?= $dropdown ?>"><?= $item->post_title ?></a>
											</li>
										<?php endforeach ?>

									</ul>
								</li>
								<li class="submenu-item highlight">
									<a href="<?= home_url('/idolo/fotos-pessoais/') ?>" class="menu-link">
										<?= __('Fotos Pessoais', 'ayrton-senna') ?>
									</a>
								</li>
								<li class="submenu-item highlight">
									<span class="submenu-title gtm-idolo-dropdown-icon-1">
										<a href="<?= home_url('/idolo/galeria/') ?>" class="menu-link gtm-piloto-dropdown-link-1">
											<?= __('Galeria', 'ayrton-senna') ?>
										</a>
									</span>

									<ul class="submenu-subitems">
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/galeria/itens-de-corrida/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-1">
												<?= __('Itens de Corrida', 'ayrton-senna') ?>
											</a>
										</li>
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/galeria/galeria-diversos/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-2">
												<?= __('Galeria Diversos', 'ayrton-senna') ?>
											</a>
										</li>
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/galeria/gp-brasil-2014/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-3">
												<?= __('GP Brasil 2014', 'ayrton-senna') ?>
											</a>
										</li>
										<li class="submenu-subitem">
											<a href="<?= home_url('/idolo/galeria/exposicao-senna-na-cabeca-e-no-coracao/') ?>" class="submenu-sublink gtm-idolo-dropdown-item-4">
												<?= __('Exposição – Senna na Cabeça e no Coração', 'ayrton-senna') ?>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div class="menu-container" data-tab="third">
							<div class="menu-title" data-color="third">
								<button class="menu-title-icon gtm-legado-button">
									<svg nable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
								</button>
								<a href="<?= home_url('legado') ?>" class="menu-title-text gtm-legado-link"><?= __('legados', 'ayrton-senna') ?></a>
							</div>    
							<ul class="submenu">
								<?php $legadoCounter = 1; ?>
								<?php while ($postsByLegado->have_posts()): $postsByLegado->the_post() ?>
									<?php $page_slug = get_post_field('post_name'); ?>
									<?php 
										$postID = get_the_ID();
										
										$secondaryItems = get_posts([
											'post_type'        => 'legado',
											'posts_per_page'   => -1,
											'child_of'         => $postID,
											'post_parent'      => $postID,
											'orderby'          => 'menu_order',
											'order'            => 'asc',
											'post_status'      => 'publish',
										]);
										
									?>
									<?php if($page_slug <> 'marcas') : ?>
										<li class="submenu-item <?= count($secondaryItems) > 0 ? 'highlight' : '' ?>">
											<?php if (count($secondaryItems) > 0): ?>
												<span class="submenu-title gtm-legado-dropdown-icon-<?= $legadoCounter ?>">
													<a href="<?php the_permalink() ?>" class="menu-link gtm-legado-dropdown-link-<?= $pilotoCounter ?>"><?php the_title() ?></a>
												</span>

												<ul class="submenu-subitems">
													<?php $dropdown = 1; ?>
													
													<?php foreach ($secondaryItems as $item): ?>
														
														<li class="submenu-subitem">
															<a href="<?= bloginfo('url') . "/$item->post_type/$item->post_name/" ?>" class="submenu-sublink gtm-legado-dropdown-item-<?= $dropdown ?>"><?= $item->post_title ?></a>
														</li>
														
														<?php $dropdown++; ?>
													<?php endforeach ?>
												</ul>
											<?php else: ?>
												<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
											<?php endif ?>
										</li>
									<?php endif ?>
									
									<?php $legadoCounter++; ?>
								<?php endwhile ?>
								<?php wp_reset_postdata() ?>
							</ul>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	</header>