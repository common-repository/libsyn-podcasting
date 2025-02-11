<?php
namespace Libsyn\Service;

/*
	This is a helper class containing all the necessary sanitization
	for the post fields and API call/response fields.

*/
class Sanitize extends \Libsyn\Service {

	public function __construct() { }

/* ALL DB FIELDS */

    /**
     * user_id
     *
     * @since 1.0.1.1
     * @param int $userId
     *
     * @return int
     */
	public function userId($userId) {
		if(!empty($userId)&&is_numeric($userId)) {
			$safe_userId = intval($userId);
		} else $safe_userId = '';
		if ( $safe_userId !== '' ) {
			return intval($safe_userId);
		}
		return $safe_userId;
	}

    /**
     * plugin_api_id
     *
     * @since 1.0.1.1
     * @param int $pluginApiId
     *
     * @return int
     */
	public function pluginApiId($pluginApiId) {
		if(!empty($pluginApiId)&&is_numeric($pluginApiId)) {
			$safe_pluginApiId = intval($pluginApiId);
		} else $safe_pluginApiId = '';
		return $safe_pluginApiId;
	}

    /**
     * Validate date string as MySQL date format
     *
     * @since 1.0.1.1
     * @param mixed $date
	 * @param string $format
     *
     * @return bool
     */
	public function validateMysqlDate( $date, $format = 'Y-m-d H:i:s' ){
		if(!is_string($date)) return false;
		return ($date === date($format, strtotime($date)));
	}

	public function mysqlDate($date) {
		$check_date = self::validateMysqlDate($date);
		if(!$check_date) {
			$safe_date = '';
		} else {
			$safe_date = self::text($date);
		}
		return $safe_date;
	}

    /**
     * client_id
     *
     * @since 1.0.1.1
     * @param string $clientId
     *
     * @return string
     */
	public function clientId($clientId) {
		if(!empty($clientId)&&is_string($clientId)) {
			$clientId = (strlen($clientId)==12)?$clientId:'';
			$safe_clientId = sanitize_text_field($clientId);
		} else $safe_clientId = '';
		return $safe_clientId;
	}

    /**
     * client_secret
     *
     * @since 1.0.1.1
     * @param string $clientSecret
     *
     * @return string
     */
	public function clientSecret($clientSecret) {
		if(!empty($clientSecret)&&is_string($clientSecret)) {
			$clientSecret = (strlen($clientSecret)==20)?$clientSecret:'';
			$safe_clientSecret = sanitize_text_field($clientSecret);
		} else $safe_clientSecret = '';
		return $safe_clientSecret;
	}

    /**
     * access_token
     *
     * @since 1.0.1.1
     * @param string $accessToken
     *
     * @return string
     */
	public function accessToken($accessToken) {
		if(!empty($accessToken)&&is_string($accessToken)) {
			$accessToken = (strlen($accessToken)==40)?$accessToken:'';
			$safe_accessToken = sanitize_text_field($accessToken);
		} else $safe_accessToken = '';
		return $safe_accessToken;
	}


    /**
     * refresh_token
     *
     * @since 1.0.1.1
     * @param string $refreshToken
     *
     * @return string
     */
	public function refreshToken($refreshToken) {
		if(!empty($refreshToken)&&is_string($refreshToken)) {
			$refreshToken = (strlen($refreshToken)==40)?$refreshToken:'';
			$safe_refreshToken = sanitize_text_field($refreshToken);
		} else $safe_refreshToken = '';
		return $safe_refreshToken;
	}

    /**
     * show_id
     *
     * @since 1.0.1.1
     * @param int $showId
     *
     * @return int
     */
	public function showId($showId) {
		if(!empty($showId)&&is_numeric($showId)) {
			$safe_showId = sanitize_text_field(intval($showId));
		} else $safe_showId = '';
		if ( $safe_showId !== '' ) {
			return intval($safe_showId);
		}
		return $safe_showId;
	}

    /**
     * item_id
     *
     * @since 1.0.1.1
     * @param int $itemId
     *
     * @return int
     */
	public function itemId($itemId) {
		if(!empty($itemId)&&is_numeric($itemId)) {
			$safe_itemId = sanitize_text_field(intval($itemId));
		} else $safe_itemId = '';
		if ( $safe_itemId !== '' ) {
			return intval($safe_itemId);
		}
		return $safe_itemId;
	}

