<?php
/**
 * Javascript Global Variables
 */
?>

<script>
    GLOBAL_VARS = {
    	//AJAX_HOLDER é onde o conteudo Ajax será carregado
    	MKT_AJAX: <?php echo MKT_AJAX ? 'true' : 'false' ?>,
        AJAX_HOLDER: '#container',
        // URL_BASE é a URL do tema
        URL_BASE: '<?php echo PATH_TEMPLATE ?>',
        ROOT_URL: '<?php echo PATH_URL ?>'
    };
</script>

<script src="<?php echo get_template_directory_uri(); ?>/assets/js/jquery.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/assets/js/vendors/inview.js"></script>

<script src="<?php echo get_template_directory_uri(); ?>/assets/js/source/default.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/assets/js/source/menu.js"></script>

<script src="<?php echo get_template_directory_uri(); ?>/assets/js/trackings.js"></script>