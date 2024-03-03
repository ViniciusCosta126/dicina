<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="degrade-border-text <?= $attributes["variant"] ?> degrade-border-text-<?= $randomComponentId ?>">
  <style>
		.degrade-border-text-<?= $randomComponentId ?> {
        	background-color: <?= $attributes["bgColor"] ?>;
			margin-bottom: <?= $attributes["marginM"] ?>px;
			font-family: 'HelveticaNeue';
			text-transform: capitalize;
			color: white;
			-webkit-background-clip: text;
			-webkit-text-stroke: 8px transparent;
		}

        @media (min-width: 768px) {
            .degrade-border-text-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px
            }
        }
    </style>

    <?= $content ?>
</div>