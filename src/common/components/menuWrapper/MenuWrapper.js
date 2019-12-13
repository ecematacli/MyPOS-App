import React from 'react';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import History from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import styles from './styles';
import logo from '../../../assets/img/app-logo.png';
import useToggleState from '../../../hooks/useToggleState';
import history from '../../../history/history';
import menuItems from './menuItems';

const MenuWrapper = ({ container, children }) => {
  const classes = styles();
  const [mobileOpen, setMobileOpen] = useToggleState(false);

  const drawer = (
    <React.Fragment>
      <List className={classes.menuItems}>
        <ListItem>
          <div className={classes.logoWrapper}>
            <div className={classes.logo}>
              <img className={classes.logoImg} src={logo} />
            </div>
          </div>
        </ListItem>
        <Divider style={{ backgroundColor: '#555' }} />
        {menuItems.map(({ text, url }, i) => {
          return (
            <div key={i}>
              <ListItem onClick={() => history.push(url)} button key={text}>
                <ListItemIcon className={classes.menuIcon}>
                  {i === 0 ? <InboxIcon /> : <History />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </div>
          );
        })}
      </List>
      <Divider style={{ backgroundColor: '#555' }} />
      <List>
        <ListItem button onClick={() => history.push('/signout')}>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default MenuWrapper;
