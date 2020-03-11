import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import './index.css';
import ChartTooltip from './Tooltip';

const PieChartComponent = ({ data = [], height = 250, valueUnit }) => {
  return (
    <ResponsiveContainer height={height}>
      <PieChart onMouseEnter={this.onPieEnter}>
        <Pie data={data} dataKey={'value'} >
          {
            data.map((entry, index) => <Cell key={index} fill={entry.color}/>)
          }
        </Pie>
        <Tooltip content={<ChartTooltip valueUnit={valueUnit} />} cursor={false}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
