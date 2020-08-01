import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ palette }) => ({
  dropper: {
    cursor: 'pointer',
    height: '150px',
    border: `2px dashed ${palette.secondary.dark}`,
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
  dropInput: {
    width: '100%',
    height: '30vh',
    position: 'absolute',
    opacity: 0,
  },
}));
