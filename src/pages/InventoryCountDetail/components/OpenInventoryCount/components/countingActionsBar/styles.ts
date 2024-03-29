import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  container: {
    position: 'sticky',
    top: 0,
  },
  backArrow: {
    color: palette.grayColors[13],
    cursor: 'pointer',
  },
  countTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countNameDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  iconDiv: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -spacing(0.8),
  },
  titleText: {
    fontSize: spacing(2.6),
    fontWeight: 'bold',
    color: palette.grayColors[17],
  },
  countingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  searchBar: {
    margin: '0 auto',
    width: (quickScanMode: boolean) => (quickScanMode ? '115%' : '90%'),
  },
  confirmationBtnDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  countInputAction: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: spacing(3),
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
    '&:disabled': {
      backgroundColor: palette.grayColors[13],
    },
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
