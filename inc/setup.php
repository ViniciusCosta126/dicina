<?php

define('DISALLOW_FILE_EDIT', false);

/**
 * Register theme menus.
 */
function register_menus()
{
	register_nav_menus([
		"nav-header" => "Cabeçalho",
		"nav-header-short" => "Cabeçalho Curto",
		"nav-header-short-press" => "Cabeçalho Curto Imprensa",
		"nav-header-short-journey" => "Cabeçalho Curto Jornada",
		"nav-navigation-journey" => "Navegação Jornada",
		"nav-footer" => "Rodapé",
		"nav-social-links" => "Links Social Midia",

		"en-nav-header" => "Cabeçalho Inglês",
		"en-nav-header-short" => "Cabeçalho Curto Inglês",
		"en-nav-header-short-press" => "Cabeçalho Curto Imprensa Inglês",
		"en-nav-header-short-journey" => "Cabeçalho Curto Jornada Inglês",
		"en-nav-navigation-journey" => "Navegação Jornada Inglês",
		"en-nav-footer" => "Rodapé Inglês",
		"en-nav-social-links" => "Links Social Midia Inglês",
	]);
}
add_action("init", "register_menus");

/**
 * Allow excerpt to all pages.
 */
add_post_type_support('page', 'excerpt');

/**
 * Allow SVG and Webp uploads.
 */
function cc_mime_types($mimes)
{
	$mimes["svg"] = "image/svg+xml";
	$mimes["webp"] = "image/webp";
	return $mimes;
}
add_filter("upload_mimes", "cc_mime_types");

/**
 * Get style.css version and add as query string to renew cache.
 * @param string $src source url
 * @return string new source with version
 */
function update_css_and_js_version($src)
{
	$version = wp_get_theme()->get("Version");
	$src = add_query_arg("ver", $version, $src);
	return esc_url($src);
}

/**
 * Force update cache changing version at style.css
 */
function update_version()
{
	add_filter("style_loader_src", "update_css_and_js_version", 9999);
	add_filter("script_loader_src", "update_css_and_js_version", 9999);
}
add_action("init", "update_version");

/**
 * Disable the emoji's
 */
function disable_emojis()
{
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_styles', 'print_emoji_styles');
	remove_filter('the_content_feed', 'wp_staticize_emoji');
	remove_filter('comment_text_rss', 'wp_staticize_emoji');
	remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
	add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
	add_filter('wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2);
}
add_action('init', 'disable_emojis');

/**
 * Filter function used to remove the tinymce emoji plugin.
 *
 * @param array $plugins
 * @return array Difference betwen the two arrays
 */
function disable_emojis_tinymce($plugins)
{
	if (is_array($plugins)) {
		return array_diff($plugins, array('wpemoji'));
	} else {
		return array();
	}
}

/**
 * Remove emoji CDN hostname from DNS prefetching hints.
 *
 * @param array $urls URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed for.
 * @return array Difference betwen the two arrays.
 */
function disable_emojis_remove_dns_prefetch($urls, $relation_type)
{
	if ('dns-prefetch' == $relation_type) {
		/** This filter is documented in wp-includes/foilatting.php */
		$emoji_svg_url = apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/');

		$urls = array_diff($urls, array($emoji_svg_url));
	}

	return $urls;
}

function increment_post_views_count()
{
	if (is_single()) {
		$post_id = get_queried_object_id();
		$views = get_post_meta($post_id, 'post_views_count', true);
		$views = ($views) ? $views + 1 : 1;
		update_post_meta($post_id, 'post_views_count', $views);
	}
}

add_action('wp', 'increment_post_views_count');

// GET Json With CURL
function getWithCURL($url)
{
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

	$data = curl_exec($curl);
	$result = json_decode($data);

	curl_close($curl);

	return $result;
}


// Legacy functions
function getLanguageUrl($lang)
{
	$fullUrl = $_SERVER['REQUEST_URI'];
	$fullUrl = str_replace('/en/', '/', $fullUrl);
	$fullUrl = str_replace('/br/', '/', $fullUrl);
	$uri = str_replace(get_site_url(), '', $fullUrl);
	$finalUrl = get_site_url() . '/' . $lang . $uri;

	return $finalUrl;
}



// Insert metadata and scripts in head
function insertInHead()
{
	?>
	<!-- Cookie Banner -->
	<!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
	<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script> -->

	<!-- RSS Feed -->
	<link rel="alternate" type="application/+xml" href="<?php bloginfo('rss2_url'); ?>">

	<?php if ($_SERVER['HTTP_HOST'] === ''): ?>
		<!-- Google Tag Manager -->
		<script rel="onload" as="script">
			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					'gtm.start': new Date().getTime(),
					event: 'gtm.js'
				});
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != 'dataLayer' ? '&l=' + l : '';
				j.async = true;
				j.src =
					'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', 'GTM-5HQZJ7P');
		</script>

		<script rel="onload" as="script">
			(function (i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function () {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
				a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

			ga('create', 'UA-46058599-1', 'auto');
			ga('send', 'pageview');
		</script>

		<!-- Google tag (gtag.js) -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-J347XJL2KF"></script>
		<script>
			window.dataLayer = window.dataLayer || [];

			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-J347XJL2KF');
		</script>

		<script rel="onload" as="script">
			(function (h, o, t, j, a, r) {
				h.hj = h.hj || function () {
					(h.hj.q = h.hj.q || []).push(arguments)
				};
				h._hjSettings = {
					hjid: 1168674,
					hjsv: 6
				};
				a = o.getElementsByTagName('head')[0];
				r = o.createElement('script');
				r.async = 1;
				r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
				a.appendChild(r);
			})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
		</script>
	<?php endif;
}

add_action('wp_head', 'insertInHead');
