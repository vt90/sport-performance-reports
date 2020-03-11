import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ChartTooltip from './Tooltip';

class AreaChartComponent extends Component {
  render() {
    const { data, dataValue, xAxisKey, color, height = 190, colorId, valueUnit } = this.props;

    return data && data.length ? (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`color${colorId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={1}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.5}/>
            </linearGradient>
          </defs>
          <Area
            dataKey={dataValue}
            dot={{ stroke: color, strokeWidth: 2, r: 2, fillOpacity: 1 }}
            type='monotone'
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#color${colorId})`}
          />
          <XAxis
            dataKey={xAxisKey}
           // padding={{left: 10, right: 10}}
          />
          <YAxis/>
          <Tooltip content={<ChartTooltip valueUnit={valueUnit} />} cursor={false}/>
        </AreaChart>
      </ResponsiveContainer>
    ) : (
        <Grid>
          <Row center="xs">
            <Col xs={11}>
              <br />
              <CircularProgress color={color} size={50}/>
              <br />
            </Col>
          </Row>
        </Grid>
      );
  }
}

AreaChartComponent.propTypes = {
  data: PropTypes.any.isRequired,
  dataValue: PropTypes.string.isRequired,
  xAxisKey: PropTypes.string.isRequired,
  color: PropTypes.any.isRequired,
  height: PropTypes.number,
};

export default AreaChartComponent;
