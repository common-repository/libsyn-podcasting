<?php
namespace Libsyn\Service;

class Widget extends \WP_Widget {

	/**
	 * Class Constructor
	 * @param array $widget_ops Widget args passed from child
	 */
	public function __construct( $widget_opts ) {
		if ( !empty($widget_opts) ) {
			if ( !empty($widget_opts['name']) && !empty($widget_opts['classname']) && !empty($widget_opts['description']) ) {
				parent::__construct($widget_opts['classname'], $widget_opts['name'], $widget_opts);
			}
		}
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @since 1.3.1
	 * @param  array $args     Widget Args
	 * @param  array $instance Instance of WP_Widget
	 * @return void
	 */
	public function widget( $args, $instance ) {
		//outputs the content of the widget
	}

	/**
	 * Outputs the options form on admin_url
	 *
	 * @since 1.3.1
	 * @param  [type] $instance [description]
	 * @return [type]           [description]
	 */
	public function form( $instance ) {
		//outputs the options form on admin
	}

	/**
	 * Processing widget options on saves
	 *
	 * @since 1.3.1
	 * @param  array $new_instance New Instance of WP_Widget
	 * @param  array $old_instance Old Instance of WP_Widget
	 * @return void
	 */
	public function update( $new_instance, $old_instance ) {
		//processing widget options to be saved
	}

}

?>
