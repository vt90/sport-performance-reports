import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import { checkUser } from '../../actions/reports';
import { USER_COOKIE_KEY } from '../../constants/constants';
import cookie from 'react-cookies';
import moment from 'moment';
import './App.css';

class App extends Component {
  // componentDidMount() {
  //   const savedUserInfo = cookie.load(USER_COOKIE_KEY);
  //
  //   if (savedUserInfo) {
  //     const { userId, cookieExpirationDate } = savedUserInfo;
  //
  //     if (moment().diff(moment(cookieExpirationDate)) < 0) this.props.checkUser(userId);
  //   }
  // }

  render() {
    return (
      <div className="App">
        <Layout/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkUser: (userId) => dispatch(checkUser(userId)),
});

export default connect(null, mapDispatchToProps)(App);
