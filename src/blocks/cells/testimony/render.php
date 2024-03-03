<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$hasSignature = $attributes['hasSignature'];
$signature = $attributes['signature'];
$signatureClass = $hasSignature ? 'has-signature' : '';
?>

<div class="testimony <?= $attributes['variant'] ?> <?= $signatureClass ?> testimony-<?= $randomComponentId ?>">
    <style>
        .testimony-<?= $randomComponentId ?> {
            margin-bottom: <?= $attributes['marginM'] ?>px;
        }

        @media (min-width: 768px) {
            .testimony-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes['marginD'] ?>px;
            }
        }
    </style>


    <svg class="quotation-marks top" viewBox="0 0 60 42">
        <path fill="<?= $attributes['svgColor'] ?>" d="M0 0v42l22.5-21V0H0Zm37.5 0v42L60 21V0H37.5Z" />
    </svg>

    <?= $content ?>

    <svg class="quotation-marks bottom" viewBox="0 0 60 42">
        <path fill="<?= $attributes['svgColor'] ?>" d="M60 42V0L37.5 21v21H60Zm-37.5 0V0L0 21v21h22.5Z" />
    </svg>

    <?php if ($hasSignature) : ?>
        <img class="signature" src="<?= $signature['src'] ?>" alt=<?= $signature['alt'] ?> height=<?= $signature['height'] ?> width=<?= $signature['width'] ?> />
    <?php endif; ?>
</div>