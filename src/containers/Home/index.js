import React, { Component } from 'react';
import Logo from '../../assets/images/logo.png';
import Image1 from '../../assets/images/screen-1.png';
import Paper from 'material-ui/Paper';
import Quote from 'material-ui/svg-icons/editor/format-quote';

import Download from 'material-ui/svg-icons/file/cloud-download';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Sync from 'material-ui/svg-icons/notification/sync';
import Sports from 'material-ui/svg-icons/places/pool';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-banner-1">
          <Grid>
            <Row center="xs" middle="xs">
              <Col xs={11} sm={9} md={8} xl={6}>
                <div className="flex justify-center">
                  <div className="banner-logo">
                    <img src={Logo} />
                  </div>
                </div>
                <h1>Sports Performance Reports</h1>
                <h4>was created to answer the question of:</h4>

                <div className="flex justify-center">
                  <div className="quote"><Quote/></div>&nbsp;<h2><b>My Apple Watch collects all this data, now what?</b></h2>&nbsp;<div className="quote"><Quote/></div>
                </div>

                <h4>
                  It’s not just the Apple watch, different sports bands and accessories collect all this neat information
                  and store it to the Apple Health Database.
                </h4>

                <br />
                <br />

                <p>
                  Most apps show your stats from today or from last week. What we find interesting is what has happened during the last 12 months,
                  how active have I been and how has my sports performance improved.
                </p>
              </Col>
            </Row>
          </Grid>

          <div className="screen-1">
            <div>
              <img src={Image1}/>
            </div>
          </div>
        </div>

        <div className="section-2">
          <Grid>
            <Row center="xs" middle="xs">
              <Col xs={11}>
                <h2>How to start using Sports Performance Reports?</h2>
              </Col>
              <Col xs={11} md={8}>
                <Row center="xs" middle="xs">
                  <Col xs={12} sm={6} lg={3}>
                    <Paper zDepth={2} className="paper paper-1">
                      <Sports/>
                      <p>1. Do some sports</p>
                    </Paper>
                  </Col>

                  <Col xs={12} sm={6} lg={3}>
                    <Paper zDepth={2} className="paper paper-2">
                      <Download/>
                      <p>2. Download the iphone application</p>
                    </Paper>
                  </Col>

                  <Col xs={12} sm={6} lg={3}>
                    <Paper zDepth={2} className="paper paper-3">
                      <Sync/>
                      <p>3. Sync your data</p>
                    </Paper>
                  </Col>

                  <Col xs={12} sm={6} lg={3}>
                    <Paper zDepth={2} className="paper paper-4">
                      <Timeline/>
                      <p>4. Open your reports and see how your doing</p>
                    </Paper>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
};

export default Home;
