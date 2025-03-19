<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
?>

<div class="tab-buttons <?= $attributes["variant"] ?> tab-buttons-<?= $randomComponentId ?>" id="<?= $attributes["id"] ?>">
    <?php
    echo "
        <style>
            .tab-buttons-{$randomComponentId} {
                background-color: {$attributes["bgColor"]};
                margin-bottom: {$attributes["marginM"]}px;
            }
    
            .tab-buttons-{$randomComponentId} .tab-bar .tab-bar-item {
                background: {$attributes["gradient"]};
            }
    
            @media (min-width: 768px) {
                .tab-buttons-{$randomComponentId} {
                    margin-bottom: {$attributes["marginD"]}px;
                }
            }
        </style>
        ";
    ?>

    <div class="content">
        <?= $content ?>
    </div>

    <div class="tab-bar">
        <span class="tab-bar-item"></span>
    </div>
</div>