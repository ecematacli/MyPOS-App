import React, { useContext, useState } from 'react';
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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';
import logo from '../../../assets/img/app-logo.png';
import drawerItemList from './drawerItemList';
import history from '../../../history/history';
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

  const toggleOpenedItems = label => {
    setOpenedItems({ ...openedItems, [label]: !openedItems[label] });
  };

  const handleMobileOpenToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseMenu = () => {
    setMobileOpen(false);
  };

  const renderSubMenuItems = (subMenuItems, label) => {
    return subMenuItems.map(({ subLabel, url }, i) => {
      return (
        <Collapse
          onClick={() => {
            history.push(url);
            handleCloseMenu();
          }}
          key={subLabel}
          in={openedItems[label]}
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
                {i === 0 ? <AddShoppingCartIcon /> : <HistoryIcon />}
              </ListItemIcon>
              <ListItemText primary={subLabel} />
            </ListItem>
          </List>
        </Collapse>
      );
    });
  };

  const drawer = (
    <React.Fragment>
      <List className={classes.drawerListItems}>
        <ListItem>
          <div className={classes.logoWrapper}>
            <div>
              <img className={classes.logoImg} src={logo} alt="logo image" />
            </div>
          </div>
        </ListItem>
        <Divider className={classes.divider} />
        {drawerItemList.map(({ label, url, subMenuItems, Icon }, i) => {
          if (subMenuItems) {
            return (
              <div key={label}>
                <ListItem button onClick={() => toggleOpenedItems(label)}>
                  <IconButton className={classes.drawerIcon}>
                    <Icon />
                  </IconButton>
                  <ListItemText
                    className={classes.drawerItemText}
                    inset
                    primary={label}
                  />
                  {openedItems[label] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {renderSubMenuItems(subMenuItems, label)}
              </div>
            );
          }
          return (
            <div key={label}>
              <ListItem
                onClick={() => {
                  history.push(url);
                  handleCloseMenu();
                  label === 'Sign Out' && onSignOutClick();
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
              {i === drawerItemList.length - 2 && (
                <Divider className={classes.divider} />
              )}
            </div>
          );
        })}
      </List>
    </React.Fragment>
  );
  return (
    <div className={classes.drawerRoot}>
      <CssBaseline />
      {authenticated ? (
        <React.Fragment>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <div>
                <IconButton
                  className={classes.menuButton}
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleMobileOpenToggle}
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
