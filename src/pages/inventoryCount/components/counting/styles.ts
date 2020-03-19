import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  imageDiv: {
    borderLeft: `0.1em solid ${palette.grayColors[10]}`,
    height: '100vh'
  }
}));
