import { makeStyles } from '@mui/styles'

export default makeStyles(({ spacing, palette }) => ({
  lastCountedContainer: {
    borderLeft: `0.1em solid ${palette.grayColors[10]}`,
    height: '100vh',
    overflow: 'auto',
  },
  titleDiv: {
    padding: spacing(3.2, 2),
  },
  title: {
    color: palette.secondary.main,
    fontSize: spacing(2.25),
  },
  divider: {
    backgroundColor: `0.1em solid ${palette.grayColors[10]}`,
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(2, 1.4),
    width: '100%',
  },
  bold: {
    fontWeight: 600,
    marginRight: spacing(1),
  },
  countNumber: {
    paddingRight: spacing(2),
    fontSize: 20,
  },
  barcodeAndSku: {
    fontSize: 13,
    '& > span:nth-child(2)': {
      marginLeft: spacing(1.5),
    },
  },
  deleteIcon: {
    color: palette.secondary.dark,
    cursor: 'pointer',
    '&:hover': {
      color: palette.error.light,
    },
  },
  imageDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(5),
  },
}))
