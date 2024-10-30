<?php
$plugin = new \Libsyn\Service();
$utilities = new \Libsyn\Utilities();
$importer = new \Libsyn\Service\Importer();
$sanitize = new \Libsyn\Service\Sanitize();
$current_user_id = $plugin->getCurrentUserId();
$api = $plugin->retrieveApiById($current_user_id);
$integration = new \Libsyn\Service\Integration();
$render = true;
$error = false;
$libsyn_text_dom = $plugin->getTextDom();
add_action( 'wp_feed_options', '\Libsyn\Utilities::disableFeedCaching' ); //disable feed caching

//create import emailer
$importerEmailer = (new \Libsyn\Service\Cron\ImporterEmailer())->activate();//TODO: do additional testing to ensure this is correctly invoking the mailer

/* Handle saved api */
if ($api instanceof \Libsyn\Api && !$api->isRefreshExpired()) {
	$refreshApi = $api->refreshToken();
	if($refreshApi) { //successfully refreshed
		$api = $plugin->retrieveApiById($current_user_id);
	} else { //in case of a api call error...
		$handleApi = true;
		$clientId = (!isset($clientId)) ? $api->getClientId() : $clientId;
		$clientSecret = (!isset($clientSecret)) ? $api->getClientSecret() : $clientSecret;
		$api = false;
		if(isset($showSelect)) unset($showSelect);
	}
}

//Handle Checking Feed Status
$hasIncompleteImport = false;
$feedImportTriggered = get_user_option('libsyn-podcasting-feed_import_triggered');
$ppFeedTriggered = get_user_option('libsyn-podcasting-pp_feed_triggered');
$powerpressFeed = get_user_option('libsyn-podcasting-pp_feed');
$powerpressFeedUrl = get_user_option('libsyn-podcasting-pp_feed_url');
$feedImportId = get_user_option('libsyn-podcasting-feed_import_id');
$originFeedUrl = get_user_option('libsyn-podcasting-feed_import_origin_feed');
$libsynFeedUrl = get_user_option('libsyn-podcasting-feed_import_libsyn_feed');
$feedImportPosts = get_user_option('libsyn-podcasting-feed_import_posts');
$importedPostIds = get_user_option('libsyn-podcasting-imported_post_ids');
$hasSavedData = (!empty($ppFeedTriggered) || !empty($feedImportId) || !empty($feedImportPosts) || !empty($importedPostIds) || !empty($powerpressFeedUrl));
// $importFeedLocked = get_user_option('libsyn-podcasting-feed_import_locked_status');
// $importFeedOwnerEmail = get_user_option('libsyn-podcasting-feed_import_owner_email');
// testing
// $feedImportTriggered = true;
$importFeedLocked = false;
$importFeedOwnerEmail = 'email@example.com';

if ( ( $feedImportTriggered || $ppFeedTriggered ) && $importFeedLocked ) {
	$error = true;
	$ownerEmail = ($importFeedOwnerEmail) ? $importFeedOwnerEmail : 'the owner email address';
	$msg = "The podcast feed is currently locked, a email has been sent to " . $ownerEmail . ", please follow the directions in the email to unlock.  This feed import will automatically continue after verification, no need to restart the import process.";
}

