<?php
/**
 * Content
 */
?>

<article class="post">
    <header class="post__header">
        <h1 class="post__title"><a href="<?php the_permalink(); ?>" class='ajax'><?php the_title(); ?></a></h1>
        <?php the_component('components/post-meta'); ?>
    </header>

    <div class="post__summary">
        <?php the_excerpt(); ?>
    </div>
</article>
