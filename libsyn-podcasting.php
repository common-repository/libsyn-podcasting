<?php
/**
 * Plugin Name:       Libsyn Publisher Hub
 * Plugin URI:        https://wordpress.org/plugins/libsyn-podcasting/
 * Description:       Post or edit Libsyn Podcast episodes directly through Wordpress.
 * Tags:			  libsyn, podcast, podcasting, audio, video, liberated syndication, publisher hub, hosting
 * Version:           1.4.4
 * Requires PHP:      7.4
 * Requires at least: 5.1
 * Tested up to:	  6.3.1
 * Author:            Libsyn
 * Author URI:        https://support.libsyn.com/kb/libsyn-publisher-hub/
 * License:           GPL v3 or later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Update URI:        https://wordpress.org/plugins/libsyn-podcasting/
 * Text Domain:       libsyn-podcasting
 * Domain Path:       /languages
 */

define("LIBSYN_NS", "libsynmodule_");
define("LIBSYN_PLUGIN_ROOT", dirname(__FILE__));
define("LIBSYN_DIR", basename(LIBSYN_PLUGIN_ROOT));
define("LIBSYN_ADMIN_DIR", basename(dirname(__FILE__)) . DIRECTORY_SEPARATOR . "admin" . DIRECTORY_SEPARATOR);
define("LIBSYN_TEXT_DOMAIN", "libsyn-podcasting");

//include plugin.php to run is_plugin_active() check
if(file_exists(ABSPATH . 'wp-admin' . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . 'plugin.php')) {
	include_once( ABSPATH . 'wp-admin' . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . 'plugin.php' );
}



//if plugin is active declare plugin
if( is_plugin_active(LIBSYN_DIR . DIRECTORY_SEPARATOR . LIBSYN_DIR.'.php') ) {

	/**
	 * Invoke LPH functions
	 * Includes actions and filters and other global properties
	 * such as Oembed support and Player shortcode support
	 *
	 * @since 1.0.1.6
	 */
	if ( file_exists(plugin_dir_path( __FILE__ ) . 'admin' . DIRECTORY_SEPARATOR . 'functions.php') ) {
		require_once(plugin_dir_path( __FILE__ ) . 'admin' . DIRECTORY_SEPARATOR . 'functions.php');
	}

	global $libsyn_notifications;

	// foreach(build_libsyn_includes_original('admin') as $include) { //NOTE: old include @see functions.php @deprecated 1.3.1
	foreach(build_libsyn_includes('admin') as $include) {
		libsyn_include_file($include);
	}

	/* Declare Plugin */
	$plugin = new \Libsyn\Service();
	//check for Logger
	$checkMinimumPhpVersion = \Libsyn\Service\Integration::getInstance()->checkMinimumPhpVersion();
	if ( $checkMinimumPhpVersion ) {
		foreach(build_libsyn_logger_includes('admin') as $include) {
			if(file_exists($include)) {//TODO: Throw Wordpress Error when a file does not exist and/or is not readable by the webserver.
				require_once($include);
			}
		}
		//redeclare plugin with logger
		$plugin = new \Libsyn\Service();
	} else {
		//TODO: Throw WP error php version below minimum
		// if ( $plugin->hasLogger ) $plugin->logger->error("Plugin:\t Php version is lower than recommended version");
	}

	//check for classic editor in settings
	if ( function_exists('get_option') ) {
		$utilities = new \Libsyn\Utilities();
		$classic_editor_override = get_option('libsyn-podcasting-settings_use_classic_editor');
		$classic_editor_override = ( !empty($classic_editor_override) && $classic_editor_override == 'use_classic_editor' ) ? true : false;
		$classic_editor_plugin_active = $utilities->is_classic_editor_plugin_active();
		if ( !$classic_editor_override && !$classic_editor_plugin_active ) {
			if ( function_exists( 'register_block_type' ) ) {
				invoke_block_editor_assets();
			}
		} else {//classic editor
			add_action( 'add_meta_boxes_post', 'add_libsyn_post_meta');
		}
	} else {
		if($plugin->hasLogger) $plugin->logger->error("Could not load classic or block editor.");
	}

	//Register Scripts
	add_action( 'admin_enqueue_scripts', 'libsyn_default_register_scripts' );
	if ( function_exists('actionsAndFilters') ) {
		actionsAndFilters();
	}
	if ( function_exists('libsynActionsAndFilters')	) {
		libsynActionsAndFilters();
	}
}