//Handle Powerpress Integration
$checkPowerpress = $integration->checkPlugin('powerpress');
if($checkPowerpress) {
	if ( ( empty($_POST['libsyn-powerpress-feed-url-submit']) && empty($_POST['libsyn-importer-action']) ) && ( empty($powerpressFeed) || empty($ppFeedTriggered) ) ) {
		global $wp_rewrite;
		if ( !empty($wp_rewrite->{'feed_base'}) ) {
			$feedBase = $wp_rewrite->{'feed_base'};
		} else {//just default to feed if unknown
			$feedBase = 'feed';
		}
		if(in_array('podcast', $wp_rewrite->{'feeds'}) && in_array('feed', $wp_rewrite->{'feeds'})) {
			$ppMainFeedUrl = get_site_url() . "/{$feedBase}/podcast";
		} else {
			$ppMainFeedUrl = get_site_url() . "/{$feedBase}";
		}
		//handle pp category feeds
		$ppSettings = get_option('powerpress_general', false);
		if ( !empty($ppSettings) ) {
			if ( !empty($ppSettings['cat_casting']) ) {//has category casting
				if ( empty($powerpressFeedUrl) ) {
					$required_text = ' required';
				} else {//Has Powerpress Category Feed Url Selected
					$ppFeedUrl = $powerpressFeedUrl;
					$required_text = '';
				}

				if ( !empty($ppSettings['custom_cat_feeds']) && is_array($ppSettings['custom_cat_feeds']) ) {
					if ( count($ppSettings['custom_cat_feeds']) > 1 ) {//Build category selector
						$ppCategorySelector = "<br /><fieldset class=\"" . LIBSYN_NS . "_pp_category_selector\"><legend>Select Powerpress Category Feed</legend>";

						//Statically Make Primary feed first option
						if ( !empty($ppMainFeedUrl) ) {
							$ppCategorySelector .=
							"<div>
								<input type=\"radio\" id=\"pp_cat_key_0\" name=\"pp_category_feed_selector\" value=\"{$ppMainFeedUrl}\" class=\"validate{$required_text}\" />
								<label for=\"pp_cat_key_0\"><strong>Full Feed (All Categories):</strong>\t<a href=\"{$ppMainFeedUrl}\" target=\"_blank\">{$ppMainFeedUrl}</a></label>
							</div>";
						}

						foreach($ppSettings['custom_cat_feeds'] as $key => $working_ppCatKey) {
							$category = $category = get_category_to_edit($working_ppCatKey);
							if ( !empty($category) && $category instanceof WP_Term ) {
								$cat_name = (!empty($category->cat_name)) ? $category->cat_name : '';
								$cat_name = (empty($cat_name) && !empty($category->name)) ? $category->name : '';
								$cat_name = (empty($cat_name) && !empty($category->slug)) ? $category->slug : '';
								if ( !empty($category->slug) ) {
									$working_ppFeedUrl = get_site_url() . "/category/{$category->slug}/{$feedBase}";
									$ppCategorySelector .=
									"<div>
										<input type=\"radio\" id=\"pp_cat_key_{$working_ppCatKey}\" name=\"pp_category_feed_selector\" value=\"{$working_ppFeedUrl}\" class=\"validate{$required_text}\" />
										<label for=\"pp_cat_key_{$working_ppCatKey}\"><strong>{$cat_name}:</strong>\t<a href=\"{$working_ppFeedUrl}\" target=\"_blank\">{$working_ppFeedUrl}</a></label>
									</div>";
								}
							}
							if(isset($category)) unset($category);
							if(isset($cat_name)) unset($cat_name);
							if(isset($working_ppFeedUrl)) unset($working_ppFeedUrl);
						}
						$ppCategorySelector .= "<div id=\"helper-text\" style=\"display:none;color:red;\"></div></fieldset>";
					} else {
						$ppCatKey = reset($ppSettings['custom_cat_feeds']);
						$category = get_category_to_edit($ppCatKey);
						if ( !empty($category) && $category instanceof WP_Term ) {
							if ( !empty($category->slug)  && !isset($ppFeedUrl) ) {
								$ppFeedUrl = get_site_url() . "/category/{$category->slug}/{$feedBase}";
							}
						}
					}
				}
			}
		}

		if( !isset($ppFeedUrl) && !empty($ppMainFeedUrl) ) {
			$ppFeedUrl = $ppMainFeedUrl;
		} else {
			if ( $plugin->hasLogger ) $plugin->logger->error("Importer powerpress feed url is empty.");
		}
		if( function_exists('fetch_feed') ) {
			$powerpressFeed = fetch_feed( $ppFeedUrl );
		} else {
			$powerpressFeed = $utilities->libsyn_fetch_feed( $ppFeedUrl );
		}
	}

	if ( !empty($powerpressFeed) ) {
		//Feed Arguments
		$feed_args = array(
			'singular'=> 'libsyn_feed_item' //Singular label
			,'plural' => 'libsyn_feed_items' //plural label, also this well be one of the table css class
			,'ajax'   => false //We won't support Ajax for this table
			,'screen' => get_current_screen()
		);

		if(!is_wp_error($powerpressFeed) && $powerpressFeed instanceof \SimplePie) {
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

			//Save PP Feed to Meta
			if( !empty($ppFeedUrl) ) {
				$working_powerpressFeed = new \stdClass();
				$working_powerpressFeed->{'feed_url'} = $ppFeedUrl;
				$working_powerpressFeed->{'items'} = $powerpress_feed_items;
				update_user_option($current_user_id, 'libsyn-podcasting-pp_feed', $working_powerpressFeed, false);
				unset($working_powerpressFeed);
			}

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
		} elseif( !is_wp_error($powerpressFeed) && $powerpressFeed instanceof \__PHP_Incomplete_Class) {//unserialized instanceof SimplePie (Causes serialize/unserialize problem)
			$msg = "It appears that the Powerpress Feed URL we are trying to import is invalid.  You can check your settings or try to import manually below.";
			if ( $plugin->hasLogger ) $plugin->logger->error("Importer:\t".$msg);
			$error = true;
			$checkPowerpress = false;
		} elseif( !is_wp_error($powerpressFeed) && is_object($powerpressFeed) && !empty($powerpressFeed->items) ) {//default saved powepressfeed (stdclass)
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
		} elseif( is_wp_error($powerpressFeed) ) {
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
$addImports = false;
if(!empty($_POST['libsyn-importer-action'])) {
	switch($_POST['libsyn-importer-action']) {
		case "clear_imports":
			//handle clear imports
			$clearImports = true;
			break;
		case "add_player_to_posts":
			//Set Time Limit
			$utilities->set_safe_time_limit(300);
			//handle add player to posts
			$addImports = true;
			break;
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
if(isset($_POST['error'])) $error = ($_POST['error']==='true')?true:false;

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
		if(!empty($importFeedUrl)) {
			//run feed importer
			update_user_option($current_user_id, 'libsyn-podcasting-feed_import_triggered', 'true', false);
			$importData = $plugin->feedImport($api, array('feed_url' => $importFeedUrl));
			if(!empty($importData) && $importData->{'status'} == "success") {//save callback data
				if(!empty($importData->origin_feed)) {
					update_user_option($current_user_id, 'libsyn-podcasting-feed_import_origin_feed', $importData->origin_feed, false);
				}
				if(!empty($importData->feed_url)) {
					update_user_option($current_user_id, 'libsyn-podcasting-feed_import_libsyn_feed', $importData->feed_url, false);
				}
				if(!empty($importData->job_id)) {
					update_user_option($current_user_id, 'libsyn-podcasting-feed_import_id', $importData->job_id, false);
				}
				if(!empty($importData->entries)) {
					update_user_option($current_user_id, 'libsyn-podcasting-feed_import_posts', $importData->entries, false);
				}

				//setup cron emailer
				$importerEmailer = (new \Libsyn\Service\Cron\ImporterEmailer())->activate();

			} else {
				$msg = "Feed Importer failed to import your feed please check your settings and try again.";
			}
		}

	} else { //Failed Api check
		$msg = "Could not run import since your Libsyn Show is not configured.  Please visit the Settings page.";
	}
}

/* Handle API Creation/Update*/
if((!$api)||($api->isRefreshExpired())) { //does not have $api setup yet in WP
	$render = false;
}

/* Set Notifications */
global $libsyn_notifications;
do_action('libsyn_notifications');
?>

<?php wp_enqueue_script( 'jquery-ui-core', array('jquery')); ?>
<?php wp_enqueue_script( 'jquery-ui-dialog', array('jquery')); ?>
<?php wp_enqueue_script( 'jquery-validate' ); ?>
<?php wp_enqueue_script('jquery-form' ); ?>
<?php wp_enqueue_script( 'libsyn-meta-form' ); ?>
<?php wp_enqueue_script( 'libsyn-imports' ); ?>
<?php wp_enqueue_style( 'animate' ); ?>
<?php //wp_enqueue_script( 'jquery-easing' ); ?>
<?php wp_enqueue_style( 'wp-jquery-ui-dialog'); ?>
<?php wp_enqueue_style( 'libsyn-meta-boxes' ); ?>
<?php wp_enqueue_style( 'libsyn-meta-form' ); ?>
<?php wp_enqueue_style( 'libsyn-dashicons' ); ?>

	<style media="screen" type="text/css">
	.code { font-family:'Courier New', Courier, monospace; }
	.code-bold {
		font-family:'Courier New', Courier, monospace;
		font-weight: bold;
	}
	</style>

	<!-- Main Body Area -->
	<div class="wrap">
	  <?php if (isset($msg)) echo $plugin->createNotification($msg, $error); ?>
	  <h2><?php _e("Publisher Hub - Import Feed", $libsyn_text_dom); ?><span style="float:right;"><a href="http://www.libsyn.com/"><img src="<?php _e(plugins_url( LIBSYN_DIR . '/lib/images/libsyn_dark-small.png'), $libsyn_text_dom); ?>" title="Libsyn Podcasting" height="28px"></a></span></h2>
	  <form name="<?php echo LIBSYN_NS . "form" ?>" id="<?php echo LIBSYN_NS . "form" ?>" method="post">
		 <div id="poststuff">
		  <div id="post-body">
			<div id="post-body-content">
			<?php if((isset($api) && ($api !== false)) || $render) {
				$render_error = false;
			} else {
				$render_error = true;
			}
			?>
			<input type="hidden" id="libsyn-importer-action" name="libsyn-importer-action" />
			<!-- BOS Existing API -->
			  <div class="stuffbox libsyn-meta-box" style="width:93.5%; display: <?php echo (!$render_error) ? 'block' : 'none'; ?>">
				<h3 class="inside hndle"><label><?php _e("Source Feed Information", $libsyn_text_dom); ?></label></h3>
				<div class="inside" style="margin: 15px;">
				  <table class="form-table" style="display: <?php echo ( $render_error === false ) ? 'table' : 'none'; ?>;">
					<tr valign="top" style="border-bottom:none;">
					  <th></th>
					  <td>
						<div style="width:50%;">
							<?php if(!$hasSavedData) { ?>
							<p class="libsyn-import-information"><em><?php _e("Here you can import a external Podcast Feed into your Libsyn account for use under Wordpress.", $libsyn_text_dom); ?></em></p>
							<?php } else { ?>
							<p class="libsyn-import-information"><em><!--Feed Import Text --></em></p>
							<?php } ?>
						</div>
					  </td>
					</tr>
					<?php $pp_empty_feed_status_display = ($checkPowerpress && empty($libsyn_feed_status_wp_list_table) && !$feedImportTriggered) ? "contents" : "none"; ?>
					<tr id="pp-feed" valign="top" style="display: <?php echo $pp_empty_feed_status_display; ?>;">
					  <th><?php _e("Powerpress", $libsyn_text_dom); ?></th>
					  <td>
						<div class="input-field">
							<p style="font-size:1.1em;font-weight:bold;"><?php _e("Local Powerpress Feed Detected!", $libsyn_text_dom); ?></p>
							<?php if ( !empty($ppCategorySelector) ) { echo $ppCategorySelector; } elseif ( !empty($ppFeedUrl) ) { ?><p><strong>Powerpress Feed Url:</strong>&nbsp;&nbsp;<?php echo '<a href="' . $ppFeedUrl . '" target="_blank" title="Powerpress Feed Url" alt="Powerpress Feed Url">' . $ppFeedUrl . '</a>'; ?></p><?php } ?>
							<br />
							<?php if(!empty($libsyn_feed_wp_list_table) && empty($libsyn_feed_status_wp_list_table)) {
								$libsyn_feed_wp_list_table->display();
							} ?>
							<p><?php _e("Would you like to import the feed below to your Libsyn account and update existing posts with the Libsyn Player?", $libsyn_text_dom); ?><br /><strong><?php _e("Note:", $libsyn_text_dom); ?>&nbsp;&nbsp;</strong><?php _e("This would not replace any existing expisodes in your libsyn account.", $libsyn_text_dom); ?></p>
							<br />
							<div style="display:inline;">
								<button type="button" id="libsyn_import_powerpress_feed" class="button button-primary libsyn-dashicons-upload"><?php _e('Import Local Feed Above', $libsyn_text_dom); ?></button>
								&nbsp;-OR-&nbsp;
								<button type="button" id="libsyn_toggle_show_feed_importer" class="button button-primary libsyn-dashicons-download" onclick="toggleShowFeedImporter()"><?php _e('Import from a different Feed URL', $libsyn_text_dom); ?></button>
								<input type="hidden" id="libsyn-powerpress-feed-url-submit" name="libsyn-powerpress-feed-url-submit" />
								<?php if($hasSavedData) { ?>
								&nbsp;-OR-&nbsp;
								<button type="button" class="button button-primary libsyn-dashicons-trash libsyn_clear_imports button-width-260"><?php _e('Clear all Imports Data', $libsyn_text_dom); ?></button>
								<?php } ?>
							</div>
						</div>
					  </td>
					</tr>
					<?php $imports_html_display = ( !empty($feedImportId) ) ? 'visible' : 'hidden'; ?>
					<tr valign="top" id="processing-import" style="visibility: <?php echo $imports_html_display; ?>;opacity: <?php echo ($imports_html_display === 'visible') ? 1 : 0; ?>;transition: visibility 0s linear 0.33s, opacity 0.33s linear;">
					  <th><?php _e("Feed Import", $libsyn_text_dom); ?></th>
					  <td>
						<div class="input-field">
							<div id="import-feed-status" style="visibility: <?php echo $imports_html_display; ?>;opacity: <?php echo ( $imports_html_display === 'visible' ) ? 1 : 0; ?>;transition: visibility 0s linear 0.33s, opacity 0.33s linear;display: <?php echo ($imports_html_display === 'visible') ? 'contents' : 'none'; ?>;">
								<?php if ( !empty($libsyn_feed_status_wp_list_table) && $hasIncompleteImport ) { ?>
								<p class="libsyn-import-status"><?php _e("Feed Import Status", $libsyn_text_dom); ?> - <span style="color:orange;"><?php _e("Processing", $libsyn_text_dom); ?></span></p>
								<?php } elseif ( !empty($libsyn_feed_status_wp_list_table) && !$hasIncompleteImport ) { ?>
								<p class="libsyn-import-status"><?php _e("Feed Import Status", $libsyn_text_dom); ?> - <span style="color:#60a135;"><?php _e("Success", $libsyn_text_dom); ?></span></p>
								<?php } elseif ( empty($libsyn_feed_status_wp_list_table) ) { ?>
								<p class="libsyn-import-status"><?php _e("Feed Import Status", $libsyn_text_dom); ?></p>
								<?php } else { ?>
								<p class="libsyn-import-status"><?php _e("Feed Import Status", $libsyn_text_dom); ?></p>
								<?php } ?>
							</div>
							<br />
							<div class="libsyn-inline-box" style="border: 0px;" id="feed-import-fetching-posts" style="display:none;">
								<p id="feed-import-fetching-posts-p">Fetching Episodes</p>
								<progress id="feed-import-fetching-posts-progress" value="0" max="100"></progress>
							</div>
							<br />
							<?php $render_display = ( $render ) ? "contents" : "none"; //TODO: handle render display to show/hide content?>
							<?php //$feed_import_currently_processing_display = ( $hasIncompleteImport ) ? "contents" : "none"; ?>

							<div id="feed-import-currently-processing" class="libsyn-inline-box" style="display:none;">
								<div id="libsyn-check-feed-import-status" style="display: inline-block;">
									<p style="font-size:1.1em;"><?php _e("Checking Feed Import Status", $libsyn_text_dom); ?></p>
								</div>
								<p><strong><?php _e("Your feed import is currently processing.", $libsyn_text_dom); ?></strong>&nbsp;<?php _e("This may take several minutes to complete. You will be notified when this process is finished.", $libsyn_text_dom); ?></p>
							</div>
							<?php //$feed_import_congratulations_display =  ( !empty($libsyn_feed_status_wp_list_table) && !$hasIncompleteImport ) ? "contents" : "none"; ?>
							<div id="feed-import-congratulations" style="display:none;">
								<p>
									<?php _e("Congratulations! You have successfully imported your RSS feed. Your next step is to create a 301 redirect which will point your old RSS feed to your new RSS feed, and setup a special \"new feed URL\" tag in your Libsyn feed. Please follow these steps to setup a 301 redirect:", $libsyn_text_dom); ?>
								</p>
								<br />
								<ul>
									<li>–&nbsp;<?php _e("Download Redirection", $libsyn_text_dom); ?></li>
									<li>–&nbsp;<?php _e("Go under Tools", $libsyn_text_dom); ?> --> <?php _e("Redirection and hit Add New", $libsyn_text_dom); ?></li>
									<li>–&nbsp;<?php _e("In the Source URL, enter your old feed URL", $libsyn_text_dom); ?></li>
									<li>–&nbsp;<?php _e("In the Target URL, enter your Libsyn RSS feed URL", $libsyn_text_dom); ?></li>
									<li>–&nbsp;<?php _e("Hit Add Redirect", $libsyn_text_dom); ?></li>
								</ul>
									<?php _e("Please follow these steps to setup a new feed URL tag in your Libsyn feed:", $libsyn_text_dom); ?>
								<br />
								<ul>
									<li>–&nbsp;<?php _e("Log into your ", $libsyn_text_dom); ?><a href="https://login.libsyn.com" target="_blank" title="Libsyn Dashboard" alt="Libsyn Dashboard"><?php _e("Libsyn Dashboard", $libsyn_text_dom); ?></a></li>
									<li>–&nbsp;<?php _e("Select Destinations", $libsyn_text_dom); ?></li>
									<li>–&nbsp;<?php _e("Select Libsyn Classic Feed", $libsyn_text_dom); ?></li>
									<li>–&nbsp;<?php _e("Scroll towards the bottom and select Advanced Options", $libsyn_text_dom); ?></li>
									<li>–&nbsp;<?php _e("Enter the Apple Podcasts redirect tag in the Extra RSS Tags text box:", $libsyn_text_dom); ?></li>
									<li><strong>&lt;itunes:new-feed-url&gt;<?php if ( !empty($libsynFeedUrl) ) { echo $libsynFeedUrl; } else { echo 'http://www.myfeedurl.com/rss.xml'; } ?>&lt;/itunes:new-feed-url&gt;</strong></li>
									<li><small><?php if ( !empty($libsynFeedUrl) ) { echo __('Note: ', $libsyn_text_dom) . '“' . $libsynFeedUrl . '”'. __(' is your current imported destination (Libsyn) feed url.', $libsyn_text_dom); } else { echo __('Replace ', $libsyn_text_dom) . '“http://www.myfeedurl.com/rss.xml” ' . __('with whatever the URL of the feed you will be using (Libsyn) is.', $libsyn_text_dom); } ?></small></li>
								</ul>
								<br />
								<?php $pp_feed_triggered_display = ( !empty($ppFeedTriggered) ) ? "contents" : "none"; ?>
								<div id="pp-feed-triggered" style="display:<?php echo $pp_feed_triggered_display; ?>;">
									<br />
									<p style="font-size:1.1em;font-weight:bold;"><?php _e("If Migrating from Powerpress", $libsyn_text_dom); ?></p>
									<?php _e("Once your redirects are in place, your next step is to update the player on your WordPress posts to the Libsyn player.", $libsyn_text_dom); ?>
									<br />
									<ul>
										<li>–&nbsp;<?php _e("Come back to this page, scroll to the bottom, and hit \"Add Libsyn Player to Wordpress Posts\".", $libsyn_text_dom); ?></li>
										<li>–&nbsp;<?php echo __("Go under Plugins", $libsyn_text_dom) . " --> " . __("Installed Plugins", $libsyn_text_dom); ?></li>
										<li>–&nbsp;<?php _e("Hit Deactivate for PowerPress", $libsyn_text_dom); ?></li>
									</ul>
									<p><?php _e("This will update your player on your Wordpress posts to your Libsyn player, and completes your migration process from Powerpress to Libsyn.", $libsyn_text_dom); ?></p>
								</div>
							</div>
							<br />
							<div id="feed-import-empty-display" style="display:none;">
								<?php $feed_import_empty_display = ( empty($ppFeedTriggered) && empty($libsyn_feed_status_wp_list_table) ) ? "contents" : "none"; ?>
								<p id="feed-import-empty-p" style="display:<?php echo $feed_import_empty_display; ?>;">
									<?php _e("We initiated the feed importer, but it appears that the media imported into your Libsyn account may already exist or media failed to download from your feed.  Please make sure the media from your feed import is available and/or make sure the media does not already exist in your Libsyn account.", $libsyn_text_dom); ?>
								</p>
								<br />
								<p>
									<strong>
										<?php _e("Depending on the size of your feed, the importer may take some time to process, try waiting a few minutes then refreshing your browser.", $libsyn_text_dom); ?>
									</strong>
								</p>
								<br />
								<p>
									<?php echo __("If the importer is still not working then you may ", $libsyn_text_dom) . "<strong>" . __("Clear all imports data", $libsyn_text_dom) . "</strong>" . __(" and try again.", $libsyn_text_dom); ?>
								</p>
								<br />
								<button type="button" class="button button-primary libsyn-dashicons-trash libsyn_clear_imports button-width-260"><?php echo __('Clear all Imports Data', $libsyn_text_dom); ?></button>
							</div>
							<div id="feed-import-locked-display" style="display:none;">
								<?php $feed_import_locked_display = ( $importFeedLocked ) ? "contents" : "none"; ?>
								<?php $ownerEmail = ($importFeedOwnerEmail) ? $importFeedOwnerEmail : 'the owner email address'; ?>
								<div style="box-shadow: 0 10px 6px -6px #ff9966;margin-bottom: 4px; border: 1px solid #ff9966; padding: 5px 3px;font-weight: 600;">
									<p id="feed-import-locked-p" style="display:<?php echo $feed_import_locked_display; ?>;">
										<?php _e("We initiated the import process, but the podcast feed is currently locked.  A email has been sent to " . $ownerEmail . ", please follow the directions provided in the email to unlock it first.", $libsyn_text_dom); ?>
									</p>
									<br />
									<br />
									<p>
										<?php _e("This feed import will automatically continue after following the email verification to unlock, no need to restart the import process.", $libsyn_text_dom); ?>
									</p>
								</div>
								<br />
								<br />
								<p>
									<?php echo __("If the importer is still not working then you may ", $libsyn_text_dom) . "<strong>" . __("Clear all imports data", $libsyn_text_dom) . "</strong>" . __(" and try again.", $libsyn_text_dom); ?>
								</p>
								<br />
								<button type="button" class="button button-primary libsyn-dashicons-trash libsyn_clear_imports button-width-260"><?php echo __('Clear all Imports Data', $libsyn_text_dom); ?></button>
							</div>
							<div class="rotating-list-container libsyn-inline-box" id="import-add-episodes" title="Adding Episodes to Wordpress">
								<h3 id="import-add-episodes-header">Adding Episodes to Wordpress</h3>
								<div class="rotating-list-header slide" id="adding-current-item" style="font-size: 1.2em;">
									<div class="rotating-list-static">
									<?php echo "Adding Player:\t"; ?>
									<ul class="rotating-list">

									</ul>
									</div>
								</div>
								<progress id="add-episodes-progress" value="0" max="100"></progress>
								<br />&nbsp;<br />
							</div>
							<?php if ( !empty($libsyn_feed_status_wp_list_table) ) {
								$libsyn_feed_status_wp_list_table->display();
								$add_player_to_posts_display = "inline";
							} else {
								$add_player_to_posts_display = "none";
							} ?>
							<div id="add-player-to-posts" style="display:<?php echo $add_player_to_posts_display; ?>">
								<button type="button" id="libsyn_add_player_to_posts" class="button button-primary libsyn-dashicons-format-video button-width-260"><?php echo __('Add Libsyn Player to Posts', $libsyn_text_dom); ?></button>
								&nbsp;-OR-&nbsp;
								<button type="button" class="button button-primary libsyn-dashicons-trash libsyn_clear_imports button-width-260"><?php echo __('Clear all Imports Data', $libsyn_text_dom); ?></button>
							</div>
						</div>
					  </td>
					</tr>
					<?php $check_pp_display = ( $checkPowerpress ) ? "none" : "contents"; ?>
					<tr valign="top" id="libsyn-feed-import-tr" style="display: <?php echo $check_pp_display; ?>;">
					  <th><?php _e("Feed URL", $libsyn_text_dom); ?></th>
					  <td>
						<div class="input-field">
							<input type="url" style="width:64%;height:38px;" name="libsyn-import-feed-url" id="libsyn-import-feed-url" class="validate" pattern="https?://.+" />
							<span class="helper-text" data-error="Invalid Feed" data-success="Feed Valid"></span>
							<button type="button" id="libsyn_import_feed_rss" class="button button-primary libsyn-dashicons-update"><?php echo __('Import Feed', $libsyn_text_dom); ?></button>
							<?php if($hasSavedData) { ?>
							<button type="button" class="button button-primary libsyn-dashicons-trash libsyn_clear_imports button-width-260"><?php echo __('Clear all Imports Data', $libsyn_text_dom); ?></button>
							<?php } ?>
						</div>
					  </td>
					</tr>
					<?php if ( $api instanceof \Libsyn\Api && is_int($api->getShowId()) ) { ?>
					<tr valign="top">
						<th></th>
						<td>
							<div class="inside" style="margin: 15px;"><?php _e("Libsyn is connected to your Wordpress account successfully.", $libsyn_text_dom); ?></div>
						</td>
					</tr>
					<?php } ?>
				  </table>
				</div>
			  </div>
			<!-- EOS Existing API -->
			  <!-- Dialogs -->
			  <div id="import-libsyn-player-dialog" class="hidden" title="Post Import">
				<p><?php echo '<span style="color:red;font-weight:600;">' . __('Warning!', $libsyn_text_dom) . '</span> ' . __('By accepting you will modifying your Wordpress Posts with adding the player to the available feed import posts.  Would you like to proceed?', $libsyn_text_dom); ?></p>
				<p id="extra-text"></p>
				<br />
			  </div>
			  <div id="clear-settings-dialog" class="hidden" title="Confirm Clear Settings">
				<p><?php echo '<span style="color:red;font-weight:600;">' . __('Warning!', $libsyn_text_dom) . '</span> ' . __('By accepting you will be removing all your import settings.  Click yes to continue.', $libsyn_text_dom); ?></p>
				<p id="extra-text"><?php echo '<span style="color:gray;font-weight:600;">' . __("NOTE:", $libsyn_text_dom) . '</span>  ' . __("You will also need to remove any imported posts from your within the Libsyn Account Dashboard.", $libsyn_text_dom); ?></p>
				<br />
			  </div>
			  <div id="accept-import-dialog" class="hidden" title="Confirm Import">
				<p><?php echo '<span style="color:red;font-weight:600;">' . __('Warning!', $libsyn_text_dom) . '</span> ' . __('By accepting you will importing the episodes in your external feed into your Libsyn Account. Would you like to proceed?', $libsyn_text_dom); ?></p>
				<br />
			  </div>
			<!-- BOS Existing API -->
			  <div class="stuffbox libsyn-meta-box" style="width:93.5%; display: <?php echo ( $render_error ) ? 'block' :  'none'; ?>">
				<h3 class="hndle"><span><?php _e("Plugin needs configured", $libsyn_text_dom); ?></span></h3>
				<div class="inside" style="margin: 15px;">
				  <p style="font-size: 1.8em;"><?php echo __("The Libsyn Publisher Hub is either not setup or something is wrong with the configuration, please visit the ", $libsyn_text_dom) . "<a href=\"".admin_url('admin.php?page=LibsynSettings')."\">" . __("settings page", $libsyn_text_dom) . "</a>."; ?></p>
				</div>
			  </div>
			<!-- EOS Existing API -->
			<!-- BOS Libsyn WP Post Page -->
			<div class="stuffbox libsyn-meta-box" id="libsyn-wp-post-page" style="display:none; width:93.5%;">

			</div>
			<!-- EOS Libsyn WP Post Page -->
			</div>
		  </div>
		</div>
	  </form>
	</div>
	<script type="text/javascript">
		(function($){
			$(document).ready(function(){

				//Set Overlays
				setOverlays = function() {
					//make sure overlays are not over dialogs
					$(".ui-widget-overlay").each(function() {
						$(this).css("z-index", 999);
						$(this).attr("style", "z-index:999;");
					});
					$(".ui-dialog-title").each(function() {
						$(this).css("z-index", 1002);
					});
					$(".ui-dialog").each(function() {
						$(this).css("z-index", 1002);
					});
					$(".ui-colorpicker").each(function() {
						$(this).css("z-index", 1003);
					});
				}

				//global libsyn_imports
				libsyn_imports = {};
				libsyn_imports.text_dom = "<?php echo LIBSYN_NS; ?>";
				libsyn_imports.ajax_base_url = "<?php echo $sanitize->url_raw($plugin->admin_url()); ?>";
				libsyn_imports.admin_url = "<?php echo $plugin->admin_url('admin.php'); ?>";
				libsyn_imports.form_id = "<?php echo "#" . LIBSYN_NS . "form"; ?>";
				libsyn_imports.feed_import_triggered = <?php echo ( !empty($feedImportTriggered) ) ? "true" : "false"; ?>;
				libsyn_imports.pp = {};
				libsyn_imports.pp.check = <?php echo ( $checkPowerpress ) ? "true" : "false"; ?>;
				libsyn_imports.pp.feed_url = <?php echo ( !empty($powerpressFeedUrl) ) ? $powerpressFeedUrl : "''"; ?>;
				libsyn_imports.pp.category_check = <?php echo ( !empty($ppCategorySelector) ) ? "true" : "false"; ?>;
				libsyn_imports.data = <?php echo ( !empty($insertPlayer) ) ? json_encode($insertPlayer) : "[]"; ?>;
				libsyn_imports.check_import_status = <?php echo ( !empty($feedImportId) || (empty($feedImportId) && ($ppFeedTriggered || $feedImportTriggered)) ) ? "true" : "false"; ?>;
			});
		})(jQuery);
	</script>
