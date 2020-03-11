import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CircularProgress from 'material-ui/CircularProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ChartTooltip from './Tooltip';

class AreaChartComponent extends Component {
  render() {
    const {
      data, dataValue, xAxisKey, color, height = 190, displayAxisLine, displayTickLine, strokeColor = '#FFFFFF', valueUnit,
    } = this.props;

    return data && data.length ? (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <Line
            dataKey={dataValue}
            type='monotone'
            stroke={color}
            strokeWidth={5}
          />
          <XAxis
            dataKey={xAxisKey}
            stroke={strokeColor}
            axisLine={!!displayAxisLine}
            tickLine={!!displayTickLine}
            padding={{left: 3, right: 3}}
          />
          <YAxis
            stroke={strokeColor}
            axisLine={!!displayAxisLine}
            tickLine={!!displayTickLine}
            padding={{top: 3, bottom: 3}}
          />
          <Tooltip content={<ChartTooltip valueUnit={valueUnit} />} cursor={false}/>
        </LineChart>
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
