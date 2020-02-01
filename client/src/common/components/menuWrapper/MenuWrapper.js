import React, { useContext, useState, Fragment } from 'react';
import clsx from 'clsx';
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
  IconButton,
  Collapse
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';
import logo from '../../../assets/img/app-logo.png';
import menuItemList from './menuItemList';
import history from '../../../history/history';
import Notifications from '../notifications/Notifications';
import {
  AuthContext,
  AuthTokenSettingContext
} from '../../../contexts/AuthContext';

const MenuWrapper = ({ container, children }) => {
  const classes = styles();
  const authenticated = useContext(AuthContext);
  const { clearAuthToken } = useContext(AuthTokenSettingContext);
  const [openedItems, setOpenedItems] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const onSignOutClick = () => {
    clearAuthToken();
  };

  const toggleOpenedItems = item => {
    setOpenedItems({ ...openedItems, [item]: !openedItems[item] });
  };

  const handleMobileOpenToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseMenu = () => {
    setMobileOpen(false);
  };

  const renderSubMenuItems = (subMenuItems, item) => {
    return subMenuItems.map(({ subLabel, url, Icon }, i) => {
      return (
        <Collapse
          onClick={() => {
            history.push(url);
            handleCloseMenu();
          }}
          key={subLabel}
          in={openedItems[item]}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem
              button
              className={clsx(
                i === 0 && classes.subMenuFirstItem,
                classes.subMenuItems
              )}
            >
              <ListItemIcon className={classes.subMenuIcons}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={subLabel} />
            </ListItem>
          </List>
        </Collapse>
      );
    });
  };

  const drawer = (
    <Fragment>
      <List className={classes.drawerListItems}>
        <ListItem>
          <div className={classes.logoWrapper}>
            <div>
              <img className={classes.logoImg} src={logo} alt="logo image" />
            </div>
          </div>
        </ListItem>
        <Divider className={classes.divider} />
        {menuItemList.map(({ label, item, url, subMenuItems, Icon }, i) => {
          if (subMenuItems) {
            return (
              <div key={label}>
                <ListItem button onClick={() => toggleOpenedItems(item)}>
                  <IconButton className={classes.drawerIcon}>
                    <Icon />
                  </IconButton>
                  <ListItemText
                    className={classes.drawerItemText}
                    inset
                    primary={label}
                  />
                  {openedItems[item] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {renderSubMenuItems(subMenuItems, item)}
              </div>
            );
          }
          return (
            <div key={label}>
              {i === menuItemList.length - 1 && (
                <Divider className={classes.divider} />
              )}
              <ListItem
                onClick={() => {
                  history.push(url);
                  handleCloseMenu();
                  item === 'signout' && onSignOutClick();
                }}
                key={label}
                button
              >
                <IconButton className={classes.drawerIcon}>
                  <Icon />
                </IconButton>
                <ListItemText
                  className={classes.drawerItemText}
                  inset
                  primary={label}
                />
              </ListItem>
            </div>
          );
        })}
      </List>
    </Fragment>
  );
  return (
    <div className={classes.drawerRoot}>
      <CssBaseline />
      {authenticated ? (
        <Fragment>
          <AppBar
            classes={{ root: classes.appBarRoot }}
            className={classes.appBar}
          >
            <div className={classes.menuIconContainer}>
              <IconButton
                className={classes.menuButton}
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleMobileOpenToggle}
              >
                <MenuIcon style={{ fontSize: 28 }} />
              </IconButton>
            </div>
            <Toolbar classes={{ regular: classes.toolbar }}></Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="menu items">
            <Hidden mdUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleMobileOpenToggle}
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
        </Fragment>
      ) : null}
      <main className={classes.content}>{children}</main>
      <Notifications />
    </div>
  );
};

export default MenuWrapper;
