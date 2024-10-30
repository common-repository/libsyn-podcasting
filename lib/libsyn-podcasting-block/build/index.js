/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/advanced_destinations.js":
/*!*************************************************!*\
  !*** ./src/components/advanced_destinations.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);

// import { partial, noop, find, map } from 'lodash';




const {
  __,
  _x
} = wp.i18n;
const {
  Fragment,
  RawHTML,
  Component,
  createPortal,
  useState
} = wp.element;
const {
  BaseControl,
  CheckboxControl,
  RadioControl,
  DatePicker,
  TimePicker,
  Button
} = wp.components;
const {
  withInstanceId,
  withState
} = wp.compose;
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
const LibsynAdvancedDestinations = props => {
  // var LibsynAdvancedDestinations = ( props )  => {
  // export default function LibsynAdvancedDestinations( props ) {

  //Checkboxes
  var isAllChildrenChecked = true;
  if (!!props.value) {
    var checkboxList = [];
    Object.keys(props.value).map(key => {
      if (key.indexOf('libsyn-advanced-destination-checkbox') >= 0) {
        checkboxList.push({
          name: key,
          id: key,
          value: "checked",
          checked: props.value[key] == "checked"
        });
        if (props.value[key] !== "checked") {
          isAllChildrenChecked = false;
        }
      }
    });
  }

  //Set States
  const [values, setValue] = useState(props.value);
  const [state, setDestinationState] = useState({
    checkList: checkboxList,
    isAllSelected: !!isAllChildrenChecked,
    release_date: moment__WEBPACK_IMPORTED_MODULE_3___default()().format('YYYY-MM-DDTHH:mm:ss'),
    expiration_date: moment__WEBPACK_IMPORTED_MODULE_3___default()().format('YYYY-MM-DDTHH:mm:ss')
  });

  //Functions
  let is_null = mixed_var => {
    return mixed_var == null || typeof mixed_var == 'undefined';
  };
  let onCheckboxChange = function (checkName, isChecked) {
    let toggleAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var checked = !isChecked ? true : false;
    var isAllChecked = checkName === 'cb-select-all';
    var checkboxList = [];
    var newValue = values;
    var newState = state;
    var checkedText = !!checked ? "checked" : "";
    console.log(values);
    console.log(props);
    console.log(checked);
    state.checkList.map((key, index) => {
      if (isAllChecked || toggleAll) {
        newValue[key.id] = checkedText;
        checkboxList.push({
          name: key,
          id: key,
          value: checkedText,
          checked: checked
        });
      } else if (key.name === checkName) {
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
    setDestinationState(newState);
    props.changeHandler(values);
    console.log(values);
    console.log(props);
  };
  let onCheckboxCheckAll = event => {
    if (event.target.checked) {
      onCheckboxChange(event.target.name, false, true);
    } else {
      onCheckboxChange(event.target.name, true, true);
    }
  };
  let isEquivalent = (a, b) => {
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
  };
  let setDestinationData = function (event) {
    let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    let destinationId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    let value = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    console.log('set destinations data');
    console.log(event);
    console.log(id);
    console.log(name);
    console.log(destinationId);
    console.log(value);
    var newValues = values;
    if (id.length > 0 && !is_null(props.value[id])) {
      if (!is_null(value)) {
        //is selector radio
        switch (value) {
          case 0:
            // props.value[id] = "checked";
            newValues[id] = "checked";
            if (!is_null(name)) {
              if (!is_null(props.value[name + "-1"])) {
                // props.value[name + "-1"] = "";
                newValues[name + "-1"] = "";
              }
              if (!is_null(props.value[name + "-2"])) {
                // props.value[name + "-2"] = "";
                newValues[name + "-2"] = "";
              }
            }
            // setDestinationState( { value: values } );
            break;
          case 1:
            // props.value[id] = "checked";
            newValues[id] = "checked";
            if (!is_null(name)) {
              if (!is_null(props.value[name + "-0"])) {
                // props.value[name + "-0"] = "";
                newValues[name + "-0"] = "";
              }
              if (!is_null(props.value[name + "-2"])) {
                // props.value[name + "-2"] = "";
                newValues[name + "-2"] = "";
              }
            }
            // setDestinationState( { value: values } );
            break;
          case 2:
            // props.value[id] = "checked";
            newValues[id] = "checked";
            if (!is_null(name)) {
              if (!is_null(props.value[name + "-0"])) {
                // props.value[name + "-0"] = "";
                newValues[name + "-0"] = "";
              }
              if (!is_null(props.value[name + "-1"])) {
                // props.value[name + "-1"] = "";
                newValues[name + "-1"] = "";
              }

              //Date Time set
              if (id.indexOf('release_scheduler') >= 0) {
                setSchedulerDate(destinationId, 'release', moment__WEBPACK_IMPORTED_MODULE_3___default()(state.release_date).format('YYYY-MM-DDTHH:mm:ss'));
              } else if (id.indexOf('expiration_scheduler') >= 0) {
                setSchedulerDate(destinationId, 'expiration', moment__WEBPACK_IMPORTED_MODULE_3___default()(state.expiration_date).format('YYYY-MM-DDTHH:mm:ss'));
              }
            }
            // setDestinationState( { value: values } );
            break;
          default:
            // props.value[id] = value;
            newValues[id] = value;
        }
        setValue(newValues);
        props.changeHandler(values);
      } else {
        //everything else
        if (id.indexOf('libsyn-advanced-destination-checkbox') >= 0) {
          // Side Checkbox
          if (checkIsChecked(event.target.id)) {
            onCheckboxChange(event.target.name, true);
            // props.value[id] = "";
          } else {
            onCheckboxChange(event.target.name, false);
            // props.value[id] = "checked";
          }
          //TODO: Note sure line below is needed?  state keeps getting reset/changed when clicked checkbox twice..
          // setDestinationState( { value: event.target.value } );
        } else if (id.indexOf('scheduler_advanced_release_lc') >= 0) {
          //Date Time set
          if (id.indexOf('release_scheduler') >= 0) {
            setSchedulerDate(destinationId, 'release', event);
          } else if (id.indexOf('expiration_scheduler') >= 0) {
            setSchedulerDate(destinationId, 'expiration', event);
          }
        }
      }
    }
  };
  let setSchedulerDate = function () {
    let destinationId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let schedulerPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'release';
    let workingDate = arguments.length > 2 ? arguments[2] : undefined;
    var newState = state;
    var newValues = values;
    if (typeof workingDate == "Array") {
      workingDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(workingDate).format('YYYY-MM-DDTHH:mm:ss');
    }
    let workingDateTime = workingDate.split(/T| |GMT/);
    if (!is_null(workingDateTime[0])) {
      newValues[`${schedulerPrefix}_scheduler_advanced_release_lc__${destinationId}_date`] = workingDateTime[0];
    }
    if (!is_null(workingDateTime[1])) {
      newValues[`${schedulerPrefix}_scheduler_advanced_release_lc__${destinationId}_time_select_select-element`] = get12HourTime(workingDateTime[1]);
    }
    //TODO: FIX BELOW
    switch (schedulerPrefix) {
      case 'release':
        // setDestinationState( { release_date: moment(workingDate).toDate() } );
        newState.release_date = moment__WEBPACK_IMPORTED_MODULE_3___default()(workingDate).toDate();
        break;
      case 'expiration':
        // setDestinationState( { expiration_date: moment(workingDate).toDate() } );
        newState.expiration_date = moment__WEBPACK_IMPORTED_MODULE_3___default()(workingDate).toDate();
        break;
      default:
        // setDestinationState( { release_date: moment(workingDate).toDate() } );
        newState.release_date = moment__WEBPACK_IMPORTED_MODULE_3___default()(workingDate).toDate();
    }
    setDestinationState(newState);
    setValue(newValues);
    props.changeHandler(values);
  };
  let getDateValue = function () {
    let destination_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let releaseType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!!releaseType) {
      switch (releaseType) {
        case 'release':
          var retDate = state.release_date;
          break;
        case 'expiration':
          var retDate = state.expiration_date;
          break;
        default:
          var retDate = moment__WEBPACK_IMPORTED_MODULE_3___default()();
      }
      if (!!destination_id) {
        if (!is_null(props.value[`${releaseType}_scheduler_advanced_release_lc__${destination_id}_date`]) && props.value[`${releaseType}_scheduler_advanced_release_lc__${destination_id}_date`].length >= 1 && !is_null(props.value[`${releaseType}_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`]) && props.value[`${releaseType}_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`].length >= 1) {
          retDate = props.value[`${releaseType}_scheduler_advanced_release_lc__${destination_id}_date`] + " " + get24HourTime(props.value[`${releaseType}_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`]);
          if (retDate.length >= 1 && moment__WEBPACK_IMPORTED_MODULE_3___default()(retDate).isValid()) {
            retDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(retDate);
          } else {
            retDate = moment__WEBPACK_IMPORTED_MODULE_3___default()(retDate, 'YYYY-MM-DD HH:mm:ss');
          }
        }
      }
    }
    if (!!retDate && retDate instanceof (moment__WEBPACK_IMPORTED_MODULE_3___default())) {
      return retDate.toDate();
    } else if (!!retDate) {
      return moment__WEBPACK_IMPORTED_MODULE_3___default()(retDate).toDate();
    } else {
      return moment__WEBPACK_IMPORTED_MODULE_3___default()().toDate();
    }
  };
  let checkIsChecked = id => {
    if (!is_null(props.value[id])) {
      if (props.value[id] == "checked") {
        return true;
      }
    }
    return false;
  };
  let getDayNight = function () {
    let destination_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let timeString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    if (!!!timeString) {
      if (!is_null(props.value[`release_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`]) && !is_null(props.value[`release_scheduler_advanced_release_lc__${destination_id}_date`])) {
        if (!!props.value[`release_scheduler_advanced_release_lc__${destination_id}_date`]) {
          timeString = props.value[`release_scheduler_advanced_release_lc__${destination_id}_date`] + `T` + get24HourTime(props.value[`release_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`]);
        } else {
          timeString = moment__WEBPACK_IMPORTED_MODULE_3___default()().toISOString().slice(0, 10) + `T` + get24HourTime(props.value[`release_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`]);
        }
      }
    }
    if (!is_null(destination_id)) {
      if (!is_null(props.value[`release_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`]) && !is_null(props.value[`release_scheduler_advanced_release_lc__${destination_id}_date`])) {
        if (moment__WEBPACK_IMPORTED_MODULE_3___default()(timeString).isValid()) {
          var workingDateCheck = moment__WEBPACK_IMPORTED_MODULE_3___default()(timeString).hour();
        } else {
          let workingCheckDate = props.value[`release_scheduler_advanced_release_lc__${destination_id}_date`] + ` ` + get24HourTime(props.value[`release_scheduler_advanced_release_lc__${destination_id}_time_select_select-element`]);
          var workingDateCheck = new Date(workingCheckDate.replace('-', '/', 'g')).getHours();
        }
        return workingDateCheck < 12 ? 'AM' : 'PM';
      }
    } else if (timeString.length >= 18 && moment__WEBPACK_IMPORTED_MODULE_3___default()(timeString).isValid()) {
      var workingDateCheck = moment__WEBPACK_IMPORTED_MODULE_3___default()(timeString).hour();
      return workingDateCheck < 12 ? 'AM' : 'PM';
    }
    return 'AM';
  };
  let get12HourTime = function () {
    let timeString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '00:00:00';
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 ? "AM" : "PM";
    var prefix = h < 10 ? "0" : "";
    return prefix + h + timeString.substr(2, 3) + ' ' + ampm;
  };
  let get24HourTime = function () {
    let timeString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '00:00:00';
    var H = parseInt(timeString.substr(0, 2));
    if (timeString.indexOf('AM') != -1 && H == 12) {
      timeString = timeString.replace('12', '00');
    }
    if (timeString.indexOf('PM') != -1 && H < 12) {
      timeString = timeString.replace(H, H + 12);
      timeString = timeString.replace(/^0+/, '');
    }
    return timeString.replace(' ', '').replace(/(AM|PM)/, '');
  };

  // const state = {
  // 	value: props.value,
  // 	checkList: checkboxList,
  // 	isAllSelected: !!isAllChildrenChecked,
  // 	release_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
  // 	expiration_date: moment().format('YYYY-MM-DDTHH:mm:ss')
  // };

  const DownloadAvailabilityRadio = withState(props.simpleDownloadChangeHandler.get())(_ref => {
    let {
      option,
      setState
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", null, "Download Availability"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RadioControl, {
      label: "",
      selected: option,
      id: "libsyn-post-episode-simple-download",
      name: "libsyn-post-episode-simple-download",
      options: [{
        label: 'Media files are always available',
        value: 'available',
        id: "libsyn-post-episode-simple-download-available",
        name: "libsyn-post-episode-simple-download-available"
      }, {
        label: 'Media files are available based on release schedule',
        value: 'release_date',
        id: "libsyn-post-episode-simple-download-release_date",
        name: "libsyn-post-episode-simple-download"
      }],
      onChange: option => props.simpleDownloadChangeHandler.set(option, setState({
        option
      }))
    })));
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: props.className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "libsyn-destinations-download-availability-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DownloadAvailabilityRadio, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "table-container",
    role: "table",
    "aria-label": __("Destinations")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex-table header",
    role: "rowgroup"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex-row first",
    role: "columnheader"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
    id: `cb-select-all-control`,
    className: `cb-select-all-control`,
    key: `cb-select-all-control-${props.instanceId}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: `cb-select-all`,
    className: "components-checkbox-control__input",
    type: "checkbox",
    value: "1",
    onChange: e => onCheckboxCheckAll,
    checked: state.isAllSelected,
    key: `cb-select-all-${props.instanceId}`,
    name: `cb-select-all`,
    style: {
      fontSize: "16px"
    },
    options: state.checkList
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex-row",
    role: "columnheader"
  }, __("Destination Name")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex-row",
    role: "columnheader"
  }, __("Release Date")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flex-row",
    role: "columnheader"
  }, __("Expiration Date"))), (0,lodash__WEBPACK_IMPORTED_MODULE_1__.map)(props.destinations, (destination, destinations_index) => {
    {
      var schedule_options = [{
        label: 'Release Immediately',
        value: 0,
        id: "set_release_scheduler_advanced_release_lc__" + destination.destination_id + "-0",
        name: "set_release_scheduler_advanced_release_lc__" + destination.destination_id
      }, {
        label: 'Set new release date',
        value: 2,
        id: "set_release_scheduler_advanced_release_lc__" + destination.destination_id + "-2",
        name: "set_release_scheduler_advanced_release_lc__" + destination.destination_id
      }];
      var expiration_options = [{
        label: 'Never Expire',
        value: 0,
        id: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id + "-0",
        name: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id
      }, {
        label: 'Set new expiration date',
        value: 2,
        id: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id + "-2",
        name: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id
      }];
    }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex-table row",
      role: "rowgroup",
      key: `flex-table-row-${destinations_index}-${props.instanceId}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex-row first",
      role: "cell",
      key: `flex-table-first-${destinations_index}-${props.instanceId}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
      id: `libsyn-advanced-destination-checkbox-control-${destination.destination_id}`,
      key: `libsyn-advanced-destination-checkbox-control-${destination.destination_id}-${destinations_index}-${props.instanceId}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      id: `libsyn-advanced-destination-checkbox-${destination.destination_id}`,
      name: `libsyn-advanced-destination-checkbox-${destination.destination_id}`,
      key: `libsyn-advanced-destination-checkbox-${destination.destination_id}-${destinations_index}-${props.instanceId}`,
      className: "components-checkbox-control__input",
      type: "checkbox",
      value: "1",
      onChange: e => setDestinationData(e, `libsyn-advanced-destination-checkbox-${destination.destination_id}`, `libsyn-advanced-destination-checkbox-${destination.destination_id}`, destination.destination_id),
      checked: checkIsChecked(`libsyn-advanced-destination-checkbox-${destination.destination_id}`) ? true : false
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex-row",
      role: "cell",
      key: `flex-row-${destinations_index}-${props.instanceId}`
    }, destination.destination_name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex-row radio-input",
      role: "cell",
      key: `flex-row-radio-input-${destinations_index}-${props.instanceId}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
      id: "set_release_scheduler_advanced_release_lc__" + destination.destination_id,
      name: "set_release_scheduler_advanced_release_lc__" + destination.destination_id,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(props.className, 'components-radio-control'),
      key: `set_release_scheduler_advanced_release_lc__${destination.destination_id}-${destinations_index}-${props.instanceId}`
    }, schedule_options.map((options, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: `components-radio-control__option_schedule-${destinations_index}-${options.id}-${props.instanceId}`,
      className: "components-radio-control__option"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      id: options.id,
      className: "components-radio-control__input",
      type: "radio",
      name: options.name,
      value: options.value,
      onChange: e => setDestinationData(e, options.id, options.name, destination.destination_id, options.value),
      checked: checkIsChecked(options.id) ? true : false,
      key: `release-${options.id}-${index}-input-${destinations_index}-${props.instanceId}`
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: `${options.id}`,
      key: `release-${options.id}-${index}-label-${destinations_index}-${props.instanceId}`
    }, options.label)))), checkIsChecked(`set_release_scheduler_advanced_release_lc__${destination.destination_id}-2`) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "components-datetime",
      key: `release_scheduler_advanced_release_lc__${destinations_index}_datetime_div`
    }, !state.calendarModalIsVisible && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimePicker, {
      id: `release_scheduler_advanced_release_lc__${destinations_index}`,
      name: `release_scheduler_advanced_release_lc__${destinations_index}`,
      key: `release_scheduler_advanced_release_lc__${destinations_index}_timepicker`,
      currentTime: getDateValue(destination.destination_id, 'release'),
      onChange: e => setDestinationData(e, `release_scheduler_advanced_release_lc__${destination.destination_id}`, `release_scheduler_advanced_release_lc__${destination.destination_id}`, destination.destination_id),
      is12Hour: true,
      style: {
        display: "contents"
      }
    }), state.calendarModalVisible && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DatePicker, {
      id: `release_scheduler_advanced_release_lc__${destinations_index}_date`,
      name: `release_scheduler_advanced_release_lc__${destinations_index}_date`,
      key: `release_scheduler_advanced_release_lc__${destinations_index}_datepicker`,
      currentDate: getDateValue(destination.destination_id, 'release'),
      onChange: e => setDestinationData(e, `release_scheduler_advanced_release_lc__${destination.destination_id}_date`, `release_scheduler_advanced_release_lc__${destination.destination_id}_date`, destination.destination_id),
      style: {
        display: "contents"
      },
      isInvalidDate: isInvalidDate
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "flex-row radio-input",
      role: "cell",
      key: `set_expiration_scheduler_advanced_release_lc__${destinations_index}_outer_div`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
      id: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id + "-" + props.instanceId,
      name: "set_expiration_scheduler_advanced_release_lc__" + destination.destination_id + "-" + props.instanceId,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(props.className, 'components-radio-control'),
      key: `set_expiration_scheduler_advanced_release_lc__${destination.destination_id}-${destinations_index}-${props.instanceId}`
    }, expiration_options.map((options, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: `components-radio-control__option_expiration-${destinations_index}-${index}-${props.instanceId}`,
      className: "components-radio-control__option"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      id: options.id,
      className: "components-radio-control__input",
      type: "radio",
      name: options.name,
      value: options.value,
      onChange: e => setDestinationData(e, options.id, options.name, destination.destination_id, options.value),
      checked: checkIsChecked(options.id) ? true : false,
      key: `expiration-${options.id}-${index}-input-${destinations_index}-${props.instanceId}`
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: `${options.id}`,
      key: `expiration-${options.id}-${index}-label-${destinations_index}-${props.instanceId}`
    }, options.label)))), checkIsChecked(`set_expiration_scheduler_advanced_release_lc__${destination.destination_id}-2`) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "components-datetime",
      key: `expiration_scheduler_advanced_release_lc__${destinations_index}_datetime_div`
    }, !state.calendarModalIsVisible && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TimePicker, {
      id: `expiration_scheduler_advanced_release_lc__${destinations_index}`,
      name: `expiration_scheduler_advanced_release_lc__${destinations_index}`,
      key: `expiration_scheduler_advanced_release_lc__${destinations_index}_timepicker`,
      currentTime: getDateValue(destination.destination_id, 'expiration'),
      onChange: e => setDestinationData(e, `expiration_scheduler_advanced_release_lc__${destination.destination_id}`, `expiration_scheduler_advanced_release_lc__${destination.destination_id}`, destination.destination_id),
      is12Hour: true,
      style: {
        display: "contents"
      }
    }), state.calendarModalVisible && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DatePicker, {
      id: `expiration_scheduler_advanced_release_lc__${destinations_index}_date`,
      name: `expiration_scheduler_advanced_release_lc__${destinations_index}_date`,
      key: `expiration_scheduler_advanced_release_lc__${destinations_index}_datepicker`,
      currentDate: getDateValue(destination.destination_id, 'expiration'),
      onChange: e => setDestinationData(e, `expiration_scheduler_advanced_release_lc__${destination.destination_id}_date`, `expiration_scheduler_advanced_release_lc__${destination.destination_id}_date`, destination.destination_id),
      style: {
        display: "contents"
      },
      isInvalidDate: isInvalidDate
    }))));
  })));
};
LibsynAdvancedDestinations.defaultProps = {
  // destinations: Object.freeze( [] ),
  destinations: libsyn_nmp_data.destinations,
  // value: Object.freeze( [] ),
  value: Object.freeze([]),
  // displayTransform: identity,
  // saveTransform: ( token ) => token.trim(),
  onChange: () => {},
  onInputChange: () => {}
  // isBorderless: false,
  // disabled: false,
  // tokenizeOnSpace: false,
};

/* harmony default export */ __webpack_exports__["default"] = (withInstanceId(LibsynAdvancedDestinations));
// export const _default = () => <LibsynAdvancedDestinations />;

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _components_advanced_destinations_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/advanced_destinations.js */ "./src/components/advanced_destinations.js");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


