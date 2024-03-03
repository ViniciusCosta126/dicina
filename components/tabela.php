<?php


$gridLargada = get_field('grid_de_largada-s');
$aCorrida 	 = get_field('a_corrida-s');
$classGeral  = get_field('classificacao_geral-s');
$aTemporada  = get_field('temporada-s');

if (empty($gridLargadagada)){
	$gridLargadagada = "0";
}
if (empty($aCorrida)){
	$aCorrida = "0";
}

if (empty($classGeral)){
	$classGeral = "0";
}

if(empty($aTemporada)){
	$aTemporada = "0";
}

?>
<div class="tabelas-content">
	<div class="content">
		<?php 
			$tabela = get_field('tp-tabela'); 

			if(!is_array($tabela))
				$tabela = array($tabela);
			$senna = 0;
			if(in_array('resumo-corrida', $tabela) && in_array('senna-in-race', $tabela)):
				$senna = 1;
				$tabela = 'resumo-corrida';
			elseif(in_array('resumo-temporada', $tabela) && in_array('senna-in-race', $tabela)):
				$senna = 1;
				$tabela = 'resumo-temporada';
			elseif(in_array('resumo-corrida', $tabela)):
				$tabela = 'resumo-corrida';
			elseif(in_array('senna-in-race', $tabela)):
				$senna = 1;
			elseif(in_array('resumo-temporada', $tabela)):
				$tabela = 'resumo-temporada';
			endif;
			if($tabela == "resumo-temporada"):
		?>
			<?php if($classGeral == '1' && $aTemporada == '0'): ?>
				<button class="btn-tabela active full" data-alvo="#tabela-um"><?php echo __('Classificação geral', 'ayrton-senna') ?></button>
			<?php elseif($aTemporada == '1' && $classGeral == '0'): ?>
				<button class="btn-tabela active full" data-alvo="#tabela-dois"><?php echo __('Temporada de', 'ayrton-senna') ?> <?php the_title(); ?></button>
			<?php elseif($classGeral == '1' && $aTemporada == '1'): ?>
				<button class="btn-tabela active" data-alvo="#tabela-um"><?php echo __('Classificação geral', 'ayrton-senna') ?></button>
				<button class="btn-tabela" data-alvo="#tabela-dois"><?php echo __('Temporada de', 'ayrton-senna') ?> <?php the_title(); ?></button>
			<?php endif; ?>
		<?php elseif($tabela == "resumo-corrida"): ?>
			<?php if ($gridLargada == '1' && $aCorrida == '0'): ?>
				<h3 class="ttl-resumo"><?php _e('Resumo da Corrida','ayrton-senna') ?></h3>
				<button class="btn-tabela active full" data-alvo="#tabela-um"><?php echo __('Grid de Largada', 'ayrton-senna') ?></button>
			<?php elseif($aCorrida == '1' && $gridLargada == '0'): ?>
				<h3 class="ttl-resumo"><?php _e('Resumo da Corrida','ayrton-senna') ?></h3>
				<button class="btn-tabela active full" data-alvo="#tabela-dois"><?php echo __('A Corrida', 'ayrton-senna') ?></button>
			<?php elseif($gridLargada == '1' && $aCorrida == '1'): ?>
				<h3 class="ttl-resumo"><?php _e('Resumo da Corrida','ayrton-senna') ?></h3>
				<button class="btn-tabela active" data-alvo="#tabela-um"><?php echo __('Grid de Largada', 'ayrton-senna') ?></button>
				<button class="btn-tabela" data-alvo="#tabela-dois"><?php echo __('A Corrida', 'ayrton-senna') ?></button>
			<?php endif ?>
		<?php endif; ?>
		<div id="tabela-um" class="tabela-show <?php if($gridLargada  == '1' && $aCorrida == '0' || $gridLargada  == '1' && $aCorrida == '1' || $classGeral == '1' && $aTemporada == '0' || $classGeral == '1' && $aTemporada == '1'): ?>active
			<?php elseif($classGeral == '1' && $aTemporada == '0' || $classGeral == '1' && $aTemporada == '1' ):?> <?php endif;?>" >
			<?php 
				if($tabela == "resumo-temporada"):
			?>
			<div class="tabela">
				<table>
					<thead>
						<tr>
							<td><?php echo __('Colocação:', 'ayrton-senna') ?></td>
							<td><?php echo __('Piloto:', 'ayrton-senna') ?></td>
							<td><?php echo __('Pontos:', 'ayrton-senna') ?></td>
						</tr>	
					</thead>
					<tbody>
				
					<?php

						if( have_rows('resumo_da_temporada') ):

			    			while ( have_rows('resumo_da_temporada') ) : the_row();

			        			while ( have_rows('class-geral') ) : the_row(); 
			       ?>
			       		<tr>
				        	<td><?php the_sub_field('pilo-coloc'); ?></td>
				        	<td><?php the_sub_field('pilo-nome'); ?></td>
				        	<td><?php the_sub_field('pilo-pontos'); ?></td>
			        	</tr>
			        <?php endwhile; endwhile;  endif; ?>	
						
					</tbody>
				</table>
			</div>
		<?php elseif($tabela == "resumo-corrida" && $gridLargada == '1'): ?>
			<div class="tabela duas-colunas">
				<ul>
					<?php
						$posicao = 1;
						if( have_rows('resumo_corrida') ):

			    			while ( have_rows('resumo_corrida') ) : the_row();

			        			while ( have_rows('grid-largada') ) : the_row(); 
			        			
			       ?>
					<li>
						<span class="posicao"><?= $posicao; ?></span> <?php the_sub_field('grid-piloto'); ?>
						<?php $posicao++; ?>
					</li>
					 <?php endwhile;   endwhile;  endif; ?>	
				</ul>
			</div>
		<?php endif; ?>
		</div><!-- Tabela 1 -->
		<div id="tabela-dois" class="tabela-show <?php if($classGeral  == '0' && $aTemporada == '1' || $aCorrida == '1' && $gridLargada  == '0'): ?>active
		<?php elseif($classGeral == '0' && $aTemporada == '1'):?> <?php endif;?>">
			<?php 
				if($tabela == "resumo-temporada" && $aTemporada == '1'):
			?>
			<div class="tabela temporada">

				<table>
					<tbody>
				
					<?php

						if( have_rows('resumo_da_temporada') ):

			    			while ( have_rows('resumo_da_temporada') ) : the_row();

			        			while ( have_rows('temporada') ) : the_row(); 
			       ?>
			       		<tr>
				        	<td><?php echo __('Equipe', 'ayrton-senna')?></td>
				        	<td class="icone equipe"><?php the_sub_field('temp-equipe'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Carro', 'ayrton-senna')?></td>
				        	<td class="icone carro"><?php the_sub_field('temp-carro'); ?></td>
				        </tr>	
				        <tr>
				        	<td><?php echo __('Total de provas', 'ayrton-senna')?></td>
				        	<td class="icone total-provas"><?php the_sub_field('temp-provas'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Vitórias', 'ayrton-senna')?></td>
				        	<td class="icone vitorias"><?php the_sub_field('temp-vitorias'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Poles', 'ayrton-senna')?></td>
				        	<td class="icone poles"><?php the_sub_field('temp-poles'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Pódios', 'ayrton-senna')?></td>
				        	<td class="icone podium"><?php the_sub_field('temp--podios'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Melhores Voltas', 'ayrton-senna')?></td>
				        	<td class="icone melhores-volta"><?php the_sub_field('temp-mvoltas'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Abandonos', 'ayrton-senna')?></td>
				        	<td class="icone abandono"><?php the_sub_field('temp-abandonos'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Pontos', 'ayrton-senna')?></td>
				        	<td class="icone pontos"><?php the_sub_field('temp-pontos'); ?></td>
				        </tr>
				        <tr>
				        	<td><?php echo __('Classificação no Campeonato', 'ayrton-senna')?></td>
				        	<td class="icone class-camp"><?php the_sub_field('temp-class'); ?></td>
				        </tr>
			        	</tr>
			        <?php endwhile; endwhile;  endif; ?>	
						
					</tbody>
				</table>
				
			</div>
		<?php elseif($tabela == "resumo-corrida" &&  $aCorrida == '1'): ?>
			<div class="tabela temporada">
				<table>
				<?php

						if( have_rows('resumo_corrida') ):

			    			while ( have_rows('resumo_corrida') ) : the_row();

			        			while ( have_rows('a-corrida') ) : the_row(); 
			       ?>
					<tr>
						<td><?php echo __('Voltas', 'ayrton-senna') ?></td>
						<td class="icone laps"><?php the_sub_field('corri-voltas') ?></td>
					</tr>
					<tr>
						<td><?php echo __('Tempo', 'ayrton-senna'); ?></td>
						<td class="icone weather"><?php the_sub_field('corri-tempo') ?></td>
					</tr>
					<tr>
						<td><?php echo __('Volta mais rápida', 'ayrton-senna'); ?></td>
						<td class="icone fastes-lap"><?php the_sub_field('corri-vrapida') ?></td>
					</tr>
					<tr>
						<td><?php echo __('Podium', 'ayrton-senna'); ?></td>
						
						<td class="icone podium">
							<?php $pod = 1;
							while ( have_rows('podium') ) : the_row();  ?>
								<span class="posi-piloto"><?= $pod; ?>º <?php the_sub_field('pod-npiloto') ?></span>
							<?php  $pod++; endwhile;  ?>
						</td>
					</tr>
					<tr>
						<td><?php echo __('Carros', 'ayrton-senna'); ?></td>
						<td class="icone carro"><?php the_sub_field('corri-carros') ?></td>
					</tr>
					<tr>
						<td><?php echo __('Abandonos', 'ayrton-senna'); ?></td>
						<td class="icone abandono"><?php the_sub_field('corri-abandonos') ?></td>
					</tr>
				<?php endwhile; endwhile;  endif; ?>
				</table>
			</div>
		<?php endif; ?>	
		</div><!-- Tabela Dois -->
		<?php if($senna == 1): ?>
			<?php

				if( have_rows('senna-in-race') ):

			    	while ( have_rows('senna-in-race') ) : the_row();
			?>
			<div class="tabela">
				<h3 class="ttl-resumo"><?php echo __('Senna na corrida', 'ayrton-senna') ?></h3>
				<div class="tabela temporada">
					<table>
						<tr>
							<td><?php echo __('Posição de largada', 'ayrton-senna') ?></td>
							<td class="icone laps"><?php the_sub_field('pos-init') ?></td>
						</tr>
						<tr>
							<td><?php echo __('Posição final', 'ayrton-senna'); ?></td>
							<td class="icone class-camp"><?php the_sub_field('pos-final') ?></td>
						</tr>
						<tr>
							<td><?php echo __('Melhor volta', 'ayrton-senna'); ?></td>
							<td class="icone melhores-volta"><?php the_sub_field('mel-volta') ?></td>
						</tr>
						<tr>
							<td><?php echo __('Pontos somados para o Campeonato', 'ayrton-senna'); ?></td>
							<td class="icone pontos"><?php the_sub_field('ponts-soma'); ?></td>
						</tr>
						<tr>
					        <td><?php echo __('Posição no Campeonato após a prova', 'ayrton-senna')?></td>
					        <td class="icone class-camp"><?php the_sub_field('pos-dep-corr'); ?></td>
					    </tr>
					</table>
						<?php
							$fraseIngles = get_sub_field('oque-disse_en');
							$frasePortugues = get_sub_field('oque-disse');
					    ?>
							

					
					    <?php if(qtrans_getLanguage() === 'en'): ?>
								<?php if(!empty($fraseIngles)): ?>
									<div class="tabela-falow"><?php echo __('O que disse após a prova', 'ayrton-senna')?></div>
				                	<div class="text-disse"><?php echo $fraseIngles;  ?></div>
								<?php endif; ?>
				            <?php elseif(qtrans_getLanguage() === 'pt'): ?>
								<?php if(!empty($frasePortugues)): ?>
									<div class="tabela-falow"><?php echo __('O que disse após a prova', 'ayrton-senna')?></div>
				                	<div class="text-disse"><?php the_sub_field('oque-disse'); ?></div>
								<?php endif; ?>
				            <?php endif; ?>	
				</div>
			</div>
		<?php endwhile; endif; ?>
		<?php endif; ?>
	</div><!-- Content -->
</div>