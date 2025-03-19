<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$mode = $attributes["mode"] ? "data-mode='{$attributes["mode"]}'" : '';
$animateIn = $attributes["animateIn"] ? "data-animateIn='{$attributes["animateIn"]}'" : '';
$animateOut = $attributes["animateOut"] ? "data-animateOut='{$attributes["animateOut"]}'" : '';
$navigation = $attributes["navigation"] ? "data-navigation='true'" : "data-navigation='false'";
$navigationDesk = $attributes["navigationDesktop"] ? "data-navigationDesk='true'" : "data-navigationDesk='false'";
$dots = $attributes["dots"] ? "data-dots='true'" : "data-dots='false'";
$centered = $attributes["centered"] ? "data-centered='true'" : "data-centered='false'";
$autoWidth = $attributes["autoWidth"] ? "data-autoWidth='true'" : "data-autoWidth='false'";
$autoHeight = $attributes["autoHeight"] ? "data-autoHeight='true'" : "data-autoHeight='false'";
$loop = $attributes["loop"] ? "data-loop='true'" : "data-loop='false'";
$isVertical = $attributes["isVertical"] ? "data-isVertical='true'" : "data-isVertical='false'";
$autoplay = $attributes["autoplay"] ? "data-autoplay='true'" : "data-autoplay='false'";
$speed = $attributes["speed"] ? "data-speed='{$attributes["speed"]}'" : '';
$autoplayTimeout = $attributes["autoplayTimeout"] ? "data-autoplayTimeout='{$attributes["autoplayTimeout"]}'" : '';
$gutter = $attributes["gutter"] ? "data-gutter='{$attributes["gutter"]}'" : '';
$gutterDesktop = $attributes["gutterDesktop"] ? "data-gutterDesktop='{$attributes["gutterDesktop"]}'" : '';
$perView = $attributes["perView"] ? "data-perView='{$attributes["perView"]}'" : '';
$perView480 = $attributes["perView480"] ? "data-perView480='{$attributes["perView480"]}'" : '';
$perView768 = $attributes["perView768"] ? "data-perView768='{$attributes["perView768"]}'" : '';
$perView960 = $attributes["perView960"] ? "data-perView960='{$attributes["perView960"]}'" : '';
$perView1366 = $attributes["perView1366"] ? "data-perView1366='{$attributes["perView1366"]}'" : '';
$destroy = $attributes["destroy"] ? "data-destroy='true'" : "data-destroy='false'";
$destroyIn = $attributes["destroyIn"] ? "data-destroyIn='{$attributes["destroyIn"]}'" : '';
$controlsText = $attributes["controlsText"] ? "controlsText='true'" : "controlsText'";
$sort = $attributes["sort"] ? "data-sort='true'" : "data-sort='false'";
$id = "data-id='{$attributes["id"]}'";
$delay = $attributes["delay"] != "" ? "data-delay='{$attributes["delay"]}'" : '';
$selfGoTo = $attributes["selfGoTo"] ? "data-selfGoTo='true'" : "data-selfGoTo='false'";
$otherGoTo = $attributes["otherGoTo"] ? "data-otherGoTo='true'" : "data-otherGoTo='false'";
$otherGoToId = "data-otherGoToId='{$attributes["otherGoToId"]}'";
$forceHeightTransition = $attributes["forceHeightTransition"] ? "data-forceHeightTransition='true'" : "data-forceHeightTransition='false'";
$getHigher = $attributes["getHigher"] ? "data-getHigher='true'" : "data-getHigher='false'";

$sliderProps = "{$id} {$delay} {$mode} {$animateIn} {$animateOut} {$navigation} {$navigationDesk} {$dots} {$centered} {$loop} {$autoWidth} {$gutter} {$autoHeight} {$gutterDesktop} {$perView} {$perView480} {$perView768} {$perView960} {$perView1366} {$autoplay} {$speed} {$autoplayTimeout} {$destroy} {$destroyIn} {$controlsText} {$sort}  {$selfGoTo} {$otherGoTo} {$otherGoToId} {$forceHeightTransition} {$getHigher}";
?>

<div <?= $sliderProps ?> class="carousel <?= $attributes["variant"] ?> <?= $attributes["extraClass"] ?> carousel-<?= $randomComponentId ?>">
    <style>
        .carousel-<?= $randomComponentId ?> {
            background-color: <?= $attributes["bgColor"] ?>;
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .carousel-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <div class="carousel-content">
        <?= $content ?>
    </div>
</div>