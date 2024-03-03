<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);
$scrollbar = wp_is_mobile() ? 'scrollbar' : '';


$classes = "breadcrumb {$attributes['variant']} breadcrumb-{$randomComponentId} {$scrollbar}";
function custom_breadcrumbs()
{
    $seta = "   
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='17' viewBox='0 0 10 17' fill='none'>
        <path d='M10 8.49995L1.89189 0.391846L-8.26972e-08 2.28374L6.21622 8.49995L-6.26136e-07 14.7162L1.89189 16.6081L10 8.49995Z' fill='white'/>
    </svg>";

    // Checks whether the current page is a WordPress page, post (standard or custom) or page
    if (is_singular()) {
        $language = "pt";

        // Gets the ID of the current page or post
        $current_id = get_queried_object_id();

        // Checks post type (post_type)
        $post_type = get_post_type($current_id);

        // Initializes the breadcrumbs variable
        $breadcrumbs = '';

        // Creates parts of the URL for later use
        $current_url = get_site_url() . $_SERVER['REQUEST_URI'];;
        $parte_url = explode('/', $current_url);

        if ($post_type != 'page') {
            $last_part_url = $language === 'pt' ? $parte_url[3] : $parte_url[4];
            $url_montada = $parte_url[0] . "/" . $parte_url[1] . "/" . $parte_url[2] . '/' . $last_part_url;

            if ($post_type === 'legado' || $post_type === "carreira-nas-pistas" || $post_type === "fora-das-pistas"  || $post_type === "memorias") {
                // If it is one of the selected custom post types, then add an extra link in the breadcrumb
                $titleMemory = $language === 'pt' ? 'Memorias' : 'Memoirs';
                $titleCarrer = $language === 'pt' ? 'Carreira nas pistas' : 'Carrer on the tracks';
                $titleLegacy = $language === 'pt' ? 'Legado' : 'Legacy';
                $titleOutTracks = $language === 'pt' ? 'Fora das pistas' : 'off the tracks';

                $parentLink =  $language === 'pt' ? 'jornada-senna' : 'journey-senna';
                $url_montada = $parte_url[0] . "/" . $parte_url[1] . "/" . $parte_url[2] . '/' . $parentLink;
                $title = $language === 'pt' ? 'Jornada Senna' : 'Senna Journey';
                $breadcrumbs .= '<a href="' . $url_montada . '">' . $title . '</a>' . $seta;

                $url_montada = $parte_url[0] . "/" . $parte_url[1] . "/" . $parte_url[2] . '/' . $parentLink . '/' . $last_part_url;


                if ($post_type === "memorias") {
                    $breadcrumbs .= '<a href="' . $url_montada . '">' . $titleMemory . '</a>' . $seta;
                } else if ($post_type === "legado") {
                    $breadcrumbs .= '<a href="' . $url_montada . '">' . $titleLegacy . '</a>' . $seta;
                } else if ($post_type === "carreira-nas-pistas") {
                    $breadcrumbs .= '<a href="' . $url_montada . '">' . $titleCarrer . '</a>' . $seta;
                } else if ($post_type === "fora-das-pistas") {
                    $breadcrumbs .= '<a href="' . $url_montada . '">' . $titleOutTracks . '</a>' . $seta;
                }
            } else {
                $breadcrumbs .= '<a href="' . $url_montada . '">' . str_replace('-', ' ', $post_type) . '</a>' . $seta;
            }
        }

        // Checks if it is a post, page, or custom post type
        if ($post_type === 'page' || $post_type === 'post' || $post_type === 'legado' || $post_type === "carreira-nas-pistas" || $post_type === "fora-das-pistas") {
            // Gets the ancestors of the current page or post
            $ancestors = get_post_ancestors($current_id);
            // Check for ancestors
            if (!empty($ancestors)) {
                // Reverse the order of ancestors
                $ancestors = array_reverse($ancestors);

                // Iterate through the ancestors and add the links to the breadcrumb
                foreach ($ancestors as $ancestor_id) {
                    $breadcrumbs .= '<a href="' . get_permalink($ancestor_id) . '">' . get_the_title($ancestor_id) . '</a>' . $seta;
                }
            }

            if (get_the_title($current_id) === "Memórias de um campeão" || get_the_title($current_id) === "Memoirs of a champion") {
                // If it is one of the selected custom post types, then add an extra link in the breadcrumb
                $parentLink =  $language === 'pt' ? 'jornada-senna' : 'journey-senna';
                $url_montada = $parte_url[0] . "/" . $parte_url[1] . "/" . $parte_url[2] . '/' . $parentLink;
                $title = $language === 'pt' ? 'Jornada Senna' : 'Senna Journey';
                $breadcrumbs .= '<a href="' . $url_montada . '">' . $title . '</a>' . $seta;
            }

            // Adds the title of the current page or post
            $breadcrumbs .= "<p>" . get_the_title($current_id) . "</p>";
        } else {
            // For custom post types, replace 'your_post_type' with the name of your custom post type
            // Add specific handling for custom post type
            if ($post_type === 'legado' || $post_type === "carreira-nas-pistas" || $post_type === "fora-das-pistas") {
                $breadcrumbs .=  "<p>" . str_replace('-', ' ', get_post_type($current_id)) . "</p>";
            } else if ($post_type === "memorias") {
                $breadcrumbs .= "<p>" . get_the_title($current_id) . "</p>";
            }
        }

        echo $breadcrumbs;
    }
}
?>

<div class="<?= $classes; ?>">
    </style>
    <div class="container">
        <?php custom_breadcrumbs() ?>
    </div>
</div>