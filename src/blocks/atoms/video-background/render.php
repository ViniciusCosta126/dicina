<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="video-background video-background-<?= $randomComponentId ?>">
    <?php if($attributes["cardVideo"]):?>
        <video muted loop poster="<?= $attributes["cardimg"]["src"] ?>" >
            <source src="<?= $attributes["cardVideo"]["src"] ?>" type="video/mp4"/>
        </video>
	<?php else:?>
        <img
            loading="eager"
            src="<?= $attributes["cardimg"]["src"] ?>"
            alt="<?= $attributes["cardimg"]["alt"] ?>"
            class="logo">
        </img>
	<?php endif;?>
</div>