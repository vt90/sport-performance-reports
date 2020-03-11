import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineChart from '../../../components/Charts/Line';
import { Row, Col } from 'react-flexbox-grid';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import muiThemeable from 'material-ui/styles/muiThemeable';
import moment from 'moment';
import maxBy from 'lodash/maxBy';
import meanBy from 'lodash/meanBy';
import minBy from 'lodash/minBy';
import './index.css';

class EnergyReports extends Component {
  render() {
    const {
      dailyEnergyRecords = [],
      weeklyEnergyRecords = [],
      monthlyEnergyRecords = [],
      startDate,
      endDate,
      energyUnit,
    } = this.props;

    const getDisplayValue = (number = 0) => number % 10 === 0 ? number : number.toFixed(1);

    const isIntervalGreatherThenOnMonth = moment(endDate).diff(moment(startDate), 'months');

    const dailyEnergyRecordsChartData = dailyEnergyRecords.map((report) => ({
      name: `${moment(report.day).format('DD')} ${moment(report.day).format('MMMM').substr(0,3)}`,
      value: report.count,
      tooltipLabel: `${report.day}`,
    }));


    const daylyStats = {};
    const weeklyStats = {};
    const monthlyStats = {};

    if (!isIntervalGreatherThenOnMonth) {
      const filteredDayArray = dailyEnergyRecords.filter((data) => data.count);
      const min = minBy(filteredDayArray, (data) => data.count);
      const max = maxBy(filteredDayArray, (data) => data.count);
      daylyStats.avg = getDisplayValue(meanBy(filteredDayArray, (data) => data.count));
      daylyStats.max = getDisplayValue(max ? max.count : 0);
      daylyStats.min = getDisplayValue(min ? min.count : 0);
    }
    else {
      const filteredMonthArray = monthlyEnergyRecords.filter((data) => data.count);
      const min = minBy(filteredMonthArray, (data) => data.count);
      const max = maxBy(filteredMonthArray, (data) => data.count);
      monthlyStats.avg = getDisplayValue(meanBy(filteredMonthArray, (data) => data.count));
      monthlyStats.max = getDisplayValue(max ? max.count : 0);
      monthlyStats.min = getDisplayValue(min ? min.count : 0);
    }

    const filteredWeekArray = weeklyEnergyRecords.filter((data) => data.count);
    const min = minBy(filteredWeekArray, (data) => data.count);
    const max = maxBy(filteredWeekArray, (data) => data.count);
    weeklyStats.avg = getDisplayValue(meanBy(filteredWeekArray, (data) => data.count));
    weeklyStats.max = getDisplayValue(max ? max.count : 0);
    weeklyStats.min = getDisplayValue(min ? min.count : 0);

    const weeklyEnergyRecordsChartData = weeklyEnergyRecords.map((report, index) => ({
      name: index + 1,
      value: report.count,
      tooltipLabel: `Week no. ${index + 1}`,
    }));

    const monthlyEnergyRecordsChartData = monthlyEnergyRecords.map((report) => ({
      name: `${report.month.substr(0,3)}`,
      value: report.count,
      tooltipLabel: `${report.month}`,
    }));

    const getTableRows = (data) => [
      <TableRow key={1} hoverable={false}>
        <TableRowColumn>
          Minimum
        </TableRowColumn>
        <TableRowColumn className="text-center">{ data.min } { energyUnit }</TableRowColumn>
      </TableRow>,
      <TableRow key={2} hoverable={false}>
        <TableRowColumn>
          Average
        </TableRowColumn>
        <TableRowColumn className="text-center">{ data.avg } { energyUnit }</TableRowColumn>
      </TableRow>,
      <TableRow key={3} hoverable={false}>
        <TableRowColumn>
          Maximum
        </TableRowColumn>
        <TableRowColumn className="text-center">{ data.max } { energyUnit }</TableRowColumn>
      </TableRow>
    ];

    return (
      <div>
        <Row>
          <Col xs={12}>
            <div>
              { !isIntervalGreatherThenOnMonth ? (
                <div>
                  <div>
                    <p className="text-center">Daily summary [ { energyUnit } ]</p>
                  </div>
                  <Row>
                    <Col xs={12} lg={7} xl={8}>
                      <LineChart data={dailyEnergyRecordsChartData} dataValue={'value'} xAxisKey={'name'} color={'#FFFFFF'} height={140} colorId={3} valueUnit={energyUnit} />
                    </Col>

                    <Col xs={12} lg={5} xl={4}>
                      <Table>
                        {/*<TableHeader adjustForCheckbox={false} displaySelectAll={false}>*/}
                        {/*<TableRow>*/}
                        {/*<TableHeaderColumn>*/}
                        {/*Report*/}
                        {/*</TableHeaderColumn>*/}
                        {/*<TableHeaderColumn className="text-center">Count</TableHeaderColumn>*/}
                        {/*</TableRow>*/}
                        {/*</TableHeader>*/}
                        <TableBody displayRowCheckbox={false}>
                          { getTableRows(daylyStats) }
                        </TableBody>
                      </Table>
                    </Col>
                  </Row>
                  <br />
                </div>
              ) : null }

              <div>
                <div>
                  <p className="text-center">Weekly summary [ { energyUnit } ]</p>
                </div>

                <Row>
                  <br />
                  <Col xs={12} lg={7} xl={8}>
                    <LineChart data={weeklyEnergyRecordsChartData} dataValue={'value'} xAxisKey={'name'} color={'#FFFFFF'} height={140} colorId={1} valueUnit={energyUnit} />
                  </Col>

                  <Col xs={12} lg={5} xl={4}>
                    <Table>
                      {/*<TableHeader adjustForCheckbox={false} displaySelectAll={false}>*/}
                      {/*<TableRow>*/}
                      {/*<TableHeaderColumn>*/}
                      {/*Report*/}
                      {/*</TableHeaderColumn>*/}
                      {/*<TableHeaderColumn className="text-center">Count</TableHeaderColumn>*/}
                      {/*</TableRow>*/}
                      {/*</TableHeader>*/}
                      <TableBody displayRowCheckbox={false}>
                        { getTableRows(weeklyStats) }
                      </TableBody>
                    </Table>
                  </Col>
                </Row>
                <br />
              </div>

              { isIntervalGreatherThenOnMonth ? (
                <div>
                  <div>
                    <p className="text-center">Monthly summary [ { energyUnit } ]</p>
                  </div>
                  <Row>
                    <br />
                    <Col xs={12} lg={7} xl={8}>
                      <LineChart data={monthlyEnergyRecordsChartData} dataValue={'value'} xAxisKey={'name'} color={'#FFFFFF'} height={140} colorId={2} valueUnit={energyUnit}/>
                    </Col>

                    <Col xs={12} lg={5} xl={4}>
                      <Table>
                        {/*<TableHeader adjustForCheckbox={false} displaySelectAll={false}>*/}
                        {/*<TableRow>*/}
                        {/*<TableHeaderColumn>*/}
                        {/*Report*/}
                        {/*</TableHeaderColumn>*/}
                        {/*<TableHeaderColumn className="text-center">Count</TableHeaderColumn>*/}
                        {/*</TableRow>*/}
                        {/*</TableHeader>*/}
                        <TableBody displayRowCheckbox={false}>
                          { getTableRows(monthlyStats) }
                        </TableBody>
                      </Table>
                    </Col>
                  </Row>
                  <br />
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

EnergyReports.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  dailyEnergyRecords: PropTypes.any,
  weeklyEnergyRecords: PropTypes.any,
  monthlyEnergyRecords: PropTypes.any,
  energyUnit: PropTypes.any,
  muiTheme: PropTypes.any,
};


const withTheme = muiThemeable()(EnergyReports);

export default withTheme;
