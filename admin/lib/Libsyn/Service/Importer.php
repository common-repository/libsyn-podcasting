<?php
namespace Libsyn\Service;
/*
	This class is used to import 3rd party podcast feeds into the libsyn network.
	For other 3rd party integrations please see Integration class.
*/
class Importer extends \Libsyn\Service {

    /**
     * Handles creating post metadata for an singleton post
     *
     * @param int $post_id
     * @param array $metaData
     * @param object $api
     *
     * @return mixed @see self::handleMetaValueArray()
     */
	public function createMetadata( $post_id = null, $metaData = null, $apiShow = false ) {
		//sanity check
		if(empty($post_id) && empty($metaData)) return false; //back out

		/* Get the posted data and sanitize it for use as an HTML class. */
		$meta_values = array();

		/* Core Post Meta */
		if(!empty($metaData->item_id)) {
			$meta_values['libsyn-item-id'] = $metaData->item_id;
		} elseif(!empty($metaData->id)) {
			//going to mess up updating post but has to be set.
			$meta_values['libsyn-item-id'] = $metaData->id;
		} else {
			//going to mess up updating post but has to be set.
			$meta_values['libsyn-item-id'] = 0;
		}
		$meta_values['libsyn-post-episode'] = "isLibsynPost";
		$meta_values['libsyn-post-update-release-date'] = "isLibsynUpdateReleaseDate";
		$meta_values['libsyn-is_draft'] = 'false';
		$meta_values['libsyn-release-date'] = (!empty($metaData->release_date)) ? $metaData->release_date : date("Y-m-d H:i:s");
		$meta_values['libsyn-destination-releases'] = (!empty($metaData->releases)) ? $metaData->releases : '';
		$meta_values['libsyn-new-media-media'] = (!empty($metaData->content_id)) ? 'libsyn-upload-'.$metaData->content_id : '';
		$meta_values['libsyn-post-episode-subtitle'] = (!empty($metaData->item_subtitle)) ? $metaData->item_subtitle : '';
		$meta_values['libsyn-post-episode-category-selection'] = (!empty($metaData->item_category)) ? $metaData->item_category : '';
		$meta_values['libsyn-new-media-image'] = (!empty($metaData->thumbnail_url)) ? $metaData->thumbnail_url : '';
		$meta_values['libsyn-post-episode-keywords'] = (!empty($metaData->item_keywords) && is_array($metaData->item_keywords)) ? implode(', ', $metaData->item_keywords) : '';
		$meta_values['libsyn-post-episode-itunes-explicit'] = (!empty($metaData->itunes_explicit)) ? $metaData->itunes_explicit : '';
		$meta_values['libsyn-post-episode-itunes-episode-number'] = (!empty($metaData->itunes_episode_number)) ? $metaData->itunes_episode_number : '';
		$meta_values['libsyn-post-episode-itunes-season-number'] = (!empty($metaData->itunes_season_type)) ? $metaData->itunes_season_number : '';
		$meta_values['libsyn-post-episode-itunes-episode-type'] = (!empty($metaData->itunes_episode_type)) ? $metaData->itunes_episode_type : '';
		// $meta_values['libsyn-post-episode-itunes-episode-summary'] = (!empty($metaData->itunes_episode_summary)) ? $metaData->itunes_episode_summary : ''; @deprecated v1.3.1
		$meta_values['libsyn-post-episode-itunes-episode-title'] = (!empty($metaData->itunes_episode_title)) ? $metaData->itunes_episode_title : '';
		$meta_values['libsyn-post-episode-itunes-episode-author'] = (!empty($metaData->itunes_episode_author)) ? $metaData->itunes_episode_author : '';


		/* Player Settings */

		// custom color //
		$playerCustomColor = get_user_option('libsyn-podcasting-player_custom_color');
		if(!empty($playerCustomColor)) {
			$meta_values['libsyn-post-episode-player_custom_color'] =  $playerCustomColor;
		}

		// theme //
		$playerTheme	= get_user_option('libsyn-post-episode-player_use_theme');
		$playerTheme	= (!empty($playerTheme)) ? $playerTheme : "custom";
		$meta_values['libsyn-post-episode-player_use_theme'] = $playerTheme;

		// height //
		$playerHeight	= get_user_option('libsyn-post-episode-player_height');
		$playerHeight	= (!empty($playerHeight)) ? $playerHeight : 90;
		$meta_values['libsyn-post-episode-player_height'] = $playerHeight;

		// width //
		$playerWidth	= get_user_option('libsyn-post-episode-player_width');
		$playerWidth	= (!empty($playerWidth)) ? $playerWidth : 450;
		$meta_values['libsyn-post-episode-player_width'] = $playerWidth;

		// placement //
		$playerPlacement 	= get_user_option('libsyn-post-episode-player_placement');
		$playerPlacement 	= (!empty($playerPlacement) || $playerPlacement==='top') ? $playerPlacement : "bottom";
		$meta_values['libsyn-post-episode-player_placement'] = $playerPlacement;

		// download link //
		$playerUseDownloadLink = get_user_option('libsyn-post-episode-player_use_download_link');
		$playerUseDownloadLink = (!empty($playerUseDownloadLink)) ? $playerUseDownloadLink : false;
		$playerUseDownloadLink = ($playerUseDownloadLink==='use_download_link')?true:false;
		if($playerUseDownloadLink) {
			$meta_values['libsyn-post-episode-player_use_download_link'] = 'use_download_link';
		}

		// download link text //
		$playerUseDownloadLinkText = get_user_option('libsyn-post-episode-player_use_download_link_text');
		$playerUseDownloadLinkText = (!empty($playerUseDownloadLinkText)) ? $playerUseDownloadLinkText : '';
		if(!empty($playerUseDownloadLinkText)) {
			$meta_values['libsyn-post-episode-player_use_download_link_text'] = $playerUseDownloadLinkText;
		}


		/* Additional Meta Values */
		$meta_values['libsyn-post-episode-simple-download'] = 'available';
		$meta_values['libsyn-post-episode-advanced-destination-form-data-input-enabled'] = 'true';
		if(!empty($metaData->show_id)) {
			if( !empty($apiShow) ) {
				try {
					if(!empty($apiShow)) {//matched show
						if(!empty($apiShow->{'feed_url'})) {
							$meta_values['libsyn-show-feed_url'] = $apiShow->{'feed_url'};
						}
						if(!empty($apiShow->{'show_title'})) {
							$meta_values['libsyn-show-show_title'] = $apiShow->{'show_title'};
						}
					}
				} catch(Exception $e) {
					if ( $this->hasLogger ) $this->logger->error("Could not create metadata for post id:\t".$post_id.". Error:\t".$e->getMessage());
				}

			}
		}

		//Handle new Meta Values
		return self::handleMetaValueArray( $post_id, $meta_values );
	}

