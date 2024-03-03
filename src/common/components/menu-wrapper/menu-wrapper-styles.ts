import { styled, CSSObject } from '@mui/material/styles'

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  AppBar,
  List,
  Divider,
  Theme,
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import MuiMenuIcon from '@mui/icons-material/Menu'
import backgroundImage from '../../../assets/img/drawer-image.png'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'isDrawerOpen',
})<{ isDrawerOpen: boolean }>(({ theme, isDrawerOpen }) => ({
  height: 0,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDrawerOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const MenuIconContainer = styled(Box)({
  marginTop: 24,
  marginLeft: 28,
  width: 30,
})

export const MenuIcon = styled(MuiMenuIcon)(({ theme }) => ({
  color: 'white',
  marginTop: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    color: theme.palette.secondary.dark,
  },
}))

export const MenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  [theme.breakpoints.up('xl')]: {
    display: 'none',
  },
}))

export const LogoWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: theme.spacing(8),
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(3),
}))

export const LogoImage = styled('img')({
  width: 120,
  height: 60,
})

export const DrawerContainer = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    // width: drawerWidth,
    flexShrink: 0,
  },
}))

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77) ), url(${backgroundImage})`,
      // backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${backgroundImage})`,
      backgroundPosition: 'center center',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      backgroundSize: 'cover',
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${backgroundImage})`,
      backgroundPosition: 'center center',
    },
  }),
}))

export const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export const DrawerIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.light,
}))

export const DrawerListContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const DrawerList = styled(List)({
  paddingTop: 2,
})

export const UserInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(5),
}))

export const EmailAddress = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.secondary.light,
  fontWeight: 'bold',
  fontSize: 18,
}))

export const DrawerItemText = styled(ListItemText)({
  paddingLeft: 10,
})

export const MenuItem = styled(ListItem)({
  cursor: 'pointer',
  paddingLeft: 12,
})

export const ExpansionIcon = styled(Box)({
  cursor: 'pointer',
})

export const SubMenuItems = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  cursor: 'pointer',
}))

export const SubMenuIcons = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.secondary.light,
  paddingLeft: theme.spacing(3),
}))

export const StyledDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.grayColors[2],
  opacity: 0.6,
}))

export const StyledContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  backgroundColor: theme.palette.grayColors[1],
}))
