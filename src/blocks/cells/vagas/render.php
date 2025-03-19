<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "vagas {$attributes['variant']} vagas-{$randomComponentId}";

$args = array(
    'post_type' => 'vagas',
    'posts_per_page' => -1,
    'orderby' => 'date',
    'order' => 'ASC',
);

$posts = get_posts($args);

?>

<div class="<?= $classes; ?>">
    <style>
        .vagas-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            margin-bottom:
                <?= $attributes["marginM"] ?>
                px;
        }

        @media (min-width: 768px) {
            .vagas-<?= $randomComponentId ?> {
                margin-bottom:
                    <?= $attributes["marginD"] ?>
                    px;
            }
        }
    </style>
    <?= $content ?>

    <?php foreach ($posts as $post): ?>
        <?php setup_postdata($post); ?>

        <div class="vaga">
            <h2 class="vaga__title">
                <?= get_field('titulo_vaga', $post->ID) ?>
            </h2>
            <div class="vaga__info">
                <p class="titulo">Descrição</p>
                <p class="info">
                    <?= get_field('descricao', $post->ID) ?>
                </p>

            </div>
            <div class="vaga__info">
                <p class="titulo">Requisitos</p>
                <p class="info">
                    <?= get_field('requisitos', $post->ID) ?>
                </p>
            </div>
        </div>

    <?php endforeach; ?>

</div>