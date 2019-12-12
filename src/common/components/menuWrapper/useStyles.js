import { makeStyles } from '@material-ui/core/styles';

import backgroundImage from '../../../assets/img/sidebar-2.jpg'
const drawerWidth = 250;


export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },

  },
  menuItems: {
    paddingTop: 2
  },
  appName: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  appBar: {
    backgroundColor: '#607d8b',
    height: 64,
    marginTop: 1,
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('lg')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: 64,
    backgroundSize: 'cover',
    background: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${backgroundImage})`,
    // background: `linear-gradient( rgba(16,29,44, .90), rgba(016,29,44, .91) ), url(${backgroundImage})`,
    backgroundPosition: "center center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // backgroundColor: '#eee'
  },
}));



//rgba(255, 255, 255, 0.7)
//#404854
//rgba(0, 0, 0, 0.87)
//'#607d8b',
///#f7f7f7