import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';
import ChartTooltip from './Tooltip';

const BarChartComponent = (
  {
    data, dataKey, axisKey, layout = 'horizontal', valueUnit,
    color, strokeColor, height = 190, displayAxisLine, displayTickLine, tickWidth, barSize,
  }) => {
  const axis = layout === 'horizontal' ?
    [
      <YAxis key={0} stroke={strokeColor} type="number" padding={{left: 10, right: 10}} axisLine={!!displayAxisLine} tickLine={!!displayTickLine} width={tickWidth}/>,
      <XAxis key={1} stroke={strokeColor} type="category" dataKey={'name'} axisLine={!!displayAxisLine} tickLine={!!displayTickLine}/>

    ] :
    [
      <XAxis key={0} stroke={strokeColor} type="number" padding={{left: 10, right: 10}} axisLine={!!displayAxisLine} tickLine={!!displayTickLine}/>,
      <YAxis key={1} stroke={strokeColor} type="category" dataKey={axisKey} axisLine={!!displayAxisLine} tickLine={!!displayTickLine} width={tickWidth}/>
    ];

  return (
    <ResponsiveContainer  width="100%" height={height}>
      <BarChart
        data={data}
        layout={layout}
      >
        { axis }
        <Tooltip cursor={false} content={<ChartTooltip valueUnit={valueUnit} />}/>
        <Bar dataKey={dataKey} fill={color} barSize={barSize}>
          {/*<LabelList dataKey="value" position="right" content={renderCustomizedLabel}/>*/}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
