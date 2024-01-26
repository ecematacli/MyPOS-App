import { styled } from '@mui/material/styles'

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
  Drawer,
} from '@mui/material'
import backgroundImage from '../../../assets/img/sidebar-2.jpg'

const drawerWidth = 255

export const DrawerRootContainer = styled(Box)({
  display: 'flex',
  height: '100%',
})

export const StyledAppBar = styled(AppBar)({
  '&.MuiAppBar-root': {
    height: 0,
  },
})

export const MenuIconContainer = styled(Box)({
  marginTop: 24,
  marginLeft: 28,
  width: 30,
})

export const MenuIcon = styled(Box)({
  fontSize: 35,
})

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
  marginTop: theme.spacing(0.8),
  marginBottom: `${-theme.spacing(0.6)}px`,
}))

export const LogoImage = styled('img')({
  width: 120,
  height: 60,
})

export const DrawerContainer = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}))

export const DrawerPaper = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    paddingTop: theme.spacing(2),
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${backgroundImage})`,
    backgroundPosition: 'center center',
  },
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
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}))

export const StyledContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  backgroundColor: theme.palette.grayColors[1],
}))
