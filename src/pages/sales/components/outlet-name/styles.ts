import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing }) => ({
  iconBtn: {
    borderRadius: 0,
    cursor: 'auto',

    '&:hover': {
      backgroundColor: 'unset',
    },
  },
  dropdownInput: {
    width: 200,
    height: 35,
    margin: spacing(1),
    '&:focus': {
      backgroundColor: 'transparent !important',
    },
  },
  label: {
    fontSize: 14,
    marginBottom: -5,
  },
  outletWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'auto',
  },
  outletName: {
    fontWeight: 'bold',
    fontSize: 18,
    textDecoration: 'underline',
  },
  formControl: {
    left: 6,
    display: 'none',
  },
}))