    /**
     * refresh_token_expires
     *
     * @since 1.0.1.1
     * @param string $refreshTokenExpires
     *
     * @return string
     */
	public function refreshTokenExpires($refreshTokenExpires) {
		if(!empty($refreshTokenExpires)&&is_string($refreshTokenExpires)) {
			$refreshTokenExpires = (strlen($refreshTokenExpires)==19)?$refreshTokenExpires:'';
			$safe_refreshTokenExpires = sanitize_option('date_format', $refreshTokenExpires);
		} else $safe_refreshTokenExpires = '';
		return $safe_refreshTokenExpires;
	}

    /**
     * access_token_expires
     *
     * @since 1.0.1.1
     * @param string $accessTokenExpires
     *
     * @return string
     */
	public function accessTokenExpires($accessTokenExpires) {
		if(!empty($accessTokenExpires)&&is_string($accessTokenExpires)) {
			$accessTokenExpires = (strlen($accessTokenExpires)==19)?$accessTokenExpires:'';
			$safe_accessTokenExpires = sanitize_option('date_format', $accessTokenExpires);
		} else $safe_accessTokenExpires = '';
		return $safe_accessTokenExpires;
	}

    /**
     * creation_date
     *
     * @since 1.0.1.1
     * @param string $creationDate
     *
     * @return string
     */
	public function creationDate($creationDate) {
		if(!empty($creationDate)&&is_string($creationDate)) {
			$creationDate = (strlen($creationDate)==19)?$creationDate:'';
			$safe_creationDate = sanitize_option('date_format', $creationDate);
		} else $safe_creationDate = '';
		return $safe_creationDate;
	}

    /**
     * feed_url
     *
     * @since 1.0.1.1
     * @param string $feedRedirectUrl
     *
     * @return string
     */
	public function feedUrl($feedUrl) {
		if(!empty($feedUrl)&&is_string($feedUrl)) {
			$safe_feedUrl = esc_url_raw($feedUrl);
		} else $safe_feedUrl = '';
		return $safe_feedUrl;
	}

    /**
     * itunes_subscription_url
     *
     * @since 1.0.1.1
     * @param string $itunesSubscriptionUrl
     *
     * @return string
     */
	public function itunesSubscriptionUrl($itunesSubscriptionUrl) {
		if(!empty($itunesSubscriptionUrl)&&is_string($itunesSubscriptionUrl)) {
			$safe_itunesSubscriptionUrl = esc_url_raw($itunesSubscriptionUrl);
		} else $safe_itunesSubscriptionUrl = '';
		return $safe_itunesSubscriptionUrl;
	}

    /**
     * clean_redirect_url
	 *
	 * This is different from other where as it will remove URL
	 * Parameters that may interfere with the POST data for the settings pages.
     *
     * @since 1.0.1.1
     * @param string $cleanRedirectUrl
     *
     * @return string
     */
	public function cleanRedirectUrl($redirectUri) {
		if(!empty($redirectUri) && is_string($redirectUri)) {
			$redirectUri = str_replace('&msg=Settings+Cleared', '', $redirectUri);
			$redirectUri = str_replace('&msg=Something+went+wrong+when+trying+to+clear+settings', '', $redirectUri);
			$redirectUri = str_replace('&msg=There+was+a+problem+when+trying+to+clear+settings', '', $redirectUri);
			$redirectUri = str_replace('&error=true', '', $redirectUri);
			$redirectUri = str_replace('&error=false', '', $redirectUri);
			$redirectUri = str_replace('&activated=', '', $redirectUri);
			$redirectUri = str_replace('&stylesheet=', '', $redirectUri);
			$redirectUri = str_replace('&sbi_ignore_rating_notice_nag=1', '', $redirectUri);
			$redirectUri = str_replace('&import_theme_demo=0', '', $redirectUri);
		} else $redirectUri = '';

		return $redirectUri;
	}


	/* OTHER */

	/**
	 * arrays
	 * Sanitize text field or array of text fields
	 *
	 * @since 1.2.2.7
	 * @param mixed $array
	 *
	 * @return mixed
	 */
	public function arrays( $array ) {
		if ( is_array($array) ) {
			foreach ( $array as $key => &$value ) {
		        if ( is_array( $value ) ) {
		            $value = $this->arrays($value);
		        }
		        else {
					$value = sanitize_text_field( $value );
		        }
		    }
		}

	    return $array;
	}

