import React from 'react';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Left from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import './pageHeader.css';

const PageHeader = ({ title, goBack }) => (
  <div className="page-header">
    <div className="flex align-center">
      <FloatingActionButton mini={true} onClick={goBack}>
        <Left/>
      </FloatingActionButton>
      &nbsp;
      <h1>{ title }</h1>
    </div>
    <Divider/>
    <br />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
});

export default connect(null, mapDispatchToProps)(PageHeader);
