import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import PieChart from '../../../components/Charts/Pie';
import sumBy from 'lodash/sumBy';

import Avatar from 'material-ui/Avatar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';
import './index.css';

class ActivityCount extends Component {
  render() {
    const { activityCount = [], muiTheme: { palette } } = this.props;

    const availableActivitiesForPieChart = activityCount.map((activity, index) => ({
      name: activity.name,
      value: activity.count,
      color: palette[`primary${(index + 1) % 9}Color`],
    }));

    const total = sumBy(activityCount, (activity) => activity.count);

    const tableRows = activityCount.map((activity, index) => (
      <TableRow key={index} hoverable={true}>
        <TableRowColumn>
          <div className="flex align-center" style={{justifyContent: 'flex-start'}}>
            <Avatar
              className="LegendBullet"
              backgroundColor={palette[`primary${(index + 1)% 9}Color`]}
              size={14}
            >
            </Avatar>
            &nbsp;
            <p>{ activity.name }</p>
          </div>
        </TableRowColumn>
        <TableRowColumn className="text-center">{ activity.count } times</TableRowColumn>
      </TableRow>
    ));

    return (
      <Grid>
        <Row center="xs" middle="xs">
          <Col xs={12} sm={5} md={12}>
            <div>
              <PieChart data={availableActivitiesForPieChart} height={220} valueUnit={'times'}/>
            </div>
          </Col>

          <Col xs={12} sm={7} md={12}>
            <Table>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>
                    Activity
                  </TableHeaderColumn>
                  <TableHeaderColumn className="text-center">Count</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                { tableRows }
                <TableRow>
                  <TableRowColumn>
                    <b>Total</b>
                  </TableRowColumn>
                  <TableRowColumn className="text-center"><b>{ total } times</b></TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ActivityCount.propTypes = {
  activityCount: PropTypes.any,
};

export default muiThemeable()(ActivityCount);
