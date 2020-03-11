import React, { Component } from 'react';
import Proptypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../../actions/reports';

import ActivityTimeReports from './ActivityTimeReports';
import ActivityStats from './ActivityStats';
import ActivityCount from './ActivityCount';
import Calendar from './Calendar';
import DurationReports from './DurationReports';
import SessionTimesReport from './SessionTimes';
import ReportsSearch from './Search';
import EnergyReports from './EnergyReports';

import { Grid, Row, Col } from 'react-flexbox-grid';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import './index.css';

class Reports extends Component {
  componentDidMount() {
    const {
      checkUser,
      findReports,
      match: { params: { userId } },
    } = this.props;

    checkUser(userId)
      .then((data) => {
        if (data && data.startDate && data.endDate) {
          const dates = this.getInitialInterval(data.startDate, data.endDate);
          findReports({ ...dates, userId });
        }
      });
  }

  componentWillReceiveProps = (newProps) => {
    const {
      checkUser,
      findReports,
      match: { params: { userId } }
    } = this.props;

    const newUserId = newProps.match.params.userId;

    if (userId !== newUserId) {
      checkUser(newUserId)
        .then((data) => {
          if (data && data.startDate && data.endDate) {
            const dates = this.getInitialInterval(data.startDate, data.endDate);
            findReports({ ...dates, userId });
          }
        });
    }
  };

  getInitialInterval = (sDate, eDate) => {
    const endDate = moment(eDate);
    let startDate = moment(sDate);

    if (endDate.diff(startDate, 'months') > 12) {
      startDate = moment(endDate).subtract(12, 'months');
    }

    return {
      startDate,
      endDate,
    }
  };

  onSearchChange = (values) => {
    const {
      changeSearchCriteria,
      match: { params: { userId } },
    } = this.props;

    changeSearchCriteria({ ...values, userId });
  };

