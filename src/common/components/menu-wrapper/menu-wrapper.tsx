import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CssBaseline,
  Hidden,
  List,
  ListItemText,
  Collapse,
  Box,
  IconButton,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Toolbar from '@mui/material/Toolbar'

import {
  DrawerContainer,
  DrawerHeader,
  DrawerIcon,
  DrawerItemText,
  DrawerList,
  DrawerListContainer,
  StyledDrawer,
  DrawerRootContainer,
  EmailAddress,
  LogoImage,
  LogoWrapper,
  MenuItem,
  StyledAppBar,
  StyledContent,
  StyledDivider,
  SubMenuIcons,
  SubMenuItems,
  UserInfoBox,
  MenuIcon,
  ExpansionIcon,
} from './menu-wrapper-styles'
import logo from '../../../assets/img/merit.png'
import { MENU_ITEMS } from './menu-item-list'
import { Notifications } from '../notifications/notifications'
import {
  AuthContext,
  AuthTokenSettingContext,
} from '../../../contexts/auth-context'
import { Loading } from '../loading/loading'

export const MenuWrapper = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const history = useHistory()

  const { isAuthenticated, user, isUserDataLoaded } = useContext(AuthContext)
  const { clearAuthToken } = useContext(AuthTokenSettingContext)
  const [openedItems, setOpenedItems] = useState<{ [key: string]: boolean }>({})

  const onSignOutClick = (): void => {
    clearAuthToken?.()
  }

  const toggleOpenedItems = (item: string): void => {
    setOpenedItems({ ...openedItems, [item]: !openedItems[item] })
  }

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setOpenedItems({})
  }

  const onMenuWithSubitemClick = (item: string) => {
    if (isDrawerOpen) {
      return toggleOpenedItems(item)
    }

    handleDrawerOpen()
  }

  if (!isUserDataLoaded) {
    return <Loading />
  }

  if (!user?.role?.name) {
    return <React.Fragment />
  }

  const renderDrawerMenuItems = () => (
    <Box>
      {MENU_ITEMS.map(
        ({ label, item, url, subMenuItems, allowedRoles, Icon }, i) => {
          if (!allowedRoles.includes(user?.role?.name)) {
            return <React.Fragment key={label} />
          }

          if (subMenuItems) {
            return (
              <React.Fragment key={label}>
                <MenuItem
                  key={label}
                  onClick={() => onMenuWithSubitemClick(item)}>
                  <DrawerIcon>
                    <Icon />
                  </DrawerIcon>
                  {isDrawerOpen && (
                    <React.Fragment>
                      <DrawerItemText inset primary={label} />
                      {openedItems[item] ? (
                        <ExpansionIcon component={ExpandLess} />
                      ) : (
                        <ExpansionIcon component={ExpandMore} />
                      )}
                    </React.Fragment>
                  )}
                </MenuItem>
                {subMenuItems.map(({ subLabel, url, Icon }, i) => (
                  <Box
                    key={subLabel}
                    onClick={() => {
                      url && history.push(url)
                      // handleCloseMenu() // TODO: handle mobile menu close
                    }}>
                    <Collapse
                      in={openedItems[item]}
                      timeout='auto'
                      unmountOnExit>
                      <List disablePadding>
                        <SubMenuItems>
                          <SubMenuIcons>
                            <Icon />
                          </SubMenuIcons>
                          <ListItemText primary={subLabel} />
                        </SubMenuItems>
                      </List>
                    </Collapse>
                  </Box>
                ))}
              </React.Fragment>
            )
          }

          // Not a sub menu items
          return (
            <React.Fragment key={label}>
              {i === MENU_ITEMS.length - 1 && <StyledDivider />}
              <MenuItem
                onClick={() => {
                  url && history.push(url)
                  // handleCloseMenu() // TODO: handle mobile menu close
                  item === 'signout' && onSignOutClick()
                }}
                key={label}
                style={{ cursor: 'pointer' }}>
                <DrawerIcon>
                  <Icon />
                </DrawerIcon>
                {isDrawerOpen && <DrawerItemText inset primary={label} />}
              </MenuItem>
            </React.Fragment>
          )
        }
      )}
    </Box>
  )

  return (
    <DrawerRootContainer>
      <CssBaseline />
      {isAuthenticated && (
        <React.Fragment>
          <StyledAppBar isDrawerOpen={isDrawerOpen} position='fixed'>
            <Toolbar
              sx={{
                minHeight: '0 !important',
                display: 'flex',
              }}>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{
                  marginRight: 5,
                  marginTop: '50px',
                  ...(isDrawerOpen && { display: 'none' }),
                }}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </StyledAppBar>
          <DrawerContainer>
            <Hidden mdDown implementation='css'>
              <StyledDrawer variant='permanent' open={isDrawerOpen}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {isDrawerOpen && (
                      <ChevronLeftIcon sx={{ color: 'white' }} />
                    )}
                  </IconButton>
                </DrawerHeader>
                <StyledDivider />
                {isDrawerOpen && (
                  <LogoWrapper>
                    <LogoImage src={logo} alt='logo' />
                  </LogoWrapper>
                )}
                <DrawerListContainer>
                  {renderDrawerMenuItems()}
                </DrawerListContainer>
                {isDrawerOpen && (
                  <UserInfoBox>
                    <EmailAddress>{user?.email}</EmailAddress>
                  </UserInfoBox>
                )}
              </StyledDrawer>
            </Hidden>
          </DrawerContainer>
          <StyledContent component='main'>{children}</StyledContent>
        </React.Fragment>
      )}
      <Notifications />
    </DrawerRootContainer>
  )
}
