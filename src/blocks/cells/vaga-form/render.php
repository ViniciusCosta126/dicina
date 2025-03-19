<?php
// avoid global style change when there is more than 1 of same component in editor
$randomComponentId = random_int(1, 10000);

$classes = "vaga-form {$attributes['variant']} vaga-form-{$randomComponentId}";

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
        .vaga-form-<?= $randomComponentId ?> {
            background-color:
                <?= $attributes["bgColor"] ?>
            ;
            margin-bottom:
                <?= $attributes["marginM"] ?>
                px;
        }

        @media (min-width: 768px) {
            .vaga-form-<?= $randomComponentId ?> {
                margin-bottom:
                    <?= $attributes["marginD"] ?>
                    px;
            }
        }
    </style>

    <form id="candidate-form" action="<?= get_site_url() ?>/wp-admin/admin-ajax.php?action=insert_candidate"
        class="form" method="post" enctype="multipart/form-data">
        <?php $nonce = wp_create_nonce('insert_candidate_nonce'); ?>
        <input type="hidden" name="nonce" value="<?php echo $nonce; ?>">

        <fieldset class='wrapper-input'>
            <label htmlFor="nome">Seu nome</label>
            <input type="text" name="nome" id="nome" placeholder="Digite seu nome" />
        </fieldset>
        <fieldset class='wrapper-input'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Digite seu Email" />
        </fieldset>
        <fieldset class='wrapper-input'>
            <label htmlFor="telefone">Seu telefone</label>
            <input type="text" name="telefone" id="telefone" placeholder="Digite seu telefone" />
        </fieldset>
        <fieldset class='wrapper-input'>
            <label htmlFor="vaga">Vaga desejada</label>
            <select name="vaga" id="vaga">
                <?php foreach ($posts as $post): ?>
                    <?php setup_postdata($post); ?>
                    <option value="<?= get_field('titulo_vaga', $post->ID) ?>">
                        <?= get_field('titulo_vaga', $post->ID) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </fieldset>
        <fieldset class='wrapper-input'>
            <label htmlFor="curriculo">Anexar currículo (PDF até 5MB)</label>
            <input type="file" name="curriculo" id="curriculo" />
        </fieldset>
        <fieldset class='wrapper-input'>
            <button type="submit">Enviar</button>
        </fieldset>
    </form>
</div>