    /**
     * Creates a WP Post from the passsed post object
     *
     * @param object $postData
     *
     * @return array|bool false on failure/error
     */
	public function createPost ( $postData ) {
		$sanitize = new \Libsyn\Service\Sanitize();
		if(!empty($postData) && is_object($postData)) {

			$postArr = array();
			$postArr['post_author']		= $this->getCurrentUserId();
			$postArr['post_date']		= $postData->release_date;
			$postArr['post_date_gmt']	= (function_exists('get_gmt_from_date')) ? get_gmt_from_date($postData->release_date, "Y-m-d H:i:s") : gmdate("Y-m-d H:i:s", strtotime($postData->release_date));
			$postArr['post_content']	= (!empty($postData->item_body)) ? $postData->item_body : '';
			$postArr['post_content_filtered'] = $sanitize->text($postData->item_body);
			$postArr['post_title']		= (function_exists('wp_strip_all_tags')) ? wp_strip_all_tags($postData->item_title) : $postData->item_title;
			$postArr['post_excerpt']	= (!empty($postData->item_subtitle)) ? $postData->item_subtitle : '';
			$postArr['post_status']		= 'publish';
			$postArr['post_type']		= 'post';
			// $postArr['comment_status']	= get_option('default_comment_status');
			// $postArr['ping_status']		= get_option('default_ping_status');
			// $postArr['post_password']	= '';
			// $postArr['post_name']		= $sanitize->title($postData->item_title);
			// $postArr['to_ping']			= '';
			// $postArr['pinged']			= '';
			$postArr['post_modified']	= date('Y-m-d H:i:s');
			$postArr['post_modified_gmt']	= (function_exists('get_gmt_from_date')) ? get_gmt_from_date(date('Y-m-d H:i:s'), "Y-m-d H:i:s") : gmdate("Y-m-d H:i:s", time());
			// $postArr['post_parent']		= 0;
			// $postArr['menu_order']		= 0;
			// $postArr['post_mime_type']	= '';
			// $postArr['guid']				= '';

			//TODO: Add category based on Libsyn category in future release
			/* Item Category */
			/*
			if ( !empty($postData->item_category) ) {
				if ( empty(get_cat_ID($postData->item_category)) ) {
					$working_category = wp_create_category($postData->item_category, get_option('default_category'));
				} else {
					$working_category = get_cat_ID($postData->item_category);
				}
			} else {
				$working_category = false;
			}
			$postArr['post_category']	= ( !empty($working_category) ) ? array($working_category, get_option('default_category')) : array(get_option('default_category')); //default get_option('default_category')
			*/

			// $postArr['tags_input']			= '';
			// $postArr['tax_input']		= '';
			// $postArr['meta_input']			= array();
		} else {
			return false;
		}
		try {
			//check post meta libsyn-item-id doesn't exist
			if ( !empty($postData->item_id) ) {
				$utilities = new \Libsyn\Utilities();
				$checkItemIdExists = $utilities->check_post_meta_exists('libsyn-item-id', $postData->item_id);
				if ( $checkItemIdExists ) return false; //back out and do not create post
			}

			$data = (function_exists('wp_insert_post')) ? wp_insert_post(sanitize_post($postArr, 'db'), true) : false;
			$importedPostIds = get_user_option('libsyn-podcasting-imported_post_ids');
			$plugin = new \Libsyn\Service();
			if ( empty($importedPostIds) ) {
				$importedPostIds = array();
			} else {
				$importedPostIds = ( !empty($importedPostIds) ) ? $importedPostIds : array();
			}
			$importedPostIds[] = $data;
			update_user_option($plugin->getCurrentUserId(), 'libsyn-podcasting-imported_post_ids', $importedPostIds, false);
		} catch (Exception $e) {
			if ( $this->hasLogger ) $this->logger->error("Could not create wordpress post. Error:\t".$e->getMessage());
		}
		return (isset($data)) ? $data : false;
	}

	/**
	 * Ajax call to create new WP Post
	 *
	 * @since 1.2.2.7
	 * @return JSON|bool (int) post_id success, false failure/error
	 */
	public static function createPostAjax() {
		$error = false;
		$checkUrl  = \Libsyn\Utilities::getCurrentPageUrl();
		$current_user_id = get_current_user_id();
		if ( function_exists('wp_parse_str') ) {
			wp_parse_str($checkUrl, $urlParams);
		} else {
			parse_str($checkUrl, $urlParams);
		}

		if ( intval($urlParams['libsyn_create_new_post']) === 1 ) {
			$sanitize = new \Libsyn\Service\Sanitize();
			$importer = new \Libsyn\Service\Importer();
			if ( isset($_POST['data']) ) {
				$metaData = $sanitize->arrays($_POST['data']);
				$createPost = $importer->createPost( (object) $metaData );
			} else {
				$error = true;
			}
			//set output
			header('Content-Type: application/json');
			if ( !$error ) echo json_encode($createPost);
				else echo json_encode(false);
			exit;
		}
	}

	/**
	 * Ajax call to create metadata for WP Post
	 *
	 * @since 1.2.2.7
	 * @return string|bool JSON, false on failure/error
	 */
	public static function createMetadataAjax() {
		$error = false;
		$checkUrl  = \Libsyn\Utilities::getCurrentPageUrl();
		$current_user_id = get_current_user_id();
		if ( function_exists('wp_parse_str') ) {
			wp_parse_str($checkUrl, $urlParams);
		} else {
			parse_str($checkUrl, $urlParams);
		}
		if ( intval($urlParams['libsyn_create_metadata']) === 1 ) {
			$sanitize = new \Libsyn\Service\Sanitize();
			$importer = new \Libsyn\Service\Importer();

			if ( isset($_POST['id']) && isset($_POST['data']) ) {
				$post_id = $sanitize->numeric($_POST['id']);
				$metaData = $sanitize->arrays($_POST['data']);
				if ( isset($_POST['show']) ) {
					$apiShow = $sanitize->arrays($_POST['show']);
				} else {
					$apiShow = false;
				}
				$createMetadata = $importer->createMetadata( $post_id, (object) $metaData, (object) $apiShow );
			} else {
				$error = true;
			}

			//set output
			header('Content-Type: application/json');
			if ( !$error ) echo json_encode( ( !empty($createMetadata) ) );
				else echo json_encode(false);
			exit;
		}
	}