    /**
     * Generic text validation
     *
     * @since 1.0.1.1
     * @param string $text
     *
     * @return string
     */
	public function text($text) {
		if(!empty($text)&&is_string($text)) {
			$safe_text = sanitize_text_field($text);
		} else $safe_text = '';
		return $safe_text;
	}

    /**
     * Generic textarea validation
     *
     * @since 1.0.1.1
     * @param string $text
     *
     * @return string
     */
	public function textarea($text) {
		if(!empty($text)&&is_string($text)) {
			$safe_text = esc_textarea($text);
		} else $safe_text = '';
		return $safe_text;
	}

    /**
     * Generic hex validation
     *
     * @since 1.0.1.1
     * @param string $text
     *
     * @return string
     */
	public function hex($text) {
		if(!empty($text)&&ctype_xdigit($text)) {
			$safe_text = sanitize_text_field($text);
		} else $safe_text = '';
		return $safe_text;
	}

    /**
     * Generic numeric validation
     *
     * @since 1.0.1.1
     * @param int $numeric
     *
     * @return int
     */
	public function numeric($numeric) {
		if(!empty($numeric)&&is_numeric($numeric)) {
			$safe_numeric = intval($numeric);
		} else $safe_numeric = '';
		return $safe_numeric;
	}

    /**
     * Generic url_raw validation
     *
     * @since 1.0.1.1
     * @param string $url_raw
     *
     * @return string
     */
	public function url_raw($url_raw) {
		if(!empty($url_raw)&&is_string($url_raw)) {
			$safe_url_raw = esc_url_raw($url_raw);
		} else $safe_url_raw = '';
		return $safe_url_raw;
	}

    /**
     * Generic date_format validation
     *
     * @since 1.0.1.1
     * @param string $date_format
     *
     * @return string
     */
	public function date_format($date_format) {
		if(!empty($date_format)&&is_string($date_format)) {
			$date_format = (strlen($date_format)==19)?$date_format:'';
			$safe_date_format = sanitize_option('date_format', $date_format);
		} else $safe_date_format = '';
		return $safe_date_format;
	}

    /**
     * Generic sanitize_title
     *
     * @since 1.0.1.1
     * @param string $title
     *
     * @return string
     */
	public function title($title) {
		if(!empty($title) && is_string($title)) {
			$safe_title = (function_exists('sanitize_title')) ? sanitize_title($title) : preg_replace('/[^A-Za-z0-9\-]/', '', strtolower(str_replace(' ', '-', $title)));
		} else {
			$safe_title = 'post-'.date('Y-m-d-H-i-s');
		}
		return $safe_title;
	}

    /**
     * Generic json string validation
     *
     * @since 1.0.1.1
     * @param string $json
     *
     * @return string
     */
	public function json($json){
		if(!empty($json)) {
			if(is_string($json)) {
				$json_decoded = json_decode(stripslashes($json));
				if(is_object($json_decoded)){
					$safe_json_string = wp_json_encode($json_decoded);
				} else {
					$safe_json_string = wp_json_encode(array());
				}
			} elseif (is_object($json) || is_array($json)) {
				$safe_json_string = wp_json_encode($json);
			} else {
				$safe_json_string = wp_json_encode(array());
			}
		} else $safe_json_string = wp_json_encode(array());
		return $safe_json_string;
	}

    /**
     * Checks the time to date to within 10 seconds to ensure correct.
     *
     * @since 1.0.1.1
     * @param int $date_format
     *
     * @return bool
     */
	public function clear_settings($time) {
		if(!is_numeric($time)) return false;

		$time = intval($time);
		$current_time = time();
		return (($current_time - $time) >= 1 && ($current_time - $time) <= 99);
	}

