import { makeStyles } from '@material-ui/core/styles'

import backgroundImage from '../../../assets/img/sidebar-2.jpg'

const drawerWidth = 255

export default makeStyles(({ breakpoints, spacing, palette }) => ({
  drawerRoot: {
    display: 'flex',
  },
  appBar: {
    height: 0,
  },
  menuIconContainer: {
    marginTop: spacing(3),
    marginLeft: spacing(3.5),
    width: 30,
  },
  menuIcon: {
    fontSize: 35,
  },
  menuButton: {
    color: palette.secondary.dark,
    [breakpoints.up('xl')]: {
      display: 'none',
    },
  },
  logoWrapper: {
    width: '100%',
    height: spacing(8),
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(0.8),
    marginBottom: -spacing(0.6),
  },
  logoImg: {
    width: 120,
    height: 60,
  },
  drawer: {
    [breakpoints.up('xl')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: spacing(2),
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${backgroundImage})`,
    backgroundPosition: 'center center',
  },
  drawerIcon: {
    color: palette.secondary.light,
  },
  drawerListContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  drawerListItems: {
    paddingTop: 2,
  },
  userInfoBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing(5),
  },
  emailAddress: {
    color: palette.secondary.light,
  },
  drawerItemText: {
    paddingLeft: 10,
  },
  subMenuItems: {
    paddingLeft: spacing(4),
    paddingBottom: spacing(2),
  },
  subMenuIcons: {
    color: palette.secondary.light,
    paddingLeft: spacing(3),
  },
  divider: {
    backgroundColor: palette.grayColors[6],
    opacity: 0.6,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: palette.grayColors[5],
  },
}))