//Custom Imports
// import { map } from 'lodash';


//Constants
const {
  registerBlockType
} = wp.blocks; // Import registerBlockType() from wp.blocks
const {
  RawHTML
} = wp.element;
const {
  TextareaControl,
  TextControl,
  Button,
  Modal,
  Panel,
  PanelBody,
  FormFileUpload,
  SelectControl,
  FormTokenField,
  CheckboxControl,
  ColorPicker,
  ComboboxControl,
  BaseControl,
  ToggleControl,
  withFocusOutside,
  Placeholder,
  withFocusReturn,
  Notice
} = wp.components;
const {
  withState
} = wp.compose;
const {
  InspectorControls
} = wp.blockEditor;
const {
  withSelect
} = wp.data;
const {
  serverSideRender: ServerSideRender
} = wp;
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
function Edit(props) {
  /* Define Vars */
  if (typeof libsyn_nmp_data.categories == 'undefined') {
    libsyn_nmp_data.categories = [];
  } else if (!!libsyn_nmp_data.selected_category) {
    libsyn_nmp_data.categories.push(libsyn_nmp_data.selected_category);
    let uniqueLibsynCategories = new Set(libsyn_nmp_data.categories);
    libsyn_nmp_data.categories = [...uniqueLibsynCategories]; //clean duplicates
  }

  const mapCategoryOption = category => ({
    value: category,
    label: category
  });
  const categoryOptions = libsyn_nmp_data.categories.map(mapCategoryOption);
  const editModeEnabled = () => !!libsyn_nmp_data.edit_mode_enabled;
  const isUpdatePost = () => !!props.attributes.libsynItemId;

  /* Define Constants */
  const LibsynMediaUploadModal = withState({
    isOpen: false
  })(_ref => {
    let {
      isOpen,
      setState
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      type: "button",
      className: "libsyn-dashicons-upload",
      id: "libsyn-upload-media",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Upload Media"),
      onClick: e => setState({
        isOpen: true
      }),
      style: {
        width: "100%"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Upload Media")), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      onRequestClose: e => {
        setState({
          isOpen: false
        });
        saveLibsynNewMediaMedia();
      },
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Upload Media"),
      className: "libsyn-upload-media-dialog",
      closeLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Close"),
      contentLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Upload Media")
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        width: "400px",
        height: "220px"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginLeft: "25%"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Media to upload:")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynMediaUploadModalForm, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "libsyn-media-progressbox-area",
      style: {
        display: "none"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-dots"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "libsyn-media-progressbox",
      style: {
        width: "100%"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "libsyn-media-progressbar"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "libsyn-media-statustxt"
    }, "0%"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "upload-error-dialog",
      style: {
        display: "none",
        color: "red",
        fontWeight: "bold",
        paddingTop: "12px"
      }
    }))));
  });
  const LibsynMediaUploadModalForm = () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(FormFileUpload, {
    accept: "audio/*,video/*",
    onChange: e => libsynUploadPrimaryMedia(e, props),
    className: "dialog-button-upload libsyn-dashicons-upload button-width-220",
    isSecondary: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Upload"));
  const LibsynCategoryCombobox = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      setLibsynPostEpisodeCategorySelection();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynCategoryComboboxModule, null);
    }
  });
  const LibsynCategoryComboboxModule = withState(getLibsynPostEpisodeCategory())(_ref2 => {
    let {
      category,
      setState
    } = _ref2;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ComboboxControl, {
      options: categoryOptions,
      id: "libsyn-post-episode-category-selection",
      onFilterValueChange: category => setLibsynPostEpisodeCategoryChange(category, setState({
        category
      })),
      onChange: category => setLibsynPostEpisodeCategorySelection(category, setState({
        category
      })),
      value: category
    });
  });
  const LibsynKeywords = withState(getLibsynPostEpisodeKeywords())(_ref3 => {
    let {
      tokens,
      suggestions,
      setState
    } = _ref3;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(FormTokenField, {
      id: "libsyn-post-episode-keywords",
      name: "libsyn-post-episode-keywords",
      value: tokens,
      onChange: tokens => setLibsynPostEpisodeKeywords(tokens, setState({
        tokens
      })),
      suggestions: suggestions,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter key or Comma (,) to add new phrase"),
      isBorderless: false,
      tokenizeOnSpace: false,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tags / Keywords (\"Enter Key\" or \",\")")
    });
  });
  const LibsynKeywordsEnhanced = withFocusReturn({
    onFocusReturn() {
      //TODO: Fix this to return to the dom element after prior keyword is input
      // console.log(document.getElementsByClassName( 'components-form-token-field__input' ));
      // document.getElementById( 'libsyn-post-episode-keywords' ).focus();
      return false;
    }
  })(LibsynKeywords);
  const ColoredLine = _ref4 => {
    let {
      color
    } = _ref4;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", {
      style: {
        color: color,
        backgroundColor: color,
        height: 5
      }
    });
  };
  const LibsynPostUpdateReleaseDateCheckbox = withState(getLibsynPostUpdateReleaseDate())(_ref5 => {
    let {
      isChecked,
      setState
    } = _ref5;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
      id: "libsyn-post-update-release-date",
      name: "libsyn-post-update-release-date",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Update Release Date"),
      checked: isChecked,
      onChange: isChecked => setLibsynPostUpdateReleaseDate(isChecked, setState({
        isChecked
      }))
    });
  });
  const LibsynDestinations = withState(getLibsynDestinationsData())(_ref6 => {
    let {
      value,
      setState
    } = _ref6;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_advanced_destinations_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
      destinations: libsyn_nmp_data.destinations,
      value: value
      // onChange={ value => setLibsynPostEpisodeAdvancedDestinationFormData( value, setState( { value } ) ) }
      ,
      className: "libsyn_destinations",
      changeHandler: value => setLibsynPostEpisodeAdvancedDestinationFormData(value, setState({
        value
      })),
      simpleDownloadChangeHandler: {
        set: setLibsynPostEpisodeSimpleDownload,
        get: getLibsynPostEpisodeSimpleDownload
      }
    });
  });
  const LibsynPostEpisodePlayerCustomColor = withState(getLibsynPostEpisodePlayerCustomColor())(_ref7 => {
    let {
      color,
      setState
    } = _ref7;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPicker, {
      color: color,
      onChangeComplete: value => setLibsynPostEpisodePlayerCustomColor(value, setState({
        value
      })),
      disableAlpha: true
    });
  });
  const PlayerSettingsPanel = () => {
    var player_themes = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Standard'),
      value: 'standard',
      name: "player_use_theme"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Mini'),
      value: 'mini',
      name: "player_use_theme"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom'),
      value: 'custom',
      name: "player_use_theme"
    }];
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      onToggle: toggleLibsynPlayerSettingsPanel,
      initialOpen: !!props.attributes.libsynPlayerSettingsPanel,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Player Settings"),
      className: props.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
      id: "player_use_theme_control",
      name: "player_use_theme_control",
      className: 'components-radio-control'
    }, player_themes.map((options, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: `player_use_theme_${options.value}_div`,
      className: "components-radio-control__option"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      id: `player_use_theme_${options.value}`,
      className: "components-radio-control__input",
      type: "radio",
      name: options.name,
      value: options.value,
      onChange: e => setLibsynPostEpisodePlayerUseTheme(e),
      checked: getPlayerUseThemeChecked(options.value),
      key: `components-radio-input-${options.value}`
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: `player_use_theme_${options.value}`,
      key: `player_use_theme_${options.value}_label`
    }, options.label), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginLeft: "36px"
      },
      id: `player_use_theme_${options.value}_image`,
      key: `player_use_theme_${options.value}_image`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: libsyn_nmp_data.player_settings.images[options.value],
      style: {
        maxWidth: "95%"
      }
    }))))), getPlayerUseTheme() == 'custom' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynPostEpisodePlayerCustomColor, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(DisplayArtworkOnPlayer, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PlayerUseDownloadLink, null), getPlayerUseDownloadLink() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PlayerUseDownloadLinkTextModule, null));
  };
  const EpisodeMediaPanel = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      onToggle: toggleLibsynEpisodeMediaPanel,
      initialOpen: !!props.attributes.libsynEpisodeMediaPanel,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Media"),
      className: props.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Media Source:")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynMediaUploadModal, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "libsyn-dashicons-wordpress",
      id: "libsyn-open-media",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Click Here to Open the Media Manager"),
      onClick: e => libsynSelectMedia(event, props)
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Wordpress Media")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "libsyn-button libsyn-dashicons-cloud",
      id: "libsyn-open-ftp_unreleased",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Click Here to Open the Media Manager"),
      onClick: e => libsynSelectFtp(event, props)
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("FTP/Unreleased")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element libsyn-input-grid-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynNewMediaMediaModule, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      type: "button",
      id: "libsyn-clear-media-button",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Clear primary media"),
      "data-buttontext": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Clear"),
      onClick: clearLibsynPrimaryMedia,
      style: {
        marginTop: "2px",
        paddingBottom: "2px"
      },
      isSecondary: true
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Clear")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(UploadMediaPreviewArea, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "libsyn-upload-media-error",
      style: {
        display: "none"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-media-error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      id: "libsyn-upload-media-error-text"
    }))));
  };
  const LibsynNewMediaMedia = withState(getLibsynNewMediaMedia())(_ref8 => {
    let {
      newMediaMedia,
      setState
    } = _ref8;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "libsyn-new-media-media",
      name: "libsyn-new-media-media",
      type: "url",
      value: newMediaMedia,
      onChange: newMediaMedia => setLibsynNewMediaMedia(newMediaMedia, setState({
        newMediaMedia
      })),
      pattern: "https?://.+",
      readOnly: getLibsynNewMediaMediaReadonly(),
      style: {
        width: "98%",
        maxWidth: "100%"
      }
    });
  });
  const LibsynNewMediaMediaModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynNewMediaMedia();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynNewMediaMedia, null);
    }
  });
  const UploadMediaPreviewArea = () => {
    if (!!libsyn_nmp_data.libsyn_upload_media_preview_inner_html) {
      var isLibsynPreviewVisible = 'block';
    } else {
      var isLibsynPreviewVisible = 'none';
    }
    // TODO: get the html to below to render in #libsyn-upload-media-preview as it clears on state change
    // { !!libsyn_nmp_data.libsyn_upload_media_preview_inner_html && ( libsyn_nmp_data.libsyn_upload_media_preview_inner_html ) }
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: "libsyn-upload-media-preview-area",
      style: {
        display: {
          isLibsynPreviewVisible
        }
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      id: "libsyn-upload-media-preview",
      className: "libsyn-upload-media-preview"
    }));
  };
  const EpisodeDetailsPanel = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      onToggle: toggleLibsynEpisodeDetailsPanel,
      initialOpen: !!props.attributes.libsynEpisodeDetailsPanel,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Details"),
      className: props.className
    }, !!getLibsynShowIsPremium() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-premium_state"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Premium State")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      id: "libsyn-post-episode-premium_state",
      name: "libsyn-post-episode-premium_state",
      value: props.attributes.libsynPostEpisodePremiumState,
      onChange: setLibsynPostEpisodePremiumState,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("<--Select an option-->"),
        value: "",
        name: "none"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Auto"),
        value: "auto",
        name: "auto"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Premium"),
        value: "premium",
        name: "premium"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Free"),
        value: "free",
        name: "free"
      }]
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-subtitle"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Subtitle")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeSubtitleModule, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-category-selection"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Category"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        color: "red"
      }
    }, "*")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "options-error",
      style: {
        display: "none",
        color: "red",
        fontWeight: "bold"
      }
    }, "Could not populate categories, manually enter category."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynCategoryCombobox, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynKeywordsEnhanced, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(UpdateId3Tags, null)));
  };
  const EpisodeThumbnailPanel = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      onToggle: toggleLibsynEpisodeThumbnailPanel,
      initialOpen: !!props.attributes.libsynEpisodeThumbnailPanel,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Thumbnail"),
      className: props.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-upload-buttons-grid"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-upload-buttons-grid-a"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-upload-buttons-grid-b"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-upload-buttons-grid-c"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("fieldset", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("legend", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Media Source:")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "libsyn-button libsyn-dashicons-image",
      id: "libsyn-open-image",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Click Here to Open the Image Manager"),
      onClick: e => libsynSelectImage(event, props)
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Thumbnail")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element libsyn-input-grid-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynNewMediaImageModule, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      type: "button",
      id: "libsyn-clear-image-button",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Clear image url"),
      "data-buttontext": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Clear"),
      onClick: clearEpisodeThumbnail,
      isSecondary: true
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Clear")))));
  };
  const LibsynNewMediaImage = withState(getLibsynNewMediaImage())(_ref9 => {
    let {
      newMediaImage,
      setState
    } = _ref9;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "libsyn-new-media-image",
      name: "libsyn-new-media-image",
      type: "url",
      value: newMediaImage,
      onChange: newMediaImage => setLibsynNewMediaImage(newMediaImage, setState({
        newMediaImage
      })),
      pattern: "https?://.+",
      readOnly: getLibsynNewMediaImageReadonly(),
      style: {
        width: "98%",
        maxWidth: "100%"
      }
    });
  });
  const LibsynNewMediaImageModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynNewMediaImage();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynNewMediaImage, null);
    }
  });
  const ItunesOptimizationTagsPanel = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      onToggle: toggleLibsynItunesOptimizationTagsPanel,
      initialOpen: !!props.attributes.libsynItunesOptimizationTagsPanel,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Apple Podcasts Optimization"),
      className: props.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        padding: "4px 2px"
      },
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-itunes-explicit"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Explicit Content")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      id: "libsyn-post-episode-itunes-explicit",
      name: "libsyn-post-episode-itunes-explicit",
      value: props.attributes.libsynPostEpisodeItunesExplicit,
      onChange: setLibsynPostEpisodeItunesExplicit,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Not Set"),
        value: "no"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Clean"),
        value: "clean"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Explicit"),
        value: "yes"
      }]
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        paddingBottom: "4px"
      },
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-itunes-episode-number"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Number")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesEpisodeNumberModule, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        paddingBottom: "4px"
      },
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-itunes-season-number"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Season Number")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesSeasonNumberModule, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        paddingBottom: "4px"
      },
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-itunes-episode-type"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Type")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
      id: "libsyn-post-episode-itunes-episode-type",
      name: "libsyn-post-episode-itunes-episode-type",
      value: props.attributes.libsynPostEpisodeItunesEpisodeType,
      onChange: setLibsynPostEpisodeItunesEpisodeType,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("<--Select an option-->"),
        value: "",
        name: "none"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Full"),
        value: "full",
        name: "none"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Trailer"),
        value: "trailer",
        name: "none"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bonus"),
        value: "bonus",
        name: "none"
      }]
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        paddingBottom: "4px"
      },
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-itunes-episode-title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Title")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesEpisodeTitleModule, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        paddingBottom: "4px"
      },
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "libsyn-post-episode-itunes-episode-author"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Episode Author")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesEpisodeAuthorModule, null)));
  };
  /* @deprecated v1.3.1 - from ItunesOptimizationTagsPanel
  <div style={{ paddingBottom: "4px" }} className="libsyn-input-element">
  	<label htmlFor="libsyn-post-episode-itunes-episode-summary">{ __( "Episode Summary" ) }</label>
  	<LibsynEpisodeItunesEpisodeSummaryModule />
  </div>
  */

  const LibsynEpisodeItunesEpisodeNumberModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynPostEpisodeItunesEpisodeNumber();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesEpisodeNumber, null);
    }
  });
  const LibsynEpisodeItunesEpisodeNumber = withState(getLibsynPostEpisodeItunesEpisodeNumber())(_ref10 => {
    let {
      episodeItunesEpisodeNumber,
      setState
    } = _ref10;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "libsyn-post-episode-itunes-episode-number",
      name: "libsyn-post-episode-itunes-episode-number",
      type: "number",
      value: episodeItunesEpisodeNumber,
      onChange: episodeItunesEpisodeNumber => setLibsynPostEpisodeItunesEpisodeNumber(episodeItunesEpisodeNumber, setState({
        episodeItunesEpisodeNumber
      })),
      min: 1,
      max: 99999
    });
  });
  const LibsynEpisodeItunesSeasonNumberModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynPostEpisodeItunesSeasonNumber();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesSeasonNumber, null);
    }
  });
  const LibsynEpisodeItunesSeasonNumber = withState(getLibsynPostEpisodeItunesSeasonNumber())(_ref11 => {
    let {
      episodeItunesSeasonNumber,
      setState
    } = _ref11;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "libsyn-post-episode-itunes-season-number",
      name: "libsyn-post-episode-itunes-season-number",
      type: "number",
      value: episodeItunesSeasonNumber,
      onChange: episodeItunesSeasonNumber => setLibsynPostEpisodeItunesSeasonNumber(episodeItunesSeasonNumber, setState({
        episodeItunesSeasonNumber
      })),
      min: 1,
      max: 99999
    });
  });
  const LibsynEpisodeItunesEpisodeSummaryModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynPostEpisodeItunesEpisodeSummary();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesEpisodeSummary, null);
    }
  });
  const LibsynEpisodeItunesEpisodeSummary = withState(getLibsynPostEpisodeItunesEpisodeSummary())(_ref12 => {
    let {
      episodeItunesEpisodeSummary,
      setState
    } = _ref12;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
      id: "libsyn-post-episode-itunes-episode-summary",
      name: "libsyn-post-episode-itunes-episode-summary",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(""),
      value: episodeItunesEpisodeSummary,
      onChange: episodeItunesEpisodeSummary => setLibsynPostEpisodeItunesEpisodeSummary(episodeItunesEpisodeSummary, setState({
        episodeItunesEpisodeSummary
      })),
      maxLength: "4000",
      rows: "8",
      columns: "50",
      wrap: "hard"
    });
  });
  const LibsynEpisodeItunesEpisodeTitleModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynPostEpisodeItunesEpisodeTitle();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesEpisodeTitle, null);
    }
  });
  const LibsynEpisodeItunesEpisodeTitle = withState(getLibsynPostEpisodeItunesEpisodeTitle())(_ref13 => {
    let {
      episodeItunesEpisodeTitle,
      setState
    } = _ref13;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "libsyn-post-episode-itunes-episode-title",
      name: "libsyn-post-episode-itunes-episode-title",
      value: episodeItunesEpisodeTitle,
      onChange: episodeItunesEpisodeTitle => setLibsynPostEpisodeItunesEpisodeTitle(episodeItunesEpisodeTitle, setState({
        episodeItunesEpisodeTitle
      }))
    });
  });
  const LibsynEpisodeItunesEpisodeAuthorModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynPostEpisodeItunesEpisodeAuthor();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeItunesEpisodeAuthor, null);
    }
  });
  const LibsynEpisodeItunesEpisodeAuthor = withState(getLibsynPostEpisodeItunesEpisodeAuthor())(_ref14 => {
    let {
      episodeItunesEpisodeAuthor,
      setState
    } = _ref14;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "libsyn-post-episode-itunes-episode-author",
      name: "libsyn-post-episode-itunes-episode-author",
      value: episodeItunesEpisodeAuthor,
      onChange: episodeItunesEpisodeAuthor => setLibsynPostEpisodeItunesEpisodeAuthor(episodeItunesEpisodeAuthor, setState({
        episodeItunesEpisodeAuthor
      }))
    });
  });
  const AdvancedDestinationsPanel = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
      onToggle: toggleLibsynAdvancedDestinationsPanel,
      initialOpen: !!props.attributes.libsynAdvancedDestinationsPanel,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Advanced Destination Scheduling"),
      className: props.className
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynAdvancedDestinationsModal, null));
  };
  const AdvancedDestinationsPanelWithFocusReturn = withFocusReturn({
    //TODO: fix this currently not working, possibly an improvement?
    onFocusReturn() {
      // document.getElementById( 'libsyn-advanced-destinations-panel' ).focus();
      return false;
    }
  })(AdvancedDestinationsPanel);
  const LibsynAdvancedDestinationsModal = withState(getLibsynAdvancedDestinationsModalState())(_ref15 => {
    let {
      isOpen,
      setState
    } = _ref15;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      type: "button",
      className: "libsyn-button",
      id: "libsyn-advanced-destination-form-button",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Customize Episode Scheduling & Release"),
      onClick: () => setLibsynAdvancedDestinationsModalState(true, setState({
        isOpen: true
      })),
      isSecondary: true
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Customize Scheduling & Release")), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
      onRequestClose: () => setLibsynAdvancedDestinationsModalState(false, setState({
        isOpen: false
      })),
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Publishing Destinations"),
      className: "libsyn-upload-media-dialog",
      closeLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Close"),
      focusOnMount: true,
      style: {
        maxWidth: "1200px",
        width: "780px"
      },
      contentLabel: "Destinations"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "libsyn-input-element"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynDestinations, null))));
  });
  const DisplayArtworkOnPlayer = withState(getLibsynPostEpisodePlayerUseThumbnail())(_ref16 => {
    let {
      useThumbnail,
      setState
    } = _ref16;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display episode/show artwork on the player?"),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("(minimum height 200px)"),
      checked: useThumbnail,
      onChange: () => setLibsynPostEpisodePlayerUseThumbnail(useThumbnail, setState({
        useThumbnail
      }))
    });
  });
  const UpdateId3Tags = withState(getLibsynPostEpisodeUpdateId3())(_ref17 => {
    let {
      updateId3,
      setState
    } = _ref17;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Allow Libsyn to update id3 tags with post data."),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("(mp3 files only)"),
      checked: updateId3,
      onChange: () => setLibsynPostEpisodeUpdateId3(updateId3, setState({
        updateId3
      }))
    });
  });
  const PlayerUseDownloadLink = withState(getLibsynPostEpisodePlayerUseDownloadLink())(_ref18 => {
    let {
      useDownloadLink,
      setState
    } = _ref18;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display download link below the player?"),
      checked: useDownloadLink,
      onChange: () => setLibsynPostEpisodePlayerUseDownloadLink(useDownloadLink, setState({
        useDownloadLink
      }))
    });
  });
  const LibsynEpisodeSubtitleModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynPostEpisodeSubtitle();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynEpisodeSubtitle, null);
    }
  });
  const LibsynEpisodeSubtitle = withState(getLibsynPostEpisodeSubtitle())(_ref19 => {
    let {
      episodeSubtitle,
      setState
    } = _ref19;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "libsyn-post-episode-subtitle",
      name: "libsyn-post-episode-subtitle",
      autoComplete: "off",
      value: episodeSubtitle,
      onChange: episodeSubtitle => setLibsynPostEpisodeSubtitle(episodeSubtitle, setState({
        episodeSubtitle
      })),
      maxLength: 255
    });
  });
  const PlayerUseDownloadLinkTextModule = withFocusOutside( /* For some reason InspectorControls loses focus on change for ToggleControl this will work around the issue */
  class extends React.Component {
    handleFocusOutside() {
      saveLibsynPostEpisodePlayerUseDownloadLinkText();
    }
    render() {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PlayerUseDownloadLinkText, null);
    }
  });
  const PlayerUseDownloadLinkText = withState(getLibsynPostEpisodePlayerUseDownloadLinkText())(_ref20 => {
    let {
      downloadLinkText,
      setState
    } = _ref20;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      id: "player_use_download_link_text",
      name: "player_use_download_link_text",
      autoComplete: "off",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Download Link Text"),
      value: downloadLinkText,
      onChange: downloadLinkText => setLibsynPostEpisodePlayerUseDownloadLinkText(downloadLinkText, setState({
        downloadLinkText
      })),
      maxLength: 255
    });
  });

  /* Define Functions */
  function contentClass(isShow) {
    if (isShow) {
      return "content";
    } else {
      return "content invisible";
    }
  }
  function is_null(mixed_var) {
    return typeof mixed_var === 'undefined' || mixed_var === null;
  }
  function checkIsChecked(id) {
    if (!is_null(props.attributes.value[id])) {
      if (this.props.value[id] == "checked") {
        return true;
      }
    }
    return false;
  }
  function unescapeAndFormatSpaces(str) {
    const nbsp = String.fromCharCode(160);
    return unescape(str).replace(/ /g, nbsp);
  }
  function toggleLibsynItunesOptimizationContainer(event) {
    $("#libsyn-itunes-optimization-container").toggle();
  }
  function toggleLibsynAdvancedDestinationFormContainer(event) {
    props.setAttributes({
      libsynPostEpisodeAdvancedDestinationFormDataInputEnabled: !props.attributes.libsynPostEpisodeAdvancedDestinationFormDataInputEnabled
    });
    $("#libsyn-advanced-destination-form-container").toggle();
  }
  function toggleLibsynPlayerSettingsPanel() {
    props.setAttributes({
      libsynPlayerSettingsPanel: !props.attributes.libsynPlayerSettingsPanel
    });
  }
  function toggleLibsynEpisodeMediaPanel() {
    props.setAttributes({
      libsynEpisodeMediaPanel: !props.attributes.libsynEpisodeMediaPanel
    });
  }
  function toggleLibsynEpisodeDetailsPanel() {
    props.setAttributes({
      libsynEpisodeDetailsPanel: !props.attributes.libsynEpisodeDetailsPanel
    });
  }
  function toggleLibsynEpisodeThumbnailPanel() {
    props.setAttributes({
      libsynEpisodeThumbnailPanel: !props.attributes.libsynEpisodeThumbnailPanel
    });
  }
  function toggleLibsynItunesOptimizationTagsPanel() {
    props.setAttributes({
      libsynItunesOptimizationTagsPanel: !props.attributes.libsynItunesOptimizationTagsPanel
    });
  }
  function toggleLibsynAdvancedDestinationsPanel() {
    props.setAttributes({
      libsynAdvancedDestinationsPanel: !props.attributes.libsynAdvancedDestinationsPanel
    });
  }
  function clearLibsynPrimaryMedia() {
    //clear media element
    let libsyn_nmp_mediaMediaElem = document.getElementById("libsyn-new-media-media");
    if (!is_null(libsyn_nmp_mediaMediaElem)) {
      libsyn_nmp_mediaMediaElem.value = "";
      libsyn_nmp_data.libsyn_new_media_media = "";
      libsyn_nmp_mediaMediaElem.setAttribute("readonly", false);
      props.setAttributes({
        libsynNewMediaMedia: ""
      });
    }
    //clear preview container and elements
    let libsyn_nmp_previewElem = document.getElementById("libsyn-upload-media-preview");
    if (!is_null(libsyn_nmp_previewElem)) {
      while (libsyn_nmp_previewElem.firstChild) {
        libsyn_nmp_previewElem.removeChild(libsyn_nmp_previewElem.firstChild);
      }
    }
    let libsyn_nmp_mediaErrorElem = document.getElementById("libsyn-upload-media-error");
    if (!is_null(libsyn_nmp_mediaErrorElem)) {
      libsyn_nmp_mediaErrorElem.style.display = "none";
    }
    let libsyn_nmp_uploadButtonElem = document.getElementById("dialog-button-upload");
    if (!is_null(libsyn_nmp_uploadButtonElem)) {
      libsyn_nmp_uploadButtonElem.setAttribute("disabled", false);
    }
    let libsyn_nmp_uploadErrorElem = document.getElementById("upload-error-dialog");
    if (!is_null(libsyn_nmp_uploadErrorElem)) {
      while (libsyn_nmp_uploadErrorElem[i].firstChild) {
        libsyn_nmp_uploadErrorElem[i].removeChild(libsyn_nmp_uploadErrorElem[i].firstChild);
      }
    }
    if (!!libsyn_nmp_data.libsyn_upload_media_preview_inner_html) {
      libsyn_nmp_data.libsyn_upload_media_preview_inner_html = '';
    }
  }
  function clearEpisodeThumbnail(event) {
    let libsyn_nmp_episodeThumbnailElem = document.getElementById("libsyn-new-media-image");
    if (!is_null(libsyn_nmp_episodeThumbnailElem)) {
      libsyn_nmp_episodeThumbnailElem.value = "";
      libsyn_nmp_episodeThumbnailElem.setAttribute("readonly", false);
      props.setAttributes({
        libsynNewMediaImage: ""
      });
    }
  }

  /* Setters */

  function setLibsynPostUpdateReleaseDate(value, callBack) {
    if (value) {
      props.setAttributes({
        libsynPostUpdateReleaseDate: 'isLibsynUpdateReleaseDate'
      });
    } else {
      props.setAttributes({
        libsynPostUpdateReleaseDate: ''
      });
    }
  }
  function setLibsynPostEpisodePlayerUseTheme(event) {
    var libsyn_nmp_retPlayerUseTheme = '';
    if (!!event.target) {
      if (!!event.target.value) {
        libsyn_nmp_retPlayerUseTheme = event.target.value;
      } else {
        if (!!event.value) {
          libsyn_nmp_retPlayerUseTheme = event.value;
        }
      }
    }
    props.setAttributes({
      libsynPostEpisodePlayerUseTheme: libsyn_nmp_retPlayerUseTheme
    });
  }
  function setLibsynNewMediaMedia(value, callback) {
    libsyn_nmp_data.error.media_show_mismatch = false;
    libsyn_nmp_data.libsyn_new_media_media = value;
    // props.setAttributes( { libsynNewMediaMedia: value } );
  }

  function saveLibsynNewMediaMedia() {
    if (!!props.attributes.libsynNewMediaMedia) {
      props.setAttributes({
        libsynNewMediaMedia: props.attributes.libsynNewMediaMedia
      });
    }
  }
  function setLibsynNewMediaImage(value, callBack) {
    libsyn_nmp_data.libsyn_new_media_image = value;
    props.setAttributes({
      libsynNewMediaImage: value
    });
  }
  function saveLibsynNewMediaImage() {
    if (!!props.attributes.libsynNewMediaImage) {
      props.setAttributes({
        libsynNewMediaImage: props.attributes.libsynNewMediaImage
      });
    }
  }
  function setLibsynPostEpisodeSubtitle(value, callBack) {
    props.attributes.libsynPostEpisodeSubtitle = value;
  }
  function setLibsynPostItunes(value) {
    props.setAttributes({
      libsynPostItunes: value
    });
  }
  function setLibsynPostEpisodeItunesExplicit(value) {
    props.setAttributes({
      libsynPostEpisodeItunesExplicit: value
    });
  }
  function setLibsynPostEpisodeItunesEpisodeNumber(value, callBack) {
    props.attributes.libsynPostEpisodeItunesEpisodeNumber = value;
  }
  function setLibsynPostEpisodeItunesSeasonNumber(value, callBack) {
    props.attributes.libsynPostEpisodeItunesSeasonNumber = value;
  }
  function setLibsynPostEpisodeItunesEpisodeType(value) {
    props.setAttributes({
      libsynPostEpisodeItunesEpisodeType: value
    });
  }
  function setLibsynPostEpisodePremiumState(value) {
    props.setAttributes({
      libsynPostEpisodePremiumState: value
    });
  }
  function setLibsynPostEpisodeItunesEpisodeSummary(value, callBack) {
    props.attributes.libsynPostEpisodeItunesEpisodeSummary = value;
  }
  function setLibsynPostEpisodeItunesEpisodeTitle(value, callBack) {
    props.attributes.libsynPostEpisodeItunesEpisodeTitle = value;
  }
  function setLibsynPostEpisodeItunesEpisodeAuthor(value, callBack) {
    props.attributes.libsynPostEpisodeItunesEpisodeAuthor = value;
  }
  function setLibsynPostEpisodePlayerUseDownloadLinkText(value, callBack) {
    libsyn_nmp_data.player_use_download_link_text = value;
    props.attributes.libsynPostEpisodePlayerUseDownloadLinkText = value;
  }
  function saveLibsynPostEpisodePlayerUseDownloadLinkText() {
    libsyn_nmp_data.player_use_download_link_text = props.attributes.libsynPostEpisodePlayerUseDownloadLinkText;
    props.setAttributes({
      libsynPostEpisodePlayerUseDownloadLinkText: props.attributes.libsynPostEpisodePlayerUseDownloadLinkText
    });
  }
  function saveLibsynPostEpisodeSubtitle() {
    props.setAttributes({
      libsynPostEpisodeSubtitle: props.attributes.libsynPostEpisodeSubtitle
    });
  }
  function saveLibsynPostEpisodeItunesEpisodeNumber() {
    props.setAttributes({
      libsynPostEpisodeItunesEpisodeNumber: props.attributes.libsynPostEpisodeItunesEpisodeNumber
    });
  }
  function saveLibsynPostEpisodeItunesSeasonNumber() {
    props.setAttributes({
      libsynPostEpisodeItunesSeasonNumber: props.attributes.libsynPostEpisodeItunesSeasonNumber
    });
  }
  function saveLibsynPostEpisodeItunesEpisodeSummary() {
    props.setAttributes({
      libsynPostEpisodeItunesEpisodeSummary: props.attributes.libsynPostEpisodeItunesEpisodeSummary
    });
  }
  function saveLibsynPostEpisodeItunesEpisodeTitle() {
    props.setAttributes({
      libsynPostEpisodeItunesEpisodeTitle: props.attributes.libsynPostEpisodeItunesEpisodeTitle
    });
  }
  function saveLibsynPostEpisodeItunesEpisodeAuthor() {
    props.setAttributes({
      libsynPostEpisodeItunesEpisodeAuthor: props.attributes.libsynPostEpisodeItunesEpisodeAuthor
    });
  }
  function setLibsynPostEpisodeKeywords(value, callBack) {
    if (!!value) {
      if (Array.isArray(value)) {
        props.setAttributes({
          libsynPostEpisodeKeywords: value.join(', ')
        });
      } else {
        props.setAttributes({
          libsynPostEpisodeKeywords: value
        });
      }
    }
  }
  function saveLibsynPostEpisodeAdvancedDestinationFormData() {
    if (!!props.attributes.libsynPostEpisodeAdvancedDestinationFormData) {
      props.setAttributes({
        libsynPostEpisodeAdvancedDestinationFormData: props.attributes.libsynPostEpisodeAdvancedDestinationFormData
      });
    }
  }
  function setLibsynPostEpisodeAdvancedDestinationFormData(value) {
    if (!is_null(value)) {
      props.attributes.libsynPostEpisodeAdvancedDestinationFormData = JSON.stringify(value);
      props.setAttributes({
        libsynPostEpisodeAdvancedDestinationFormData: props.attributes.libsynPostEpisodeAdvancedDestinationFormData
      });
    }
  }
  function setLibsynPostEpisodePlayerCustomColor(value, callBack) {
    if (!!value) {
      if (!!value.hex) {
        props.setAttributes({
          libsynPostEpisodePlayerCustomColor: value.hex
        });
      } else {
        props.setAttributes({
          libsynPostEpisodePlayerCustomColor: value
        });
      }
    }
  }
  function setLibsynPostEpisodeSimpleDownload(value, callBack) {
    if (!!value) {
      if (!is_null(value.option)) {
        props.attributes.libsynPostEpisodeSimpleDownload = value.option;
      } else {
        props.attributes.libsynPostEpisodeSimpleDownload = value;
      }
    }
    props.setAttributes({
      libsynPostEpisodeSimpleDownload: props.attributes.libsynPostEpisodeSimpleDownload
    });
  }
  function saveLibsynPostEpisodeSimpleDownload() {
    props.setAttributes({
      libsynPostEpisodeSimpleDownload: props.attributes.libsynPostEpisodeSimpleDownload
    });
  }
  function setLibsynPostEpisodePlayerUseThumbnail(value, callBack) {
    var libsyn_nmp_retPlayerUseThumbnail = !!value;
    if (!is_null(value.useThumbnail)) {
      libsyn_nmp_retPlayerUseThumbnail = !!value.useThumbnail;
    }
    libsyn_nmp_retPlayerUseThumbnail = !libsyn_nmp_retPlayerUseThumbnail;
    if (libsyn_nmp_retPlayerUseThumbnail) {
      libsyn_nmp_data.player_settings.player_use_thumbnail = 'use_thumbnail';
      props.setAttributes({
        libsynPostEpisodePlayerUseThumbnail: 'use_thumbnail'
      });
    } else {
      libsyn_nmp_data.player_settings.player_use_thumbnail = '';
      props.setAttributes({
        libsynPostEpisodePlayerUseThumbnail: ''
      });
    }
  }
  function setLibsynPostEpisodeUpdateId3(value, callBack) {
    var libsyn_nmp_retUpdateId3 = !!value;
    if (!is_null(value.updateId3)) {
      libsyn_nmp_retUpdateId3 = !!value.updateId3;
    }
    libsyn_nmp_retUpdateId3 = !libsyn_nmp_retUpdateId3;
    if (libsyn_nmp_retUpdateId3) {
      libsyn_nmp_data.player_settings.update_id3 = 'isLibsynUpdateId3';
      props.setAttributes({
        libsynPostEpisodeUpdateId3: 'isLibsynUpdateId3'
      });
    } else {
      libsyn_nmp_data.player_settings.update_id3 = '';
      props.setAttributes({
        libsynPostEpisodeUpdateId3: ''
      });
    }
  }
  function setLibsynPostEpisodePlayerUseDownloadLink(value, callBack) {
    var libsyn_nmp_retPlayerUseDownloadLink = !!value;
    if (!is_null(value.useDownloadLink)) {
      libsyn_nmp_retPlayerUseDownloadLink = !!value.useDownloadLink;
    }
    libsyn_nmp_retPlayerUseDownloadLink = !libsyn_nmp_retPlayerUseDownloadLink;
    if (libsyn_nmp_retPlayerUseDownloadLink) {
      libsyn_nmp_data.player_settings.player_use_download_link = 'use_download_link';
      props.setAttributes({
        libsynPostEpisodePlayerUseDownloadLink: 'use_download_link'
      });
    } else {
      libsyn_nmp_data.player_settings.player_use_download_link = '';
      props.setAttributes({
        libsynPostEpisodePlayerUseDownloadLink: ''
      });
    }
  }
  function setLibsynPostEpisode(value) {
    props.setAttributes({
      libsynPostEpisode: value
    });
  }
  function setLibsynShowId(value) {
    if (!!props.attributes.libsynNewMediaMedia) {
      libsyn_nmp_data.error.media_show_mismatch = true;
      props.setAttributes({
        libsynShowId: value
      });
      clearLibsynPrimaryMedia();
    } else {
      libsyn_nmp_data.error.media_show_mismatch = false;
      props.setAttributes({
        libsynShowId: value
      });
    }
    libsyn_nmp_data.api.show_id = value;
  }
  function setLibsynPostEpisodeCategorySelection() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let callBack = arguments.length > 1 ? arguments[1] : undefined;
    return function (value) {
      if (is_null(value)) {
        var value = libsyn_nmp_data.selected_category;
      }
      if (!!value) {
        if (!is_null(value.value)) {
          var libsyn_nmp_retCategory = String(value.value);
        } else {
          var libsyn_nmp_retCategory = String(value);
        }
        libsyn_nmp_data.selected_category = libsyn_nmp_retCategory;
        props.setAttributes({
          libsynPostEpisodeCategorySelection: libsyn_nmp_retCategory
        });
      }
    }(value);
  }
  function setLibsynPostEpisodeCategoryChange(value, callBack) {
    if (!!value) {
      if (!is_null(value.value)) {
        var libsyn_nmp_retCategory = String(value.value);
      } else {
        var libsyn_nmp_retCategory = String(value);
      }
      libsyn_nmp_data.selected_category = libsyn_nmp_retCategory;
    }
  }
  function setLibsynAdvancedDestinationsModalState(value, callBack) {
    props.setAttributes({
      libsynPostEpisodeAdvancedDestinationFormDataInputEnabled: true
    });
    if (!!value) {
      props.setAttributes({
        libsynAdvancedDestinationsModalState: true
      });
      return {
        isOpen: true
      };
    } else {
      props.setAttributes({
        libsynAdvancedDestinationsModalState: false
      });
      saveLibsynPostEpisodeAdvancedDestinationFormData(); //Save destinations
      saveLibsynPostEpisodeSimpleDownload(); //Save simple download option
      return {
        isOpen: false
      };
    }
  }

  /* Getters */
  function getLibsynAdvancedDestinationsModalState() {
    if (props.attributes.libsynAdvancedDestinationsModalState) {
      return {
        isOpen: true
      };
    } else {
      return {
        isOpen: false
      };
    }
  }
  function getLibsynPostEpisodeKeywords() {
    var libsyn_nmp_retTokens = [];
    if (!is_null(libsyn_nmp_data.categories)) {
      var libsyn_nmp_retSuggestions = libsyn_nmp_data.categories.concat(['Podcast', 'Episode', 'Post']);
    } else {
      var libsyn_nmp_retSuggestions = ['Podcast', 'Episode', 'Post'];
    }
    var libsyn_nmp_keywords = props.attributes.libsynPostEpisodeKeywords;
    if (!!libsyn_nmp_keywords) {
      if (Array.isArray(libsyn_nmp_keywords)) {
        libsyn_nmp_retTokens = libsyn_nmp_keywords;
      } else {
        libsyn_nmp_retTokens = libsyn_nmp_keywords.split(', ').join(',').split(',');
      }
    }
    //Sanitize duplicate keywords
    if (typeof Set == 'function') {
      libsyn_nmp_retTokens = [...new Set(libsyn_nmp_retTokens)];
    }
    return {
      tokens: libsyn_nmp_retTokens,
      suggestions: libsyn_nmp_retSuggestions.concat(libsyn_nmp_retTokens)
    };
  }
  function getLibsynPostEpisodeCategory() {
    if (!!libsyn_nmp_data.selected_category) {
      var libsyn_nmp_retCategory = libsyn_nmp_data.selected_category;
    } else {
      if (!!props.attributes.libsynPostEpisodeCategorySelection) {
        var libsyn_nmp_retCategory = props.attributes.libsynPostEpisodeCategorySelection;
      } else {
        var libsyn_nmp_retCategory = "";
      }
    }
    return {
      category: libsyn_nmp_retCategory
    };
  }
  function getLibsynPostEpisodeSimpleDownload() {
    if (!!props.attributes.libsynPostEpisodeSimpleDownload && props.attributes.libsynPostEpisodeSimpleDownload == 'release_date') {
      var libsyn_nmp_retOption = props.attributes.libsynPostEpisodeSimpleDownload;
    } else if (!!libsyn_nmp_data.simple_download) {
      var libsyn_nmp_retOption = libsyn_nmp_data.simple_download;
    } else {
      var libsyn_nmp_retOption = 'available';
    }
    return {
      option: libsyn_nmp_retOption
    };
  }
  function getLibsynPostEpisodePlayerUseThumbnail() {
    if (props.attributes.libsynPostEpisodePlayerUseThumbnail !== '') {
      if (props.attributes.libsynPostEpisodePlayerUseThumbnail == 'use_thumbnail') {
        var libsyn_nmp_retOption = true;
      } else {
        var libsyn_nmp_retOption = !!props.attributes.libsynPostEpisodePlayerUseThumbnail;
      }
    } else if (!is_null(libsyn_nmp_data.player_settings.player_use_thumbnail)) {
      var libsyn_nmp_retOption = !!libsyn_nmp_data.player_settings.player_use_thumbnail;
    } else {
      var libsyn_nmp_retOption = false;
    }
    return {
      useThumbnail: libsyn_nmp_retOption
    };
  }
  function getLibsynPostEpisodeUpdateId3() {
    if (props.attributes.libsynPostEpisodeUpdateId3 !== '') {
      if (props.attributes.libsynPostEpisodeUpdateId3 == 'isLibsynUpdateId3') {
        var libsyn_nmp_retOption = true;
      } else {
        var libsyn_nmp_retOption = !!props.attributes.libsynPostEpisodeUpdateId3;
      }
    } else if (!is_null(libsyn_nmp_data.update_id3)) {
      var libsyn_nmp_retOption = !!libsyn_nmp_data.update_id3;
    } else {
      var libsyn_nmp_retOption = false;
    }
    return {
      updateId3: libsyn_nmp_retOption
    };
  }
  function getLibsynPostEpisodePlayerUseDownloadLink() {
    if (props.attributes.libsynPostEpisodePlayerUseDownloadLink !== '') {
      if (props.attributes.libsynPostEpisodeUpdateId3 == 'use_download_link') {
        var libsyn_nmp_retOption = true;
      } else {
        var libsyn_nmp_retUseDownloadLink = !!props.attributes.libsynPostEpisodePlayerUseDownloadLink;
      }
    } else if (!is_null(libsyn_nmp_data.player_settings.player_use_download_link)) {
      var libsyn_nmp_retUseDownloadLink = !!libsyn_nmp_data.player_settings.player_use_download_link;
    } else {
      var libsyn_nmp_retUseDownloadLink = false;
    }
    return {
      useDownloadLink: libsyn_nmp_retUseDownloadLink
    };
  }
  function getPlayerUseDownloadLink() {
    var retDownloadLink = getLibsynPostEpisodePlayerUseDownloadLink();
    if (retDownloadLink.useDownloadLink == 'use_download_link' || retDownloadLink.useDownloadLink == true) {
      return true;
    } else {
      return false;
    }
  }
  function getLibsynPostEpisodePlayerUseDownloadLinkText() {
    var libsyn_nmp_retDownloadLinkText = '';
    if (!!props.attributes.libsynPostEpisodePlayerUseDownloadLinkText) {
      var libsyn_nmp_retDownloadLinkText = props.attributes.libsynPostEpisodePlayerUseDownloadLinkText;
    } else if (!!libsyn_nmp_data.player_settings.player_use_download_link_text) {
      var libsyn_nmp_retDownloadLinkText = libsyn_nmp_data.player_settings.player_use_download_link_text;
    }
    return {
      downloadLinkText: libsyn_nmp_retDownloadLinkText
    };
  }
  function getLibsynPostEpisodeSubtitle() {
    var libsyn_nmp_retEpisodeSubtitle = '';
    if (!!props.attributes.libsynPostEpisodeSubtitle) {
      var libsyn_nmp_retEpisodeSubtitle = props.attributes.libsynPostEpisodeSubtitle;
    }
    return {
      episodeSubtitle: libsyn_nmp_retEpisodeSubtitle
    };
  }
  function getLibsynPostEpisodePlayerCustomColor() {
    if (!!props.attributes.libsynPostEpisodePlayerCustomColor) {
      var libsyn_nmp_retPlayerCustomColor = props.attributes.libsynPostEpisodePlayerCustomColor;
    } else if (!!libsyn_nmp_data.player_settings && libsyn_nmp_data.player_settings.player_custom_color) {
      libsyn_nmp_retPlayerCustomColor = libsyn_nmp_data.player_settings.player_custom_color;
    } else {
      var libsyn_nmp_retPlayerCustomColor = '#6ba342';
    }
    return {
      color: libsyn_nmp_retPlayerCustomColor
    };
  }
  function getLibsynPostEpisodeItunesEpisodeNumber() {
    var libsyn_nmp_retEpisodeItunesEpisodeNumber = '';
    if (!!props.attributes.libsynPostEpisodeItunesEpisodeNumber) {
      var libsyn_nmp_retEpisodeItunesEpisodeNumber = props.attributes.libsynPostEpisodeItunesEpisodeNumber;
    }
    return {
      episodeItunesEpisodeNumber: libsyn_nmp_retEpisodeItunesEpisodeNumber
    };
  }
  function getLibsynPostEpisodeItunesSeasonNumber() {
    var libsyn_nmp_retEpisodeItunesSeasonNumber = '';
    if (!!props.attributes.libsynPostEpisodeItunesSeasonNumber) {
      var libsyn_nmp_retEpisodeItunesSeasonNumber = props.attributes.libsynPostEpisodeItunesSeasonNumber;
    }
    return {
      episodeItunesSeasonNumber: libsyn_nmp_retEpisodeItunesSeasonNumber
    };
  }
  function getLibsynPostEpisodeItunesEpisodeSummary() {
    var libsyn_nmp_retEpisodeItunesEpisodeSummary = '';
    if (!!props.attributes.libsynPostEpisodeItunesEpisodeSummary) {
      var libsyn_nmp_retEpisodeItunesEpisodeSummary = props.attributes.libsynPostEpisodeItunesEpisodeSummary;
    }
    return {
      episodeItunesEpisodeSummary: libsyn_nmp_retEpisodeItunesEpisodeSummary
    };
  }
  function getLibsynPostEpisodeItunesEpisodeTitle() {
    var libsyn_nmp_retEpisodeItunesEpisodeTitle = '';
    if (!!props.attributes.libsynPostEpisodeItunesEpisodeTitle) {
      var libsyn_nmp_retEpisodeItunesEpisodeTitle = props.attributes.libsynPostEpisodeItunesEpisodeTitle;
    }
    return {
      episodeItunesEpisodeTitle: libsyn_nmp_retEpisodeItunesEpisodeTitle
    };
  }
  function getLibsynPostEpisodeItunesEpisodeAuthor() {
    var libsyn_nmp_retEpisodeItunesEpisodeAuthor = '';
    if (!!props.attributes.libsynPostEpisodeItunesEpisodeAuthor) {
      var libsyn_nmp_retEpisodeItunesEpisodeAuthor = props.attributes.libsynPostEpisodeItunesEpisodeAuthor;
    }
    return {
      episodeItunesEpisodeAuthor: libsyn_nmp_retEpisodeItunesEpisodeAuthor
    };
  }
  function getLibsynNewMediaMedia() {
    var libsyn_nmp_retLibsynNewMediaMedia = '';
    if (!!props.attributes && !is_null(props.attributes.libsynNewMediaMedia) && props.attributes.libsynNewMediaMedia !== '') {
      libsyn_nmp_retLibsynNewMediaMedia = props.attributes.libsynNewMediaMedia;
    } else if (!is_null(libsyn_nmp_data.libsyn_new_media_media)) {
      props.attributes.libsynNewMediaMedia = libsyn_nmp_data.libsyn_new_media_media;
      libsyn_nmp_retLibsynNewMediaMedia = libsyn_nmp_data.libsyn_new_media_media;
    }
    return {
      newMediaMedia: libsyn_nmp_retLibsynNewMediaMedia
    };
  }
  function getLibsynNewMediaImage() {
    var libsyn_nmp_retLibsynNewMediaImage = '';
    if (!!props.attributes && !is_null(props.attributes.libsynNewMediaImage)) {
      libsyn_nmp_retLibsynNewMediaImage = props.attributes.libsynNewMediaImage;
    } else if (!is_null(libsyn_nmp_data.libsyn_new_media_image)) {
      props.attributes.libsynNewMediaImage = libsyn_nmp_data.libsyn_new_media_image;
      libsyn_nmp_retLibsynNewMediaImage = libsyn_nmp_data.libsyn_new_media_image;
    }
    return {
      newMediaImage: libsyn_nmp_retLibsynNewMediaImage
    };
  }
  function getLibsynNewMediaMediaReadonly() {
    return !!props.attributes.libsynNewMediaMedia ? 'readonly' : '';
  }
  function getLibsynNewMediaImageReadonly() {
    return !!props.attributes.libsynNewMediaImage ? 'readonly' : '';
  }
  function getLibsynDestinationsData() {
    if (!!props.attributes.libsynPostEpisodeAdvancedDestinationFormData) {
      var retLibsynDestinationsData = JSON.parse(props.attributes.libsynPostEpisodeAdvancedDestinationFormData);
    } else {
      var retLibsynDestinationsData = {};
      Object.keys(libsyn_nmp_data.destinations).map(key => {
        retLibsynDestinationsData[`libsyn-advanced-destination-checkbox-${libsyn_nmp_data.destinations[key].destination_id}`] = "checked";
        retLibsynDestinationsData[`set_release_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}-0`] = "checked";
        retLibsynDestinationsData[`set_release_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}-2`] = "";
        retLibsynDestinationsData[`release_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}`] = "";
        retLibsynDestinationsData[`release_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}_date`] = "";
        retLibsynDestinationsData[`release_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}_time_select_select-element`] = "12:00 AM";
        retLibsynDestinationsData[`libsyn-post-episode-advanced-destination-${libsyn_nmp_data.destinations[key].destination_id}-release-time`] = "12:00 AM";
        retLibsynDestinationsData[`set_expiration_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}-0`] = "checked";
        retLibsynDestinationsData[`set_expiration_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}-2`] = "";
        retLibsynDestinationsData[`expiration_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}`] = "";
        retLibsynDestinationsData[`expiration_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}_date`] = "";
        retLibsynDestinationsData[`expiration_scheduler_advanced_release_lc__${libsyn_nmp_data.destinations[key].destination_id}_time_select_select-element`] = "12:00 AM";
        retLibsynDestinationsData[`libsyn-post-episode-advanced-destination-${libsyn_nmp_data.destinations[key].destination_id}-expiration-time`] = "";
      });
    }
    return {
      value: retLibsynDestinationsData
    };
  }
  function getLibsynEpisodeShortcode() {
    if (!!props.attributes.llibsynEpisodeShortcode) {
      return props.attributes.libsynEpisodeShortcode;
    }
    return '';
  }
  function getLibsynShowId() {
    var retShowId = 0;
    if (!!props.attributes.libsynShowId) {
      var retShowId = props.attributes.libsynShowId;
      libsyn_nmp_data.show_id = retShowId;
    } else if (!!libsyn_nmp_data.show_id) {
      var retShowId = libsyn_nmp_data.show_id;
    }
    return retShowId;
  }
  function getLibsynShows() {
    var retShowsList = [];
    if (!!libsyn_nmp_data.shows) {
      var retShowsList = libsyn_nmp_data.shows;
    }
    return retShowsList;
  }
  function getLibsynShowIsPremium() {
    let working_shows = getLibsynShows();
    let working_showId = getLibsynShowId();
    if (!!working_shows && !is_null(working_showId) && !is_null(working_shows[working_showId])) {
      if (working_shows[working_showId].is_premium == true || working_shows[working_showId].is_premium == 'true') {
        return true;
      }
    }
    return false;
  }
  function getPlayerUseTheme() {
    var retUseTheme = '';
    if (!!props.attributes.libsynPostEpisodePlayerUseTheme) {
      var retUseTheme = props.attributes.libsynPostEpisodePlayerUseTheme;
    } else if (!!libsyn_nmp_data.player_settings.player_use_theme) {
      var retUseTheme = libsyn_nmp_data.player_settings.player_use_theme;
    }
    return retUseTheme;
  }
  function getPlayerUseThemeChecked(optionVal) {
    var retPlayerUseThemeChecked = false;
    if (!!props.attributes.libsynPostEpisodePlayerUseTheme) {
      if (props.attributes.libsynPostEpisodePlayerUseTheme == optionVal) retPlayerUseThemeChecked = true;
    } else if (!!libsyn_nmp_data.player_settings.player_use_theme) {
      if (libsyn_nmp_data.player_settings.player_use_theme == optionVal) retPlayerUseThemeChecked = true;
    }
    return retPlayerUseThemeChecked;
  }
  function getLibsynPostUpdateReleaseDate() {
    if (!!props.attributes.libsynPostUpdateReleaseDate && props.attributes.libsynPostUpdateReleaseDate === 'isLibsynUpdateReleaseDate') {
      var libsyn_nmp_retChecked = 'isLibsynUpdateReleaseDate';
    } else {
      var libsyn_nmp_retChecked = '';
    }
    return {
      isChecked: libsyn_nmp_retChecked
    };
  }

  /* TESTING */
  /* Helpful Vars */
  //var currentBlockCount = wp.data.select('core/editor').getBlockCount(); //gets the total number of blocks
  //var selectedBlockCount = wp.data.select('core/editor').getSelectedBlockCount(); //gets the total number of blocks (selected)
  //var getPermalink = wp.data.select('core/editor').getPermalink(); //gets the post page's permalink
  //var currentPost = wp.data.select('core/editor').getCurrentPost();
  //var postId = wp.data.select('core/editor').getCurrentPostId(); //current post id (if has been saved.. null if not)

  /* Prepare Return */
  if (!!currentEditor && !!currentEditor.getEditedPostAttribute('title')) {
    let working_current_post_title = currentEditor.getEditedPostAttribute('title');
    if (!!working_current_post_title && working_current_post_title !== 'Auto Draft') {
      libsyn_nmp_data.current_post_title = working_current_post_title;
    } else {
      libsyn_nmp_data.current_post_title = false;
    }
  } else {
    libsyn_nmp_data.current_post_title = false;
  }
  const workingBlock = currentBlockEditor.getSelectedBlock();
  if (typeof workingBlock !== 'undefined' && workingBlock !== null) {
    if (workingBlock.name === 'create-block/libsyn-podcasting-block') {
      //Only invoke this code while LPH Publishing Block is selected
      if (!!props.attributes && !!!props.attributes.libsynPostEpisode) {
        if (props.attributes.libsynPostEpisode !== '_isLibsynPost') {
          props.setAttributes({
            libsynPostEpisode: '_isLibsynPost'
          });
        }
      }
    }
  }

  /* Render JSX */
  return [(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "libsyn-input-element",
    id: "libsyn-post-update-release-date-wrapper"
  }, isUpdatePost() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColoredLine, {
    color: "#75ba35"
  }), isUpdatePost() && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LibsynPostUpdateReleaseDateCheckbox, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    id: "libsyn-post-episode",
    name: "libsyn-post-episode",
    type: "hidden",
    value: props.attributes.libsynPostEpisode
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "libsyn-input-element"
  }, !!getLibsynShows() && typeof Object.keys(getLibsynShows()).length !== 'undefined' && Object.keys(getLibsynShows()).length >= 2 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: "Select Show",
    value: getLibsynShowId(),
    options: Object.values(getLibsynShows()),
    onChange: setLibsynShowId,
    key: "libsyn-select-show",
    disabled: !!libsyn_nmp_data.libsyn_new_media_media || isUpdatePost()
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PlayerSettingsPanel, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(EpisodeMediaPanel, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(EpisodeDetailsPanel, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(EpisodeThumbnailPanel, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ItunesOptimizationTagsPanel, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AdvancedDestinationsPanel, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), !!!libsyn_nmp_data.current_post_title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
    status: "warning",
    isDismissible: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "You must specify a post title above.")), !!libsyn_nmp_data.error.media_show_mismatch && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
    status: "error",
    isDismissible: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Episode Media does not match the selected show.  Please choose Episode Media again.")), !!libsyn_nmp_data.error.destinations_data && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
    status: "error",
    isDismissible: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Unable to load your Libsyn Show's destinations data, please check the Libsyn Publisher Hub - Settings page and make sure the plugin has access to your Libsyn account.")), !!!libsyn_nmp_data && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
    status: "error",
    isDismissible: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "An Error Occured with Libsyn Publisher Hub, please visit the Libsyn Publisher Hub - Settings Page for more details.")), !!!libsyn_nmp_data.show_id && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
    status: "error",
    isDismissible: false
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "You must choose a show from the Libsyn Publisher Hub - Settings Page before creating a new episode.")), !!!props.attributes.libsynEpisodeEmbedurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Placeholder, {
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      "ng-repeat": "glyph in glyphs",
      id: "iconDemo-libsyn-hashtag",
      "mi-view-box": "0 0 1018 1024",
      viewBox: "0 0 1018 1024",
      width: "40"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("title", null, "Libsyn"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      "ng-repeat": "path in glyph.paths",
      "mi-d": "M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z",
      "mi-fill": "rgb(0, 0, 0)",
      "mi-stroke": "inherit",
      "mi-stroke-width": "",
      "mi-stroke-linecap": "",
      "mi-stroke-linejoin": "",
      "mi-stroke-miterlimit": "",
      "mi-opacity": "0.8",
      fill: "rgb(0, 0, 0)",
      stroke: "inherit",
      d: "M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z",
      opacity: "0.8"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      "ng-repeat": "path in glyph.paths",
      "mi-d": "M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z",
      "mi-fill": "rgb(0, 0, 0)",
      "mi-stroke": "inherit",
      "mi-stroke-width": "",
      "mi-stroke-linecap": "",
      "mi-stroke-linejoin": "",
      "mi-stroke-miterlimit": "",
      "mi-opacity": "0.85",
      fill: "rgb(0, 0, 0)",
      stroke: "inherit",
      d: "M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z",
      opacity: "0.85"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      "ng-repeat": "path in glyph.paths",
      "mi-d": "M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z",
      "mi-fill": "rgb(0, 0, 0)",
      "mi-stroke": "inherit",
      "mi-stroke-width": "",
      "mi-stroke-linecap": "",
      "mi-stroke-linejoin": "",
      "mi-stroke-miterlimit": "",
      "mi-opacity": "1",
      fill: "rgb(0, 0, 0)",
      stroke: "inherit",
      d: "M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z",
      opacity: "1"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      "ng-repeat": "path in glyph.paths",
      "mi-d": "M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z",
      "mi-fill": "rgb(0, 0, 0)",
      "mi-stroke": "inherit",
      "mi-stroke-width": "",
      "mi-stroke-linecap": "",
      "mi-stroke-linejoin": "",
      "mi-stroke-miterlimit": "",
      "mi-opacity": "0.7",
      fill: "rgb(0, 0, 0)",
      stroke: "inherit",
      d: "M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z",
      opacity: "0.7"
    })),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(" New Podcast Episode "),
    style: {
      fontSize: "2.4rem"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "libsyn-shortcode",
    style: {
      display: "none"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, null, !!props.attributes.libsynEpisodeShortcode ? props.attributes.libsynEpisodeShortcode : '')), !!props.attributes.libsynEpisodeEmbedurl && !!props.attributes.libsynEpisodeShortcode ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ServerSideRender, {
    block: "create-block/libsyn-podcasting-block-preview",
    attributes: {
      currentPostId: currentEditor.getCurrentPostId(),
      playerEmbedurl: props.attributes.libsynEpisodeEmbedurl,
      playerShortcode: props.attributes.libsynEpisodeShortcode,
      playerItemId: props.attributes.libsynItemId
    }
  }) : '')];
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./save */ "./src/save.js");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('create-block/libsyn-podcasting-block', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Libsyn Publisher Hub'),
  // Block title.
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    "ng-repeat": "glyph in glyphs",
    id: "iconDemo-libsyn-hashtag",
    "mi-view-box": "0 0 1018 1024",
    viewBox: "0 0 1018 1024",
    width: "100%",
    height: "100%"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("title", null, "Libsyn"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    "ng-repeat": "path in glyph.paths",
    "mi-d": "M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z",
    "mi-fill": "rgb(0, 0, 0)",
    "mi-stroke": "inherit",
    "mi-stroke-width": "",
    "mi-stroke-linecap": "",
    "mi-stroke-linejoin": "",
    "mi-stroke-miterlimit": "",
    "mi-opacity": "0.8",
    fill: "rgb(0, 0, 0)",
    stroke: "inherit",
    d: "M537.888 9.382h-176.491c0 0-38.662 579.141 636.554 569.113v-154.085c0 0-466.55 46.944-460.063-415.028z",
    opacity: "0.8"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    "ng-repeat": "path in glyph.paths",
    "mi-d": "M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z",
    "mi-fill": "rgb(0, 0, 0)",
    "mi-stroke": "inherit",
    "mi-stroke-width": "",
    "mi-stroke-linecap": "",
    "mi-stroke-linejoin": "",
    "mi-stroke-miterlimit": "",
    "mi-opacity": "0.85",
    fill: "rgb(0, 0, 0)",
    stroke: "inherit",
    d: "M997.951 315.131v-167.176c0 0-897.726-116.093-988.569 856.286h195.968c0 0 15.926-751.076 792.602-689.11z",
    opacity: "0.85"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    "ng-repeat": "path in glyph.paths",
    "mi-d": "M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z",
    "mi-fill": "rgb(0, 0, 0)",
    "mi-stroke": "inherit",
    "mi-stroke-width": "",
    "mi-stroke-linecap": "",
    "mi-stroke-linejoin": "",
    "mi-stroke-miterlimit": "",
    "mi-opacity": "1",
    fill: "rgb(0, 0, 0)",
    stroke: "inherit",
    d: "M207.063 9.382h-180.532c0 0-67.902 860.969 971.419 850.489v-170.825c0 0-814.683 59.911-790.887-679.665z",
    opacity: "1"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    "ng-repeat": "path in glyph.paths",
    "mi-d": "M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z",
    "mi-fill": "rgb(0, 0, 0)",
    "mi-stroke": "inherit",
    "mi-stroke-width": "",
    "mi-stroke-linecap": "",
    "mi-stroke-linejoin": "",
    "mi-stroke-miterlimit": "",
    "mi-opacity": "0.7",
    fill: "rgb(0, 0, 0)",
    stroke: "inherit",
    d: "M532.651 1004.241h-182.278c52.865-683.352 647.578-579.831 647.578-579.831v154.085c-505.597-57.881-465.299 425.746-465.299 425.746z",
    opacity: "0.7"
  })),
  // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'embed',
  // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Publish a Podcast Episode'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Libsyn Publisher Hub'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('libsyn'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('publish'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('episode'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('podcast'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('media'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('audio'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('embed')],
  transforms: {
    //testing
    from: [{
      type: 'shortcode',
      // Shortcode tag can also be an array of shortcode aliases
      tag: 'podcast',
      attributes: {
        // An attribute can be source from a tag attribute in the shortcode content
        url: {
          type: 'string',
          source: 'attribute',
          attribute: 'src',
          selector: 'iframe'
        },
        // An attribute can be source from the shortcode attributes
        align: {
          type: 'string',
          shortcode: _ref => {
            let {
              named: {
                align = 'alignnone'
              }
            } = _ref;
            return align.replace('align', '');
          }
        }
      }
    }]
  },
  html: false,
  // Remove support for an HTML mode.
  multiple: false,
  // Use the block just once per post
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
    libsynPostEpisodeAdvancedDestinationFormDataInputEnabled: {
      type: 'boolean',
      source: 'meta',
      meta: 'libsyn-post-episode-advanced-destination-form-data-input-enabled',
      selector: 'libsyn-post-episode-advanced-destination-form-data-input-enabled',
      default: false
    },
    libsynPostEpisodeSimpleDownload: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-simple-download',
      selector: 'libsyn-post-episode-simple-download',
      default: 'available'
    },
    libsynEpisodeShortcode: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-episode-shortcode',
      selector: 'libsyn-episode-shortcode',
      default: ''
    },
    libsynEpisodeEmbedurl: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-episode-embedurl',
      selector: 'libsyn-episode-embedurl',
      default: ''
    },
    libsynPostEpisodePlayerUseTheme: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_use_theme',
      selector: 'libsyn-post-episode-player_use_theme',
      default: libsyn_nmp_data.player_settings.player_use_theme
    },
    libsynPostEpisodePlayerUseThumbnail: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_use_thumbnail',
      selector: 'libsyn-post-episode-player_use_thumbnail',
      default: libsyn_nmp_data.player_settings.player_use_thumbnail
    },
    libsynPostEpisodePlayerHeight: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_height',
      selector: 'libsyn-post-episode-player_height',
      default: libsyn_nmp_data.player_settings.player_height
    },
    libsynPostEpisodePlayerWidth: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_width',
      selector: 'libsyn-post-episode-player_width',
      default: libsyn_nmp_data.player_settings.player_width
    },
    libsynPostEpisodePlayerPlacement: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_placement',
      selector: 'libsyn-post-episode-player_placement',
      default: libsyn_nmp_data.player_settings.player_placement
    },
    libsynPostEpisodePlayerUseDownloadLink: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_use_download_link',
      selector: 'libsyn-post-episode-player_use_download_link',
      default: libsyn_nmp_data.player_settings.player_use_download_link
    },
    libsynPostEpisodePlayerUseDownloadLinkText: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_use_download_link_text',
      selector: 'libsyn-post-episode-player_use_download_link_text',
      default: libsyn_nmp_data.player_settings.player_use_download_link_text
    },
    libsynPostEpisodePlayerCustomColor: {
      type: 'string',
      source: 'meta',
      meta: 'libsyn-post-episode-player_custom_color',
      selector: 'libsyn-post-episode-player_custom_color',
      default: libsyn_nmp_data.player_settings.player_custom_color
    },
    libsynPostEpisodePremiumState: {
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
    libsynUploadMediaPreviewUrl: {
      //TODO: handle getting the inner html on focus out (see below) and save it to this attribute
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
  edit: _edit__WEBPACK_IMPORTED_MODULE_4__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_5__["default"]
});

