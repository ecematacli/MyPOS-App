import React, { useContext } from 'react';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Hidden,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import History from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import styles from './styles';
import {
  AuthContext,
  AuthTokenSettingContext
} from '../../../contexts/AuthContext';
import logo from '../../../assets/img/app-logo.png';
import useToggleState from '../../hooks/useToggleState';
import history from '../../../history/history';
import menuItems from './menuItems';

const MenuWrapper = ({ container, children }) => {
  const classes = styles();
  const authenticated = useContext(AuthContext);
  const { clearAuthToken } = useContext(AuthTokenSettingContext);
  const [mobileOpen, setMobileOpen] = useToggleState(false);

  const onSignOutClick = () => {
    clearAuthToken();
  };

  const drawer = (
    <React.Fragment>
      <List className={classes.menuItems}>
        <ListItem>
          <div className={classes.logoWrapper}>
            <div className={classes.logo}>
              <img className={classes.logoImg} src={logo} alt="logo image" />
            </div>
          </div>
        </ListItem>
        <Divider className={classes.menuDivider} />
        {menuItems.map(({ text, url }, i) => {
          return (
            <div key={i}>
              <ListItem onClick={() => history.push(url)} button key={text}>
                <ListItemIcon className={classes.menuIcon}>
                  {i === 0 ? <MonetizationOnOutlinedIcon /> : <History />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </div>
          );
        })}
      </List>
      <Divider className={classes.menuDivider} />
      <List>
        <ListItem button onClick={onSignOutClick}>
          <ListItemIcon className={classes.menuIcon}>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </ListItem>
      </List>
    </React.Fragment>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      {authenticated ? (
        <React.Fragment>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <div className={classes.headerContainer}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={setMobileOpen}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="menu items">
            <Hidden mdUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={setMobileOpen}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </React.Fragment>
      ) : null}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default MenuWrapper;
