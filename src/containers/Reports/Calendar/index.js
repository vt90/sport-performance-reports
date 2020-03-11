import React, { Component } from 'react';
import { Calendar } from 'react-calendar-component';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import muiThemeable from "material-ui/styles/muiThemeable";
import 'moment/locale/en-gb';
import './index.css';

class CalendarComponent extends Component {
  render() {
    const { data, muiTheme: { palette }} = this.props;
    const calendar = [];

    if (data) {
      const renderDay = ({ day, classNames, iteratedDate }) => {
        let dayInfo;
        const classes = ['Calendar-grid-item'];

        if (`${day.format('MM')}` === iteratedDate.month) {
          const dayIndex = day.date() - 1;
          dayInfo = iteratedDate.days[dayIndex];
        }

        const dayStyle = {};

        if (dayInfo) {
          dayStyle.backgroundColor = palette[`activityCount${dayInfo.count > 2 ? '3' : dayInfo.count}`];
        }

        return (
          <div
            key={day.format()}
            className={ classes.join(' ') }
          >
            <div
              className="Calendar-day"
              style={dayStyle}
            >
              {day.format('D')}

              { dayInfo && dayInfo.count ?
                <div
                  className="Calendar-count-badge"
                  style={{ backgroundColor: palette.primary1Color }}
                >
                  { dayInfo.count }
                </div>
                : null }
            </div>
          </div>
        );
      };

      const renderHeader = ({ date }) => {
        return (
          <div>
            <div className="Calendar-toolbar">
              <div className="Calendar-toolbar-group">
                <p className="Calendar-toolbar-subtitle">{date.format('YYYY')}</p>
                <h2 className="Calendar-toolbar-title">{date.format('MMMM')}</h2>
              </div>
            </div>
            <div className="Calendar-grid Days-grid">
              <div className="Calendar-grid-item Calendar-day-title">
                M
              </div>
              <div className="Calendar-grid-item Calendar-day-title">
                T
              </div>
              <div className="Calendar-grid-item Calendar-day-title">
                W
              </div>
              <div className="Calendar-grid-item Calendar-day-title">
                T
              </div>
              <div className="Calendar-grid-item Calendar-day-title">
                F
              </div>
              <div className="Calendar-grid-item Calendar-day-title">
                S
              </div>
              <div className="Calendar-grid-item Calendar-day-title">
                S
              </div>
            </div>
          </div>
        );
      };

      Object.keys(data)
        .forEach((key, index) => {
          const date = data[key];
          const isoMount = parseInt(date.month, 10) - 1;
          const year = parseInt(date.year, 10);

          const iteratedDate = moment().year(year).month(isoMount);

          calendar.push(
            <Col key={index} xs={12} sm={6} md={6} lg={6} xl={4}>
              <Paper>
                <Calendar
                  date={iteratedDate}
                  renderDay={(props) => renderDay({ ...props, iteratedDate: date })}
                  renderHeader={renderHeader}
                />
              </Paper>
              <br />
            </Col>
          );
        });
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <h2 className="Calendar-title">Activity calendar</h2>
              <Divider />
              <br />
              <br />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            { calendar.length ? calendar : null }
          </Row>
        </Grid>
      </div>
    );
  }
}

export default  muiThemeable()(CalendarComponent);
