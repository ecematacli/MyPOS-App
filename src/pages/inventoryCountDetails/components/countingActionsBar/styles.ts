import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  titleDiv: {
    margin: spacing(7, 0, 1.2),
    display: 'flex',
    justifyContent: 'center',
  },
  backArrow: { color: palette.grayColors[13], cursor: 'pointer' },
  iconDiv: { display: 'flex', alignItems: 'center' },
  titleText: {
    fontSize: spacing(3.2),
    fontWeight: 'bold',
    color: '#3a4953',
  },
  countingContainer: {
    backgroundColor: '#f1f3f5',
    padding: spacing(3),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: '90%',
    margin: '0 auto',
  },
  countInputAction: {
    display: 'flex',
    alignItems: 'center',
  },
  numberSpinner: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  input: {
    textAlign: 'center',
  },
  inputRoot: {
    width: spacing(8),
    height: 55,
    borderRadius: 0,
    '& input:valid:focus + fieldset': {
      borderColor: '#008ae8',
      boxShadow: '0 0 3px #008ae8',
    },
  },
  countBtnRoot: {
    borderRadius: 0,
    height: 55.3,
  },
  countBtn: {
    marginRight: spacing(1),
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
  },
  pauseBtn: {
    height: 56.3,
    backgroundColor: palette.grayColors[14],
    marginRight: spacing(1),
    '&:hover': {
      backgroundColor: palette.grayColors[4],
    },
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white',
  },
  modeText: {
    fontSize: spacing(1.6),
    color: palette.secondary.main,
    marginLeft: -spacing(0.6),
  },
}));