    /**
     * Handles array of player settings
	 * uses WP register_setting()
     *
     * @since 1.2.1
     * @param array $player_settings
	 * 		array [
	 *			(use_thumbnail,null) player_use_thumbnail
	 *			(standard,mini) player_use_theme,
	 *			(int) player_width,
	 *			(int) player_height,
	 *			(top,bottom) player_placement,
	 *		]
     *
     * @return string
     */
	public function player_settings($player_settings) {
		$error = false;

		//player_use_thubnail
		$player_settings['player_use_thumbnail'] = $this->text($player_settings['player_use_thumbnail']);
		if($player_settings['player_use_thumbnail']!=='use_thumbnail') {
			$player_settings['player_use_thumbnail'] = '';
		} else {
			//looks good
		}

		//player_use_theme
		$player_settings['player_use_theme'] = $this->text($player_settings['player_use_theme']);
		if(!empty($player_settings['player_use_theme'])) {
			if($player_settings['player_use_theme']!=='standard'&&$player_settings['player_use_theme']!=='mini'&&$player_settings['player_use_theme']!=='custom') {
				$player_settings['player_use_theme'] = '';
			} else {
				//looks good
			}
		} else { $error = true; }

		//player_width
		$player_settings['player_width'] = $this->numeric($player_settings['player_width']);
		if(!empty($player_settings['player_width'])) {
			//looks good
		} else { $error = true; }

		//player_height
		$player_settings['player_height'] = $this->numeric($player_settings['player_height']);
		if(!empty($player_settings['player_height'])) {
			//looks good
		} else { $error = true; }

		//player_placement
		$player_settings['player_placement'] = $this->text($player_settings['player_placement']);
		if(!empty($player_settings['player_placement'])) {
			if($player_settings['player_placement']!=='top'&&$player_settings['player_placement']!=='bottom') {
				$player_settings['player_placement'] = '';
			} else {
				//looks good
			}
		} else { $error = true; }

		//player_use_thubnail
		$player_settings['player_use_download_link'] = $this->text($player_settings['player_use_download_link']);
		if($player_settings['player_use_download_link']!=='use_download_link') {
			$player_settings['player_use_download_link'] = '';
		} else {
			//looks good
		}

		//player_custom_color
		$player_settings['player_custom_color'] = ( !empty($player_settings['player_custom_color']) && ( substr($player_settings['player_custom_color'], 0, 1) === '#' ) ) ? $this->hex(substr($player_settings['player_custom_color'], 1)) : $this->hex($player_settings['player_custom_color']);

		//player_use_download_link_text
		$player_settings['player_use_download_link_text'] = $this->text($player_settings['player_use_download_link_text']);


		if($error) return array();
			else return $player_settings;
	}

    /**
     * Handles array of additional settings
	 * uses WP register_setting()
     *
     * @since 1.2.1
     * @param array $additional_settings
	 * 		array [
	 *			(add_podcast_metadata,null) player_use_thumbnail
	 *		]
     *
     * @return <string>
     */
	public function additional_settings($additional_settings) {
		$error = false;

		//player_use_thubnail
		if ( isset($additional_settings['settings_add_podcast_metadata']) ) {
			$additional_settings['settings_add_podcast_metadata'] = $this->text($additional_settings['settings_add_podcast_metadata']);
			if ( $additional_settings['settings_add_podcast_metadata'] !== 'add_podcast_metadata' ) {
				$additional_settings['settings_add_podcast_metadata'] = '';
			}
		} else {
			$additional_settings['settings_add_podcast_metadata'] = '';
		}

		if ( isset($additional_settings['settings_use_classic_editor']) ) {
			$additional_settings['settings_use_classic_editor'] = $this->text($additional_settings['settings_use_classic_editor']);
			if ( $additional_settings['settings_use_classic_editor'] !== 'use_classic_editor' ) {
				$additional_settings['settings_use_classic_editor'] = '';
			}
		} else {
			$additional_settings['settings_use_classic_editor'] = '';
		}

		if ( isset($additional_settings['settings_enable_mylibsyn_widget']) ) {
			$additional_settings['settings_enable_mylibsyn_widget'] = $this->text($additional_settings['settings_enable_mylibsyn_widget']);
			if ( $additional_settings['settings_enable_mylibsyn_widget'] !== 'enable_mylibsyn_widget' ) {
				$additional_settings['settings_enable_mylibsyn_widget'] = '';
			}
		} else {
			$additional_settings['settings_enable_mylibsyn_widget'] = '';
		}

		if($error) return array();
			else return $additional_settings;
	}
}
