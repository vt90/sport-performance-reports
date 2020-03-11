import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BarChart from '../../../components/Charts/Bar';

const DURATION_REPORTS = {
  averageDuration: '  Average',
  minDuration: '  Shortest',
  maxDuration: 'Longest',
};

class DurationReports extends Component {
  render() {
    const { durationStats = {}, label = '' } = this.props;

    const data = durationStats.map((stat) => ({
      name: DURATION_REPORTS[stat.name],
      value: Math.floor(stat.value),
    }));

    return (
      <div>
        <BarChart
          data={data}
          valueUnit={'minutes'}
          dataKey={'value'}
          axisKey={'name'}
          tickWidth={70}
          color={'#FFFFFF'}
          strokeColor={'#FFFFFF'}
          barSize={9}
          layout={'vertical'}
        />
        <p className="text-center no-margin-top">{ label }</p>
      </div>
    );
  }
}

DurationReports.propTypes = {
  durationStats: PropTypes.any,
};

export default DurationReports;
