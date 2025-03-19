<?php
/**
 * Utils
 */
if ( ! wp_next_scheduled( 'my_task_hook' ) ) {
  wp_schedule_event( time(), 'hourly', 'my_task_hook' );
}

add_action( 'my_task_hook', 'call_external_apis' );

function call_external_apis() {
    $facebook_feed = get_url(get_bloginfo('url') . '/api/facebook/get_feed/');
    $twitter_feed = get_url(get_bloginfo('url') . '/api/twitter/get_feed/');
}
/**
 * Debugs any value with <pre> tag wrapping it
 *
 * @param any $value Value to be debugged
 */
function debug($value) {
    if (!WP_DEBUG) {
        return;
    }

    echo '<pre class="debug">';
    var_dump($value);
    echo '</pre>';
}

/**
 * Debugs WordPress global $wp_query
 */
function debug_query() {
    if (!WP_DEBUG) {
        return;
    }

    global $wp_query;
    debug($wp_query);
}

/**
 * Populates array with values from an array
 *
 * @param array $target Array to be populated
 * @param array $values Values to populate $target
 * @param bool $beginning Populate unshifting array
 */
function populate_array(&$target, $values, $beginning = false) {
    if ($beginning) {
        if (isset($target)) {
            foreach ($target as $tgt) {
                $values[] = $tgt;
            }
        }
        $target = $values;
    } else {
        foreach ($values as $value) {
            $target[] = $value;
        }
    }
}

/**
 * Truncate text, keeping words and adding elipisis
 *
 * @param string $text The text to be truncated
 * @param int $length Text max characters
 * @param bool $words Keep full words
 * @return string $text
 */
function mkt_truncate($text, $length, $words = true, $elipsis = true)
{
    if (strlen($text) > $length) {

        // truncate text and remove any tags and shortcodes
        $text = substr(wp_strip_all_tags($text), 0, $length);
        $texto2 = strip_tags($text);

        // keep full words
        if ($words) {
            $text = substr($text, 0, strripos($text, " "));
            $texto2 = strip_tags($text);
        }

        // add elipsis
       if ($elipsis) {
            $texto2 .= "…";
       }
    }

    return $texto2;
}
/**
 * Verifica se a requisição é XHR.
 *
 * @return bool
 */
function isAjax()
{
    return (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
}