	/**
	 * Ajax call to add player to WP Post
	 *
	 * @since 1.2.2.7
	 * @return string|bool JSON, false on failure/error
	 */
	public static function addPlayerAjax() {
		$error = false;
		$checkUrl  = \Libsyn\Utilities::getCurrentPageUrl();
		$current_user_id = get_current_user_id();
		if ( function_exists('wp_parse_str') ) {
			wp_parse_str($checkUrl, $urlParams);
		} else {
			parse_str($checkUrl, $urlParams);
		}
		if ( intval($urlParams['libsyn_add_player']) === 1 ) {
			$sanitize = new \Libsyn\Service\Sanitize();
			$importer = new \Libsyn\Service\Importer();

			//send data to add player
			if ( isset($_POST['id']) && isset($_POST['data']['url']) ) {
				$post_id = $sanitize->numeric($_POST['id']);
				$url = $sanitize->url_raw($_POST['data']['url']);
				if ( !empty($post_id) && !empty($url) ) {
					$addPlayer = $importer->addPlayer($post_id, $url);
				} else {
					$error = true;
				}
			} else {
				$error = true;
			}

			//set output
			header('Content-Type: application/json');
			if ( !$error ) echo json_encode( ( !empty($addPlayer) ) );
				else echo json_encode(false);
			exit;
		}
	}

    /**
     * Handles clearing post metadata for an singleton post
     *
     * @param Libsyn\Service $api
     *
     * @return mixed @see self::handleMetaValueArray()
     */
	public function clearMetadata( $post_id ) {
		/* Set emtpy meta values*/
		$meta_values = array();
		$meta_values['libsyn-post-episode']							= '';
		$meta_values['libsyn-post-update-release-date'] 			= '';
		$meta_values['libsyn-item-id']								= '';
		$meta_values['libsyn-is_draft']								= '';
		$meta_values['libsyn-release-date']							= '';
		$meta_values['libsyn-destination-releases']					= '';
		$meta_values['libsyn-new-media-media']						= '';
		$meta_values['libsyn-post-episode-subtitle']				= '';
		$meta_values['libsyn-post-episode-category-selection']		= '';
		$meta_values['libsyn-new-media-image']						= '';
		$meta_values['libsyn-post-episode-keywords']				= '';
		$meta_values['libsyn-post-episode-itunes-explicit']			= '';
		$meta_values['libsyn-post-episode-itunes-episode-number']	= '';
		$meta_values['libsyn-post-episode-itunes-season-number']	= '';
		$meta_values['libsyn-post-episode-itunes-episode-type']		= '';
		$meta_values['libsyn-post-episode-itunes-episode-summary'] 	= '';
		$meta_values['libsyn-post-episode-itunes-episode-title']	= '';
		$meta_values['libsyn-post-episode-itunes-episode-author']	= '';
		$meta_values['libsyn-post-episode-player_custom_color']		= '';
		$meta_values['libsyn-post-episode-player_use_theme']		= '';
		$meta_values['libsyn-post-episode-player_height']			= '';
		$meta_values['libsyn-post-episode-player_width']			= '';
		$meta_values['libsyn-post-episode-player_placement']		= '';
		$meta_values['libsyn-post-episode-player_use_download_link']		= '';
		$meta_values['libsyn-post-episode-player_use_download_link_text']	= '';
		$meta_values['libsyn-show-feed_url']						= '';
		$meta_values['libsyn-show-show_title']						= '';

		//Handle new Meta Values (if they are set they will be cleared)
		self::handleMetaValueArray( $post_id, $meta_values );
	}

	/**
	 * Handle meta values based on the way they are setup in array.
	 * see (array) $meta_values
	 *
	 * @since 1.2.1
	 * @param int $post_id
	 * @param array $meta_values
	 *
	 * @return bool
	 */
	public static function handleMetaValueArray( $post_id, $meta_values ) {
		/* If a new meta value was added and there was no previous value, add it. */
		try {
			foreach ($meta_values as $key => $val) {
				$meta_value = get_post_meta($post_id, $key, true);
				$sanitize = new \Libsyn\Service\Sanitize();
				if(!isset($url)) $url = '';

				//sanitize value
				if($key === 'libsyn-destination-releases') {
					$clean_val = $val;
				} else {
					switch($key) {
						case 'libsyn-item-id':
							$clean_val = $sanitize->numeric($val);
							break;
						case 'libsyn-new-media-image':
							$clean_val = $sanitize->url_raw($val);
							break;
						case 'libsyn-new-media-media':
						case 'libsyn-show-feed_url':
							if( strpos($val, 'libsyn-ftp-')===false || strpos($url, 'libsyn-upload-')===false) {
								 $clean_val = $sanitize->url_raw($val);
							} else {
								$clean_val = $sanitize->text($val);
							}
							break;
						case 'libsyn-post-episode-advanced-destination-form-data':
							$clean_val = $sanitize->json($val);
							break;
						case 'libsyn-release-date':
							$clean_val = $sanitize->mysqlDate($val);
							break;
						default:
							$clean_val = $sanitize->text($val);

					}
				}
				if (!empty($clean_val) && empty($meta_value)) // no meta_value so create
					add_post_meta($post_id, $key, $clean_val, true);
				elseif (!empty($clean_val) && $clean_val!==$meta_value) //doesn't match old value so update
					update_post_meta($post_id, $key, $clean_val);
				elseif (empty($clean_val) && !empty($meta_value)) //old value doesn't exist, delete it
					delete_post_meta($post_id, $key, $meta_value);
			}
		} catch ( Exception $e ) {
			return false;
		}
		return true;
	}

    /**
     * Clears a podcast shortcode from an individual post
     *
     * @since 1.2.1
     * @param int $post_id
     *
     * @return bool
     */
	public function clearPlayer($post_id) {
		global $wpdb;
		$post = get_post($post_id);
		if(empty($post)) return false; //cannot find post.. back out

		try {
			$wpdb->update(
				$wpdb->prefix . 'posts',
				array(
					'post_content' => wp_kses_post(self::stripShortcode('podcast', $post->post_content)),
					'post_modified' => date("Y-m-d H:i:s"),
					'post_modified_gmt' => gmdate("Y-m-d H:i:s"),
				),
				array('ID' => $post->ID)
			);
		} catch (Exception $e) {
			if ( $this->hasLogger ) $this->logger->error("Could not clear player. Error:\t".$e->getMessage());
		}
		return true;
	}

