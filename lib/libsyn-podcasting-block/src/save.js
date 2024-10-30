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

//Constants
const { serverSideRender: ServerSideRender } = wp;
const { RawHTML } = wp.element;
const currentEditor = wp.data.select('core/editor');


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	if ( !!!props.attributes.libsynEpisodeShortcode ) {
		//handle ajax check for attributes
		if ( !!libsyn_nmp_data.admin_ajax_url && !!libsyn_nmp_data.post_id ) {
			let libsyn_admin_ajax_url = libsyn_nmp_data.admin_ajax_url + '?action=libsyn_player_shortcode&libsyn_player_shortcode=1&post_id=' + libsyn_nmp_data.post_id;
			fetch( libsyn_admin_ajax_url )
			.then(res => res.json())
			.then( (result) => {
				props.attributes.libsynEpisodeShortcode = result;
			},
			(error) => {
				//do nothing
				}
			);
		}
	}
	return (
		<div { ...useBlockProps.save() }>
			<div className="libsyn-shortcode" style={{ display: "block" }}>
				<RawHTML>
					{ ( !!props.attributes.libsynEpisodeShortcode && !!props.attributes.libsynEpisodeEmbedurl ) ?
						props.attributes.libsynEpisodeShortcode
					: '' }
				</RawHTML>
			</div>
		</div>
	);
}
