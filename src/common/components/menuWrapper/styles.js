import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../../../assets/img/sidebar-2.jpg';

const drawerWidth = 250;

export default makeStyles(({ breakpoints, zIndex, spacing, palette }) => ({
  drawerRoot: {
    display: 'flex',
    position: 'relative',
    height: '100vh'
  },
  appBar: {
    zIndex: zIndex.drawer + 1,
    [breakpoints.up('md')]: {
      marginLeft: drawerWidth
    }
  },
  appBarRoot: { height: 0 },
  menuIconContainer: {
    marginTop: spacing(3),
    marginLeft: spacing(4),
    width: 30
  },
  menuButton: {
    display: 'fixed',
    marginRight: spacing(2),
    color: palette.grayColors[3],
    [breakpoints.up('md')]: {
      display: 'none'
    }
  },

  logoWrapper: {
    width: '100%',
    height: spacing(8),
    display: 'flex',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      display: 'none'
    },
    marginBottom: -spacing(1.5)
  },
  logoImg: {
    width: 60,
    height: 60
  },
  drawer: {
    [breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    paddingTop: spacing(2),
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${backgroundImage})`,
    backgroundPosition: 'center center'
  },
  drawerListItems: {
    paddingTop: 2
  },
  drawerIcon: {
    color: palette.secondary.light
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
  },
  toolbar: {
    minHeight: 0,
    height: 0
  }
}));
