import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../../../assets/img/sidebar-2.jpg';

const drawerWidth = 255;

export default makeStyles(({ breakpoints, spacing, palette }) => ({
  drawerRoot: {
    display: 'flex'
  },
  appBar: {
    height: 0
  },
  menuIconContainer: {
    marginTop: spacing(3),
    marginLeft: spacing(3.5),
    width: 30
  },
  menuIcon: {
    fontSize: 35
  },
  menuButton: {
    color: palette.secondary.dark,
    [breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  logoWrapper: {
    width: '100%',
    height: spacing(8),
    display: 'flex',
    justifyContent: 'center',
    paddingTop: spacing(1.8),
    marginBottom: spacing(1.5)
  },
  logoImg: {
    width: 95,
    height: 60
  },
  drawer: {
    [breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${backgroundImage})`,
    backgroundPosition: 'center center'
  },
  drawerIcon: {
    color: palette.secondary.light
  },
  drawerListItems: {
    paddingTop: 2
  },
  drawerItemText: {
    paddingLeft: 10
  },
  subMenuItems: {
    paddingLeft: spacing(4)
  },
  subMenuFirstItem: {
    paddingBottom: spacing(2)
  },
  subMenuIcons: {
    color: palette.secondary.light,
    paddingLeft: spacing(3)
  },
  divider: {
    backgroundColor: palette.grayColors[3],
    marginTop: spacing(1),
    marginBottom: spacing(1)
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    padding: spacing(3),
    backgroundColor: palette.grayColors[5]
  }
}));
