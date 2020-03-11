import React from 'react';
import Paper from 'material-ui/Paper';
import CircularSpinner from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';

import './Tooltip.css';

const LineChartTooltip = ({ payload, valueUnit }) => {
  return (
    payload && payload[0] ?
      <Paper>
        <Subheader className="LineChartTooltipText"><b>{payload[0].payload.tooltipLabel || payload[0].payload.name}</b>:&nbsp;&nbsp; {payload[0].payload.value} {valueUnit}</Subheader>
      </Paper> : <CircularSpinner />
  );
};

export default LineChartTooltip;