    /**
     * Adds the player to an individual post
     *
     * @param int $post_id
     * @param string $url
     *
     * @return bool
     */
	public function addPlayer($post_id, $url) {
		global $wpdb;
		$post = get_post($post_id);
		if(empty($post)) return false; //cannot find post.. back out

		//Set Player Settings and/or Defualts
		$playerTheme	= get_user_option('libsyn-post-episode-player_use_theme');
		$playerTheme	= (!empty($playerTheme)) ? $playerTheme : "custom";
		$playerHeight	= get_user_option('libsyn-post-episode-player_height');
		$playerHeight	= (!empty($playerHeight)) ? $playerHeight : 90;
		// $playerWidth	= get_user_option('libsyn-post-episode-player_width');
		// $playerWidth	= (!empty($playerWidth) || $playerTheme == "custom") ? $playerWidth : "100%";
		$playerCustomColor	= get_user_option('libsyn-podcasting-player_custom_color');
		$playerWidth		= "100%"; //player width always 100% now
		$playerPlacement 	= get_user_option('libsyn-post-episode-player_placement');
		$playerPlacement 	= (!empty($playerPlacement) || $playerPlacement==='top') ? $playerPlacement : "bottom";
		$playerUseDownloadLink = get_user_option('libsyn-post-episode-player_use_download_link');
		$playerUseDownloadLink = (!empty($playerUseDownloadLink)) ? $playerUseDownloadLink : false;
		$playerUseDownloadLink = ($playerUseDownloadLink==='use_download_link')?true:false;
		$playerUseDownloadLinkText = get_user_option('libsyn-post-episode-player_use_download_link_text');
		$playerUseDownloadLinkText = (!empty($playerUseDownloadLinkText)) ? $playerUseDownloadLinkText : "Click here to download the episode!";

		//Modify Player url based on saved settings
		switch($playerTheme) {
			case "custom":
				$url = str_replace('/theme/standard', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/standard-mini', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/legacy', '/theme/'.$playerTheme, $url);
				if(!empty($playerCustomColor)) {
					$url = (substr($url, -1) === '/') ? $url.'custom-color/'.$playerCustomColor : $url.'/custom-color/'.$playerCustomColor;
				}
				break;
			case "standard":
				$url = str_replace('/theme/custom', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/standard-mini', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/legacy', '/theme/'.$playerTheme, $url);
				break;
			case "standard-mini":
				$url = str_replace('/theme/standard', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/custom', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/legacy', '/theme/'.$playerTheme, $url);
				break;
			case "legacy"://legacy not supported by plugin but add for good measure
				$url = str_replace('/theme/standard', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/standard-mini', '/theme/'.$playerTheme, $url);
				$url = str_replace('/theme/custom', '/theme/'.$playerTheme, $url);
				break;
		}

		if(!empty($playerHeight)) {//change original height parameter name and add height parameter
			$url = str_replace('/height', '/height-orig', $url);
			$url = (substr($url, -1) === '/') ? $url.'height/'.$playerHeight :  $url.'/height/'.$playerHeight;
		}


		if(($playerUseDownloadLink)  && !empty($playerUseDownloadLinkText)) {
			$download_link = '<br /><br /><a class="libsyn-download-link" href ="'.$url.'" target="_blank">'.$playerUseDownloadLinkText.'</a><br />';
		} else $download_link = '';
		try {

			$wpdb->update(
				$wpdb->prefix . 'posts',
				array(
					'post_content' => wp_kses_post(self::stripShortcode('podcast', $post->post_content)).'[podcast src="'.$url.'" height="'.$playerHeight.'" width="'.$playerWidth.'" placement="'.$playerPlacement.'" theme="'.$playerTheme.'"]'.$download_link,
					'post_modified' => date("Y-m-d H:i:s"),
					'post_modified_gmt' => gmdate("Y-m-d H:i:s"),
				),
				array('ID' => $post->ID)
			);
		} catch (Exception $e) {
			if ( $this->hasLogger ) $this->logger->error("Could not add player to post id:\t".$post_id."\terror:\t".$e->getMessage());
		}
		return true;
	}

	/**
	 * Temp change global state of WP to fool shortcode
	 *
	 * @since 1.2.1
	 * @param string $code name of the shortcode
	 * @param string $content
	 *
	 * @return string content with shortcode striped
	 */
	public static function stripShortcode( $code, $content ) {
		global $shortcode_tags;

		$stack = $shortcode_tags;
		if($code=="all") $shortcode_tags = array();
			else $shortcode_tags = array($code => 1);

		$content = strip_shortcodes($content);

		$shortcode_tags = $stack;
		return $content;
	}

	/**
	 * Runs Ajax for feed importer process
	 *
	 * @since 1.2.2.7
	 * @return string JSON, false on failure/error
	 */
	public static function importAjax() {
		$error = false;
		$checkUrl  = \Libsyn\Utilities::getCurrentPageUrl();
		$current_user_id = get_current_user_id();
		if ( function_exists('wp_parse_str') ) {
			wp_parse_str($checkUrl, $urlParams);
		} else {
			parse_str($checkUrl, $urlParams);
		}
		if ( intval($urlParams['libsyn_run_import']) === 1 ) {
			$plugin = new \Libsyn\Service();
			$utilities = new \Libsyn\Utilities();
			$importer = new \Libsyn\Service\Importer();
			$sanitize = new \Libsyn\Service\Sanitize();
			$current_user_id = $plugin->getCurrentUserId();
			$api = $plugin->retrieveApiById($current_user_id);
			$integration = new \Libsyn\Service\Integration();
			$render = true;
			$libsyn_text_dom = $plugin->getTextDom();
			$page = ( !empty($urlParams['page']) ) ? intval($urlParams['page']) : 1;
			$limit = ( !empty($urlParams['limit']) ) ? intval($urlParams['limit']) : 100;

			add_action( 'wp_feed_options', '\Libsyn\Utilities::disableFeedCaching' ); //disable feed caching

			//Handle Checking Feed Status
			$hasIncompleteImport = false;
			$feedImportTriggered = get_user_option('libsyn-podcasting-feed_import_triggered');
			$ppFeedTriggered = get_user_option('libsyn-podcasting-pp_feed_triggered');
			$powerpressFeed = get_user_option('libsyn-podcasting-pp_feed');
			// $powerpressFeedUrl = get_user_option('libsyn-podcasting-pp_feed_url'); /* @deprecated 1.2.2.7 */
			$feedImportId = get_user_option('libsyn-podcasting-feed_import_id');
			// $originFeedUrl = get_user_option('libsyn-podcasting-feed_import_origin_feed'); /* @deprecated 1.2.2.7 */
			// $libsynFeedUrl = get_user_option('libsyn-podcasting-feed_import_libsyn_feed'); /* @deprecated 1.2.2.7 */
			$feedImportPosts = get_user_option('libsyn-podcasting-feed_import_posts');
			$importedPostIds = get_user_option('libsyn-podcasting-imported_post_ids');
			// $hasSavedData = (!empty($ppFeedTriggered) || !empty($feedImportId) || !empty($feedImportPosts) || !empty($importedPostIds) || !empty($powerpressFeedUrl)); /* @deprecated 1.2.2.7 */

			//Handle Powerpress Integration
			$checkPowerpress = $integration->checkPlugin('powerpress');
			if ( $checkPowerpress ) {
				if ( ( empty($_POST['libsyn-powerpress-feed-url-submit']) && empty($_POST['libsyn-importer-action']) ) && ( empty($powerpressFeed) || empty($ppFeedTriggered) ) ) {
					global $wp_rewrite;
					if ( !empty($wp_rewrite->{'feed_base'}) ) {
						$feedBase = $wp_rewrite->{'feed_base'};
					} else {//just default to feed if unknown
						$feedBase = 'feed';
					}
					if (in_array('podcast', $wp_rewrite->{'feeds'}) && in_array('feed', $wp_rewrite->{'feeds'})) {
						$ppMainFeedUrl = get_site_url() . "/{$feedBase}/podcast";
					} else {
						$ppMainFeedUrl = get_site_url() . "/{$feedBase}";
					}

					if ( !isset($ppFeedUrl) && !empty($ppMainFeedUrl) ) {
						$ppFeedUrl = $ppMainFeedUrl;
					} else {
						if ( $plugin->hasLogger ) $plugin->logger->error("Importer powerpress feed url is empty.");
					}
					if ( function_exists('fetch_feed') ) {
						$powerpressFeed = fetch_feed( $ppFeedUrl );
					} else {
						$powerpressFeed = $utilities->libsyn_fetch_feed( $ppFeedUrl );
					}
				}

				if ( !empty($powerpressFeed) ) {
					/* @deprecated 1.2.2.7 */
					/*
					//Feed Arguments
					$feed_args = array(
						'singular'=> 'libsyn_feed_item' //Singular label
						,'plural' => 'libsyn_feed_items' //plural label, also this well be one of the table css class
						,'ajax'   => false //We won't support Ajax for this table
						,'screen' => get_current_screen()
					);
					*/
					if ( !is_wp_error($powerpressFeed) && $powerpressFeed instanceof \SimplePie ) {
						/* @deprecated 1.2.2.7 */
						/*
						//setup new array with feed data
						$powerpress_feed_items = array();
						$x=0;
						foreach ($powerpressFeed->get_items() as $feed_item) {
							$working_url = $feed_item->get_permalink();
							if( function_exists('url_to_postid') ) {
								$id = url_to_postid($working_url);
							}

							$powerpress_feed_items[$x] = new \stdClass();
							if( !empty($id) ) {
								$powerpress_feed_items[$x]->id = $id;
							} else {
								$powerpress_feed_items[$x]->id = 'entry_'.$x;
							}
							$powerpress_feed_items[$x]->title = $feed_item->get_title();
							$powerpress_feed_items[$x]->content = $feed_item->get_content();
							$powerpress_feed_items[$x]->description = $feed_item->get_description();
							$powerpress_feed_items[$x]->permalink = "<a href=\"".$feed_item->get_permalink()."\" target=\"_blank\">".$feed_item->get_permalink()."</a>";
							$powerpress_feed_items[$x]->custom_permalink_url = $feed_item->get_permalink();
							$powerpress_feed_items[$x]->guid = $feed_item->get_permalink();
							$powerpress_feed_items[$x]->link = $feed_item->get_permalink();
							$powerpress_feed_items[$x]->release_date = $feed_item->get_date();
							$x++;
							if(isset($id)) unset($id);
						}
						*/

						//Save PP Feed to Meta
						if ( !empty($ppFeedUrl) ) {
							$working_powerpressFeed = new \stdClass();
							$working_powerpressFeed->{'feed_url'} = $ppFeedUrl;
							$working_powerpressFeed->{'items'} = $powerpress_feed_items;
							update_user_option($current_user_id, 'libsyn-podcasting-pp_feed', $working_powerpressFeed, false);
							unset($working_powerpressFeed);
						}

						/* @deprecated 1.2.2.7 */
						/*
						//Prepare Table of elements
						$libsyn_feed_wp_list_table = new \Libsyn\Service\Table($feed_args, $powerpress_feed_items);
						$libsyn_feed_wp_list_table->item_headers = array(
							'id' => 'id'
							,'title' => 'Episode Title'
							,'description' => 'Description'
							,'permalink' => 'Episode Link'
							,'release_date' => 'Release Date'
						);
						$libsyn_feed_wp_list_table->prepare_items();
						*/
					} elseif ( !is_wp_error($powerpressFeed) && $powerpressFeed instanceof \__PHP_Incomplete_Class) {//unserialized instanceof SimplePie (Causes serialize/unserialize problem)
						$msg = "It appears that the Powerpress Feed URL we are trying to import is invalid.  You can check your settings or try to import manually below.";
						if ( $plugin->hasLogger ) $plugin->logger->error("Importer:\t".$msg);
						$error = true;
						$checkPowerpress = false;
					} elseif( !is_wp_error($powerpressFeed) && is_object($powerpressFeed) && !empty($powerpressFeed->items) ) {//default saved powepressfeed (stdclass)

						/* @deprecated 1.2.2.7 */
						/*
						//Prepare Table of elements
						$libsyn_feed_wp_list_table = new \Libsyn\Service\Table($feed_args, $powerpressFeed->items);
						$libsyn_feed_wp_list_table->item_headers = array(
							'id' => 'id'
							,'title' => 'Episode Title'
							,'description' => 'Description'
							,'permalink' => 'Episode Link'
							,'release_date' => 'Release Date'
						);
						$libsyn_feed_wp_list_table->prepare_items();
						*/
					} elseif ( is_wp_error($powerpressFeed) ) {
						if(!empty($powerpressFeed->{'errors'}) && !empty($powerpressFeed->{'errors'}['simplepie-error'][0])) {
								$msg = "Feed Reader Error:\t" . $powerpressFeed->{'errors'}['simplepie-error'][0];
						} else {
								$msg = "Your Powerpress feed cannot be read by the importer.  The feed may be invalid.";
						}
						if ( $plugin->hasLogger ) $plugin->logger->error("Importer:\t".$msg);
						$error = true;
					} else {
						$msg = "Something went wrong when trying to read your Powerpress Feed.  Or you can check your settings or try entering your Feed URL manually below.";
						if ( $plugin->hasLogger ) $plugin->logger->error("Importer:\t".$msg);
						$error = true;
						$checkPowerpress = false;
					}
				}
			}


			//check for clear or inserting of posts
			$clearImports = false;
			if(!empty($_POST['libsyn-importer-action'])) {
				switch($_POST['libsyn-importer-action']) {
					case "clear_imports":
						//handle clear imports
						$clearImports = true;
						break;
					case "add_player_to_posts":
						//Set Time Limit
						// $utilities->set_safe_time_limit(300);
						//handle add player to posts
						// $addImports = true;
						break;
				}
			}


			//Check in case feed import timed out
			if(empty($feedImportId) && ($ppFeedTriggered || $feedImportTriggered)) {
				$importStatus = (!empty($api) && $api instanceof \Libsyn\Api) ? $plugin->feedImportStatus($api, array('list_items' => true)) : false;
				if(!empty($importStatus->{'feed-import'}) && is_array($importStatus->{'feed-import'})) {
					if(!empty($importStatus->{'feed-import'}[0]->parent_job_id)) {
						$feedImportId = $importStatus->{'feed-import'}[0]->parent_job_id;
						if(!empty($feedImportId)) {
							update_user_option($current_user_id, 'libsyn-podcasting-feed_import_id', $feedImportId, false);
						}
					}
				}
			}

			if(empty($feedImportPosts) && ($ppFeedTriggered)) {
				if ( !empty($powerpressFeed) && ( !is_wp_error($powerpressFeed) && is_object($powerpressFeed) && !empty($powerpressFeed->items) ) ) {
					$feedImportPosts = $powerpressFeed->items;
				}
				if ( !isset($feedImportPosts) && !empty($powerpress_feed_items)) {//handle in case first call timed out with no response
					$feedImportPosts = $powerpress_feed_items;
				}
			}

			//Handle Feed
			if(!empty($feedImportId)) {
				if(!isset($importStatus)) {
					$importStatus = (!empty($api) && $api instanceof \Libsyn\Api) ? $plugin->feedImportStatus($api, array('job_id' => $feedImportId, 'list_items' => true)) : false;
				}

				/*
				$feed_args = array(
					'singular'=> 'libsyn_feed_item' //Singular label
					,'plural' => 'libsyn_feed_items' //plural label, also this well be one of the table css class
					,'ajax'   => false //We won't support Ajax for this table
					,'screen' => get_current_screen()
				);
				*/
				//setup new array with feed data
				$imported_feed = array();
				$x=0;

				//Feed Import Status
				if ( !empty($importStatus->{'feed-import'}) && is_array($importStatus->{'feed-import'})) {
					//WP Uses a page for posts.  Get it here to check against
					$page_for_posts_url = get_permalink( get_option( 'page_for_posts' ) );
					$insertPlayer = array(); //handled when player is inserted.

					//configure pagination
					$returnData = array();
					$returnData['total'] = count($importStatus->{'feed-import'});
					$returnData['pages'] = ceil( $returnData['total'] / $limit);
					$returnData['feed_locked'] = ( isset($importStatus->{'locked_status'}) ) ? $importStatus->{'locked_status'} : false;
					$offset = ( $page == 1 ) ? 0 : ($page - 1) * $limit;
					if ( $offset > $returnData['total'] ) {//default to last page of passing larger page than actually has
						$offset = ( ceil( $returnData['total'] / $limit) === 1 ) ? (ceil( $returnData['total'] / $limit) - 1) * ($limit - 1) : (ceil( $returnData['total'] / $limit) - 1) * $limit;
					}
					$working_importStatus = array_slice($importStatus->{'feed-import'}, $offset, $limit, true);
					if ( !empty($api) && $api instanceof \Libsyn\Api ) {
						$show = $plugin->getShow($api, $api->getShowId());
						if ( !empty($show) && !empty($show->{'user-shows'}) ) {
							$apiShow = $show->{'user-shows'};
						} else {
							$apiShow = false;
						}
					}


					foreach ($working_importStatus as $row) {
						//attempt to check for duplicates via permalink against wp post url
						if(function_exists('url_to_postid') && !empty($row->custom_permalink_url)) {
							$rowCustomPermalinkUrl = url_to_postid($row->custom_permalink_url);
						} else {
							$rowCustomPermalinkUrl = '';
						}

						//check parent job status
						if ( !empty($row->parent_job_status) && $row->parent_job_status !== 'completed' ) {
							$hasIncompleteImport = true;
						}

						if(!empty($feedImportPosts) && !empty($ppFeedTriggered)) {//has powerpress or local feed
							foreach ($feedImportPosts as $feed_item) {

								//Find the Id
								if ( !empty($feed_item->{'guid'}) ) {
									$working_id = $utilities->get_id_from_guid($feed_item->{'guid'});
								}
								if( empty($working_id) && !empty($feed_item->{'id'}) ) {
									$working_id = $feed_item->{'id'};
									$working_id = ( ( function_exists('mb_strpos') && mb_strpos($working_id, 'entry_') === false ) || ( strpos($working_id, 'entry_') === false ) ) ? $working_id : null;
									if ( function_exists('wp_parse_url') && !empty($row->guid) ) { //check to make sure the guid matches domain of site since we are grabbing the post id param
										$working_domain = wp_parse_url($row->guid, 'host');
										$working_domain_feed_link = wp_parse_url($feed_item->{'link'});
										if ( !empty($working_domain) && !empty($working_domain_feed_link) ) {
											$working_id = ($working_domain == $working_domain_feed_link) ? $working_id : null;
										}
										if ( isset($working_domain) ) unset($working_domain);
										if ( isset($working_domain_feed_link) ) unset($working_domain_feed_link);
									}
								}
								if( empty($working_id) && ( function_exists('url_to_postid') && !empty($feed_item->{'link'}) ) ) {
									$working_id = url_to_postid($feed_item->{'link'});
								}
								if ( empty($working_id) ) {
									$working_id = null;
								}

								//Check to make sure working_id matches up to what is being imported
								if (
									!empty($working_id) &&
									( empty($page_for_posts_url) || ( !empty($page_for_posts_url) && ( $row->custom_permalink_url !== $page_for_posts_url ) ) ) &&
									( !empty($feed_item->{'guid'}) && !empty($row->guid) && ( $feed_item->{'guid'} === $row->guid ) ) ||
									( !empty($row->guid) && ( ( function_exists('mb_strpos') && mb_strpos($row->guid, chr($working_id)) !== false ) || ( strpos($row->guid, chr($working_id)) !== false ) ) )
								) {
									$contentStatus = $row->primary_content_status;
									if(empty($contentStatus) && !empty($row->releases)) {
										if(is_array($row->releases)) {
											foreach($row->releases as $release) {
												if(!empty($release->{'release_state'}) && $release->{'release_state'} == "released") {
													$contentStatus = "available";
												}
											}
										}
									}

									//check for duplicate
									$duplicate = false;
									if ( !empty($imported_feed) ) {
										foreach( $imported_feed as $feed ) { //check to make sure this is not a duplicate
											if ( !empty($feed->id) && $feed->id === $row->id ) {
												$duplicate = true;
											}
										}
									}

									switch ( $contentStatus ) {
										case "":
										case null:
										case false:
											$contentStatus = "unavailable";
											$contentStatusColor = "style=\"color:red;\"";
											// $hasIncompleteImport = true;
											break;
										case "awaiting_payload":
											$contentStatus = "pending download";
											$contentStatusColor = "style=\"color:orange;\"";
											$hasIncompleteImport = true;
											break;
										case "failed":
											$contentStatusColor = "style=\"color:red;\"";
											break;
										case "available":
												try {
													if( !empty($working_id) && !$duplicate ) {
														$insertPlayer[] = array(
															'id'		=> $working_id,
															'show'		=> $apiShow,
															'data'		=> $row,
															'create_new'=> false
														);
													}
												} catch (Exception $e) {
													if ( $plugin->hasLogger ) $plugin->logger->error("Importer could not get list of episodes to insert:\t".$e->getMessage());
												}
											$contentStatusColor = "";
											break;
										default:
											$contentStatusColor = "";
									}
									if ( $clearImports ) {
										if(!empty($working_id)) {
											try {
												$importer->clearPlayer($working_id);
												$importer->clearMetadata($working_id);
											} catch (Exception $e) {
												if ( $plugin->hasLogger ) $plugin->logger->error("Importer could not clear imports:\t".$e->getMessage());
											}
										}
									}


									if ( !$duplicate ) {
										$contentStatus = ucfirst($contentStatus);
										$imported_feed[$x] = new \stdClass();
										$imported_feed[$x]->id = $row->id;
										$imported_feed[$x]->title = $row->item_title;
										$imported_feed[$x]->content = $row->item_body;
										$imported_feed[$x]->subtitle = $row->item_subtitle;
										$imported_feed[$x]->permalink = "<a " . $contentStatusColor ." href=\"".$row->url."\" target=\"_blank\">" . $contentStatus . "</a>";
										$imported_feed[$x]->status = $contentStatus;
										$imported_feed[$x]->release_date = $row->release_date;
										$x++;
									}
									if ( isset($contentStatus) ) unset($contentStatus);
								}
								if ( isset($feedItemId) ) unset($feedItemId);
								if ( isset($working_id) ) unset($working_id);
							}
						} elseif ( empty($ppFeedTriggered) ) {//has external feed import (make sure not pp feed import)

							if ( empty($rowCustomPermalinkUrl) ) {//check that this is not actually a wp post already
								$contentStatus = $row->primary_content_status;
								if(empty($contentStatus) && !empty($row->release_state) && $row->release_state === "released") {
									$contentStatus = "available";
								}

								$duplicate = false;
								if ( !empty($imported_feed) ) {
									foreach( $imported_feed as $feed ) {//check to make sure this is not a duplicate
										if ( !empty($feed->id) && $feed->id === $row->id ) {
											$duplicate = true;
										}
									}
								}

								switch ( $contentStatus ) {
									case "":
									case null:
									case false:
										$contentStatus = "unavailable";
										$contentStatusColor = "style=\"color:red;\"";
										// $hasIncompleteImport = true;
										break;
									case "awaiting_payload":
										$contentStatus = "pending download";
										$contentStatusColor = "style=\"color:orange;\"";
										$hasIncompleteImport = true;
										break;
									case "failed":
										$contentStatusColor = "style=\"color:red;\"";
										break;
									case "available":
											if ( !empty($row->id) ) {
												try {
													if ( !empty($row->id) && !$duplicate ) {
														$insertPlayer[] = array(
															'id'		=> $row->id,
															'show'		=> $apiShow,
															'data'		=> $row,
															'create_new'=> true
														);
													}
												} catch (Exception $e) {
													if ( $plugin->hasLogger ) $plugin->logger->error("Importer could not generate list of available episodes:\t".$e->getMessage());
												}
											}
										$contentStatusColor = "";
										break;
									default:
										$contentStatusColor = "";
								}

								if ( !$duplicate ) {
									$contentStatus = ucfirst($contentStatus);
									$imported_feed[$x] = new \stdClass();
									$imported_feed[$x]->id = $row->id;
									$imported_feed[$x]->title = $row->item_title;
									$imported_feed[$x]->content = $row->item_body;
									$imported_feed[$x]->subtitle = $row->item_subtitle;
									$imported_feed[$x]->permalink = "<a " . $contentStatusColor ." href=\"".$row->url."\" target=\"_blank\">" . $contentStatus . "</a>";
									$imported_feed[$x]->custom_permalink_url = $row->url;
									$imported_feed[$x]->status = $contentStatus;
									$imported_feed[$x]->release_date = $row->release_date;
									$x++;
								}
								if ( isset($contentStatus) ) unset($contentStatus);
							}
							if ( isset($working_id) ) unset($working_id);
						}
						if ( isset($rowCustomPermalinkUrl) ) unset($rowCustomPermalinkUrl);
					}

					/* @deprecated 1.2.2.7 */
					/*
					//Prepare Table of elements
					$libsyn_feed_status_wp_list_table = new \Libsyn\Service\Table($feed_args, $imported_feed);
					$libsyn_feed_status_wp_list_table->item_headers = array(
						'id' => 'id'
						,'title' => 'Episode Title'
						,'subtitle' => 'Subtitle'
						,'permalink' => 'Episode Link'
						,'release_date' => 'Release Date'
					);
					$libsyn_feed_status_wp_list_table->prepare_items();
					*/
				}
			}

			//Handle clear imports
			if($clearImports) {
				try {
					delete_user_option($current_user_id, 'libsyn-podcasting-pp_feed', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-pp_feed_url', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-pp_feed_triggered', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-feed_import_triggered', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-feed_import_id', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-feed_import_origin_feed', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-feed_import_libsyn_feed', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-feed_import_posts', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-feed_locked_status', false);
					delete_user_option($current_user_id, 'libsyn-podcasting-feed_owner_email', false);

					$importedPostIds = get_user_option('libsyn-podcasting-imported_post_ids');
					if(!empty($importedPostIds) && is_string($importedPostIds)) {
						$importedPostIds = json_decode($importedPostIds, true);
						if(is_array($importedPostIds)) {
							foreach($importedPostIds as $postId) {
								if(!empty($postId)) {
									if(function_exists('wp_delete_post')) wp_delete_post($postId, false);//setting 2nd param true forces delete and not to trash
									$importer->clearPlayer($postId);
									$importer->clearMetadata($postId);
								}

							}
						}
					}
					delete_user_option($current_user_id, 'libsyn-podcasting-imported_post_ids', false);
				} catch (Exception $e) {
					if ( $plugin->hasLogger ) $plugin->logger->error("Importer could not clear imports delete_user_options:\t".$e->getMessage());
				}
				$msg = "Cleared importer settings and posts from Wordpress";
			}

			if(isset($_POST['msg'])) $msg = $_POST['msg'];
			// if(isset($_POST['error'])) $error = ($_POST['error']==='true')?true:false;

			/* Handle Form Submit */
			if (!empty( $_POST )) {
				if($api instanceof \Libsyn\Api) { //Brand new setup or changes?
					if(!empty($_POST['libsyn-powerpress-feed-url-submit']) && ($_POST['libsyn-powerpress-feed-url-submit'] == "true")) {
						if(!empty($powerpressFeed)) {
							if(!is_wp_error($powerpressFeed) && !empty($powerpressFeed->feed_url)) {
								$importFeedUrl = $sanitize->url_raw($powerpressFeed->feed_url);
							} elseif(!empty($ppFeedUrl)) {//There may be a error when loading the feed try to use the feed url built above
								$importFeedUrl = $ppFeedUrl;
							}
						}
						if(empty($importFeedUrl)) {
							if(!is_wp_error($powerpressFeed)) {
								$msg = "Powerpress feed seems to be invalid.  Please check the following URL:  <em>{$powerpressFeed}</em>";
								$error = true;
							} else {
								$msg = "Powerpress feed seems to be invalid.  Please check your Powerpress Feed settings.";
								$error = true;
							}
						} else {
							update_user_option($current_user_id, 'libsyn-podcasting-pp_feed_triggered', 'true', false);
						}
					} elseif(!empty($_POST['libsyn-import-feed-url'])) {
						$importFeedUrl = $sanitize->url_raw($_POST['libsyn-import-feed-url']);
					}
					if ( !empty($importFeedUrl) ) {
						//run feed importer
						update_user_option($current_user_id, 'libsyn-podcasting-feed_import_triggered', 'true', false);
						$importData = $plugin->feedImport($api, array('feed_url' => $importFeedUrl));
						if ( !empty($importData) && $importData->{'status'} == "success" ) {//save callback data
							if ( !empty($importData->origin_feed) ) {
								update_user_option($current_user_id, 'libsyn-podcasting-feed_import_origin_feed', $importData->origin_feed, false);
							}
							if ( !empty($importData->feed_url) ) {
								update_user_option($current_user_id, 'libsyn-podcasting-feed_import_libsyn_feed', $importData->feed_url, false);
							}
							if ( !empty($importData->job_id) ) {
								update_user_option($current_user_id, 'libsyn-podcasting-feed_import_id', $importData->job_id, false);
							}
							if ( !empty($importData->entries) ) {
								update_user_option($current_user_id, 'libsyn-podcasting-feed_import_posts', $importData->entries, false);
							}
							if ( !empty($importData->locked_status) ) {
								update_user_option($current_user_id, 'libsyn-podcasting-feed_import_locked_status', $importData->locked_status, false);
							}
							if ( !empty($importData->owner_email) ) {
								update_user_option($current_user_id, 'libsyn-podcasting-feed_import_owner_email', $importData->owner_email, false);
							}
							$ranInitialImport = true;
							//setup cron emailer
							// $importerEmailer = (new \Libsyn\Service\Cron\ImporterEmailer())->activate();

						} else {
							$msg = "Feed Importer failed to import your feed please check your settings and try again.";
						}
					}

				} else { //Failed Api check
					$msg = "Could not run import since your Libsyn Show is not configured.  Please visit the Settings page.";
				}
			}


			/* Build Return Data */
			if ( !isset($returnData) ) {
				$returnData = array();
			}
			if ( isset($ranInitialImport) ) {
				$hasIncompleteImport = true;
			}
			if ( isset($hasIncompleteImport) ) {
				$returnData['processing_import'] = $hasIncompleteImport;
			}
			$returnData['feed_locked'] = true;
			//TODO: Future release return table_data to load WP_Table @see imports.php
			// if ( !empty($imported_feed) ) {
				// $returnData['table_data'] = $imported_feed;
			// }
			if ( !empty($insertPlayer) ) {
				$returnData['posts'] = $insertPlayer;
			}
			if ( empty($returnData) ) {
				$error = true;
			}
			if ( !empty($msg) ) {
				$returnData['error'] = $msg;
			}

			/* Handle API Creation/Update*/
			if((!$api)||($api->isRefreshExpired())) { //does not have $api setup yet in WP
				$error = true;
			}
			add_action( 'wp_feed_options', '\Libsyn\Utilities::enableFeedCaching' );

			//set output
			header('Content-Type: application/json');
			if ( !$error ) {
				echo json_encode( $returnData );
			} else {
				echo json_encode( array_merge(array(false), $returnData) );
			}
			exit;
		}
	}

}

?>
