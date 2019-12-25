import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../../../assets/img/sidebar-2.jpg';
const drawerWidth = 250;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    height: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appName: {
    width: '60px',
    marginLeft: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  menuItems: {
    paddingTop: 2
  },
  logoWrapper: {
    textAlign: 'center',
    width: '100%',
    height: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  logoImg: {
    width: '60px',
    height: '60'
  },
  menuIcon: {
    color: 'white'
  },
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: 0,
    marginBottom: 0,
    border: 0,
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#404854',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  menuDivider: {
    backgroundColor: '#555'
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    paddingTop: theme.spacing(2),
    backgroundSize: 'cover',
    background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${backgroundImage})`,
    backgroundPosition: 'center center'
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    padding: theme.spacing(3),
    backgroundColor: '#fcfafa'
  }
}));
