import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  countingContainer: {
    backgroundColor: '#f1f3f5',
    marginTop: spacing(15.8),
    padding: spacing(3)
  },
  searchBarInput: {
    width: '100%'
  },
  countInputContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  inputDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  input: {
    textAlign: 'center'
  },
  inputRoot: {
    width: spacing(8),
    height: 55,
    borderRadius: 0,
    borderColor: palette.secondary.dark,
    '&:focus': {
      backgroundColor: 'transparent !important'
    }
  },
  countBtnRoot: {
    borderRadius: 0,
    height: 55.3
  },
  countBtn: {
    marginRight: spacing(1),
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.light
    }
  },
  pauseBtn: {
    height: 56.3,
    backgroundColor: palette.grayColors[14],
    marginRight: spacing(1),
    '&:hover': {
      backgroundColor: palette.grayColors[4]
    }
  },
  btnText: {
    textTransform: 'capitalize',
    color: 'white'
  },
  modeText: {
    fontSize: spacing(1.6),
    color: palette.secondary.main,
    marginLeft: -spacing(0.6)
  }
}));
