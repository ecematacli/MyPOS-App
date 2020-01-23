import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  paper: {
    border: '2px solid #000',
    padding: spacing(2, 4, 3)
  },
  quickAddIcon: {
    fontSize: spacing(4.5),
    color: palette.primary.main,
    cursor: 'pointer'
  },
  dialogTitle: {
    fontSize: 20,
    color: palette.grayColors[3],
    display: 'flex',
    justifyContent: 'center'
  },
  dialogPaper: {
    maxHeight: 'unset',
    marginTop: 10,
    padding: spacing(7),
    paddingTop: spacing(3),
    paddingBottom: spacing(2),
    borderRadius: 6
  },
  expansionRoot: {
    boxShadow: 'none',
    color: palette.secondary.main
  },
  expansionText: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontSize: 16
  },
  expansionDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: 380,
    height: 57,
    color: palette.grayColors[3],
    borderColor: palette.secondary.dark,
    marginBottom: 15
  },
  dropdownInput: {
    width: 380,
    height: 50,
    marginBottom: 15
  }
}));
