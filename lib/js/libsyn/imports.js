const { __ } = wp.i18n;

(function($){
	$(document).ready(function(){
		if ( typeof libsyn_imports !== 'undefined' && !!libsyn_imports.feed_import_triggered ) { //	Only run check before feed import has been triggered to save on resources
			let ajax_error_message = __("Something went wrong when trying to load your site\'s base url.  Please make sure your \"Site Address (URL)\" in Wordpress settings is correct.", libsyn_imports.text_dom);
			let ajax_error_url = libsyn_imports.ajax_base_url + "?page=LibsynImports&error=true&msg=" + ajax_error_message;
			fetch( libsyn_imports.ajax_base_url + '?action=libsyn_check_url&libsyn_check_url=1', {
				method: 'get'
			}).then( response => {
				return response.json();
			}).then( json => {
				if ( !!!json ) {
					libsynRedirect(ajax_error_url);
				}
			}).catch( error => {
				libsynRedirect(ajax_error_url);
			});
		}
		document.getElementById('libsyn_toggle_show_feed_importer').addEventListener('click', () => {
			document.getElementById('#libsyn-feed-import-tr').classList.toggle('libsyn-hide');
		});

		/* Normal Feed Submission */
		document.getElementById('libsyn_import_feed_rss').addEventListener('click', () => {
			//check if input fields are valid
			$( libsyn_imports.form_id ).validate({
			//TODO: Remove $ from all, find solution other than $.validate()
			// document.getElementById( libsyn_imports.form_id ).validate({
				rules: {
					"libsyn-import-feed-url": {
						required: true,
						url: true,
					}
				},
				messages: {
					"libsyn-import-feed-url": {
						url: "You must enter a valid Feed URL",
						required: "Feed URL cannot be empty"
					}
				}
			});
				if ( $( libsyn_imports.form_id ).valid() ) {
					//handle submission & dialog
					$( "#accept-import-dialog" ).dialog({
						autoOpen: false,
						draggable: false,
						height: 'auto',
						width: 'auto',
						modal: true,
						resizable: false,
						open: function(event,ui){
							setOverlays();
							let elements = document.getElementsByClassName('ui-widget-overlay');
							let requiredElement = elements[0];
							requiredElement.addEventListener('click', () => {
								$("#accept-import-dialog").dialog( "close" );
							});
						},
						buttons: [
							{
								id: "import-posts-dialog-button-confirm",
								text: __("Proceed with Import", libsyn_imports.text_dom),
								class: "button-primary",
								click: function(){
									$("#libsyn-powerpress-feed-url-submit").val("false");
									$("#accept-import-dialog").dialog( "close" );
									$("#pp-feed").attr({'style': 'display:none;'}).hide();

									const submitLibsynImportsForm = submitImportsForm().then( data => {
										if ( !!data ) {
											showImportProcessing();
											refreshAwaitingImport().then( data => {
												showImportSuccess();
											});
										} else {
											console.log("Received a empty response redirecting back to imports page.");
											libsynRedirect(libsyn_imports.admin_url + "?page=LibsynImports&msg=Something+went+wrong+when+creating+the+import");
										}
									}).catch( error => {
										console.log(error);
									});
								}
							},
							{
								id: "import-posts-dialog-button-cancel",
								text: "Cancel",
								class: "button-secondary",
								click: function(){
									$('#accept-import-dialog').dialog('close');
								}
							}
						]
					});
					$("#accept-import-dialog").dialog( "open" );
				}
		});

		/* Powerpress Feed Submission */
		$("#libsyn_import_powerpress_feed").on("click", function() {
			if ( $("input[name='pp_category_feed_selector']").length && ( $("input[name='pp_category_feed_selector']").valid() == false ) ) {
				var libsyn_pp_valid = false;
			} else {
				var libsyn_pp_valid = true;
			}
			if ( libsyn_pp_valid ) {
				//Set Validation Message
				if ( $( "." + libsyn_imports.text_dom + "_pp_category_selector" ).length ) {
					$( "." + libsyn_imports.text_dom + "_pp_category_selector" ).find("#helper-text").empty().hide('fast');
				}

				//handle submission & dialog
				$( "#accept-import-dialog" ).dialog({
					autoOpen: false,
					draggable: false,
					height: 'auto',
					width: 'auto',
					modal: true,
					resizable: false,
					open: function(event,ui){
						setOverlays();
						let elements = document.getElementsByClassName('ui-widget-overlay');
						let requiredElement = elements[0];
						requiredElement.addEventListener('click', () => {
							$("#accept-import-dialog").dialog( "close" );
						});
					},
					buttons: [
						{
							id: "import-posts-dialog-button-confirm",
							text: __("Proceed with Import", libsyn_imports.text_dom),
							class: "button-primary",
							click: function(){
								$("#pp-feed").attr({'style': 'display:none;'}).hide();
								$("#libsyn-powerpress-feed-url-submit").val("true");
								$("#accept-import-dialog").dialog( "close" );
								const submitLibsynImportsForm = submitImportsForm().then( data => {
									if ( !!data ) {
										showImportProcessing();
										refreshAwaitingImport().then( data => {
											showImportSuccess();
										});
									} else {
										console.log("Received a empty response redirecting back to imports page.");
										libsynRedirect(libsyn_imports.admin_url + "?page=LibsynImports&msg=Something+went+wrong+when+creating+the+import");
									}
								}).catch( error => {
									console.log(error);
								});
							}
						},
						{
							id: "import-posts-dialog-button-cancel",
							text: "Cancel",
							class: "button-secondary",
							click: function(){
								$("#accept-import-dialog").dialog( "close" );
							}
						}
					]
				});
				$("#accept-import-dialog").dialog( "open" );
			} else {
				//Set Validation Message
				if ( $("." + libsyn_imports.text_dom + "_pp_category_selector").length ) {
					$("." + libsyn_imports.text_dom + "_pp_category_selector").find("#helper-text").empty().append(__("You must select a category feed to continue.", libsyn_imports.text_dom)).fadeIn("fast");
				}
			}
		});
		$("#libsyn_add_player_to_posts").on("click", function() {
			if ( !!libsyn_imports.pp.check ) {
				$("#import-libsyn-player-dialog").children("#extra-text").empty().append("<span style=\"color:green;font-weight:600;\">" + __("NOTE:", libsyn_imports.text_dom) + "</span>  " + __("You may uninstall the Powerpress Plugin after this to avoid duplicate players appearing in your posts.", libsyn_imports.text_dom));
			}
			//handle submission & dialog
			$( "#import-libsyn-player-dialog" ).dialog({
				autoOpen: false,
				draggable: false,
				height: 'auto',
				width: 'auto',
				modal: true,
				resizable: false,
				open: function(event,ui){
					setOverlays();
					let elements = document.getElementsByClassName('ui-widget-overlay');
					let requiredElement = elements[0];
					requiredElement.addEventListener('click', () => {
						$('#import-libsyn-player-dialog').dialog( "close" );
					});
				},
				buttons: [
					{
						id: "import-posts-dialog-button-confirm",
						text: __("Add Libsyn Player", libsyn_imports.text_dom),
						class: "button-primary",
						click: function(){
							$("#libsyn-importer-action").val("add_player_to_posts");
							$("#import-libsyn-player-dialog").dialog( "close" );
							addLibsynPlayerToPosts();
						}
					},
					{
						id: "import-posts-dialog-button-cancel",
						text: "Cancel",
						class: "button-secondary",
						click: function(){
							$("#import-libsyn-player-dialog").dialog( "close" );
						}
					}
				]
			});
			$("#import-libsyn-player-dialog").dialog( "open" );
		});
		$(".libsyn_clear_imports").each(function() {
			$(this).on("click", function() {
				//handle submission & dialog
				$( "#clear-settings-dialog" ).dialog({
					autoOpen: false,
					draggable: false,
					height: 'auto',
					width: 'auto',
					modal: true,
					resizable: false,
					open: function(event,ui){
						setOverlays();
						let elements = document.getElementsByClassName('ui-widget-overlay');
						let requiredElement = elements[0];
						requiredElement.addEventListener('click', () => {
							$("#clear-settings-dialog").dialog("close");
						});
					},
					buttons: [
						{
							id: "clear-settings-dialog-button-confirm",
							text: "Clear Imports",
							click: function(){
								$("#libsyn-importer-action").val( "clear_imports" );
								//clear other form data just in case
								$("#libsyn-powerpress-feed-url-submit").val("false");
								$("#libsyn-import-feed-url").val("");

								//run clear data
								$("#clear-settings-dialog").dialog( "close" );
								$("form[name='libsynmodule_form'] .form-table").css({'opacity': 0.3});
								const submitLibsynImportsForm = submitImportsForm().then( data => {
									libsynWait(2);
									libsynRedirect(libsyn_imports.admin_url + "?page=LibsynImports&msg=Successfully+cleared+imports+data");
								});
							}
						},
						{
							id: "clear-settings-dialog-button-cancel",
							text: "Cancel",
							click: function(){
								$("#clear-settings-dialog").dialog( "close" );
							}
						}
					]
				});
				$("#clear-settings-dialog").dialog( "open" );
			});
			$("#libsyn-import-feed-url").on("focus", function() {
				$("#libsyn-import-feed-url").siblings(".helper-text").empty();
			});
		});

		if ( typeof libsyn_imports !== 'undefined' && !!libsyn_imports.check_import_status ) {
			$("#import-feed-status").empty().html('<p class="libsyn-import-status">' + __("Feed Import Status", libsyn_imports.text_dom) + ' - <span style="color:orange;">' + __("Processing", libsyn_imports.text_dom) + '</span><span class="libsyn-spinner-container"></span></p>').css({"display": "contents"}).css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			$(".libsyn-spinner-container").addClass("libsyn-spinner");
			const importsData = getImportsData().then( data => {
				libsyn_imports.data = data;
				if ( !!data && typeof data.processing_import != 'undefined' && data.processing_import === false && !!data.posts && data.posts.length > 1 ) {
					showImportProcessing();
					showImportFetchingFullFeed();
					const retrieveAllPosts = new Promise((resolve, reject) => {
						resolve(retrieveAllPostsData());
					});
				} else if ( !!data && !!data.processing_import ) {
					// if ( !!data.feed_locked ) {
						// showImportLocked(data);
					// } else {
						showImportProcessing();
					// }
				} else {
					// if ( !!data.feed_locked ) {
						// showImportLocked(data);
					// } else {
						showImportFailed(data);
					// }
				}
			});
		}

		if ( !!libsyn_imports.pp.category_check ) {
			$.fn.loadWith = function(u){
				var c=$(this);
				$("form[name='libsynmodule_form'] .form-table").css({'opacity': 0.3});
				// $("#libsyn-loading-img").css({'display': 'block'});
				$("form[name='libsynmodule_form'] .tablenav").each(function(el) {
					$(this).remove();
				});
				$.get(u,function(d){
					c.replaceWith(d);
				})
				.fail(function() {
					console.log("Something went wrong when loading the category feed.");
				})
				.always(function() {
					$("form[name='libsynmodule_form'] .form-table").css({'opacity': 1});
				});
			};
			$("input[name='pp_category_feed_selector']").each(function() {
				if( !!libsyn_imports.pp.feed_url ) {
					if( $(this).val() == libsyn_imports.pp.feed_url ) {
						$(this).attr('checked', true);
					}
				}
				$(this).change(function() {
					$("#libsyn-powerpress-feed-url-submit").val($(this).val());
					$("table.wp-list-table").loadWith(libsyn_imports.ajax_base_url +  '?action=libsyn_pploadfeed&libsyn_pploadfeed=1&pp_url=' + $(this).val());
				});
			});
		}

		//Add Player
		async function addLibsynPlayerToPosts() {
			let percentAdded = 0;
			let progressBar = $("#add-episodes-progress");
			let addPlayerDiv = $("#import-add-episodes");
			let addPlayerError = false;
			let importErrorMessages = ["A error occured when adding the player and could not complete."];
			addPlayerDiv.after("<br />");
			addPlayerDiv.after("<br />");
			addPlayerDiv.fadeIn('fast');
			addPlayerDiv.focus();
			function switchLine(oldLine, newLine) {
				oldLine.removeClass('is-visible').addClass('is-hidden');
				newLine.removeClass('is-hidden').addClass('is-visible');
			}

			for ( a=0; a < libsyn_imports.data.posts.length; a++ ) {
				if ( typeof libsyn_imports.data.posts[a].data.item_title !== 'undefined' ) {
					$("#adding-current-item").find(".rotating-list").append( '<li id="libsyn-add-item-' + a + '">' + libsyn_imports.data.posts[a].data.item_title + '</li>');
					let working_line = $("#libsyn-add-item-" + a);
					if ( a === 0 ) {
						working_line.addClass('is-visible');
					} else {
						switchLine($("#libsyn-add-item-" + (a-1)), working_line);
					}

				}
				percentAdded = Math.floor((a/libsyn_imports.data.posts.length) * 100);
				$("#import-add-episodes-header").empty().append("Adding Episodes to Wordpress\t-\t" + percentAdded + "%");
				progressBar.val(percentAdded);
				if ( libsyn_imports.data.posts[a].create_new ) {
					//create post also
					const callCreateNew = await createNewLibsynPost(libsyn_imports.data.posts[a]).then( data => {
						if ( typeof data != 'undefined' && Number.isInteger(data) ) {
							libsyn_imports.data.posts[a].id = data;
							setTimeout(function() {}, 500);
						} else {
							addPlayerError = true;
							if ( data === false ) {
								importErrorMessages.push("Please make sure the imported posts are not duplicates of published posts.");
							} else {
								console.log("Something went wrong when creating new Wordpress Post.");
							}
						}
					}).then( data => {
						const callAddPlayer = new Promise((resolve, reject) => {
							setTimeout(function() {}, 500);
							addPlayerToPost(libsyn_imports.data.posts[a]);
						}).catch( error => {
							addPlayerError = true;
							console.log(error);
						});
					}).then( data => {
						const callAddPlayerMetadata = new Promise((resolve, reject) => {
							setTimeout(function() {}, 500);
							addPlayerMetadata(libsyn_imports.data.posts[a])
						}).catch( error => {
							addPlayerError = true;
							console.log(error);
						});
					}).catch( error => {
						addPlayerError = true;
						console.log(error);
					});
				} else {
					//add player and metadata
					const callAddPlayer = await addPlayerToPost(libsyn_imports.data.posts[a]).then( data => {
						const callAddPlayerMetadata = new Promise((resolve, reject) => {
							addPlayerMetadata(libsyn_imports.data.posts[a])
						}).catch( error => {
							addPlayerError = true;
							console.log(error);
						});
					}).catch( error => {
						addPlayerError = true;
						console.log(error);
					});
				}
			}
			if ( !addPlayerError ) {
				progressBar.val(100);
				$("#import-add-episodes-header").empty().append("Adding Episodes to Wordpress\t-\t100%");
				setTimeout(function(){
					$("#adding-current-item").empty().append("<p style=\"font-size:16px;font-weight:bold;\">Added " + a + " episodes!<br />Your import process is complete.</p>");
				}, 1000);
			} else {
				setTimeout(function(){
					$("#import-add-episodes-header").empty().append("<span style=\"color:red;\">An Error has occured when adding one or more episodes.</span>");
					let m = 0;
					$("#adding-current-item").empty();
					importErrorMessages.forEach( function( message, index ) {
						if ( m < 2 ) {
							$("#adding-current-item").append("<p style=\"font-size:16px;font-weight:bold;\">" + message + "</p>");
							m++;
						}
					});
				}, 1000);
			}
		}

		/* functions */
		function createNewLibsynPost(currentPostData) {
			return new Promise((resolve, reject) => {
				$.ajax({
				   type: "post",
				   dataType: "json",
				   url: libsyn_imports.ajax_base_url + '?action=libsyn_create_new_post&libsyn_create_new_post=1',
				   data: currentPostData,
				   success: function(data) {
					 resolve(data)
				   },
				   error: function(error) {
					 reject(error)
				   },
			   })
		   })
		}

		function addPlayerToPost(currentPostData) {
			return new Promise((resolve, reject) => {
				$.ajax({
				   type: "post",
				   dataType: "json",
				   url: libsyn_imports.ajax_base_url + '?action=libsyn_add_player&libsyn_add_player=1',
				   data: currentPostData,
				   success: function(data) {
					 resolve(data)
				   },
				   error: function(error) {
					 reject(error)
				   },
			   })
		   })
		}

		function addPlayerMetadata(currentPostData) {
			return new Promise((resolve, reject) => {
				$.ajax({
				   type: "post",
				   dataType: "json",
				   url: libsyn_imports.ajax_base_url + '?action=libsyn_create_metadata&libsyn_create_metadata=1',
				   data: currentPostData,
				   success: function(data) {
					 resolve(data)
				   },
				   error: function(error) {
					 reject(error)
				   },
			   })
		   })
		}

		function submitImportsForm() {
			return new Promise((resolve, reject) => {
			   $( libsyn_imports.form_id ).ajaxSubmit({
				   url: libsyn_imports.ajax_base_url + '?action=libsyn_run_import&libsyn_run_import=1',
				   type: "post",
				   dataType: "json",
				   success: function(data) {
					   resolve(data)
				   },
				   error: function(error) {
					   reject(error)
				   }
			  	})
		   })
		}

		async function getImportsData() {
			return new Promise((resolve, reject) => {
			   $.ajax({
				   url: libsyn_imports.ajax_base_url + '?action=libsyn_run_import&libsyn_run_import=1&page=9999',
				   type: "get",
				   dataType: "json",
				   success: function(data) {
					   resolve(data)
				   },
				   error: function(error) {
					   reject(error)
				   }
			  	})
		   })
		}

		function submitRefreshImport(page=null, limit=null) {
			return new Promise((resolve, reject) => {
				var importRefreshCounter = 0;

				function submitRefreshImportAjax(page=null, limit=null) {
					$("#libsyn-check-feed-import-status").empty().html('<p style="font-size:1.1em;font-weight:bold;">' + __("Checking Feed Import Status", libsyn_imports.text_dom) + '<span class="libsyn-spinner-container libsyn-spinner"></span></p>').css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"}).fadeIn('fast');
					if ( !!page ) {
						var working_page = page;
					} else {
						var working_page = 99999; //default (last page)
					}
					if ( !!limit ) {
						var working_limit = limit;
					} else {
						var working_limit = 100; //default;
					}
					setTimeout( function() {
						$.ajax({
						   method: "GET",
						   async: true,
						   dataType: "json",
						   url: libsyn_imports.ajax_base_url + '?action=libsyn_run_import&libsyn_run_import=1&page=' + working_page,
						   success: function(data) {
							   importRefreshCounter++;
							   var ok_to_return_data = true;
							   if ( !!!page && importRefreshCounter < 2 ) {
								   ok_to_return_data = false;
							   }
							   $("#libsyn-check-feed-import-status").empty().html("<p></p>");
							   if ( !!data && typeof data.processing_import !== 'undefined' && data.processing_import == true ) {
								   // if ( !!data.feed_locked ) {
									   // showImportLocked(data);
								   // } else {
									   showImportProcessing();
								   // }
								   setTimeout(() => submitRefreshImportAjax(page, limit), 8000);
							   } else if ( !!data && typeof data.processing_import !== 'undefined' && data.processing_import === false && ok_to_return_data ) {
								   resolve(data);
							   } else {
								   setTimeout(() => submitRefreshImportAjax(page, limit), 8000);
							   }
						   },
						   error: function(error) {
							   reject(error);
						   }
					   });
				   }, 5000);
				}
					submitRefreshImportAjax(page, limit);
		   })
		}

		function showImportSuccess() {
			//hide
			hideImportProcessing();
			hideImportFetchingFullFeed();
			hideImportFailed();
			$("#feed-import-empty-p").hide();
			$("#libsyn-feed-import-tr").hide();
			$(".libsyn_clear_imports").first().hide();
			$(".libsyn-import-status").removeClass("libsyn-spinner");

			//show
			$("#import-feed-status").empty().html('<p class="libsyn-import-status">' + __("Feed Import Status", libsyn_imports.text_dom) + ' - <span style="color:#60a135;">' + __("Success", libsyn_imports.text_dom) + '</span></p>').css({"display": "contents"}).css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			$("#feed-import-congratulations").attr({'style': 'display:contents;'}).css({"visibility": "visible"}).fadeIn('fast');
			$("#libsyn_add_player_to_posts").attr({'style': 'display:inline-block;'}).css({"visibility": "visible"}).fadeIn('fast');
			$("#add-player-to-posts").attr({'style': 'display:contents;'}).css({"visibility": "visible"}).fadeIn('fast');
			$(".libsyn-spinner-container").each(function() {
				$(this).removeClass("libsyn-spinner");
			});
			if ( !!libsyn_imports.data.posts && libsyn_imports.data.posts.length > 1 ) {
				$("#import-feed-status").append("<p style=\"font-weight:bold;\">(" + libsyn_imports.data.posts.length + " " + __("Episodes available to be added", libsyn_import.text_dom) + ")</p>")
			}
		}

		function hideImportSuccess() {
			$("#feed-import-congratulations").hide();
			$("#libsyn_add_player_to_posts").hide();
		}

		function showImportProcessing() {
			//hide
			hideImportSuccess();
			hideImportFetchingFullFeed();
			hideImportFailed();

			//show
			$("#processing-import").css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			$("#libsyn-import-feed-url").css({"background-color": "grey"}).attr({"readonly": true});
			$("#feed-import-currently-processing").fadeIn('fast').focus();
			$("#import-feed-status").empty().html('<p style="font-size:1.1em;font-weight:bold;">' + __("Feed Import Status", libsyn_imports.text_dom) + ' - <span style="color:orange;">' + __("Processing", libsyn_imports.text_dom) + '</span><span class="libsyn-fetch-blocks-container"></span></p>').css({"display": "contents"}).css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			$(".libsyn-fetch-blocks-container").each(function() {
				$(this).addClass("libsyn-fetch-blocks");
			});
		}

		function hideImportProcessing() {
			$("#feed-import-empty-display").hide();
			$("#feed-import-currently-processing").hide();
		}

		function showImportFetchingFullFeed() {
			//hide
			// hideImportSuccess();
			// hideImportFailed();

			$("#feed-import-fetching-posts").fadeIn("fast");
		}

		function hideImportFetchingFullFeed() {
			$("#feed-import-fetching-posts").hide();
		}

		function showImportFailed(data={}) {
			$("#processing-import").css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			$("#feed-import-empty-display").attr({'style': 'display:contents;'}).css({"visibility": "visible"}).fadeIn('fast');
			$("#import-feed-status").empty().html('<p class="libsyn-import-status">' + __("Feed Import Status", libsyn_imports.text_dom) + ' - <span style="color:red;">' + __("Failed", libsyn_imports.text_dom) + '</span></p>').css({"display": "contents"}).css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			try  {
				if ( !!data.error ) {
					$("#feed-import-empty-p").append("<br /><br />" + data.error);
				} else {
					$("#feed-import-empty-p").empty().append( __("Unknown error occured when checking the feed import status.  You may try refreshing the page and trying again in a few minutes.  If this problem persists, please contact us via support@libsyn.com to help troubleshoot this issue.", libsyn_imports.text_dom) );
				}
			} catch ( error ) {
				$("#feed-import-empty-p").empty().append( __("Unknown error occured when checking the feed import status.  This was likely due to a timeout issue with your hosting provider.  Many shared hosts set the page timeout to 30 seconds, with larger feed imports this may need to be increased.  For further assistance, please contact us via support@libsyn.com to help troubleshoot this issue.", libsyn_imports.text_dom) );
				$("#feed-import-empty-p").empty().append("<br /><br />" + error.message);
			}
		}

		function showImportLocked(data={}) {
			$("#processing-import").css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			$("#feed-import-locked-display").attr({'style': 'display:contents;'}).css({"visibility": "visible"}).fadeIn('fast');
			$("#import-feed-status").empty().html('<p class="libsyn-import-status">' + __("Feed Import Status", libsyn_imports.text_dom) + ' - <span style="color:red;">' + __("Locked", libsyn_imports.text_dom) + '</span></p>').css({"display": "contents"}).css({"visibility": "visible", "opacity": 1, "transition-delay": "0s"});
			try  {
				if ( !!data.error ) {
					$("#feed-import-empty-p").append("<br />" + data.error);
				} else {
					$("#feed-import-empty-p").empty().append( __("We initiated the import process, but the podcast feed is currently locked.  A email has been sent to the owner email address, please follow the directions provided in the email to unlock it first.", libsyn_imports.text_dom) );
				}
			} catch ( error ) {
				$("#feed-import-empty-p").empty().append( __("Unknown error occured when checking the feed import status.  This was likely due to a timeout issue with your hosting provider.  Many shared hosts set the page timeout to 30 seconds, with larger feed imports this may need to be increased.  For further assistance, please contact us via support@libsyn.com to help troubleshoot this issue.", libsyn_imports.text_dom) );
				$("#feed-import-empty-p").empty().append("<br />" + error.message);
			}
		}

		function hideImportFailed() {
			//hide
			hideImportProcessing();
			hideImportFetchingFullFeed();
			hideImportSuccess();

			//show
			$("#feed-import-empty-display").hide();
			$("#import-feed-status").hide();
		}

		function refreshAwaitingImport() {
			return new Promise((resolve, reject) => {
				const awaitingImportData = submitRefreshImport().then( data => {
					libsyn_imports.data = data;
					if ( !!data && typeof data.processing_import != 'undefined' && data.processing_import === false && !!data.posts && data.posts.length > 1 ) {
						showImportProcessing();
						showImportFetchingFullFeed();
						const retrieveAllPosts = new Promise((resolve, reject) => {
							retrieveAllPostsData();
						});
					} if ( !!data && !!data.processing_import ) {
						// if ( !!data.feed_locked ) {
							// showImportLocked(data);
						// } else {
							showImportProcessing();
						// }
					} else {
						// if ( !!data.feed_locked ) {
							// showImportLocked(data);
						// } else {
							showImportFailed(data);
						// }
					}
				}).then(data => {
					showImportSuccess();
				}).then( data => {
					resolve(data);
				}).catch( error => {
					reject(error);
				});
			});
		}

		function retrieveAllPostsData() {
			let limit = 100; //default
			let promises = [];
			for ( i=0; i < libsyn_imports.data.pages; i++ ) {
				let page = i+1;
				promises.push(submitRefreshImport(page, limit).then( data => {
					if ( data.posts ) {
						let currentFetch = data.posts;
						libsyn_imports.data.posts = unionArray(libsyn_imports.data.posts, currentFetch);
						let percentAdded = Math.floor((page/libsyn_imports.data.pages) * 100);
						$("#feed-import-fetching-posts-p").empty().append("Fetching Episodes\t-\t" + percentAdded + "%");
						$("#feed-import-fetching-posts-progress").val(percentAdded);
					}
				}));
			}
		    Promise.all(promises)
				.then((results) => {
					showImportSuccess();
				})
		}


		/* Global Functions */
		//IDEA: future would like to combine these global functions into a global script file
		async function libsynWait(seconds = 10) {
			await new Promise(r => setTimeout(r, seconds * 1000))
		}

		function libsynRedirect(redirect_url = '') {
			if ( typeof window.top.location.href == "string" ) {
				window.top.location.href = redirect_url;
			} else if( typeof document.location.href == "string" ) {
				document.location.href = redirect_url;
			} else if( typeof window.location.href == "string" ) {
				window.location.href = redirect_url;
			} else {
				console.log( __( "Unknown javascript error 1028.  Please report this error to support@libsyn.com and help us improve this plugin!", libsyn_imports.text_dom ) );
			}
		}

		function unionArray(arr1=null, arr2=null) {
			let mergedArray = arr1.concat(arr2);
			let set = new Set();
			let unionArray = mergedArray.filter(item => {
			if ( !set.has(item.data.id) ) {
				set.add(item.data.id);
				return true;
			}
				return false;
			}, set);
			return unionArray;
		}
	});
})(jQuery);
