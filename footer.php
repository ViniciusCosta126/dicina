<?= block_template_part("footer"); ?>

<!-- Cookie Banner -->
<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script>

<?php
the_component('components/javascript-globals');

/**
 * Default scripts of the webpage
 */
global $js;

$default_scripts = array('js/trackings.js', 'js/vendors/jquery.mCustomScrollbar.concat.min.js', 'js/vendors/mascara.js');

populate_array($js, $default_scripts, true);

get_scripts();

wp_footer();
?>
</body>

</html>
