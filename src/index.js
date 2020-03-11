import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { history, store } from './config/redux';
import theme from './config/theme';

injectTapEventPlugin();

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider muiTheme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();


if (window) {
  const getBannerPadding = () => {
    const screen1 = document.querySelector('.home-banner-1');
    const image1 = document.querySelector('.screen-1 img');

    if (image1) {
      screen1.style.paddingBottom = `${image1.height + 60}px`;
    }
  };

  window.onresize = () => {
    getBannerPadding();
  };

  window.onload = () => {
    getBannerPadding();
  };

  window.onscroll = () => {
    const image1 = document.querySelector('.screen-1');

    if (image1 && image1.style) {
      image1.style.bottom = `${20 -1 * (window.scrollY / 3)}px`;
    }
  };
}

