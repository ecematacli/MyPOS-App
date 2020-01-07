import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../../../assets/img/sidebar-2.jpg';
const drawerWidth = 250;

export default makeStyles(
  ({ breakpoints, zIndex, mixins, spacing, palette }) => ({
    drawerRoot: {
      display: 'flex',
      position: 'relative',
      height: '100vh'
    },
    appBar: {
      borderBottom: 0,
      marginBottom: 0,
      border: 0,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      zIndex: zIndex.drawer + 1,
      [breakpoints.up('md')]: {
        marginLeft: drawerWidth
      }
    },
    toolbar: mixins.toolbar,
    menuButton: {
      display: 'fixed',
      marginRight: spacing(2),
      color: palette.secondary.darkest,
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
      }
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
      backgroundColor: palette.secondary.darkest
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
      padding: spacing(3),
      backgroundColor: palette.secondary.background
    }
  })
);
