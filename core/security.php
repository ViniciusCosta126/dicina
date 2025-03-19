<?php
add_filter( 'login_redirect', 'theme_redirect', 10, 3 );
add_action( 'init', 'verify_is_dashboard' );

/**
* Verifica se o usuário é assinante, caso positivo, não deixa acessar o dashboard do WP
*/
function verify_is_dashboard() {
	global $current_user;
	get_currentuserinfo();
	if ( isset( $current_user->roles ) && is_array( $current_user->roles ) ) {
		if ( in_array( 'subscriber', $current_user->roles ) ) {
			wp_redirect( PATH_URL.'/area-restrita' );
		}
	}
}

/**
* Faz verificação de segurança na página, somente acessa se estiver logado.
*/
function secure_page()
{
	if(is_user_logged_in()){
		return;
	}

	wp_redirect( wp_login_url() );
	exit;
}

/**
* Ao fazer login, redireciona o usuário para o painel especifico dele
*/
function theme_redirect( $redirect_to, $request, $user ) {
	global $user;
	if ( isset( $user->roles ) && is_array( $user->roles ) ) {
		if ( in_array( 'subscriber', $user->roles ) ) {
			return PATH_URL.'/area-restrita';
		} else {
			return $redirect_to;
		}
	} else {
		return $redirect_to;
	}
}