import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BarChart from '../../../components/Charts/Bar';

class SessionTimesReport extends Component {
  render() {
    const { sessionTimes = {}, label = '' } = this.props;

    return (
      <div>
        <BarChart
          data={sessionTimes}
          valueUnit={'times'}
          dataKey={'value'}
          axisKey={'name'}
          tickWidth={30}
          color={'#FFFFFF'}
          strokeColor={'#FFFFFF'}
          layout={'horizontal'}
          barSize={30}
        />
        <p className="text-center no-margin-top">{ label }</p>
      </div>
    );
  }
}

SessionTimesReport.propTypes = {
  durationStats: PropTypes.any,
};

export default SessionTimesReport;
