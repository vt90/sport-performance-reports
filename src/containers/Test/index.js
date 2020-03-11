import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/reports';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Card from 'material-ui/Card';
import moment from 'moment';

class Test extends Component {
  componentDidMount() {
    this.props.getAllData();
  }

  render() {
    const { allReports } = this.props;

    const tableRows = allReports && allReports.map((report, index) => (
      <TableRow key={index}>
        <TableHeaderColumn style={{width: 18}}>
          { report.id }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { report.uId }
        </TableHeaderColumn>
        <TableHeaderColumn style={{width: 154}}>
          { report.activityType }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { report.duration }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { report.durationUnit }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { report.distance }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { report.distanceUnit }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { report.energy }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { report.energyUnit }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { moment(report.startDate).format('YYYY-MM-DD') }
        </TableHeaderColumn>
        <TableHeaderColumn>
          { moment(report.endDate).format('YYYY-MM-DD') }
        </TableHeaderColumn>
      </TableRow>
    ));

    return (
      <Grid fluid>
        <br />
        <Row justify="center">
          <Col xs={12}>
            <Card>
              <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn style={{width: 18}}>
                      Id
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      UserId
                    </TableHeaderColumn>
                    <TableHeaderColumn style={{width: 154}}>
                      Activity type
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Duration
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Duration unit
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Distance
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Distance unit
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Energy
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Energy unit
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Start date
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      End date
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  { tableRows }
                </TableBody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  allReports: state.reports.allReports,
});

const mapDispatchToProps = (dispatch) => ({
  getAllData: () => dispatch(actions.getAllHealthData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
