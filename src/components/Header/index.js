import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { exitUser, removeUserData } from '../../actions/reports';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Help from 'material-ui/svg-icons/action/help';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import StarIcon from 'material-ui/svg-icons/action/stars';
import ChartsIcon from 'material-ui/svg-icons/editor/insert-chart';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import CircularProgress  from 'material-ui/CircularProgress';
import Logo from '../../assets/images/logo.png';
import './index.css';

class Header extends Component {
  state =  {
    drawerOpen: false,
    userCode: '',
    isRemoveUserDialogOpened: false,
  };

  componentWillUnmout() {
    this.handleDialogClose();
  }

  removeUserData = () => {
    const { userId, removeUserData } = this.props;

    removeUserData(userId)
      .then(() => this.handleDialogClose());
  };

  handleDialogOpen = () => {
    this.setState({isRemoveUserDialogOpened: true});
  };

  handleDialogClose = () => {
    this.setState({isRemoveUserDialogOpened: false});
  };

  onInputChange = (event) => this.setState({ userCode: event.target.value });

  onUserSearch = (event) => {
    event.preventDefault();
    this.props.goToReports(this.state.userCode);
  };

  toggleDrawer = (value) => this.setState({ drawerOpen: value });

  onDrawerItemClick = (path) => {
    this.props.goTo(path);
    this.toggleDrawer(false);
  };

  render() {
    const { userId, isLoading, exitUser } = this.props;
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.removeUserData}
      />,
    ];

    const userDetails = !!userId ?
      [
        <Link key={0} to={`/reports/${userId}`} className="hidden-xs">
          <FlatButton>
            <ChartsIcon />
            <span className="menu-text">Reports</span>
          </FlatButton>
        </Link>,
        <IconMenu
          key={1}
          iconButtonElement={<IconButton><AccountCircle /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          tooltip="User"
        >
          <MenuItem primaryText={userId} leftIcon={<AccountCircle />}/>
          <Divider />
          <MenuItem primaryText="Switch user" leftIcon={<ExitToApp />} onClick={exitUser}/>
          {/*<MenuItem primaryText="Remove my records" leftIcon={<DeleteForever />} onClick={this.handleDialogOpen}/>*/}
        </IconMenu>
      ] :
      (
        <form className="flex justify-center" onSubmit={this.onUserSearch}>
          {
            isLoading ?
              <CircularProgress color="rgba(0,0,0,0.67)" size={20} style={{ padding: 12 }} /> :
              <div>
                <TextField
                  hintText="User code"
                  value={this.state.userCode}
                  onChange={this.onInputChange}
                  style={{ width: 'auto' }}
                  disabled={isLoading}
                />

                <div className="enter-any-code">
                  <p>Enter any <strong>User Code above</strong> to view MOCK reports</p>
                </div>
              </div>
          }
          {
            !!this.state.userCode && !isLoading && (
              <IconButton type="submit" >
                <CheckCircle />
              </IconButton>
            )
          }
        </form>
      );
    return (
      <header className="App-header">
        <Drawer
          containerClassName="drawer"
          open={this.state.drawerOpen}
          docked={false}
          onRequestChange={() => this.toggleDrawer(false)}
        >
          <div>
            <header
              className="flex justify-center"
            >
              <Link to="/"><img src={Logo} alt="Logo"/></Link>
            </header>
          </div>

          <Divider/>

          <br />

          {/*<MenuItem leftIcon={<StarIcon/>} primaryText="Feedback" onClick={() => this.onDrawerItemClick('/feedback')}/>*/}

          {/*<MenuItem leftIcon={<Help/>} primaryText="FAQ" onClick={() => this.onDrawerItemClick('/faq')}/>*/}

          <MenuItem leftIcon={<ChartsIcon/>} primaryText="Reports" onClick={() => this.onDrawerItemClick(`/reports/${userId}`)}/>
        </Drawer>

        <IconButton className="menu-button" onClick={() => this.toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Link to="/"><img src={Logo} alt="Logo"/></Link>

        <h2>Sports Performance Reports</h2>

        <span className="Fill-flex"></span>
        &nbsp;
        {/*<Link to="/feedback" className="hidden-xs">*/}
        {/*  <FlatButton>*/}
        {/*    <StarIcon />*/}
        {/*    <span className="menu-text">Feedback</span>*/}
        {/*  </FlatButton>*/}
        {/*</Link>*/}

        {/*<Link to="/faq" className="hidden-xs">*/}
        {/*  <FlatButton>*/}
        {/*    <Help />*/}
        {/*    <span className="menu-text">FAQ</span>*/}
        {/*  </FlatButton>*/}
        {/*</Link>*/}

        { userDetails }

        <Dialog
          title="Remove user"
          actions={dialogActions}
          modal={false}
          open={this.state.isRemoveUserDialogOpened}
          onRequestClose={this.handleDialogClose}
        >
          Are you sure you want to perform this action? All your records will be completely removed!
        </Dialog>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.reports.userId,
  isUserChecked: state.reports.isUserChecked,
  isLoading: state.reports.isLoading.checkUser,
});

const mapDispatchToProps = (dispatch) => ({
  goTo: (path) => dispatch(push(path)),
  goToReports: (userId) => dispatch(push(`/reports/${userId}`)),
  removeUserData: (userId) => dispatch(removeUserData(userId)),
  exitUser: () => {
    dispatch(exitUser());
    dispatch(push('/'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
