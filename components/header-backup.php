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

$postsByLegado = new WP_Query([
	'posts_per_page' => -1,
	'post_type' => 'legado',
	'orderby' => 'date',
	'order' => 'ASC',
	'hierarchical' => 0,
	'post_parent' => 0,
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
								<a href="<?= home_url() ?>" class="menu-link">
									<?= __('#MeuAyrton', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('/quem-foi-ayrton-senna') ?>" class="menu-link">
									<?= __('Quem foi Senna', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('/noticias') ?>" class="menu-link">
									<?= __('Notícias', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('senna-tv') ?>" class="menu-link">
									<?= __('Senna TV', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="https://www.ayrtonsennashop.com.br/" target="_blank" class="menu-link">
									<?= __('Produtos', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item">
								<a href="<?= home_url('/quem-foi-ayrton-senna') ?>" class="menu-link">
									<?= __('Memorial', 'ayrton-senna') ?>
								</a>
							</li>
							<li class="submenu-item mobile">
								<a href="<?= home_url('/newsletter') ?>" class="menu-link">
									<?= __('Newsletter', 'ayrton-senna') ?>
								</a>
							</li>            
							<li class="submenu-item mobile">
								<a href="<?= home_url('/fale-conosco') ?>" class="menu-link">
									<?= __('Fale Conosco', 'ayrton-senna') ?>
								</a>
							</li>            
							<li class="submenu-item mobile">
								<a href="<?= home_url('/perguntas-frequentes') ?>" class="menu-link">
									<?= __('Perguntas Frequentes', 'ayrton-senna') ?>
								</a>
							</li>            
							<li class="submenu-item mobile">
								<a href="<?= home_url('/politica-de-uso') ?>" class="menu-link">
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
								<button class="menu-title-icon">
									<svg nable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
								</button>
								<a href="<?= home_url('/piloto') ?>" class="menu-title-text">piloto</a>
							</div>    
							<ul class="submenu">
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
											<span class="submenu-title">
												<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
											</span>

											<ul class="submenu-subitems">
												<?php foreach ($secondaryItems as $item): ?>
													<li class="submenu-subitem">
														<a href="<?= bloginfo('url') . "/$item->post_type/$item->post_name/" ?>" class="submenu-sublink"><?= $item->post_title ?></a>
													</li>
												<?php endforeach ?>
											</ul>
										<?php else: ?>
											<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
										<?php endif ?>
									</li>     
								<?php endwhile ?>
								<?php wp_reset_postdata() ?>
							</ul>
						</div>
						<div class="menu-container" data-tag="second">
							<div class="menu-title" data-color="second">
								<button class="menu-title-icon">
									<svg nable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
								</button>
								<a href="<?= home_url('idolo') ?>" class="menu-title-text">idolo</a>
							</div>    
							<ul class="submenu">
								<?php while ($postsByIdolo->have_posts()): $postsByIdolo->the_post() ?>
									<?php 
										$postID = get_the_ID();

										$secondaryItems = get_posts([
											'post_type'        => 'idolo',
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
											<span class="submenu-title">
												<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
											</span>

											<ul class="submenu-subitems">
												<?php foreach ($secondaryItems as $item): ?>
													<li class="submenu-subitem">
														<a href="<?= bloginfo('url') . "/$item->post_type/$item->post_name/" ?>" class="submenu-sublink"><?= $item->post_title ?></a>
													</li>
												<?php endforeach ?>
											</ul>
										<?php else: ?>
											<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
										<?php endif ?>
									</li>     
								<?php endwhile ?>
								<?php wp_reset_postdata() ?>
							</ul>
						</div>
						<div class="menu-container" data-tab="third">
							<div class="menu-title" data-color="third">
								<button class="menu-title-icon">
									<svg nable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
								</button>
								<a href="<?= home_url('legado') ?>" class="menu-title-text">legado</a>
							</div>    
							<ul class="submenu">
								<?php while ($postsByLegado->have_posts()): $postsByLegado->the_post() ?>
									<?php 
										$postID = get_the_ID();

										$secondaryItems = get_posts([
											'post_type'        => 'legado',
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
											<span class="submenu-title">
												<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
											</span>

											<ul class="submenu-subitems">
												<?php foreach ($secondaryItems as $item): ?>
													<li class="submenu-subitem">
														<a href="<?= bloginfo('url') . "/$item->post_type/$item->post_name/" ?>" class="submenu-sublink"><?= $item->post_title ?></a>
													</li>
												<?php endforeach ?>
											</ul>
										<?php else: ?>
											<a href="<?php the_permalink() ?>" class="menu-link"><?php the_title() ?></a>
										<?php endif ?>
									</li>     
								<?php endwhile ?>
								<?php wp_reset_postdata() ?>
							</ul>
						</div>
					</li>
				</ul>
			</nav>
		</div>
	</header>

	<?php /*
		<div class="menu">

			<nav class="main-menu">
				<ul class="menus-geral">
					<div class="menu-primeiro">
						<li class="item-esquerda highlight">
							<div class="menuHigh someMenu">
								<a href="<?php echo esc_url(get_permalink( get_page_by_path( 'quem-meu-ayrton' ) )); ?>">#MEUAYRTON</a>
							</div>
						</li>
					
						<li class="item-esquerda highlight breakpoint">
							<div class="menuHigh someMenu">
								<a href="<?php echo esc_url(get_permalink( get_page_by_path( 'quem-foi-ayrton-senna' ) )); ?>">QUEM FOI SENNA</a>
							</div>
						</li>

						<div class="menu-segundo">
							<!-- piloto -->
							<li class="highlight">
								<div class="menuHigh">
									<button class="subArrow subLevelOne" data-open=".submenu.piloto">
										<svg class="piloto" enable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
									</button>
									<a class="menu-piloto" href="<?php echo get_post_type_archive_link('piloto'); ?>"><?php _e('O Piloto', 'ayrton-senna') ?></a>
								</div>
								<?php
									$args = array(
										'posts_per_page' => -1,
										'post_type' => 'piloto',
										'orderby' => 'date',
										'order' => 'ASC',
										'hierarchical' => 0,
										'post_parent' => 0,
									);
									query_posts($args);

									if (have_posts()) :
								?>
								<div class="submenu piloto <?php if (function_exists('qtrans_getLanguage')): if( qtrans_getLanguage() == 'en' ): echo "ingles"; endif; endif; ?>">
									<div class="container">
										<div class="holder">
											<ul class="level-one">
												<?php
													while (have_posts()) : the_post();
													$idPost = get_the_ID();
												?>
												<li id="<?php echo $idPost; ?>">

													<?php
														$secondary = get_posts( array(
															'post_type'        => 'piloto',
															'posts_per_page'   => -1,
															'child_of'         => $idPost,
															'post_parent'      => $idPost,
															'orderby'          => 'menu_order',
															'order'            => 'asc',
															//'post_status'      => 'publish',
														)); 
													?>

													<?php if ( count( $secondary ) ) { ?>
														<div class="menuHigh li-subnivel">
															<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
														</div>
													<?php
														}else{ ?>
														<a class="menuHigh li-subnivel" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
													<?php }
													?>
												</li>
												<?php
													endwhile;
												?>
											</ul>
										</div>
									</div>
								</div>
								<?php endif; wp_reset_query();?>
							</li>

							<!-- idolo -->
							<li class="highlight">
								<div class="menuHigh">
									<button class="subArrow subLevelOne" data-open=".submenu.idolo">
										<svg class="idolo" enable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
									</button>
									<a class="menu-idolo" href="<?php echo get_post_type_archive_link('idolo'); ?>"><?php _e('O ídolo', 'ayrton-senna') ?></a>
								</div>

								<?php
								$args = array(
									'posts_per_page' => -1,
									'post_type' => 'idolo',
									'orderby' => 'date',
									'order' => 'ASC',
									'hierarchical' => 0,
									'post_parent' => 0,
								);

								query_posts($args);

								if (have_posts()) :
								?>
								<div class="submenu idolo <?php if (function_exists('qtrans_getLanguage')): if( qtrans_getLanguage() == 'en' ): echo "ingles"; endif; endif; ?>">
									<div class="container">
										<div class="holder">
											<ul class="level-one">
												<?php
												while (have_posts()) : the_post();
													$idPost = get_the_ID();
												?>
												<li id="<?php echo $idPost; ?>">
													<?php
													$secondary = get_posts( array(
													'post_type'        => 'idolo',
													'posts_per_page'   => -1,
													'child_of'         => $idPost,
													'post_parent'      => $idPost,
													'orderby'          => 'date',
													'order'            => 'ASC',
													'post_status'      => 'publish'
													) ); ?>

													<?php if ( count( $secondary ) ) { ?>
														<div class="menuHigh li-subnivel">
															<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
														</div>
														<?php
														}else{ ?>
															<a class="menuHigh li-subnivel" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
														<?php }
													?>
												</li>
												<?php
													endwhile;
												?>
												<li>
													<div class="menuHigh li-subnivel">
														<a href="http://www.ayrtonsenna.com.br/memorial/" target="_blank">Memorial</a>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<?php endif; wp_reset_query();?>
							</li>

							<!-- legado -->
							<li class="highlight">
								<div class="menuHigh">
									<button class="subArrow subLevelOne" data-open=".submenu.legado">
										<svg class="legado" enable-background="new 0 0 443.307 443.306" height="443.306" viewBox="0 0 443.307 443.306" width="443.307" xmlns="http://www.w3.org/2000/svg"><path d="m415.934 212.799-379.146-210.702c-4.377-2.474-8.138-2.758-11.278-.855-3.14 1.902-4.708 5.328-4.708 10.276v420.262c0 4.952 1.569 8.381 4.708 10.284 3.14 1.902 6.901 1.622 11.278-.855l379.146-210.703c4.381-2.478 6.571-5.434 6.571-8.856 0-3.426-2.191-6.376-6.571-8.851z"/></svg>
									</button>
									<a class="menu-legado" href="<?php echo get_post_type_archive_link('legado'); ?>"><?php _e('O Legado', 'ayrton-senna') ?></a>
								</div>
								<?php
									$args = '';
									$args = array(
										'posts_per_page' => -1,
										'post_type' => 'legado',
										'orderby' => 'date',
										'order' => 'ASC',
										'hierarchical' => 0,
										'post_parent' => 0,
									);

									query_posts($args);

									if (have_posts()):
								?>
								<div class="submenu legado  <?php if (function_exists('qtrans_getLanguage')): if( qtrans_getLanguage() == 'en' ): echo "ingles"; endif; endif; ?>">
									<div class="container">
										<div class="holder">
											<ul class="level-one">
												<?php
													$secondary = '';
													while (have_posts()) : the_post();
													$idPost = get_the_ID();
												?>
												<li id="<?php echo $idPost; ?>">
													<?php
														$secondary = get_posts( array(
															'post_type'        => 'legado',
															'posts_per_page'   => -1,
															'child_of'         => $idPost,
															'post_parent'      => $idPost,
															'orderby'          => 'date',
															'order'            => 'ASC',
															'post_status'      => 'publish'
														) ); ?>

														<?php if ( count( $secondary ) ) { ?>
															<div class="menuHigh li-subnivel">
																<a href="<?php the_permalink(); ?>">
																	<?php the_title(); ?> 
																</a>
															</div>
														<?php
														}else{ ?>
															<a class="menuHigh li-subnivel" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
														<?php }
													?>
												</li>
												<?php
													endwhile;
												?>
											</ul>
										</div>
									</div>
								</div>
								<?php endif; wp_reset_query();?>
							</li>
						</div>

						<li class="item-esquerda"><a class="someMenu smaller" href="<?php echo get_site_url(); ?>/noticias/"><?php _e('Notícias','ayrton-senna') ?></a></li>
						<li class="item-esquerda"><a class="someMenu smaller" href="<?php echo get_site_url(); ?>/sennatv/"><?php _e('Senna TV','ayrton-senna') ?></a></li>
						<?php if (qtranxf_getLanguage() == 'en'): ?>
							<li class="highlight">
								<a class="someMenu" href="http://www.ayrtonsennashop.com" target="_blank"><?php _e('Produtos','ayrton-senna') ?></a>
							</li>
						<?php else: ?>
							<li class="highlight">
								<a class="someMenu" href="http://www.ayrtonsennashop.com.br" target="_blank"><?php _e('Produtos','ayrton-senna') ?></a>
							</li>
						<?php endif; ?>		

						<li class="highlight">
							<div class="menuHigh someMenu">
								<a href="https://www.ayrtonsenna.com.br/quem-foi-ayrton-senna/">MEMORIAL </a>
							</div>
						</li>
						
						<img class="risquinhos" src="<?php echo get_template_directory_uri(); ?>/assets/images/risquinhos.png" alt="Ayrton Senna" />

						<li class="item-esquerda " style="display:none"><a class="someMenu" href="http://www.ayrtonsenna.com.br/senna-experience/" target="_blank">Senna Experience</a></li>

						<li class="item-esquerda mobile"><a class="someMenu" href="<?php the_permalink(132); ?>">Newsletter</a></li>

						<li class="item-esquerda mobile"><a class="someMenu" href="<?php the_permalink(134); ?>"><?php _e('Fale Conosco','ayrton-senna') ?></a></li>

						<li class="item-esquerda mobile"><a class="someMenu" href="<?php the_permalink(130); ?>"><?php _e('Perguntas Frequentes','ayrton-senna') ?></a></li>

						<li class="item-esquerda mobile"><a class="someMenu" href="<?php echo get_site_url(); ?>/politica-de-uso/"><?php _e('Política de Uso','ayrton-senna') ?></a></li>
					</div>

				</ul>
			</nav>

		</div>
	</div>
*/ ?>