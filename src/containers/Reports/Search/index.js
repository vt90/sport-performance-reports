import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import moment from "moment/moment";

import './index.css';

class ReportsSearch extends Component {

  onSearchChange = ({
    startDate = this.props.startDate,
    endDate = this.props.endDate,
    activityType = this.props.activityType
  }) => {
    this.props.onSearchCriteriaChange({ startDate, endDate, activityType: activityType !== 'all' ? activityType : null });
  };

  onDateChange = (dateValue, dateName) => {
    const { startDate, endDate } = this.props;

    const newDates = { startDate, endDate, [dateName]: moment(dateValue) };

    this.onSearchChange(newDates);
  };

  onChangeActivity = (value) => {
    this.onSearchChange({ activityType: value });
  };

  render() {
    const { startDate, endDate, minDate, maxDate, activityType, activitiesForSelect } = this.props;

    const activitySelectMenuItems = activitiesForSelect.map((activity, index) => (
      <MenuItem
        key={index}
        value={activity.originalName}
        primaryText={
          `${activity.name.charAt(0).toUpperCase()}${activity.name.substr(1, activity.name.length)}`
        }
      />
    ));

    return (
      <div className="ReportsSearchHeader">
        <Grid>
          <Row around="xs" middle="xs">
            <Col xs={12} md={9}>
              <p>
                Select activity type to be displayed. Bear in mind the results are mocks just to display values on the charts.
              </p>

              <p>
                Particular activities may have other chart types
              </p>
            </Col>
            <Col xs={12} sm={12} md={3}>
              <SelectField
                className="ReportsActivityPicker"
                floatingLabelText="Type of activity"
                value={activityType}
                onChange={(event, index, value) => this.onChangeActivity(value)}
                underlineShow={false}
              >
                <MenuItem value={'all'} primaryText="All" />
                { activitySelectMenuItems }
              </SelectField>
            </Col>

            {/*<Col xs={12} sm={6} md={3}>*/}
            {/*  {*/}
            {/*    startDate ?*/}
            {/*      (*/}
            {/*        <DatePicker*/}
            {/*          className="ReportsDatePicker"*/}
            {/*          inputStyle={{color: 'rgba(255,255,255,0.8)'}}*/}
            {/*          floatingLabelText="Starting From"*/}
            {/*          minDate={minDate.toDate()}*/}
            {/*          maxDate={maxDate.toDate()}*/}
            {/*          defaultDate={startDate.toDate()}*/}
            {/*          onChange={(event, date) => this.onDateChange(date, 'startDate')}*/}
            {/*          underlineShow={false}*/}
            {/*        />*/}
            {/*      ) : null*/}
            {/*  }*/}
            {/*</Col>*/}

            {/*<Col xs={12} sm={6} md={3}>*/}
            {/*  {*/}
            {/*    endDate ?*/}
            {/*      (*/}
            {/*        <DatePicker*/}
            {/*          className="ReportsDatePicker"*/}
            {/*          inputStyle={{color: 'rgba(255,255,255,0.8'}}*/}
            {/*          floatingLabelText="To"*/}
            {/*          minDate={minDate.toDate()}*/}
            {/*          maxDate={maxDate.toDate()}*/}
            {/*          defaultDate={endDate.toDate()}*/}
            {/*          onChange={(event, date) => this.onDateChange(date, 'endDate')}*/}
            {/*          underlineShow={false}*/}
            {/*        />*/}
            {/*      ) : null*/}
            {/*  }*/}
            {/*</Col>*/}
          </Row>
        </Grid>
      </div>
    );
  }
}

ReportsSearch.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  onSearchCriteriaChange: PropTypes.func.isRequired,
  activityType: PropTypes.any,
  activitiesForSelect: PropTypes.array,
};

export default ReportsSearch;
