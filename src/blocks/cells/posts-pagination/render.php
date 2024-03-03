<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$language = function_exists('qtranxf_getLanguage') ? qtranxf_getLanguage() : "pt";

$currentPage = $attributes["currentPage"];
$totalPages = $attributes["totalPages"];

$firstItem = 1;
$lastItem = 4;

//Set first and last items
if ($totalPages >= 4) {
    $firstItem = $currentPage + 4 <= $totalPages ? $currentPage : $totalPages - 3;
    $lastItem = $currentPage + 4 <= $totalPages ? $currentPage + 3 : $totalPages;
} else {
    $firstItem = 1;
    $lastItem = $totalPages;
}

//remove one item in mobile (last or first)
$isFinalItems = $currentPage + 2 >= $totalPages ? true : false;

$http = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? $http = "https" : $http = "http";

$paramType = isset($_GET['q']) ? "&" : "?";
$current_uri = "{$http}://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$url = explode("{$paramType}pg=", $current_uri)[0];

$labelPrev = $language === "pt" ? "Anterior" : "Prev";
$labelNext = $language === "pt" ? "Próximo" : "Next";
?>

<div class="posts-pagination <?= $attributes["variant"] ?> posts-pagination-<?= $randomComponentId ?>">
    <style>
        .posts-pagination-<?= $randomComponentId ?> {
            margin-bottom: <?= $attributes["marginM"] ?>px;
        }

        @media (min-width: 768px) {
            .posts-pagination-<?= $randomComponentId ?> {
                margin-bottom: <?= $attributes["marginD"] ?>px;
            }
        }
    </style>

    <ul class="posts-pagination-list <?= $isFinalItems ? 'final-items' : '' ?>">
        <?php
        if ($totalPages > 1) :
            for ($i = $firstItem; $i <= $lastItem; $i++) :
                $active = $i == $currentPage ? 'active' : '';

                if ($i === $currentPage) :
        ?>
                    <li>
                        <div class="posts-pagination-list--link <?= $active; ?>"><?= $i < 10 ? 0 : ''; ?><?= $i; ?></div>
                    </li>
                <?php else : ?>
                    <li> <a href="<?= $url; ?><?= $paramType ?>pg=<?= $i; ?>" class="posts-pagination-list--link <?= $active; ?>"><?= $i < 10 ? 0 : ''; ?><?= $i; ?></a></li>
                <?php endif; ?>
            <?php endfor; ?>
        <?php endif; ?>

        <?php if ($totalPages > 3) : ?>
            <li>
                <?php if ($currentPage > 1) : ?>
                    <a href="<?= $url; ?><?= $paramType ?>pg=<?= $currentPage - 1; ?>" title="<?= $labelPrev ?>" class="posts-pagination-list--next">
                        <svg width="17" height="28" fill="none">
                            <path fill="#fff" d="M16.865 3.161 13.675 0 0 13.548l13.674 13.549 3.19-3.162L6.439 13.549 16.865 3.161Z" />
                        </svg>
                    </a>
                <?php else : ?>
                    <div class="posts-pagination-list--next disabled" aria-disabled="true">
                        <svg width="17" height="28" fill="none">
                            <path fill="#fff" d="M16.865 3.161 13.675 0 0 13.548l13.674 13.549 3.19-3.162L6.439 13.549 16.865 3.161Z" />
                        </svg>
                    </div>
                <?php endif; ?>
            </li>

            <li>
                <?php if ($currentPage < $totalPages) : ?>
                    <a href="<?= $url; ?><?= $paramType ?>pg=<?= $currentPage + 1; ?>" title="<?= $labelNext ?>" class="posts-pagination-list--next">
                        <svg width="17" height="28" fill="none">
                            <path fill="#fff" d="m-.002 23.936 3.191 3.162 13.674-13.549L3.19.001 0 3.162 10.424 13.55-.002 23.936Z" />
                        </svg>
                    </a>
                <?php else : ?>
                    <div class="posts-pagination-list--next disabled" aria-disabled="true">
                        <svg width="17" height="28" fill="none">
                            <path fill="#fff" d="m-.002 23.936 3.191 3.162 13.674-13.549L3.19.001 0 3.162 10.424 13.55-.002 23.936Z" />
                        </svg>
                    </div>
                <?php endif; ?>
            </li>
        <?php endif; ?>
    </ul>
</div>