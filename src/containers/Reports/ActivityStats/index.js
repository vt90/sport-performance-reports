import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { Row, Col } from 'react-flexbox-grid';
import meanBy from 'lodash/meanBy';
import sumBy from 'lodash/sumBy';
import moment from "moment/moment";
import './index.css';

const ActivityStats = (props) => {
  const {
    dailyReports = [],
    weeklyReports = [],
    monthlyReports = [],
    startDate,
    endDate,
  } = props;

  const isIntervalGreatherThenOnMonth = moment(endDate).diff(moment(startDate), 'months');

  const getDisplayValue = (number) => number % 10 === 0 ? number : number.toFixed(1);
  const totalActivities = sumBy(monthlyReports, (mounth) => mounth.count);
  const avgDayActivities = getDisplayValue(meanBy(dailyReports, (day) => day.count));
  const avgWeekActivities = getDisplayValue(meanBy(weeklyReports, (week) => week.count));
  const avgMonthActivities = getDisplayValue(meanBy(monthlyReports, (mount) => mount.count));

  return (
    <Row className="Activity-stats" middle={'xs'}>
      <Col xs={4} className="Action-stats-item">
        <h2>{totalActivities}</h2>
        <p>Total activities</p>
      </Col>

      { !isIntervalGreatherThenOnMonth ? (
        <Col xs={4} className="Action-stats-item Action-stats-border">
          <h2>{avgDayActivities}</h2>
          <p>Avg. day activities </p>
        </Col>
      ) : null }

      <Col xs={4} className="Action-stats-item Action-stats-border">
        <h2>{avgWeekActivities}</h2>
        <p>Avg. week activities</p>
      </Col>

      { isIntervalGreatherThenOnMonth ? (
        <Col xs={4} className="Action-stats-item">
          <h2>{avgMonthActivities}</h2>
          <p>Avg. month activities</p>
        </Col>
      ) : null }
    </Row>
  )
};

export default muiThemeable()(ActivityStats);
