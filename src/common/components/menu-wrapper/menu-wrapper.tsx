import React, { useContext, useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CssBaseline,
  Hidden,
  List,
  ListItemText,
  Collapse,
} from '@mui/material'
import MenuIcon from '@material-ui/icons/Menu'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import {
  DrawerContainer,
  DrawerIcon,
  DrawerItemText,
  DrawerList,
  DrawerListContainer,
  DrawerPaper,
  DrawerRoot,
  EmailAddress,
  LogoImage,
  LogoWrapper,
  MenuButton,
  MenuIconContainer,
  MenuItem,
  StyledAppBar,
  StyledContent,
  StyledDivider,
  SubMenuIcons,
  SubMenuItems,
  UserInfoBox,
} from './menu-wrapper-styles'
import logo from '../../../assets/img/merit.png'
import { MENU_ITEMS, SubMenuItem } from './menu-item-list'
import { Notifications } from '../notifications/notifications'
import {
  AuthContext,
  AuthTokenSettingContext,
} from '../../../contexts/AuthContext'
import Loading from '../loading'

export const MenuWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
          <List disablePadding>
            <SubMenuItems>
              <SubMenuIcons>
                <Icon />
              </SubMenuIcons>
              <ListItemText primary={subLabel} />
            </SubMenuItems>
          </List>
        </Collapse>
      </div>
    ))

  const drawer = (
    <DrawerListContainer>
      <DrawerList>
        <MenuItem>
          <LogoWrapper>
            <LogoImage src={logo} alt='logo' />
          </LogoWrapper>
        </MenuItem>
        <StyledDivider />
        {MENU_ITEMS.map(
          ({ label, item, url, subMenuItems, allowedRoles, Icon }, i) => {
            if (!allowedRoles.includes(user?.role?.name)) {
              return <React.Fragment key={label} />
            }

            if (subMenuItems) {
              return (
                <React.Fragment key={label}>
                  <MenuItem key={label} onClick={() => toggleOpenedItems(item)}>
                    <DrawerIcon>
                      <Icon />
                    </DrawerIcon>
                    <DrawerItemText inset primary={label} />
                    {openedItems[item] ? (
                      <ExpandLess style={{ cursor: 'pointer' }} />
                    ) : (
                      <ExpandMore style={{ cursor: 'pointer' }} />
                    )}
                  </MenuItem>
                  {renderSubMenuItems(subMenuItems, item)}
                </React.Fragment>
              )
            }
            return (
              <React.Fragment key={label}>
                {i === MENU_ITEMS.length - 1 && <StyledDivider />}
                <MenuItem
                  onClick={() => {
                    history.push(url)
                    handleCloseMenu()
                    item === 'signout' && onSignOutClick()
                  }}
                  key={label}
                  style={{ cursor: 'pointer' }}>
                  <DrawerIcon>
                    <Icon />
                  </DrawerIcon>
                  <DrawerItemText inset primary={label} />
                </MenuItem>
              </React.Fragment>
            )
          }
        )}
      </DrawerList>
      <UserInfoBox>
        <EmailAddress>{user?.email}</EmailAddress>
      </UserInfoBox>
    </DrawerListContainer>
  )
  return (
    <DrawerRoot>
      <CssBaseline />
      {isAuthenticated ? (
        <Fragment>
          <StyledAppBar>
            <MenuIconContainer>
              <MenuButton
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={handleMobileOpenToggle}>
                <MenuIcon />
              </MenuButton>
            </MenuIconContainer>
          </StyledAppBar>
          <DrawerContainer>
            <Hidden lgUp implementation='css'>
              <DrawerPaper
                variant='temporary'
                open={mobileOpen}
                onClose={handleMobileOpenToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}>
                {drawer}
              </DrawerPaper>
            </Hidden>
            <Hidden lgDown implementation='css'>
              <DrawerPaper variant='permanent' open>
                {drawer}
              </DrawerPaper>
            </Hidden>
          </DrawerContainer>
        </Fragment>
      ) : null}
      <StyledContent>{children}</StyledContent>
      <Notifications />
    </DrawerRoot>
  )
}
