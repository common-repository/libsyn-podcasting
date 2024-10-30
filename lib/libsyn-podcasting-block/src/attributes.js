{
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
	libsynPostEpisodeItunesEpisodeSummary: {
		type: 'string',
		source: 'meta',
		meta: 'libsyn-post-episode-itunes-episode-summary',
		selector: 'libsyn-post-episode-itunes-episode-summary',
		default: ''
	},
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
}