//Player Preview
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('create-block/libsyn-podcasting-block-preview', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Libsyn Publisher Hub - Preview'),
  html: false,
  // Remove support for an HTML mode.
  multiple: false,
  // Use the block just once per post
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
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


//Constants
const {
  serverSideRender: ServerSideRender
} = wp;
const {
  RawHTML
} = wp.element;
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
function save(props) {
  if (!!!props.attributes.libsynEpisodeShortcode) {
    //handle ajax check for attributes
    if (!!libsyn_nmp_data.admin_ajax_url && !!libsyn_nmp_data.post_id) {
      let libsyn_admin_ajax_url = libsyn_nmp_data.admin_ajax_url + '?action=libsyn_player_shortcode&libsyn_player_shortcode=1&post_id=' + libsyn_nmp_data.post_id;
      fetch(libsyn_admin_ajax_url).then(res => res.json()).then(result => {
        props.attributes.libsynEpisodeShortcode = result;
      }, error => {
        //do nothing
      });
    }
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "libsyn-shortcode",
    style: {
      display: "block"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RawHTML, null, !!props.attributes.libsynEpisodeShortcode && !!props.attributes.libsynEpisodeEmbedurl ? props.attributes.libsynEpisodeShortcode : '')));
}

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["lodash"];

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = window["moment"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklibsyn_podcasting_block"] = self["webpackChunklibsyn_podcasting_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map