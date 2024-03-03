<?php
/**
 * Layout Loader
 *
 * Loads the right layout with the right content inside it
 */

ob_start();
    include mkt_template_path();
    $content = ob_get_contents();
ob_end_clean();

//Para funcionar requisições AJAX, colocar essa linha no wp-config
//define('MKT_AJAX', true);

if(MKT_AJAX === true && isAjax()){
	$layout = 'ajax';
}

$layout = isset($layout) ? $layout : 'default';

the_component('layouts/'.$layout, array(
    'content' => $content
));