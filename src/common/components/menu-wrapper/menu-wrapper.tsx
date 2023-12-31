import React, { useContext, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CssBaseline,
  Drawer,
  AppBar,
  Hidden,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import styles from './styles'
import logo from '../../../assets/img/merit.png'
import { MENU_ITEMS, SubMenuItem } from './menu-item-list'
import Notifications from '../notifications/Notifications'
import {
  AuthContext,
  AuthTokenSettingContext,
} from '../../../contexts/AuthContext'
import Loading from '../loading'

export const MenuWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const classes = styles()
  const history = useHistory()

  const { isAuthenticated, user, isUserDataLoaded } = useContext(AuthContext)
  const { clearAuthToken } = useContext(AuthTokenSettingContext)
  const [openedItems, setOpenedItems] = useState<{ [key: string]: boolean }>({})
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const onSignOutClick = (): void => {
    clearAuthToken()
  }

  const toggleOpenedItems = (item: string): void => {
    setOpenedItems({ ...openedItems, [item]: !openedItems[item] })
  }

  const handleMobileOpenToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  const handleCloseMenu = (): void => {
    setMobileOpen(false)
  }

  if (!isUserDataLoaded) {
    return <Loading />
  }

  const renderSubMenuItems = (subMenuItems: SubMenuItem[], item: string) =>
    subMenuItems.map(({ subLabel, url, Icon }, i) => (
      <div
        key={subLabel}
        onClick={() => {
          history.push(url)
          handleCloseMenu()
        }}>
        <Collapse in={openedItems[item]} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button className={classes.subMenuItems}>
              <ListItemIcon className={classes.subMenuIcons}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={subLabel} />
            </ListItem>
          </List>
        </Collapse>
      </div>
    ))

  const drawer = (
    <Box className={classes.drawerListContainer}>
      <List className={classes.drawerListItems}>
        <ListItem>
          <div className={classes.logoWrapper}>
            <img className={classes.logoImg} src={logo} alt='logo' />
          </div>
        </ListItem>
        <Divider className={classes.divider} />
        {MENU_ITEMS.map(
          ({ label, item, url, subMenuItems, allowedRoles, Icon }, i) => {
            if (!allowedRoles.includes(user?.role?.name)) {
              return <React.Fragment key={label} />
            }

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
              )
            }
            return (
              <div key={label}>
                {i === MENU_ITEMS.length - 1 && (
                  <Divider className={classes.divider} />
                )}
                <ListItem
                  onClick={() => {
                    history.push(url)
                    handleCloseMenu()
                    item === 'signout' && onSignOutClick()
                  }}
                  key={label}
                  button>
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
            )
          }
        )}
      </List>
      <Box className={classes.userInfoBox}>
        <Typography className={classes.emailAddress}>{user?.email}</Typography>
      </Box>
    </Box>
  )
  return (
    <div className={classes.drawerRoot}>
      <CssBaseline />
      {isAuthenticated ? (
        <Fragment>
          <AppBar classes={{ root: classes.appBar }}>
            <div className={classes.menuIconContainer}>
              <IconButton
                className={classes.menuButton}
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={handleMobileOpenToggle}>
                <MenuIcon className={classes.menuIcon} />
              </IconButton>
            </div>
          </AppBar>
          <nav className={classes.drawer}>
            <Hidden xlUp implementation='css'>
              <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleMobileOpenToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                classes={{
                  paper: classes.drawerPaper,
                }}>
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden lgDown implementation='css'>
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant='permanent'
                open>
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </Fragment>
      ) : null}
      <main className={classes.content}>{children}</main>
      <Notifications />
    </div>
  )
}
