

<?php 

global $post;

$parentId = $post->post_parent;
$linkToParent = get_permalink($parentId);
$hasParent = wp_get_post_parent_id( $post->ID );	
?>
<?php if (!$hasParent == 0): ?>
	<a href="<?php echo $linkToParent; ?>" class="voltarPage"><?php _e('Voltar','ayrton-senna') ?></a>
<?php endif ?>