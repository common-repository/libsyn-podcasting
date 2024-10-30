/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

//Custom Imports
// import { map } from 'lodash';
import LibsynAdvancedDestinations from './components/advanced_destinations.js';

//Constants
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RawHTML } = wp.element;
const { TextareaControl, TextControl, Button, Modal, Panel, PanelBody, FormFileUpload, SelectControl, FormTokenField, CheckboxControl, ColorPicker, ComboboxControl, BaseControl, ToggleControl, withFocusOutside, Placeholder, withFocusReturn, Notice } = wp.components;
const { withState } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { withSelect } =  wp.data;
const { serverSideRender: ServerSideRender } = wp;
const currentEditor = wp.data.select('core/editor');
const currentBlockEditor = wp.data.select('core/block-editor');

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {

	/* Define Vars */
	if ( typeof libsyn_nmp_data.categories == 'undefined' ) {
		libsyn_nmp_data.categories = [];
	} else if ( !!libsyn_nmp_data.selected_category ) {
		libsyn_nmp_data.categories.push(libsyn_nmp_data.selected_category);
		let uniqueLibsynCategories = new Set(libsyn_nmp_data.categories);
		libsyn_nmp_data.categories = [ ...uniqueLibsynCategories ];//clean duplicates
	}

	const mapCategoryOption = ( category ) => ( {
		value: category,
		label: category,
	} );

	const categoryOptions = libsyn_nmp_data.categories.map( mapCategoryOption );

	const editModeEnabled = () => !!libsyn_nmp_data.edit_mode_enabled;

	const isUpdatePost = () => !!props.attributes.libsynItemId;

	/* Define Constants */
	const LibsynMediaUploadModal = withState( {
		isOpen: false,
	} )
	( ( { isOpen, setState } ) => (
			<div>
			<Button type="button" className="libsyn-dashicons-upload" id="libsyn-upload-media" title={ __( "Upload Media" ) } onClick={ (e) => setState( { isOpen: true } ) } style={{ width: "100%" }}>
				{ __( "Upload Media" ) }
			</Button>
			{ isOpen && (
			<Modal
				onRequestClose={ (e) => { setState( { isOpen: false } ); saveLibsynNewMediaMedia(); }}
				title={ __("Upload Media") }
				className="libsyn-upload-media-dialog"
				closeLabel={ __( "Close") }
				contentLabel={ __("Upload Media") }>
				<div style={{width: "400px", height: "220px"}}>
					<div style={{marginLeft: "25%"}}>
						<h3>{ __("Select Media to upload:") }</h3>
						<LibsynMediaUploadModalForm />
					</div>
					<div id="libsyn-media-progressbox-area" style={{display: "none"}}>
						<div className="libsyn-dots"></div>
						<div id="libsyn-media-progressbox" style={{width: "100%"}}>
							<div id="libsyn-media-progressbar"></div>
							<div id="libsyn-media-statustxt">0%</div>
						</div>
					</div>
					<div id="upload-error-dialog" style={{display: "none", color: "red", fontWeight: "bold", paddingTop: "12px"}}></div>
				</div>
			</Modal>
		) }
		</div>
	) );

	const LibsynMediaUploadModalForm = () => (
		<FormFileUpload
			accept="audio/*,video/*"
			onChange={ (e) => libsynUploadPrimaryMedia( e, props ) }
			className="dialog-button-upload libsyn-dashicons-upload button-width-220"
			isSecondary
		>
			{ __( "Upload" ) }
		</FormFileUpload>
	);

	const LibsynCategoryCombobox = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				setLibsynPostEpisodeCategorySelection();
			}

			render() {
				return (
					<LibsynCategoryComboboxModule />
				);
			}
		}
	);

	const LibsynCategoryComboboxModule = withState( getLibsynPostEpisodeCategory() )
	( ( { category, setState } ) => (
		<ComboboxControl
			options={ categoryOptions }
			id="libsyn-post-episode-category-selection"
			onFilterValueChange={ category => setLibsynPostEpisodeCategoryChange( category, setState( { category } ) ) }
			onChange={ category => setLibsynPostEpisodeCategorySelection( category, setState( { category } ) ) }
			value={ category }
		/>
	) );

	const LibsynKeywords = withState( getLibsynPostEpisodeKeywords() )
	( ( { tokens, suggestions, setState } ) => (
		<FormTokenField
			id="libsyn-post-episode-keywords"
			name="libsyn-post-episode-keywords"
			value={ tokens }
			onChange={ tokens => setLibsynPostEpisodeKeywords( tokens, setState( { tokens } ) ) }
			suggestions={ suggestions }
			placeholder={ __("Enter key or Comma (,) to add new phrase") }
			isBorderless={false}
			tokenizeOnSpace={false}
			label={  __( "Tags / Keywords (\"Enter Key\" or \",\")" ) }
		/>
	) );

	const LibsynKeywordsEnhanced = withFocusReturn( {
	    onFocusReturn() {
			//TODO: Fix this to return to the dom element after prior keyword is input
			// console.log(document.getElementsByClassName( 'components-form-token-field__input' ));
			// document.getElementById( 'libsyn-post-episode-keywords' ).focus();
	        return false;
	    },
	} )( LibsynKeywords );

	const ColoredLine = ({ color }) => (
		<hr
			style={{
				color: color,
				backgroundColor: color,
				height: 5
			}}
		/>
	);

	const LibsynPostUpdateReleaseDateCheckbox = withState( getLibsynPostUpdateReleaseDate() )
	( ( { isChecked, setState } ) => (
		<CheckboxControl
			id="libsyn-post-update-release-date"
			name="libsyn-post-update-release-date"
			label={ __("Update Release Date") }
			checked={ isChecked }
			onChange={ isChecked => setLibsynPostUpdateReleaseDate( isChecked, setState( { isChecked } ) ) }
		/>
	) );

	const LibsynDestinations = withState( getLibsynDestinationsData() )
	( ( { value, setState } ) => (
		<LibsynAdvancedDestinations
			destinations={ libsyn_nmp_data.destinations }
			value={ value }
			// onChange={ value => setLibsynPostEpisodeAdvancedDestinationFormData( value, setState( { value } ) ) }
			className="libsyn_destinations"
			changeHandler={ value => setLibsynPostEpisodeAdvancedDestinationFormData( value, setState( { value } ) ) }
			simpleDownloadChangeHandler={ { set: setLibsynPostEpisodeSimpleDownload, get: getLibsynPostEpisodeSimpleDownload } }
		/>
	) );

	const LibsynPostEpisodePlayerCustomColor = withState( getLibsynPostEpisodePlayerCustomColor() )
	( ( { color, setState } ) => {
		return (
		<ColorPicker
			color={ color }
			onChangeComplete={ value => setLibsynPostEpisodePlayerCustomColor( value, setState( { value } ) ) }
			disableAlpha
		/>
		);
	} );

	const PlayerSettingsPanel = () => {
		var player_themes = [
			{ label: __('Standard'), value: 'standard', name: "player_use_theme"},
			{ label: __('Mini'), value: 'mini', name: "player_use_theme" },
			{ label: __('Custom'), value: 'custom', name: "player_use_theme" },
		];
		return (
			<PanelBody
				onToggle={ toggleLibsynPlayerSettingsPanel }
				initialOpen={ !!props.attributes.libsynPlayerSettingsPanel }
				title={ __("Player Settings") }
				className={ props.className }
			>
				<BaseControl
					id={ "player_use_theme_control" }
					name={ "player_use_theme_control" }
					className={ 'components-radio-control' }
				>
					{ player_themes.map( ( options, index ) =>
						<div
							key={ `player_use_theme_${ options.value }_div` }
							className="components-radio-control__option"
						>
							<input
								id={ `player_use_theme_${options.value}` }
								className="components-radio-control__input"
								type="radio"
								name={ options.name }
								value={ options.value }
								onChange={ (e) => setLibsynPostEpisodePlayerUseTheme( e ) }
								checked={ getPlayerUseThemeChecked(options.value) }
								key={ `components-radio-input-${ options.value }` }
							/>
							<label htmlFor={ `player_use_theme_${options.value}` } key={`player_use_theme_${options.value}_label`}>
								{ options.label }
							</label>
							<div style={{ marginLeft: "36px"}} id={`player_use_theme_${ options.value }_image`} key={ `player_use_theme_${ options.value }_image` }>
								<img src={ libsyn_nmp_data.player_settings.images[options.value] } style={{ maxWidth: "95%" }} />
							</div>
						</div>
					) }
				</BaseControl>
				{ ( getPlayerUseTheme() == 'custom' ) && (
						<LibsynPostEpisodePlayerCustomColor />
				) }
				<DisplayArtworkOnPlayer />
				<PlayerUseDownloadLink />
				{ getPlayerUseDownloadLink() && (
					<PlayerUseDownloadLinkTextModule />
				) }
			</PanelBody>
		);
	};

	const EpisodeMediaPanel = () => {
		return (
			<PanelBody
				onToggle={ toggleLibsynEpisodeMediaPanel }
				initialOpen={ !!props.attributes.libsynEpisodeMediaPanel }
				title={ __( "Episode Media" ) }
				className={ props.className }
			>
			<div className="libsyn-input-element">
				<fieldset>
					<legend>{ __("Select Media Source:") }</legend>
					<LibsynMediaUploadModal />
					<Button
						className="libsyn-dashicons-wordpress"
						id="libsyn-open-media"
						title={ __( "Click Here to Open the Media Manager") }
						onClick={ (e) => libsynSelectMedia(event, props) }
						>
							{ __( "Wordpress Media" ) }
						</Button>
					<Button
						className="libsyn-button libsyn-dashicons-cloud"
						id="libsyn-open-ftp_unreleased"
						title={ __( "Click Here to Open the Media Manager") }
						onClick={ (e) => libsynSelectFtp(event, props) }
						>
							{ __( "FTP/Unreleased" ) }
					</Button>
				</fieldset>
			</div>
			<div className="libsyn-input-element libsyn-input-grid-2">
				<div>
					<LibsynNewMediaMediaModule />
				</div>
				<div>
					<Button type="button" id="libsyn-clear-media-button" title={ __( "Clear primary media" )} data-buttontext={ __( "Clear" ) } onClick={ clearLibsynPrimaryMedia } style={{marginTop: "2px", paddingBottom: "2px"}} isSecondary>{ __( "Clear" ) }</Button>
				</div>
			</div>
			<UploadMediaPreviewArea />
			<div id="libsyn-upload-media-error" style={{display: "none"}}>
				<div className="libsyn-media-error">
					<p id="libsyn-upload-media-error-text">
					</p>
				</div>
			</div>
			</PanelBody>
		);
	};

	const LibsynNewMediaMedia = withState( getLibsynNewMediaMedia() )
	( ( { newMediaMedia, setState } ) => (
		<TextControl
			id="libsyn-new-media-media"
			name="libsyn-new-media-media"
			type="url"
			value={ newMediaMedia }
			onChange={ ( newMediaMedia ) => setLibsynNewMediaMedia( newMediaMedia, setState( { newMediaMedia } ) ) }
			pattern="https?://.+"
			readOnly={ getLibsynNewMediaMediaReadonly() }
			style={{width: "98%", maxWidth: "100%"}}
		/>
	) );

	const LibsynNewMediaMediaModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynNewMediaMedia();
			}

			render() {
				return (
					<LibsynNewMediaMedia />
				);
			}
		}
	);

	const UploadMediaPreviewArea = () =>  {
		if ( !!libsyn_nmp_data.libsyn_upload_media_preview_inner_html ) {
			var isLibsynPreviewVisible = 'block';
		} else {
			var isLibsynPreviewVisible = 'none';
		}
		// TODO: get the html to below to render in #libsyn-upload-media-preview as it clears on state change
		// { !!libsyn_nmp_data.libsyn_upload_media_preview_inner_html && ( libsyn_nmp_data.libsyn_upload_media_preview_inner_html ) }
		return (
			<div id="libsyn-upload-media-preview-area" style={{ display: { isLibsynPreviewVisible } }}>
				<p id="libsyn-upload-media-preview" className="libsyn-upload-media-preview">

				</p>
			</div>
		);
	};

	const EpisodeDetailsPanel = () => {
		return (
			<PanelBody
				onToggle={ toggleLibsynEpisodeDetailsPanel }
				initialOpen={ !!props.attributes.libsynEpisodeDetailsPanel }
				title={ __( "Episode Details" ) }
				className={ props.className }
			>
				{ !!getLibsynShowIsPremium() && (
				<div className="libsyn-input-element">
					<label htmlFor="libsyn-post-episode-premium_state">{ __( "Premium State" ) }</label>
					<SelectControl
						id="libsyn-post-episode-premium_state"
						name="libsyn-post-episode-premium_state"
						value={ props.attributes.libsynPostEpisodePremiumState }
						onChange={ setLibsynPostEpisodePremiumState }
						options={ [
							{ label: __( "<--Select an option-->" ), value: "", name: "none" },
							{ label: __( "Auto" ), value: "auto", name: "auto" },
							{ label: __( "Premium" ), value: "premium", name: "premium" },
							{ label: __( "Free" ), value: "free", name: "free" },
						] }
					/>
				</div>
				) }
				<div className="libsyn-input-element">
					<label htmlFor="libsyn-post-episode-subtitle">{ __("Episode Subtitle") }</label>
					<LibsynEpisodeSubtitleModule />
				</div>
				<div className="libsyn-input-element">
					<label htmlFor="libsyn-post-episode-category-selection">{ __( "Episode Category" ) }<span style={{color: "red"}}>*</span></label>
					<span className="options-error" style={{display: "none", color: "red", fontWeight :"bold"}}>Could not populate categories, manually enter category.</span>
					<LibsynCategoryCombobox />
				</div>
				<div className="libsyn-input-element">
					<LibsynKeywordsEnhanced />
				</div>
				<div className="libsyn-input-element">
					<UpdateId3Tags />
				</div>
			</PanelBody>
		);
	};

	const EpisodeThumbnailPanel = () => {
		return (
			<PanelBody
				onToggle={ toggleLibsynEpisodeThumbnailPanel }
				initialOpen={ !!props.attributes.libsynEpisodeThumbnailPanel }
				title={ __( "Episode Thumbnail" ) }
				className={ props.className }
			>
				<div className="libsyn-upload-buttons-grid">
					<div className="libsyn-upload-buttons-grid-a"></div>
					<div className="libsyn-upload-buttons-grid-b">

					</div>
					<div className="libsyn-upload-buttons-grid-c"></div>
				</div>

				<div className="libsyn-input-element">
					<fieldset>
						<legend>{ __("Select Media Source:") }</legend>
						<Button
							className="libsyn-button libsyn-dashicons-image"
							id="libsyn-open-image"
							title={ __( "Click Here to Open the Image Manager") }
							onClick={ (e) => libsynSelectImage( event, props ) }
						>
							{ __( "Select Thumbnail" ) }
						</Button>
					</fieldset>
				</div>
				<div className="libsyn-input-element libsyn-input-grid-2">
					<div>
						<LibsynNewMediaImageModule />
					</div>
					<div>
						<Button type="button" id="libsyn-clear-image-button" title={ __( "Clear image url" )} data-buttontext={ __( "Clear" ) } onClick={ clearEpisodeThumbnail } isSecondary>{ __( "Clear" ) }</Button>
					</div>
				</div>
			</PanelBody>
		);
	};

	const LibsynNewMediaImage = withState( getLibsynNewMediaImage() )
	( ( { newMediaImage, setState } ) => (
		<TextControl
			id="libsyn-new-media-image"
			name="libsyn-new-media-image"
			type="url"
			value={ newMediaImage }
			onChange={ ( newMediaImage ) => setLibsynNewMediaImage( newMediaImage, setState( { newMediaImage } ) ) }
			pattern="https?://.+"
			readOnly={ getLibsynNewMediaImageReadonly() }
			style={{width: "98%", maxWidth: "100%"}}
		/>
	) );

	const LibsynNewMediaImageModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynNewMediaImage();
			}

			render() {
				return (
					<LibsynNewMediaImage />
				);
			}
		}
	);

	const ItunesOptimizationTagsPanel = () => {
		return (
			<PanelBody
				onToggle={ toggleLibsynItunesOptimizationTagsPanel }
				initialOpen={ !!props.attributes.libsynItunesOptimizationTagsPanel }
				title={ __( "Apple Podcasts Optimization" ) }
				className={ props.className }
			>
				<div style={{padding: "4px 2px"}} className="libsyn-input-element">
						<label htmlFor="libsyn-post-episode-itunes-explicit">{ __( "Explicit Content" ) }</label>
						<SelectControl
							id="libsyn-post-episode-itunes-explicit"
							name="libsyn-post-episode-itunes-explicit"
							value={ props.attributes.libsynPostEpisodeItunesExplicit }
							onChange={ setLibsynPostEpisodeItunesExplicit }
							options={ [
								{ label: __("Not Set"), value: "no" },
								{ label: __("Clean"), value: "clean" },
								{ label: __("Explicit"), value: "yes" },
							] }
						/>
					</div>
					<div style={{ paddingBottom: "4px" }} className="libsyn-input-element">
						<label htmlFor="libsyn-post-episode-itunes-episode-number">{ __( "Episode Number" ) }</label>
						<LibsynEpisodeItunesEpisodeNumberModule />
					</div>
					<div style={{ paddingBottom: "4px" }} className="libsyn-input-element">
						<label htmlFor="libsyn-post-episode-itunes-season-number">{ __( "Season Number" ) }</label>
						<LibsynEpisodeItunesSeasonNumberModule />
					</div>
					<div style={{ paddingBottom: "4px" }} className="libsyn-input-element">
						<label htmlFor="libsyn-post-episode-itunes-episode-type">{ __( "Episode Type" ) }</label>
						<SelectControl
							id="libsyn-post-episode-itunes-episode-type"
							name="libsyn-post-episode-itunes-episode-type"
							value={ props.attributes.libsynPostEpisodeItunesEpisodeType }
							onChange={ setLibsynPostEpisodeItunesEpisodeType }
							options={ [
								{ label: __( "<--Select an option-->" ), value: "", name: "none" },
								{ label: __( "Full" ), value: "full", name: "none" },
								{ label: __( "Trailer" ), value: "trailer", name: "none" },
								{ label: __( "Bonus" ), value: "bonus", name: "none" },
							] }
						/>
					</div>
					<div style={{ paddingBottom: "4px" }} className="libsyn-input-element">
						<label htmlFor="libsyn-post-episode-itunes-episode-title">{ __( "Episode Title" ) }</label>
						<LibsynEpisodeItunesEpisodeTitleModule />
					</div>
					<div style={{ paddingBottom: "4px" }} className="libsyn-input-element">
						<label htmlFor="libsyn-post-episode-itunes-episode-author">{ __( "Episode Author" ) }</label>
						<LibsynEpisodeItunesEpisodeAuthorModule />
					</div>
			</PanelBody>
		);
	};
	/* @deprecated v1.3.1 - from ItunesOptimizationTagsPanel
	<div style={{ paddingBottom: "4px" }} className="libsyn-input-element">
		<label htmlFor="libsyn-post-episode-itunes-episode-summary">{ __( "Episode Summary" ) }</label>
		<LibsynEpisodeItunesEpisodeSummaryModule />
	</div>
	*/

	const LibsynEpisodeItunesEpisodeNumberModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynPostEpisodeItunesEpisodeNumber();
			}

			render() {
				return (
					<LibsynEpisodeItunesEpisodeNumber />
				);
			}
		}
	);

	const LibsynEpisodeItunesEpisodeNumber = withState( getLibsynPostEpisodeItunesEpisodeNumber() )
	( ( { episodeItunesEpisodeNumber, setState } ) => (
		<TextControl
			id="libsyn-post-episode-itunes-episode-number"
			name="libsyn-post-episode-itunes-episode-number"
			type="number"
			value={ episodeItunesEpisodeNumber }
			onChange={ ( episodeItunesEpisodeNumber ) => setLibsynPostEpisodeItunesEpisodeNumber( episodeItunesEpisodeNumber, setState( { episodeItunesEpisodeNumber } ) ) }
			min={1}
			max={99999}
		/>
	) );

	const LibsynEpisodeItunesSeasonNumberModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynPostEpisodeItunesSeasonNumber();
			}

			render() {
				return (
					<LibsynEpisodeItunesSeasonNumber />
				);
			}
		}
	);

	const LibsynEpisodeItunesSeasonNumber = withState( getLibsynPostEpisodeItunesSeasonNumber() )
	( ( { episodeItunesSeasonNumber, setState } ) => (
		<TextControl
			id="libsyn-post-episode-itunes-season-number"
			name="libsyn-post-episode-itunes-season-number"
			type="number"
			value={ episodeItunesSeasonNumber }
			onChange={ ( episodeItunesSeasonNumber ) => setLibsynPostEpisodeItunesSeasonNumber( episodeItunesSeasonNumber, setState( { episodeItunesSeasonNumber } ) ) }
			min={1}
			max={99999}
		/>
	) );

	const LibsynEpisodeItunesEpisodeSummaryModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynPostEpisodeItunesEpisodeSummary();
			}

			render() {
				return (
					<LibsynEpisodeItunesEpisodeSummary />
				);
			}
		}
	);

	const LibsynEpisodeItunesEpisodeSummary = withState( getLibsynPostEpisodeItunesEpisodeSummary() )
	( ( { episodeItunesEpisodeSummary, setState } ) => (
		<TextareaControl
			id="libsyn-post-episode-itunes-episode-summary"
			name="libsyn-post-episode-itunes-episode-summary"
			placeholder={ __("") }
			value={ episodeItunesEpisodeSummary }
			onChange={ ( episodeItunesEpisodeSummary ) => setLibsynPostEpisodeItunesEpisodeSummary( episodeItunesEpisodeSummary, setState( { episodeItunesEpisodeSummary } ) ) }
			maxLength="4000"
			rows="8"
			columns="50"
			wrap="hard"
		/>
	) );

	const LibsynEpisodeItunesEpisodeTitleModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynPostEpisodeItunesEpisodeTitle();
			}

			render() {
				return (
					<LibsynEpisodeItunesEpisodeTitle />
				);
			}
		}
	);

	const LibsynEpisodeItunesEpisodeTitle = withState( getLibsynPostEpisodeItunesEpisodeTitle() )
	( ( { episodeItunesEpisodeTitle, setState } ) => (
		<TextControl
			id="libsyn-post-episode-itunes-episode-title"
			name="libsyn-post-episode-itunes-episode-title"
			value={ episodeItunesEpisodeTitle }
			onChange={ ( episodeItunesEpisodeTitle ) => setLibsynPostEpisodeItunesEpisodeTitle( episodeItunesEpisodeTitle, setState( { episodeItunesEpisodeTitle } ) ) }
		/>
	) );

	const LibsynEpisodeItunesEpisodeAuthorModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynPostEpisodeItunesEpisodeAuthor();
			}

			render() {
				return (
					<LibsynEpisodeItunesEpisodeAuthor />
				);
			}
		}
	);

	const LibsynEpisodeItunesEpisodeAuthor = withState( getLibsynPostEpisodeItunesEpisodeAuthor() )
	( ( { episodeItunesEpisodeAuthor, setState } ) => (
		<TextControl
			id="libsyn-post-episode-itunes-episode-author"
			name="libsyn-post-episode-itunes-episode-author"
			value={ episodeItunesEpisodeAuthor }
			onChange={ ( episodeItunesEpisodeAuthor ) => setLibsynPostEpisodeItunesEpisodeAuthor( episodeItunesEpisodeAuthor, setState( { episodeItunesEpisodeAuthor } ) ) }
		/>
	) );

	const AdvancedDestinationsPanel = () => {
		return (
			<PanelBody
				onToggle={ toggleLibsynAdvancedDestinationsPanel }
				initialOpen={ !!props.attributes.libsynAdvancedDestinationsPanel }
				title={ __( "Advanced Destination Scheduling" ) }
				className={ props.className }
			>
				<LibsynAdvancedDestinationsModal />
			</PanelBody>
		);
	};

	const AdvancedDestinationsPanelWithFocusReturn = withFocusReturn( {
		//TODO: fix this currently not working, possibly an improvement?
		onFocusReturn() {
			// document.getElementById( 'libsyn-advanced-destinations-panel' ).focus();
			return false;
		},
	} )( AdvancedDestinationsPanel );

	const LibsynAdvancedDestinationsModal = withState( getLibsynAdvancedDestinationsModalState() )
	( ( { isOpen, setState } ) => (
		<div className="libsyn-input-element">
		<Button type="button" className="libsyn-button" id="libsyn-advanced-destination-form-button" title={ __( "Customize Episode Scheduling & Release" ) } onClick={ () => setLibsynAdvancedDestinationsModalState( true, setState( { isOpen: true } ) ) } isSecondary>
				{ __( "Customize Scheduling & Release" ) }
		</Button>
			{ isOpen && (
			<Modal
				onRequestClose={ () => setLibsynAdvancedDestinationsModalState( false, setState( { isOpen: false } ) ) }
				title={ __( "Publishing Destinations" ) }
				className="libsyn-upload-media-dialog"
				closeLabel={ __( "Close" ) }
				focusOnMount={ true }
				style={{ maxWidth: "1200px", width: "780px" }}
				contentLabel="Destinations">
					<div className="libsyn-input-element">
						<LibsynDestinations />
					</div>
			</Modal>
		) }
		</div>
	) );

	const DisplayArtworkOnPlayer = withState( getLibsynPostEpisodePlayerUseThumbnail() )
	( ( { useThumbnail, setState } ) => (
		<ToggleControl
			label={ __( "Display episode/show artwork on the player?" ) }
			help={ __( "(minimum height 200px)" ) }
			checked={ useThumbnail }
			onChange={ () => setLibsynPostEpisodePlayerUseThumbnail( useThumbnail, setState( { useThumbnail } ) ) }
		/>
	) );

	const UpdateId3Tags = withState( getLibsynPostEpisodeUpdateId3() )
	( ( { updateId3, setState } ) => (
		<ToggleControl
			label={ __( "Allow Libsyn to update id3 tags with post data." ) }
			help={ __( "(mp3 files only)" ) }
			checked={ updateId3 }
			onChange={ () => setLibsynPostEpisodeUpdateId3( updateId3, setState( { updateId3 } ) ) }
		/>
	) );

	const PlayerUseDownloadLink = withState( getLibsynPostEpisodePlayerUseDownloadLink() )
	( ( { useDownloadLink, setState } ) => (
		<ToggleControl
			label={ __( "Display download link below the player?" ) }
			checked={ useDownloadLink }
			onChange={ () => setLibsynPostEpisodePlayerUseDownloadLink( useDownloadLink, setState( { useDownloadLink } ) ) }
		/>
	) );

	const LibsynEpisodeSubtitleModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynPostEpisodeSubtitle();
			}

			render() {
				return (
					<LibsynEpisodeSubtitle />
				);
			}
		}
	);

	const LibsynEpisodeSubtitle = withState( getLibsynPostEpisodeSubtitle() )
	( ( { episodeSubtitle, setState } ) => (
		<TextControl
			id="libsyn-post-episode-subtitle"
			name="libsyn-post-episode-subtitle"
			autoComplete="off"
			value={ episodeSubtitle }
			onChange={ ( episodeSubtitle ) => setLibsynPostEpisodeSubtitle( episodeSubtitle, setState( { episodeSubtitle } ) ) }
			maxLength={255}
		/>
	) );

	const PlayerUseDownloadLinkTextModule = withFocusOutside(
		/* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
		class extends React.Component {
			handleFocusOutside() {
				saveLibsynPostEpisodePlayerUseDownloadLinkText();
			}

			render() {
				return (
					<PlayerUseDownloadLinkText />
				);
			}
		}
	);

	const PlayerUseDownloadLinkText = withState( getLibsynPostEpisodePlayerUseDownloadLinkText() )
	( ( { downloadLinkText, setState } ) => (
		<TextControl
			id="player_use_download_link_text"
			name="player_use_download_link_text"
			autoComplete="off"
			label={ __( "Download Link Text" ) }
			value={ downloadLinkText }
			onChange={ ( downloadLinkText ) => setLibsynPostEpisodePlayerUseDownloadLinkText( downloadLinkText, setState( { downloadLinkText } ) ) }
			maxLength={255}
		/>
	) );


	/* Define Functions */
	function contentClass(isShow) {
		if (isShow) {
			return "content";
		} else {
			return "content invisible";
		}
	}

	function is_null( mixed_var ) {
		return ( ( typeof mixed_var === 'undefined' ) || ( mixed_var === null ) );
	}

	function checkIsChecked(id) {
		if ( !is_null(props.attributes.value[id]) ) {
			if ( this.props.value[id] == "checked" ) {
				return true;
			}
		}
		return false;
	}

	function unescapeAndFormatSpaces( str ) {
		const nbsp = String.fromCharCode( 160 );
		return unescape( str ).replace( / /g, nbsp );
	}

	function toggleLibsynItunesOptimizationContainer( event ) {
		$("#libsyn-itunes-optimization-container").toggle();
	}

	function toggleLibsynAdvancedDestinationFormContainer( event ) {
		props.setAttributes( { libsynPostEpisodeAdvancedDestinationFormDataInputEnabled: !props.attributes.libsynPostEpisodeAdvancedDestinationFormDataInputEnabled } );
		$("#libsyn-advanced-destination-form-container").toggle();
	}

	function toggleLibsynPlayerSettingsPanel() {
		props.setAttributes( { libsynPlayerSettingsPanel: !props.attributes.libsynPlayerSettingsPanel } );
	}

	function toggleLibsynEpisodeMediaPanel() {
		props.setAttributes( { libsynEpisodeMediaPanel: !props.attributes.libsynEpisodeMediaPanel } );
	}

	function toggleLibsynEpisodeDetailsPanel() {
		props.setAttributes( { libsynEpisodeDetailsPanel: !props.attributes.libsynEpisodeDetailsPanel } );
	}

	function toggleLibsynEpisodeThumbnailPanel() {
		props.setAttributes( { libsynEpisodeThumbnailPanel: !props.attributes.libsynEpisodeThumbnailPanel } );
	}

	function toggleLibsynItunesOptimizationTagsPanel() {
		props.setAttributes( { libsynItunesOptimizationTagsPanel: !props.attributes.libsynItunesOptimizationTagsPanel } );
	}

	function toggleLibsynAdvancedDestinationsPanel() {
		props.setAttributes( { libsynAdvancedDestinationsPanel: !props.attributes.libsynAdvancedDestinationsPanel } );
	}

	function clearLibsynPrimaryMedia() {
		//clear media element
		let libsyn_nmp_mediaMediaElem = document.getElementById("libsyn-new-media-media");
		if ( !is_null( libsyn_nmp_mediaMediaElem ) ) {
			libsyn_nmp_mediaMediaElem.value = "";
			libsyn_nmp_data.libsyn_new_media_media = "";
			libsyn_nmp_mediaMediaElem.setAttribute("readonly", false);
			props.setAttributes( { libsynNewMediaMedia: "" } );
		}
		//clear preview container and elements
		let libsyn_nmp_previewElem = document.getElementById("libsyn-upload-media-preview");
		if ( !is_null( libsyn_nmp_previewElem ) ) {
			while ( libsyn_nmp_previewElem.firstChild ) {
				libsyn_nmp_previewElem.removeChild(libsyn_nmp_previewElem.firstChild);
			}
		}
		let libsyn_nmp_mediaErrorElem = document.getElementById("libsyn-upload-media-error");
		if ( !is_null( libsyn_nmp_mediaErrorElem ) ) {
			libsyn_nmp_mediaErrorElem.style.display = "none";
		}
		let libsyn_nmp_uploadButtonElem = document.getElementById("dialog-button-upload");
		if ( !is_null( libsyn_nmp_uploadButtonElem ) ) {
			libsyn_nmp_uploadButtonElem.setAttribute("disabled", false);
		}
		let libsyn_nmp_uploadErrorElem = document.getElementById("upload-error-dialog");
		if ( !is_null(libsyn_nmp_uploadErrorElem) ) {
			while ( libsyn_nmp_uploadErrorElem[i].firstChild ) {
				libsyn_nmp_uploadErrorElem[i].removeChild(libsyn_nmp_uploadErrorElem[i].firstChild);
			}
		}
		if ( !!libsyn_nmp_data.libsyn_upload_media_preview_inner_html ) {
			libsyn_nmp_data.libsyn_upload_media_preview_inner_html = '';
		}
	}

	function clearEpisodeThumbnail( event ) {
		let libsyn_nmp_episodeThumbnailElem = document.getElementById("libsyn-new-media-image");
		if ( !is_null( libsyn_nmp_episodeThumbnailElem ) ) {
			libsyn_nmp_episodeThumbnailElem.value = "";
			libsyn_nmp_episodeThumbnailElem.setAttribute("readonly", false);
			props.setAttributes( { libsynNewMediaImage: "" } );
		}
	}



	/* Setters */

	function setLibsynPostUpdateReleaseDate( value, callBack) {
		if ( value ) {
			props.setAttributes( { libsynPostUpdateReleaseDate: 'isLibsynUpdateReleaseDate' } );
		} else {
			props.setAttributes( { libsynPostUpdateReleaseDate: '' } );
		}
	}

	function setLibsynPostEpisodePlayerUseTheme( event ) {
		var libsyn_nmp_retPlayerUseTheme = '';
		if ( !!event.target ) {
			if ( !!event.target.value ) {
				libsyn_nmp_retPlayerUseTheme = event.target.value;
			} else {
				if ( !!event.value ) {
					libsyn_nmp_retPlayerUseTheme = event.value;
				}
			}
		}
		props.setAttributes( { libsynPostEpisodePlayerUseTheme: libsyn_nmp_retPlayerUseTheme } );
	}

	function setLibsynNewMediaMedia( value, callback ) {
		libsyn_nmp_data.error.media_show_mismatch = false;
		libsyn_nmp_data.libsyn_new_media_media = value;
		// props.setAttributes( { libsynNewMediaMedia: value } );
	}

	function saveLibsynNewMediaMedia() {
		if ( !!props.attributes.libsynNewMediaMedia ) {
			props.setAttributes( { libsynNewMediaMedia: props.attributes.libsynNewMediaMedia } );
		}
	}

	function setLibsynNewMediaImage( value, callBack ) {
		libsyn_nmp_data.libsyn_new_media_image = value;
		props.setAttributes( { libsynNewMediaImage: value } );
	}

	function saveLibsynNewMediaImage() {
		if ( !!props.attributes.libsynNewMediaImage ) {
			props.setAttributes( { libsynNewMediaImage: props.attributes.libsynNewMediaImage } );
		}
	}

	function setLibsynPostEpisodeSubtitle( value, callBack ) {
		props.attributes.libsynPostEpisodeSubtitle = value;
	}

	function setLibsynPostItunes( value ) {
		props.setAttributes( { libsynPostItunes: value } );
	}

	function setLibsynPostEpisodeItunesExplicit( value ) {
		props.setAttributes( { libsynPostEpisodeItunesExplicit: value } );
	}

	function setLibsynPostEpisodeItunesEpisodeNumber( value, callBack ) {
		props.attributes.libsynPostEpisodeItunesEpisodeNumber = value;
	}

	function setLibsynPostEpisodeItunesSeasonNumber( value, callBack ) {
		props.attributes.libsynPostEpisodeItunesSeasonNumber = value;
	}

	function setLibsynPostEpisodeItunesEpisodeType( value ) {
		props.setAttributes( { libsynPostEpisodeItunesEpisodeType: value } );
	}

	function setLibsynPostEpisodePremiumState( value ) {
		props.setAttributes( { libsynPostEpisodePremiumState: value } );
	}

	function setLibsynPostEpisodeItunesEpisodeSummary( value, callBack ) {
		props.attributes.libsynPostEpisodeItunesEpisodeSummary = value;
	}

	function setLibsynPostEpisodeItunesEpisodeTitle( value, callBack ) {
		props.attributes.libsynPostEpisodeItunesEpisodeTitle = value;
	}

	function setLibsynPostEpisodeItunesEpisodeAuthor( value, callBack ) {
		props.attributes.libsynPostEpisodeItunesEpisodeAuthor = value;
	}

	function setLibsynPostEpisodePlayerUseDownloadLinkText( value, callBack ) {
		libsyn_nmp_data.player_use_download_link_text = value;
		props.attributes.libsynPostEpisodePlayerUseDownloadLinkText = value;
	}

	function saveLibsynPostEpisodePlayerUseDownloadLinkText() {
		libsyn_nmp_data.player_use_download_link_text = props.attributes.libsynPostEpisodePlayerUseDownloadLinkText;
		props.setAttributes( { libsynPostEpisodePlayerUseDownloadLinkText: props.attributes.libsynPostEpisodePlayerUseDownloadLinkText } );
	}

	function saveLibsynPostEpisodeSubtitle() {
		props.setAttributes( { libsynPostEpisodeSubtitle: props.attributes.libsynPostEpisodeSubtitle } );
	}

	function saveLibsynPostEpisodeItunesEpisodeNumber() {
		props.setAttributes( { libsynPostEpisodeItunesEpisodeNumber: props.attributes.libsynPostEpisodeItunesEpisodeNumber } );
	}

	function saveLibsynPostEpisodeItunesSeasonNumber() {
		props.setAttributes( { libsynPostEpisodeItunesSeasonNumber: props.attributes.libsynPostEpisodeItunesSeasonNumber } );
	}

	function saveLibsynPostEpisodeItunesEpisodeSummary() {
		props.setAttributes( { libsynPostEpisodeItunesEpisodeSummary: props.attributes.libsynPostEpisodeItunesEpisodeSummary } );
	}

	function saveLibsynPostEpisodeItunesEpisodeTitle() {
		props.setAttributes( { libsynPostEpisodeItunesEpisodeTitle: props.attributes.libsynPostEpisodeItunesEpisodeTitle } );
	}

	function saveLibsynPostEpisodeItunesEpisodeAuthor() {
		props.setAttributes( { libsynPostEpisodeItunesEpisodeAuthor: props.attributes.libsynPostEpisodeItunesEpisodeAuthor } );
	}

	function setLibsynPostEpisodeKeywords( value, callBack ) {
		if ( !!value ) {
			if ( Array.isArray(value) ) {
				props.setAttributes( { libsynPostEpisodeKeywords: value.join(', ') } );
			} else {
				props.setAttributes( { libsynPostEpisodeKeywords: value } );
			}
		}
	}

	function saveLibsynPostEpisodeAdvancedDestinationFormData() {
		if ( !!props.attributes.libsynPostEpisodeAdvancedDestinationFormData ) {
			props.setAttributes( { libsynPostEpisodeAdvancedDestinationFormData: props.attributes.libsynPostEpisodeAdvancedDestinationFormData } );
		}
	}

	function setLibsynPostEpisodeAdvancedDestinationFormData( value ) {
		if ( !is_null(value) ) {
			props.attributes.libsynPostEpisodeAdvancedDestinationFormData = JSON.stringify(value);
			props.setAttributes( { libsynPostEpisodeAdvancedDestinationFormData: props.attributes.libsynPostEpisodeAdvancedDestinationFormData } );
		}
	}

	function setLibsynPostEpisodePlayerCustomColor( value, callBack ) {
		if ( !!value ) {
			if ( !!value.hex ) {
				props.setAttributes( { libsynPostEpisodePlayerCustomColor: value.hex } );
			} else {
				props.setAttributes( { libsynPostEpisodePlayerCustomColor: value } );
			}
		}
	}

	function setLibsynPostEpisodeSimpleDownload( value, callBack ) {
		if ( !!value ) {
			if ( !is_null( value.option ) ) {
				props.attributes.libsynPostEpisodeSimpleDownload = value.option;
			} else {
				props.attributes.libsynPostEpisodeSimpleDownload = value;
			}
		}
		props.setAttributes( { libsynPostEpisodeSimpleDownload: props.attributes.libsynPostEpisodeSimpleDownload} );
	}

	function saveLibsynPostEpisodeSimpleDownload() {
		props.setAttributes( { libsynPostEpisodeSimpleDownload: props.attributes.libsynPostEpisodeSimpleDownload } );
	}

	function setLibsynPostEpisodePlayerUseThumbnail( value, callBack ) {
		var libsyn_nmp_retPlayerUseThumbnail = !!value;
		if ( !is_null(value.useThumbnail) ) {
			libsyn_nmp_retPlayerUseThumbnail = !!value.useThumbnail;
		}
		libsyn_nmp_retPlayerUseThumbnail = !libsyn_nmp_retPlayerUseThumbnail;
		if ( libsyn_nmp_retPlayerUseThumbnail ) {
			libsyn_nmp_data.player_settings.player_use_thumbnail = 'use_thumbnail';
			props.setAttributes( { libsynPostEpisodePlayerUseThumbnail: 'use_thumbnail' } );
		} else {
			libsyn_nmp_data.player_settings.player_use_thumbnail = '';
			props.setAttributes( { libsynPostEpisodePlayerUseThumbnail: '' } );
		}
	}

	function setLibsynPostEpisodeUpdateId3( value, callBack ) {
		var libsyn_nmp_retUpdateId3 = !!value;
		if ( !is_null(value.updateId3) ) {
			libsyn_nmp_retUpdateId3 = !!value.updateId3;
		}
		libsyn_nmp_retUpdateId3 = !libsyn_nmp_retUpdateId3;
		if ( libsyn_nmp_retUpdateId3 ) {
			libsyn_nmp_data.player_settings.update_id3 = 'isLibsynUpdateId3';
			props.setAttributes( { libsynPostEpisodeUpdateId3: 'isLibsynUpdateId3' } );
		} else {
			libsyn_nmp_data.player_settings.update_id3 = '';
			props.setAttributes( { libsynPostEpisodeUpdateId3: '' } );
		}
	}

	function setLibsynPostEpisodePlayerUseDownloadLink( value, callBack ) {
		var libsyn_nmp_retPlayerUseDownloadLink = !!value;
		if ( !is_null(value.useDownloadLink) ) {
			libsyn_nmp_retPlayerUseDownloadLink = !!value.useDownloadLink;
		}
		libsyn_nmp_retPlayerUseDownloadLink = !libsyn_nmp_retPlayerUseDownloadLink;
		if ( libsyn_nmp_retPlayerUseDownloadLink ) {
			libsyn_nmp_data.player_settings.player_use_download_link = 'use_download_link';
			props.setAttributes( { libsynPostEpisodePlayerUseDownloadLink: 'use_download_link' } );
		} else {
			libsyn_nmp_data.player_settings.player_use_download_link = '';
			props.setAttributes( { libsynPostEpisodePlayerUseDownloadLink: '' } );
		}
	}

	function setLibsynPostEpisode( value ) {
		props.setAttributes( { libsynPostEpisode: value } );
	}

	function setLibsynShowId( value ) {
		if ( !!props.attributes.libsynNewMediaMedia ) {
			libsyn_nmp_data.error.media_show_mismatch = true;
			props.setAttributes( { libsynShowId: value } );
			clearLibsynPrimaryMedia();
		} else {
			libsyn_nmp_data.error.media_show_mismatch = false;
			props.setAttributes( { libsynShowId: value } );
		}
		libsyn_nmp_data.api.show_id = value;
	}

	function setLibsynPostEpisodeCategorySelection( value = null, callBack ) {
		if ( is_null( value) ) {
			var value = libsyn_nmp_data.selected_category;
		}
		if ( !!value ) {
			if ( !is_null( value.value ) ) {
				var libsyn_nmp_retCategory = String(value.value);
			} else {
				var libsyn_nmp_retCategory = String(value);
			}
			libsyn_nmp_data.selected_category = libsyn_nmp_retCategory;
			props.setAttributes( { libsynPostEpisodeCategorySelection: libsyn_nmp_retCategory } );
		}
	}

	function setLibsynPostEpisodeCategoryChange( value, callBack ) {
		if ( !!value ) {
			if ( !is_null( value.value ) ) {
				var libsyn_nmp_retCategory = String(value.value);
			} else {
				var libsyn_nmp_retCategory = String(value);
			}
			libsyn_nmp_data.selected_category = libsyn_nmp_retCategory;
		}
	}

	function setLibsynAdvancedDestinationsModalState( value, callBack ) {
		props.setAttributes( { libsynPostEpisodeAdvancedDestinationFormDataInputEnabled: true } );
		if ( !!value ) {
			props.setAttributes( { libsynAdvancedDestinationsModalState: true } );
			return { isOpen: true };
		} else {
			props.setAttributes( { libsynAdvancedDestinationsModalState: false } );
			saveLibsynPostEpisodeAdvancedDestinationFormData(); //Save destinations
			saveLibsynPostEpisodeSimpleDownload(); //Save simple download option
			return { isOpen: false };
		}
	}

	/* Getters */
	function getLibsynAdvancedDestinationsModalState() {
		if ( props.attributes.libsynAdvancedDestinationsModalState ) {
			return { isOpen: true };
		} else {
			return { isOpen: false };
		}
	}

	function getLibsynPostEpisodeKeywords() {
		var libsyn_nmp_retTokens = [];
		if ( !is_null( libsyn_nmp_data.categories ) ) {
			var libsyn_nmp_retSuggestions = libsyn_nmp_data.categories.concat(['Podcast', 'Episode', 'Post']);
		} else {
			var libsyn_nmp_retSuggestions = ['Podcast', 'Episode', 'Post'];
		}
		var libsyn_nmp_keywords = props.attributes.libsynPostEpisodeKeywords;
		if ( !!libsyn_nmp_keywords ) {
			if ( Array.isArray( libsyn_nmp_keywords ) ) {
				libsyn_nmp_retTokens = libsyn_nmp_keywords;
			} else {
				libsyn_nmp_retTokens = libsyn_nmp_keywords.split(', ').join(',').split(',');
			}
		}
		//Sanitize duplicate keywords
		if ( typeof Set == 'function' )  {
			libsyn_nmp_retTokens = [...new Set(libsyn_nmp_retTokens)];
		}

		return { tokens: libsyn_nmp_retTokens, suggestions: libsyn_nmp_retSuggestions.concat(libsyn_nmp_retTokens) };
	}

	function getLibsynPostEpisodeCategory() {
		if ( !!libsyn_nmp_data.selected_category ) {
			var libsyn_nmp_retCategory = libsyn_nmp_data.selected_category;
		} else {
			if ( !!props.attributes.libsynPostEpisodeCategorySelection ) {
				var libsyn_nmp_retCategory = props.attributes.libsynPostEpisodeCategorySelection;
			} else {
				var libsyn_nmp_retCategory = "";
			}
		}
		return { category: libsyn_nmp_retCategory };
	}

	function getLibsynPostEpisodeSimpleDownload() {
		if ( !!props.attributes.libsynPostEpisodeSimpleDownload && props.attributes.libsynPostEpisodeSimpleDownload == 'release_date' ) {
			var libsyn_nmp_retOption = props.attributes.libsynPostEpisodeSimpleDownload;
		} else if ( !!libsyn_nmp_data.simple_download ) {
			var libsyn_nmp_retOption = libsyn_nmp_data.simple_download;
		} else {
			var libsyn_nmp_retOption = 'available';
		}
		return { option: libsyn_nmp_retOption };
	}

	function getLibsynPostEpisodePlayerUseThumbnail() {
		if ( props.attributes.libsynPostEpisodePlayerUseThumbnail !== '' ) {
			if( props.attributes.libsynPostEpisodePlayerUseThumbnail == 'use_thumbnail' ) {
				var libsyn_nmp_retOption = true;
			} else {
				var libsyn_nmp_retOption = !!props.attributes.libsynPostEpisodePlayerUseThumbnail;
			}
		} else if ( !is_null(libsyn_nmp_data.player_settings.player_use_thumbnail) ) {
			var libsyn_nmp_retOption = !!libsyn_nmp_data.player_settings.player_use_thumbnail;
		} else {
			var libsyn_nmp_retOption = false;
		}
		return { useThumbnail: libsyn_nmp_retOption };
	}

	function getLibsynPostEpisodeUpdateId3() {
		if ( props.attributes.libsynPostEpisodeUpdateId3 !== '' ) {
			if( props.attributes.libsynPostEpisodeUpdateId3 == 'isLibsynUpdateId3' ) {
				var libsyn_nmp_retOption = true;
			} else {
				var libsyn_nmp_retOption = !!props.attributes.libsynPostEpisodeUpdateId3;
			}
		} else if ( !is_null(libsyn_nmp_data.update_id3) ) {
			var libsyn_nmp_retOption = !!libsyn_nmp_data.update_id3;
		} else {
			var libsyn_nmp_retOption = false;
		}
		return { updateId3: libsyn_nmp_retOption };
	}

	function getLibsynPostEpisodePlayerUseDownloadLink() {
		if ( props.attributes.libsynPostEpisodePlayerUseDownloadLink !== '' ) {
			if ( props.attributes.libsynPostEpisodeUpdateId3 == 'use_download_link' ) {
				var libsyn_nmp_retOption = true;
			} else {
				var libsyn_nmp_retUseDownloadLink = !!props.attributes.libsynPostEpisodePlayerUseDownloadLink;
			}
		} else if ( !is_null(libsyn_nmp_data.player_settings.player_use_download_link) ) {
			var libsyn_nmp_retUseDownloadLink = !!libsyn_nmp_data.player_settings.player_use_download_link;
		} else {
			var libsyn_nmp_retUseDownloadLink = false;
		}
		return { useDownloadLink: libsyn_nmp_retUseDownloadLink };
	}

	function getPlayerUseDownloadLink() {
		var retDownloadLink = getLibsynPostEpisodePlayerUseDownloadLink();
		if ( retDownloadLink.useDownloadLink == 'use_download_link' || retDownloadLink.useDownloadLink == true ) {
			return true;
		} else {
			return false;
		}
	}

	function getLibsynPostEpisodePlayerUseDownloadLinkText() {
		var libsyn_nmp_retDownloadLinkText = '';
		if ( !!props.attributes.libsynPostEpisodePlayerUseDownloadLinkText ) {
			var libsyn_nmp_retDownloadLinkText = props.attributes.libsynPostEpisodePlayerUseDownloadLinkText;
		} else if ( !!libsyn_nmp_data.player_settings.player_use_download_link_text ) {
			var libsyn_nmp_retDownloadLinkText = libsyn_nmp_data.player_settings.player_use_download_link_text;
		}
		return { downloadLinkText: libsyn_nmp_retDownloadLinkText };
	}

	function getLibsynPostEpisodeSubtitle() {
		var libsyn_nmp_retEpisodeSubtitle = '';
		if ( !!props.attributes.libsynPostEpisodeSubtitle ) {
			var libsyn_nmp_retEpisodeSubtitle = props.attributes.libsynPostEpisodeSubtitle;
		}
		return { episodeSubtitle: libsyn_nmp_retEpisodeSubtitle };
	}

	function getLibsynPostEpisodePlayerCustomColor() {

		if ( !!props.attributes.libsynPostEpisodePlayerCustomColor ) {
			var libsyn_nmp_retPlayerCustomColor = props.attributes.libsynPostEpisodePlayerCustomColor;
		} else if ( !!libsyn_nmp_data.player_settings && libsyn_nmp_data.player_settings.player_custom_color) {
			libsyn_nmp_retPlayerCustomColor = libsyn_nmp_data.player_settings.player_custom_color;
		} else {
			var libsyn_nmp_retPlayerCustomColor = '#6ba342';
		}
		return { color: libsyn_nmp_retPlayerCustomColor };
	}

	function getLibsynPostEpisodeItunesEpisodeNumber() {
		var libsyn_nmp_retEpisodeItunesEpisodeNumber = '';
		if ( !!props.attributes.libsynPostEpisodeItunesEpisodeNumber ) {
			var libsyn_nmp_retEpisodeItunesEpisodeNumber = props.attributes.libsynPostEpisodeItunesEpisodeNumber;
		}
		return { episodeItunesEpisodeNumber: libsyn_nmp_retEpisodeItunesEpisodeNumber };
	}

	function getLibsynPostEpisodeItunesSeasonNumber() {
		var libsyn_nmp_retEpisodeItunesSeasonNumber = '';
		if ( !!props.attributes.libsynPostEpisodeItunesSeasonNumber ) {
			var libsyn_nmp_retEpisodeItunesSeasonNumber = props.attributes.libsynPostEpisodeItunesSeasonNumber;
		}
		return { episodeItunesSeasonNumber: libsyn_nmp_retEpisodeItunesSeasonNumber };
	}

	function getLibsynPostEpisodeItunesEpisodeSummary() {
		var libsyn_nmp_retEpisodeItunesEpisodeSummary = '';
		if ( !!props.attributes.libsynPostEpisodeItunesEpisodeSummary ) {
			var libsyn_nmp_retEpisodeItunesEpisodeSummary = props.attributes.libsynPostEpisodeItunesEpisodeSummary;
		}
		return { episodeItunesEpisodeSummary: libsyn_nmp_retEpisodeItunesEpisodeSummary };
	}

	function getLibsynPostEpisodeItunesEpisodeTitle() {
		var libsyn_nmp_retEpisodeItunesEpisodeTitle = '';
		if ( !!props.attributes.libsynPostEpisodeItunesEpisodeTitle ) {
			var libsyn_nmp_retEpisodeItunesEpisodeTitle = props.attributes.libsynPostEpisodeItunesEpisodeTitle;
		}
		return { episodeItunesEpisodeTitle: libsyn_nmp_retEpisodeItunesEpisodeTitle };
	}

	function getLibsynPostEpisodeItunesEpisodeAuthor() {
		var libsyn_nmp_retEpisodeItunesEpisodeAuthor = '';
		if ( !!props.attributes.libsynPostEpisodeItunesEpisodeAuthor ) {
			var libsyn_nmp_retEpisodeItunesEpisodeAuthor = props.attributes.libsynPostEpisodeItunesEpisodeAuthor;
		}
		return { episodeItunesEpisodeAuthor: libsyn_nmp_retEpisodeItunesEpisodeAuthor };
	}

	function getLibsynNewMediaMedia() {
		var libsyn_nmp_retLibsynNewMediaMedia = '';
		if ( !!props.attributes && !is_null(props.attributes.libsynNewMediaMedia) && ( props.attributes.libsynNewMediaMedia !== '' ) ) {
			libsyn_nmp_retLibsynNewMediaMedia = props.attributes.libsynNewMediaMedia;
		} else if ( !is_null(libsyn_nmp_data.libsyn_new_media_media) ) {
			props.attributes.libsynNewMediaMedia = libsyn_nmp_data.libsyn_new_media_media;
			libsyn_nmp_retLibsynNewMediaMedia = libsyn_nmp_data.libsyn_new_media_media;
		}
		return { newMediaMedia: libsyn_nmp_retLibsynNewMediaMedia };
	}

	function getLibsynNewMediaImage() {

		var libsyn_nmp_retLibsynNewMediaImage = '';
		if ( !!props.attributes && !is_null(props.attributes.libsynNewMediaImage) ) {
			libsyn_nmp_retLibsynNewMediaImage = props.attributes.libsynNewMediaImage;
		} else if ( !is_null(libsyn_nmp_data.libsyn_new_media_image) ) {
			props.attributes.libsynNewMediaImage = libsyn_nmp_data.libsyn_new_media_image;
			libsyn_nmp_retLibsynNewMediaImage = libsyn_nmp_data.libsyn_new_media_image;
		}
		return { newMediaImage: libsyn_nmp_retLibsynNewMediaImage };
	}

	function getLibsynNewMediaMediaReadonly() {
		return ( !!props.attributes.libsynNewMediaMedia ) ? 'readonly' : '';
	}

	function getLibsynNewMediaImageReadonly() {
		return ( !!props.attributes.libsynNewMediaImage ) ? 'readonly' : '';
	}

	function getLibsynDestinationsData() {
		if ( !!props.attributes.libsynPostEpisodeAdvancedDestinationFormData ) {
			var retLibsynDestinationsData = JSON.parse(props.attributes.libsynPostEpisodeAdvancedDestinationFormData);
		} else {
			var retLibsynDestinationsData = { };
			Object.keys(libsyn_nmp_data.destinations).map( (key) =>
				{
					retLibsynDestinationsData[`libsyn-advanced-destination-checkbox-${ libsyn_nmp_data.destinations[key].destination_id }`] = "checked";
					retLibsynDestinationsData[`set_release_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }-0`] = "checked";
					retLibsynDestinationsData[`set_release_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }-2`] =  "";
					retLibsynDestinationsData[`release_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }`] =  "";
					retLibsynDestinationsData[`release_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }_date`] =  "";
					retLibsynDestinationsData[`release_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }_time_select_select-element`] =  "12:00 AM";
					retLibsynDestinationsData[`libsyn-post-episode-advanced-destination-${ libsyn_nmp_data.destinations[key].destination_id }-release-time`] =  "12:00 AM";
					retLibsynDestinationsData[`set_expiration_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }-0`] =  "checked";
					retLibsynDestinationsData[`set_expiration_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }-2`] =  "";
					retLibsynDestinationsData[`expiration_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }`] =  "";
					retLibsynDestinationsData[`expiration_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }_date`] =  "";
					retLibsynDestinationsData[`expiration_scheduler_advanced_release_lc__${ libsyn_nmp_data.destinations[key].destination_id }_time_select_select-element`] =  "12:00 AM";
					retLibsynDestinationsData[`libsyn-post-episode-advanced-destination-${ libsyn_nmp_data.destinations[key].destination_id }-expiration-time`] =  "";
				}
			);
		}
		return { value: retLibsynDestinationsData };
	}

	function getLibsynEpisodeShortcode() {
		if ( !!props.attributes.llibsynEpisodeShortcode ) {
			return props.attributes.libsynEpisodeShortcode;
		}
		return '';
	}

	function getLibsynShowId() {
		var retShowId = 0;
		if ( !!props.attributes.libsynShowId ) {
			var retShowId = props.attributes.libsynShowId;
			libsyn_nmp_data.show_id = retShowId;
		} else if ( !!libsyn_nmp_data.show_id ) {
			var retShowId = libsyn_nmp_data.show_id;
		}
		return retShowId;
	}

	function getLibsynShows() {
		var retShowsList = [];
		if ( !!libsyn_nmp_data.shows ) {
			var retShowsList = libsyn_nmp_data.shows;
		}
		return retShowsList;
	}

	function getLibsynShowIsPremium() {
		let working_shows = getLibsynShows();
		let working_showId = getLibsynShowId();
		if ( !!working_shows && !is_null(working_showId) && !is_null(working_shows[working_showId]) ) {
			if ( working_shows[working_showId].is_premium == true || working_shows[working_showId].is_premium == 'true') {
				return true;
			}
		}
		return false;
	}

	function getPlayerUseTheme() {
		var retUseTheme = '';
		if ( !!props.attributes.libsynPostEpisodePlayerUseTheme ) {
			var retUseTheme = props.attributes.libsynPostEpisodePlayerUseTheme;
		} else if ( !!libsyn_nmp_data.player_settings.player_use_theme ) {
			var retUseTheme = libsyn_nmp_data.player_settings.player_use_theme;
		}
		return retUseTheme;
	}

	function getPlayerUseThemeChecked(optionVal) {
		var retPlayerUseThemeChecked = false;
		if ( !!props.attributes.libsynPostEpisodePlayerUseTheme ) {
			if ( props.attributes.libsynPostEpisodePlayerUseTheme == optionVal ) retPlayerUseThemeChecked = true;
		} else if ( !!libsyn_nmp_data.player_settings.player_use_theme ) {
			if ( libsyn_nmp_data.player_settings.player_use_theme == optionVal ) retPlayerUseThemeChecked = true;
		}
		return retPlayerUseThemeChecked;
	}

	function getLibsynPostUpdateReleaseDate() {
			if ( !!props.attributes.libsynPostUpdateReleaseDate && ( props.attributes.libsynPostUpdateReleaseDate === 'isLibsynUpdateReleaseDate' ) ) {
				var libsyn_nmp_retChecked = 'isLibsynUpdateReleaseDate';
			} else {
				var libsyn_nmp_retChecked = '';
			}
		return { isChecked: libsyn_nmp_retChecked };
	}

	/* TESTING */
	/* Helpful Vars */
	//var currentBlockCount = wp.data.select('core/editor').getBlockCount(); //gets the total number of blocks
	//var selectedBlockCount = wp.data.select('core/editor').getSelectedBlockCount(); //gets the total number of blocks (selected)
	//var getPermalink = wp.data.select('core/editor').getPermalink(); //gets the post page's permalink
	//var currentPost = wp.data.select('core/editor').getCurrentPost();
	//var postId = wp.data.select('core/editor').getCurrentPostId(); //current post id (if has been saved.. null if not)

	/* Prepare Return */
	if ( !!currentEditor && !!currentEditor.getEditedPostAttribute('title') ) {
		let working_current_post_title = currentEditor.getEditedPostAttribute('title');
		if ( !!working_current_post_title && working_current_post_title !== 'Auto Draft') {
			libsyn_nmp_data.current_post_title = working_current_post_title;
		} else {
			libsyn_nmp_data.current_post_title = false;
		}
	} else {
		libsyn_nmp_data.current_post_title = false;
	}

	const workingBlock = currentBlockEditor.getSelectedBlock();
	if ( typeof workingBlock !== 'undefined' && workingBlock !== null ) {
		if ( workingBlock.name === 'create-block/libsyn-podcasting-block' ) {

			//Only invoke this code while LPH Publishing Block is selected
			if ( !!props.attributes && !!!props.attributes.libsynPostEpisode ) {
				if ( props.attributes.libsynPostEpisode !== '_isLibsynPost' ) {
					props.setAttributes( { libsynPostEpisode: '_isLibsynPost' } );
				}
			}

		}
	}

	/* Render JSX */
	return ([
		<InspectorControls>
			<div className="libsyn-input-element" id="libsyn-post-update-release-date-wrapper" >
				{ isUpdatePost() && (
					<ColoredLine color="#75ba35" />
				) }
				{ isUpdatePost() && (
					<LibsynPostUpdateReleaseDateCheckbox />
				) }
				<TextControl
					id="libsyn-post-episode"
					name="libsyn-post-episode"
					type="hidden"
					value={ props.attributes.libsynPostEpisode }
				/>
			</div>
			<div className="libsyn-input-element">
				{ ( !!getLibsynShows() && typeof Object.keys(getLibsynShows()).length !== 'undefined' && Object.keys(getLibsynShows()).length >= 2 ) && (
					<SelectControl
						label="Select Show"
						value={ getLibsynShowId() }
						options={ Object.values(getLibsynShows()) }
						onChange={ setLibsynShowId }
						key="libsyn-select-show"
						disabled={ ( !!libsyn_nmp_data.libsyn_new_media_media || isUpdatePost() ) }
					/>
				) }
			</div>
			<PlayerSettingsPanel />
			<EpisodeMediaPanel />
			<EpisodeDetailsPanel />
			<EpisodeThumbnailPanel />
			<ItunesOptimizationTagsPanel />
			<AdvancedDestinationsPanel />
		</InspectorControls>
	,
	<div { ...useBlockProps() }>
		{ !( !!libsyn_nmp_data.current_post_title ) && (
		  <Notice status="warning" isDismissible={false}>
		  <p>You must specify a post title above.</p>
		  </Notice>
		) }
		{ ( !!libsyn_nmp_data.error.media_show_mismatch ) && (
		  <Notice status="error" isDismissible={false}>
		  <p>Episode Media does not match the selected show.  Please choose Episode Media again.</p>
		  </Notice>
		) }
		{ ( !!libsyn_nmp_data.error.destinations_data ) && (
		  <Notice status="error" isDismissible={false}>
		  <p>Unable to load your Libsyn Show's destinations data, please check the Libsyn Publisher Hub - Settings page and make sure the plugin has access to your Libsyn account.</p>
		  </Notice>
		) }
		{ !( !!libsyn_nmp_data ) && (
		  <Notice status="error" isDismissible={false}>
		  <p>An Error Occured with Libsyn Publisher Hub, please visit the Libsyn Publisher Hub - Settings Page for more details.</p>
		  </Notice>
		) }
		{ !( !!libsyn_nmp_data.show_id ) && (
		  <Notice status="error" isDismissible={false}>
		  <p>You must choose a show from the Libsyn Publisher Hub - Settings Page before creating a new episode.</p>
		  </Notice>
		) }
		{ !( !!props.attributes.libsynEpisodeEmbedurl ) && (
			<Placeholder
				icon={ <svg ng-repeat="glyph in glyphs" id="iconDemo-libsyn-hashtag" mi-view-box="0 0 1018 1024" viewBox="0 0 1018 1024" width="40"><title>Libsyn</title><path ng-repeat="path in glyph.paths"  mi-d="M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="0.8" fill="rgb(0, 0, 0)" stroke="inherit" d="M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z" opacity="0.8"></path><path ng-repeat="path in glyph.paths" mi-d="M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="0.85" fill="rgb(0, 0, 0)" stroke="inherit" d="M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z" opacity="0.85"></path><path ng-repeat="path in glyph.paths" mi-d="M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="1" fill="rgb(0, 0, 0)" stroke="inherit" d="M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z" opacity="1"></path><path ng-repeat="path in glyph.paths" mi-d="M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z" mi-fill="rgb(0, 0, 0)" mi-stroke="inherit" mi-stroke-width="" mi-stroke-linecap="" mi-stroke-linejoin="" mi-stroke-miterlimit="" mi-opacity="0.7" fill="rgb(0, 0, 0)" stroke="inherit" d="M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z" opacity="0.7"></path></svg> }
				label={ __(" New Podcast Episode ") }
				style={{ fontSize: "2.4rem" }}
			/>
		) }
		<div className="libsyn-shortcode" style={{display: "none"}}>
			<RawHTML>
			{ ( !!props.attributes.libsynEpisodeShortcode ) ?
				props.attributes.libsynEpisodeShortcode
			: '' }
			</RawHTML>
		</div>
		{ !!props.attributes.libsynEpisodeEmbedurl && !!props.attributes.libsynEpisodeShortcode ? (
			<ServerSideRender
				block="create-block/libsyn-podcasting-block-preview"
				attributes={ {
					currentPostId: currentEditor.getCurrentPostId(),
					playerEmbedurl: props.attributes.libsynEpisodeEmbedurl,
					playerShortcode: props.attributes.libsynEpisodeShortcode,
					playerItemId: props.attributes.libsynItemId
				} }
			/>
		) : '' }
	</div>
	]);
}
