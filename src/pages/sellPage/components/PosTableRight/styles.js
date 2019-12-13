import { lighten, makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  tableRoot: {
    width: '100%',
    height: '300%'
  },
  paper: {
    width: '65%',
    height: '70%',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.15) ',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'hidden'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  selectedItemRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.error.main,
          backgroundColor: lighten(theme.palette.error.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  numSelectedTitle: {
    flex: '1 1 100%'
  },
  quantity: {
    display: 'flex',
    cursor: 'pointer',
    textAlign: 'center'
  },
  quantityVal: {
    margin: '0 10px'
  },
  arrow: {
    color: '#3f3f3f'
  },
  deleteIcon: {
    color: '#7e7e7e'
  }
}));
