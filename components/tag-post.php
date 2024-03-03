<?php $tagsPost = get_field('tag_post'); if($tagsPost): ?>
    <div class="tag-post">
        <?php  if ( qtrans_getLanguage() == 'en' ): ?>
            <?php the_field('texto_tag_in'); ?>
        <?php else: ?>
            <?php the_field('texto_tag'); ?>
        <?php endif; ?>
    </div>
<?php endif; ?>