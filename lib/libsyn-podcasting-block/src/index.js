/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'create-block/libsyn-podcasting-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Libsyn Publisher Hub' ), // Block title.
	icon: <svg ng-repeat="glyph in glyphs" id="iconDemo-libsyn-hashtag" mi-view-box="0 0 1018 1024" viewBox="0 0 1018 1024" width="100%" height="100%"><title>Libsyn</title><path ng-repeat="path in glyph.paths"  mi-d="M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="0.8" fill="rgb(0, 0, 0)" stroke="inherit" d="M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z" opacity="0.8"></path><path ng-repeat="path in glyph.paths" mi-d="M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="0.85" fill="rgb(0, 0, 0)" stroke="inherit" d="M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z" opacity="0.85"></path><path ng-repeat="path in glyph.paths" mi-d="M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="1" fill="rgb(0, 0, 0)" stroke="inherit" d="M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z" opacity="1"></path><path ng-repeat="path in glyph.paths" mi-d="M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="0.7" fill="rgb(0, 0, 0)" stroke="inherit" d="M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z" opacity="0.7"></path></svg>, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'embed', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __( 'Publish a Podcast Episode' ),
	keywords: [
		__( 'Libsyn Publisher Hub' ),
		__( 'libsyn' ),
		__( 'publish' ),
		__( 'episode' ),
		__( 'podcast' ),
		__( 'media' ),
		__( 'audio' ),
		__( 'embed' ),
	],
	transforms: { //testing
		from: [
		    {
		        type: 'shortcode',
		        // Shortcode tag can also be an array of shortcode aliases
		        tag: 'podcast',
		        attributes: {
		            // An attribute can be source from a tag attribute in the shortcode content
		            url: {
		                type: 'string',
		                source: 'attribute',
		                attribute: 'src',
		                selector: 'iframe',
		            },
		            // An attribute can be source from the shortcode attributes
		            align: {
		                type: 'string',
		                shortcode: ( { named: { align = 'alignnone' } } ) => {
		                    return align.replace( 'align', '' );
		                },
		            },
		        },
		    },
		]
	},
	html: false, // Remove support for an HTML mode.
	multiple: false, // Use the block just once per post
	/**
	 * The attributes function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "attributes" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/attributes/	*/
	attributes: {
		libsynItemId: {
			type: 'integer',
			source: 'meta',
			meta: 'libsyn-item-id',
			selector: 'libsyn-item-id',
			default: 0
		},
		libsynShowId: {
			type: 'integer',
			source: 'meta',
			meta: 'libsyn-show-id',
			selector: 'libsyn-show-id',
			default: 0
		},
		libsynPostUpdateReleaseDate: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-update-release-date',
			selector: 'libsyn-post-update-release-date',
			default: ''
		},
		libsynNewMediaMedia: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-new-media-media',
			selector: 'libsyn-new-media-media',
			default: libsyn_nmp_data.libsyn_new_media_media
		},
		libsynNewMediaImage: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-new-media-image',
			selector: 'libsyn-new-media-image',
			default: libsyn_nmp_data.libsyn_new_media_image
		},
		libsynPostEpisodeSubtitle: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-subtitle',
			selector: 'libsyn-post-episode-subtitle',
			default: ''
		},
		libsynPostEpisodeCategorySelection: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-category-selection',
			selector: 'libsyn-post-episode-category-selection',
			default: ''
		},
		libsynEpisodeThumbnail: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-episode-thumbnail',
			selector: 'libsyn-episode-thumbnail',
			default: ''
		},
		libsynEpisodeWidescreenImage: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-episode-widescreen_image',
			selector: 'libsyn-episode-widescreen_image',
			default: ''
		},
		libsynEpisodeBlogImage: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-episode-blog_image',
			selector: 'libsyn-episode-blog_image',
			default: ''
		},
		libsynEpisodeBackgroundImage: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-episode-background_image',
			selector: 'libsyn-episode-background_image',
			default: ''
		},
		libsynPostEpisodeKeywords: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-keywords',
			selector: 'libsyn-post-episode-keywords',
			default: ''
		},
		libsynPostEpisodeUpdateId3: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-update-id3',
			selector: 'libsyn-post-episode-update-id3',
			default: 'isLibsynUpdateId3' //make sure this is the default
		},
		libsynPostItunes: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-itunes',
			selector: 'libsyn-post-itunes',
			default: ''
		},
		libsynPostEpisodeItunesEpisodeNumber: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-itunes-episode-number',
			selector: 'libsyn-post-episode-itunes-episode-number',
			default: ''
		},
		libsynPostEpisodeItunesSeasonNumber: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-itunes-season-number',
			selector: 'libsyn-post-episode-itunes-season-number',
			default: ''
		},
		libsynPostEpisodeItunesEpisodeType: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-itunes-episode-type',
			selector: 'libsyn-post-episode-itunes-episode-type',
			default: ''
		},
		/* @deprecated v1.3.1
		libsynPostEpisodeItunesEpisodeSummary: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-itunes-episode-summary',
			selector: 'libsyn-post-episode-itunes-episode-summary',
			default: ''
		},
		*/
		libsynPostEpisodeItunesEpisodeTitle: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-itunes-episode-title',
			selector: 'libsyn-post-episode-itunes-episode-title',
			default: ''
		},
		libsynPostEpisodeItunesEpisodeAuthor: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-itunes-episode-author',
			selector: 'libsyn-post-episode-itunes-episode-author',
			default: ''
		},
		libsynPostEpisodeItunesExplicit: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-itunes-explicit',
			selector: 'libsyn-post-episode-itunes-explicit',
			default: ''
		},
		libsynPostUpdateReleaseDateLabel: {
			type: 'string',
			source: 'text',
			default: 'Update Release Date'
		},
		libsynPostEpisode: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode',
			selector: 'libsyn-post-episode',
			default: '_isLibsynPost'
		},
		libsynPostEpisodeLabel: {
			type: 'string',
			source: 'text',
			default: 'Post Libsyn Episode'
		},
		libsynPostEpisodeAdvancedDestinationFormData: {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-advanced-destination-form-data',
			selector: 'libsyn-post-episode-advanced-destination-form-data',
			default: ''
		},
		libsynPostEpisodeAdvancedDestinationFormDataInputEnabled:  {
			type: 'boolean',
			source: 'meta',
			meta: 'libsyn-post-episode-advanced-destination-form-data-input-enabled',
			selector: 'libsyn-post-episode-advanced-destination-form-data-input-enabled',
			default: false
		},
		libsynPostEpisodeSimpleDownload:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-simple-download',
			selector: 'libsyn-post-episode-simple-download',
			default: 'available'
		},
		libsynEpisodeShortcode:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-episode-shortcode',
			selector: 'libsyn-episode-shortcode',
			default: ''
		},
		libsynEpisodeEmbedurl:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-episode-embedurl',
			selector: 'libsyn-episode-embedurl',
			default: ''
		},
		libsynPostEpisodePlayerUseTheme:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_use_theme',
			selector: 'libsyn-post-episode-player_use_theme',
			default: libsyn_nmp_data.player_settings.player_use_theme
		},
		libsynPostEpisodePlayerUseThumbnail:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_use_thumbnail',
			selector: 'libsyn-post-episode-player_use_thumbnail',
			default: libsyn_nmp_data.player_settings.player_use_thumbnail
		},
		libsynPostEpisodePlayerHeight:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_height',
			selector: 'libsyn-post-episode-player_height',
			default: libsyn_nmp_data.player_settings.player_height
		},
		libsynPostEpisodePlayerWidth:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_width',
			selector: 'libsyn-post-episode-player_width',
			default: libsyn_nmp_data.player_settings.player_width
		},
		libsynPostEpisodePlayerPlacement:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_placement',
			selector: 'libsyn-post-episode-player_placement',
			default: libsyn_nmp_data.player_settings.player_placement
		},
		libsynPostEpisodePlayerUseDownloadLink:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_use_download_link',
			selector: 'libsyn-post-episode-player_use_download_link',
			default: libsyn_nmp_data.player_settings.player_use_download_link
		},
		libsynPostEpisodePlayerUseDownloadLinkText:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_use_download_link_text',
			selector: 'libsyn-post-episode-player_use_download_link_text',
			default: libsyn_nmp_data.player_settings.player_use_download_link_text
		},
		libsynPostEpisodePlayerCustomColor:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-player_custom_color',
			selector: 'libsyn-post-episode-player_custom_color',
			default: libsyn_nmp_data.player_settings.player_custom_color
		},
		libsynPostEpisodePremiumState:  {
			type: 'string',
			source: 'meta',
			meta: 'libsyn-post-episode-premium_state',
			selector: 'libsyn-post-episode-premium_state',
			default: 'auto'
		},
		libsynPlayerSettingsPanel: {
			type: 'bool',
			source: 'attribute',
			selector: 'libsyn-player-settings-panel',
			default: false
		},
		libsynEpisodeMediaPanel: {
			type: 'bool',
			source: 'attribute',
			selector: 'libsyn-episode-media-panel',
			default: false
		},
		libsynPostEpisodePrimaryContenturl: {
			type: 'string',
			source: 'attribute',
			selector: 'libsyn-post-episode-primary_content_url',
			default: ''
		},
		libsynEpisodeDetailsPanel: {
			type: 'bool',
			source: 'attribute',
			selector: 'libsyn-episode-details-panel',
			default: false
		},
		libsynEpisodeThumbnailPanel: {
			type: 'bool',
			source: 'attribute',
			selector: 'libsyn-episode-thumbnail-panel',
			default: false
		},
		libsynItunesOptimizationTagsPanel: {
			type: 'bool',
			source: 'attribute',
			selector: 'libsyn-itunes-optimization-tags-panel',
			default: false
		},
		libsynAdvancedDestinationsPanel: {
			type: 'bool',
			source: 'attribute',
			selector: 'libsyn-advanced-destinations-panel',
			default: false
		},
		libsynUploadMediaPreviewUrl: {//TODO: handle getting the inner html on focus out (see below) and save it to this attribute
			type: 'string',
			source: 'attribute',
			selector: 'libsyn-upload-media-preview-url',
			default: ''
		},
		libsynAdvancedDestinationsModalState: {
			type: 'bool',
			source: 'attribute',
			selector: 'libsyn-advanced-destinations-modal-state',
			default: false
		}
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );

//Player Preview
registerBlockType( 'create-block/libsyn-podcasting-block-preview', {
	title: __('Libsyn Publisher Hub - Preview'),
	html: false, // Remove support for an HTML mode.
	multiple: false, // Use the block just once per post
	attributes: {
		currentPostId: {
			type: 'integer',
			source: 'html',
			default: 0
		},
		playerItemId: {
			type: 'integer',
			source: 'html',
			default: 0
		},
		playerShortcode: {
			type: 'string',
			source: 'html',
			default: ''
		},
		playerEmbedurl: {
			type: 'string',
			source: 'html',
			default: ''
		}
	}
} );
