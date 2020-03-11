import React from 'react';
import Paper from 'material-ui/Paper';
import CircularSpinner from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';

import './lineChartTooltip.css';

const LineChartTooltip = ({ payload }) => {
  return (
    payload && payload[0] ?
      <Paper>
        <Subheader className="LineChartTooltipText"><b>{payload[0].payload.tooltipLabel}</b>: {payload[0].payload.value}</Subheader>
      </Paper> : <CircularSpinner />
  );
};

export default LineChartTooltip;
