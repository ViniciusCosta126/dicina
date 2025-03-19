<?php


function insert_candidate() {
    if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'insert_candidate_nonce' ) ) {
        // Nonce inválido; lidar com o erro, se necessário
        echo 'Nonce inválido.';
        wp_die();
    }
    // Verifica o nonce
    // Lógica para processar os dados do formulário
    $nome = sanitize_text_field($_POST['nome']);
    $email = sanitize_email($_POST['email']);
    $telefone = sanitize_text_field($_POST['telefone']);
    $vaga = sanitize_text_field($_POST['vaga']);

    // Tratamento do arquivo de currículo
    $uploaded_file = $_FILES['curriculo'];
    $upload_overrides = array('test_form' => false);
    $movefile = wp_handle_upload($uploaded_file, $upload_overrides);

    
    if ($movefile && !isset($movefile['error'])) {
        // Arquivo de currículo foi enviado com sucesso
        
        $file_path = $movefile['file'];

        // Configurar cabeçalhos do email
        $to = 'viniciuscosta126@gmail.com'; // Substitua pelo endereço de email do destinatário
        $subject = 'Novo candidato para a vaga: ' . $vaga;
        $headers[] = 'From: ' . $nome . ' <' . $email . '>';
        $headers[] = 'Content-Type: text/html';

        // Corpo do email
        $message = "Nome: $nome<br>";
        $message .= "Email: $email<br>";
        $message .= "Telefone: $telefone<br>";
        $message .= "Vaga desejada: $vaga<br>";
       

        // Anexo (se enviado)
        $attachments = array($file_path);
        //dd($attachments);

        // Enviar email
        $mail_sent = wp_mail($to, $subject, $message, $headers, $attachments);

        dd($mail_sent);
        // Responder ao cliente
        if ($mail_sent) {
            echo 'Formulário enviado com sucesso!';
        } else {
            echo 'Erro ao enviar o formulário. Verifique os logs do WordPress para mais informações.';
        }
    } else {
        // Ocorreu um erro ao enviar o arquivo
        echo 'Erro: ' . $movefile['error'];
    }

    // Importante: encerrar a execução do script
    wp_die();
}



add_action('wp_ajax_insert_candidate', 'insert_candidate');
add_action('wp_ajax_nopriv_insert_candidate', 'insert_candidate');