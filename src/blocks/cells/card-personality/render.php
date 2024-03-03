<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$modalID = $attributes["modalId"];
$videoID = $attributes["videoId"];
$openModal = $attributes["modalId"] !== "" ? "open-modal" : "";

$classes = "card-personality {$attributes['variant']} card-personality-{$randomComponentId} {$openModal}";
$indexId = $attributes['indexId']
?>

<div class="<?= $classes; ?>" data-id="<?= $modalID ?>" data-indexId="<?= $indexId; ?>">
    <div class="card-personality__content">
        <img src="<?= $attributes["smallImage"]["src"] ?>" alt="<?= $attributes["smallImage"]["alt"] ?>" />
    </div>

    <?php if ($attributes["hasVideo"]) : ?>
        <svg class="card-personality__play" viewBox="0 0 24 24" fill="none">
            <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#000000"></path>
        </svg>
    <?php else : ?>
        <div class="title-card-container">
            <p><?= $attributes['titleCard'] ?></p>
        </div>
    <?php endif; ?>
</div>

<?php if ($attributes["hasVideo"]) : ?>
    <?= do_blocks('<!-- wp:il/modal {"id": "' . $modalID . '", "videoID": "' . $videoID . '", "youtubeVideo": true} /-->'); ?>
<?php endif; ?>