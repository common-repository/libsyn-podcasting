// import { partial, noop, find, map } from 'lodash';
import { map } from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import React, { useEffect } from "react";


const { __, _x } = wp.i18n;
const { Fragment, RawHTML, Component, createPortal, useState } = wp.element;
const { BaseControl, CheckboxControl, RadioControl, DatePicker, TimePicker, Button } = wp.components;
const { withInstanceId, withState } = wp.compose;
// const { __experimentalGetSettings } = wp.date;

// export * from DateTimePicker;

// export default {
// 	title: 'Components/LibsynAdvancedDestinations',
// 	component: LibsynAdvancedDestinations,
// };

/*
export default {
	title: 'Components/LibsynAdvancedDestinations',
	component: LibsynAdvancedDestinations,
};
*/
const LibsynAdvancedDestinations = ( props )  => {
// var LibsynAdvancedDestinations = ( props )  => {
// export default function LibsynAdvancedDestinations( props ) {

	//Checkboxes
	var isAllChildrenChecked = true;
	if ( !!props.value ) {
		var checkboxList = [];
		Object.keys(props.value).map( (key) => {
			if ( key.indexOf('libsyn-advanced-destination-checkbox') >= 0 ) {
				checkboxList.push({
					name: key,
					id: key,
					value: "checked",
					checked: ( props.value[key] == "checked" )
				});
				if ( ( props.value[key] !== "checked" ) ) {
					isAllChildrenChecked = false;
				}
			}
		});
	}

	//Set States
	const [ values, setValue ] = useState( props.value );
	const [ state, setDestinationState ] = useState({
		checkList: checkboxList,
		isAllSelected: !!isAllChildrenChecked,
		release_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
		expiration_date: moment().format('YYYY-MM-DDTHH:mm:ss')
	});

	//Functions
	let is_null = ( mixed_var ) => {
		return mixed_var == null || typeof mixed_var == 'undefined';
	}

	let onCheckboxChange = (checkName, isChecked, toggleAll = false) => {
		var checked = !isChecked ? true : false;
		var isAllChecked = ( checkName === 'cb-select-all' );
		var checkboxList = [];
		var newValue = values;
		var newState = state;
		var checkedText = ( !!checked ) ? "checked" : "";
		console.log(values);
		console.log(props);
		console.log(checked);
		state.checkList.map((key, index) => {
			if ( isAllChecked || toggleAll ) {
				newValue[key.id] = checkedText;
				checkboxList.push({
					name: key,
					id: key,
					value: checkedText,
					checked: checked
				});
			} else if (  key.name === checkName ) {
				newValue[key.id] = checkedText;
				checkboxList.push({
					name: key,
					id: key,
					value: checkedText,
					checked: checked
				});
			}
		});
		setValue(newValue);
		newState.checkList = checkboxList;
		setDestinationState( newState );
		props.changeHandler(values);
		console.log(values);
		console.log(props);
	}

	let onCheckboxCheckAll = ( event ) => {
		if ( event.target.checked ) {
			onCheckboxChange(event.target.name, false, true);
		} else {
			onCheckboxChange(event.target.name, true, true);
		}
	}

	let isEquivalent = ( a, b ) => {
		// Create arrays of property names
		var aProps = Object.getOwnPropertyNames(a);
		var bProps = Object.getOwnPropertyNames(b);

		// If number of properties is different,
		// objects are not equivalent
		if (aProps.length != bProps.length) {
			return false;
		}

		for (var i = 0; i < aProps.length; i++) {
			var propName = aProps[i];

			// If values of same property are not equal,
			// objects are not equivalent
			if (a[propName] !== b[propName]) {
				return false;
			}
		}

		// If we made it this far, objects
		// are considered equivalent
		return true;
	}

	let setDestinationData = ( event, id='', name='', destinationId=null, value=null ) => {
		console.log('set destinations data');
		console.log(event);
		console.log(id);
		console.log(name);
		console.log(destinationId);
		console.log(value);
		var newValues = values;

		if ( id.length > 0 && !is_null(props.value[id]) ) {
			if ( !is_null(value) ) {//is selector radio
				switch ( value ) {
					case 0:
						// props.value[id] = "checked";
						newValues[id] = "checked";
						if ( !is_null(name) ) {
							if ( !is_null(props.value[name + "-1"]) ) {
								// props.value[name + "-1"] = "";
								newValues[name + "-1"] = "";
							}
							if ( !is_null(props.value[name + "-2"]) ) {
								// props.value[name + "-2"] = "";
								newValues[name + "-2"] = "";
							}
						}
						// setDestinationState( { value: values } );
						break;

					case 1:
						// props.value[id] = "checked";
						newValues[id] = "checked";
						if ( !is_null(name) ) {
							if ( !is_null(props.value[name + "-0"]) ) {
								// props.value[name + "-0"] = "";
								newValues[name + "-0"] = "";
							}
							if ( !is_null(props.value[name + "-2"]) ) {
								// props.value[name + "-2"] = "";
								newValues[name + "-2"] = "";
							}
						}
						// setDestinationState( { value: values } );
						break;

					case 2:
						// props.value[id] = "checked";
						newValues[id] = "checked";
						if ( !is_null(name) ) {
							if ( !is_null(props.value[name + "-0"]) ) {
								// props.value[name + "-0"] = "";
								newValues[name + "-0"] = "";
							}
							if ( !is_null(props.value[name + "-1"]) ) {
								// props.value[name + "-1"] = "";
								newValues[name + "-1"] = "";
							}

							//Date Time set
							if ( id.indexOf('release_scheduler') >= 0 ) {
								setSchedulerDate( destinationId, 'release', moment(state.release_date).format('YYYY-MM-DDTHH:mm:ss'));
							} else if ( id.indexOf('expiration_scheduler') >= 0 ) {
								setSchedulerDate( destinationId, 'expiration', moment(state.expiration_date).format('YYYY-MM-DDTHH:mm:ss'));
							}
						}
						// setDestinationState( { value: values } );
						break;

					default:
						// props.value[id] = value;
						newValues[id] = value;
				}
				setValue( newValues );
				props.changeHandler(values);
			} else { //everything else
				if ( id.indexOf('libsyn-advanced-destination-checkbox') >= 0 ) {
					// Side Checkbox
					if ( checkIsChecked(event.target.id) ) {
						onCheckboxChange(event.target.name, true);
						// props.value[id] = "";
					} else {
						onCheckboxChange(event.target.name, false);
						// props.value[id] = "checked";
					}
					//TODO: Note sure line below is needed?  state keeps getting reset/changed when clicked checkbox twice..
					// setDestinationState( { value: event.target.value } );
				} else if ( id.indexOf('scheduler_advanced_release_lc') >= 0 ) {
					//Date Time set
					if ( id.indexOf('release_scheduler') >= 0 ) {
						setSchedulerDate( destinationId, 'release', event);
					} else if ( id.indexOf('expiration_scheduler') >= 0 ) {
						setSchedulerDate( destinationId, 'expiration', event);
					}
				}
			}
		}
	}

	let setSchedulerDate = ( destinationId=null, schedulerPrefix='release', workingDate ) => {
		var newState = state;
		var newValues = values;
		if ( typeof workingDate == "Array" ) {
			workingDate = moment(workingDate).format('YYYY-MM-DDTHH:mm:ss');
		}
		let workingDateTime = workingDate.split(/T| |GMT/);
		if ( !is_null(workingDateTime[0]) ) {
			newValues[`${ schedulerPrefix }_scheduler_advanced_release_lc__${ destinationId }_date`] = workingDateTime[0];
		}
		if ( !is_null(workingDateTime[1]) ) {
			newValues[`${ schedulerPrefix }_scheduler_advanced_release_lc__${ destinationId }_time_select_select-element`] = get12HourTime(workingDateTime[1]);
		}
		//TODO: FIX BELOW
		switch ( schedulerPrefix ) {
			case 'release':
				// setDestinationState( { release_date: moment(workingDate).toDate() } );
				newState.release_date = moment(workingDate).toDate();
				break;

			case 'expiration':
				// setDestinationState( { expiration_date: moment(workingDate).toDate() } );
				newState.expiration_date = moment(workingDate).toDate();
				break;

			default:
				// setDestinationState( { release_date: moment(workingDate).toDate() } );
				newState.release_date = moment(workingDate).toDate();
		}
		setDestinationState( newState );
		setValue( newValues );
		props.changeHandler(values);
	}

	let getDateValue = ( destination_id = null, releaseType = null ) => {
		if ( !!releaseType ) {
			switch ( releaseType ) {
				case 'release':
					var retDate = state.release_date;
					break;

				case 'expiration':
					var retDate = state.expiration_date;
					break;

				default:
					var retDate = moment();
			}

			if ( !!destination_id ) {
				if ( ( !is_null(props.value[`${ releaseType }_scheduler_advanced_release_lc__${ destination_id }_date`]) && props.value[`${ releaseType }_scheduler_advanced_release_lc__${ destination_id }_date`].length >= 1 ) && ( !is_null(props.value[`${ releaseType }_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`]) && props.value[`${ releaseType }_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`].length >= 1 ) ) {
					retDate = props.value[`${ releaseType }_scheduler_advanced_release_lc__${ destination_id }_date`] + " " + get24HourTime(props.value[`${ releaseType }_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`]);
					if ( retDate.length >= 1 && ( moment(retDate).isValid() ) ) {
						retDate = moment(retDate);
					} else {
						retDate = moment(retDate, 'YYYY-MM-DD HH:mm:ss');
					}
				}
			}
		}
		if ( !!retDate && retDate instanceof moment ) {
			return retDate.toDate();
		} else if ( !!retDate ) {
			return moment(retDate).toDate();
		} else {
			return moment().toDate();
		}
	}

	let checkIsChecked = ( id ) => {
		if ( !is_null(props.value[id]) ) {
			if ( props.value[id] == "checked" ) {
				return true;
			}
		}

		return false;
	}

	let getDayNight = ( destination_id=null, timeString="" ) => {
		if ( !!!timeString ) {
			if ( !is_null(props.value[`release_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`]) && !is_null(props.value[`release_scheduler_advanced_release_lc__${ destination_id }_date`]) ) {
				if ( !!props.value[`release_scheduler_advanced_release_lc__${ destination_id }_date`] ) {
					timeString = props.value[`release_scheduler_advanced_release_lc__${ destination_id }_date`] + `T` + get24HourTime(props.value[`release_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`]);
				} else {
					timeString = moment().toISOString().slice(0,10) + `T` + get24HourTime(props.value[`release_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`]);
				}
			}
		}

		if ( !is_null(destination_id) ) {
			if ( !is_null(props.value[`release_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`]) && !is_null(props.value[`release_scheduler_advanced_release_lc__${ destination_id }_date`]) ) {
				if ( moment(timeString).isValid() ) {
					var workingDateCheck = moment(timeString).hour();
				} else {
					let workingCheckDate = props.value[`release_scheduler_advanced_release_lc__${ destination_id }_date`] + ` ` + get24HourTime(props.value[`release_scheduler_advanced_release_lc__${ destination_id }_time_select_select-element`]);
					var workingDateCheck = new Date(workingCheckDate.replace('-', '/', 'g')).getHours();
				}
				return workingDateCheck < 12 ? 'AM' : 'PM';
			}
		} else if ( timeString.length >= 18 && ( moment(timeString).isValid() ) ) {
			var workingDateCheck = moment(timeString).hour();
			return workingDateCheck < 12 ? 'AM' : 'PM';
		}
		return 'AM';
	}

	let get12HourTime = ( timeString='00:00:00' ) => {
		var H = + timeString.substr(0, 2);
		var h = (H % 12) || 12;
		var ampm = H < 12 ? "AM" : "PM";
		var prefix = h < 10 ? "0" : "";
		return prefix + h + timeString.substr(2, 3) + ' ' + ampm;
	}

	let get24HourTime = ( timeString='00:00:00' ) => {
		var H = parseInt(timeString.substr(0, 2));
		if ( timeString.indexOf('AM') != -1 && H == 12 ) {
			timeString = timeString.replace('12', '00');
		}
		if ( timeString.indexOf('PM') != -1 && H < 12 ) {
			timeString = timeString.replace(H, (H + 12));
			timeString = timeString.replace(/^0+/, '');
		}
		return timeString.replace(' ', '').replace(/(AM|PM)/, '');
	}

	// const state = {
	// 	value: props.value,
	// 	checkList: checkboxList,
	// 	isAllSelected: !!isAllChildrenChecked,
	// 	release_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
	// 	expiration_date: moment().format('YYYY-MM-DDTHH:mm:ss')
	// };

	const DownloadAvailabilityRadio = withState(
		props.simpleDownloadChangeHandler.get()
	)( ( { option, setState } ) => (
		<div className="libsyn-input-element">
		<fieldset>
		<legend>Download Availability</legend>
		<RadioControl
			label=""
			selected={ option }
			id="libsyn-post-episode-simple-download"
			name="libsyn-post-episode-simple-download"
			options={ [
				{ label: 'Media files are always available', value: 'available', id: "libsyn-post-episode-simple-download-available", name: "libsyn-post-episode-simple-download-available" },
				{ label: 'Media files are available based on release schedule', value: 'release_date', id: "libsyn-post-episode-simple-download-release_date", name: "libsyn-post-episode-simple-download" },
			] }
			onChange={ option => props.simpleDownloadChangeHandler.set(option, setState( { option } ) ) }
		/>
		</fieldset>
		</div>
	) );

	return (
		<div className={ props.className }>
			<div className={ "libsyn-destinations-download-availability-container" }>
				<DownloadAvailabilityRadio />
			</div>
			<div className={ "table-container" } role="table" aria-label={ __("Destinations") }>
				<div className={ "flex-table header" } role="rowgroup">
					<div className={ "flex-row first" } role="columnheader">
						<BaseControl
							id={ `cb-select-all-control` }
							className={ `cb-select-all-control` }
							key={ `cb-select-all-control-${ props.instanceId }` }
						>
							<input
								id={ `cb-select-all` }
								className="components-checkbox-control__input"
								type="checkbox"
								value="1"
								onChange={ e => onCheckboxCheckAll }
								checked={ state.isAllSelected }
								key={ `cb-select-all-${ props.instanceId }` }
								name={ `cb-select-all` }
								style={{ fontSize: "16px"}}
								options={ state.checkList }
							/>
						</BaseControl>
					</div>
					<div className={ "flex-row" } role="columnheader">{ __("Destination Name") }</div>
					<div className={ "flex-row" } role="columnheader">{ __("Release Date") }</div>
					<div className={ "flex-row" } role="columnheader">{ __("Expiration Date") }</div>
				</div>
		{
			map( props.destinations, (destination, destinations_index) => {
				{
					var schedule_options = [
						{ label: 'Release Immediately', value: 0, id: "set_release_scheduler_advanced_release_lc__" + destination.destination_id +"-0", name: "set_release_scheduler_advanced_release_lc__" + destination.destination_id},
						{ label: 'Set new release date', value: 2, id: "set_release_scheduler_advanced_release_lc__" + destination.destination_id +"-2",  name: "set_release_scheduler_advanced_release_lc__" + destination.destination_id },
					];

					var expiration_options = [
						{ label: 'Never Expire', value: 0, id: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id +"-0", name: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id},
						{ label: 'Set new expiration date', value: 2, id: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id +"-2",  name: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id },
					];
				}
				return (
					<div className={ "flex-table row" } role="rowgroup" key={ `flex-table-row-${ destinations_index }-${ props.instanceId }` }>
						<div className="flex-row first" role="cell" key={ `flex-table-first-${ destinations_index }-${ props.instanceId }` }>
							<BaseControl
								id={ `libsyn-advanced-destination-checkbox-control-${ destination.destination_id }` }
								key={ `libsyn-advanced-destination-checkbox-control-${ destination.destination_id }-${ destinations_index }-${ props.instanceId }` }
							>
								<input
									id={ `libsyn-advanced-destination-checkbox-${ destination.destination_id }` }
									name={ `libsyn-advanced-destination-checkbox-${ destination.destination_id }` }
									key={ `libsyn-advanced-destination-checkbox-${ destination.destination_id }-${ destinations_index }-${ props.instanceId }` }
									className="components-checkbox-control__input"
									type="checkbox"
									value="1"
									onChange={ e => setDestinationData( e, `libsyn-advanced-destination-checkbox-${ destination.destination_id }`, `libsyn-advanced-destination-checkbox-${ destination.destination_id }`, destination.destination_id) }
									checked={ checkIsChecked(`libsyn-advanced-destination-checkbox-${ destination.destination_id }`) ? true : false }
								/>
							</BaseControl>
						</div>
						<div className="flex-row" role="cell" key={ `flex-row-${ destinations_index }-${ props.instanceId }` }>{ destination.destination_name }</div>
						<div className="flex-row radio-input" role="cell" key={ `flex-row-radio-input-${ destinations_index }-${ props.instanceId }` }>
							<BaseControl
								id={ "set_release_scheduler_advanced_release_lc__" + destination.destination_id }
								name={ "set_release_scheduler_advanced_release_lc__" + destination.destination_id }
								className={ classnames( props.className, 'components-radio-control' ) }
								key={ `set_release_scheduler_advanced_release_lc__${ destination.destination_id }-${ destinations_index }-${ props.instanceId }` }
							>
								{ schedule_options.map( ( options, index ) =>
									<div
										key={ `components-radio-control__option_schedule-${ destinations_index }-${ options.id }-${ props.instanceId }` }
										className="components-radio-control__option"
									>
										<input
											id={ options.id }
											className="components-radio-control__input"
											type="radio"
											name={ options.name }
											value={ options.value }
											onChange={ e => setDestinationData( e, options.id, options.name, destination.destination_id, options.value) }
											checked={ checkIsChecked(options.id) ? true : false }
											key={ `release-${ options.id }-${ index }-input-${ destinations_index }-${ props.instanceId }` }
										/>
										<label htmlFor={ `${ options.id }` } key={ `release-${ options.id }-${ index }-label-${ destinations_index }-${ props.instanceId }` }>
											{ options.label }
										</label>
									</div>
								) }
							</BaseControl>
							{ checkIsChecked(`set_release_scheduler_advanced_release_lc__${destination.destination_id}-2`) && (
								<div className="components-datetime" key={`release_scheduler_advanced_release_lc__${ destinations_index }_datetime_div`}>
									{ ! state.calendarModalIsVisible && (
											<TimePicker
												id={`release_scheduler_advanced_release_lc__${ destinations_index }`}
												name={`release_scheduler_advanced_release_lc__${ destinations_index }`}
												key={`release_scheduler_advanced_release_lc__${ destinations_index }_timepicker`}
												currentTime={ getDateValue(destination.destination_id, 'release') }
												onChange={ e => setDestinationData( e, `release_scheduler_advanced_release_lc__${ destination.destination_id }`, `release_scheduler_advanced_release_lc__${ destination.destination_id }`, destination.destination_id ) }
												is12Hour={ true }
												style={{display: "contents"}}
											/>
									) }

									{ state.calendarModalVisible && (
											<DatePicker
												id={`release_scheduler_advanced_release_lc__${ destinations_index }_date`}
												name={`release_scheduler_advanced_release_lc__${ destinations_index }_date`}
												key={`release_scheduler_advanced_release_lc__${ destinations_index }_datepicker`}
												currentDate={ getDateValue(destination.destination_id, 'release') }
												onChange={ e => setDestinationData( e, `release_scheduler_advanced_release_lc__${ destination.destination_id }_date`, `release_scheduler_advanced_release_lc__${ destination.destination_id }_date`, destination.destination_id ) }
												style={{display: "contents"}}
												isInvalidDate={ isInvalidDate }
											/>
									) }
								</div>
							) }
						</div>
						<div className="flex-row radio-input" role="cell" key={`set_expiration_scheduler_advanced_release_lc__${ destinations_index }_outer_div`}>
							<BaseControl
								id={ "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id + "-" + props.instanceId }
								name={ "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id + "-" + props.instanceId }
								className={ classnames( props.className, 'components-radio-control' ) }
								key={ `set_expiration_scheduler_advanced_release_lc__${ destination.destination_id }-${ destinations_index }-${ props.instanceId }` }
							>
								{ expiration_options.map( ( options, index ) =>
									<div
										key={ `components-radio-control__option_expiration-${ destinations_index }-${ index }-${ props.instanceId }` }
										className="components-radio-control__option"
									>
										<input
											id={ options.id }
											className="components-radio-control__input"
											type="radio"
											name={ options.name }
											value={ options.value }
											onChange={ e => setDestinationData( e, options.id, options.name, destination.destination_id, options.value ) }
											checked={  checkIsChecked(options.id) ? true : false }
											key={ `expiration-${ options.id }-${ index }-input-${ destinations_index }-${ props.instanceId }` }
										/>
										<label htmlFor={ `${ options.id }` } key={ `expiration-${ options.id }-${ index }-label-${ destinations_index }-${ props.instanceId }` }>
											{ options.label }
										</label>
									</div>
								) }
							</BaseControl>
							{ checkIsChecked(`set_expiration_scheduler_advanced_release_lc__${destination.destination_id}-2`) && (
								<div className="components-datetime" key={`expiration_scheduler_advanced_release_lc__${ destinations_index }_datetime_div`}>
									{ ! state.calendarModalIsVisible && (
											<TimePicker
												id={`expiration_scheduler_advanced_release_lc__${ destinations_index }`}
												name={`expiration_scheduler_advanced_release_lc__${ destinations_index }`}
												key={`expiration_scheduler_advanced_release_lc__${ destinations_index }_timepicker`}
												currentTime={ getDateValue(destination.destination_id, 'expiration') }
												onChange={ e => setDestinationData( e, `expiration_scheduler_advanced_release_lc__${ destination.destination_id }`, `expiration_scheduler_advanced_release_lc__${ destination.destination_id }`, destination.destination_id ) }
												is12Hour={ true }
												style={{display: "contents"}}
											/>
									) }

									{ state.calendarModalVisible && (
											<DatePicker
												id={`expiration_scheduler_advanced_release_lc__${ destinations_index }_date`}
												name={`expiration_scheduler_advanced_release_lc__${ destinations_index }_date`}
												key={`expiration_scheduler_advanced_release_lc__${ destinations_index }_datepicker`}
												currentDate={ getDateValue(destination.destination_id, 'expiration') }
												onChange={ e => setDestinationData( e, `expiration_scheduler_advanced_release_lc__${ destination.destination_id }_date`, `expiration_scheduler_advanced_release_lc__${ destination.destination_id }_date`, destination.destination_id ) }
												style={{display: "contents"}}
												isInvalidDate={ isInvalidDate }
											/>
									) }
								</div>
							) }
						</div>
					</div>
				);
			} )
		}
			</div>
		</div>
	);
}

LibsynAdvancedDestinations.defaultProps = {
	// destinations: Object.freeze( [] ),
	destinations: libsyn_nmp_data.destinations,
	// value: Object.freeze( [] ),
	value: Object.freeze( [] ),
	// displayTransform: identity,
	// saveTransform: ( token ) => token.trim(),
	onChange: () => {},
	onInputChange: () => {},
	// isBorderless: false,
	// disabled: false,
	// tokenizeOnSpace: false,
};

export default withInstanceId(LibsynAdvancedDestinations);
// export const _default = () => <LibsynAdvancedDestinations />;
