import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AreaChart from '../../../components/Charts/Area';
import { Row, Col } from 'react-flexbox-grid';

import muiThemeable from 'material-ui/styles/muiThemeable';
import moment from 'moment';
import './index.css';

class ActivityTimeReports extends Component {
  render() {
    const {
      dailyReports = [],
      weeklyReports = [],
      monthlyReports = [],
      startDate,
      endDate,
      muiTheme: { palette }
    } = this.props;

    const isIntervalGreatherThenOnMonth = moment(endDate).diff(moment(startDate), 'months');

    const dailYReportsChartData = dailyReports.map((report, index) => ({
      name: `${moment(report.day).format('DD')} ${moment(report.day).format('MMMM').substr(0,3)}`,
      value: report.count,
      tooltipLabel: `${report.day}`,
    }));

    const weeklyReportsChartData = weeklyReports.map((report, index) => ({
      name: index + 1,
      value: report.count,
      tooltipLabel: `Week no. ${index + 1}`,
    }));

    const monthlyReportsChartData = monthlyReports.map((report) => ({
      name: `${report.month.substr(0,3)}`,
      value: report.count,
      tooltipLabel: `${report.month}`,
    }));

    return (
      <div className="Activity-time-reports">
        <Row center="xs">
          <Col xs={12} sm={10}>
            <div>
              { !isIntervalGreatherThenOnMonth ? (
                <div>
                  <br />
                  <AreaChart data={dailYReportsChartData} dataValue={'value'} xAxisKey={'name'} color={palette.primary3Color} height={190} colorId={3} valueUnit={'times'}/>
                  <div className="ReportsSearchHeader">
                    <p className="text-center">Daily summary</p>
                  </div>
                </div>
              ) : null }

              <br />
              <AreaChart data={weeklyReportsChartData} dataValue={'value'} xAxisKey={'name'} color={palette.primary1Color} height={190} colorId={1} valueUnit={'times'}/>
              <div className="ReportsSearchHeader">
                <p className="text-center">Weekly summary</p>
              </div>

              { isIntervalGreatherThenOnMonth ? (
                <div>
                  <br />
                  <AreaChart data={monthlyReportsChartData} dataValue={'value'} xAxisKey={'name'} color={palette.primary2Color} height={190} colorId={2} valueUnit={'times'}/>
                  <div className="ReportsSearchHeader">
                    <p className="text-center">Monthly summary</p>
                  </div>
                </div>
              ) : null}


            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ActivityTimeReports.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  dailyReports: PropTypes.any,
  weeklyReports: PropTypes.any,
  monthlyReports: PropTypes.any,
  muiTheme: PropTypes.any,
};


const withTheme = muiThemeable()(ActivityTimeReports);

export default withTheme;