  render() {
    const {
      isLoading,
      startDate,
      endDate,
      minStartDate,
      minEndDate,
      activityType,
      availableActivities,

      calendarReports,
      dailyReports,
      weeklyReports,
      monthlyReports,
      dailyEnergyRecords,
      weeklyEnergyRecords,
      monthlyEnergyRecords,
      activitiesCount,
      durationStats,
      sessionTimes,
      energyUnit,

      match: { params: { userId } },
    } = this.props;

    const headerStyles = {};

    if (!(dailyReports || weeklyReports || monthlyReports)) {
      headerStyles.minHeight = '100vh';
      headerStyles.display = 'flex';
    }

    const activityTimeReports = dailyReports ? (
      <ActivityTimeReports
        startDate={startDate}
        endDate={endDate}
        dailyReports={dailyReports}
        weeklyReports={weeklyReports}
        monthlyReports={monthlyReports}
      />
    ) : (
      <div className="Loading-Container">
        <CircularProgress />
        <h4>Generating charts</h4>
      </div>
    );

    const energyReports = activityType !== 'all' && dailyEnergyRecords ? (
      <Paper className="PieChartPaper Energy-Reports" zDepth={3}>
        <div>
          <p className="text-center"><b>Energy reports</b></p>
        </div>
        <EnergyReports
          startDate={startDate}
          endDate={endDate}
          dailyEnergyRecords={dailyEnergyRecords}
          weeklyEnergyRecords={weeklyEnergyRecords}
          monthlyEnergyRecords={monthlyEnergyRecords}
          energyUnit={energyUnit}
        />
        <br />
      </Paper>
    ) : null;

    const activityStats = dailyReports ? (
      <Paper className="PieChartPaper" zDepth={5}>
        <ActivityStats
          startDate={startDate}
          endDate={endDate}
          dailyReports={dailyReports}
          weeklyReports={weeklyReports}
          monthlyReports={monthlyReports}
        />
      </Paper>
    ) : null;

    const activityCountReports = activitiesCount ? (
      <Paper className="PieChartPaper ActivityCount" zDepth={3}>
        <div>
          <p className="text-center"><b>Activities by type</b></p>
        </div>
        <ActivityCount
          activityCount={activitiesCount}
        />
      </Paper>
    ) : null;

    const duratinReports = durationStats ? (
      <Paper className="PieChartPaper DurationStats" zDepth={3}>
        <div>
          <p className="text-center"><b>Workout times</b></p>
        </div>
        <DurationReports
          durationStats={durationStats}
          label="Minutes"
        />
      </Paper>
    ) : null;

    const sessionTimesReports = sessionTimes ? (
      <Paper className="PieChartPaper SessionTimes" zDepth={3}>
        <div>
          <p className="text-center"><b>Session times</b></p>
        </div>
        <SessionTimesReport
          sessionTimes={sessionTimes}
          label="Minutes"
        />
      </Paper>
    ) : null;

    const reportsPage = isLoading && isLoading.checkUser ?
      <Grid className="Loading-Container">
        <Row center="xs" middle="xs">
          <Col xs={11} sm={8}>
            <CircularProgress />
            <h4>Loading reports for <b>{ userId }</b></h4>
          </Col>
        </Row>
      </Grid> :
      <div>
        <ReportsSearch
          startDate={startDate}
          endDate={endDate}
          minDate={minStartDate}
          maxDate={minEndDate}
          activityType={activityType}
          activitiesForSelect={availableActivities}
          onSearchCriteriaChange={this.onSearchChange}
          isLoading={isLoading.findUserReports}
        />

        { activityTimeReports }
      </div>;

    return (
      <div>
        <div className="ReportsHeader" style={headerStyles}>
          { reportsPage }
        </div>

        <Grid>
          <Row center="xs">
            <Col xs={12} sm={11} md={12} lg={10}>
              { activityStats }
              <br />
            </Col>

            {
              activityType === 'all' ?
                <Col xs={12} sm={11} md={6} lg={5}>
                  { activityCountReports }
                  <br />
                </Col> :
                <Col xs={12} sm={11} md={12} lg={10}>
                  { energyReports }
                  <br />
                </Col>
            }

            <br />

            <Col xs={12} sm={11} md={ activityType === 'all' ? 6 : 12} lg={ activityType === 'all' ? 5 : 10}>
              <Row>
                <Col xs={12} md={activityType === 'all' ? 12 : 6}>
                  { duratinReports }
                  <br />
                </Col>

                <Col xs={12} md={activityType === 'all' ? 12 : 6}>
                  { sessionTimesReports }
                </Col>
              </Row>

            </Col>

            <Col xs={12} sm={11}>

            </Col>
          </Row>
        </Grid>

        <br />
        {
          calendarReports ?
            <Calendar
              data={calendarReports}
            /> : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.reports.isLoading,
  startDate: state.reports.startDate,
  endDate: state.reports.endDate,
  availableActivities: state.reports.availableActivities,
  activityType: state.reports.activityType,
  minStartDate: state.reports.minStartDate,
  minEndDate: state.reports.minEndDate,

  calendarReports: state.reports.calendarReports,
  dailyReports: state.reports.dailyReports,
  weeklyReports: state.reports.weeklyReports,
  monthlyReports: state.reports.monthlyReports,
  dailyEnergyRecords: state.reports.dailyEnergyRecords,
  weeklyEnergyRecords: state.reports.weeklyEnergyRecords,
  monthlyEnergyRecords: state.reports.monthlyEnergyRecords,
  activitiesCount: state.reports.activitiesCount,
  durationStats: state.reports.durationStats,
  sessionTimes: state.reports.sessionTimes,
  energyUnit: state.reports.energyUnit,
});

const mapDispatchToProps = (dispatch) => ({
  checkUser: (userId) => dispatch(actions.checkUser(userId)),
  changeSearchCriteria: (data) => dispatch(actions.changeSearchCriteria(data)),
  findReports: (data) => dispatch(actions.findReports(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Reports);

Reports.propTypes = {
  // Store
  isLoading: Proptypes.object,
  startDate: Proptypes.any,
  endDate: Proptypes.any,
  minStartDate: Proptypes.any,
  minEndDate: Proptypes.any,
  activityType: Proptypes.any,
  availableActivities: Proptypes.any,
  calendarReports: Proptypes.any,
  dailyReports: Proptypes.any,
  weeklyReports: Proptypes.any,
  monthlyReports: Proptypes.any,
  dailyEnergyRecords: Proptypes.any,
  weeklyEnergyRecords: Proptypes.any,
  monthlyEnergyRecords: Proptypes.any,
  activitiesCount: Proptypes.any,
  durationStats: Proptypes.any,
  sessionTimes: Proptypes.any,
  energyUnit: Proptypes.any,

  // Actions
  checkUser: Proptypes.func,
  changeSearchCriteria: Proptypes.func,
  findReports: Proptypes.func,

  // Extras
  match: Proptypes.any,
};

export default withConnect;


