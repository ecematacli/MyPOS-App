import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette, breakpoints }) => ({
  chartPaper: {
    height: 300,
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 6,
    position: 'relative'
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    marginBottom: 200
  },
  chart: {}
}));
