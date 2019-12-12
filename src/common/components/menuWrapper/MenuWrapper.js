import React from 'react';
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Hidden,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import History from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import { useStyles } from './useStyles';
import useToggleState from '../../../hooks/useToggleState';
import history from '../../../history/history';
import menuItems from './menuItems';


const MenuWrapper = ({ container, children }) => {
  const classes = useStyles();
  const { location: { pathname } } = history;
  const [mobileOpen, setMobileOpen] = useToggleState(false);
  console.log(history);

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <List className={classes.menuItems}>
        {menuItems.map(({ text, url }, i) => {
          console.log(pathname === url);

          return (
            <ListItem selected={history.location.pathname.includes(url)} onClick={() => history.push(url)} button key={text}>
              <ListItemIcon >{i === 0 ? <InboxIcon /> : <History />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        })}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push('/signout')}>
          <ListItemIcon><PowerSettingsNew /></ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </ListItem>
      </List >
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar} >
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
            <Typography className={classes.appName} variant="h6" noWrap>
              myPOS App
        </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="menu items">
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={setMobileOpen}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
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
}


export default MenuWrapper;