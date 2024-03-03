<?php
// Função para obter tempo de leitura de um post
function reading_time($language)
{
    $post = get_post();
    $content = get_post_field('post_content', $post->ID);
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200);

    if ($reading_time == 1) {
        $timer = $language == 'pt' ? ' min de leitura' : ' min read';
    } else {
        $timer = $language == 'pt' ? ' min de leitura' : ' min read';
    }

    $total_reading_time = $reading_time . $timer;

    return $total_reading_time;
}
