<?php
namespace Libsyn;

class Ajax extends \Libsyn {

	/*								*/
	/* 	WP Ajax Declarations		*/
	/*								*/


	/**
	 * Handles WP callback to send variable to trigger AJAX response.
	 *
	 * @since 1.2.1
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_update_libsyn_postmeta($vars) {
		$vars[] = 'update_libsyn_postmeta';
		return $vars;
	}

	/**
	 * Handles WP callback to send variable to trigger AJAX response.
	 *
	 * @since 1.0.1.1
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_load_form_data($vars) {
		$vars[] = 'load_libsyn_media';
		return $vars;
	}

	/**
	 * Handles WP callback to send variable to trigger AJAX response.
	 *
	 * @since 1.0.1.1
	 * @param array $vars
	 *
	 * @return mixed
	 */
	public static function plugin_add_trigger_remove_ftp_unreleased( $vars ) {
		$vars[] = 'remove_ftp_unreleased';
		return $vars;
	}

	/**
	 * Handles WP callback to send variable to trigger AJAX response.
	 *
	 * @since 1.0.1.1
	 * @param array $vars
	 *
	 * @return mixed
	 */
	public static function plugin_add_trigger_load_player_settings( $vars ) {
		$vars[] = 'load_player_settings';
		return $vars;
	}


	/**
	 * Handles retrieval of player shortcode via ajax
	 *
	 * @since 1.2.1
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_player_shortcode($vars) {
		$vars[] = 'libsyn_player_shortcode';
		return $vars;
	}

	/**
	 * Handles WP callback to send variable to trigger AJAX response.
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_check_ajax($vars) {
		$vars[] = 'libsyn_check_url';
		return $vars;
	}

	/**
	 * Handles WP callback to send variable to trigger AJAX response.
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_phpinfo($vars) {
		$vars[] = 'libsyn_phpinfo';
		return $vars;
	}

	/**
	 * Handles WP callback to send variable to trigger AJAX response.
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_debuginfo($vars) {
		$vars[] = 'libsyn_debuginfo';
		return $vars;
	}

	/**
	 * Handles WP callback to save ajax settings
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_oauth_settings($vars) {
		$vars[] = 'libsyn_oauth_settings';
		return $vars;
	}

	/**
	 * Handles WP callback to clear outh settings
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_update_oauth_settings($vars) {
		$vars[] = 'libsyn_update_oauth_settings';
		return $vars;
	}

	/**
	 * Handles WP callback to load Powerpress Feed
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_pploadfeed($vars) {
		$vars[] = 'libsyn_pploadfeed';
		return $vars;
	}

	/**
	 * Handles Ajax create new post
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_create_new_post($vars) {
		$vars[] = 'libsyn_create_new_post';
		return $vars;
	}

	/**
	 * Handles Ajax create metadata
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_create_metadata($vars) {
		$vars[] = 'libsyn_create_metadata';
		return $vars;
	}

	/**
	 * Handles Ajax add player to post
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_add_player($vars) {
		$vars[] = 'libsyn_add_player';
		return $vars;
	}

	/**
	 * Handles Ajax imports runner
	 *
	 * @since 1.2.2.7
	 * @param array $vars
	 *
	 * @return array
	 */
	public static function plugin_add_trigger_libsyn_run_import($vars) {
		$vars[] = 'libsyn_run_import';
		return $vars;
	}


	/*								*/
	/* 	Normal Methods				*/
	/*								*/

	/**
	 * Renders a simple ajax page to check against and test the ajax urls
	 *
	 *
	 * @since 1.2.2.7
	 *
	 * @return void
	 */
	public static function checkAjax() {
		$error = true;
		$checkUrl  = \Libsyn\Utilities::getCurrentPageUrl();
		if ( function_exists('wp_parse_str') ) {
			wp_parse_str($checkUrl, $urlParams);
		} else {
			parse_str($checkUrl, $urlParams);
		}
		if ( intval($urlParams['libsyn_check_url']) === 1 ) {
			$error = false;
			$json = 'true';

			//set output
			header('Content-Type: application/json');
			if ( !$error ) echo json_encode($json);
				else echo json_encode(array());
			exit;
		}
	}

}
