import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  salesDetailsContainer: {
    maxHeight: '500px',
    marginTop: '-15px',
    boxShadow: '0 2px 7px 0 rgba(0, 0, 0, 0.08)',
    overflowY: 'auto'
  },
  greenRow: {
    background: '#f8fdf8'
  },
  whiteRow: {
    background: 'white'
  }
}));
