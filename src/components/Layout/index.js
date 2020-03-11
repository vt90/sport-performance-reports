import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getAppRoutes } from '../../config/routes';
import Header from '../Header';
import Notification from '../Notification';
import './index.css';

const ConnectedSwitch = connect(state => ({
  location: state.router.location
}))(Switch);

const Layout = (props) => {
  const appRoutes = getAppRoutes();
  const routes = appRoutes.map((route, index) => (
    <Route key={index} exact path={route.path} component={route.component}/>
  ));

  return (
    <div className="Layout">
      <Header />
      <Notification />
      <ConnectedSwitch>
        { routes }
      </ConnectedSwitch>
    </div>
  );
};

export default Layout;
